#!/usr/bin/env python3
from __future__ import annotations

import argparse
import itertools
import json
import shutil
from collections import deque
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets/imagegen"
DATA = ROOT / "src/data"
TARGETS = {
    "sheet": ASSETS / "sheets",
    "avatar": ASSETS / "avatars",
    "portrait": ASSETS / "portraits",
    "sprite": ASSETS / "sprites",
    "expression": ASSETS / "expressions",
    "candidate": ASSETS / "candidates",
}
EXPRESSIONS = {
    "neutral": (0.47, 0.05, 0.68, 0.31),
    "happy": (0.70, 0.05, 0.95, 0.31),
    "tease": (0.47, 0.31, 0.68, 0.57),
    "serious": (0.70, 0.31, 0.95, 0.57),
}
EXPRESSION_ORDER = ["neutral", "happy", "tease", "serious"]


Box = tuple[int, int, int, int]


@dataclass
class ExportCheck:
    path: str
    size: tuple[int, int]
    border_alpha_ratio: float
    foreground_ratio: float


def rel(path: Path) -> str:
    return str(path.relative_to(ROOT))


def load_json(name: str):
    return json.loads((DATA / f"{name}.json").read_text(encoding="utf-8"))


def save_json(name: str, payload) -> None:
    (DATA / f"{name}.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def key_to_alpha(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            if (
                (g >= 215 and r <= 65 and b <= 65)
                or (g >= 145 and r <= 90 and b <= 90 and g - r >= 80 and g - b >= 80)
            ):
                pixels[x, y] = (r, g, b, 0)
    return rgba


