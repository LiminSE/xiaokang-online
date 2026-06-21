#!/usr/bin/env python3
from __future__ import annotations

import sys


def main() -> int:
    print(
        "旧批量裁切流程已停用。角色素材现在只允许使用红框单角色导入：\n"
        "  python3 scripts/import_single_character_sheet.py <role_id> <red_box_sheet.png>\n"
        "要求母图包含纯 #ff0000 红色定位框：1 个立绘框、4 个表情框、16 个 4x4 sprite 框。",
        file=sys.stderr,
    )
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
