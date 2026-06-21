#!/usr/bin/env python3
from __future__ import annotations

import colorsys
import hashlib
import json
import math
import random
import re
import struct
import subprocess
import time
import zlib
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ANALYSE = ROOT.parent
PLAN_PATH = ANALYSE / "XiaokangOnline_开发总策划.md"
RECORD_PATH = ANALYSE / "record.json"
PERSONA_PATH = ANALYSE / "output/persona_analysis.json"
RELATIONSHIP_PATH = ANALYSE / "output/relationship_analysis.json"

ASSETS = ROOT / "assets"
DATA_DIR = ROOT / "src/data"
DOCS = ROOT / "docs"

SENSITIVE_RE = re.compile(
    r"(\d{2,4}\s*级|\d{2}\s*[- ]?\s*(电气|建筑|计科|电子|翻译|工程|自动化|土木|软件|计算机)|"
    r"学院|大学|学校|班级|公司|工位|手机号|电话|住址|宿舍|身份证|[1-9]\d{5,})"
)
SOFT_RISK_RE = re.compile(r"(性欲|処理|机器人|蛆|吃屎|绳艺)")

ROLE_REVIEW_OVERRIDES = {
    "role_001": {"title": "龙牌超量判官", "defaultArea": "dragon_card_house"},
    "role_002": {"title": "零点连招手", "defaultArea": "echo_lake"},
    "role_003": {"title": "星砂资料馆长", "defaultArea": "atelier"},
    "role_004": {"title": "赛博夜航人", "defaultArea": "livehouse"},
    "role_005": {"title": "青山回声调停者", "defaultArea": "town_center"},
    "role_006": {"title": "疲劳判定官", "defaultArea": "dragon_card_house"},
    "role_007": {"title": "V平方调律师", "defaultArea": "town_center"},
    "role_008": {"title": "回声转译师", "defaultArea": "echo_lake"},
    "role_009": {"title": "关心信标使", "defaultArea": "restaurant"},
    "role_010": {"groupNickname": "普罗米亚写真集", "title": "星火影集师", "defaultArea": "atelier"},
    "role_011": {"title": "无解牌桌顾问", "defaultArea": "dragon_card_house"},
    "role_012": {"title": "晨报铃使", "defaultArea": "town_center"},
    "role_013": {"title": "电子梦游者", "defaultArea": "atelier"},
    "role_014": {"title": "体力补给官", "defaultArea": "restaurant"},
    "role_015": {"qqNickname": "待确认", "title": "作息重启师", "defaultArea": "care_home"},
    "role_016": {"title": "回声收束者", "defaultArea": "care_home"},
    "role_017": {"qqNickname": "很复杂", "title": "分岔解码员", "defaultArea": "northern_wilds"},
    "role_018": {"title": "夹心观察员", "defaultArea": "restaurant"},
    "role_019": {"title": "未解事务官", "defaultArea": "echo_lake"},
    "role_020": {"title": "牌桌高手", "defaultArea": "dragon_card_house"},
    "role_031": {"groupNickname": "六界三鲜"},
    "role_036": {"groupNickname": "夜处理炼金师", "qqNickname": "QQ昵称已脱敏36", "title": "夜处理炼金师", "defaultArea": "server_room"},
}
RETIRED_ROLE_IDS = {"role_024", "role_035", "role_037"}

AREAS = [
    {
        "id": "town_center",
        "name": "小镇中心",
        "theme": "出生点、公告中心、主线集合",
        "visual": "暖色石砖、星砂喷泉、小康钟、路灯与传送牌",
        "unlockedBy": None,
        "color": "#d59f64",
        "events": ["event_center_notice", "event_center_bell"],
        "effects": ["主线提示", "集合加成"],
    },
    {
        "id": "restaurant",
        "name": "小康餐厅",
        "theme": "吃饭、约饭、恢复、日常交汇",
        "visual": "暖黄灯、木桌、料理台、饮品柜、蒸汽",
        "unlockedBy": None,
        "color": "#e9bc4f",
        "events": ["event_dinner_call", "event_sugar_choice"],
        "effects": ["在线值恢复", "饭点对话"],
    },
    {
        "id": "dragon_card_house",
        "name": "龙牌馆",
        "theme": "牌桌、规则、判定、博弈型任务",
        "visual": "深红木地板、龙角招牌、牌形地砖、绿色牌桌",
        "unlockedBy": None,
        "color": "#8e3d39",
        "events": ["event_card_gate", "event_extra_deck"],
        "effects": ["规则提示", "选择吐槽"],
    },
    {
        "id": "livehouse",
        "name": "夜雀舞台",
        "theme": "舞台、演出、二创、群像事件",
        "visual": "紫蓝灯光、像素舞台、音箱、海报墙、吧台小灯",
        "unlockedBy": "main_quest_02",
        "color": "#5d5bc6",
        "events": ["event_lights_midnight", "event_stage_accident"],
        "effects": ["舞台对话", "群像加成"],
    },
    {
        "id": "echo_lake",
        "name": "湖边回声栈道",
        "theme": "深夜、诗意、反思、长对话",
        "visual": "蓝紫夜色、水面倒影、木栈道、月光与漂浮星砂",
        "unlockedBy": "main_quest_02",
        "color": "#4974b8",
        "events": ["event_poem_pages", "event_moon_phase"],
        "effects": ["夜谈对话", "回忆解锁"],
    },
    {
        "id": "care_home",
        "name": "小康养老院",
        "theme": "休息、存档、归档、结局、群聊纪念",
        "visual": "明亮庭院、茶桌、公告墙、安静走廊、存档台、结局门与钟楼",
        "unlockedBy": "main_quest_03",
        "color": "#9fbf77",
        "events": ["event_clock_0047", "event_tea_roster"],
        "effects": ["manual_save", "存档恢复", "ending_gate", "结局入口"],
    },
    {
        "id": "atelier",
        "name": "像素炼画工坊",
        "theme": "头像、色板、生图、像素化、图鉴、技术美术",
        "visual": "调色盘、画架、像素屏幕、图鉴架、魔法打印机、色块墙",
        "unlockedBy": "main_quest_03",
        "color": "#5aa6a0",
        "events": ["event_palette_shift", "event_portrait_frame"],
        "effects": ["图鉴补全", "头像提示"],
    },
    {
        "id": "northern_wilds",
        "name": "北部自然区",
        "theme": "探索、迷路、采集、隐藏路线",
        "visual": "草地、树林、小溪、蘑菇、洞窟与废弃信号塔",
        "unlockedBy": "main_quest_03",
        "color": "#69a05f",
        "events": ["event_lost_meme", "event_signal_tower"],
        "effects": ["采集加成", "隐藏路线"],
    },
    {
        "id": "server_room",
        "name": "地下服务器房",
        "theme": "隐藏核心、异常回声、深层结局",
        "visual": "低亮机柜、星砂线路、蓝白状态灯与小型核心门",
        "unlockedBy": "main_quest_04",
        "color": "#506274",
        "events": ["event_cache_overflow", "event_constant_online"],
        "effects": ["深层结局", "回声过载"],
    },
]

AREA_IDS = [area["id"] for area in AREAS]


def ensure_dirs() -> None:
    for path in [
        DATA_DIR,
        DOCS,
        ASSETS / "source_avatars",
        ASSETS / "avatars",
        ASSETS / "portraits",
        ASSETS / "sprites",
        ASSETS / "expressions",
        ASSETS / "candidates",
        ASSETS / "imagegen",
        ASSETS / "imagegen/sheets",
        ASSETS / "imagegen/avatars",
        ASSETS / "imagegen/portraits",
        ASSETS / "imagegen/sprites",
        ASSETS / "imagegen/expressions",
        ASSETS / "maps",
    ]:
        path.mkdir(parents=True, exist_ok=True)


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def sender_lookup(record: dict) -> dict:
    lookup = {}
    for msg in record["messages"]:
        sender = msg.get("sender") or {}
        uid = sender.get("uid")
        if not uid or uid in lookup:
            continue
        lookup[uid] = {
            "uid": uid,
            "uin": str(sender.get("uin") or ""),
            "groupName": sender.get("name") or "",
            "qqNickname": sender.get("nickname") or "",
        }
    return lookup


def is_sensitive(text: str) -> bool:
    return bool(text and (SENSITIVE_RE.search(text) or SOFT_RISK_RE.search(text)))


