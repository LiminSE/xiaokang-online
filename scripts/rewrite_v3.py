#!/usr/bin/env python3
"""
V3: Deep dialogue rewriting for plain-spoken (平铺直叙) style.
Combines phrase-level replacements with careful first-person injection.
Each rewrite preserves the original meaning and character voice.
"""

import json, random, re, os, sys

random.seed(42)
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE, "src", "data")

# ================================================================
# PHRASE-LEVEL REWRITES: poetic → plain-spoken
# Each (pattern, replacement) preserves meaning, reduces flourish
# ================================================================

PLAIN_REWRITES = [
    # --- Metaphors → direct statements ---
    ("像群聊里那种没人承认但人人都看见的伏笔", "像群聊里那种人人都见过但没人认领的伏笔"),
    ("像刚截到名场面", "像刚截到的名场面"),
    ("像一条准点上线的召唤术", "准时得像闹钟"),
    ("像在看番剧的中场提示", "像在看番剧的提示"),
    ("像一颗刚发射的信号弹", "像一颗信号弹"),
    ("像刚打开一个很久没看的群聊", "像打开一个很久没看的群聊"),
    ("像在看一部不需要剧本的番", "像在看即兴演出的番剧"),
    ("像在给过生日的人升一个月亮", "像在给过生日的人升起特别的月亮"),
    ("像一台播放所有回声的留声机", "像一台播放回声的留声机"),
    ("像把整个小镇都搂进了怀里", "温暖着整个小镇"),

    # --- "不是X——是Y" → "不是X，是Y" ---
    ("不是坏了——是太久没人敲", "不是坏了，是太久没人敲"),
    ("不是bug——是群聊核心在苏醒前打了个嗝", "不是bug，是群聊核心在苏醒前打了个嗝"),

    # --- Poetic personification → simpler ---
    ("龙角灯轻轻闪了一下。不是故障——是牌馆在听。", "龙角灯轻轻闪了一下。牌馆在听。"),
    ("灯控台的屏幕上，那场三个月前的演出记录还在闪——", "灯控台的屏幕上还留着三个月前的演出记录——"),
    ("不是因为没人说话——是因为刚才的话太像规则书里的正文。", "因为刚才那句话像是规则书里的正文。"),
    ("不是天文现象——是小镇在给过生日的人升一个月亮。", "不是天文现象，是小镇给过生日的人升的月亮。"),
    ("不是即时通讯——是慢速通讯。", "不是即时通讯，是慢速通讯。"),
    ("不是哭。是想说深夜的湖边不是'一个人'。", "不是哭。是想说深夜的湖边不孤单。"),
    ("不是抒情。是我真的觉得颜色可以。", "我是真的觉得颜色可以。"),

    # --- Simplify flowery descriptions ---
    ("有一股「刚上线」的新鲜气场", "散发着刚上线的新鲜感"),
    ("他的身影出现在", "他出现在"),
    ("像是在等一个能接话的人", "在等一个能接话的人"),
    ("像是在等人，又像是在等一个时机", "在等人，也在等合适的时机"),
    ("像是把一段独白分享给了你", "把一段心里话分享给了你"),

    # --- Remove redundant "像在" personification ---
    ("像在说'我在放'", "在说'我在放'"),
    ("像在说'谢谢欣赏'", "在说'谢谢欣赏'"),
    ("像在集体点头", "在集体点头"),
    ("像在回答", "在回答"),
    ("像在确认这个数字是对的", "确认了这个数字"),

    # --- Player line improvements ---
    ("明白了。不是生硬的指示，像在看番剧的中场提示。", "明白了。不像任务指示，倒像番剧里的提示。"),
    ("气场对了。我开始理解为什么大家都说这个小镇是「聊出来的」。", "气场对了。我开始明白为什么大家都说这个小镇是「聊出来的」。"),
    ("有意思——你说话的方式让我想起群里的某个熟人。", "有意思——你说话的口气让我想起群里的熟人。"),
    ("这里的气氛不像游戏——更像刚打开一个很久没看的群聊。", "这里的气氛不像游戏，更像刚打开很久没看的群聊。"),
    ("好。这个开场比我想象的自然多了。", "好。这个开场比我预想的自然。"),
    ("你总能注意到一些别人会错过的东西。", "你总是能看到别人忽略的细节。"),
]

# ================================================================
# FIRST-PERSON INJECTION (~30% target)
# ================================================================