def guide_red_to_alpha(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if is_guide_pixel(r, g, b, a) or (a >= 16 and r >= 220 and g <= 150 and b <= 90 and r - g >= 70):
                pixels[x, y] = (r, g, b, 0)
    return rgba


def clear_edge_alpha(image: Image.Image, margin: int = 10) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            if x < margin or y < margin or x >= width - margin or y >= height - margin:
                r, g, b, _ = pixels[x, y]
                pixels[x, y] = (r, g, b, 0)
    return rgba


def is_guide_pixel(r: int, g: int, b: int, a: int) -> bool:
    if a < 16:
        return False
    return r >= 235 and g <= 55 and b <= 55


def red_mask(source: Image.Image) -> tuple[bytearray, int, int]:
    image = source.convert("RGBA")
    width, height = image.size
    pixels = image.load()
    mask = bytearray(width * height)
    for y in range(height):
        row = y * width
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if is_guide_pixel(r, g, b, a):
                mask[row + x] = 1
    return mask, width, height


def line_segments(counts: list[int], threshold: int) -> list[tuple[int, int]]:
    segments: list[tuple[int, int]] = []
    start: int | None = None
    for index, count in enumerate(counts):
        if count >= threshold and start is None:
            start = index
        if start is not None and (count < threshold or index == len(counts) - 1):
            end = index - 1 if count < threshold else index
            if end >= start:
                segments.append((start, end + 1))
            start = None
    return segments


def line_centers(segments: list[tuple[int, int]]) -> list[int]:
    return [round((start + end - 1) / 2) for start, end in segments]


def red_line_centers(
    mask: bytearray,
    width: int,
    height: int,
    axis: str,
    region: Box,
    threshold_scale: float = 0.24,
    minimum_threshold: int = 8,
) -> list[int]:
    x0, y0, x1, y1 = region
    if axis == "x":
        counts = [
            sum(mask[y * width + x] for y in range(y0, y1))
            for x in range(x0, x1)
        ]
        offset = x0
    else:
        counts = [
            sum(mask[y * width + x] for x in range(x0, x1))
            for y in range(y0, y1)
        ]
        offset = y0
    if not counts or max(counts) == 0:
        return []
    threshold = max(minimum_threshold, round(max(counts) * threshold_scale))
    segments = [(start + offset, end + offset) for start, end in line_segments(counts, threshold)]
    return line_centers(segments)


def pick_evenly_spaced_lines(centers: list[int], desired: int, min_step: int) -> list[int]:
    unique = sorted(set(centers))
    if len(unique) < desired:
        return []
    best: tuple[float, list[int]] | None = None
    for candidate in itertools.combinations(unique, desired):
        window = list(candidate)
        gaps = [right - left for left, right in zip(window, window[1:])]
        if min(gaps) < min_step:
            continue
        average = sum(gaps) / len(gaps)
        score = (max(gaps) - min(gaps)) / average
        if (
            best is None
            or score < best[0]
            or (score == best[0] and window[-1] - window[0] > best[1][-1] - best[1][0])
        ):
            best = (score, window)
    return best[1] if best else []


def red_at(mask: bytearray, width: int, height: int, x: int, y: int) -> bool:
    if x < 0 or y < 0 or x >= width or y >= height:
        return False
    return bool(mask[y * width + x])


def horizontal_coverage(mask: bytearray, width: int, height: int, y: int, x0: int, x1: int, band: int = 3) -> float:
    if x1 <= x0:
        return 0.0
    hits = 0
    for x in range(x0, x1):
        if any(red_at(mask, width, height, x, yy) for yy in range(y - band, y + band + 1)):
            hits += 1
    return hits / max(1, x1 - x0)


def vertical_coverage(mask: bytearray, width: int, height: int, x: int, y0: int, y1: int, band: int = 3) -> float:
    if y1 <= y0:
        return 0.0
    hits = 0
    for y in range(y0, y1):
        if any(red_at(mask, width, height, xx, y) for xx in range(x - band, x + band + 1)):
            hits += 1
    return hits / max(1, y1 - y0)


def detect_rectangular_guide_boxes(source: Image.Image) -> list[Box]:
    mask, width, height = red_mask(source)
    x_counts = [sum(mask[y * width + x] for y in range(height)) for x in range(width)]
    y_counts = [sum(mask[y * width + x] for x in range(width)) for y in range(height)]
    if not x_counts or not y_counts or max(x_counts) == 0 or max(y_counts) == 0:
        return []
    x_threshold = max(40, round(max(x_counts) * 0.28))
    y_threshold = max(40, round(max(y_counts) * 0.28))
    xs = line_centers(line_segments(x_counts, x_threshold))
    ys = line_centers(line_segments(y_counts, y_threshold))
    boxes: list[Box] = []
    for left_index, x0 in enumerate(xs):
        for x1 in xs[left_index + 1:]:
            if x1 - x0 < 48:
                continue
            for top_index, y0 in enumerate(ys):
                for y1 in ys[top_index + 1:]:
                    if y1 - y0 < 48:
                        continue
                    top = horizontal_coverage(mask, width, height, y0, x0, x1)
                    bottom = horizontal_coverage(mask, width, height, y1, x0, x1)
                    left = vertical_coverage(mask, width, height, x0, y0, y1)
                    right = vertical_coverage(mask, width, height, x1, y0, y1)
                    if min(top, bottom, left, right) >= 0.72:
                        has_internal_vertical = any(
                            x0 < x < x1 and vertical_coverage(mask, width, height, x, y0, y1) >= 0.72
                            for x in xs
                        )
                        has_internal_horizontal = any(
                            y0 < y < y1 and horizontal_coverage(mask, width, height, y, x0, x1) >= 0.72
                            for y in ys
                        )
                        if has_internal_vertical or has_internal_horizontal:
                            continue
                        boxes.append((x0, y0, x1 + 1, y1 + 1))
    return boxes


def box_area(box: Box) -> int:
    return max(0, box[2] - box[0]) * max(0, box[3] - box[1])


def box_center(box: Box) -> tuple[float, float]:
    return ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2)


def sort_grid_boxes(boxes: list[Box], columns: int) -> list[Box]:
    rows = [
        sorted(boxes[index:index + columns], key=lambda box: box_center(box)[0])
        for index in range(0, len(boxes), columns)
    ]
    return [box for row in rows for box in row]


def contains_center(outer: Box, inner: Box) -> bool:
    cx, cy = box_center(inner)
    return outer[0] < cx < outer[2] and outer[1] < cy < outer[3]


def overlap_ratio(first: Box, second: Box) -> float:
    left = max(first[0], second[0])
    top = max(first[1], second[1])
    right = min(first[2], second[2])
    bottom = min(first[3], second[3])
    if right <= left or bottom <= top:
        return 0.0
    overlap = (right - left) * (bottom - top)
    return overlap / max(1, min(box_area(first), box_area(second)))


def guide_edge_ratio(box: Box, points: list[tuple[int, int]]) -> float:
    x0, y0, x1, y1 = box
    margin = max(3, min(12, round(min(x1 - x0, y1 - y0) * 0.08)))
    edge_count = 0
    for x, y in points:
        if x - x0 <= margin or x1 - 1 - x <= margin or y - y0 <= margin or y1 - 1 - y <= margin:
            edge_count += 1
    return edge_count / max(1, len(points))


