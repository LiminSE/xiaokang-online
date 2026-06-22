#!/usr/bin/env python3
"""
V4: Comprehensive plain-spoken rewriting with broad pattern coverage.
Applies general simplification rules (not just exact matches) plus
targeted first-person injection.
"""

import json, random, re, os

random.seed(42)
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE, "src", "data")

# ================================================================
# GENERAL SIMPLIFICATION RULES (applied to ALL text)
# Each rule is (regex_pattern, replacement)
# Applied in order; each sees results of previous rules
# ================================================================

RULES = [
    # --- Rule 1: "不是X——是Y" → "不是X，是Y" ---
    (r'不是(.{1,40}?)——是(.{1,40}?)([。，])', r'不是\1，是\2\3'),

    # --- Rule 2: "像在说X" → "在说X" (remove figurative wrapper) ---
    (r'——像在说(.+?)。$', r'——在说\1。'),
    (r'——像在问(.+?)。$', r'——在问\1。'),
    (r'——像在回答$', r'——在回答'),
    (r'——像在确认(.+?)。$', r'——确认了\1。'),
    (r'——像在等(.+?)。$', r'——在等\1。'),
    (r'——像在(.{1,30}?)。$', r'——在\1。'),

    # --- Rule 3: "像是在X" → "在X" ---
    (r'像是在(.{1,30}?)([。，])', r'在\1\2'),

    # --- Rule 4: "有一种「X」的Y" → simpler ---
    (r'有一种「(.+?)」的(.+?)气场', r'有一种「\1」的感觉'),
    (r'周身有一种(.+?)的气场', r'散发着\1的感觉'),

    # --- Rule 5: "X——不是Y，是Z" → "X。不是Y，是Z" ---
    (r'——不是(.{1,30}?)——是(.{1,30}?)。$', r'。不是\1，是\2。'),

    # --- Rule 6: "X的变形" → simpler ---
    (r'都是「(.+?)」的变形', r'都是在说「\1」'),

    # --- Rule 7: Reduce stacked personifications ---
    (r'轻轻(.{1,10})了一下——(.+?)', r'\1了一下，\2'),
    (r'缓缓(.{1,10})——(.+?)', r'\1，\2'),
    (r'微微(.{1,10})——(.+?)', r'\1，\2'),

    # --- Rule 8: "不是X的问题——是Y" → simpler ---
    (r'不是(.{1,30})的问题——是(.{1,30}?)。$', r'不是\1的问题，是\2。'),

    # --- Rule 9: Reduce em-dash overuse ---
    (r'——(.+?)——(.+?)——(.+?)', r'——\1，\2，\3'),

    # --- Rule 10: "X得Y" → more direct when flowery ---
    (r'不(.{1,10})也不(.{1,10})——(.+?)', r'不\1也不\2，\3'),

    # --- Rule 11: Description chains → simpler ---
    (r'像(.{1,20})里(.{1,20})的(.{1,20})一样', r'像\1\2\3'),
    (r'像(.{1,20})从(.{1,20})里(.{1,10})出来的', r'从\2里\3出来的'),

    # --- Rule 12: "X里多了一个Y" → direct ---
    (r'空气里多了一个(.+?)的余温', r'空气里多了一些\1的温度'),

    # --- Rule 13: "X在Y上说了一句Z" → simpler ---
    (r'在(.{1,30})上轻轻(.{1,10})——(.+?)', r'在\1上\2，\3'),

    # --- Rule 14: Remove redundant "不是" explanations ---
    (r'——不是(.{1,20})，是(.{1,30}?)。$', r'。\2。'),

    # --- Rule 15: "X到Y——Z" → "X到Y，Z" ---
    (r'(.{1,20})到(.{1,20})——(.+?)', r'\1到\2，\3'),
]

def apply_rules(text):
    """Apply all simplification rules sequentially."""
    result = text
    for pattern, replacement in RULES:
        prev = None
        # Apply until stable (to handle nested cases)
        while prev != result:
            prev = result
            result = re.sub(pattern, replacement, result)
    return result

# ================================================================
# PHRASE-SPECIFIC REWRITES (exact match → replacement)
# These handle common poetic phrases that the general rules miss
# ================================================================

