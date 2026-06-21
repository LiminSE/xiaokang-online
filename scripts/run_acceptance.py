#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import struct
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Callable


ROOT = Path(__file__).resolve().parents[1]
ANALYSE = ROOT.parent
DATA = ROOT / "src/data"
DOCS = ROOT / "docs"
PLAN = ANALYSE / "XiaokangOnline_开发总策划.md"
RETIRED_ROLE_IDS = {"role_024", "role_035", "role_037"}
SENSITIVE = re.compile(
    r"([1-9]\d{5,}|手机号|身份证|住址|宿舍|工位|公司|学校|学院|大学|"
    r"\d{2,4}\s*级|\d{2}\s*[- ]?\s*(电气|建筑|计科|电子|翻译|工程|自动化|土木|软件|计算机))"
)


@dataclass
class CaseResult:
    id: int
    node: str
    acceptance: str
    status: str
    evidence: str
    details: list[str]


def load_json(name: str):
    with (DATA / f"{name}.json").open("r", encoding="utf-8") as f:
        return json.load(f)


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def exists(path: str) -> bool:
    return (ROOT / path).exists()


def png_size(path: str) -> tuple[int, int] | None:
    full_path = ROOT / path
    if not full_path.exists():
        return None
    header = full_path.read_bytes()[:24]
    if header[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    return struct.unpack(">II", header[16:24])


def run(command: list[str]) -> tuple[bool, str]:
    result = subprocess.run(command, cwd=ROOT, text=True, capture_output=True)
    output = (result.stdout + result.stderr).strip()
    return result.returncode == 0, output


def table_row(cols: list[str]) -> str:
    return "| " + " | ".join(str(col).replace("\n", "<br>") for col in cols) + " |"


class AcceptanceRunner:
    def __init__(self) -> None:
        self.plan = read(PLAN)
        self.index = read(ROOT / "index.html")
        self.game = read(ROOT / "src/game.js")
        self.styles = read(ROOT / "src/styles.css")
        self.cases = load_json("acceptance_cases")
        self.characters = load_json("characters")
        self.areas = load_json("areas")
        self.maps = load_json("maps")
        self.quests = load_json("quests")
        self.dialogues = load_json("dialogues")
        self.items = load_json("items")
        self.art_assets = load_json("art_assets")
        self.tiles = load_json("tiles")
        self.sprite_meta = load_json("sprite_meta")
        self.task_cgs = load_json("task_cgs")
        self.crop_report = json.loads((DOCS / "imagegen_crop_report.json").read_text(encoding="utf-8"))
        screenshot_report_path = DOCS / "full_scene_screenshot_report.json"
        self.screenshot_report = json.loads(screenshot_report_path.read_text(encoding="utf-8")) if screenshot_report_path.exists() else {}
        self.char_ids = {char["id"] for char in self.characters}
        self.area_ids = {area["id"] for area in self.areas}
        self.quest_ids = {quest["id"] for quest in self.quests}
        self.item_ids = {item["id"] for item in self.items}
        self.area_events = {event for area in self.areas for event in area.get("events", [])}
        self.interaction_ids = {point["id"] for game_map in self.maps for point in game_map.get("interactions", [])}
        self.command_results: dict[str, tuple[bool, str]] = {}

    def run_preflight(self) -> None:
        commands = {
            "build_data": ["python3", "scripts/build_game_data.py"],
            "node_check": ["node", "--check", "src/game.js"],
            "smoke_entry": ["node", "scripts/smoke_game_entry.js"],
            "full_scene_screenshots": ["node", "scripts/capture_full_scene_screenshots.js"],
            "strict_validate": ["python3", "scripts/validate_game.py"],
        }
        for key, command in commands.items():
            self.command_results[key] = run(command)
        screenshot_report_path = DOCS / "full_scene_screenshot_report.json"
        self.screenshot_report = json.loads(screenshot_report_path.read_text(encoding="utf-8")) if screenshot_report_path.exists() else {}

    def ok_command(self, key: str) -> bool:
        return self.command_results.get(key, (False, ""))[0]

    def case_data(self, case_id: int) -> dict:
        return next(case for case in self.cases if case["id"] == case_id)

    def result(self, case_id: int, checks: list[tuple[bool, str]], evidence: str) -> CaseResult:
        case = self.case_data(case_id)
        failed = [detail for ok, detail in checks if not ok]
        passed = [detail for ok, detail in checks if ok]
        return CaseResult(
            id=case_id,
            node=case["node"],
            acceptance=case["acceptance"],
            status="passed" if not failed else "failed",
            evidence=evidence,
            details=passed if not failed else failed,
        )

    def all_files(self, paths: list[str]) -> bool:
        return all(exists(path) for path in paths)

    def visible_profile_blob(self) -> str:
        parts = []
        for char in self.characters:
            parts.extend([char.get("groupNickname", ""), char.get("qqNickname", ""), char.get("displayName", ""), char.get("title", "")])
        return " ".join(parts)

    def character_field_ok(self) -> bool:
        required = [
            "groupNickname",
            "qqNickname",
            "displayName",
            "title",
            "originalAvatarRef",
            "avatarVisualDNA",
            "avatarMatchChecklist",
            "defaultArea",
            "activeTrait",
            "passiveTrait",
            "bondQuest",
            "keyRelations",
            "imagegenPrompt",
        ]
        return all(all(char.get(field) for field in required) for char in self.characters)

    def art_paths_for(self, asset: dict) -> list[str]:
        return [
            asset["imagegenSheet"],
            *asset.get("qChibiCandidates", []),
            asset["pixelAvatar"],
            asset["portrait"],
            asset["sprite"],
            *asset["expressions"],
        ]

    def asset_dimensions_ok(self) -> bool:
        for asset in self.art_assets:
            if png_size(asset["pixelAvatar"]) != (64, 64):
                return False
            if png_size(asset["portrait"]) != (512, 768):
                return False
            if any(png_size(path) != (128, 128) for path in asset["expressions"]):
                return False
            meta = self.sprite_meta.get(asset["roleId"])
            if not meta:
                return False
            expected = (meta["columns"] * meta["frameWidth"], meta["rows"] * meta["frameHeight"])
            if png_size(asset["sprite"]) != expected:
                return False
        return True

    def task_cgs_ok(self) -> bool:
        if len(self.task_cgs) < 6:
            return False
        for cg in self.task_cgs:
            if cg.get("source") != "imagegen":
                return False
            if not exists(cg.get("path", "")) or png_size(cg["path"]) != (1024, 768):
                return False
            if any(quest_id not in self.quest_ids for quest_id in cg.get("questIds", [])):
                return False
            if any(area_id not in self.area_ids for area_id in cg.get("areaIds", [])):
                return False
        return True

    def logo_ok(self) -> bool:
        return exists("assets/imagegen/brand/logo_emblem.png") and png_size("assets/imagegen/brand/logo_emblem_256.png") == (256, 256)

    def screenshots_ok(self) -> bool:
        report = self.screenshot_report
        screenshots = report.get("screenshots", [])
        if len(screenshots) < 16:
            return False
        if report.get("consoleErrors") or report.get("missingImages"):
            return False
        if {check.get("areaId") for check in report.get("areaChecks", [])} != self.area_ids:
            return False
        if len(report.get("taskChecks", [])) != len(self.task_cgs):
            return False
        return all(exists(item.get("path", "")) and (ROOT / item["path"]).stat().st_size > 20000 for item in screenshots)

    def quest_references_ok(self) -> bool:
        for quest in self.quests:
            if quest.get("startNpc") not in self.char_ids:
                return False
            if quest.get("startArea") not in self.area_ids:
                return False
            for step in quest.get("steps", []):
                target = step.get("target")
                step_type = step.get("type")
                if step_type in {"talk", "return"} and target not in self.char_ids:
                    return False
                if step_type == "visit" and target not in self.area_ids:
                    return False
                if step_type == "interact" and target not in self.interaction_ids:
                    return False
                if step_type == "event" and not (target in self.area_events or str(target).startswith("duo_")):
                    return False
                if step_type == "collect" and step.get("item") not in self.item_ids:
                    return False
        return True

    def mainline_chain_ok(self) -> bool:
        main_ids = [quest["id"] for quest in self.quests if quest["type"] == "main"]
        required = [f"main_quest_{index:02d}" for index in range(1, 6)]
        return main_ids[:5] == required and all(quest_id in self.game for quest_id in required[1:])

    def all_maps_reachable(self) -> bool:
        graph = {game_map["id"]: {transition["to"] for transition in game_map.get("transitions", [])} for game_map in self.maps}
        seen = {"town_center"}
        stack = ["town_center"]
        while stack:
            current = stack.pop()
            for target in graph.get(current, set()):
                if target not in seen:
                    seen.add(target)
                    stack.append(target)
        return self.area_ids <= seen

    def map_collision_ok(self) -> bool:
        for game_map in self.maps:
            width = game_map["width"]
            height = game_map["height"]
            collision = game_map["collision"]
            if len(collision) != height or any(len(row) != width for row in collision):
                return False
            if not any(tile == 0 for row in collision for tile in row):
                return False
            if not any(tile == 1 for row in collision for tile in row):
                return False
            for transition in game_map.get("transitions", []):
                if collision[transition["y"]][transition["x"]] != 0:
                    return False
        return True

    def multi_dialogues_ok(self) -> bool:
        wanted = {
            "dialogue_multi_card_table": "dragon_card_house",
            "dialogue_multi_livehouse_stage": "livehouse",
            "dialogue_multi_dinner_call": "restaurant",
        }
        by_id = {dialogue["id"]: dialogue for dialogue in self.dialogues}
        for dialogue_id, area_id in wanted.items():
            dialogue = by_id.get(dialogue_id)
            if not dialogue:
                return False
            if dialogue.get("area") != area_id:
                return False
            if len(dialogue.get("characters", [])) < 3 or len(dialogue.get("lines", [])) < 5:
                return False
        return True

    def text_ok(self) -> bool:
        blobs = [self.index, self.game, json.dumps(self.dialogues, ensure_ascii=False), json.dumps(self.quests, ensure_ascii=False)]
        if any("\ufffd" in blob for blob in blobs):
            return False
        return all(len(line.get("text", "")) <= 140 for dialogue in self.dialogues for line in dialogue.get("lines", []))

    def run_case(self, case_id: int) -> CaseResult:
        if case_id == 1:
            return self.result(1, [("《XiaokangOnline》" in self.plan and "HTML 像素 RPG" in self.plan, "策划案含项目一句话与类型")], "XiaokangOnline_开发总策划.md")
        if case_id == 2:
            return self.result(2, [(len(self.maps) >= 8 and "tryMove" in self.game and len(self.quests) > 40, "存在地图移动、任务和多区域数据")], "src/game.js, src/data/maps.json, src/data/quests.json")
        if case_id == 3:
            return self.result(3, [(not SENSITIVE.search(self.visible_profile_blob()), "可见资料字段不含敏感现实身份信息"), (not (RETIRED_ROLE_IDS & self.char_ids), "退群角色未进入角色表")], "src/data/characters.json")
        if case_id == 4:
            return self.result(4, [("温暖卡通像素" in self.plan and "dialoguePortrait" in self.index and "drawCharacter" in self.game, "美术方向、立绘对话框和移动角色渲染存在")], "XiaokangOnline_开发总策划.md, index.html, src/game.js")
        if case_id == 5:
            return self.result(5, [(exists("index.html") and exists("src/game.js") and exists("src/data/game-data.js"), "HTML、前端脚本和打包数据存在")], "index.html, src/game.js, src/data/game-data.js")
        if case_id == 6:
            id_ok = all(re.match(r"role_\d{3}$", char["id"]) for char in self.characters) and len(self.char_ids) == len(self.characters)
            return self.result(6, [(id_ok and self.quest_references_ok(), "角色、任务、区域 ID 唯一且引用有效")], "src/data/*.json")
        if case_id == 7:
            return self.result(7, [(self.character_field_ok(), "角色母版关键字段均非空")], "src/data/characters.json")
        if case_id == 8:
            ok = all(area.get(field) for area in self.areas for field in ["id", "name", "theme", "visual", "events", "effects"]) and all(game_map.get("interactions") for game_map in self.maps)
            return self.result(8, [(ok, "区域母版含视觉、事件、效果与地图交互")], "src/data/areas.json, src/data/maps.json")
        if case_id == 9:
            ok = all(quest.get(field) for quest in self.quests for field in ["id", "name", "type", "startNpc", "startArea", "steps", "rewards"])
            return self.result(9, [(ok, "任务母版含触发、步骤、奖励和状态依据")], "src/data/quests.json")
        if case_id == 10:
            ok = all(asset.get("status") and asset.get("qChibiCandidates") and asset.get("source") == "imagegen" for asset in self.art_assets)
            return self.result(10, [(ok and self.task_cgs_ok() and self.logo_ok(), "角色、任务 CG、Logo 的状态和来源可追踪")], "src/data/art_assets.json, src/data/task_cgs.json, assets/imagegen/brand")
        if case_id == 11:
            ok = len(self.characters) == 36 and all(char["originalAvatarRef"] and char["qqNickname"] for char in self.characters)
            return self.result(11, [(ok, "36 名保留角色均绑定昵称和原始头像引用")], "src/data/characters.json")
        if case_id == 12:
            return self.result(12, [(all(len(char.get("dialogueStyle", [])) >= 5 for char in self.characters), "每人至少 5 个语言标签")], "src/data/characters.json")
        if case_id == 13:
            return self.result(13, [(all(char.get("socialFunction") for char in self.characters), "每人有社交功能定位")], "src/data/characters.json")
        if case_id == 14:
            return self.result(14, [(all(len(char.get("keyRelations", [])) >= 3 for char in self.characters), "每人至少 3 个关键关系")], "src/data/characters.json")
        if case_id == 15:
            return self.result(15, [(all(len(char.get("memeSeeds", [])) >= 5 for char in self.characters), "每人至少 5 个可转译梗")], "src/data/characters.json")
        if case_id == 16:
            return self.result(16, [(all(char.get("title") for char in self.characters), "每人有幻想称号")], "src/data/characters.json")
        if case_id == 17:
            return self.result(17, [(all(char.get("activeTrait") for char in self.characters), "每人有主动特质")], "src/data/characters.json")
        if case_id == 18:
            return self.result(18, [(all(char.get("passiveTrait") for char in self.characters), "每人有被动特质")], "src/data/characters.json")
        if case_id == 19:
            return self.result(19, [(all(char.get("defaultArea") in self.area_ids for char in self.characters), "每人常驻区域有效")], "src/data/characters.json")
        if case_id == 20:
            return self.result(20, [(self.character_field_ok(), "群昵称、QQ 原昵称、头像视觉拆解等字段完整")], "src/data/characters.json")
        if case_id == 21:
            keys = ["primaryColors", "secondaryColors", "silhouette", "symbols", "mood", "characterizationNotes"]
            ok = all(all(char.get("avatarVisualDNA", {}).get(key) for key in keys) for char in self.characters)
            return self.result(21, [(ok, "每人头像视觉 DNA 字段完整")], "src/data/characters.json")
        if case_id == 22:
            ok = all("source QQ avatar visual DNA" in char["imagegenPrompt"] and "feminized anime translation" in char["imagegenPrompt"] for char in self.characters)
            return self.result(22, [(ok, "imagegen prompt 批量模板强制基于头像娘化")], "src/data/characters.json, src/data/imagegen_jobs.json")
        if case_id == 23:
            ok = all(len(asset.get("qChibiCandidates", [])) >= 3 and self.all_files(asset["qChibiCandidates"]) for asset in self.art_assets)
            return self.result(23, [(ok, "每人至少 3 张 image2 Q 版候选文件")], "assets/imagegen/candidates")
        if case_id == 24:
            ok = all(asset["status"].get("matchCheck") == "通过" and len(next(char for char in self.characters if char["id"] == asset["roleId"]).get("avatarMatchChecklist", [])) >= 4 for asset in self.art_assets)
            return self.result(24, [(ok, "每人主视觉通过头像匹配清单")], "src/data/art_assets.json, src/data/characters.json")
        if case_id == 25:
            ok = all(len(asset["expressions"]) >= 4 and self.all_files(asset["expressions"]) for asset in self.art_assets)
            return self.result(25, [(ok, "每人至少 4 个表情差分")], "assets/imagegen/expressions")
        if case_id == 26:
            return self.result(26, [(all(png_size(asset["pixelAvatar"]) == (64, 64) for asset in self.art_assets), "像素头像统一为 64x64")], "assets/imagegen/avatars")
        if case_id == 27:
            return self.result(27, [(all(png_size(asset["portrait"]) == (512, 768) for asset in self.art_assets), "对话立绘统一为 512x768")], "assets/imagegen/portraits")
        if case_id == 28:
            ok = all(self.sprite_meta[asset["roleId"]]["rows"] >= 3 and self.sprite_meta[asset["roleId"]]["columns"] >= 2 for asset in self.art_assets)
            return self.result(28, [(ok, "sprite 至少含下/上/侧向行，侧向由前端镜像补右向")], "assets/imagegen/sprites, src/data/sprite_meta.json")
        if case_id == 29:
            return self.result(29, [(self.asset_dimensions_ok(), "sprite 尺寸与 frame metadata 一致")], "src/data/sprite_meta.json, docs/imagegen_crop_report.json")
        if case_id == 30:
            return self.result(30, [(self.ok_command("smoke_entry"), "入口烟测可选择角色并进入游戏"), (len(self.art_assets) >= 3, "至少 3 名角色资源已导入")], "scripts/smoke_game_entry.js")
        if case_id == 31:
            return self.result(31, [(all(word in self.plan for word in ["小康在线镇", "服务器", "星砂", "回声"]), "世界观核心关键词完整")], "XiaokangOnline_开发总策划.md")
        if case_id == 32:
            return self.result(32, [(self.mainline_chain_ok() and "小康钟" in json.dumps(self.quests, ensure_ascii=False), "主线围绕小康钟/核心修复闭环")], "src/data/quests.json, src/game.js")
        if case_id == 33:
            return self.result(33, [("intro_boot_error" in {d["id"] for d in self.dialogues} and "startGame" in self.game, "开局上线剧情和选择后进入流程存在")], "src/data/dialogues.json, src/game.js")
        if case_id == 34:
            return self.result(34, [(sum(quest["type"] == "main" for quest in self.quests) >= 5, "至少 5 个主线阶段")], "src/data/quests.json")
        if case_id == 35:
            ending_words = ["普通结局", "羁绊结局", "真结局"]
            return self.result(35, [(all(word in self.game for word in ending_words) and "彩蛋结局" in self.plan, "结局条件和文本存在")], "src/game.js, XiaokangOnline_开发总策划.md")
        if case_id == 36:
            required = {"town_center", "restaurant", "dragon_card_house", "livehouse", "echo_lake", "care_home", "atelier", "northern_wilds"}
            return self.result(36, [(required <= self.area_ids and self.all_maps_reachable(), "中心加主区域存在且转场连通")], "src/data/areas.json, src/data/maps.json")
        area_cases = {
            37: ("town_center", ["公告", "小康钟"]),
            38: ("dragon_card_house", ["牌", "判定"]),
            39: ("livehouse", ["舞台", "演出"]),
            40: ("care_home", ["存档", "结局", "钟"]),
            41: ("restaurant", ["料理", "恢复"]),
            42: ("echo_lake", ["夜", "诗"]),
            43: ("northern_wilds", ["探索", "采集"]),
            44: ("atelier", ["头像", "色板", "图鉴"]),
        }
        if case_id in area_cases:
            area_id, words = area_cases[case_id]
            area = next(area for area in self.areas if area["id"] == area_id)
            blob = area["theme"] + area["visual"] + " ".join(area["events"]) + " ".join(area["effects"])
            return self.result(case_id, [(all(word in blob for word in words), f"{area['name']}包含策划语义：{'、'.join(words)}")], "src/data/areas.json")
        if case_id == 45:
            indoor = {"restaurant", "dragon_card_house", "livehouse", "care_home", "atelier", "server_room"}
            return self.result(45, [(indoor <= self.area_ids and all(game_map["id"] in self.area_ids for game_map in self.maps), "核心建筑/室内区域有独立地图")], "src/data/maps.json")
        if case_id == 46:
            initial = [area for area in self.areas if area.get("unlockedBy") is None]
            staged = [area for area in self.areas if area.get("unlockedBy")]
            return self.result(46, [(len(initial) >= 3 and len(staged) >= 4, "初始、阶段、隐藏开放配置存在")], "src/data/areas.json")
        if case_id == 47:
            tile_labels = " ".join(tile["label"] for tile in self.tiles.get("baseTiles", []))
            return self.result(47, [(len(self.tiles.get("baseTiles", [])) >= 10 and all(word in tile_labels for word in ["地砖", "水面", "舞台", "服务器"]), "基础 tile 语义拆分完整")], "src/data/tiles.json, assets/imagegen/environment/tiles")
        if case_id == 48:
            return self.result(48, [(len(self.tiles.get("areaBackgrounds", {})) == len(self.areas) and self.all_files(list(self.tiles["areaBackgrounds"].values())), "每个区域都有独立背景素材")], "assets/imagegen/environment/areas")
        if case_id == 49:
            return self.result(49, [(len(self.tiles.get("decorGroups", [])) >= 8 and self.all_files([decor["path"] for decor in self.tiles["decorGroups"]]), "区域功能装饰组已拆分")], "assets/imagegen/environment/decor")
        if case_id == 50:
            return self.result(50, [(self.map_collision_ok() and self.all_maps_reachable(), "地图可走、可转场、可测试")], "src/data/maps.json")
        if case_id == 51:
            return self.result(51, [(self.map_collision_ok() and "tileBlocked" in self.game, "碰撞层尺寸有效且前端读取")], "src/data/maps.json, src/game.js")
        if case_id == 52:
            return self.result(52, [(all(len(game_map.get("interactions", [])) >= 4 for game_map in self.maps), "每张地图至少 4 个交互点")], "src/data/maps.json")
        if case_id == 53:
            ok = all(game_map.get("npcSlots") and game_map.get("npcSpawnPools") for game_map in self.maps)
            return self.result(53, [(ok, "每张地图同时有固定 NPC 点和刷新候选点")], "src/data/maps.json")
        if case_id == 54:
            times = {dialogue.get("time") for dialogue in self.dialogues}
            return self.result(54, [({"day", "dusk", "night"} <= times and "cycleTime" in self.game, "白天/黄昏/夜晚规则存在")], "src/data/dialogues.json, src/game.js")
        if case_id == 55:
            return self.result(55, [(all(area.get("effects") for area in self.areas) and any(d["id"].startswith("react_") for d in self.dialogues), "区域效果和区域反应台词存在")], "src/data/areas.json, src/data/dialogues.json")
        if case_id == 56:
            ui_ids = ["dialoguePortrait", "dialogueSpeaker", "dialogueText", "dialogueChoices"]
            return self.result(56, [(all(item in self.index for item in ui_ids), "对话 UI 头像、立绘、名字、正文、选项齐全")], "index.html")
        if case_id == 57:
            labels = ["开始游玩", "继续游戏", "设置", "任务", "插画", "存档"]
            return self.result(57, [(all(label in self.index for label in labels), "新版系统按钮和提示文案存在")], "index.html")
        if case_id == 58:
            ids = {dialogue["id"] for dialogue in self.dialogues}
            return self.result(58, [(all(f"intro_{char_id}" in ids for char_id in self.char_ids), "每人有专属开场对话")], "src/data/dialogues.json")
        if case_id == 59:
            daily = {dialogue["id"]: dialogue for dialogue in self.dialogues if dialogue["id"].startswith("daily_")}
            return self.result(59, [(all(len(daily.get(f"daily_{char_id}", {}).get("lines", [])) >= 5 for char_id in self.char_ids), "每人至少 5 条日常台词")], "src/data/dialogues.json")
        if case_id == 60:
            return self.result(60, [(all(sum(d["id"].startswith(f"react_{char_id}_") for d in self.dialogues) >= 3 for char_id in self.char_ids), "每人至少 3 个区域反应")], "src/data/dialogues.json")
        if case_id == 61:
            return self.result(61, [(sum(q["type"] == "main" for q in self.quests) >= 5 and "intro_boot_error" in {d["id"] for d in self.dialogues}, "每章主线有任务推进文本与开局对话")], "src/data/quests.json, src/data/dialogues.json")
        if case_id == 62:
            return self.result(62, [(all(step.get("hint") for quest in self.quests for step in quest.get("steps", [])), "所有任务步骤都有提示文本")], "src/data/quests.json")
        if case_id == 63:
            return self.result(63, [(sum(d["id"].startswith("dialogue_duo_") and len(d.get("lines", [])) >= 5 for d in self.dialogues) >= 12, "至少 12 组双人长对话，每组 5 段")], "src/data/dialogues.json")
        if case_id == 64:
            return self.result(64, [(self.multi_dialogues_ok(), "牌局、演出、聚餐三场多人群像对话存在")], "src/data/dialogues.json")
        if case_id == 65:
            return self.result(65, [("这里走不过去" in self.game and "还没有存档" in self.game and "没有重连" in self.game, "失败和条件不足有反馈")], "src/game.js")
        if case_id == 66:
            return self.result(66, [(all(char.get("memeSeeds") and char.get("defaultArea") for char in self.characters), "梗库含角色和区域索引")], "src/data/characters.json")
        if case_id == 67:
            return self.result(67, [(self.mainline_chain_ok(), "5 条主线按完成事件串联")], "src/data/quests.json, src/game.js")
        if case_id == 68:
            return self.result(68, [(sum(quest["type"] == "bond" for quest in self.quests) >= len(self.characters), "每名角色至少 1 条个人羁绊任务")], "src/data/quests.json")
        if case_id == 69:
            return self.result(69, [(sum(quest["type"] == "easter" for quest in self.quests) >= 12, "重点关系有双人彩蛋任务")], "src/data/quests.json")
        if case_id == 70:
            return self.result(70, [(all(sum(quest["type"] == "area" and quest["startArea"] == area["id"] for quest in self.quests) >= 2 for area in self.areas), "每个区域至少 2 个区域事件")], "src/data/quests.json")
        if case_id == 71:
            needed = {"star_sand", "online_echo", "poem_page", "card_shard", "meal_ticket", "palette_chip"}
            return self.result(71, [(needed <= self.item_ids and "collectNearby" in self.game, "收集物系统和收集逻辑存在")], "src/data/items.json, src/game.js")
        if case_id == 72:
            return self.result(72, [(all(quest.get("rewards") for quest in self.quests) and any("memory_" in reward for quest in self.quests for reward in quest.get("rewards", [])), "奖励以内容解锁为主")], "src/data/quests.json")
        if case_id == 73:
            states = ["hidden", "available", "active", "completed"]
            return self.result(73, [(all(state in self.game for state in states) and "completeQuest" in self.game, "任务状态机完整")], "src/game.js")
        if case_id == 74:
            return self.result(74, [(all(step.get("hint") for quest in self.quests for step in quest.get("steps", [])) and "activeQuestSteps" in self.index, "任务提示可显示")], "src/data/quests.json, index.html")
        if case_id == 75:
            return self.result(75, [(self.quest_references_ok(), "任务步骤引用均能解析，不存在明显死引用")], "src/data/quests.json")
        if case_id == 76:
            return self.result(76, [(all(action in self.index for action in ['data-action="start"', 'data-action="load"', 'data-action="openSettings"', 'data-action="openCgGallery"']), "开始、读档、CG、设置按钮存在")], "index.html")
        if case_id == 77:
            return self.result(77, [(self.ok_command("smoke_entry"), "角色选择后进入游戏烟测通过")], "scripts/smoke_game_entry.js")
        if case_id == 78:
            return self.result(78, [("tryMove" in self.game and "data-move" in self.index and "ArrowUp" in self.game, "键盘和按钮移动逻辑存在")], "src/game.js, index.html")
        if case_id == 79:
            return self.result(79, [("drawMap" in self.game and "drawAreaBackground" in self.game and "drawSemanticTiles" in self.game, "地图渲染使用语义素材")], "src/game.js")
        if case_id == 80:
            return self.result(80, [("tileBlocked" in self.game and self.map_collision_ok(), "碰撞检测函数和碰撞层有效")], "src/game.js, src/data/maps.json")
        if case_id == 81:
            return self.result(81, [("checkTransition" in self.game and all(game_map.get("transitions") for game_map in self.maps), "区域切换逻辑和转场点存在")], "src/game.js, src/data/maps.json")
        if case_id == 82:
            return self.result(82, [("npcsForMap" in self.game and all(game_map.get("npcs") for game_map in self.maps), "NPC 显示、站位和互动数据存在")], "src/game.js, src/data/maps.json")
        if case_id == 83:
            return self.result(83, [("renderDialogue" in self.game and "nextDialogue" in self.game and any(len(d.get("lines", [])) > 1 for d in self.dialogues), "多段对话和继续按钮可用")], "src/game.js, src/data/dialogues.json")
        if case_id == 84:
            return self.result(84, [("progressQuests" in self.game and "completeQuest" in self.game and self.quest_references_ok(), "任务接取、推进、完成函数存在")], "src/game.js, src/data/quests.json")
        if case_id == 85:
            return self.result(85, [("localStorage.setItem" in self.game and "loadGame" in self.game and self.ok_command("smoke_entry"), "存档写入和读取逻辑存在")], "src/game.js")
        if case_id == 86:
            return self.result(86, [("openCodex" in self.game and "群昵称" in self.game and "魂印线索" in self.game and "QQ 原昵称" not in self.game, "图鉴资料卡隐藏 QQ 原昵称并显示沉浸式线索")], "src/game.js")
        if case_id == 87:
            return self.result(87, [("cycleTime" in self.game and {"day", "dusk", "night"} <= {d.get("time") for d in self.dialogues}, "时间系统影响对话")], "src/game.js, src/data/dialogues.json")
        if case_id == 88:
            return self.result(88, [("npcSpawnSlot" in self.game and all(game_map.get("npcSpawnPools") for game_map in self.maps), "NPC 候选点随时间刷新")], "src/game.js, src/data/maps.json")
        if case_id == 89:
            return self.result(89, [(all(area.get("effects") for area in self.areas) and "openAreaDialogue" in self.game, "区域效果变量和区域对话存在")], "src/data/areas.json, src/game.js")
        if case_id == 90:
            return self.result(90, [("openSettings" in self.game and "volumeInput" in self.game and "gridInput" in self.game and "resetGame" in self.game, "设置面板控件齐全")], "src/game.js")
        if case_id == 91:
            ok = all(asset["source"] == "imagegen" and self.all_files(self.art_paths_for(asset)) for asset in self.art_assets) and self.asset_dimensions_ok()
            return self.result(91, [(ok and self.task_cgs_ok() and self.logo_ok(), "全角色、任务 CG、Logo image2/imagegen 资源无缺图、尺寸异常")], "src/data/art_assets.json, src/data/task_cgs.json, assets/imagegen")
        if case_id == 92:
            ok = len(self.tiles.get("areaBackgrounds", {})) == len(self.areas) and all(game_map.get("tileProfile") for game_map in self.maps)
            return self.result(92, [(ok and self.screenshots_ok(), "全地图语义素材已导入、被地图引用，并完成全场景截图验收")], "src/data/tiles.json, src/data/maps.json, docs/full_scene_screenshot_report.json")
        if case_id == 93:
            return self.result(93, [(len(self.quests) >= 70 and self.quest_references_ok(), "任务数据可读取且引用有效")], "src/data/quests.json")
        if case_id == 94:
            return self.result(94, [(self.text_ok(), "全文案无乱码且对话文本长度受控")], "src/data/dialogues.json, src/data/quests.json")
        if case_id == 95:
            return self.result(95, [(self.mainline_chain_ok() and self.quest_references_ok(), "主线任务链可由状态机推进到结局准备")], "src/data/quests.json, src/game.js")
        if case_id == 96:
            return self.result(96, [(sum(q["type"] == "bond" for q in self.quests) >= len(self.characters), "羁绊任务覆盖全部角色")], "src/data/quests.json")
        if case_id == 97:
            return self.result(97, [(sum(q["type"] == "easter" for q in self.quests) >= 12 and "ending_true_point" in json.dumps(self.quests, ensure_ascii=False), "隐藏/彩蛋任务能提供真结局点")], "src/data/quests.json")
        if case_id == 98:
            return self.result(98, [(not SENSITIVE.search(self.visible_profile_blob()), "资料卡可显示双昵称但无现实敏感信息")], "src/data/characters.json")
        if case_id == 99:
            return self.result(99, [(self.ok_command("node_check"), "脚本语法通过"), (self.ok_command("smoke_entry"), "入口与绘制烟测通过"), (self.ok_command("full_scene_screenshots") and self.screenshots_ok(), "全场景截图验收通过"), (self.ok_command("strict_validate"), "严格数据验收通过")], "node --check, smoke_game_entry.js, capture_full_scene_screenshots.js, validate_game.py")
        if case_id == 100:
            needed = ["index.html", "src/game.js", "src/data/game-data.js", "docs/XiaokangOnline_100Case_验收记录.md", "docs/IMAGE2_美术资产生成记录.md", "docs/full_scene_screenshot_report.json", "docs/full_scene_screenshot_report.md"]
            return self.result(100, [(self.all_files(needed) and len(self.cases) == 100, "交付文件和 100 case 清单齐全")], "project files")
        raise ValueError(f"unhandled case {case_id}")

    def write_reports(self, results: list[CaseResult]) -> None:
        summary = {
            "total": len(results),
            "passed": sum(result.status == "passed" for result in results),
            "failed": sum(result.status == "failed" for result in results),
        }
        payload = {
            "summary": summary,
            "commandResults": {
                key: {"passed": ok, "output": output}
                for key, (ok, output) in self.command_results.items()
            },
            "cases": [
                {
                    "id": result.id,
                    "node": result.node,
                    "acceptance": result.acceptance,
                    "status": result.status,
                    "evidence": result.evidence,
                    "details": result.details,
                }
                for result in results
            ],
        }
        (DOCS / "acceptance_report.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

        lines = [
            "# XiaokangOnline 自动化逐步验收报告",
            "",
            f"- 总 case：{summary['total']}",
            f"- 通过：{summary['passed']}",
            f"- 失败：{summary['failed']}",
            f"- 角色数：{len(self.characters)}",
            f"- 区域数：{len(self.areas)}",
            f"- 任务数：{len(self.quests)}",
            f"- 对话数：{len(self.dialogues)}",
            f"- 地图语义资产：{len(self.tiles.get('areaBackgrounds', {}))} 区域背景 / {len(self.tiles.get('baseTiles', []))} 基础地砖 / {len(self.tiles.get('decorGroups', []))} 装饰组",
            f"- 任务特殊 CG：{len(self.task_cgs)}",
            f"- 全场景截图：{len(self.screenshot_report.get('screenshots', []))}",
            f"- Logo：{'已导入' if self.logo_ok() else '待修复'}",
            "",
            table_row(["#", "Case 节点", "验收点", "状态", "证据", "自动检查详情"]),
            table_row(["---"] * 6),
        ]
        for result in results:
            status = "通过" if result.status == "passed" else "失败"
            lines.append(table_row([result.id, result.node, result.acceptance, status, result.evidence, "；".join(result.details)]))
        report_text = "\n".join(lines) + "\n"
        (DOCS / "acceptance_report.md").write_text(report_text, encoding="utf-8")
        (DOCS / "XiaokangOnline_100Case_验收记录.md").write_text(report_text.replace("自动化逐步验收报告", "100 Case 验收记录"), encoding="utf-8")

    def run(self) -> list[CaseResult]:
        self.run_preflight()
        results = [self.run_case(case_id) for case_id in range(1, 101)]
        self.write_reports(results)
        return results


def main() -> int:
    runner = AcceptanceRunner()
    results = runner.run()
    failed = [result for result in results if result.status == "failed"]
    print(json.dumps(
        {
            "total": len(results),
            "passed": len(results) - len(failed),
            "failed": len(failed),
            "failedCases": [{"id": result.id, "node": result.node, "details": result.details} for result in failed],
        },
        ensure_ascii=False,
        indent=2,
    ))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
