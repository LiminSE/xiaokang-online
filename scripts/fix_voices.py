#!/usr/bin/env python3
"""
Fix character voices in dialogues.json to match real chat records.
- Shorten lines to match real chat message lengths
- Add missing catchphrases
- Fix topic stance inconsistencies
"""

import json, re, os, random
random.seed(42)

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src", "data")

# ================================================================
# CHARACTER VOICE PROFILES (from chat record analysis)
# ================================================================
VOICE = {
    "role_001": {
        "avg_len": 30,  # target average message length
        "catchphrases": ["何意味", "图呢", "无敌了", "有没有懂的", "🐴"],
        "style": "短快接梗、游戏王术语、自嘲、中二构筑、用🐴代替吗/嘛",
        "openings": ["不是", "我跟你说", "你懂什么", "有没有"],
        "emojis": ["🤣", "🐴"],
        "pattern": r"(吗|嘛)(?=[。，！？\s]|$)"  # replace 吗/嘛 with 🐴
    },
    "role_002": {
        "avg_len": 19,
        "catchphrases": ["tmd", "尼玛", "😭", "🥰", "🤩"],
        "style": "短句、直接、脏话点缀、偶像狂热",
        "openings": ["我超", "有没有", "尼玛", "tmd"],
    },
    "role_003": {
        "avg_len": 34,
        "catchphrases": ["有没有懂的", "如何评价", "gkd", "神秘"],
        "style": "评论型长句、本子鉴赏、游戏安利、深夜话题",
    },
    "role_004": {
        "avg_len": 21,
        "catchphrases": ["我醒了", "嚯嚯嚯", "一个人就是"],
        "style": "短快、电竞术语、直播口癖、夜猫子",
    },
    "role_005": {
        "avg_len": 13,
        "catchphrases": ["唉我草", "个人感觉", "猪鼻"],
        "style": "极短、galgame玩家、吐槽、emoji少",
    },
    "role_006": {
        "avg_len": 25,
        "catchphrases": ["还真是", "确实", "又幻想了", "力竭了"],
        "style": "社畜+牌佬双面人、吐槽工作、偶像大师推",
    },
    "role_009": {
        "avg_len": 30,
        "catchphrases": ["宝宝", "我在外面", "OD", "OP", "[/太好笑]"],
        "style": "管人观众、撒娇式抱怨、表情包多",
    },
    "role_012": {
        "avg_len": 20,
        "catchphrases": ["早上了喵", "香草泥", "不要对小偶像", "瑟瑟", "[🔥5]"],
        "style": "早安bot、小偶像保护者、日报风",
    },
}

# ================================================================
# TARGETED LINE FIXES - specific rewrites for problematic lines
# ================================================================
LINE_FIXES = {
    # role_002: Add 尼玛/tmd/🥰 to appropriate lines, shorten
    "topic_xox_debate::role_002::0": "我超琴音🥰🥰🥰 尼玛这画面也太好看了",
    "topic_xox_debate::role_002::1": "我没瑟瑟！！tmd这是艺术欣赏！！",
    # role_012: Fix protective stance phrasing
    "topic_xox_debate::role_012::0": "不要对小偶像瑟瑟。我已经说过很多次了。",
    "topic_xox_debate::role_012::1": "不要。对小偶像。瑟瑟。懂？",
    # role_001: Add 🐴
    "topic_spicy_debate::role_001::0": "zjsn,wcsn。这图是你发的🐴？算了不管了反正你发了就是你。",
    # role_009: Add OP reference
    "topic_eating_debate::role_009::0": "我还在外面宝宝QAQ 别发了我要OD可口可乐了😭 OP都救不了我",
    # role_005: shorten extreme long lines
    "daily_topic_role_005_galgame::role_005::0": "唉我草。甜蜜女友那个动态立绘，猪鼻到我了。但剧情是真的甜。",
    # role_006: shorten
    "daily_topic_role_006_work::role_006::0": "我上班两年半了，高二还没上完。不是真高二，是心态。",
    "daily_topic_role_006_work::role_006::1": "确实。但下班打了三局牌，赢了对面天杯。这才是活着的意义。",
    # role_004: shorten
    "daily_topic_role_004_gaming::role_004::0": "我醒了。今天排位上两段。风暴点一把鸡。队友？一个人就是车队。",
}

# ================================================================
# GENERAL SHORTENING RULES
# ================================================================
def shorten_line(text, speaker, target_avg):
    """Shorten a line to better match real chat patterns."""
    if len(text) <= target_avg + 10:
        return text

    # Break long sentences at —— or 。
    parts = re.split(r'[——。]', text)
    if len(parts) > 1:
        # Keep only the first meaningful part
        for part in parts:
            part = part.strip()
            if len(part) >= 6:
                return part + '。'

    # If still too long, truncate at natural break
    if len(text) > target_avg + 20:
        # Find last comma or space before target_avg + 20
        trunc = text[:target_avg + 20]
        last_break = max(trunc.rfind('，'), trunc.rfind(' '), trunc.rfind('、'))
        if last_break > target_avg // 2:
            return trunc[:last_break] + '。'

    return text

