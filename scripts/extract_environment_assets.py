#!/usr/bin/env python3
from __future__ import annotations

import json
import struct
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets/imagegen/environment"
DATA = ROOT / "src/data"
SRC = ASSETS / "environment_tileset_all_areas.png"
KEY_HELPER = Path.home() / ".codex/skills/.system/imagegen/scripts/remove_chroma_key.py"

AREA_IDS = [
    "town_center",
    "restaurant",
    "dragon_card_house",
    "livehouse",
    "echo_lake",
    "care_home",
    "atelier",
    "northern_wilds",
    "server_room",
]

BASE_TILES = [
    ("plaza_stone", "浅色广场石砖", (8, 472, 64, 64), ["town_center", "care_home"]),
    ("grass_path", "草径地砖", (82, 472, 64, 64), ["northern_wilds", "care_home"]),
    ("warm_brick", "暖色砖地", (156, 472, 64, 64), ["town_center", "restaurant"]),
    ("gray_stone", "灰石地砖", (8, 546, 64, 64), ["care_home", "atelier"]),
    ("dark_stone", "深色石砖", (82, 546, 64, 64), ["dragon_card_house", "server_room"]),
    ("blue_water", "水面砖", (156, 546, 64, 64), ["echo_lake"]),
    ("red_carpet", "牌馆红毯", (228, 546, 64, 64), ["dragon_card_house"]),
    ("purple_stage", "舞台紫砖", (302, 546, 64, 64), ["livehouse"]),
    ("server_floor", "服务器地板", (1300, 594, 64, 64), ["server_room"]),
    ("atelier_wood", "工坊木地板", (1046, 594, 64, 64), ["atelier", "restaurant"]),
]

DECOR_GROUPS = [
    ("town_objects", "小镇喷泉与路灯", (520, 470, 190, 122), ["town_center"]),
    ("restaurant_tables", "餐厅桌椅与料理台", (690, 472, 278, 138), ["restaurant"]),
    ("card_tables", "牌桌与龙牌装饰", (724, 470, 170, 102), ["dragon_card_house"]),
    ("stage_props", "舞台灯光和音箱", (520, 470, 168, 112), ["livehouse"]),
    ("lake_bridge", "水面与木桥", (366, 500, 160, 126), ["echo_lake"]),
    ("garden_trees", "庭院树木与花丛", (4, 618, 428, 132), ["care_home", "northern_wilds"]),
    ("atelier_tools", "画架屏幕与调色工具", (930, 470, 296, 170), ["atelier"]),
    ("server_devices", "机柜和蓝色设备", (1216, 470, 312, 230), ["server_room"]),
]

MAP_TILE_PROFILE = {
    "town_center": {"floor": "plaza_stone", "wall": "warm_brick", "decor": "town_objects"},
    "restaurant": {"floor": "atelier_wood", "wall": "warm_brick", "decor": "restaurant_tables"},
    "dragon_card_house": {"floor": "red_carpet", "wall": "dark_stone", "decor": "card_tables"},
    "livehouse": {"floor": "purple_stage", "wall": "dark_stone", "decor": "stage_props"},
    "echo_lake": {"floor": "blue_water", "wall": "gray_stone", "decor": "lake_bridge"},
    "care_home": {"floor": "grass_path", "wall": "plaza_stone", "decor": "garden_trees"},
    "atelier": {"floor": "atelier_wood", "wall": "gray_stone", "decor": "atelier_tools"},
    "northern_wilds": {"floor": "grass_path", "wall": "gray_stone", "decor": "garden_trees"},
    "server_room": {"floor": "server_floor", "wall": "dark_stone", "decor": "server_devices"},
}


