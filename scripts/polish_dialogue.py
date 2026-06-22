#!/usr/bin/env python3
"""
Polish dialogue: reduce em-dashes, add conversational particles (啦嘛唔),
and emoji for immersion. Preserves story, character voice, and meaning.
"""

import json, re, os, random
random.seed(42)

DATA = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src", "data")

# ================================================================
# DASH REDUCTION RULES
# ================================================================
DASH_RULES = [
    # Pattern: "X——Y" → "X，Y" (narrative break → comma)
    (r'(.{2,30})——(.{2,30})([。，！？])', r'\1，\2\3'),
    # Pattern: "X——" at end → "X。" or "X…"
    (r'(.{2,30})——$', r'\1…'),
    # Pattern: "——不是" → "。不是"
    (r'——不是', r'。不是'),
    # Pattern: "——像是" → "，像是"
    (r'——像是', r'，像是'),
    # Pattern: "——在" → "，在"
    (r'——在(.{1,20})([。，])', r'，在\1\2'),
    # Multiple dashes
    (r'——(.+?)——', r'，\1，'),
]

# ================================================================
# CONVERSATIONAL PARTICLES AND EMOJI INJECTION
# ================================================================
# Per-character conversational style
CHAR_STYLE = {
    'role_001': {'particles': ['嘛', '呗', '啦'], 'emojis': ['🐴', '🤣', '😭'], 'rate': 0.35},
    'role_002': {'particles': ['啦', '啊', '嘛'], 'emojis': ['🥰', '😭', '🤩'], 'rate': 0.40},
    'role_003': {'particles': ['啦', '嘛', '吧'], 'emojis': ['🤔', '😅'], 'rate': 0.25},
    'role_004': {'particles': ['啦', '啊', '噜'], 'emojis': ['😎', '👀'], 'rate': 0.30},
    'role_005': {'particles': ['啦', '唉', '啊'], 'emojis': ['👍🏻', '😭'], 'rate': 0.40},
    'role_006': {'particles': ['嘛', '啦', '呗'], 'emojis': ['🤣', '😂'], 'rate': 0.30},
    'role_009': {'particles': ['啦', '嘛', '呀'], 'emojis': ['😭', 'QAQ', '👀'], 'rate': 0.45},
    'role_012': {'particles': ['喵', '啦', '嘛'], 'emojis': ['🔥', '🥰'], 'rate': 0.40},
}

def reduce_dashes(text):
    """Apply dash reduction rules sequentially."""
    result = text
    for pattern, replacement in DASH_RULES:
        prev = None
        while prev != result:
            prev = result
            result = re.sub(pattern, replacement, result)
    # Clean up: no double punctuation
    result = re.sub(r'。。+', '。', result)
    result = re.sub(r'，，+', '，', result)
    return result

def add_conversation(text, speaker):
    """Add conversational particles and emoji where natural."""
    if speaker not in CHAR_STYLE:
        return text
    style = CHAR_STYLE[speaker]

    # Already has particles?
    has_particle = any(p in text for p in ['嘛', '啦', '呗', '啊', '呀', '喵', '噜', '唉'])

    # Add ending particle ~30% of the time for eligible lines
    if not has_particle and random.random() < style['rate'] and len(text) > 8:
        particle = random.choice(style['particles'])
        # Add at natural break points
        if text.endswith('。'):
            text = text[:-1] + particle + '。'
        elif text.endswith('！'):
            text = text[:-1] + particle + '！'
        elif text.endswith('？'):
            text = text[:-1] + particle + '？'

    # Add emoji ~20% for characters that use them heavily
    if random.random() < style['rate'] * 0.6 and len(text) > 10:
        if not re.search(r'[🐴🤣😭🥰🤩😎👀👍🏻😂🔥QAQ🤔😅]', text):
            emoji = random.choice(style['emojis'])
            # Add emoji at end if sentence ends naturally
            if re.search(r'[。！？]$', text):
                text = text[:-1] + emoji + text[-1]

    return text

def polish_dialogues():
    path = os.path.join(DATA, 'dialogues.json')
    with open(path, 'r', encoding='utf-8') as f:
        dialogues = json.load(f)

    dash_fixes = 0
    conv_fixes = 0

    for scene in dialogues:
        for line in scene.get('lines', []):
            if line['speaker'] in ('narrator',):
                # Narrator: reduce dashes only
                orig = line['text']
                line['text'] = reduce_dashes(orig)
                if line['text'] != orig:
                    dash_fixes += 1
            elif line['speaker'] != 'player':
                # NPC: reduce dashes + add conversation
                orig = line['text']
                line['text'] = reduce_dashes(orig)
                line['text'] = add_conversation(line['text'], line['speaker'])
                if line['text'] != orig:
                    conv_fixes += 1

        for choice in scene.get('choices', []):
            for line in choice.get('lines', []):
                if line['speaker'] == 'narrator':
                    orig = line['text']
                    line['text'] = reduce_dashes(orig)
                    if line['text'] != orig:
                        dash_fixes += 1
                elif line['speaker'] != 'player':
                    orig = line['text']
                    line['text'] = reduce_dashes(orig)
                    line['text'] = add_conversation(line['text'], line['speaker'])
                    if line['text'] != orig:
                        conv_fixes += 1

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(dialogues, f, ensure_ascii=False, indent=2)

    print(f"✅ Dash reductions: {dash_fixes}")
    print(f"✅ Conversation additions: {conv_fixes}")

if __name__ == "__main__":
    polish_dialogues()
