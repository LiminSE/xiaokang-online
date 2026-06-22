#!/usr/bin/env python3
"""Rewrite bond CG prompts from actual pair-story analysis.

The V3 prompt pass is analysis-first and reference-board driven: each CG
receives a story-source card, a no-romance safety card, and a concrete
composition reference before the final imagegen prompt is assembled.
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src" / "data"
DOCS = ROOT / "docs"
REFERENCE_BOARD_PATH = DATA / "bond_cg_reference_board_v3.json"


NO_ROMANCE_SAFETY = (
    "群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。"
    "禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。"
    "如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。"
)


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def load_reference_board():
    if not REFERENCE_BOARD_PATH.exists():
        return {"references": [], "episodeReferenceMap": {}}
    return read_json(REFERENCE_BOARD_PATH)


def compact(text, limit=180):
    text = re.sub(r"\s+", " ", str(text or "")).strip()
    return text if len(text) <= limit else text[: limit - 1].rstrip("，。；; ") + "…"


def sanitize_no_romance_text(text):
    replacements = [
        ("最亲密的搭档之一", "高频互动搭档之一"),
        ("亲密的搭档", "高频互动搭档"),
        ("亲密", "高频"),
        ("任务目标和想见之人形成暧昧误会", "任务目标和导航标记形成找错点位的笑话"),
        ("自己想见的", "自己标错的"),
        ("你自己想见的", "你自己标错的"),
        ("想见之人", "目标点位"),
        ("想见的", "要找的"),
        ("想见", "要找"),
        ("暧昧误会", "导航误判"),
        ("暧昧", "误判"),
        ("恋爱喜剧", "误会喜剧"),
        ("恋爱番", "误会番"),
        ("命运红线", "错误路线"),
        ("红线", "路线"),
        ("心动箭头", "任务箭头"),
        ("心动", "路线亮起"),
        ("突然脸红特写", "突然卡住特写"),
        ("脸红", "卡住"),
        ("好感事件", "支线事件"),
        ("galgame", "ADV 游戏"),
        ("心虚", "卡住"),
    ]
    for old, new in replacements:
        text = str(text).replace(old, new)
    return text


def relation_type(source_note):
    match = re.search(r"关系属于'([^']+)'", source_note or "")
    if match:
        return match.group(1)
    if "不是“固定站一起”" in (source_note or ""):
        return "动态拱火拆台型"
    return "熟人接梗型"


def detect_story_area(pair, areas):
    agent_text = [line.get("text", "") for line in pair.get("agentLines", []) if isinstance(line, dict)]
    text = " ".join(pair.get("beats", []) + pair.get("activePassive", []) + agent_text)
    for area in areas.values():
        if area["name"] in text:
            return area["id"], "actual_story_text"
    return pair.get("area"), "pair_area_fallback"


def old_prompt_prop(pair):
    match = re.search(r"具体物件是([^，。\n]+)", pair.get("cgPrompt", "") or "")
    return match.group(1) if match else ""


PROP_BY_EPISODE = {
    "sync_stakeout": {
        "town_center": "路灯复读串",
        "restaurant": "晚饭召集锅",
        "dragon_card_house": "无效门禁",
        "livehouse": "吧台小灯",
        "echo_lake": "栈道留言瓶",
        "care_home": "茶室值班表",
        "atelier": "图鉴抽屉",
        "northern_wilds": "野外信号塔",
        "server_room": "状态灯墙",
    },
    "name_echo": {
        "town_center": "小康钟",
        "restaurant": "蒸汽表情云",
        "dragon_card_house": "翻车记录板",
        "livehouse": "临时麦克风",
        "echo_lake": "栈道留言瓶",
        "care_home": "零点钟楼",
        "atelier": "图鉴抽屉",
        "northern_wilds": "溪边缓存",
        "server_room": "状态灯墙",
    },
    "npc_route": {
        "town_center": "下次一定摊",
        "restaurant": "加饭按钮",
        "dragon_card_house": "无效门禁",
        "livehouse": "海报滤镜墙",
        "echo_lake": "月相开关",
        "care_home": "结局门垫",
        "atelier": "像素屏幕",
        "northern_wilds": "蘑菇路标",
        "server_room": "线路桥",
    },
    "self_made_bug": {
        "town_center": "喷泉弹幕井",
        "restaurant": "半糖裁判杯",
        "dragon_card_house": "额外牌堆",
        "livehouse": "深夜灯控台",
        "echo_lake": "月相开关",
        "care_home": "零点钟楼",
        "atelier": "像素屏幕",
        "northern_wilds": "野外信号塔",
        "server_room": "核心重启杆",
    },
    "third_arrival": {
        "town_center": "公告牌",
        "restaurant": "晚饭召集锅",
        "dragon_card_house": "龙角裁判席",
        "livehouse": "海报滤镜墙",
        "echo_lake": "栈道留言瓶",
        "care_home": "茶室值班表",
        "atelier": "图鉴抽屉",
        "northern_wilds": "露营留言火",
        "server_room": "状态灯墙",
    },
    "three_line_light": {
        "town_center": "小康钟",
        "restaurant": "吧台式餐桌灯",
        "dragon_card_house": "龙角裁判席",
        "livehouse": "深夜灯控台",
        "echo_lake": "湖面倒影",
        "care_home": "零点钟楼",
        "atelier": "同步色板",
        "northern_wilds": "露营留言火",
        "server_room": "状态灯墙",
    },
    "quiet_lamp": {
        "town_center": "路灯复读串",
        "restaurant": "吧台小灯",
        "dragon_card_house": "龙角裁判席",
        "livehouse": "吧台小灯",
        "echo_lake": "留言灯",
        "care_home": "安眠躺椅",
        "atelier": "像素屏幕",
        "northern_wilds": "露营留言火",
        "server_room": "状态灯墙",
    },
    "overlap_shadow": {
        "town_center": "路灯复读串",
        "restaurant": "蒸汽表情云",
        "dragon_card_house": "额外牌堆",
        "livehouse": "海报滤镜墙",
        "echo_lake": "湖面倒影",
        "care_home": "结局门垫",
        "atelier": "立绘修补台",
        "northern_wilds": "溪边缓存",
        "server_room": "线路桥",
    },
    "short_combo": {
        "town_center": "喷泉弹幕井",
        "restaurant": "半糖裁判杯",
        "dragon_card_house": "额外牌堆",
        "livehouse": "临时麦克风",
        "echo_lake": "湖面倒影",
        "care_home": "结局门垫",
        "atelier": "像素屏幕",
        "northern_wilds": "蘑菇路标",
        "server_room": "核心重启杆",
    },
}


EPISODE_RULES = [
    ("overlap_shadow", ["人影", "重叠", "新梗的标题"]),
    ("sync_stakeout", ["正好", "蹲点"]),
    ("name_echo", ["回声", "名字", "拼错"]),
    ("npc_route", ["行动模式比NPC", "换地方", "想见"]),
    ("self_made_bug", ["只有我一个人发现", "我弄的", "bug"]),
    ("third_arrival", ["第三个到", "看到了你不在", "刚好"]),
    ("three_line_light", ["好光线", "三行诗", "观测点"]),
    ("quiet_lamp", ["特别安静", "淡季", "路灯"]),
]


EPISODE_META = {
    "sync_stakeout": {
        "name": "同步蹲点事件",
        "relationship_action": "一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。",
        "composition": "把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。",
        "meme_composition": "进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。",
        "poster_inspiration": "可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。",
        "neta": "二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。",
    },
    "name_echo": {
        "name": "名字回声事件",
        "relationship_action": "两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。",
        "composition": "用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。",
        "meme_composition": "番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。",
        "poster_inspiration": "可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。",
        "neta": "角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。",
    },
    "npc_route": {
        "name": "NPC行动路线与任务导航误判",
        "relationship_action": "一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。",
        "composition": "画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。",
        "meme_composition": "双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。",
        "poster_inspiration": "可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。",
        "neta": "NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。",
    },
    "self_made_bug": {
        "name": "自制异常与 bug 验收",
        "relationship_action": "一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。",
        "composition": "核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。",
        "meme_composition": "ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。",
        "poster_inspiration": "可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。",
        "neta": "测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。",
    },
    "third_arrival": {
        "name": "第三个到与错过事件",
        "relationship_action": "一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。",
        "composition": "核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。",
        "meme_composition": "番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。",
        "poster_inspiration": "可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。",
        "neta": "错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。",
    },
    "three_line_light": {
        "name": "观测点与三行诗",
        "relationship_action": "一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。",
        "composition": "让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。",
        "meme_composition": "电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。",
        "poster_inspiration": "可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。",
        "neta": "日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。",
    },
    "quiet_lamp": {
        "name": "淡季、路灯与吐槽停顿",
        "relationship_action": "一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”",
        "composition": "画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。",
        "meme_composition": "经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。",
        "poster_inspiration": "可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。",
        "neta": "治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。",
    },
    "overlap_shadow": {
        "name": "重叠人影与新梗标题",
        "relationship_action": "一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。",
        "composition": "用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。",
        "meme_composition": "灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。",
        "poster_inspiration": "可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。",
        "neta": "灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。",
    },
    "short_combo": {
        "name": "短句连招与线索物判定",
        "relationship_action": "剧情只剩高密度短句，重点是两人用极短反应把线索物判成群聊名场面。",
        "composition": "画成战斗漫画式短句连招：一人抛出线索，另一人用判定姿势接住，核心物件发出夸张但不可读的效果线。",
        "meme_composition": "少年漫技能连招/吐槽役接招构图：一人像放技能一样抛梗，另一人用判定手势接住，背景有速度线但无文字。",
        "poster_inspiration": "可借热血动画封面、动作喜剧搭档海报、格斗游戏必杀技 cut-in、吐槽役接梗 meme 的分屏近景；允许斜切画面和强透视。",
        "neta": "弹幕番短句 combo、对话像技能前摇、吐槽役与接梗役合体技、SSR 判定演出。",
    },
}


def reference_for_episode(episode, board):
    refs_by_id = {item["id"]: item for item in board.get("references", [])}
    ref_ids = board.get("episodeReferenceMap", {}).get(episode, [])
    selected = []
    for ref_id in ref_ids:
        ref = refs_by_id.get(ref_id)
        if not ref:
            continue
        selected.append({
            "id": ref["id"],
            "title": ref["title"],
            "sourceName": ref["sourceName"],
            "sourceUrl": ref["sourceUrl"],
            "localPath": ref["localPath"],
            "compositionUse": ref["compositionUse"],
            "promptCue": ref["promptCue"],
            "avoidCopy": ref["avoidCopy"],
            "download": ref.get("download", {}),
        })
    return selected


def classify_episode(pair):
    text = " ".join(pair.get("activePassive", []) + pair.get("beats", []) + [
        line.get("text", "") for line in pair.get("agentLines", []) if isinstance(line, dict)
    ])
    if ("人影" in text and "重叠" in text) or "新梗的标题" in text:
        return "overlap_shadow"
    if "正好" in text and "蹲点" in text:
        return "sync_stakeout"
    if "喊我的名字" in text or "拼错" in text:
        return "name_echo"
    if "行动模式比NPC" in text or "找什么人" in text or "想见" in text:
        return "npc_route"
    if "只有我一个人发现" in text or "我弄的" in text or "bug" in text:
        return "self_made_bug"
    if "第三个到" in text or "看到了你不在" in text:
        return "third_arrival"
    if "好光线" in text or "三行诗" in text or "观测点" in text:
        return "three_line_light"
    if "特别安静" in text and ("淡季" in text or "路灯" in text):
        return "quiet_lamp"
    return "short_combo"


def choose_prop(pair, episode, area_id, areas):
    old = old_prompt_prop(pair)
    actual_interactions = [item[0] for item in areas[area_id].get("interactions", [])]
    if old in actual_interactions and episode not in {"npc_route", "three_line_light", "quiet_lamp", "overlap_shadow"}:
        return old
    return PROP_BY_EPISODE.get(episode, {}).get(area_id) or (actual_interactions[0] if actual_interactions else old or "关系线索物")


def named_lines(pair, chars, limit=6):
    lines = []
    for line in pair.get("agentLines", []):
        if not isinstance(line, dict):
            continue
        speaker = line.get("speaker")
        if speaker in {"narrator", "player"}:
            continue
        name = chars.get(speaker, {}).get("displayName", speaker)
        lines.append(f"{name}：“{line.get('text', '')}”")
    return "；".join(lines[:limit])


def story_beats(pair):
    selected = []
    if pair.get("beats"):
        selected.append(pair["beats"][0])
    selected.extend(pair.get("activePassive", [])[:4])
    if pair.get("beats"):
        selected.append(pair["beats"][-1])
    return " / ".join(compact(item, 100) for item in selected if item)


def choices(pair):
    return " / ".join(f"{item.get('label')}：{item.get('result')}" for item in pair.get("galChoices", [])[:3])


def visual_dna(char):
    dna = char.get("avatarVisualDNA", {})
    colors = " / ".join(dna.get("primaryColors", [])[:2])
    symbols = "、".join(dna.get("symbols", [])[:3])
    seeds = "、".join(char.get("memeSeeds", [])[:5])
    return f"{char.get('displayName')}（{char.get('title')}）：主色 {colors}，符号 {symbols}，梗种子 {seeds}"


def reference_images(char):
    expressions = char.get("expressions", {})
    refs = {
        "portrait": char.get("portrait"),
        "avatar": char.get("avatar"),
        "neutral": expressions.get("neutral"),
        "happy": expressions.get("happy"),
        "tease": expressions.get("tease"),
        "serious": expressions.get("serious"),
    }
    return {key: value for key, value in refs.items() if value}


def composition_reference_text(analysis):
    refs = analysis.get("compositionReferences") or []
    if not refs:
        return "Reference frame: 未找到下载参考图；按 meme/anime composition 文字分镜生成。"
    primary = refs[0]
    backups = refs[1:]
    backup_text = ""
    if backups:
        backup_text = " Backup reference(s): " + "; ".join(
            f"{item['id']} {item['localPath']} ({item['compositionUse']})" for item in backups
        ) + "."
    return (
        f"Reference frame: first inspect `{primary['localPath']}` ({primary['title']}, source {primary['sourceName']}). "
        f"Use it only as a composition storyboard: {primary['promptCue']} "
        "Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. "
        f"Avoid copying: {primary['avoidCopy']}.{backup_text}"
    )


def build_analysis(pair, cg, chars, areas, reference_board):
    area_id, area_source = detect_story_area(pair, areas)
    episode = classify_episode(pair)
    area = areas[area_id]
    prop = choose_prop(pair, episode, area_id, areas)
    relation = relation_type(pair.get("sourceNote"))
    meta = EPISODE_META[episode]
    source_mismatch = area_id != pair.get("area")
    return {
        "id": cg["id"],
        "pairId": pair["id"],
        "title": pair["title"],
        "characters": cg.get("characters", []),
        "out": cg.get("path"),
        "episodeType": episode,
        "episodeName": meta["name"],
        "relationshipType": relation,
        "storyAreaId": area_id,
        "storyAreaName": area["name"],
        "storyAreaSource": area_source,
        "legacyAreaId": pair.get("area"),
        "sourceMismatch": source_mismatch,
        "coreProp": prop,
        "storySource": sanitize_no_romance_text(compact(pair.get("sourceNote"), 320)),
        "storyBeats": sanitize_no_romance_text(story_beats(pair)),
        "dialogueBasis": sanitize_no_romance_text(named_lines(pair, chars)),
        "choiceEnergy": sanitize_no_romance_text(choices(pair)),
        "relationshipAction": meta["relationship_action"],
        "compositionPlan": meta["composition"],
        "memeComposition": meta["meme_composition"],
        "posterInspiration": meta["poster_inspiration"],
        "netaPlan": meta["neta"],
        "relationshipSafety": NO_ROMANCE_SAFETY,
        "compositionReferences": reference_for_episode(episode, reference_board),
        "referenceImages": {
            pair["a"]: reference_images(chars[pair["a"]]),
            pair["b"]: reference_images(chars[pair["b"]]),
        },
        "areaVisual": area.get("visual", ""),
        "areaMotifs": area.get("motifs", []),
    }


def build_prompt(analysis, chars):
    a_id, b_id = analysis["characters"]
    a = chars[a_id]
    b = chars[b_id]
    motifs = "、".join(analysis["areaMotifs"])
    prompt = "\n".join([
        "Use case: illustration-story",
        f"Asset type: 小康Online 双人羁绊解锁 CG，路径 {analysis['pairId']}",
        "Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。",
        f"Story source: {analysis['title']}。{analysis['storySource']}",
        f"Episode type: {analysis['episodeName']}；关系类型：{analysis['relationshipType']}。",
        f"Story beats to visualize: {analysis['storyBeats']}",
        f"Dialogue basis: {analysis['dialogueBasis']}",
        f"Choice energy: {analysis['choiceEnergy']}",
        f"Relationship safety: {analysis['relationshipSafety']}",
        f"Scene/backdrop: 以剧情文本实际场景为准：{analysis['storyAreaName']}。视觉元素：{analysis['areaVisual']}。核心物件：{analysis['coreProp']}。可带入区域 motif：{motifs}。",
        composition_reference_text(analysis),
        f"Character reference images: before generating, inspect and follow these exact designs. {a['displayName']} portrait {a.get('portrait')}, expressions {a.get('expressions')}; {b['displayName']} portrait {b.get('portrait')}, expressions {b.get('expressions')}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.",
        f"Subject: {a['displayName']}（{a['title']}）与{b['displayName']}（{b['title']}）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。{visual_dna(a)}；{visual_dna(b)}。",
        f"Relationship acting: {analysis['relationshipAction']} 围绕“{analysis['coreProp']}”演出来，必须有明确的递话/接梗/拆台姿态。",
        f"Meme/anime composition: {analysis['memeComposition']}",
        f"Cover/poster/meme inspiration: {analysis['posterInspiration']} 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。",
        f"Composition/framing: 横向 4:3，{analysis['compositionPlan']} 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。",
        "Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。",
        f"ACG/neta direction: {analysis['netaPlan']} 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。",
        "Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。",
        "Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。",
        "Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。",
    ])
    return prompt


def main():
    chars = {item["id"]: item for item in read_json(DATA / "characters.json")}
    areas = {item["id"]: item for item in read_json(DATA / "areas.json")}
    reference_board = load_reference_board()
    story_database = read_json(DATA / "story_database.json")
    cg_unlocks = read_json(DATA / "cg_unlocks.json")
    cg_jobs = read_json(DATA / "cg_imagegen_jobs.json")

    pairs = {item["id"]: item for item in story_database.get("pairStories", [])}
    analyses = []
    prompts_by_cg_id = {}
    prompts_by_pair_id = {}

    for cg in cg_unlocks.get("pair", []):
        pair_id = cg.get("id", "").replace("cg_", "", 1)
        pair = pairs.get(pair_id)
        if not pair:
            continue
        analysis = build_analysis(pair, cg, chars, areas, reference_board)
        prompt = build_prompt(analysis, chars)
        analysis["prompt"] = prompt
        analyses.append(analysis)
        prompts_by_cg_id[cg["id"]] = prompt
        prompts_by_pair_id[pair_id] = prompt
        cg["prompt"] = prompt
        cg["promptVersion"] = "v3_reference_board_no_romance"
        cg["promptAnalysis"] = {
            key: analysis[key]
            for key in [
                "episodeName",
                "storyAreaId",
                "storyAreaName",
                "sourceMismatch",
                "coreProp",
                "relationshipAction",
                "compositionPlan",
                "memeComposition",
                "posterInspiration",
                "netaPlan",
                "relationshipSafety",
                "compositionReferences",
                "referenceImages",
            ]
        }

    for pair in story_database.get("pairStories", []):
        prompt = prompts_by_pair_id.get(pair["id"])
        if prompt:
            pair["cgPrompt"] = prompt
            pair["imagegen"] = "prompt_v3_reference_board_no_romance"

    for job in cg_jobs:
        if job.get("kind") == "bond_cg" and job.get("id") in prompts_by_cg_id:
            job["prompt"] = prompts_by_cg_id[job["id"]]
            job["source"] = "relationship_story_prompt_v3"

    write_json(DATA / "story_database.json", story_database)
    write_json(DATA / "cg_unlocks.json", cg_unlocks)
    write_json(DATA / "cg_imagegen_jobs.json", cg_jobs)
    write_json(DATA / "bond_cg_prompt_analysis_v3.json", analyses)

    doc = [
        "# 小康Online 羁绊 CG Prompt V3",
        "",
        "本文件由 `scripts/rewrite_bond_cg_prompts_v2.py` 生成。",
        "每张图先分析真实关系剧情来源，再绑定本地构图参考、角色立绘参考和无恋爱暗示安全约束，最后形成 imagegen prompt。",
        "",
        "## 总原则",
        "",
        "- 以 `story_database.pairStories` 的实际剧情台词为准，旧 prompt 或旧区域只作参考。",
        "- 如果旧区域和剧情文本冲突，采用剧情文本中实际出现的区域。",
        "- 羁绊图必须表现关系动作：递话、接梗、拆台、误会、共同观测或互相验收。",
        "- 群友是真实存在的人，画面只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者，不做 CP/恋爱/暧昧/约会/情侣感。",
        "- 可以借番剧封面、电影海报、互联网梗图和 meme 截图的构图语法；不要求 Q 版站姿、平视镜头或保守动作。",
        "- 参考图只借镜头角度、人物阻挡关系、负空间、剪影节奏和搞笑时机，不引用具体商业动画角色、logo、海报标题或可读文字。",
        "",
    ]
    for analysis in analyses:
        mismatch = "是" if analysis["sourceMismatch"] else "否"
        doc.extend([
            f"## {analysis['id']} {analysis['title']}",
            "",
            f"- 输出：`{analysis['out']}`",
            f"- 剧情来源：`{analysis['pairId']}` / {analysis['episodeName']} / {analysis['relationshipType']}",
            f"- 实际场景：{analysis['storyAreaName']}（旧区域是否冲突：{mismatch}）",
            f"- 核心物件：{analysis['coreProp']}",
            f"- 关系动作：{analysis['relationshipAction']}",
            f"- 关系安全：{analysis['relationshipSafety']}",
            f"- 构图参考：{', '.join(ref['id'] for ref in analysis.get('compositionReferences', [])) or '无'}",
            f"- 立绘参考：`{analysis['referenceImages'][analysis['characters'][0]]['portrait']}` + `{analysis['referenceImages'][analysis['characters'][1]]['portrait']}`",
            f"- Meme/番剧构图：{analysis['memeComposition']}",
            f"- 封面/海报/梗图灵感：{analysis['posterInspiration']}",
            f"- 构图分析：{analysis['compositionPlan']}",
            f"- ACG/neta：{analysis['netaPlan']}",
            "",
            "```text",
            analysis["prompt"],
            "```",
            "",
        ])
    (DOCS / "BOND_CG_PROMPTS_V3.md").write_text("\n".join(doc), encoding="utf-8")
    print(f"rewrote {len(analyses)} bond CG prompts with analysis")


if __name__ == "__main__":
    main()
