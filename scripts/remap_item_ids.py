#!/usr/bin/env python3
"""
Remap item IDs to match new names, then update all references across:
- items.json, quests.json, dialogues.json, story_database.json
- game.js (inventory keys, itemForEvent, etc.)
"""

import json, os, re, shutil

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(BASE, "src", "data")
GAME_JS = os.path.join(BASE, "src", "game.js")

# ID remapping: old_id → new_id
ID_MAP = {
    'star_sand': 'highlight_msg',
    'online_echo': 'oo',
    'poem_page': 'chat_log',
    'card_shard': 'yugioh_card',
    'meal_ticket': 'yellow_roast',
    'palette_chip': 'spicy_pic',
    'next_time_coupon': 'next_time',
    'half_sugar_verdict': 'happy_water',
    'rice_button': 'food_pic',
    'meme_steam': 'its_you',
    'next_time_card': 'rank_ticket',
    'verdict_bell': 'mhy_verdict',
    'stage_light_note': 'xox',
    'portrait_patch': 'nijigen',
    'codex_tab': 'oldguard',
    'moon_toggle': 'emo_switch',
    'tea_roster': 'ts_gather',
    'nap_ticket': 'morning_meow',
    'ending_key': 'admin_perm',
    'signal_leaf': 'csn',
    'mushroom_hint': 'monkey',
    'campfire_reply': 'group_fire',
    'cache_broom': 'cache_clean',
    'core_key': 'core_key',
    'reply_tailwind': 'quote_msg',
    'its_your_copy': 'its_your_copy',
}

def replace_in_json(data, mapping):
    """Recursively replace old IDs with new IDs in JSON data."""
    if isinstance(data, str):
        for old, new in mapping.items():
            data = data.replace(f'"{old}"', f'"{new}"')
            data = data.replace(f"'{old}'", f"'{new}'")
            # Also handle bare word mentions in text
            data = data.replace(f'/{old}', f'/{new}')
        return data
    elif isinstance(data, list):
        return [replace_in_json(item, mapping) for item in data]
    elif isinstance(data, dict):
        return {replace_in_json(k, mapping): replace_in_json(v, mapping) for k, v in data.items()}
    return data

def fix_game_js(path, mapping):
    """Update item IDs in game.js."""
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    fixes = 0
    for old, new in mapping.items():
        # Find all occurrences of old ID in the file
        count = content.count(old)
        if count > 0:
            content = content.replace(old, new)
            fixes += count
            print(f"  game.js: '{old}'→'{new}' ({count} occurrences)")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    return fixes

def main():
    print("=" * 60)
    print("🔄 Item ID Remapping")
    print("=" * 60)

    # Backup
    for f in ['items.json', 'quests.json', 'dialogues.json']:
        src = os.path.join(DATA, f)
        bak = src + '.pre_id_remap'
        if not os.path.exists(bak):
            shutil.copy2(src, bak)

    # 1. Fix items.json IDs
    items = json.load(open(os.path.join(DATA, 'items.json')))
    for item in items:
        old_id = item['id']
        if old_id in ID_MAP:
            item['id'] = ID_MAP[old_id]
            print(f"  items.json: {old_id} → {item['id']}")
    json.dump(items, open(os.path.join(DATA, 'items.json'), 'w'), ensure_ascii=False, indent=2)
    print(f"✅ Items: {len(items)} items, IDs remapped")

    # 2. Fix quests.json
    quests = json.load(open(os.path.join(DATA, 'quests.json')))
    quests = replace_in_json(quests, ID_MAP)
    json.dump(quests, open(os.path.join(DATA, 'quests.json'), 'w'), ensure_ascii=False, indent=2)
    print(f"✅ Quests: IDs remapped")

    # 3. Fix dialogues.json
    dialogues = json.load(open(os.path.join(DATA, 'dialogues.json')))
    dialogues = replace_in_json(dialogues, ID_MAP)
    json.dump(dialogues, open(os.path.join(DATA, 'dialogues.json'), 'w'), ensure_ascii=False, indent=2)
    print(f"✅ Dialogues: IDs remapped")

    # 4. Fix story_database.json if exists
    story_path = os.path.join(DATA, 'story_database.json')
    if os.path.exists(story_path):
        story = json.load(open(story_path))
        story = replace_in_json(story, ID_MAP)
        json.dump(story, open(story_path, 'w'), ensure_ascii=False, indent=2)
        print(f"✅ Story Database: IDs remapped")

    # 5. Fix game.js
    js_fixes = fix_game_js(GAME_JS, ID_MAP)
    print(f"✅ game.js: {js_fixes} references updated")

    # 6. Also fix old item NAME references in quests/dialogues
    OLD_NAMES = {
        '在线回声': '哦哦', '月边诗页': '聊天记录', '牌桌碎角': 'yo-gi-oh!',
        '夜宵票根': '黄哥烤五花', '调色碎片': '色图', '稍后兑现券': '下次一定',
        '半糖裁决': '快乐水', '饭点按钮': '美食图片', '梗气蒸汽': '这是你',
        '改日再战卡': '上分券', '裁决小铃': '针对米哈游玩家在本群地位的历史决议',
        '舞台灯便签': 'XOX', '立绘补丁': '二向箔', '图鉴页签': '老资历',
        '月色开关': 'emo开关', '茶局名单': 'TS集合', '补觉票': '早上了喵',
        '终章钥匙': '管理员权限', '信号叶': 'csn', '蘑菇提示': '猴',
        '篝火回帖': '群聊之火', '缓存扫帚': '缓存', '回帖顺风': '引用消息',
    }

    for fname in ['quests.json', 'dialogues.json']:
        path = os.path.join(DATA, fname)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        name_fixes = 0
        for old, new in OLD_NAMES.items():
            # Only replace in narrative text, not in IDs or code
            count = content.count(old)
            if count > 0:
                content = content.replace(old, new)
                name_fixes += count

        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

        if name_fixes:
            print(f"  {fname}: {name_fixes} old name references replaced")

    # 7. Special: fix物理"星砂" references (keep physical substance as 星砂)
    for fname in ['quests.json', 'dialogues.json']:
        path = os.path.join(DATA, fname)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Fix over-replacements where 精华消息 was used for physical substance
        BAD = [
            ('精华消息炒饭', '星砂炒饭'),
            ('精华消息全糖布丁', '星砂全糖布丁'),
            ('精华消息的热量', '星砂的热量'),
            ('精华消息的力量', '星砂的力量'),
            ('精华消息溶液', '星砂溶液'),
            ('精华消息的微光', '星砂的微光'),
            ('一粒精华消息', '一粒星砂'),
        ]
        for bad, good in BAD:
            if bad in content:
                content = content.replace(bad, good)
                print(f"  {fname}: reverted '{bad}' → '{good}'")

        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

    print(f"\n✅ All references updated")

if __name__ == "__main__":
    main()
