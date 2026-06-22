#!/usr/bin/env python3
"""
Game script rewriting - V2: Careful, grammar-aware transformations.
Targets:
  1. More plain-spoken (平铺直叙) language
  2. ~30% of non-narrator lines get first-person (我) perspective
  3. Preserve all story, character voice, and motivation

Strategy: Apply only safe, high-confidence transformations.
"""

import json, random, re, os

random.seed(42)
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE, "src", "data")

# ================================================================
# SAFE TRANSFORMATIONS - only apply when confident
# ================================================================

def transform_text(text, speaker):
    """Apply measured, safe plain-spoken transformations."""
    t = text

    # --- 1. Simplify "——像在说X。" → "——在说X。" (more direct) ---
    # Only when the metaphor is clearly personification
    t = re.sub(r'——像在说(.+?)。$', r'——在说\1。', t)
    t = re.sub(r'——像在问(.+?)。$', r'——在问\1。', t)
    t = re.sub(r'——像在回答$', r'——在回答', t)
    t = re.sub(r'——像在确认(.+?)。$', r'——确认了\1。', t)
    t = re.sub(r'——像在等(.+?)。$', r'——在等\1。', t)

    # --- 2. "不是X——是Y" → "不是X，是Y" (remove em dash for flow) ---
    # Only when X and Y are short phrases
    t = re.sub(r'——不是(.{1,30}?)——是(.{1,30}?)。$', r'。不是\1，是\2。', t)
    t = re.sub(r'——不是(.{1,30}?)，是(.{1,30}?)。$', r'。不是\1，是\2。', t)

    # --- 3. Remove redundant "像...一样/似的" for direct comparisons ---
    t = re.sub(r'像(.{1,10})刚(.{1,10})一样', r'跟刚\1\2似的', t)

    # --- 4. Shorten overly long dash chains ---
    t = re.sub(r'——(.+?)——(.+?)。$', r'——\1，\2。', t)

    # --- 5. Make descriptive narrations slightly more direct ---
    if speaker == "narrator" and not t.startswith("旁白"):
        pass  # Don't modify non-旁白 narrator lines aggressively

    return t

# ================================================================
# FIRST-PERSON INJECTION - careful, grammar-aware
# ================================================================

# Words that should NOT be preceded by 我觉得
NO_FP_BEFORE = {"所以", "但是", "可是", "不过", "虽然", "然而", "因此",
                "而且", "并且", "因为", "如果", "要是", "只要", "只有",
                "除非", "无论", "不管", "即使", "哪怕"}

def inject_first_person(text, speaker):
    """Carefully add first-person perspective."""
    if "我" in text:
        return text  # Already has first person

    if speaker == "narrator" or text.startswith("旁白"):
        return text  # Never modify narrator lines

    if len(text) < 6:
        return text  # Too short

    # Check if it starts with a conjunction we shouldn't modify
    for conj in NO_FP_BEFORE:
        if text.startswith(conj):
            return text

    # --- Safe first-person additions ---

    # Pattern 1: "这/那 + is/feels like..." → "我觉得这/那..."
    if re.match(r'^(这|那)(个|种|些|里|边|就|才|是|不)', text):
        if len(text) > 10 and "？" not in text[:15]:
            return "我觉得" + text

    # Pattern 2: "好..."/"行..." statements → "我觉得好.../行..."
    if re.match(r'^(好|行|对|嗯)[。，！\s]', text):
        if len(text) > 8 and "？" not in text[:10]:
            return "我觉得" + text

    # Pattern 3: "X不是Y" assertions → "我觉得X不是Y"
    if re.match(r'^.{2,12}(不是|还是|就是|才是|也是|就是)', text):
        if len(text) > 12:
            return "我觉得" + text

    # Pattern 4: Observations about environment → personal
    if re.match(r'^(广场|灯光|湖|喷泉|钟|舞台|画架|打印机|色板|信号塔)', text):
        if len(text) > 12:
            return "我看" + text

    # Pattern 5: "你总能注意到..." → "我看你总能注意到..."
    if text.startswith("你总能注意到"):
        return "我看" + text

    return text

def should_add_fp(speaker, text, line_index):
    """Decide if this line gets first-person injection."""
    if speaker == "narrator" or text.startswith("旁白"):
        return False
    if "我" in text:
        return False
    if len(text) < 6:
        return False

    # Target: ~30% for player, ~25% for NPC
    rate = 0.40 if speaker == "player" else 0.25
    return random.random() < rate

# ================================================================
# PROCESSING
# ================================================================

def process_all_lines(obj, stats, depth=0):
    """Recursively process all lines in dialogues structure."""
    if isinstance(obj, list):
        for item in obj:
            process_all_lines(item, stats, depth)
    elif isinstance(obj, dict):
        if "text" in obj and "speaker" in obj:
            stats["total"] += 1
            orig = obj["text"]
            speaker = obj.get("speaker", "")

            # Apply plain-spoken transformations
            obj["text"] = transform_text(orig, speaker)

            # Add first person if selected
            if should_add_fp(speaker, obj["text"], stats["total"]):
                fp = inject_first_person(obj["text"], speaker)
                if fp != obj["text"]:
                    obj["text"] = fp
                    stats["fp_added"] += 1

            if obj["text"] != orig:
                stats["changed"] += 1

        # Recurse into nested structures
        for key, val in obj.items():
            if key in ("text", "speaker", "id", "label", "icon", "type",
                       "target", "startNpc", "startArea", "unlockAreas",
                       "rewards", "name", "area", "time", "event", "action",
                       "item", "memory", "comment", "count", "messageCount",
                       "activeDays", "timeHabit", "emotionStyle", "title",
                       "defaultArea", "spawnPoints", "activeTrait", "passiveTrait",
                       "bondQuest", "keyRelations", "keyRelationRoles",
                       "easterEgg", "forbiddenNotes", "socialFunction",
                       "avatarVisualDNA", "avatarMatchChecklist",
                       "dialogueStyle", "commonPatterns", "memeSeeds",
                       "profileCard", "stats", "privacy", "expressions"):
                continue  # Skip metadata keys
            if isinstance(val, (list, dict)):
                process_all_lines(val, stats, depth + 1)

def rewrite_file(input_path, name):
    """Rewrite a JSON data file with careful transformations."""
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    stats = {"total": 0, "fp_added": 0, "changed": 0}
    process_all_lines(data, stats)

    if stats["total"] > 0:
        fp_pct = stats["fp_added"] / stats["total"] * 100
        ch_pct = stats["changed"] / stats["total"] * 100
        print(f"  {name}: {stats['total']} lines, "
              f"{stats['fp_added']} FP ({fp_pct:.1f}%), "
              f"{stats['changed']} changed ({ch_pct:.1f}%)")
    else:
        print(f"  {name}: {len(data)} entries (no dialogue lines)")

    return data, stats

def apply_and_backup(path, new_data, name):
    """Backup original and write new version."""
    backup = path + ".bak"
    if not os.path.exists(backup):
        os.rename(path, backup)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(new_data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    print("=" * 60)
    print("📝 V2: Careful Plain-Spoken Rewriting")
    print("=" * 60)

    for fname, label in [("dialogues.json", "Dialogues"),
                          ("items.json", "Items"),
                          ("quests.json", "Quests")]:
        path = os.path.join(DATA_DIR, fname)
        if os.path.exists(path):
            data, stats = rewrite_file(path, label)
            apply_and_backup(path, data, fname)

    print(f"\n✅ Done. Originals backed up as .bak")
    print(f"💡 To revert: cp src/data/*.bak src/data/ (without .bak)")
