#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src/data"


def main() -> None:
    bundle = {}
    for name in [
        "characters",
        "areas",
        "maps",
        "quests",
        "dialogues",
        "items",
        "art_assets",
        "tiles",
        "sprite_meta",
        "task_cgs",
        "game_outline",
        "story_database",
        "dialogue_agent_sessions",
        "language_style_research",
        "cg_unlocks",
        "scene_access",
        "acceptance_cases",
        "imagegen_jobs",
        "cg_imagegen_jobs",
    ]:
        with (DATA / f"{name}.json").open("r", encoding="utf-8") as f:
            bundle[name] = json.load(f)
    payload = "window.XIAOKANG_DATA = " + json.dumps(bundle, ensure_ascii=False, indent=2) + ";\n"
    (DATA / "game-data.js").write_text(payload, encoding="utf-8")
    print(f"Wrote {DATA / 'game-data.js'}")


if __name__ == "__main__":
    main()