PHRASES = {
    # --- Narrator descriptions ---
    "他知道会有人来。他抬头看了你一眼。": "像是知道会有人来。他抬头看着你。",
    "他周围有一种「刚上线」的新鲜气场。": "他周围有一种刚上线的新鲜感。",
    "他大概是这个区域里最像群聊本聊的人。": "他在这个区域里最像群聊本身。",
    "他似乎正在等一个能接话的人。": "他在等能接上话的人。",
    "在自己的地盘上，说话都放松了几分。": "在自己的地盘上说话更放松。",
    "看起来像是在等人，又像是在等一个时机。": "在等人，也在等一个合适的时机。",
    "看起来比平时更随意——毕竟这里是所有人的交集点。": "看起来比平时更随意，这里是所有人的交集点。",
    "不是小康养老院的常客，但每次来都能发现一些本地人忽略的细节。": "不常来养老院，但每次来都能发现一些细节。",
    "偶尔也会来": "偶尔会来",
    "每次来，都有不太一样的发现。": "每次来都有不同的发现。",
    "不算意外——广场是所有人的必经之路。": "不算意外，广场是所有人的必经之路。",

    # --- Player lines ---
    "明白了。不是生硬的指示，像在看番剧的中场提示。": "明白了。不像任务指示，更像番剧里的提示。",
    "气场对了。我开始理解为什么大家都说这个小镇是「聊出来的」。": "气场对了。我开始明白为什么大家说这个小镇是「聊出来的」。",
    "好。这个开场比我想象的自然多了。": "好。这个开场比我想的还要自然。",
    "有意思——你说话的方式让我想起群里的某个熟人。": "有意思。你说话的口气让我想起群里的熟人。",
    "这里的气氛不像游戏——更像刚打开一个很久没看的群聊。": "这里的气氛不像游戏，更像刚打开很久没看的群聊。",
    "你总能注意到一些别人会错过的东西。": "你总是能看到别人忽略的细节。",
    "所以……不是世界末日，是群聊换了个界面？": "所以，不是世界末日，只是群聊换了个界面？",
    "了解一个人不需要大道理——只需要完成一件小事。": "了解一个人不需要大道理，只需要完成一件小事。",
    "主线的每一章都让这座小镇更像一个家了。": "每完成一章主线，这座小镇就更像一个家。",

    # --- Common NPC speech patterns ---
    "我说这么多不是为了吓你——是想让你知道。": "说这么多不是吓你，是想让你明白。",
    "先不管那些。你站那么远干嘛，走近点。": "先别管那些，站近点说话。",
    "好，该说的说了。接下来你想聊什么方向？": "该说的说完了。你想聊什么？",
    "正好你来了，我一个人琢磨这件事已经琢磨了好一阵。": "正好你来了，这件事我已经想了好一阵。",
    "行，既然你都把频道调好了，我不说点正经的也说不过去。": "行，你都把频道调好了，我也得说点正经的。",
    "反正来都来了——坐一会儿再走。": "来都来了，坐一会儿再走。",
    "总之就是这么个情况。具体走哪条线，你自己选。": "情况就是这样。具体走哪条路线，你自己选。",
    "别紧张，龙牌馆的任务本质上就是——把乱掉的规则重新排好。": "别紧张，龙牌馆的任务就是把乱掉的规则重新排好。",
    "你排过扑克牌吗？比那个简单。": "像整理扑克牌一样，比那个还简单。",

    # --- Remove excessive "不是...而是..." chains ---
    "不是哭。是想说深夜的湖边不是'一个人'。": "不是哭。是想说深夜的湖边不孤单。",
    "不是抒情。是我真的觉得颜色可以。": "我是真的觉得颜色可以代表一个人。",
    "不是装饰——是DNA。": "不是装饰，是DNA。",
    "不是天文现象——是小镇在给过生日的人升一个月亮。": "不是天文现象，是小镇给过生日的人升的月亮。",
    "不是即时通讯——是慢速通讯。": "不是即时通讯，是慢速通讯。",
    "不是没人来，是他想证明：": "不是没人来，而是他想证明：",
    "不是真的在问'你在吗'——是在说'如果你在的话，这首歌是给你的'。": "不是真的在问'你在吗'，是在说'如果你在，这首歌是给你的'。",

    # --- Simplify flowery descriptions ---
    "龙角灯轻轻闪了一下。不是故障——是牌馆在听。": "龙角灯轻轻闪了一下。牌馆在听。",
    "牌桌安静了一秒。不是因为没人说话——是因为刚才的话太像规则书里的正文。": "牌桌安静了一秒。刚才那句话像规则书里的正文。",
    "调色盘上，那个无名颜色又微微变暖了——黄昏快到了。": "调色盘上，那个无名颜色又变暖了——黄昏快到了。",
    "色板上的三十四种颜色同时亮了一下——像在集体点头。": "色板上的三十四种颜色同时亮了一下。",
    "湖面泛起了一圈很轻的涟漪——像在说'我在放'。": "湖面泛起了一圈很轻的涟漪。",
    "打印机在旁边嗡了一声——像在说'谢谢欣赏'。": "打印机在旁边嗡了一声。",
    "灯光在舞台上画了一个圈。圈中央立着一支麦克风，": "灯光在舞台上圈出了一个位置。圈中央立着麦克风，",
    "栈道第十二块木板轻轻响了一声——像在确认这个数字是对的。": "栈道第十二块木板轻轻响了一声。",
}

def apply_phrases(text):
    """Apply exact phrase replacements."""
    result = text
    for old, new in PHRASES.items():
        if old in result:
            result = result.replace(old, new)
    return result