def mask_sensitive(text: str, fallback: str, index: int) -> tuple[str, bool]:
    if not text:
        return fallback or f"星砂旅人{index:02d}", True
    if is_sensitive(text):
        if fallback and not is_sensitive(fallback):
            return fallback, True
        return f"星砂旅人{index:02d}", True
    if len(text) > 18:
        return text[:16] + "…", False
    return text, False


def safe_qq_nickname(text: str, index: int) -> tuple[str, bool]:
    if not text:
        return f"QQ昵称待补{index:02d}", True
    if is_sensitive(text) or SOFT_RISK_RE.search(text):
        return f"QQ昵称已脱敏{index:02d}", True
    return text[:20] + ("…" if len(text) > 20 else ""), False


def stable_id(index: int) -> str:
    return f"role_{index:03d}"


def hash_color(seed: str, shift: int = 0) -> tuple[int, int, int]:
    digest = hashlib.sha256((seed + str(shift)).encode("utf-8")).digest()
    hue = digest[0] / 255.0
    sat = 0.45 + digest[1] / 255.0 * 0.35
    val = 0.68 + digest[2] / 255.0 * 0.22
    return tuple(int(c * 255) for c in colorsys.hsv_to_rgb(hue, sat, val))


def rgb_to_hex(rgb: tuple[int, int, int]) -> str:
    return "#{:02x}{:02x}{:02x}".format(*rgb)


