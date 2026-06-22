#!/usr/bin/env python3
"""Package all game text into a single markdown file for review and editing."""

import json, os, sys
from collections import defaultdict

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE, "src", "data")
OUTPUT = os.path.join(BASE, "游戏全文案.md")

def load_json(name):
    path = os.path.join(DATA_DIR, name)
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def build_md():
    lines = []
    lines.append("# 小康在线 — 游戏全文案")
    lines.append("")
    lines.append("> 本文档包含游戏中所有文字内容，按分类整理。")
    lines.append("> 您可以直接编辑此文件，编辑完成后告诉我重新 commit。")
    lines.append("")
    lines.append("---")
    lines.append("")

    # ============================================================
    # 1. CHARACTERS
    # ============================================================
    lines.append("## 一、角色信息")
    lines.append("")
    chars = load_json("characters.json")
    for c in chars:
        lines.append(f"### {c.get('displayName', c['id'])}")
        lines.append(f"- **ID**: `{c['id']}`")
        lines.append(f"- **称号**: {c.get('title', '—')}")
        lines.append(f"- **群昵称**: {c.get('groupNickname', '—')}")
        lines.append(f"- **QQ昵称**: {c.get('qqNickname', '—')}")
        lines.append(f"- **默认区域**: {c.get('defaultArea', '—')}")
        lines.append(f"- **社交功能**: {c.get('socialFunction', '—')}")
        lines.append(f"- **对话风格**: {', '.join(c.get('dialogueStyle', []))}")
        lines.append(f"- **口头禅/标志语**: {', '.join(c.get('commonPatterns', []))}")
        lines.append(f"- **消息数**: {c.get('stats', {}).get('messageCount', '—')}")
        lines.append(f"- **活跃天数**: {c.get('stats', {}).get('activeDays', '—')}")
        lines.append(f"- **上网习惯**: {c.get('stats', {}).get('timeHabit', '—')}")
        lines.append(f"- **情绪风格**: {c.get('stats', {}).get('emotionStyle', '—')}")
        lines.append(f"- **羁绊任务**: {c.get('bondQuest', '—')}")
        lines.append(f"- **关键关系**: {', '.join(c.get('keyRelations', []))}")
        lines.append("")

    lines.append("---")
    lines.append("")

    # ============================================================
    # 2. ITEMS
    # ============================================================
    lines.append("## 二、道具文案")
    lines.append("")
    items = load_json("items.json")
    for item in items:
        lines.append(f"### {item.get('icon', '')} {item['name']}")
        lines.append(f"- **ID**: `{item['id']}`")
        lines.append(f"- **描述**: {item.get('description', '')}")
        lines.append(f"- **风味文字**: {item.get('flavor', '')}")
        lines.append("")

    lines.append("---")
    lines.append("")

    # ============================================================
    # 3. QUEST STORIES
    # ============================================================
    lines.append("## 三、任务文案")
    lines.append("")

    quests = load_json("quests.json")
    quest_types = defaultdict(list)
    for q in quests:
        quest_types[q.get('type', 'other')].append(q)

    type_names = {
        "main": "主线任务",
        "area": "区域任务",
        "bond": "羁绊任务",
        "easter": "彩蛋任务",
    }

    for qtype, qlist in quest_types.items():
        lines.append(f"### {type_names.get(qtype, qtype)}")
        lines.append("")
        for q in qlist:
            lines.append(f"#### {q['name']}")
            lines.append(f"- **ID**: `{q['id']}`")
            lines.append(f"- **类型**: {q.get('type', '')}")
            lines.append(f"- **起始NPC**: {q.get('startNpc', '')}")
            lines.append(f"- **起始区域**: {q.get('startArea', '')}")
            lines.append(f"- **故事概述**: {q.get('story', '')}")
            lines.append("")
            lines.append("**任务步骤**:")
            for i, step in enumerate(q.get('steps', []), 1):
                lines.append(f"{i}. **[{step.get('type', '')}]** {step.get('hint', '')}")
                if step.get('onComplete'):
                    lines.append(f"   → 完成时: {step['onComplete']}")
            lines.append("")
            if q.get('conclusion'):
                lines.append(f"**任务收尾**: {q['conclusion']}")
            lines.append("")

    lines.append("---")
    lines.append("")

    # ============================================================
    # 4. DIALOGUES
    # ============================================================
    lines.append("## 四、对话文案")
    lines.append("")

    dialogues = load_json("dialogues.json")
    chars = {c['id']: c.get('displayName', c['id']) for c in load_json("characters.json")}
    chars['narrator'] = '旁白'
    chars['player'] = '你（代理人）'

    # Group by speaker
    for scene in dialogues:
        scene_id = scene['id']
        main_speaker = scene.get('speaker', '')
        speaker_name = chars.get(main_speaker, main_speaker)
        area = scene.get('area', '')

        lines.append(f"### [{scene_id}] — {speaker_name} 在 {area}")
        lines.append("")

        for l in scene.get('lines', []):
            spk = chars.get(l['speaker'], l['speaker'])
            lines.append(f"**{spk}**: {l['text']}")
            lines.append("")

        for choice in scene.get('choices', []):
            lines.append(f"*→ 选择分支: {choice.get('label', '')}*")
            lines.append("")
            for l in choice.get('lines', []):
                spk = chars.get(l['speaker'], l['speaker'])
                lines.append(f"**{spk}**: {l['text']}")
                lines.append("")
            for nc in choice.get('nextChoices', []):
                lines.append(f"  *→ 子选项: {nc.get('label', '')}*")
                lines.append("")
                for l in nc.get('lines', []):
                    spk = chars.get(l['speaker'], l['speaker'])
                    lines.append(f"  **{spk}**: {l['text']}")
                    lines.append("")
        lines.append("---")
        lines.append("")

    # ============================================================
    # 5. GAME OUTLINE (abbreviated)
    # ============================================================
    outline_path = os.path.join(DATA_DIR, "game_outline.json")
    if os.path.exists(outline_path):
        lines.append("## 五、游戏大纲")
        lines.append("")
        outline = load_json("game_outline.json")
        if isinstance(outline, dict):
            for key, val in outline.items():
                lines.append(f"- **{key}**: {str(val)[:200]}")
                lines.append("")
        elif isinstance(outline, list):
            for item in outline:
                lines.append(f"- {str(item)[:200]}")
                lines.append("")

    # Write
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print(f"✅ Written {len(lines)} lines to {OUTPUT}")
    # Count approximate word count (Chinese characters)
    text = '\n'.join(lines)
    chinese_chars = sum(1 for c in text if '一' <= c <= '鿿')
    print(f"📊 ~{chinese_chars} Chinese characters")

if __name__ == "__main__":
    build_md()