# ================================================================
# FIRST-PERSON INJECTION
# ================================================================

NO_FP_STARTS = frozenset({
    "所以", "但是", "可是", "不过", "虽然", "然而", "因此",
    "而且", "并且", "因为", "如果", "要是", "只要", "除非",
    "无论", "不管", "即使", "哪怕",
})

CATCHPHRASE_STARTS = ("何意味", "图呢", "我的呢", "笑死我了", "嚯嚯嚯",
                      "唉我草", "还真是", "好。", "羡慕你", "我醒了",
                      "神秘", "想你们", "有没有懂的", "这是什么",
                      "[/太好笑]", "[/敬礼]", "毛鸽", "舒服了",
                      "压抑了", "早上了喵～", "香草泥", "很复杂")

def inject_fp(text, speaker):
    """Add first-person perspective naturally."""
    if "我" in text:
        return text
    if speaker == "narrator" or text.startswith("旁白"):
        return text
    if len(text) < 6:
        return text

    # Check for conjunctions and catchphrases
    for prefix in NO_FP_STARTS:
        if text.startswith(prefix):
            return text
    for prefix in CATCHPHRASE_STARTS:
        if text.startswith(prefix):
            return text

    # Pattern matching for safe injection points
    patterns = [
        (r'^(这|那)(个|种|些|里|边|是|不|就|才|也|么)', "我觉得", 10),
        (r'^(广场|灯光|湖|喷泉|钟声|舞台|画架|打印机|色板|信号塔|公告|菜单|门|栈道|树林|服务器)', "我看", 12),
        (r'^.{2,15}(不是|还是|就是|才是|也是|正是)', "我觉得", 14),
        (r'^(好|行|对|嗯|哦)[。，！\s]', "我觉得", 8),
        (r'^(今天|现在|刚才|昨天|明天|最近)', "我看", 10),
    ]

    for pattern, prefix, min_len in patterns:
        if re.match(pattern, text) and len(text) > min_len:
            return prefix + text

    return text

def should_fp(speaker, text, idx):
    if speaker == "narrator" or text.startswith("旁白"):
        return False
    if "我" in text:
        return False
    if len(text) < 6:
        return False
    # Higher rate for player, lower for NPCs
    rate = 0.40 if speaker == "player" else 0.28
    return random.random() < rate

# ================================================================
# PROCESSING
# ================================================================

def process_text_fields(obj, stats):
    """Walk data structure, rewrite all text fields."""
    if isinstance(obj, list):
        for item in obj:
            process_text_fields(item, stats)
    elif isinstance(obj, dict):
        # Process text lines
        if "text" in obj and "speaker" in obj:
            stats["total"] += 1
            orig = obj["text"]
            speaker = obj.get("speaker", "")

            # Apply phrase rewrites first, then general rules
            t = apply_phrases(orig)
            t = apply_rules(t)

            # Clean up: no double punctuation, no leading period
            t = re.sub(r'。。+', '。', t)
            t = re.sub(r'^。', '', t)

            obj["text"] = t

            # First-person injection
            if should_fp(speaker, obj["text"], stats["total"]):
                fp_text = inject_fp(obj["text"], speaker)
                if fp_text != obj["text"]:
                    obj["text"] = fp_text
                    stats["fp"] += 1

            if obj["text"] != orig:
                stats["changed"] += 1

        # Recurse into nested structures, skip known metadata keys
        text_keys = {"text", "speaker", "id", "label", "icon", "name",
                     "description", "flavor", "story", "conclusion",
                     "hint", "onComplete", "comment"}
        for key, val in obj.items():
            if isinstance(val, (list, dict)) and key not in {
                "rewards", "unlockAreas", "spawnPoints", "expressions",
                "avatarVisualDNA", "avatarMatchChecklist", "dialogueStyle",
                "commonPatterns", "memeSeeds", "profileCard", "stats",
                "privacy", "keyRelations", "keyRelationRoles"
            }:
                process_text_fields(val, stats)

def rewrite_file(fname, label):
    path = os.path.join(DATA_DIR, fname)
    if not os.path.exists(path):
        print(f"  ⚠️  {label}: not found")
        return

    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    stats = {"total": 0, "fp": 0, "changed": 0}
    process_text_fields(data, stats)

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
    print("📝 V4: Comprehensive Plain-Spoken Rewriting")
    print(f"   {len(RULES)} general rules + {len(PHRASES)} phrase rewrites")
    print("=" * 60)

    for fname, label in [("dialogues.json", "Dialogues"),
                          ("items.json", "Items"),
                          ("quests.json", "Quests")]:
        rewrite_file(fname, label)

    print(f"\n✅ All files rewritten. Originals at *.bak")
    print(f"💡 Revert: cp src/data/*.bak src/data/ (strip .bak extension)")
