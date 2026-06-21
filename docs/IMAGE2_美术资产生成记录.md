# IMAGE2 美术资产生成记录

本记录说明当前工程内的最终美术资产来源。角色最终资产均由聊天窗口 image2/imagegen 生成，并且每组生成前都先读取对应 QQ 源头像作为视觉 DNA 参考。

## 角色资产包

| 文件 | 覆盖角色 | 说明 |
|---|---|---|
| `assets/imagegen/packs/character_pack_01_roles_001-006.png` | role_001-role_006 | 基于 6 个源头像生成的娘化二次元像素角色表 |
| `assets/imagegen/packs/character_pack_02_roles_007-012.png` | role_007-role_012 | 基于 6 个源头像生成的娘化二次元像素角色表 |
| `assets/imagegen/packs/character_pack_03_roles_013-018.png` | role_013-role_018 | 基于 6 个源头像生成的娘化二次元像素角色表 |
| `assets/imagegen/packs/character_pack_04_roles_019-025_no024.png` | role_019-role_023, role_025 | role_024 已退群，未生成 |
| `assets/imagegen/packs/character_pack_05_roles_026-031.png` | role_026-role_031 | 基于 6 个源头像生成的娘化二次元像素角色表 |
| `assets/imagegen/packs/character_pack_06_roles_032-039_no035_no037.png` | role_032-role_034, role_036, role_038-role_039 | role_035、role_037 已退群，未生成 |

## 已切分资产

每名保留角色都已从 image2 母图切分出：

- `assets/imagegen/sheets/{role_id}_sheet.png`
- `assets/imagegen/avatars/{role_id}.png`
- `assets/imagegen/portraits/{role_id}.png`
- `assets/imagegen/sprites/{role_id}.png`
- `assets/imagegen/expressions/{role_id}_{neutral|happy|tease|serious}.png`
- `assets/imagegen/candidates/{role_id}_candidate_01..03.png`

裁切和绿幕抠除只做资产整理，不重新绘制角色，因此最终图像来源仍是 image2。

本轮修复后，角色切分不再使用固定六等分裁切，而是先读取 image2 母图的真实前景，再分别定位角色列、表情区与底部行走帧。`docs/imagegen_crop_report.json` 记录每个角色的实际裁切框；`src/data/sprite_meta.json` 记录每个角色的实际 sprite 行列数；每名保留角色已同步导出 3 张 Q 版候选图，共 108 张。当前发现并处理的非 3 列角色包括 `role_004`、`role_034`，游戏渲染时按各自 metadata 取帧。

## 场景与 UI 资产

| 文件 | 用途 |
|---|---|
| `assets/imagegen/environment/environment_tileset_all_areas.png` | 旧九大区域 tileset 归档，不再参与地图主画面渲染 |
| `assets/imagegen/environment/full_maps/{area_id}_full.png` | 九大区域整图生成地图，当前游戏地图主画面 |
| `assets/imagegen/ui/ui_item_icon_pack.png` | 系统按钮、任务、图鉴、设置、收集物与结局图标 |
| `assets/imagegen/cg/ending_all_online.png` | 全员上线结局 CG |
| `assets/imagegen/cg/story_echo_lake_night.png` | 湖边长对话故事 CG |
| `assets/imagegen/brand/logo_emblem.png` | XiaokangOnline 透明 Logo |
| `assets/imagegen/brand/logo_emblem_256.png` | 页面标题与 HUD 使用的小尺寸 Logo |
| `assets/imagegen/brand/boot_cover_v2.png` | 启动页生成图封面，含卡通「小康online」标题 |
| `assets/imagegen/brand/wordmark_v2.png` | 透明卡通「小康online」字标 |

## 任务特殊 CG

任务特殊 CG 由聊天窗口 imagegen 直接生成区域像素 CG 母图，再按语义切分为 9 张 1024x768 PNG。切分只用于整理资源，不重新绘制。

| 文件 | 对应任务语义 |
|---|---|
| `assets/imagegen/cg/tasks/cg_task_online_abnormal.png` | 小镇中心、上线异常 |
| `assets/imagegen/cg/tasks/cg_task_dragon_card_gate.png` | 龙牌馆、门禁与牌桌事件 |
| `assets/imagegen/cg/tasks/cg_task_livehouse_stage.png` | Livehouse、舞台灯火 |
| `assets/imagegen/cg/tasks/cg_task_echo_lake_poem.png` | 湖边回声栈道、诗页与月相 |
| `assets/imagegen/cg/tasks/cg_task_restaurant_dinner.png` | 小康餐厅、晚饭召集 |
| `assets/imagegen/cg/tasks/cg_task_care_home_clock.png` | 小康养老院、钟声与茶桌 |
| `assets/imagegen/cg/tasks/cg_task_atelier_palette.png` | 像素炼画工坊、色板偏移 |
| `assets/imagegen/cg/tasks/cg_task_northern_signal.png` | 北部自然区、信号塔重启 |
| `assets/imagegen/cg/tasks/cg_task_server_core.png` | 地下服务器房、在线核心 |

## 场景语义拆分

当前游戏地图主画面已改为 9 张整图生成地图，不再叠加小图元或 tile。旧图元仅作为归档素材保留，避免无关物件、图集边缘和重复瓦片噪点进入画面：

- 9 张整图地图：`assets/imagegen/environment/full_maps/{area_id}_full.png`
- 9 张区域背景：`assets/imagegen/environment/areas/{area_id}.png`
- 3 张高清重生背景：`assets/imagegen/environment/areas_v2/{restaurant|echo_lake|atelier}_v2.png`
- 10 张基础地砖：`assets/imagegen/environment/tiles/{tile_id}.png`
- 8 组区域装饰：`assets/imagegen/environment/decor/{decor_id}.png`

地图数据中的 `areaBackground` 已全部指向 `full_maps`。前端渲染时只绘制整图地图、NPC、交互点和 UI；设置中的网格只保留为调试线，不再绘制任何 tile 图像。

## 全场景截图验收

`scripts/capture_full_scene_screenshots.js` 会自动进入游戏、切换 9 个区域、打开任务日志、任务 CG、角色图鉴和设置面板，并输出：

- `docs/full_scene_screenshot_report.json`
- `docs/full_scene_screenshot_report.md`
- `docs/screenshots/*.png`

最新验收覆盖 16 张截图、9 个区域、9 张任务 CG，缺失图片为 0。

## 退群角色删除

以下角色已从角色表、任务表、对话表、地图 NPC、图鉴、imagegen 任务与打包数据中删除：

- `role_024`
- `role_035`
- `role_037`