def detect_guide_boxes(source: Image.Image) -> list[Box]:
    grid_boxes = detect_rectangular_guide_boxes(source)
    image = source.convert("RGBA")
    width, height = image.size
    pixels = image.load()
    total = width * height
    guide = bytearray(total)
    for y in range(height):
        row = y * width
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if is_guide_pixel(r, g, b, a):
                guide[row + x] = 1

    visited = bytearray(total)
    boxes: list[Box] = []
    for start in range(total):
        if not guide[start] or visited[start]:
            continue
        queue: deque[int] = deque([start])
        visited[start] = 1
        points: list[tuple[int, int]] = []
        min_x = width
        min_y = height
        max_x = -1
        max_y = -1
        while queue:
            index = queue.popleft()
            x = index % width
            y = index // width
            points.append((x, y))
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if nx < 0 or ny < 0 or nx >= width or ny >= height:
                    continue
                next_index = ny * width + nx
                if guide[next_index] and not visited[next_index]:
                    visited[next_index] = 1
                    queue.append(next_index)

        box = (min_x, min_y, max_x + 1, max_y + 1)
        box_w = box[2] - box[0]
        box_h = box[3] - box[1]
        if box_w < 32 or box_h < 32 or len(points) < 80:
            continue
        if guide_edge_ratio(box, points) < 0.58:
            continue
        boxes.append(box)

    deduped: list[Box] = []
    for box in sorted([*grid_boxes, *boxes], key=box_area, reverse=True):
        if any(abs(box[0] - kept[0]) < 4 and abs(box[1] - kept[1]) < 4 and abs(box[2] - kept[2]) < 4 and abs(box[3] - kept[3]) < 4 for kept in deduped):
            continue
        deduped.append(box)

    return sorted(deduped, key=lambda item: (item[1], item[0]))


def remove_container_boxes(boxes: list[Box]) -> list[Box]:
    filtered: list[Box] = []
    for box in boxes:
        contained = sum(1 for other in boxes if other != box and contains_center(box, other))
        if contained >= 2:
            continue
        filtered.append(box)
    return filtered


def inset_guide_box(box: Box) -> Box:
    x0, y0, x1, y1 = box
    inset = max(12, min(36, round(min(x1 - x0, y1 - y0) * 0.12)))
    return (x0 + inset, y0 + inset, x1 - inset, y1 - inset)


def grid_boxes_from_lines(xs: list[int], ys: list[int]) -> list[Box]:
    return [
        (xs[col], ys[row], xs[col + 1] + 1, ys[row + 1] + 1)
        for row in range(4)
        for col in range(4)
    ]


def grid_is_well_marked(
    mask: bytearray,
    width: int,
    height: int,
    boxes: list[Box],
    expected_count: int,
    threshold: float = 0.78,
) -> bool:
    if len(boxes) != expected_count:
        return False
    for x0, y0, x1, y1 in boxes:
        top = horizontal_coverage(mask, width, height, y0, x0, x1)
        bottom = horizontal_coverage(mask, width, height, y1 - 1, x0, x1)
        left = vertical_coverage(mask, width, height, x0, y0, y1)
        right = vertical_coverage(mask, width, height, x1 - 1, y0, y1)
        if min(top, bottom, left, right) < threshold:
            return False
    return True


def detect_portrait_box(source: Image.Image) -> Box | None:
    mask, width, height = red_mask(source)
    region: Box = (0, 0, round(width * 0.6), height)
    xs = red_line_centers(mask, width, height, "x", region, threshold_scale=0.14, minimum_threshold=4)
    ys = red_line_centers(mask, width, height, "y", region, threshold_scale=0.14, minimum_threshold=4)
    best: tuple[float, Box] | None = None
    for x0, x1 in itertools.combinations(xs, 2):
        if x0 > width * 0.18 or x1 < width * 0.28 or x1 > width * 0.5:
            continue
        if x1 - x0 < width * 0.28:
            continue
        for y0, y1 in itertools.combinations(ys, 2):
            if y0 > height * 0.12 or y1 < height * 0.82:
                continue
            if y1 - y0 < height * 0.72:
                continue
            top = horizontal_coverage(mask, width, height, y0, x0, x1)
            bottom = horizontal_coverage(mask, width, height, y1, x0, x1)
            left = vertical_coverage(mask, width, height, x0, y0, y1)
            right = vertical_coverage(mask, width, height, x1, y0, y1)
            minimum = min(top, bottom, left, right)
            if minimum < 0.08:
                continue
            box = (x0, y0, x1 + 1, y1 + 1)
            score = minimum * 1000 + box_area(box) / max(1, width * height)
            if best is None or score > best[0]:
                best = (score, box)
    return best[1] if best else None


