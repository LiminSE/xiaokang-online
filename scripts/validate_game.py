#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import struct
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src/data"
REQUIRED_AREAS = {
    "town_center",
    "restaurant",
    "dragon_card_house",
    "livehouse",
    "echo_lake",
    "care_home",
    "atelier",
    "northern_wilds",
    "server_room",
}
RETIRED_ROLE_IDS = {"role_024", "role_035", "role_037"}
SENSITIVE = re.compile(
    r"([1-9]\d{5,}|手机号|身份证|住址|宿舍|工位|公司|学校|学院|大学|"
    r"\d{2,4}\s*级|\d{2}\s*[- ]?\s*(电气|建筑|计科|电子|翻译|工程|自动化|土木|软件|计算机))"
)


def load(name: str):
    with (DATA / f"{name}.json").open("r", encoding="utf-8") as f:
        return json.load(f)


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def warn(warnings: list[str], message: str) -> None:
    warnings.append(message)


def file_exists(path: str) -> bool:
    return (ROOT / path).exists()


def png_size(path: str) -> tuple[int, int] | None:
    full_path = ROOT / path
    if not full_path.exists():
        return None
    with full_path.open("rb") as f:
        header = f.read(24)
    if header[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    return struct.unpack(">II", header[16:24])


def png_color_type(path: str) -> int | None:
    full_path = ROOT / path
    if not full_path.exists():
        return None
    with full_path.open("rb") as f:
        header = f.read(26)
    if header[:8] != b"\x89PNG\r\n\x1a\n" or len(header) < 26:
        return None
    return header[25]


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    characters = load("characters")
    areas = load("areas")
    maps = load("maps")
    quests = load("quests")
    dialogues = load("dialogues")
    art_assets = load("art_assets")
    tiles = load("tiles")
    sprite_meta = load("sprite_meta")
    task_cgs = load("task_cgs")
    cases = load("acceptance_cases")
    imagegen_jobs = load("imagegen_jobs")

    if not (ROOT / "index.html").exists():
      fail(errors, "missing index.html")
    if not (ROOT / "src/game.js").exists():
      fail(errors, "missing src/game.js")
    if not (DATA / "game-data.js").exists():
      fail(errors, "missing bundled game-data.js")
    for art_file in [
        "assets/imagegen/environment/environment_tileset_all_areas.png",
        "assets/imagegen/ui/ui_item_icon_pack.png",
        "assets/imagegen/cg/ending_all_online.png",
        "assets/imagegen/cg/story_echo_lake_night.png",
    ]:
        if not file_exists(art_file):
            fail(errors, f"missing image2 art pack: {art_file}")
    logo_files = [
        "assets/imagegen/brand/logo_emblem.png",
        "assets/imagegen/brand/logo_emblem_256.png",
    ]
    for logo_file in logo_files:
        if not file_exists(logo_file):
            fail(errors, f"missing logo asset: {logo_file}")
    if png_size("assets/imagegen/brand/logo_emblem_256.png") != (256, 256):
        fail(errors, "logo_emblem_256.png must be 256x256")
    if png_color_type("assets/imagegen/brand/logo_emblem.png") not in {4, 6}:
        fail(errors, "logo_emblem.png must keep alpha transparency")

    ids = [c["id"] for c in characters]
    retired_found = sorted(RETIRED_ROLE_IDS & set(ids))
    if retired_found:
        fail(errors, f"retired roles still present in characters: {retired_found}")
    retired_refs = []
    for name, collection in {
        "art_assets": art_assets,
        "imagegen_jobs": imagegen_jobs,
        "dialogues": dialogues,
        "quests": quests,
    }.items():
        blob = json.dumps(collection, ensure_ascii=False)
        for role_id in RETIRED_ROLE_IDS:
            if role_id in blob:
                retired_refs.append(f"{name}:{role_id}")
    if retired_refs:
        fail(errors, f"retired role references remain: {sorted(retired_refs)}")

    if len(ids) != len(set(ids)):
        fail(errors, "character ids are not unique")
    if len(characters) < 20:
        fail(errors, "expected at least 20 characters")
    if len(areas) < 8:
        fail(errors, "expected at least 8 areas")
    if REQUIRED_AREAS - {a["id"] for a in areas}:
        fail(errors, f"missing required areas: {sorted(REQUIRED_AREAS - {a['id'] for a in areas})}")
    if len(quests) < len(characters) + 20:
        fail(errors, "quest count too low for main + bond + area coverage")
    if len(cases) != 100:
        fail(errors, "acceptance case count is not 100")

    area_ids = {a["id"] for a in areas}
    quest_ids = {q["id"] for q in quests}
    char_ids = set(ids)

    for char in characters:
        for field in [
            "groupNickname",
            "qqNickname",
            "displayName",
            "title",
            "originalAvatarRef",
            "avatarVisualDNA",
            "avatarMatchChecklist",
            "activeTrait",
            "passiveTrait",
            "defaultArea",
            "bondQuest",
            "keyRelations",
            "imagegenPrompt",
        ]:
            if not char.get(field):
                fail(errors, f"{char['id']} missing {field}")
        if char["defaultArea"] not in area_ids:
            fail(errors, f"{char['id']} defaultArea missing: {char['defaultArea']}")
        if len(char["dialogueStyle"]) < 5:
            fail(errors, f"{char['id']} has fewer than 5 language tags")
        if len(char["keyRelations"]) < 3:
            fail(errors, f"{char['id']} has fewer than 3 key relations")
        if len(char.get("memeSeeds", [])) < 5:
            fail(errors, f"{char['id']} has fewer than 5 meme seeds")
        if not file_exists(char["originalAvatarRef"]):
            fail(errors, f"{char['id']} source avatar missing")
        prompt = char["imagegenPrompt"]
        if "source QQ avatar visual DNA" not in prompt or "feminized anime translation" not in prompt:
            fail(errors, f"{char['id']} prompt does not enforce avatar-based feminized translation")
        visible_blob = " ".join([char["groupNickname"], char["qqNickname"], char["displayName"], char["title"]])
        if SENSITIVE.search(visible_blob):
            fail(errors, f"{char['id']} visible profile has sensitive text: {visible_blob}")

    for area in areas:
        for field in ["id", "name", "theme", "visual", "events", "effects"]:
            if field not in area or area[field] in ("", [], None) and field not in {"unlockedBy"}:
                fail(errors, f"area {area.get('id')} missing {field}")

    for game_map in maps:
        if game_map["id"] not in area_ids:
            fail(errors, f"map without area: {game_map['id']}")
        if len(game_map["collision"]) != game_map["height"]:
            fail(errors, f"map {game_map['id']} collision height mismatch")
        if any(len(row) != game_map["width"] for row in game_map["collision"]):
            fail(errors, f"map {game_map['id']} collision width mismatch")
        if not game_map.get("interactions"):
            fail(errors, f"map {game_map['id']} missing interactions")
        if not game_map.get("npcSlots"):
            fail(errors, f"map {game_map['id']} missing npc slots")

    valid_states = {"hidden", "available", "active", "ready", "completed", "archived"}
    for quest in quests:
        if quest["id"] not in quest_ids:
            fail(errors, f"bad quest id {quest['id']}")
        if quest["startArea"] not in area_ids:
            fail(errors, f"quest {quest['id']} bad start area")
        if quest["startNpc"] not in char_ids:
            fail(errors, f"quest {quest['id']} bad start npc")
        if not quest.get("steps"):
            fail(errors, f"quest {quest['id']} has no steps")
        if not quest.get("rewards"):
            fail(errors, f"quest {quest['id']} has no content rewards")
    if not valid_states:
        fail(errors, "task state enum unexpectedly empty")

    task_cg_missing = []
    if len(task_cgs) < 6:
        fail(errors, "expected at least 6 task special CGs")
    for cg in task_cgs:
        if cg.get("source") != "imagegen":
            fail(errors, f"task CG {cg.get('id')} is not sourced from imagegen")
        if not cg.get("name") or not cg.get("path") or not cg.get("questIds") or not cg.get("areaIds"):
            fail(errors, f"task CG {cg.get('id')} missing required fields")
        if not file_exists(cg.get("path", "")):
            task_cg_missing.append(cg.get("path", ""))
        elif png_size(cg["path"]) != (1024, 768):
            fail(errors, f"task CG {cg['id']} must be 1024x768, got {png_size(cg['path'])}")
        for quest_id in cg.get("questIds", []):
            if quest_id not in quest_ids:
                fail(errors, f"task CG {cg['id']} references unknown quest {quest_id}")
        for area_id in cg.get("areaIds", []):
            if area_id not in area_ids:
                fail(errors, f"task CG {cg['id']} references unknown area {area_id}")
    if task_cg_missing:
        fail(errors, f"missing task CG files: {sorted(task_cg_missing)}")

    for char_id in char_ids:
        intro = any(d["id"] == f"intro_{char_id}" for d in dialogues)
        daily = next((d for d in dialogues if d["id"] == f"daily_{char_id}"), None)
        reactions = [d for d in dialogues if d["id"].startswith(f"react_{char_id}_")]
        if not intro:
            fail(errors, f"{char_id} missing intro dialogue")
        if not daily or len(daily["lines"]) < 5:
            fail(errors, f"{char_id} missing 5 daily lines")
        if len(reactions) < 3:
            fail(errors, f"{char_id} missing 3 area reactions")

    imagegen_missing = []
    for asset in art_assets:
        if asset.get("source") != "imagegen":
            fail(errors, f"{asset['roleId']} art source is not imagegen")
        for path in [asset["imagegenSheet"], asset["pixelAvatar"], asset["portrait"], asset["sprite"], *asset["expressions"]]:
            if not file_exists(path):
                imagegen_missing.append(path)
        role_id = asset["roleId"]
        meta = sprite_meta.get(role_id)
        if not meta:
            fail(errors, f"{role_id} missing sprite_meta")
        else:
            size = png_size(asset["sprite"])
            expected = (meta["columns"] * meta["frameWidth"], meta["rows"] * meta["frameHeight"])
            if size != expected:
                fail(errors, f"{role_id} sprite size {size} does not match metadata {expected}")
        avatar_size = png_size(asset["pixelAvatar"])
        portrait_size = png_size(asset["portrait"])
        if avatar_size != (64, 64):
            fail(errors, f"{role_id} avatar must be 64x64, got {avatar_size}")
        if portrait_size != (512, 768):
            fail(errors, f"{role_id} portrait must be 512x768, got {portrait_size}")
        for expression in asset["expressions"]:
            if png_size(expression) != (128, 128):
                fail(errors, f"{role_id} expression must be 128x128: {expression}")
    if imagegen_missing:
        warn(warnings, f"imagegen final assets not yet imported: {len(imagegen_missing)} files")

    tile_ids = {tile["id"] for tile in tiles.get("baseTiles", [])}
    decor_ids = {decor["id"] for decor in tiles.get("decorGroups", [])}
    for area_id, path in tiles.get("areaBackgrounds", {}).items():
        if area_id not in area_ids:
            fail(errors, f"tile background has unknown area: {area_id}")
        if not file_exists(path):
            fail(errors, f"missing semantic area background: {path}")
    if set(tiles.get("areaBackgrounds", {})) != area_ids:
        fail(errors, "semantic area background set does not match all areas")
    for tile in tiles.get("baseTiles", []):
        if not file_exists(tile["path"]):
            fail(errors, f"missing semantic base tile: {tile['path']}")
    for decor in tiles.get("decorGroups", []):
        if not file_exists(decor["path"]):
            fail(errors, f"missing semantic decor group: {decor['path']}")
    for game_map in maps:
        if not game_map.get("areaBackground") or not file_exists(game_map["areaBackground"]):
            fail(errors, f"map {game_map['id']} missing semantic area background")
        profile = game_map.get("tileProfile") or {}
        if profile.get("floor") not in tile_ids:
            fail(errors, f"map {game_map['id']} bad floor tile: {profile.get('floor')}")
        if profile.get("wall") not in tile_ids:
            fail(errors, f"map {game_map['id']} bad wall tile: {profile.get('wall')}")
        if profile.get("decor") not in decor_ids:
            fail(errors, f"map {game_map['id']} bad decor group: {profile.get('decor')}")

    if len(imagegen_jobs) != len(characters):
        fail(errors, "imagegen job count does not match character count")

    screenshot_report_path = ROOT / "docs/full_scene_screenshot_report.json"
    screenshot_count = 0
    if not screenshot_report_path.exists():
        fail(errors, "missing full scene screenshot report")
    else:
        try:
            screenshot_report = json.loads(screenshot_report_path.read_text(encoding="utf-8"))
            screenshots = screenshot_report.get("screenshots", [])
            screenshot_count = len(screenshots)
            if screenshot_count < 16:
                fail(errors, f"expected at least 16 full-scene screenshots, got {screenshot_count}")
            if screenshot_report.get("consoleErrors"):
                fail(errors, f"screenshot run had console errors: {screenshot_report['consoleErrors'][:3]}")
            if screenshot_report.get("missingImages"):
                fail(errors, f"screenshot run had missing images: {screenshot_report['missingImages'][:5]}")
            if {check.get("areaId") for check in screenshot_report.get("areaChecks", [])} != area_ids:
                fail(errors, "screenshot area coverage does not match all areas")
            if len(screenshot_report.get("taskChecks", [])) != len(task_cgs):
                fail(errors, "screenshot task CG coverage does not match task_cgs.json")
            for screenshot in screenshots:
                rel_path = screenshot.get("path", "")
                if not rel_path or not file_exists(rel_path):
                    fail(errors, f"missing screenshot file: {rel_path}")
                elif (ROOT / rel_path).stat().st_size < 20000:
                    fail(errors, f"screenshot file is unexpectedly small: {rel_path}")
        except json.JSONDecodeError as exc:
            fail(errors, f"cannot parse screenshot report: {exc}")

    report = {
        "errors": errors,
        "warnings": warnings,
        "counts": {
            "characters": len(characters),
            "areas": len(areas),
            "maps": len(maps),
            "quests": len(quests),
            "dialogues": len(dialogues),
            "acceptanceCases": len(cases),
            "sourceAvatars": sum(file_exists(c["originalAvatarRef"]) for c in characters),
            "imagegenMissingFiles": len(imagegen_missing),
            "semanticAreaBackgrounds": len(tiles.get("areaBackgrounds", {})),
            "semanticBaseTiles": len(tiles.get("baseTiles", [])),
            "semanticDecorGroups": len(tiles.get("decorGroups", [])),
            "taskCgs": len(task_cgs),
            "taskCgMissingFiles": len(task_cg_missing),
            "logoFiles": sum(file_exists(path) for path in logo_files),
            "fullSceneScreenshots": screenshot_count,
        },
    }
    out = ROOT / "docs/validation_report.json"
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
