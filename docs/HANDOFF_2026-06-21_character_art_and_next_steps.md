# XiaokangOnline 交接记录 2026-06-21

## 当前状态

本轮主要解决了角色美术素材问题。用户明确要求：

- 不再把多个角色拼在一起生成或裁切。
- 每个角色使用单角色、单母图流程。
- 全部使用红框模式，不兼容旧裁切逻辑。
- 角色头像、娘化形象、立绘、表情和 sprite 必须严格对应。
- 小图元要由显眼红框定位，避免凭感觉裁切。

当前角色资产这部分已经完成并通过验证。地图交互和文案优化还没有最终落地，后续需要继续。

## 已完成：角色美术和红框导入

### 单角色重做并导入的角色

上一轮导入失败或质量不稳的 14 个角色已经逐个单独重做、导入、复检：

`role_007, role_015, role_017, role_021, role_022, role_023, role_025, role_026, role_027, role_029, role_030, role_032, role_034, role_038`

其中注意点：

- `role_007` 第一版疑似出现 `V²` 字形，已重做为无文字/无数字版本。
- `role_030` 第一版出现对白气泡/文字感，已重做为无气泡、无标记版本。
- `role_034` 保留霓虹青绿色眼睛，但避开纯 `#00ff00`，防止被透明化吃掉。
- `role_038` 按原头像视觉 DNA 重新设计，但避免直接复刻既有 IP 角色。

### 导入产物

每个角色导出了：

- `assets/imagegen/sheets/{role}_sheet.png`
- `assets/imagegen/portraits/{role}.png`
- `assets/imagegen/avatars/{role}.png`
- `assets/imagegen/expressions/{role}_neutral.png`
- `assets/imagegen/expressions/{role}_happy.png`
- `assets/imagegen/expressions/{role}_tease.png`
- `assets/imagegen/expressions/{role}_serious.png`
- `assets/imagegen/sprites/{role}.png`

单角色预览图在：

- `docs/single_character_imports/{role}_preview.png`

例子：

- `docs/single_character_imports/role_030_preview.png`
- `docs/single_character_imports/role_034_preview.png`
- `docs/single_character_imports/role_038_preview.png`

### 关键报告

这些报告可以作为后续核查证据：

- `docs/single_character_imports/redbox_redo_import_failed_roles_v2.json`
- `docs/single_character_imports/redbox_reexport_all_clear10.json`
- `docs/single_character_imports/redbox_reexport_all_inset12.json`

最后一次全量重导出结果：

- 36 个角色全部导入成功。
- `failed: []`
- 所有角色 sprite 都是 `4x4 / 96x96`。
- 所有角色导入报告无 `borderWarnings`。

### 机器验证

最后一轮验证结果：

```text
npm run build      通过
npm run validate   通过，errors: [], warnings: []
npm test           通过，100/100
```

额外做过边缘残线检测：

```text
edgeGuideIssues 0
```

## 已修改的关键文件

### `scripts/import_single_character_sheet.py`

这是现在的红框导入核心脚本。

主要变化：

- 禁用旧的凭透明/投影裁切思路。
- 支持单角色红框母图导入。
- 通过左侧大红框定位立绘。
- 通过右上 2x2 红框/红线定位 4 个表情。
- 通过右下 5x5 红线恢复 4x4 sprite 单元。
- 绿色背景透明化加强，支持部分生成图出现的非纯绿背景。
- 导出阶段会移除红框/橙色抗锯齿残线。
- 导出小图会进行边缘清理，避免红框残留。
- `inset_guide_box()` 已加大内缩，防止把红框边裁进最终小图。

### `scripts/crop_imagegen_packs.py`

旧批量裁切流程已停用。

脚本现在只提示使用：

```text
scripts/import_single_character_sheet.py
```

也就是后续不要再回到大图批切流程。

### `src/game.js`

之前已经有一些交互相关修复：

- 地图出口有红色圆点和目标区域标签。
- canvas 点击出口/交互点/NPC 有处理逻辑。
- 图鉴只显示已经解锁的角色，未激活角色不会出现在图鉴中。
- sprite 渲染只接受 `4x4` 元数据，避免旧规格误渲染。

注意：本轮最后没有继续修改地图和文案，只做了现状分析。

## 当前未完成问题

用户总目标里还有两块没真正收尾：

1. 地图交互体验
2. 对话文案改造

### 1. 地图交互体验仍需继续

