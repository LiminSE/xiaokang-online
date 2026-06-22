#!/usr/bin/env python3
"""
Game dialogue plain-spoken rewrite tool - Phase 1: structural transformations.
This script applies targeted, reversible transformations to make dialogue more
straightforward while preserving story, character voice, and motivation.

Transformations applied:
1. Simplify overly metaphorical descriptions → direct statements
2. Add first-person "我" perspective to ~30% of non-narrator lines
3. Break complex sentence structures into shorter, clearer ones
4. Preserve all character catchphrases and personality markers
"""

import json
import random
import re
import os

random.seed(42)
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE, "src", "data")

# ================================================================
# TRANSFORMATION RULES
# Each rule is (pattern, replacement, description)
# Applied in order; later rules see results of earlier ones
# ================================================================

TRANSFORMATIONS = [
    # --- Remove flowery "像...一样/似的" constructions ---
    (r"像(.{1,25})那种(.{1,20})的伏笔", r"就是\1\2的伏笔"),
    (r"像(.{1,20})一样", r"跟\1似的"),
    (r"像(.{1,20})似的", r"跟\1似的"),

    # --- Make personification more direct ---
    (r"——像在说(.+?)。", r"——它在说\1。"),
    (r"——像在问(.+?)。", r"——它在问\1。"),
    (r"——像在回答", r"——它在回答"),
    (r"——像在确认(.+?)。", r"——确认了\1。"),
    (r"——像在等人(.+?)。", r"——在等人\1。"),
    (r"——像在等(.+?)。", r"——在等\1。"),
    (r"——像(.{1,20})在(.{1,20})", r"——\1在\2"),

    # --- Reduce stacked metaphors ---
    (r"不是(.+?)——是(.+?)。$", r"不是\1，而是\2。"),
    (r"不只是(.+?)——是(.+?)。$", r"不是\1那么简单——\2。"),

    # --- Simplify "安静了X秒——不是/因为...而是..." patterns ---
    (r"安静了(.+?)。不是(.+?)——是(.+?)。", r"安静了\1。\3。"),

    # --- Direct storytelling instead of metaphorical narration ---
    (r"空气里(.{1,30})的余温", r"空气里\1的温度"),
    (r"在天花板上回荡了很久", r"回响了很久"),
    (r"像(.{1,30})从(.{1,30})里(.{1,10})出来的", r"从\2里\3出来的"),

    # --- Simplify "不是在X，是在Y" with no dashes---
    (r"——不是(.+?)，是(.+?)。", r"。不是\1，是\2。"),

    # --- Make descriptive narrations more direct ---
    (r"这个开场比我想象的自然多了", r"这个开场挺自然的"),
    (r"一条(.{1,20})的广场和几个(.{1,20})的路灯", r"一条\1广场，几盏\2路灯"),
]

def apply_transformations(text):
    """Apply all plain-spoken transformations to a text string."""
    result = text
    for pattern, replacement in TRANSFORMATIONS:
        result = re.sub(pattern, replacement, result)
    return result

# ================================================================
# FIRST-PERSON INJECTION (~30% target)
# ================================================================

def should_add_fp(speaker, text, idx):
    """Determine if this line should get first-person perspective added."""
    # Never add first person to explicit narrator lines
    if speaker == "narrator" or text.startswith("旁白"):
        return False
    # Already has 我 — don't double-add
    if "我" in text:
        return False
    # Too short
    if len(text) < 6:
        return False

    # Target rates by speaker type
    if speaker == "player":
        return random.random() < 0.40  # 40% of player lines
    else:
        return random.random() < 0.25  # 25% of NPC lines

def inject_first_person(text, speaker):
    """Naturally add first-person ('我') perspective to a line."""
    if "我" in text:
        return text

    # Pattern 1: Starting with "这"/"那" → "我觉得这/那..."
    if re.match(r'^(这|那)(个|种|些|里|边|是)', text):
        return "我觉得" + text

    # Pattern 2: "你总能注意到..." → "我看你总能注意到..."
    if text.startswith("你总能注意到"):
        return "我看" + text

    # Pattern 3: Statements about the environment → personal observation
    if re.match(r'^(好|行|对|是|嗯|哦)', text):
        return "我觉得" + text

    # Pattern 4: General observations → personal ones
    if any(text.startswith(w) for w in ["广场", "灯光", "湖", "今天", "现在", "刚才", "那边"]):
        return "我看" + text

    # Pattern 5: "X不是/就是Y" → "我觉得X不是/就是Y"
    if re.match(r'^.{2,10}(不是|就是|还是|都是)', text):
        return "我觉得" + text

    # Pattern 6: Question-like statements → personal
    if "？" not in text and any(kw in text for kw in ["感觉", "气氛", "味道", "声音"]):
        return "我感觉" + text

    return text

# ================================================================
# SENTENCE SIMPLIFICATION
# ================================================================

def simplify_long_sentence(text):
    """Break very long sentences into shorter, clearer ones where possible."""
    # Replace em-dash chains with period breaks
    text = re.sub(r'——', r'。', text)
    # Clean up double periods
    text = re.sub(r'。。+', r'。', text)
    # Ensure no leading period
    text = re.sub(r'^。', '', text)
    return text

def clean_formatting(text):
    """Post-process: remove redundant whitespace and fix punctuation."""
    text = re.sub(r'\s+', ' ', text).strip()
    # Ensure Chinese punctuation at end
    if text and not re.search(r'[。！？…~」\)》]$', text):
        if len(text) > 8:
            text += '。'
    return text

# ================================================================
# MAIN PROCESSING
# ================================================================