NO_FP_PREFIX = frozenset({
    "所以", "但是", "可是", "不过", "虽然", "然而", "因此",
    "而且", "并且", "因为", "如果", "要是", "只要", "除非",
    "无论", "不管", "即使", "哪怕", "何意味", "图呢",
    "笑死我了", "嚯嚯嚯", "唉我草", "还真是", "好。",
})

def safe_add_first_person(text, speaker):
    """Add 我/我觉得/我看 naturally to the beginning of a line."""
    if "我" in text:
        return text
    if speaker == "narrator" or text.startswith("旁白"):
        return text
    if len(text) < 6:
        return text

    # Don't add before conjunctions or catchphrases
    first_word = text[:4] if len(text) >= 4 else text
    for prefix in NO_FP_PREFIX:
        if text.startswith(prefix):
            return text

    # Pattern-based injection
    # Type A: "这/那 + description" → "我觉得这/那..."
    if re.match(r'^(这|那)(个|种|些|里|边|是|不|就|才|也)', text) and len(text) > 10:
        return "我觉得" + text

    # Type B: Environmental observation → "我看..."
    if re.match(r'^(广场|灯光|湖|喷泉|钟|舞台|画架|打印机|色板|信号塔|公告|菜单|门|栈道|树林|服务器)', text) and len(text) > 12:
        return "我看" + text

    # Type C: Assertions → "我觉得..."
    if re.match(r'^.{2,15}(不是|还是|就是|才是|也是)', text) and len(text) > 14:
        return "我觉得" + text

    # Type D: Start with adjective/evaluation
    if re.match(r'^(好|行|对|嗯|哦|哈)[。，！\s]', text) and len(text) > 8:
        return "我觉得" + text

    return text

def should_fp(speaker, text, idx):
    if speaker == "narrator" or text.startswith("旁白"):
        return False
    if "我" in text:
        return False
    if len(text) < 6:
        return False
    rate = 0.40 if speaker == "player" else 0.25
    return random.random() < rate

# ================================================================
# PROCESSING ENGINE
# ================================================================

def rewrite_text(text, speaker):
    """Apply all plain-spoken rewrites to a single text."""
    result = text
    for pattern, replacement in PLAIN_REWRITES:
        if pattern in result:
            result = result.replace(pattern, replacement)
    return result

def process_structure(obj, stats):
    """Walk through the data structure and rewrite all text fields."""
    if isinstance(obj, list):
        for item in obj:
            process_structure(item, stats)
    elif isinstance(obj, dict):
        if "text" in obj and "speaker" in obj:
            stats["total"] += 1
            orig = obj["text"]
            speaker = obj.get("speaker", "")

            # Phase 1: Plain-spoken rewrites
            obj["text"] = rewrite_text(orig, speaker)

            # Phase 2: First-person injection
            if should_fp(speaker, obj["text"], stats["total"]):
                fp_text = safe_add_first_person(obj["text"], speaker)
                if fp_text != obj["text"]:
                    obj["text"] = fp_text
                    stats["fp"] += 1

            if obj["text"] != orig:
                stats["changed"] += 1

        # Recurse into nested dicts/lists
        for key, val in obj.items():
            if key in ("text", "speaker", "id", "label", "icon"):
                continue
            if isinstance(val, (list, dict)):
                process_structure(val, stats)

def rewrite_file(fname, label):
    path = os.path.join(DATA_DIR, fname)
    if not os.path.exists(path):
        print(f"  ⚠️  {label}: not found")
        return None

    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    stats = {"total": 0, "fp": 0, "changed": 0}
    process_structure(data, stats)

    if stats["total"] > 0:
        fp_pct = stats["fp"] / stats["total"] * 100
        ch_pct = stats["changed"] / stats["total"] * 100
        print(f"  {label}: {stats['total']} lines → "
              f"{stats['changed']} changed ({ch_pct:.1f}%), "
              f"{stats['fp']} +FP ({fp_pct:.1f}%)")
    else:
        print(f"  {label}: {len(data)} entries")

    # Backup and save
    backup = path + ".bak"
    if not os.path.exists(backup):
        os.rename(path, backup)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    return data

if __name__ == "__main__":
    print("=" * 60)
    print("📝 V3: Deep Plain-Spoken Rewriting")
    print("=" * 60)

    for fname, label in [("dialogues.json", "Dialogues"),
                          ("items.json", "Items"),
                          ("quests.json", "Quests")]:
        rewrite_file(fname, label)

    print(f"\n✅ All files rewritten. Originals at *.bak")
    print(f"💡 Revert: cp src/data/*.bak src/data/ (strip .bak)")