def add_missing_catchphrase(text, speaker, used_phrases):
    """Occasionally inject a missing catchphrase into a line."""
    profile = VOICE.get(speaker, {})
    missing = [p for p in profile.get("catchphrases", []) if p not in used_phrases]
    if not missing or random.random() > 0.3:
        return text

    phrase = random.choice(missing)
    # Insert naturally at start or end
    if random.random() < 0.5 and len(text) > 10:
        return phrase + '——' + text
    else:
        return text.rstrip('。') + '。' + phrase + '。'
    return text

# ================================================================
# MAIN
# ================================================================
def fix_dialogues():
    path = os.path.join(DATA_DIR, "dialogues.json")
    with open(path, 'r', encoding='utf-8') as f:
        dialogues = json.load(f)

    fixes_applied = 0
    shorten_count = 0

    # Collect all catchphrases used by each speaker
    all_used = {spk: set() for spk in VOICE}
    for scene in dialogues:
        for line in scene.get('lines', []):
            spk = line['speaker']
            if spk in VOICE:
                for phrase in VOICE[spk].get('catchphrases', []):
                    if phrase in line['text']:
                        all_used[spk].add(phrase)
        for choice in scene.get('choices', []):
            for line in choice.get('lines', []):
                spk = line['speaker']
                if spk in VOICE:
                    for phrase in VOICE[spk].get('catchphrases', []):
                        if phrase in line['text']:
                            all_used[spk].add(phrase)

    # Apply fixes
    for scene in dialogues:
        sid = scene['id']

        # Process main lines
        for i, line in enumerate(scene.get('lines', [])):
            spk = line['speaker']
            txt = line['text']

            # Check for targeted fix
            fix_key = f"{sid}::{spk}::{i}"
            if fix_key in LINE_FIXES:
                line['text'] = LINE_FIXES[fix_key]
                fixes_applied += 1
                continue

            # Skip narrator and player
            if spk in ('narrator', 'player'):
                continue

            if spk in VOICE:
                profile = VOICE[spk]
                # Shorten overly long lines
                if len(txt) > profile['avg_len'] + 15:
                    new_txt = shorten_line(txt, spk, profile['avg_len'])
                    if new_txt != txt and len(new_txt) >= 6:
                        line['text'] = new_txt
                        shorten_count += 1

                # Apply 🐴 substitution for role_001
                if spk == 'role_001' and 'pattern' in profile:
                    if random.random() < 0.4:  # 40% chance per line
                        line['text'] = re.sub(profile['pattern'], '🐴', line['text'])

        # Process choice lines
        for choice in scene.get('choices', []):
            for i, line in enumerate(choice.get('lines', [])):
                spk = line['speaker']
                txt = line['text']

                fix_key = f"{sid}::choice::{spk}::{i}"
                if fix_key in LINE_FIXES:
                    line['text'] = LINE_FIXES[fix_key]
                    fixes_applied += 1
                    continue

                if spk in ('narrator', 'player'):
                    continue

                if spk in VOICE:
                    profile = VOICE[spk]
                    if len(txt) > profile['avg_len'] + 15:
                        new_txt = shorten_line(txt, spk, profile['avg_len'])
                        if new_txt != txt and len(new_txt) >= 6:
                            line['text'] = new_txt
                            shorten_count += 1

    # Second pass: add missing catchphrases to a few random lines
    for scene in dialogues:
        for line in scene.get('lines', []):
            spk = line['speaker']
            if spk in VOICE and spk in all_used:
                # Check if this speaker is missing catchphrases
                missing = [p for p in VOICE[spk].get('catchphrases', [])
                          if p not in all_used[spk]]
                if missing and random.random() < 0.15:  # 15% chance per eligible line
                    phrase = random.choice(missing)
                    if len(line['text']) > 10 and phrase not in line['text']:
                        if random.random() < 0.5:
                            line['text'] = phrase + '。' + line['text']
                        else:
                            line['text'] = line['text'].rstrip('。') + '。' + phrase + '。'
                        all_used[spk].add(phrase)
                        fixes_applied += 1

    # Save
    backup = path + ".v2pre_fix"
    if not os.path.exists(backup):
        import shutil
        shutil.copy2(path, backup)

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(dialogues, f, ensure_ascii=False, indent=2)

    print(f"✅ Fixed {fixes_applied} targeted lines")
    print(f"✅ Shortened {shorten_count} overly long lines")
    print(f"📦 Backup: dialogues.json.v2pre_fix")
    return dialogues

if __name__ == "__main__":
    fix_dialogues()