def select_expression_boxes(boxes: list[Box], portrait: Box, image_height: int) -> list[Box]:
    portrait_area = box_area(portrait)
    candidates = [
        box
        for box in boxes
        if box != portrait
        and box[0] >= portrait[2] - 32
        and box_center(box)[1] < image_height * 0.5
        and portrait_area * 0.025 <= box_area(box) <= portrait_area * 0.24
    ]
    best: tuple[float, list[Box]] | None = None
    for combo in itertools.combinations(candidates, 4):
        if any(overlap_ratio(left, right) > 0.35 for index, left in enumerate(combo) for right in combo[index + 1:]):
            continue

        ordered = sort_grid_boxes(sorted(combo, key=lambda box: box_center(box)[1]), 2)
        top = ordered[:2]
        bottom = ordered[2:]
        left_column = [ordered[0], ordered[2]]
        right_column = [ordered[1], ordered[3]]

        row_spread = max(abs(box_center(top[0])[1] - box_center(top[1])[1]), abs(box_center(bottom[0])[1] - box_center(bottom[1])[1]))
        col_spread = max(abs(box_center(left_column[0])[0] - box_center(left_column[1])[0]), abs(box_center(right_column[0])[0] - box_center(right_column[1])[0]))
        row_gap = min(box_center(bottom[0])[1] - box_center(top[0])[1], box_center(bottom[1])[1] - box_center(top[1])[1])
        col_gap = min(box_center(top[1])[0] - box_center(top[0])[0], box_center(bottom[1])[0] - box_center(bottom[0])[0])
        if row_spread > 64 or col_spread > 64 or row_gap < 96 or col_gap < 120:
            continue

        widths = [box[2] - box[0] for box in ordered]
        heights = [box[3] - box[1] for box in ordered]
        areas = [box_area(box) for box in ordered]
        avg_width = sum(widths) / 4
        avg_height = sum(heights) / 4
        avg_area = sum(areas) / 4
        size_score = (
            (max(widths) - min(widths)) / max(1, avg_width)
            + (max(heights) - min(heights)) / max(1, avg_height)
            + (max(areas) - min(areas)) / max(1, avg_area)
        )
        score = row_spread + col_spread + 80 * size_score
        if best is None or score < best[0]:
            best = (score, ordered)
    return best[1] if best else []


def detect_expression_boxes_from_lines(source: Image.Image, portrait: Box) -> list[Box]:
    mask, width, height = red_mask(source)
    region: Box = (
        max(0, min(portrait[2] - 8, width - 1)),
        0,
        width,
        round(height * 0.53),
    )
    xs = pick_evenly_spaced_lines(
        red_line_centers(mask, width, height, "x", region, threshold_scale=0.07, minimum_threshold=3),
        3,
        120,
    )
    ys = pick_evenly_spaced_lines(
        red_line_centers(mask, width, height, "y", region, threshold_scale=0.07, minimum_threshold=3),
        3,
        80,
    )
    if len(xs) != 3 or len(ys) != 3:
        return []
    return [
        (xs[col], ys[row], xs[col + 1] + 1, ys[row + 1] + 1)
        for row in range(2)
        for col in range(2)
    ]


def detect_sprite_grid_boxes(source: Image.Image, portrait: Box, expression_boxes: list[Box]) -> list[Box]:
    mask, width, height = red_mask(source)
    expression_bottom = max(box[3] for box in expression_boxes)
    region: Box = (
        max(0, min(portrait[2] - 8, width - 1)),
        max(round(height * 0.42), expression_bottom - 24),
        width,
        height,
    )
    xs = pick_evenly_spaced_lines(
        red_line_centers(mask, width, height, "x", region, threshold_scale=0.035, minimum_threshold=1),
        5,
        64,
    )
    ys = pick_evenly_spaced_lines(
        red_line_centers(mask, width, height, "y", region, threshold_scale=0.035, minimum_threshold=1),
        5,
        48,
    )
    if len(xs) != 5 or len(ys) != 5:
        return []
    return grid_boxes_from_lines(xs, ys)