def png_size(path: Path) -> tuple[int, int]:
    header = path.read_bytes()[:24]
    if header[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError(f"not png: {path}")
    return struct.unpack(">II", header[16:24])


def load_rgba(path: Path) -> tuple[int, int, bytes]:
    width, height = png_size(path)
    raw = subprocess.check_output(
        ["ffmpeg", "-v", "error", "-i", str(path), "-f", "rawvideo", "-pix_fmt", "rgba", "-"]
    )
    return width, height, raw


def is_key_green(raw: bytes, offset: int) -> bool:
    r = raw[offset]
    g = raw[offset + 1]
    b = raw[offset + 2]
    return g >= 180 and r <= 92 and b <= 92


def foreground_bbox(width: int, height: int, raw: bytes, crop: tuple[int, int, int, int]) -> tuple[int, int, int, int]:
    x, y, w, h = crop
    x0, y0 = max(0, x), max(0, y)
    x1, y1 = min(width, x + w), min(height, y + h)
    min_x, min_y = x1, y1
    max_x, max_y = x0 - 1, y0 - 1
    for yy in range(y0, y1):
        row = yy * width * 4
        for xx in range(x0, x1):
            if not is_key_green(raw, row + xx * 4):
                min_x = min(min_x, xx)
                min_y = min(min_y, yy)
                max_x = max(max_x, xx)
                max_y = max(max_y, yy)
    if max_x < min_x:
        return crop
    pad = 2
    min_x = max(0, min_x - pad)
    min_y = max(0, min_y - pad)
    max_x = min(width - 1, max_x + pad)
    max_y = min(height - 1, max_y + pad)
    return min_x, min_y, max_x - min_x + 1, max_y - min_y + 1


def ffmpeg_crop(src: Path, out: Path, crop: tuple[int, int, int, int], scale: str | None = None) -> None:
    x, y, w, h = crop
    out.parent.mkdir(parents=True, exist_ok=True)
    vf = f"crop={w}:{h}:{x}:{y}"
    if scale:
        vf += f",{scale}"
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(src), "-vf", vf, str(out)], check=True)


def chroma(src: Path, out: Path) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    if KEY_HELPER.exists():
        try:
            subprocess.run(
                [
                    "python3",
                    str(KEY_HELPER),
                    "--input",
                    str(src),
                    "--out",
                    str(out),
                    "--auto-key",
                    "border",
                    "--soft-matte",
                    "--transparent-threshold",
                    "18",
                    "--opaque-threshold",
                    "210",
                    "--despill",
                    "--edge-contract",
                    "1",
                ],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            src.unlink(missing_ok=True)
            return
        except subprocess.CalledProcessError:
            pass
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", str(src), "-vf", "colorkey=0x00ff00:0.27:0.08,format=rgba", str(out)],
        check=True,
    )
    src.unlink(missing_ok=True)


def export_transparent(crop: tuple[int, int, int, int], out: Path, scale: str | None = None) -> None:
    tmp = ASSETS / "tmp" / out.name
    ffmpeg_crop(SRC, tmp, crop, scale)
    chroma(tmp, out)


def main() -> None:
    if not SRC.exists():
        raise FileNotFoundError(SRC)
    width, height, raw = load_rgba(SRC)

    area_backgrounds: dict[str, str] = {}
    bottom_y = int(height * 0.744)
    bottom_h = height - bottom_y - 8
    cell_w = width / len(AREA_IDS)
    for index, area_id in enumerate(AREA_IDS):
        rough = (int(index * cell_w), bottom_y, int(cell_w), bottom_h)
        crop = foreground_bbox(width, height, raw, rough)
        out = ASSETS / "areas" / f"{area_id}.png"
        export_transparent(crop, out, "scale=896:640:flags=neighbor")
        area_backgrounds[area_id] = f"assets/imagegen/environment/areas/{area_id}.png"

    base_tiles = []
    for tile_id, label, crop, area_tags in BASE_TILES:
        out = ASSETS / "tiles" / f"{tile_id}.png"
        export_transparent(crop, out, "scale=64:64:flags=neighbor")
        base_tiles.append(
            {
                "id": tile_id,
                "label": label,
                "path": f"assets/imagegen/environment/tiles/{tile_id}.png",
                "areaTags": area_tags,
            }
        )

    decor_groups = []
    for decor_id, label, crop, area_tags in DECOR_GROUPS:
        out = ASSETS / "decor" / f"{decor_id}.png"
        export_transparent(crop, out)
        decor_groups.append(
            {
                "id": decor_id,
                "label": label,
                "path": f"assets/imagegen/environment/decor/{decor_id}.png",
                "areaTags": area_tags,
            }
        )

    tiles = {
        "source": "assets/imagegen/environment/environment_tileset_all_areas.png",
        "areaBackgrounds": area_backgrounds,
        "baseTiles": base_tiles,
        "decorGroups": decor_groups,
        "mapTileProfiles": MAP_TILE_PROFILE,
    }
    (DATA / "tiles.json").write_text(json.dumps(tiles, ensure_ascii=False, indent=2), encoding="utf-8")

    maps_path = DATA / "maps.json"
    maps = json.loads(maps_path.read_text(encoding="utf-8"))
    for game_map in maps:
        area_id = game_map["id"]
        game_map["areaBackground"] = area_backgrounds[area_id]
        game_map["tileProfile"] = MAP_TILE_PROFILE[area_id]
    maps_path.write_text(json.dumps(maps, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"extracted {len(area_backgrounds)} area backgrounds, {len(base_tiles)} base tiles, {len(decor_groups)} decor groups")


if __name__ == "__main__":
    main()
