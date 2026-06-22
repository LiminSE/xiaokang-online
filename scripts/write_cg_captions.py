#!/usr/bin/env python3
"""Write dedicated gallery captions for every CG unlock."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src" / "data"


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def compact(text, limit=42):
    text = str(text or "").replace("\n", " ").strip()
    return text if len(text) <= limit else text[: limit - 1].rstrip("，。；; ") + "…"


def safe_text(text):
    replacements = {
        "亲密": "高频",
        "暧昧": "误判",
        "恋爱": "误会",
        "心动": "路线亮起",
        "红线": "路线",
        "脸红": "卡住",
        "好感": "支线",
        "情侣": "双人",
        "约会": "会合",
        "告白": "说明",
        "CP": "搭档",
        "cp": "搭档",
    }
    for old, new in replacements.items():
        text = str(text).replace(old, new)
    return text


PAIR_TEMPLATES = {
    "sync_stakeout": "{a}和{b}在{area}把“正好”抓成现场证据；{prop}亮起时，蹲点已经不需要解释。",
    "name_echo": "{a}和{b}围着{prop}确认是谁被点名；{area}替他们把名字回声悄悄存档。",
    "npc_route": "{a}和{b}的路线在{prop}前撞车；一个像 NPC 巡逻，一个像地图正在重算。",
    "self_made_bug": "{a}负责展示，{b}负责验收；{prop}一亮，测试服事故正式开场。",
    "third_arrival": "{a}和{b}赶到{area}时，{prop}旁已经留下错过隐藏事件的证据。",
    "three_line_light": "{a}和{b}暂停任务，看{prop}把光切成三行；这张图不是合照，是共同观测记录。",
    "quiet_lamp": "{a}和{b}在{prop}旁把冷场坐成小剧场；灯光是第三位吐槽役。",
    "overlap_shadow": "{a}指着影子，{b}已经开始记录；{prop}把“像你又不是你”变成标题。",
    "short_combo": "{a}和{b}把短句打成连招；{prop}负责发光，吐槽负责收尾。",
}


TASK_CAPTIONS = {
    "cg_task_online_abnormal": "上线第一秒，小镇把异常弹成烟花；玩家还没站稳，群聊梗已经满街跑。",
    "cg_task_server_core": "服务器核心被重新点亮，状态灯一起装作什么都没坏过。",
    "cg_task_restaurant_dinner": "餐厅的晚饭召集锅开场，错单和加饭按钮都等着被当成线索。",
    "cg_task_livehouse_stage": "舞台灯一亮，临时麦克风把支线唱成全场都懂的梗。",
    "cg_task_atelier_palette": "头像工坊把色板摊开，立绘、贴纸和修补台一起等候判定。",
    "cg_task_echo_lake_poem": "湖边回声把诗页和漂流瓶递回岸上，连月光都像在补充说明。",
    "cg_task_dragon_card_gate": "龙牌馆门禁亮起，牌桌、裁判席和翻车记录板同时表示有话要说。",
    "cg_task_northern_signal": "北部荒野的信号塔忽明忽暗，露营火旁的留言终于接上频道。",
    "cg_task_care_home_clock": "茶室钟声走到零点，安静的房间把迟到和守夜都收进缓存。",
}


def main():
    cg_unlocks = read_json(DATA / "cg_unlocks.json")
    chars = {item["id"]: item for item in read_json(DATA / "characters.json")}
    areas = {item["id"]: item for item in read_json(DATA / "areas.json")}
    analyses = {item["id"]: item for item in read_json(DATA / "bond_cg_prompt_analysis_v3.json")}

    for cg in cg_unlocks.get("main", []):
        cg["caption"] = "主线收束，所有人的上线提示汇成同一束光；小康钟重新亮起，服务器终于不再装死。"

    for cg in cg_unlocks.get("task", []):
        cg["caption"] = TASK_CAPTIONS.get(
            cg["id"],
            f"{cg.get('name', '任务插画')}把任务节点定格成小镇回放；完成时，线索终于有了画面。",
        )

    for cg in cg_unlocks.get("pair", []):
        analysis = analyses.get(cg["id"], {})
        char_ids = cg.get("characters") or analysis.get("characters") or []
        a = chars.get(char_ids[0], {}).get("displayName", char_ids[0] if char_ids else "这位居民")
        b = chars.get(char_ids[1], {}).get("displayName", char_ids[1] if len(char_ids) > 1 else "那位居民")
        episode = analysis.get("episodeType", "short_combo")
        template = PAIR_TEMPLATES.get(episode, PAIR_TEMPLATES["short_combo"])
        area = analysis.get("storyAreaName") or areas.get(analysis.get("storyAreaId"), {}).get("name") or "小镇"
        prop = analysis.get("coreProp") or "线索物"
        cg["caption"] = safe_text(template.format(a=a, b=b, area=area, prop=prop))

    for cg in cg_unlocks.get("final", []):
        char_id = (cg.get("characters") or [cg.get("unlock", "").replace("bond_", "")])[0]
        char = chars.get(char_id, {})
        name = char.get("displayName") or cg.get("name", "这位居民").replace("最终CG", "")
        title = char.get("title") or "小镇居民"
        default_area = areas.get(char.get("defaultArea"), {}).get("name", "小镇")
        seeds = "、".join((char.get("memeSeeds") or [])[:2]) or "自己的节奏"
        cg["caption"] = safe_text(f"{name}把{default_area}的{seeds}收成最终章；{title}的画面，熟人一眼就能认出。")

    write_json(DATA / "cg_unlocks.json", cg_unlocks)
    total = sum(len(cg_unlocks.get(key, [])) for key in ["main", "task", "pair", "final"])
    with_caption = sum(1 for key in ["main", "task", "pair", "final"] for cg in cg_unlocks.get(key, []) if cg.get("caption"))
    print(f"wrote captions {with_caption}/{total}")


if __name__ == "__main__":
    main()