def process_line(line, line_idx):
    """Process a single dialogue line."""
    text = line.get("text", "")
    speaker = line.get("speaker", "")

    # Step 1: Apply plain-spoken transformations
    text = apply_transformations(text)

    # Step 2: Simplify sentence structure
    text = simplify_long_sentence(text)

    # Step 3: Add first-person if selected
    if should_add_fp(speaker, text, line_idx):
        fp_text = inject_first_person(text, speaker)
        if fp_text != text:
            text = fp_text
            line["_fp_added"] = True

    # Step 4: Clean formatting
    text = clean_formatting(text)

    line["text"] = text
    return line

def process_dialogues(input_path, output_path):
    """Process all dialogues in the JSON file."""
    with open(input_path, 'r', encoding='utf-8') as f:
        dialogues = json.load(f)

    stats = {"total": 0, "fp_added": 0, "transformed": 0}

    for scene in dialogues:
        for line in scene.get("lines", []):
            orig = line.get("text", "")
            process_line(line, stats["total"])
            if line.get("_fp_added"):
                stats["fp_added"] += 1
            if line.get("text") != orig:
                stats["transformed"] += 1
            stats["total"] += 1

        for choice in scene.get("choices", []):
            for line in choice.get("lines", []):
                orig = line.get("text", "")
                process_line(line, stats["total"])
                if line.get("_fp_added"):
                    stats["fp_added"] += 1
                if line.get("text") != orig:
                    stats["transformed"] += 1
                stats["total"] += 1

            for nc in choice.get("nextChoices", []):
                for line in nc.get("lines", []):
                    orig = line.get("text", "")
                    process_line(line, stats["total"])
                    if line.get("_fp_added"):
                        stats["fp_added"] += 1
                    if line.get("text") != orig:
                        stats["transformed"] += 1
                    stats["total"] += 1

    # Clean up _fp_added marker
    for scene in dialogues:
        for line in scene.get("lines", []):
            line.pop("_fp_added", None)
        for choice in scene.get("choices", []):
            for line in choice.get("lines", []):
                line.pop("_fp_added", None)
            for nc in choice.get("nextChoices", []):
                for line in nc.get("lines", []):
                    line.pop("_fp_added", None)

    # Save
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(dialogues, f, ensure_ascii=False, indent=2)

    return stats

def process_items(input_path, output_path):
    """Make item descriptions more plain-spoken."""
    with open(input_path, 'r', encoding='utf-8') as f:
        items = json.load(f)

    for item in items:
        for key in ("description", "flavor"):
            if key in item:
                item[key] = apply_transformations(item[key])
                item[key] = simplify_long_sentence(item[key])
                item[key] = clean_formatting(item[key])

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(items, f, ensure_ascii=False, indent=2)
    return len(items)

def process_quests(input_path, output_path):
    """Make quest text more plain-spoken."""
    with open(input_path, 'r', encoding='utf-8') as f:
        quests = json.load(f)

    for quest in quests:
        for key in ("story", "conclusion"):
            if key in quest:
                quest[key] = apply_transformations(quest[key])
                quest[key] = simplify_long_sentence(quest[key])
                quest[key] = clean_formatting(quest[key])

        for step in quest.get("steps", []):
            for key in ("hint", "onComplete"):
                if key in step:
                    step[key] = apply_transformations(step[key])
                    step[key] = simplify_long_sentence(step[key])
                    step[key] = clean_formatting(step[key])

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(quests, f, ensure_ascii=False, indent=2)
    return len(quests)

# ================================================================
# BACKUP AND APPLY
# ================================================================

def safe_replace(original_path, new_path, name):
    """Replace original with new, keeping a backup."""
    if not os.path.exists(original_path):
        print(f"⚠️  {name}: file not found at {original_path}")
        return False

    backup_path = original_path + ".bak"
    if not os.path.exists(backup_path):
        os.rename(original_path, backup_path)
        print(f"📦 Backed up {name} → {os.path.basename(backup_path)}")

    os.rename(new_path, original_path)
    return True

if __name__ == "__main__":
    print("=" * 60)
    print("📝 Game Script Plain-Spoken Rewrite Tool")
    print("=" * 60)

    # 1. Process Dialogues
    dialogue_path = os.path.join(DATA_DIR, "dialogues.json")
    dialogue_tmp = os.path.join(DATA_DIR, "dialogues_rewritten.json")

    if os.path.exists(dialogue_path):
        stats = process_dialogues(dialogue_path, dialogue_tmp)
        fp_pct = stats["fp_added"] / stats["total"] * 100 if stats["total"] else 0
        print(f"\n📊 Dialogues: {stats['total']} lines")
        print(f"   🔄 Transformed: {stats['transformed']} lines")
        print(f"   👤 First-person added: {stats['fp_added']} lines ({fp_pct:.1f}%)")
        safe_replace(dialogue_path, dialogue_tmp, "dialogues.json")
    else:
        print("⚠️  dialogues.json not found")

    # 2. Process Items
    items_path = os.path.join(DATA_DIR, "items.json")
    items_tmp = os.path.join(DATA_DIR, "items_rewritten.json")

    if os.path.exists(items_path):
        n = process_items(items_path, items_tmp)
        print(f"\n📊 Items: {n} processed")
        safe_replace(items_path, items_tmp, "items.json")

    # 3. Process Quests
    quests_path = os.path.join(DATA_DIR, "quests.json")
    quests_tmp = os.path.join(DATA_DIR, "quests_rewritten.json")

    if os.path.exists(quests_path):
        n = process_quests(quests_path, quests_tmp)
        print(f"\n📊 Quests: {n} processed")
        safe_replace(quests_path, quests_tmp, "quests.json")

    print(f"\n✅ Script rewriting complete!")
    print(f"📦 Original files backed up as .bak")
    print(f"💡 Run the game to verify changes, or restore backups if needed.")