def classify_guide_layout(source: Image.Image) -> dict | None:
    boxes = detect_guide_boxes(source)
    portrait = detect_portrait_box(source)
    if not boxes and portrait is None:
        return None
    _, height = source.size
    portrait = portrait or max(boxes, key=box_area)
    expression_boxes = select_expression_boxes(boxes, portrait, height)
    if len(expression_boxes) != 4:
        expression_boxes = detect_expression_boxes_from_lines(source, portrait)
    if len(expression_boxes) != 4:
        return None
    sprite_boxes = detect_sprite_grid_boxes(source, portrait, expression_boxes)
    if len(sprite_boxes) != 16:
        return None
    return {
        "portrait": portrait,
        "expressions": dict(zip(EXPRESSION_ORDER, expression_boxes, strict=True)),
        "sprites": sprite_boxes,
        "boxCount": len(boxes),
    }


def contain_resize(
    crop: Image.Image,
    size: tuple[int, int],
    nearest: bool = False,
    fill: float = 1.0,
) -> Image.Image:
    width, height = size
    target_w = max(1, round(width * fill))
    target_h = max(1, round(height * fill))
    source_w, source_h = crop.size
    scale = min(target_w / source_w, target_h / source_h)
    next_size = (max(1, round(source_w * scale)), max(1, round(source_h * scale)))
    resample = Image.Resampling.NEAREST if nearest else Image.Resampling.LANCZOS
    resized = crop.resize(next_size, resample)
    output = Image.new("RGBA", size, (0, 0, 0, 0))
    output.alpha_composite(resized, ((width - next_size[0]) // 2, (height - next_size[1]) // 2))
    return clear_edge_alpha(guide_red_to_alpha(output))


def export_contained(
    image: Image.Image,
    out: Path,
    box: Box,
    size: tuple[int, int],
    nearest: bool = False,
    fill: float = 1.0,
) -> ExportCheck:
    out.parent.mkdir(parents=True, exist_ok=True)
    crop = image.crop(box)
    result = contain_resize(crop, size, nearest=nearest, fill=fill)
    result.save(out)
    return check_export(out)


def check_export(path: Path) -> ExportCheck:
    image = Image.open(path).convert("RGBA")
    width, height = image.size
    alpha = image.getchannel("A")
    border = []
    for x in range(width):
        border.append(alpha.getpixel((x, 0)))
        border.append(alpha.getpixel((x, height - 1)))
    for y in range(height):
        border.append(alpha.getpixel((0, y)))
        border.append(alpha.getpixel((width - 1, y)))
    border_alpha_ratio = sum(1 for value in border if value > 12) / max(1, len(border))
    foreground_ratio = sum(1 for value in alpha.getdata() if value > 12) / (width * height)
    return ExportCheck(rel(path), image.size, round(border_alpha_ratio, 4), round(foreground_ratio, 4))


def export_sprite_from_guide_boxes(image: Image.Image, guide_boxes: list[Box], out: Path) -> tuple[ExportCheck, dict]:
    if len(guide_boxes) != 16:
        raise ValueError(f"red-box sprite import requires exactly 16 sprite boxes, got {len(guide_boxes)}")
    row_count = 4
    column_count = 4
    sorted_boxes = sort_grid_boxes(sorted(guide_boxes, key=lambda box: box_center(box)[1]), 4)
    rows = [
        sorted(sorted_boxes[index * column_count:(index + 1) * column_count], key=lambda box: box_center(box)[0])
        for index in range(row_count)
    ]
    sheet = Image.new("RGBA", (column_count * 96, row_count * 96), (0, 0, 0, 0))
    exported_cells: list[list[int]] = []
    for row_index, row in enumerate(rows):
        for col_index, guide_box in enumerate(row):
            inner = inset_guide_box(guide_box)
            exported_cells.append(list(inner))
            frame = contain_resize(image.crop(inner), (96, 96), nearest=True, fill=0.92)
            sheet.alpha_composite(frame, (col_index * 96, row_index * 96))
    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out)
    meta = {
        "columns": column_count,
        "rows": row_count,
        "frameWidth": 96,
        "frameHeight": 96,
        "sourceMode": "guide_boxes",
        "sourceCells": exported_cells,
    }
    return check_export(out), meta


def backup_existing(role_id: str) -> str | None:
    paths = [
        ASSETS / "sheets" / f"{role_id}_sheet.png",
        ASSETS / "avatars" / f"{role_id}.png",
        ASSETS / "portraits" / f"{role_id}.png",
        ASSETS / "sprites" / f"{role_id}.png",
        *[ASSETS / "expressions" / f"{role_id}_{name}.png" for name in EXPRESSIONS],
        *[ASSETS / "candidates" / f"{role_id}_candidate_{index:02d}.png" for index in range(1, 4)],
    ]
    existing = [path for path in paths if path.exists()]
    if not existing:
        return None
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_dir = ASSETS / "backups" / stamp / role_id
    backup_dir.mkdir(parents=True, exist_ok=True)
    for path in existing:
        shutil.copy2(path, backup_dir / path.name)
    return rel(backup_dir)


def import_sheet(role_id: str, source: Path) -> dict:
    for target in TARGETS.values():
        target.mkdir(parents=True, exist_ok=True)

    backup_dir = backup_existing(role_id)
    source_image = Image.open(source).convert("RGBA")
    guide_layout = classify_guide_layout(source_image)
    if not guide_layout:
        raise ValueError(
            "red-box import requires exactly one large portrait box, four expression boxes, "
            "and red-box sprite frames drawn as pure #ff0000 rectangular borders"
        )
    image = key_to_alpha(source_image)
    sheet_out = ASSETS / "sheets" / f"{role_id}_sheet.png"
    image.save(sheet_out)

    checks: list[ExportCheck] = [check_export(sheet_out)]
    width, height = image.size
    portrait_box = inset_guide_box(guide_layout["portrait"])
    portrait_out = ASSETS / "portraits" / f"{role_id}.png"
    checks.append(export_contained(image, portrait_out, portrait_box, (512, 768), nearest=False))

    expression_boxes: dict[str, list[int]] = {}
    neutral_box: Box | None = None
    for expression in EXPRESSION_ORDER:
        box = inset_guide_box(guide_layout["expressions"][expression])
        expression_boxes[expression] = list(box)
        expression_out = ASSETS / "expressions" / f"{role_id}_{expression}.png"
        checks.append(export_contained(image, expression_out, box, (128, 128), nearest=True, fill=0.92))
        if expression == "neutral":
            neutral_box = box
            avatar_out = ASSETS / "avatars" / f"{role_id}.png"
            checks.append(export_contained(image, avatar_out, box, (64, 64), nearest=True, fill=0.9))

    sprite_out = ASSETS / "sprites" / f"{role_id}.png"
    sprite_check, sprite_meta = export_sprite_from_guide_boxes(image, guide_layout["sprites"], sprite_out)
    checks.append(sprite_check)

    candidate_sources = [
        (portrait_box, ASSETS / "candidates" / f"{role_id}_candidate_01.png"),
        (neutral_box or portrait_box, ASSETS / "candidates" / f"{role_id}_candidate_02.png"),
    ]
    for box, out in candidate_sources:
        checks.append(export_contained(image, out, box, (256, 256), nearest=True, fill=0.9))
    first_sprite = (0, 0, 96, 96)
    sprite_image = Image.open(sprite_out).convert("RGBA")
    candidate_03 = ASSETS / "candidates" / f"{role_id}_candidate_03.png"
    contain_resize(sprite_image.crop(first_sprite), (256, 256), nearest=True, fill=0.9).save(candidate_03)
    checks.append(check_export(candidate_03))

    sprite_meta_path = DATA / "sprite_meta.json"
    sprite_meta_payload = json.loads(sprite_meta_path.read_text(encoding="utf-8"))
    sprite_meta_payload[role_id] = {
        "columns": sprite_meta["columns"],
        "rows": sprite_meta["rows"],
        "frameWidth": sprite_meta["frameWidth"],
        "frameHeight": sprite_meta["frameHeight"],
    }
    sprite_meta_path.write_text(json.dumps(sprite_meta_payload, ensure_ascii=False, indent=2), encoding="utf-8")

    report = {
        "roleId": role_id,
        "source": str(source),
        "backupDir": backup_dir,
        "sheet": rel(sheet_out),
        "portraitBox": list(portrait_box),
        "expressionBoxes": expression_boxes,
        "sprite": rel(sprite_out),
        "spriteDetection": sprite_meta,
        "guideLayout": {
            "enabled": True,
            "boxCount": guide_layout["boxCount"],
        },
        "checks": [check.__dict__ for check in checks],
        "borderWarnings": [
            check.path
            for check in checks
            if check.path.endswith(".png") and check.border_alpha_ratio > 0.03 and "sheet" not in check.path
        ],
    }
    report_dir = ROOT / "docs/single_character_imports"
    report_dir.mkdir(parents=True, exist_ok=True)
    (report_dir / f"{role_id}.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    return report


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("role_id")
    parser.add_argument("source", type=Path)
    args = parser.parse_args()
    report = import_sheet(args.role_id, args.source)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
