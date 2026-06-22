# 羁绊 CG 生成 Agent 指南

目标：按 `src/data/bond_cg_prompt_analysis_v3.json` 重做指定羁绊 CG。每张图必须来自实际关系剧情，搞笑优先，借参考图的构图语法，但不直接复刻任何具体商业作品角色、logo、标题、演员脸、截图文字或可读字幕。

硬性要求：
- 只处理主线程指定的 CG id 和输出 PNG，不改 JSON、CSS、脚本或其他文件。
- 每张图生成前先查看 `compositionReferences[0].localPath` 构图参考，再查看两个角色的 `portrait`，必要时查看 `tease`、`serious` 或 `happy` 表情。构图参考只借镜头角度、人物阻挡关系、负空间、剪影节奏和搞笑时机；角色必须严格遵照立绘的发型、服装轮廓、主色、配件和手持物，不能串角色。
- 群友都是真实存在的人。画面只能表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者；禁止 CP、恋爱、暧昧、告白、约会、情侣感、爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报。
- 画风只锁定“卡通像素 / 像素动漫 / ACG pixel event CG”。色调、质感、配色、光影和氛围都可以按剧情与梗图自由发挥。
- 不需要 Q 版站姿或平视视角；可以使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。
- 画面必须表现 `episodeName`、`relationshipAction`、`memeComposition`、`posterInspiration`、`netaPlan` 和 `compositionReferences[0].promptCue`，并围绕 `coreProp` 组织关系动作。
- 不要聊天框、菜单、UI 截图、水印、真实照片、可读长文字。需要提示时用不可读漫画符号、图标、效果线。
- 头像或贴纸元素不要圆球背景、不要圆形头像底、不要 UI 头像框；只保留角色/头像本体加清晰描边。
- 最终每张图必须保存为 `960x720 PNG` 到指定路径。

推荐流程：
1. 读 `/Users/lmse/.codex/skills/.system/imagegen/SKILL.md`，使用内置 `image_gen`。
2. 读 `src/data/bond_cg_prompt_analysis_v3.json` 和 `src/data/bond_cg_reference_board_v3.json`，只取分配给你的 id。
3. 用 `view_image` 查看构图参考图和两个角色立绘，确认角色顺序与输出 id 一致。
4. 逐张生成，避免多个输出串文件：每次 `image_gen` 后复制最新生成图到目标路径，并 resize 到 `960x720`。
5. 完成后用 `file` 确认尺寸，最终回复列出每张图的角色参考、剧情梗点、构图参考和避开的恋爱/CP 信号。