当前 `src/data/maps.json` 中每张地图都有 4 个交互点，但多数还是模板化：

```text
公告 / 道具 / 入口 / 回声
```

坐标也比较像模板摆点，例如大多数区域是：

```text
(4, 3), (11, 15), (18, 3), (25, 15)
```

目前每张地图交互点存在，但体验上还不够“根据具体 CG 和地图确定交互点”。

已观察到的地图数据：

- `town_center`: 小康钟、公告中心、星砂喷泉等主题
- `restaurant`: 餐桌、料理台、饮品柜、蒸汽等主题
- `dragon_card_house`: 牌桌、龙角招牌、牌形地砖等主题
- `livehouse`: 舞台、音箱、海报墙、吧台灯等主题
- `echo_lake`: 湖面、栈道、月光、诗页等主题
- `care_home`: 茶桌、公告墙、存档台、结局门、钟楼等主题
- `atelier`: 调色盘、画架、像素屏幕、图鉴架、魔法打印机等主题
- `northern_wilds`: 草地、树林、小溪、蘑菇、洞窟、信号塔等主题
- `server_room`: 机柜、线路、状态灯、核心门等主题

建议下一步：

- 给每张地图的 4 个交互点改成场景物件名，而不是模板名。
- 在 `maps.json` 的 interaction 上补充类似字段：
  - `label`
  - `kind`
  - `item`
  - `memory`
  - `dialogue`
  - `toast`
- 修改 `triggerInteraction()` 和 `openAreaDialogue()`，让点击不同物件时有明确反馈。
- 点击交互点时应能：
  - 显示具体物件反馈。
  - 获得相应道具或记忆。
  - 推动相关任务。
  - 打开和当前区域/CG 相关的短对话。

### 2. 对话文案仍需重写

当前 `src/data/dialogues.json` 里仍有大量“人设标签自报”式文案。

明确命中的标签包括：

- `高能量发言者`
- `情绪支持型`
- `表情包使用者`
- `图片分享者`
- `话题发起者`
- `理性分析型`
- `我是`

例子：

```text
正常。我的节奏大概是高能量发言者、表情包使用者、图片分享者，你看到发光的jpg先捡起来再说。
在龙牌馆说话要换个频道。这里的空气会把高能量发言者放大一点。
你也上线了？我是V²，现在临时负责V平方调律师这条线。
```

这些正是用户不想要的效果。

建议下一步：

- 写一个脚本重写 `src/data/dialogues.json`。
- 保留 `dialogueStyle` 作为隐藏标签/生成依据，不要在台词中直接说出来。
- intro 台词改成：
  - 角色根据昵称/标题/头像魂印自然说话。
  - 不出现“我是 xxx 人设”。
  - 不直接列举标签。
- react 台词改成：
  - 当前区域触发的二次元梗/聊天反应。
  - 例如“这地方自带弹幕滤镜”“这张图建议先右键保存精神状态”等。
  - 不出现“这里会把某标签放大一点”。

还要同步修改：

- `scripts/generate_game_assets.py`

因为里面还有生成旧文案的逻辑，尤其是：

```python
styles = "、".join(char["dialogueStyle"][:3])
...
这里的空气会把{char['dialogueStyle'][...]}放大一点。
```

如果不改生成脚本，将来重新生成数据会把坏文案带回来。

## 下一次建议起点

新对话可以从这几个任务开始：

1. 先写脚本修 `src/data/dialogues.json` 和 `scripts/generate_game_assets.py`，去掉所有标签自报。
2. 再改 `src/data/maps.json` 的交互点名称/类型/反馈，使其贴合每张地图和任务 CG。
3. 修改 `src/game.js` 的 `triggerInteraction()` / `openAreaDialogue()`，让点击交互点有具体反馈和奖励。
4. 用 Playwright 或现有截图脚本抽查：
   - 点击出口能跳转。
   - 点击交互点会弹出明确对话/反馈。
   - 未解锁图鉴不显示隐藏剧情/角色。
5. 最后跑：

```text
npm run build
npm run validate
npm test
```

## 当前重要约束

后续继续时请保持：

- 不要恢复旧批量裁切流程。
- 不要把多个角色拼成一张图处理。
- 角色素材继续使用单角色红框母图导入。
- 图鉴未激活内容不要提前显示。
- 对话不要直接说“我是某某人设”或直接列出 `dialogueStyle` 标签。
- 地图交互点必须和当前地图/CG 的具体物件、出口和事件对应。