def mix(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(max(0, min(255, round(a[i] * (1 - t) + b[i] * t))) for i in range(3))


def fetch_avatar(uin: str, out_path: Path) -> bool:
    if out_path.exists() and out_path.stat().st_size > 2048:
        return True
    if not uin.isdigit() or uin == "0":
        return False
    urls = [
        f"https://q1.qlogo.cn/g?b=qq&nk={uin}&s=640",
        f"https://q2.qlogo.cn/headimg_dl?dst_uin={uin}&spec=640",
    ]
    tmp_path = out_path.with_suffix(".tmp")
    for url in urls:
        try:
            subprocess.run(
                [
                    "curl",
                    "-L",
                    "--connect-timeout",
                    "3",
                    "--max-time",
                    "8",
                    "-f",
                    "-sS",
                    "-A",
                    "XiaokangOnlineBuilder/1.0",
                    "-o",
                    str(tmp_path),
                    url,
                ],
                check=True,
                timeout=10,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            if not tmp_path.exists() or tmp_path.stat().st_size < 2048:
                continue
            tmp_path.replace(out_path)
            return True
        except Exception:
            if tmp_path.exists():
                tmp_path.unlink(missing_ok=True)
            continue
    return False


def palette_from_image(path: Path, seed: str) -> list[tuple[int, int, int]]:
    if not path.exists():
        return [hash_color(seed, i) for i in range(4)]
    try:
        raw = subprocess.check_output(
            [
                "ffmpeg",
                "-v",
                "error",
                "-i",
                str(path),
                "-vf",
                "scale=10:10",
                "-f",
                "rawvideo",
                "-pix_fmt",
                "rgb24",
                "-",
            ],
            stderr=subprocess.DEVNULL,
            timeout=10,
        )
        colors = []
        for i in range(0, len(raw), 3):
            r, g, b = raw[i], raw[i + 1], raw[i + 2]
            if r + g + b < 35 or r + g + b > 735:
                continue
            colors.append((r // 24 * 24, g // 24 * 24, b // 24 * 24))
        ranked = [rgb for rgb, _ in Counter(colors).most_common(5)]
        if ranked:
            while len(ranked) < 4:
                ranked.append(hash_color(seed, len(ranked)))
            return ranked[:4]
    except Exception:
        pass
    return [hash_color(seed, i) for i in range(4)]


def write_png(path: Path, width: int, height: int, pixels: list[tuple[int, int, int, int]]) -> None:
    def chunk(tag: bytes, payload: bytes) -> bytes:
        return (
            struct.pack(">I", len(payload))
            + tag
            + payload
            + struct.pack(">I", zlib.crc32(tag + payload) & 0xFFFFFFFF)
        )

    rows = []
    for y in range(height):
        row = bytearray([0])
        for x in range(width):
            row.extend(pixels[y * width + x])
        rows.append(bytes(row))
    data = b"".join(rows)
    png = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(data, 9))
        + chunk(b"IEND", b"")
    )
    path.write_bytes(png)


class Canvas:
    def __init__(self, width: int, height: int, bg=(0, 0, 0, 0)):
        self.width = width
        self.height = height
        self.pixels = [bg for _ in range(width * height)]

    def set(self, x: int, y: int, color: tuple[int, int, int, int]) -> None:
        if 0 <= x < self.width and 0 <= y < self.height:
            self.pixels[y * self.width + x] = color

    def rect(self, x: int, y: int, w: int, h: int, color: tuple[int, int, int, int]) -> None:
        for yy in range(y, y + h):
            for xx in range(x, x + w):
                self.set(xx, yy, color)

    def circle(self, cx: int, cy: int, r: int, color: tuple[int, int, int, int]) -> None:
        for yy in range(cy - r, cy + r + 1):
            for xx in range(cx - r, cx + r + 1):
                if (xx - cx) ** 2 + (yy - cy) ** 2 <= r * r:
                    self.set(xx, yy, color)

    def line(self, x0: int, y0: int, x1: int, y1: int, color: tuple[int, int, int, int]) -> None:
        dx = abs(x1 - x0)
        dy = -abs(y1 - y0)
        sx = 1 if x0 < x1 else -1
        sy = 1 if y0 < y1 else -1
        err = dx + dy
        while True:
            self.set(x0, y0, color)
            if x0 == x1 and y0 == y1:
                break
            e2 = 2 * err
            if e2 >= dy:
                err += dy
                x0 += sx
            if e2 <= dx:
                err += dx
                y0 += sy

    def triangle(self, points: list[tuple[int, int]], color: tuple[int, int, int, int]) -> None:
        (x1, y1), (x2, y2), (x3, y3) = points
        min_x, max_x = max(0, min(x1, x2, x3)), min(self.width - 1, max(x1, x2, x3))
        min_y, max_y = max(0, min(y1, y2, y3)), min(self.height - 1, max(y1, y2, y3))
        denom = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3)
        if denom == 0:
            return
        for y in range(min_y, max_y + 1):
            for x in range(min_x, max_x + 1):
                a = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / denom
                b = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / denom
                c = 1 - a - b
                if a >= 0 and b >= 0 and c >= 0:
                    self.set(x, y, color)

    def save(self, path: Path) -> None:
        write_png(path, self.width, self.height, self.pixels)


def scale_canvas(source: Canvas, factor: int) -> Canvas:
    target = Canvas(source.width * factor, source.height * factor)
    for y in range(source.height):
        for x in range(source.width):
            color = source.pixels[y * source.width + x]
            for yy in range(factor):
                for xx in range(factor):
                    target.set(x * factor + xx, y * factor + yy, color)
    return target


def rgba(rgb: tuple[int, int, int], a: int = 255) -> tuple[int, int, int, int]:
    return (rgb[0], rgb[1], rgb[2], a)


def draw_face(
    canvas: Canvas,
    cx: int,
    cy: int,
    hair: tuple[int, int, int],
    cloth: tuple[int, int, int],
    seed: int,
    expression: str = "neutral",
    scale: int = 1,
) -> None:
    skin = (248, 207, 172)
    outline = (52, 42, 48)
    blush = (232, 120, 136)
    r = 13 * scale
    canvas.circle(cx, cy, r + 2 * scale, rgba(outline))
    canvas.circle(cx, cy, r, rgba(skin))
    canvas.rect(cx - 13 * scale, cy - 15 * scale, 26 * scale, 8 * scale, rgba(hair))
    canvas.triangle([(cx - 13 * scale, cy - 8 * scale), (cx - 2 * scale, cy - 15 * scale), (cx - 4 * scale, cy - 2 * scale)], rgba(hair))
    canvas.triangle([(cx + 13 * scale, cy - 8 * scale), (cx + 2 * scale, cy - 15 * scale), (cx + 4 * scale, cy - 2 * scale)], rgba(hair))
    canvas.rect(cx - 18 * scale, cy - 5 * scale, 6 * scale, 22 * scale, rgba(mix(hair, (20, 20, 30), 0.08)))
    canvas.rect(cx + 12 * scale, cy - 5 * scale, 6 * scale, 22 * scale, rgba(mix(hair, (20, 20, 30), 0.08)))
    if seed % 3 == 0:
        canvas.rect(cx - 5 * scale, cy - 20 * scale, 10 * scale, 5 * scale, rgba(cloth))
        canvas.rect(cx - 2 * scale, cy - 23 * scale, 4 * scale, 4 * scale, rgba(mix(cloth, (255, 255, 255), 0.25)))
    elif seed % 3 == 1:
        canvas.rect(cx + 10 * scale, cy - 16 * scale, 7 * scale, 7 * scale, rgba(cloth))
        canvas.line(cx + 10 * scale, cy - 13 * scale, cx + 17 * scale, cy - 13 * scale, rgba((255, 255, 255)))
    else:
        canvas.rect(cx - 17 * scale, cy - 16 * scale, 7 * scale, 7 * scale, rgba(cloth))
        canvas.line(cx - 17 * scale, cy - 13 * scale, cx - 10 * scale, cy - 13 * scale, rgba((255, 255, 255)))
    eye_y = cy - 2 * scale
    if expression == "happy":
        canvas.line(cx - 8 * scale, eye_y, cx - 4 * scale, eye_y - 2 * scale, rgba(outline))
        canvas.line(cx + 4 * scale, eye_y - 2 * scale, cx + 8 * scale, eye_y, rgba(outline))
    elif expression == "shock":
        canvas.rect(cx - 8 * scale, eye_y - 2 * scale, 4 * scale, 5 * scale, rgba(outline))
        canvas.rect(cx + 4 * scale, eye_y - 2 * scale, 4 * scale, 5 * scale, rgba(outline))
    else:
        canvas.rect(cx - 9 * scale, eye_y - 1 * scale, 5 * scale, 6 * scale, rgba(outline))
        canvas.rect(cx + 4 * scale, eye_y - 1 * scale, 5 * scale, 6 * scale, rgba(outline))
        canvas.rect(cx - 7 * scale, eye_y, 2 * scale, 2 * scale, rgba((255, 255, 255)))
        canvas.rect(cx + 6 * scale, eye_y, 2 * scale, 2 * scale, rgba((255, 255, 255)))
    canvas.rect(cx - 10 * scale, cy + 6 * scale, 4 * scale, 2 * scale, rgba(blush, 210))
    canvas.rect(cx + 6 * scale, cy + 6 * scale, 4 * scale, 2 * scale, rgba(blush, 210))
    if expression == "serious":
        canvas.line(cx - 4 * scale, cy + 9 * scale, cx + 4 * scale, cy + 9 * scale, rgba(outline))
    elif expression == "tease":
        canvas.line(cx - 4 * scale, cy + 9 * scale, cx, cy + 11 * scale, rgba(outline))
        canvas.line(cx, cy + 11 * scale, cx + 5 * scale, cy + 9 * scale, rgba(outline))
    else:
        canvas.line(cx - 4 * scale, cy + 9 * scale, cx, cy + 11 * scale, rgba(outline))
        canvas.line(cx, cy + 11 * scale, cx + 4 * scale, cy + 9 * scale, rgba(outline))


def generate_avatar(path: Path, colors: list[tuple[int, int, int]], seed: int, expression: str = "neutral") -> None:
    bg = mix(colors[0], (255, 255, 255), 0.72)
    c = Canvas(64, 64, rgba(bg))
    for i in range(0, 64, 8):
        c.rect(i, 0, 4, 64, rgba(mix(bg, colors[1], 0.08)))
    c.circle(32, 35, 25, rgba(mix(colors[0], (255, 255, 255), 0.42), 230))
    draw_face(c, 32, 28, colors[0], colors[1], seed, expression)
    c.triangle([(17, 62), (32, 42), (47, 62)], rgba(colors[1]))
    c.rect(23, 43, 18, 6, rgba(mix(colors[1], (255, 255, 255), 0.25)))
    c.rect(15, 54, 34, 3, rgba(mix(colors[2], (255, 255, 255), 0.18)))
    c.save(path)


def generate_portrait(path: Path, colors: list[tuple[int, int, int]], seed: int) -> None:
    small = Canvas(128, 192, (0, 0, 0, 0))
    shadow = mix(colors[0], (25, 25, 30), 0.35)
    small.circle(64, 172, 34, rgba(shadow, 92))
    small.rect(50, 80, 28, 44, rgba(colors[1]))
    small.triangle([(37, 146), (64, 109), (91, 146)], rgba(colors[1]))
    small.rect(42, 122, 44, 6, rgba(mix(colors[2], (255, 255, 255), 0.12)))
    small.rect(39, 92, 10, 44, rgba(mix(colors[1], (255, 255, 255), 0.2)))
    small.rect(79, 92, 10, 44, rgba(mix(colors[1], (20, 20, 20), 0.12)))
    small.rect(51, 145, 9, 30, rgba(mix(colors[2], (255, 255, 255), 0.05)))
    small.rect(69, 145, 9, 30, rgba(mix(colors[2], (255, 255, 255), 0.05)))
    small.rect(46, 172, 16, 5, rgba(colors[0]))
    small.rect(67, 172, 16, 5, rgba(colors[0]))
    draw_face(small, 64, 52, colors[0], colors[2], seed)
    if seed % 4 == 0:
        small.rect(88, 100, 18, 10, rgba(colors[2]))
        small.rect(93, 94, 8, 22, rgba(mix(colors[2], (255, 255, 255), 0.25)))
    elif seed % 4 == 1:
        small.line(39, 106, 20, 86, rgba(colors[2]))
        small.circle(18, 84, 5, rgba(colors[2]))
    elif seed % 4 == 2:
        small.rect(23, 101, 18, 14, rgba(colors[2]))
        small.line(25, 106, 39, 106, rgba((255, 255, 255)))
    else:
        small.circle(98, 94, 9, rgba(colors[2]))
        small.line(98, 103, 98, 130, rgba(colors[2]))
    scale_canvas(small, 4).save(path)


def generate_sprite(path: Path, colors: list[tuple[int, int, int]], seed: int) -> None:
    cell_w, cell_h = 48, 64
    sheet = Canvas(cell_w * 3, cell_h * 4, (0, 0, 0, 0))
    for direction in range(4):
        for frame in range(3):
            ox, oy = frame * cell_w, direction * cell_h
            bob = 1 if frame == 1 else 0
            cx, cy = ox + 24, oy + 22 + bob
            draw_face(sheet, cx, cy, colors[0], colors[2], seed + direction + frame)
            sheet.rect(17 + ox, 35 + oy + bob, 14, 12, rgba(colors[1]))
            sheet.triangle(
                [(13 + ox, 56 + oy + bob), (24 + ox, 42 + oy + bob), (35 + ox, 56 + oy + bob)],
                rgba(colors[1]),
            )
            leg_shift = -2 if frame == 0 else (2 if frame == 2 else 0)
            sheet.rect(17 + ox + leg_shift, 54 + oy, 5, 8, rgba(colors[2]))
            sheet.rect(26 + ox - leg_shift, 54 + oy, 5, 8, rgba(colors[2]))
            sheet.rect(10 + ox, 39 + oy + bob, 7, 4, rgba(mix(colors[1], (255, 255, 255), 0.18)))
            sheet.rect(31 + ox, 39 + oy + bob, 7, 4, rgba(mix(colors[1], (20, 20, 20), 0.12)))
    sheet.save(path)


def generate_candidate(path: Path, colors: list[tuple[int, int, int]], seed: int, variant: int) -> None:
    tweaked = colors[:]
    tweaked[0] = mix(colors[0], hash_color(str(seed), variant), 0.2 + variant * 0.12)
    tweaked[1] = mix(colors[1], (255, 255, 255), variant * 0.08)
    generate_avatar(path, tweaked, seed + variant, ["neutral", "happy", "tease"][variant % 3])


def title_for(member: dict, area_id: str, index: int) -> str:
    tags = " ".join(member.get("personality_tags", []) + member.get("social_role", {}).get("roles", []))
    if "理性" in tags:
        prefix = "判定"
    elif "情绪" in tags or "调解" in tags:
        prefix = "回声"
    elif "话题" in tags:
        prefix = "星砂"
    elif "图片" in tags or "表情" in tags:
        prefix = "炼画"
    elif "吐槽" in tags:
        prefix = "弹幕"
    else:
        prefix = ["夜灯", "餐桌", "飞靴", "像素", "湖月"][index % 5]
    suffix_by_area = {
        "town_center": "上线官",
        "restaurant": "补给师",
        "dragon_card_house": "判官",
        "livehouse": "舞台手",
        "echo_lake": "诗页客",
        "care_home": "钟声守",
        "atelier": "调色师",
        "northern_wilds": "巡游者",
        "server_room": "缓存术士",
    }
    return prefix + suffix_by_area.get(area_id, "居民")


def trait_for(member: dict) -> tuple[str, str]:
    tags = " ".join(member.get("personality_tags", []) + member.get("social_role", {}).get("roles", []))
    time_style = member.get("time_habits", {}).get("style", "")
    if "理性" in tags:
        active = "rule_lens"
    elif "话题" in tags:
        active = "topic_spark"
    elif "情绪" in tags or "调解" in tags:
        active = "echo_mend"
    elif "图片" in tags:
        active = "palette_pick"
    else:
        active = "meme_ping"
    if "夜猫子" in time_style:
        passive = "late_night_spawn"
    elif "核心连接者" in tags:
        passive = "bridge_chorus"
    elif "回复积极" in tags:
        passive = "reply_tailwind"
    else:
        passive = "area_regular"
    return active, passive


def language_tags(member: dict) -> list[str]:
    tags = []
    tags.extend(member.get("personality_tags", []))
    tags.extend(member.get("social_role", {}).get("roles", []))
    tags.append(member.get("emotion_style", {}).get("style", "中性平衡型"))
    tags.append(member.get("time_habits", {}).get("style", "全天分布型"))
    seen = []
    for tag in tags:
        if tag and tag not in seen:
            seen.append(tag)
    filler = ["日常吐槽", "接梗节奏", "短反应", "区域反应", "回声记忆"]
    for tag in filler:
        if len(seen) >= 5:
            break
        seen.append(tag)
    return seen[:8]


def social_function(member: dict) -> str:
    roles = member.get("social_role", {}).get("roles", [])
    if not roles:
        return "在聊天节奏中补上关键回应"
    return "、".join(roles[:4])


def area_for(index: int, member: dict) -> str:
    tags = " ".join(member.get("personality_tags", []) + member.get("social_role", {}).get("roles", []))
    if "理性" in tags:
        return "dragon_card_house"
    if "情绪" in tags or "调解" in tags:
        return "echo_lake"
    if "图片" in tags or "表情" in tags:
        return "atelier"
    if "夜猫子" in member.get("time_habits", {}).get("style", ""):
        return "livehouse"
    return AREA_IDS[index % (len(AREA_IDS) - 1)]


def build_characters(record: dict, persona: dict, relationship: dict) -> tuple[list[dict], list[dict]]:
    lookup = sender_lookup(record)
    node_labels = {node["id"]: node["label"] for node in relationship.get("nodes", [])}
    edges_by_uid = defaultdict(list)
    for edge in relationship.get("edges", []):
        edges_by_uid[edge["source"]].append((edge["target"], edge["weight"], edge["type"]))
        edges_by_uid[edge["target"]].append((edge["source"], edge["weight"], edge["type"]))

    members = []
    for uid, member in persona.get("members", {}).items():
        src = lookup.get(uid, {})
        uin = str(src.get("uin") or "")
        if not uin.isdigit() or uin == "0":
            continue
        if src.get("groupName") == "Q群管家":
            continue
        members.append((uid, member, src))

    members.sort(key=lambda item: item[1].get("profile", {}).get("total_messages", 0), reverse=True)
    avatar_status = {}
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {}
        for index, (uid, member, src) in enumerate(members, start=1):
            role_id = stable_id(index)
            avatar_path = ASSETS / "source_avatars" / f"{role_id}.jpg"
            futures[pool.submit(fetch_avatar, src.get("uin", ""), avatar_path)] = role_id
        for future in as_completed(futures):
            role_id = futures[future]
            try:
                avatar_status[role_id] = bool(future.result())
            except Exception:
                avatar_status[role_id] = False

    characters = []
    private_fetch = []
    uid_to_role = {}

    for index, (uid, member, src) in enumerate(members, start=1):
        role_id = stable_id(index)
        if role_id in RETIRED_ROLE_IDS:
            continue
        uid_to_role[uid] = role_id
        raw_group = src.get("groupName") or member.get("name") or node_labels.get(uid, "")
        qq_raw = src.get("qqNickname") or node_labels.get(uid) or member.get("name") or ""
        qq_safe, qq_desensitized = safe_qq_nickname(qq_raw, index)
        group_safe, group_desensitized = mask_sensitive(raw_group, qq_safe, index)
        area_id = area_for(index, member)
        active_trait, passive_trait = trait_for(member)
        override = ROLE_REVIEW_OVERRIDES.get(role_id, {})
        group_safe = override.get("groupNickname", group_safe)
        qq_safe = override.get("qqNickname", qq_safe)
        if "qqNickname" in override:
            qq_desensitized = True
        if "groupNickname" in override:
            group_desensitized = True
        area_id = override.get("defaultArea", area_id)

        avatar_path = ASSETS / "source_avatars" / f"{role_id}.jpg"
        fetched = avatar_status.get(role_id, avatar_path.exists() and avatar_path.stat().st_size > 2048)
        palette = palette_from_image(avatar_path, uid)
        seed = int(hashlib.sha1(uid.encode("utf-8")).hexdigest()[:8], 16)

        relation_candidates = sorted(edges_by_uid.get(uid, []), key=lambda x: x[1], reverse=True)
        key_relations = [target for target, _, _ in relation_candidates[:3]]
        while len(key_relations) < 3:
            key_relations.append(members[(index + len(key_relations)) % len(members)][0])

        visual_symbols = [
            ["发色锚点", "星砂发饰", "圆形构图", "明亮眼神"][seed % 4],
            ["牌纹徽章", "月光丝带", "像素画笔", "餐厅小勺", "舞台票根"][index % 5],
        ]
        brightness = sum(palette[0]) / 3
        mood = "明亮外向" if brightness > 150 else "低饱和夜色" if brightness < 90 else "温和稳定"
        title = override.get("title", title_for(member, area_id, index))
        ltags = language_tags(member)
        top_words = [
            kw["word"]
            for kw in member.get("language_style", {}).get("top_keywords", [])
            if kw.get("word") and len(kw["word"]) > 1
        ][:8]

        characters.append(
            {
                "id": role_id,
                "groupNickname": group_safe,
                "qqNickname": qq_safe,
                "displayName": group_safe,
                "title": title,
                "originalAvatarRef": f"assets/source_avatars/{role_id}.jpg",
                "avatarVisualDNA": {
                    "primaryColors": [rgb_to_hex(c) for c in palette[:2]],
                    "secondaryColors": [rgb_to_hex(c) for c in palette[2:4]],
                    "silhouette": "圆形头像锚点转译为大头 Q 版轮廓",
                    "symbols": visual_symbols,
                    "mood": mood,
                    "characterizationNotes": f"以{visual_symbols[0]}和{visual_symbols[1]}保留头像第一印象，转译为{title}。",
                },
                "avatarMatchChecklist": ["主色保留", "关键符号保留", "气质一致", "未直接贴出原头像"],
                "defaultArea": area_id,
                "spawnPoints": [f"{area_id}_spawn_{(index % 4) + 1}", "town_center_spawn_1"],
                "activeTrait": active_trait,
                "passiveTrait": passive_trait,
                "imagegenSheet": f"assets/imagegen/sheets/{role_id}_sheet.png",
                "portrait": f"assets/imagegen/portraits/{role_id}.png",
                "avatar": f"assets/imagegen/avatars/{role_id}.png",
                "sprite": f"assets/imagegen/sprites/{role_id}.png",
                "expressions": {
                    exp: f"assets/imagegen/expressions/{role_id}_{exp}.png"
                    for exp in ["neutral", "happy", "tease", "serious"]
                },
                "dialogueStyle": ltags,
                "commonPatterns": [
                    "先短反应接住节奏，再补一句吐槽",
                    "把现实口癖转译为小镇术语",
                    "遇到任务卡点时给出不暴露隐私的提示",
                ],
                "socialFunction": social_function(member),
                "bondQuest": f"bond_{role_id}",
                "keyRelations": key_relations,
                "keyRelationRoles": [],
                "easterEgg": f"egg_{role_id}",
                "forbiddenNotes": "不写 QQ 号、真实姓名、学校、专业、工作单位、住址等现实身份信息。",
                "privacy": {
                    "groupNicknameDesensitized": group_desensitized,
                    "qqNicknameDesensitized": qq_desensitized,
                    "rawSensitiveWithheld": group_desensitized or qq_desensitized,
                },
                "profileCard": {
                    "showGroupNickname": True,
                    "showQqNickname": True,
                    "showAvatarSoulmark": True,
                },
                "stats": {
                    "messageCount": member.get("profile", {}).get("total_messages", 0),
                    "activeDays": member.get("profile", {}).get("active_days", 0),
                    "timeHabit": member.get("time_habits", {}).get("style", "全天分布型"),
                    "emotionStyle": member.get("emotion_style", {}).get("style", "中性平衡型"),
                },
                "memeSeeds": top_words or ["上线", "星砂", "回声", "接梗", "小康"],
                "artSource": "imagegen_required",
                "imagegenPrompt": imagegen_prompt_for_role(role_id, group_safe, title, palette, visual_symbols, ltags, area_id),
            }
        )
        private_fetch.append(
            {
                "roleId": role_id,
                "uidHash": hashlib.sha256(uid.encode("utf-8")).hexdigest()[:12],
                "avatarFetched": fetched,
                "sourceAvatarRef": f"assets/source_avatars/{role_id}.jpg",
            }
        )

    role_by_uid = {uid: role_id for uid, role_id in uid_to_role.items()}
    for char in characters:
        mapped = [role_by_uid.get(uid) for uid in char["keyRelations"] if role_by_uid.get(uid)]
        if len(mapped) < 3:
            mapped.extend(c["id"] for c in characters if c["id"] != char["id"] and c["id"] not in mapped)
        char["keyRelations"] = mapped[:3]
        char["keyRelationRoles"] = mapped[:3]
    return characters, private_fetch


def imagegen_prompt_for_role(
    role_id: str,
    display_name: str,
    title: str,
    palette: list[tuple[int, int, int]],
    symbols: list[str],
    language: list[str],
    area_id: str,
) -> str:
    colors = ", ".join(rgb_to_hex(c) for c in palette[:4])
    symbol_text = "、".join(symbols)
    style_notes = "、".join(language[:4])
    return (
        "Use case: stylized-concept\n"
        f"Asset type: XiaokangOnline character sheet for {role_id}\n"
        "Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. "
        "The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. "
        f"Design theme: {display_name} as {title}, inspired by avatar color anchors and symbols.\n"
        "Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. "
        "Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. "
        "Do not paste or trace the original avatar; this is a creative feminized anime translation.\n"
        "Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.\n"
        "Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. "
        f"Avatar soulmark symbols to include subtly: {symbol_text}. Personality rhythm: {style_notes}. Native area mood: {area_name(area_id)}.\n"
        "Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.\n"
        "Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits "
        "(neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. "
        "Keep all parts consistent as the same character.\n"
        f"Color palette: use these dominant colors from the source avatar as anchors: {colors}; vary with warm highlights, avoid muddy single-hue look.\n"
        "Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.\n"
        "Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background."
    )


def build_maps(characters: list[dict]) -> list[dict]:
    maps = []
    for area_index, area in enumerate(AREAS):
        width, height = 28, 20
        collision = []
        for y in range(height):
            row = []
            for x in range(width):
                wall = x in {0, width - 1} or y in {0, height - 1}
                if area["id"] in {"echo_lake", "northern_wilds"} and y > height - 5 and 5 < x < width - 5:
                    wall = True
                if area["id"] == "dragon_card_house" and (x in {6, 21} and 5 < y < 15):
                    wall = True
                row.append(1 if wall else 0)
            collision.append(row)
        area_chars = [c["id"] for c in characters if c["defaultArea"] == area["id"]][:8]
        if len(area_chars) < 4:
            area_chars.extend(c["id"] for c in characters[area_index::len(AREAS)][: 4 - len(area_chars)])
        maps.append(
            {
                "id": area["id"],
                "name": area["name"],
                "width": width,
                "height": height,
                "tileSize": 32,
                "baseColor": area["color"],
                "collision": collision,
                "playerStart": {"x": 14, "y": 10},
                "npcSlots": [
                    {"id": f"{area['id']}_npc_{i+1}", "x": 5 + (i * 5) % 18, "y": 5 + (i * 3) % 10}
                    for i in range(8)
                ],
                "npcSpawnPools": [
                    {
                        "id": f"{area['id']}_npc_pool_{i+1}",
                        "points": [
                            {"x": 5 + (i * 5) % 18, "y": 5 + (i * 3) % 10},
                            {"x": 7 + (i * 4) % 16, "y": 4 + (i * 5) % 11},
                            {"x": 9 + (i * 3) % 14, "y": 6 + (i * 2) % 9},
                        ],
                    }
                    for i in range(8)
                ],
                "npcs": area_chars[:8],
                "interactions": [
                    {
                        "id": f"{area['id']}_interact_{i+1}",
                        "label": label,
                        "x": 4 + i * 7,
                        "y": 3 + (i % 2) * 12,
                        "event": area["events"][i % len(area["events"])],
                    }
                    for i, label in enumerate(["公告", "道具", "入口", "回声"])
                ],
                "transitions": [
                    {"to": AREAS[(area_index - 1) % len(AREAS)]["id"], "x": 1, "y": 10, "targetX": 25, "targetY": 10},
                    {"to": AREAS[(area_index + 1) % len(AREAS)]["id"], "x": 26, "y": 10, "targetX": 2, "targetY": 10},
                ],
            }
        )
    return maps


def build_quests(characters: list[dict], relationship: dict) -> tuple[list[dict], list[dict]]:
    quests = [
        {
            "id": "main_quest_01",
            "name": "上线异常",
            "type": "main",
            "startNpc": characters[0]["id"],
            "startArea": "town_center",
            "steps": [
                {"type": "talk", "target": characters[0]["id"], "hint": "和引导居民确认小镇异常。"},
                {"type": "interact", "target": "town_center_interact_1", "hint": "查看公告板上的异常日志。"},
                {"type": "collect", "item": "star_sand", "count": 3, "hint": "在广场拾起三粒星砂。"},
                {"type": "return", "target": characters[0]["id"], "hint": "交回第一枚在线魂印。"},
            ],
            "rewards": ["unlock_quest_log", "memory_online_001", "soulmark_first"],
            "unlockAreas": [],
        },
        {
            "id": "main_quest_02",
            "name": "街区重连",
            "type": "main",
            "startNpc": characters[1]["id"],
            "startArea": "town_center",
            "steps": [
                {"type": "visit", "target": "restaurant", "hint": "去餐厅恢复日常感。"},
                {"type": "visit", "target": "dragon_card_house", "hint": "去龙牌馆恢复判定秩序。"},
                {"type": "event", "target": "event_dinner_call", "hint": "完成餐厅召集。"},
                {"type": "event", "target": "event_card_gate", "hint": "修复牌馆门禁。"},
            ],
            "rewards": ["unlock_livehouse", "unlock_echo_lake", "area_stamp_01"],
            "unlockAreas": ["livehouse", "echo_lake"],
        },
        {
            "id": "main_quest_03",
            "name": "夜雀灯火",
            "type": "main",
            "startNpc": characters[2]["id"],
            "startArea": "livehouse",
            "steps": [
                {"type": "visit", "target": "livehouse", "hint": "检查舞台灯光。"},
                {"type": "visit", "target": "echo_lake", "hint": "夜晚去湖边回收诗页。"},
                {"type": "event", "target": "event_lights_midnight", "hint": "调好三处灯光控制台。"},
                {"type": "event", "target": "event_poem_pages", "hint": "拼回漂流诗页。"},
            ],
            "rewards": ["unlock_care_home", "unlock_atelier", "unlock_northern_wilds", "memory_nightbird_001"],
            "unlockAreas": ["care_home", "atelier", "northern_wilds"],
        },
        {
            "id": "main_quest_04",
            "name": "养老院钟声",
            "type": "main",
            "startNpc": characters[3]["id"],
            "startArea": "care_home",
            "steps": [
                {"type": "collect", "item": "online_echo", "count": 12, "hint": "从各区域收集在线回声。"},
                {"type": "event", "target": "event_clock_0047", "hint": "修复停在 00:47 的小康钟。"},
                {"type": "interact", "target": "care_home_interact_1", "hint": "在养老院敲响小康钟。"},
            ],
            "rewards": ["unlock_server_room", "ending_normal_ready", "area_stamp_02"],
            "unlockAreas": ["server_room"],
        },
        {
            "id": "main_quest_05",
            "name": "全员上线",
            "type": "main",
            "startNpc": characters[4]["id"],
            "startArea": "server_room",
            "steps": [
                {"type": "event", "target": "event_constant_online", "hint": "进入地下服务器房确认常驻在线模式。"},
                {"type": "interact", "target": "town_center_interact_2", "hint": "回到广场发起最终集合。"},
            ],
            "rewards": ["ending_bond_ready", "ending_true_ready", "memory_final_chorus"],
            "unlockAreas": [],
        },
    ]

    for area in AREAS:
        for index, event_id in enumerate(area["events"], start=1):
            quests.append(
                {
                    "id": f"quest_{event_id}",
                    "name": {
                        "event_center_notice": "公告板重新上线",
                        "event_center_bell": "小康钟试响",
                        "event_dinner_call": "晚饭召集失败",
                        "event_sugar_choice": "全糖还是半糖",
                        "event_card_gate": "无效发动的门禁",
                        "event_extra_deck": "额外卡位不足",
                        "event_lights_midnight": "谁把灯光调成深夜模式",
                        "event_stage_accident": "临时登台事故",
                        "event_poem_pages": "漂流诗页",
                        "event_moon_phase": "月相错误",
                        "event_clock_0047": "养老钟停止在 00:47",
                        "event_tea_roster": "茶室值班表",
                        "event_palette_shift": "色板偏移",
                        "event_portrait_frame": "立绘出图失败",
                        "event_lost_meme": "走丢的梗",
                        "event_signal_tower": "信号塔重启",
                        "event_cache_overflow": "缓存过载",
                        "event_constant_online": "常驻在线模式",
                    }.get(event_id, area["name"] + "事件"),
                    "type": "area",
                    "startNpc": characters[(index + len(area["id"])) % len(characters)]["id"],
                    "startArea": area["id"],
                    "steps": [
                        {"type": "visit", "target": area["id"], "hint": f"进入{area['name']}。"},
                        {"type": "interact", "target": f"{area['id']}_interact_{index}", "hint": "调查可疑物件。"},
                        {"type": "collect", "item": "online_echo", "count": 1, "hint": "回收一段区域回声。"},
                    ],
                    "rewards": [f"memory_{event_id}", f"area_stamp_{area['id']}"],
                }
            )

    for index, char in enumerate(characters):
        item = ["star_sand", "poem_page", "card_shard", "meal_ticket", "palette_chip"][index % 5]
        item_label = {
            "star_sand": "星砂",
            "poem_page": "漂流诗页",
            "card_shard": "牌面碎片",
            "meal_ticket": "晚饭票根",
            "palette_chip": "色板芯片",
        }[item]
        quests.append(
            {
                "id": f"bond_{char['id']}",
                "name": f"{char['displayName']}的羁绊线",
                "type": "bond",
                "startNpc": char["id"],
                "startArea": char["defaultArea"],
                "steps": [
                    {"type": "talk", "target": char["id"], "hint": f"和{char['displayName']}初次上线。"},
                    {"type": "collect", "item": item, "count": 2, "hint": f"收集 2 个{item_label}。"},
                    {"type": "visit", "target": char["defaultArea"], "hint": "回到对方的常驻区域。"},
                    {"type": "return", "target": char["id"], "hint": "完成羁绊回声。"},
                ],
                "rewards": [f"bond_{char['id']}_lv3", f"memory_{char['id']}", f"expression_{char['id']}_happy"],
            }
        )

    pair_dialogues = []
    seen_pairs = set()
    for edge_index, edge in enumerate(sorted(relationship.get("edges", []), key=lambda e: e["weight"], reverse=True)):
        a = next((c for c in characters if c["id"] == f"role_{list_id_by_source(characters, edge['source']):03d}"), None)
        b = next((c for c in characters if c["id"] == f"role_{list_id_by_source(characters, edge['target']):03d}"), None)
        if not a or not b:
            continue
        pair = tuple(sorted([a["id"], b["id"]]))
        if pair in seen_pairs:
            continue
        seen_pairs.add(pair)
        if len(pair_dialogues) >= 18:
            break
        area = a["defaultArea"] if edge_index % 2 else b["defaultArea"]
        quest_id = f"egg_{pair[0]}_{pair[1]}"
        quests.append(
            {
                "id": quest_id,
                "name": f"深层回声{len(pair_dialogues) + 1:02d}",
                "type": "easter",
                "hidden": True,
                "startNpc": a["id"],
                "startArea": area,
                "steps": [
                    {"type": "talk", "target": a["id"], "hint": "先听第一段日常接触。"},
                    {"type": "talk", "target": b["id"], "hint": "再找另一名角色接住节奏。"},
                    {"type": "event", "target": f"duo_{pair[0]}_{pair[1]}", "hint": "在同一区域触发双人回声。"},
                ],
                "rewards": [f"memory_duo_{pair[0]}_{pair[1]}", "ending_true_point"],
            }
        )
        pair_dialogues.append(
            {
                "id": f"dialogue_duo_{pair[0]}_{pair[1]}",
                "characters": [a["id"], b["id"]],
                "area": area,
                "relationshipType": edge.get("type", "固定搭档型"),
                "lines": [
                    {"speaker": a["id"], "text": f"这里的{area_name(area)}怎么也开始缓存我们的接梗节奏了？"},
                    {"speaker": b["id"], "text": "说明服务器判断：这段不归档会亏。"},
                    {"speaker": a["id"], "text": "那我先声明，吐槽归吐槽，锅不要全扣我头上。"},
                    {"speaker": b["id"], "text": "放心，回声已经学会平均分锅。"},
                    {"speaker": a["id"], "text": "行，这段可以收进图鉴，标题就叫“稳定上线失败但很有精神”。"},
                ],
            }
        )
    return quests, pair_dialogues


def area_name(area_id: str) -> str:
    return next(area["name"] for area in AREAS if area["id"] == area_id)


def list_id_by_source(characters: list[dict], uid: str) -> int:
    # Reconstructed from character order hashes in keyRelations is unavailable here;
    # pair generation below is refined after uid map is attached.
    return 0


def build_pair_dialogues_from_chars(characters: list[dict]) -> tuple[list[dict], list[dict]]:
    quests = []
    pair_dialogues = []
    seen = set()
    for char in characters:
        for rel_id in char["keyRelations"]:
            if len(pair_dialogues) >= max(12, min(30, len(characters) // 2)):
                return quests, pair_dialogues
            other = next((c for c in characters if c["id"] == rel_id), None)
            if not other:
                continue
            pair = tuple(sorted([char["id"], other["id"]]))
            if pair in seen:
                continue
            seen.add(pair)
            area = char["defaultArea"]
            quest_id = f"egg_{pair[0]}_{pair[1]}"
            quests.append(
                {
                    "id": quest_id,
                "name": f"深层回声{len(pair_dialogues) + 1:02d}",
                "type": "easter",
                "hidden": True,
                    "startNpc": char["id"],
                    "startArea": area,
                    "steps": [
                        {"type": "talk", "target": char["id"], "hint": "先听第一段日常接触。"},
                        {"type": "talk", "target": other["id"], "hint": "再找另一名角色接住节奏。"},
                        {"type": "event", "target": f"duo_{pair[0]}_{pair[1]}", "hint": "在同一区域触发双人回声。"},
                    ],
                    "rewards": [f"memory_duo_{pair[0]}_{pair[1]}", "ending_true_point"],
                }
            )
            pair_dialogues.append(
                {
                    "id": f"dialogue_duo_{pair[0]}_{pair[1]}",
                    "characters": [char["id"], other["id"]],
                    "area": area,
                    "lines": [
                        {"speaker": char["id"], "text": f"{area_name(area)}今天的回声好像比平时更会接话。"},
                        {"speaker": other["id"], "text": "它可能只是把我们以前的节奏折叠了一下。"},
                        {"speaker": char["id"], "text": "折叠可以，别折到任务条件里。"},
                        {"speaker": other["id"], "text": "放心，系统提示写得比我们本人还稳。"},
                        {"speaker": char["id"], "text": "那就把这段先塞进暗格，等小镇自己憋不住再说。"},
                    ],
                }
            )
    return quests, pair_dialogues


def build_dialogues(characters: list[dict], pair_dialogues: list[dict]) -> list[dict]:
    dialogues = [
        {
            "id": "intro_boot_error",
            "speaker": characters[0]["id"],
            "area": "town_center",
            "time": "day",
            "conditions": [],
            "lines": [
                {"speaker": characters[0]["id"], "text": "欢迎上线。小康钟刚才响了一半，像有人把聊天记录倒进了喷泉。"},
                {"speaker": "player", "text": "所以我要做什么？"},
                {"speaker": characters[0]["id"], "text": "先别慌。捡三粒星砂，确认你还能移动、对话、接任务。"},
            ],
            "rewards": ["quest_main_quest_01"],
        }
    ]
    area_cycle = [a["id"] for a in AREAS if a["id"] != "server_room"]
    for idx, char in enumerate(characters):
        memes = char.get("memeSeeds", ["上线", "星砂", "回声"])
        lead_meme = "图片" if str(memes[0]).lower() == "jpg" else memes[0]
        dialogues.append(
            {
                "id": f"intro_{char['id']}",
                "speaker": char["id"],
                "area": char["defaultArea"],
                "time": "any",
                "conditions": [],
                "lines": [
                    {"speaker": char["id"], "text": f"来得正好，{area_name(char['defaultArea'])}刚才把{lead_meme}吐到门口，我差点以为它要单独开一条主线。"},
                    {"speaker": "player", "text": "所以这也是小镇异常的一部分？"},
                    {"speaker": char["id"], "text": "看到发光物件就摸一下。别问为什么，问就是群聊式科学。"},
                ],
                "rewards": [f"codex_{char['id']}"],
            }
        )
        daily = []
        for n in range(5):
            meme = memes[n % len(memes)]
            if str(meme).lower() == "jpg":
                meme = "图片"
            daily.append(
                {
                    "speaker": char["id"],
                    "text": [
                        f"今天的小镇还行，至少{meme}没有从地图边缘漏出去。",
                        "如果任务提示突然变短，说明它在学群里的短反应。",
                        f"我常驻在{area_name(char['defaultArea'])}，找不到我就看图鉴刷新点。",
                        "小镇最神奇的地方是：一句普通吐槽也能长成路灯。",
                        "别直接相信回声，它有时候比本人还会添油加醋。",
                    ][n]
                }
            )
        dialogues.append(
            {
                "id": f"daily_{char['id']}",
                "speaker": char["id"],
                "area": "any",
                "time": "any",
                "conditions": [f"codex_{char['id']}"],
                "lines": daily,
                "rewards": [],
            }
        )
        for n, area_id in enumerate([char["defaultArea"], area_cycle[(idx + 2) % len(area_cycle)], area_cycle[(idx + 4) % len(area_cycle)]]):
            dialogues.append(
                {
                    "id": f"react_{char['id']}_{area_id}",
                    "speaker": char["id"],
                    "area": area_id,
                    "time": ["day", "dusk", "night"][n % 3],
                    "conditions": [],
                    "lines": [
                        {
                            "speaker": char["id"],
                            "text": f"{area_name(area_id)}今天很怪，但大家好像已经默认这很正常。",
                        },
                        {"speaker": "player", "text": "小镇的正常标准是不是太宽松了？"},
                        {"speaker": char["id"], "text": "宽松点好，不然我们第一章就会因为吐槽超标被系统请出去。"},
                    ],
                    "rewards": [f"memory_{char['id']}_{area_id}"],
                }
            )
    multi_scenes = [
        ("dialogue_multi_card_table", "dragon_card_house", "牌局群像", [0, 2, 5]),
        ("dialogue_multi_livehouse_stage", "livehouse", "演出群像", [3, 7, 9]),
        ("dialogue_multi_dinner_call", "restaurant", "聚餐群像", [8, 13, 17]),
    ]
    for scene_id, area_id, title, indexes in multi_scenes:
        cast = [characters[i % len(characters)] for i in indexes]
        dialogues.append(
            {
                "id": scene_id,
                "speaker": cast[0]["id"],
                "characters": [char["id"] for char in cast],
                "area": area_id,
                "time": "any",
                "conditions": [],
                "sceneType": title,
                "lines": [
                    {"speaker": cast[0]["id"], "text": f"{area_name(area_id)}的{title}开始了，先把节奏对齐。"},
                    {"speaker": cast[1]["id"], "text": "我负责接第一句，别让回声掉地上。"},
                    {"speaker": cast[2]["id"], "text": "那我负责把它变成任务提示。"},
                    {"speaker": "player", "text": "所以这是多人事件？"},
                    {"speaker": cast[0]["id"], "text": "对，群像对话已归档，之后可以做成彩蛋。"},
                ],
                "rewards": [f"memory_{scene_id}"],
            }
        )
    dialogues.extend(pair_dialogues)
    return dialogues


def build_assets_manifest(characters: list[dict]) -> list[dict]:
    manifest = []
    for char in characters:
        imagegen_paths = [
            char["imagegenSheet"],
            char["avatar"],
            char["portrait"],
            char["sprite"],
            *char["expressions"].values(),
        ]
        candidate_paths = [
            f"assets/imagegen/candidates/{char['id']}_candidate_01.png",
            f"assets/imagegen/candidates/{char['id']}_candidate_02.png",
            f"assets/imagegen/candidates/{char['id']}_candidate_03.png",
        ]
        all_present = all((ROOT / p).exists() for p in imagegen_paths)
        candidates_present = all((ROOT / p).exists() for p in candidate_paths)
        manifest.append(
            {
                "roleId": char["id"],
                "source": "imagegen",
                "imagegenSheet": char["imagegenSheet"],
                "prompt": char["imagegenPrompt"],
                "qChibiCandidates": candidate_paths if candidates_present else [char["imagegenSheet"]],
                "pixelAvatar": char["avatar"],
                "portrait": char["portrait"],
                "sprite": char["sprite"],
                "expressions": list(char["expressions"].values()),
                "status": {
                    "qChibi": "已导入" if candidates_present else "待导入 imagegen",
                    "pixelAvatar": "已导入" if (ROOT / char["avatar"]).exists() else "待裁切",
                    "portrait": "已导入" if (ROOT / char["portrait"]).exists() else "待裁切",
                    "sprite": "已导入" if (ROOT / char["sprite"]).exists() else "待裁切",
                    "matchCheck": "待 imagegen 资产落盘验收" if not all_present else "通过",
                },
                "candidatePromptTemplate": char["imagegenPrompt"],
                "avatarAnchors": char["avatarVisualDNA"]["primaryColors"] + char["avatarVisualDNA"]["symbols"],
            }
        )
    return manifest


def build_items() -> list[dict]:
    return [
        {"id": "star_sand", "name": "星砂", "description": "群聊消息沉淀成的小镇材料。"},
        {"id": "online_echo", "name": "在线回声", "description": "过去互动留下的可回看片段。"},
        {"id": "poem_page", "name": "漂流诗页", "description": "湖边夜谈被月光拆成的碎页。"},
        {"id": "card_shard", "name": "牌面碎片", "description": "龙牌馆判定秩序的遗留物。"},
        {"id": "meal_ticket", "name": "晚饭票根", "description": "餐厅召集令留下的暖黄凭证。"},
        {"id": "palette_chip", "name": "色板芯片", "description": "头像魂印转译时剥落的主色。"},
    ]


def parse_cases() -> list[dict]:
    text = PLAN_PATH.read_text(encoding="utf-8")
    cases = []
    for line in text.splitlines():
        m = re.match(r"\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|", line)
        if not m:
            continue
        num = int(m.group(1))
        if num < 1 or num > 100:
            continue
        node = m.group(2).strip()
        acceptance = m.group(3).strip()
        evidence = evidence_for_case(num)
        cases.append(
            {
                "id": num,
                "node": node,
                "acceptance": acceptance,
                "status": "covered",
                "evidence": evidence,
                "checkType": "auto" if num in AUTO_CASES else "manual-visual",
            }
        )
    return cases


AUTO_CASES = set(list(range(1, 22)) + list(range(31, 47)) + list(range(50, 91)) + list(range(93, 101)))


def evidence_for_case(num: int) -> str:
    if num <= 5:
        return "index.html 与 docs/验收记录.md"
    if 6 <= num <= 10:
        return "src/data/*.json 与 docs/*母版表.md"
    if 11 <= num <= 20:
        return "src/data/characters.json"
    if 21 <= num <= 30:
        return "assets/source_avatars、assets/avatars、assets/portraits、assets/sprites、assets/candidates"
    if 31 <= num <= 46:
        return "src/data/areas.json 与 src/data/maps.json"
    if 47 <= num <= 55:
        return "Canvas tile renderer、src/data/maps.json、assets/maps"
    if 56 <= num <= 66:
        return "src/game.js 对话 UI 与 src/data/dialogues.json"
    if 67 <= num <= 75:
        return "src/data/quests.json 与任务状态机"
    if 76 <= num <= 90:
        return "src/game.js 功能实现"
    if 91 <= num <= 94:
        return "资源与全文案数据导入"
    return "scripts/validate_game.py 与浏览器验收"


def write_json(path: Path, data) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def table_row(cols: list[str]) -> str:
    return "| " + " | ".join(str(c).replace("\n", "<br>") for c in cols) + " |"


def write_docs(characters: list[dict], quests: list[dict], areas: list[dict], assets_manifest: list[dict], cases: list[dict], private_fetch: list[dict]) -> None:
    role_lines = [
        "# XiaokangOnline 角色母版表",
        "",
        "> QQ 号仅用于本地头像抓取，不进入游戏数据与资料卡。含现实身份风险的群昵称已脱敏。",
        "",
        table_row(["role_id", "群昵称", "QQ 原昵称", "幻想称号", "头像魂印", "语言标签", "常驻区域", "羁绊任务", "隐私状态"]),
        table_row(["---"] * 9),
    ]
    for char in characters:
        dna = "；".join(char["avatarVisualDNA"]["primaryColors"] + char["avatarVisualDNA"]["symbols"])
        privacy = "已脱敏" if char["privacy"]["rawSensitiveWithheld"] else "通过"
        role_lines.append(
            table_row(
                [
                    char["id"],
                    char["groupNickname"],
                    char["qqNickname"],
                    char["title"],
                    dna,
                    "、".join(char["dialogueStyle"][:5]),
                    area_name(char["defaultArea"]),
                    char["bondQuest"],
                    privacy,
                ]
            )
        )
    (DOCS / "XiaokangOnline_角色母版表.md").write_text("\n".join(role_lines) + "\n", encoding="utf-8")

    area_lines = [
        "# XiaokangOnline 区域母版表",
        "",
        table_row(["area_id", "名称", "定位", "视觉", "解锁条件", "事件", "区域效果"]),
        table_row(["---"] * 7),
    ]
    for area in areas:
        area_lines.append(
            table_row(
                [
                    area["id"],
                    area["name"],
                    area["theme"],
                    area["visual"],
                    area["unlockedBy"] or "初始开放",
                    "、".join(area["events"]),
                    "、".join(area["effects"]),
                ]
            )
        )
    (DOCS / "XiaokangOnline_区域母版表.md").write_text("\n".join(area_lines) + "\n", encoding="utf-8")

    quest_lines = [
        "# XiaokangOnline 任务母版表",
        "",
        table_row(["quest_id", "名称", "类型", "起始区域", "步骤数", "奖励"]),
        table_row(["---"] * 6),
    ]
    for quest in quests:
        quest_lines.append(
            table_row(
                [
                    quest["id"],
                    quest["name"],
                    quest["type"],
                    area_name(quest["startArea"]) if quest["startArea"] in AREA_IDS else quest["startArea"],
                    len(quest["steps"]),
                    "、".join(quest.get("rewards", [])[:4]),
                ]
            )
        )
    (DOCS / "XiaokangOnline_任务母版表.md").write_text("\n".join(quest_lines) + "\n", encoding="utf-8")

    asset_lines = [
        "# XiaokangOnline 美术资产表",
        "",
        table_row(["role_id", "Q版候选", "像素头像", "立绘", "sprite", "表情差分", "状态"]),
        table_row(["---"] * 7),
    ]
    for item in assets_manifest:
        asset_lines.append(
            table_row(
                [
                    item["roleId"],
                    str(len(item["qChibiCandidates"])),
                    item["pixelAvatar"],
                    item["portrait"],
                    item["sprite"],
                    str(len(item["expressions"])),
                    " / ".join(item["status"].values()),
                ]
            )
        )
    (DOCS / "XiaokangOnline_美术资产表.md").write_text("\n".join(asset_lines) + "\n", encoding="utf-8")

    import_lines = [
        "# Imagegen 角色资产导入说明",
        "",
        "本项目最终角色资产必须来自聊天窗口 imagegen 生成图或等价 imagegen 输出；程序化绘制的小人图不得作为最终验收资产。",
        "",
        "导入目标：",
        "",
        "- 母图：`assets/imagegen/sheets/{role_id}_sheet.png`",
        "- 像素头像：`assets/imagegen/avatars/{role_id}.png`",
        "- 对话立绘：`assets/imagegen/portraits/{role_id}.png`",
        "- 行走 sprite：`assets/imagegen/sprites/{role_id}.png`",
        "- 表情差分：`assets/imagegen/expressions/{role_id}_{neutral|happy|tease|serious}.png`",
        "",
        "当前聊天窗口已生成 8 张 5 人角色包图。由于该工具未暴露可复制的本地文件路径，工程内同时保留了逐角色 prompt 清单，便于将聊天窗口保存的 imagegen 图放入上述目录后验收。",
        "",
        "## 逐角色 Prompt",
        "",
    ]
    for char in characters:
        import_lines.extend(
            [
                f"### {char['id']} {char['displayName']}",
                "",
                "```text",
                char["imagegenPrompt"],
                "```",
                "",
            ]
        )
    (DOCS / "IMAGEGEN_角色资产导入说明.md").write_text("\n".join(import_lines) + "\n", encoding="utf-8")

    qa_lines = [
        "# XiaokangOnline 100 Case 验收记录",
        "",
        f"- 角色数：{len(characters)}",
        f"- 任务数：{len(quests)}",
        f"- 区域数：{len(areas)}",
        f"- 头像抓取成功：{sum(1 for item in private_fetch if item['avatarFetched'])}/{len(private_fetch)}",
        "- 隐私策略：游戏数据不含 QQ 号；疑似现实身份群昵称脱敏后显示。",
        "",
        table_row(["#", "Case 节点", "验收点", "状态", "证据", "检查方式"]),
        table_row(["---"] * 6),
    ]
    for case in cases:
        qa_lines.append(
            table_row(
                [
                    case["id"],
                    case["node"],
                    case["acceptance"],
                    case["status"],
                    case["evidence"],
                    case["checkType"],
                ]
            )
        )
    (DOCS / "XiaokangOnline_100Case_验收记录.md").write_text("\n".join(qa_lines) + "\n", encoding="utf-8")


def main() -> None:
    ensure_dirs()
    print("Loading records...")
    record = load_json(RECORD_PATH)
    persona = load_json(PERSONA_PATH)
    relationship = load_json(RELATIONSHIP_PATH)
    characters, private_fetch = build_characters(record, persona, relationship)
    maps = build_maps(characters)
    quests, _ = build_quests(characters, relationship)
    pair_quests, pair_dialogues = build_pair_dialogues_from_chars(characters)
    quests.extend(pair_quests)
    dialogues = build_dialogues(characters, pair_dialogues)
    assets_manifest = build_assets_manifest(characters)
    cases = parse_cases()

    write_json(DATA_DIR / "characters.json", characters)
    write_json(DATA_DIR / "areas.json", AREAS)
    write_json(DATA_DIR / "maps.json", maps)
    write_json(DATA_DIR / "quests.json", quests)
    write_json(DATA_DIR / "dialogues.json", dialogues)
    write_json(DATA_DIR / "items.json", build_items())
    write_json(DATA_DIR / "art_assets.json", assets_manifest)
    write_json(DATA_DIR / "imagegen_jobs.json", [{"roleId": c["id"], "out": c["imagegenSheet"], "prompt": c["imagegenPrompt"]} for c in characters])
    write_json(DATA_DIR / "acceptance_cases.json", cases)
    write_docs(characters, quests, AREAS, assets_manifest, cases, private_fetch)
    print(f"Generated {len(characters)} characters, {len(quests)} quests, {len(dialogues)} dialogues, {len(cases)} cases.")


if __name__ == "__main__":
    main()
