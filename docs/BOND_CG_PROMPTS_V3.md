# 小康Online 羁绊 CG Prompt V3

本文件由 `scripts/rewrite_bond_cg_prompts_v2.py` 生成。
每张图先分析真实关系剧情来源，再绑定本地构图参考、角色立绘参考和无恋爱暗示安全约束，最后形成 imagegen prompt。

## 总原则

- 以 `story_database.pairStories` 的实际剧情台词为准，旧 prompt 或旧区域只作参考。
- 如果旧区域和剧情文本冲突，采用剧情文本中实际出现的区域。
- 羁绊图必须表现关系动作：递话、接梗、拆台、误会、共同观测或互相验收。
- 群友是真实存在的人，画面只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者，不做 CP/恋爱/暧昧/约会/情侣感。
- 可以借番剧封面、电影海报、互联网梗图和 meme 截图的构图语法；不要求 Q 版站姿、平视镜头或保守动作。
- 参考图只借镜头角度、人物阻挡关系、负空间、剪影节奏和搞笑时机，不引用具体商业动画角色、logo、海报标题或可读文字。

## cg_pair_role_003_role_001 NNZ × 弧形反叛超量🐉：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_003_role_001.png`
- 剧情来源：`pair_role_003_role_001` / 同步蹲点事件 / 固定搭档型
- 实际场景：龙牌馆（旧区域是否冲突：否）
- 核心物件：无效门禁
- 关系动作：一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：community_pizza_fire, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_003.png` + `assets/imagegen/portraits/role_001.png`
- Meme/番剧构图：进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
- 封面/海报/梗图灵感：可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。
- 构图分析：把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。
- ACG/neta：二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_003_role_001
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: NNZ × 弧形反叛超量🐉：先别急，这段算两个人都看见了。NNZ和弧形反叛超量🐉是群聊中高频互动搭档之一。两人在562个共同活跃日中频繁互动，通过672次显式回复和825次@建立了双向均衡的互动模式。他们的关系属于'固定搭档型'，共同出现在3702个话题窗口中。
Episode type: 同步蹲点事件；关系类型：固定搭档型。
Story beats to visualize: 旁白：弧形反叛超量🐉和NNZ在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哎你也在——我还以为今天就我一个人在龙牌馆晃。 / 我也是刚到的。听到你在这边就过来了。 / 那正好，省得我发私信。过来帮我看个东西。 / 又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: 弧形反叛超量🐉：“哎你也在——我还以为今天就我一个人在龙牌馆晃。”；NNZ：“我也是刚到的。听到你在这边就过来了。”；弧形反叛超量🐉：“那正好，省得我发私信。过来帮我看个东西。”；NNZ：“又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。”；弧形反叛超量🐉：“图呢”；NNZ：“神秘”
Choice energy: 拱火：NNZ负责把话题推高，弧形反叛超量🐉负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：无效门禁。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/community_pizza_fire.gif` (Community pizza fire reaction composition, source Know Your Meme). Use it only as a composition storyboard: use the doorway-arrival chaos skeleton: one character enters/catches the other in a too-obvious stakeout, with the core prop already causing a tiny incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original actors, room, fire, pizza box, show logo, or live-action look.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. NNZ portrait assets/imagegen/portraits/role_003.png, expressions {'neutral': 'assets/imagegen/expressions/role_003_neutral.png', 'happy': 'assets/imagegen/expressions/role_003_happy.png', 'tease': 'assets/imagegen/expressions/role_003_tease.png', 'serious': 'assets/imagegen/expressions/role_003_serious.png'}; 弧形反叛超量🐉 portrait assets/imagegen/portraits/role_001.png, expressions {'neutral': 'assets/imagegen/expressions/role_001_neutral.png', 'happy': 'assets/imagegen/expressions/role_001_happy.png', 'tease': 'assets/imagegen/expressions/role_001_tease.png', 'serious': 'assets/imagegen/expressions/role_001_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: NNZ（星砂资料馆长）与弧形反叛超量🐉（龙牌超量判官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。NNZ（星砂资料馆长）：主色 #f0f0f0 / #78a8a8，符号 圆形构图、餐厅小勺，梗种子 图包、图片、截图、标题党、色值；弧形反叛超量🐉（龙牌超量判官）：主色 #904800 / #303000，符号 圆形构图、月光丝带，梗种子 图包、图片、截图、标题党、色值。
Relationship acting: 一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。 围绕“无效门禁”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
Cover/poster/meme inspiration: 可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_001_role_006 弧形反叛超量🐉 × 力竭了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_001_role_006.png`
- 剧情来源：`pair_role_001_role_006` / 名字回声事件 / 固定搭档型
- 实际场景：龙牌馆（旧区域是否冲突：否）
- 核心物件：翻车记录板
- 关系动作：两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：is_this_a_pigeon, sherlock_jr_projection
- 立绘参考：`assets/imagegen/portraits/role_001.png` + `assets/imagegen/portraits/role_006.png`
- Meme/番剧构图：番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
- 封面/海报/梗图灵感：可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。
- 构图分析：用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。
- ACG/neta：角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_001_role_006
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 弧形反叛超量🐉 × 力竭了：先别急，这段算两个人都看见了。弧形反叛超量🐉和力竭了是群聊中高频互动搭档之一。两人在567个共同活跃日中频繁互动，通过328次显式回复和478次@建立了双向均衡的互动模式。他们的关系属于'固定搭档型'，共同出现在2471个话题窗口中。
Episode type: 名字回声事件；关系类型：固定搭档型。
Story beats to visualize: 旁白：弧形反叛超量🐉和力竭了在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 你刚才是不是叫我了？我好像听到有回声在喊我的名字。 / 没有——至少不是我叫的。可能是龙牌馆自己。有些地方会记住经常来的人的名字。 / 如果龙牌馆会记名字——那它现在应该能背出我们所有人的ID了。 / 它肯定能。我就是来确认它有没有拼错的。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: 弧形反叛超量🐉：“你刚才是不是叫我了？我好像听到有回声在喊我的名字。”；力竭了：“没有——至少不是我叫的。可能是龙牌馆自己。有些地方会记住经常来的人的名字。”；弧形反叛超量🐉：“如果龙牌馆会记名字——那它现在应该能背出我们所有人的ID了。”；力竭了：“它肯定能。我就是来确认它有没有拼错的。”；弧形反叛超量🐉：“图呢”；力竭了：“不赖”
Choice energy: 拱火：弧形反叛超量🐉负责把话题推高，力竭了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：翻车记录板。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/is_this_a_pigeon.jpg` (Is This a Pigeon? pointing mislabel composition, source Know Your Meme). Use it only as a composition storyboard: use the confident misidentification skeleton: one character points at a glowing record/name echo, the other checks the core prop with deadpan disbelief. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original anime character, butterfly, caption layout, labels, or readable text.. Backup reference(s): sherlock_jr_projection .reference_cache/bond_cg_v3/sherlock_jr_projection.jpg (Detective/film-within-film framing: a big framed view, a smaller observer figure, and a clue that invites shared inspection.).
Character reference images: before generating, inspect and follow these exact designs. 弧形反叛超量🐉 portrait assets/imagegen/portraits/role_001.png, expressions {'neutral': 'assets/imagegen/expressions/role_001_neutral.png', 'happy': 'assets/imagegen/expressions/role_001_happy.png', 'tease': 'assets/imagegen/expressions/role_001_tease.png', 'serious': 'assets/imagegen/expressions/role_001_serious.png'}; 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 弧形反叛超量🐉（龙牌超量判官）与力竭了（疲劳判定官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。弧形反叛超量🐉（龙牌超量判官）：主色 #904800 / #303000，符号 圆形构图、月光丝带，梗种子 图包、图片、截图、标题党、色值；力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ。
Relationship acting: 两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。 围绕“翻车记录板”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
Cover/poster/meme inspiration: 可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_004_role_001 赛博鳏夫 × 弧形反叛超量🐉：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_004_role_001.png`
- 剧情来源：`pair_role_004_role_001` / NPC行动路线与任务导航误判 / 固定搭档型
- 实际场景：龙牌馆（旧区域是否冲突：是）
- 核心物件：无效门禁
- 关系动作：一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：two_buttons, general_train_poster
- 立绘参考：`assets/imagegen/portraits/role_004.png` + `assets/imagegen/portraits/role_001.png`
- Meme/番剧构图：双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
- 封面/海报/梗图灵感：可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。
- 构图分析：画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。
- ACG/neta：NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_004_role_001
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 赛博鳏夫 × 弧形反叛超量🐉：先别急，这段算两个人都看见了。赛博鳏夫和弧形反叛超量🐉是群聊中高频互动搭档之一。两人在575个共同活跃日中频繁互动，通过298次显式回复和468次@建立了双向均衡的互动模式。他们的关系属于'固定搭档型'，共同出现在2684个话题窗口中。
Episode type: NPC行动路线与任务导航误判；关系类型：固定搭档型。
Story beats to visualize: 旁白：弧形反叛超量🐉和赛博鳏夫在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 我就知道会在这里碰到你。你每次上线都在龙牌馆——你的行动模式比NPC还好猜。 / 好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。 / 换地方是因为我在找人。有些线索只会出现在特定区域。 / 找什么人——你说的是任务目标还是你自己标错的？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: 弧形反叛超量🐉：“我就知道会在这里碰到你。你每次上线都在龙牌馆——你的行动模式比NPC还好猜。”；赛博鳏夫：“好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。”；弧形反叛超量🐉：“换地方是因为我在找人。有些线索只会出现在特定区域。”；赛博鳏夫：“找什么人——你说的是任务目标还是你自己标错的？”；弧形反叛超量🐉：“图呢”；赛博鳏夫：“嚯嚯嚯”
Choice energy: 拱火：赛博鳏夫负责把话题推高，弧形反叛超量🐉负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：无效门禁。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/two_buttons.jpg` (Daily Struggle / Two Buttons decision composition, source Know Your Meme). Use it only as a composition storyboard: use the two-choice route skeleton: two unreadable quest paths or markers collide, and both characters realize the navigation logic is nonsense. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original man, table, button labels, red buttons, or readable text.. Backup reference(s): general_train_poster .reference_cache/bond_cg_v3/general_train_poster.jpg (Diagonal chase/action poster: vehicle or prop rushes through frame while characters react in comic panic.).
Character reference images: before generating, inspect and follow these exact designs. 赛博鳏夫 portrait assets/imagegen/portraits/role_004.png, expressions {'neutral': 'assets/imagegen/expressions/role_004_neutral.png', 'happy': 'assets/imagegen/expressions/role_004_happy.png', 'tease': 'assets/imagegen/expressions/role_004_tease.png', 'serious': 'assets/imagegen/expressions/role_004_serious.png'}; 弧形反叛超量🐉 portrait assets/imagegen/portraits/role_001.png, expressions {'neutral': 'assets/imagegen/expressions/role_001_neutral.png', 'happy': 'assets/imagegen/expressions/role_001_happy.png', 'tease': 'assets/imagegen/expressions/role_001_tease.png', 'serious': 'assets/imagegen/expressions/role_001_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 赛博鳏夫（赛博夜航人）与弧形反叛超量🐉（龙牌超量判官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。赛博鳏夫（赛博夜航人）：主色 #d8d8d8 / #f0f0f0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、Hxr、出处；弧形反叛超量🐉（龙牌超量判官）：主色 #904800 / #303000，符号 圆形构图、月光丝带，梗种子 图包、图片、截图、标题党、色值。
Relationship acting: 一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。 围绕“无效门禁”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
Cover/poster/meme inspiration: 可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_002_role_006 Hxr × 力竭了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_002_role_006.png`
- 剧情来源：`pair_role_002_role_006` / 自制异常与 bug 验收 / 双向亲近型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：月相开关
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_002.png` + `assets/imagegen/portraits/role_006.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_002_role_006
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Hxr × 力竭了：先别急，这段算两个人都看见了。Hxr和力竭了是群聊中高频互动搭档之一。两人在557个共同活跃日中频繁互动，通过606次显式回复和882次@建立了双向均衡的互动模式。他们的关系属于'双向亲近型'，共同出现在2548个话题窗口中。
Episode type: 自制异常与 bug 验收；关系类型：双向亲近型。
Story beats to visualize: 旁白：Hxr和力竭了在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。湖边回声栈道这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: Hxr：“嘿，过来。湖边回声栈道这边有个东西你肯定会感兴趣。”；力竭了：“什么东西——又是你以为只有你一个人发现的那种？”；Hxr：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；力竭了：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；Hxr：“羡慕你”；力竭了：“不赖”
Choice energy: 拱火：Hxr负责把话题推高，力竭了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：月相开关。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. Hxr portrait assets/imagegen/portraits/role_002.png, expressions {'neutral': 'assets/imagegen/expressions/role_002_neutral.png', 'happy': 'assets/imagegen/expressions/role_002_happy.png', 'tease': 'assets/imagegen/expressions/role_002_tease.png', 'serious': 'assets/imagegen/expressions/role_002_serious.png'}; 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Hxr（零点连招手）与力竭了（疲劳判定官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Hxr（零点连招手）：主色 #304860 / #304848，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、妈妈；力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“月相开关”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_004_role_002 赛博鳏夫 × Hxr：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_004_role_002.png`
- 剧情来源：`pair_role_004_role_002` / NPC行动路线与任务导航误判 / 固定搭档型
- 实际场景：湖边回声栈道（旧区域是否冲突：否）
- 核心物件：月相开关
- 关系动作：一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：two_buttons, general_train_poster
- 立绘参考：`assets/imagegen/portraits/role_004.png` + `assets/imagegen/portraits/role_002.png`
- Meme/番剧构图：双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
- 封面/海报/梗图灵感：可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。
- 构图分析：画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。
- ACG/neta：NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_004_role_002
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 赛博鳏夫 × Hxr：先别急，这段算两个人都看见了。赛博鳏夫和Hxr是群聊中高频互动搭档之一。两人在565个共同活跃日中频繁互动，通过456次显式回复和955次@建立了双向均衡的互动模式。他们的关系属于'固定搭档型'，共同出现在2881个话题窗口中。
Episode type: NPC行动路线与任务导航误判；关系类型：固定搭档型。
Story beats to visualize: 旁白：Hxr和赛博鳏夫在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 我就知道会在这里碰到你。你每次上线都在湖边回声栈道——你的行动模式比NPC还好猜。 / 好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。 / 换地方是因为我在找人。有些线索只会出现在特定区域。 / 找什么人——你说的是任务目标还是你自己标错的？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: Hxr：“我就知道会在这里碰到你。你每次上线都在湖边回声栈道——你的行动模式比NPC还好猜。”；赛博鳏夫：“好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。”；Hxr：“换地方是因为我在找人。有些线索只会出现在特定区域。”；赛博鳏夫：“找什么人——你说的是任务目标还是你自己标错的？”；Hxr：“羡慕你”；赛博鳏夫：“嚯嚯嚯”
Choice energy: 拱火：赛博鳏夫负责把话题推高，Hxr负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：月相开关。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/two_buttons.jpg` (Daily Struggle / Two Buttons decision composition, source Know Your Meme). Use it only as a composition storyboard: use the two-choice route skeleton: two unreadable quest paths or markers collide, and both characters realize the navigation logic is nonsense. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original man, table, button labels, red buttons, or readable text.. Backup reference(s): general_train_poster .reference_cache/bond_cg_v3/general_train_poster.jpg (Diagonal chase/action poster: vehicle or prop rushes through frame while characters react in comic panic.).
Character reference images: before generating, inspect and follow these exact designs. 赛博鳏夫 portrait assets/imagegen/portraits/role_004.png, expressions {'neutral': 'assets/imagegen/expressions/role_004_neutral.png', 'happy': 'assets/imagegen/expressions/role_004_happy.png', 'tease': 'assets/imagegen/expressions/role_004_tease.png', 'serious': 'assets/imagegen/expressions/role_004_serious.png'}; Hxr portrait assets/imagegen/portraits/role_002.png, expressions {'neutral': 'assets/imagegen/expressions/role_002_neutral.png', 'happy': 'assets/imagegen/expressions/role_002_happy.png', 'tease': 'assets/imagegen/expressions/role_002_tease.png', 'serious': 'assets/imagegen/expressions/role_002_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 赛博鳏夫（赛博夜航人）与Hxr（零点连招手）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。赛博鳏夫（赛博夜航人）：主色 #d8d8d8 / #f0f0f0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、Hxr、出处；Hxr（零点连招手）：主色 #304860 / #304848，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、妈妈。
Relationship acting: 一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。 围绕“月相开关”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
Cover/poster/meme inspiration: 可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_002_role_009 Hxr × 多点关心：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_002_role_009.png`
- 剧情来源：`pair_role_002_role_009` / 自制异常与 bug 验收 / 固定搭档型
- 实际场景：湖边回声栈道（旧区域是否冲突：否）
- 核心物件：月相开关
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_002.png` + `assets/imagegen/portraits/role_009.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_002_role_009
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Hxr × 多点关心：先别急，这段算两个人都看见了。Hxr和多点关心是群聊中高频互动搭档之一。两人在559个共同活跃日中频繁互动，通过584次显式回复和1019次@建立了双向均衡的互动模式。他们的关系属于'固定搭档型'，共同出现在2394个话题窗口中。
Episode type: 自制异常与 bug 验收；关系类型：固定搭档型。
Story beats to visualize: 旁白：Hxr和多点关心在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。湖边回声栈道这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: Hxr：“嘿，过来。湖边回声栈道这边有个东西你肯定会感兴趣。”；多点关心：“什么东西——又是你以为只有你一个人发现的那种？”；Hxr：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；多点关心：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；Hxr：“羡慕你”；多点关心：“[[呵呵]]”
Choice energy: 拱火：Hxr负责把话题推高，多点关心负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：月相开关。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. Hxr portrait assets/imagegen/portraits/role_002.png, expressions {'neutral': 'assets/imagegen/expressions/role_002_neutral.png', 'happy': 'assets/imagegen/expressions/role_002_happy.png', 'tease': 'assets/imagegen/expressions/role_002_tease.png', 'serious': 'assets/imagegen/expressions/role_002_serious.png'}; 多点关心 portrait assets/imagegen/portraits/role_009.png, expressions {'neutral': 'assets/imagegen/expressions/role_009_neutral.png', 'happy': 'assets/imagegen/expressions/role_009_happy.png', 'tease': 'assets/imagegen/expressions/role_009_tease.png', 'serious': 'assets/imagegen/expressions/role_009_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Hxr（零点连招手）与多点关心（关心信标使）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Hxr（零点连招手）：主色 #304860 / #304848，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、妈妈；多点关心（关心信标使）：主色 #d8d8d8 / #d8c0d8，符号 星砂发饰、舞台票根，梗种子 图包、图片、截图、回复、Hxr。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“月相开关”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_003_role_004 NNZ × 赛博鳏夫：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_003_role_004.png`
- 剧情来源：`pair_role_003_role_004` / 第三个到与错过事件 / 固定搭档型
- 实际场景：头像工坊（旧区域是否冲突：是）
- 核心物件：图鉴抽屉
- 关系动作：一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：safety_last_clock, community_pizza_fire
- 立绘参考：`assets/imagegen/portraits/role_003.png` + `assets/imagegen/portraits/role_004.png`
- Meme/番剧构图：番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
- 封面/海报/梗图灵感：可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。
- 构图分析：核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。
- ACG/neta：错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_003_role_004
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: NNZ × 赛博鳏夫：先别急，这段算两个人都看见了。NNZ和赛博鳏夫是群聊中高频互动搭档之一。两人在571个共同活跃日中频繁互动，通过266次显式回复和360次@建立了双向均衡的互动模式。他们的关系属于'固定搭档型'，共同出现在2909个话题窗口中。
Episode type: 第三个到与错过事件；关系类型：固定搭档型。
Story beats to visualize: 旁白：NNZ和赛博鳏夫在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哈，果然在。每次头像工坊有什么事，你都是第一个到的。 / 这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。 / 走了？那他们看到了什么？ / 看到了你不在，就走了。所以你现在来了，刚好。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: NNZ：“哈，果然在。每次头像工坊有什么事，你都是第一个到的。”；赛博鳏夫：“这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。”；NNZ：“走了？那他们看到了什么？”；赛博鳏夫：“看到了你不在，就走了。所以你现在来了，刚好。”；NNZ：“神秘”；赛博鳏夫：“嚯嚯嚯”
Choice energy: 拱火：NNZ负责把话题推高，赛博鳏夫负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：图鉴抽屉。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/safety_last_clock.jpg` (Safety Last! clock-hanging frame, source Wikimedia Commons). Use it only as a composition storyboard: use the giant deadline-object skeleton: one character clings to or rushes around a huge scene prop while the other points out they are already third to arrive. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Harold Lloyd, the city facade, exact clock face, or live-action monochrome look.. Backup reference(s): community_pizza_fire .reference_cache/bond_cg_v3/community_pizza_fire.gif (Doorway entry into a scene that has already gone off the rails; foreground newcomer, chaotic background, instant reaction comedy.).
Character reference images: before generating, inspect and follow these exact designs. NNZ portrait assets/imagegen/portraits/role_003.png, expressions {'neutral': 'assets/imagegen/expressions/role_003_neutral.png', 'happy': 'assets/imagegen/expressions/role_003_happy.png', 'tease': 'assets/imagegen/expressions/role_003_tease.png', 'serious': 'assets/imagegen/expressions/role_003_serious.png'}; 赛博鳏夫 portrait assets/imagegen/portraits/role_004.png, expressions {'neutral': 'assets/imagegen/expressions/role_004_neutral.png', 'happy': 'assets/imagegen/expressions/role_004_happy.png', 'tease': 'assets/imagegen/expressions/role_004_tease.png', 'serious': 'assets/imagegen/expressions/role_004_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: NNZ（星砂资料馆长）与赛博鳏夫（赛博夜航人）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。NNZ（星砂资料馆长）：主色 #f0f0f0 / #78a8a8，符号 圆形构图、餐厅小勺，梗种子 图包、图片、截图、标题党、色值；赛博鳏夫（赛博夜航人）：主色 #d8d8d8 / #f0f0f0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、Hxr、出处。
Relationship acting: 一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。 围绕“图鉴抽屉”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
Cover/poster/meme inspiration: 可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_003_role_007 NNZ × V²：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_003_role_007.png`
- 剧情来源：`pair_role_003_role_007` / 观测点与三行诗 / 固定搭档型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：同步色板
- 关系动作：一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：sherlock_jr_projection, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_003.png` + `assets/imagegen/portraits/role_007.png`
- Meme/番剧构图：电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
- 封面/海报/梗图灵感：可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。
- 构图分析：让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。
- ACG/neta：日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_003_role_007
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: NNZ × V²：先别急，这段算两个人都看见了。NNZ和V²是群聊中高频互动搭档之一。两人在558个共同活跃日中频繁互动，通过434次显式回复和508次@建立了双向均衡的互动模式。他们的关系属于'固定搭档型'，共同出现在3464个话题窗口中。
Episode type: 观测点与三行诗；关系类型：固定搭档型。
Story beats to visualize: 旁白：NNZ和V²在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 喂，过来坐。头像工坊这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。 / 你今天不跑任务了？居然有时间坐着看灯。 / 任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。 / 三行——像三行诗。你是不是又在准备写什么东西？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: NNZ：“喂，过来坐。头像工坊这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。”；V²：“你今天不跑任务了？居然有时间坐着看灯。”；NNZ：“任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。”；V²：“三行——像三行诗。你是不是又在准备写什么东西？”；NNZ：“神秘”；V²：“何意味”
Choice energy: 拱火：NNZ负责把话题推高，V²负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：同步色板。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/sherlock_jr_projection.jpg` (Sherlock Jr. poster projection/detective composition, source Wikimedia Commons). Use it only as a composition storyboard: use the projection-screen observation skeleton: two characters study light/reflection/core prop like a tiny cinema clue, offset rather than posed as a couple. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Buster Keaton, poster typography, magnifying-glass branding, or exact costume.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. NNZ portrait assets/imagegen/portraits/role_003.png, expressions {'neutral': 'assets/imagegen/expressions/role_003_neutral.png', 'happy': 'assets/imagegen/expressions/role_003_happy.png', 'tease': 'assets/imagegen/expressions/role_003_tease.png', 'serious': 'assets/imagegen/expressions/role_003_serious.png'}; V² portrait assets/imagegen/portraits/role_007.png, expressions {'neutral': 'assets/imagegen/expressions/role_007_neutral.png', 'happy': 'assets/imagegen/expressions/role_007_happy.png', 'tease': 'assets/imagegen/expressions/role_007_tease.png', 'serious': 'assets/imagegen/expressions/role_007_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: NNZ（星砂资料馆长）与V²（V平方调律师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。NNZ（星砂资料馆长）：主色 #f0f0f0 / #78a8a8，符号 圆形构图、餐厅小勺，梗种子 图包、图片、截图、标题党、色值；V²（V平方调律师）：主色 #606078 / #a8a8c0，符号 明亮眼神、像素画笔，梗种子 图包、图片、截图、标题党、色值。
Relationship acting: 一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。 围绕“同步色板”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
Cover/poster/meme inspiration: 可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_016_role_005 我早已麻痹 × 青山照：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_016_role_005.png`
- 剧情来源：`pair_role_016_role_005` / 淡季、路灯与吐槽停顿 / 动态拱火拆台型
- 实际场景：小镇中心（旧区域是否冲突：是）
- 核心物件：路灯复读串
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_016.png` + `assets/imagegen/portraits/role_005.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_016_role_005
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 我早已麻痹 × 青山照：先别急，这段算两个人都看见了。我早已麻痹和青山照不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 淡季、路灯与吐槽停顿；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：青山照和我早已麻痹在小镇中心碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天小镇中心特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小镇中心在记录这次相遇。
Dialogue basis: 青山照：“今天小镇中心特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；我早已麻痹：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；青山照：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；我早已麻痹：“我和路灯还不够？路灯又不会吐槽你。”；青山照：“羡慕你”；我早已麻痹：“？？？”
Choice energy: 拱火：我早已麻痹负责把话题推高，青山照负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小镇中心。视觉元素：暖色石砖、星砂喷泉、小康钟、路灯、入口门牌和弹幕告示。核心物件：路灯复读串。可带入区域 motif：喷泉弹幕、小康钟、公告牌、星砂摊位。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 我早已麻痹 portrait assets/imagegen/portraits/role_016.png, expressions {'neutral': 'assets/imagegen/expressions/role_016_neutral.png', 'happy': 'assets/imagegen/expressions/role_016_happy.png', 'tease': 'assets/imagegen/expressions/role_016_tease.png', 'serious': 'assets/imagegen/expressions/role_016_serious.png'}; 青山照 portrait assets/imagegen/portraits/role_005.png, expressions {'neutral': 'assets/imagegen/expressions/role_005_neutral.png', 'happy': 'assets/imagegen/expressions/role_005_happy.png', 'tease': 'assets/imagegen/expressions/role_005_tease.png', 'serious': 'assets/imagegen/expressions/role_005_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 我早已麻痹（回声收束者）与青山照（青山回声调停者）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。我早已麻痹（回声收束者）：主色 #d8d8d8 / #c0c0c0，符号 圆形构图、月光丝带，梗种子 图包、图片、毛鸽、哥哥、健康；青山照（青山回声调停者）：主色 #f0d8d8 / #d8a8a8，符号 圆形构图、牌纹徽章，梗种子 Hxr、回复、多点、图包、关心。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“路灯复读串”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_005_role_009 青山照 × 多点关心：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_005_role_009.png`
- 剧情来源：`pair_role_005_role_009` / 自制异常与 bug 验收 / 动态拱火拆台型
- 实际场景：小镇中心（旧区域是否冲突：否）
- 核心物件：喷泉弹幕井
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_005.png` + `assets/imagegen/portraits/role_009.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_005_role_009
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 青山照 × 多点关心：先别急，这段算两个人都看见了。青山照和多点关心不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 自制异常与 bug 验收；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：青山照和多点关心在小镇中心碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。小镇中心这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小镇中心在记录这次相遇。
Dialogue basis: 青山照：“嘿，过来。小镇中心这边有个东西你肯定会感兴趣。”；多点关心：“什么东西——又是你以为只有你一个人发现的那种？”；青山照：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；多点关心：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；青山照：“羡慕你”；多点关心：“[[呵呵]]”
Choice energy: 拱火：青山照负责把话题推高，多点关心负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小镇中心。视觉元素：暖色石砖、星砂喷泉、小康钟、路灯、入口门牌和弹幕告示。核心物件：喷泉弹幕井。可带入区域 motif：喷泉弹幕、小康钟、公告牌、星砂摊位。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. 青山照 portrait assets/imagegen/portraits/role_005.png, expressions {'neutral': 'assets/imagegen/expressions/role_005_neutral.png', 'happy': 'assets/imagegen/expressions/role_005_happy.png', 'tease': 'assets/imagegen/expressions/role_005_tease.png', 'serious': 'assets/imagegen/expressions/role_005_serious.png'}; 多点关心 portrait assets/imagegen/portraits/role_009.png, expressions {'neutral': 'assets/imagegen/expressions/role_009_neutral.png', 'happy': 'assets/imagegen/expressions/role_009_happy.png', 'tease': 'assets/imagegen/expressions/role_009_tease.png', 'serious': 'assets/imagegen/expressions/role_009_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 青山照（青山回声调停者）与多点关心（关心信标使）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。青山照（青山回声调停者）：主色 #f0d8d8 / #d8a8a8，符号 圆形构图、牌纹徽章，梗种子 Hxr、回复、多点、图包、关心；多点关心（关心信标使）：主色 #d8d8d8 / #d8c0d8，符号 星砂发饰、舞台票根，梗种子 图包、图片、截图、回复、Hxr。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“喷泉弹幕井”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_005_role_002 青山照 × Hxr：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_005_role_002.png`
- 剧情来源：`pair_role_005_role_002` / 观测点与三行诗 / 动态拱火拆台型
- 实际场景：小镇中心（旧区域是否冲突：是）
- 核心物件：小康钟
- 关系动作：一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：sherlock_jr_projection, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_005.png` + `assets/imagegen/portraits/role_002.png`
- Meme/番剧构图：电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
- 封面/海报/梗图灵感：可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。
- 构图分析：让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。
- ACG/neta：日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_005_role_002
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 青山照 × Hxr：先别急，这段算两个人都看见了。青山照和Hxr不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 观测点与三行诗；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：青山照和Hxr在小镇中心碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 喂，过来坐。小镇中心这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。 / 你今天不跑任务了？居然有时间坐着看灯。 / 任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。 / 三行——像三行诗。你是不是又在准备写什么东西？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小镇中心在记录这次相遇。
Dialogue basis: 青山照：“喂，过来坐。小镇中心这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。”；Hxr：“你今天不跑任务了？居然有时间坐着看灯。”；青山照：“任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。”；Hxr：“三行——像三行诗。你是不是又在准备写什么东西？”；青山照：“羡慕你”；Hxr：“羡慕你”
Choice energy: 拱火：青山照负责把话题推高，Hxr负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小镇中心。视觉元素：暖色石砖、星砂喷泉、小康钟、路灯、入口门牌和弹幕告示。核心物件：小康钟。可带入区域 motif：喷泉弹幕、小康钟、公告牌、星砂摊位。
Reference frame: first inspect `.reference_cache/bond_cg_v3/sherlock_jr_projection.jpg` (Sherlock Jr. poster projection/detective composition, source Wikimedia Commons). Use it only as a composition storyboard: use the projection-screen observation skeleton: two characters study light/reflection/core prop like a tiny cinema clue, offset rather than posed as a couple. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Buster Keaton, poster typography, magnifying-glass branding, or exact costume.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 青山照 portrait assets/imagegen/portraits/role_005.png, expressions {'neutral': 'assets/imagegen/expressions/role_005_neutral.png', 'happy': 'assets/imagegen/expressions/role_005_happy.png', 'tease': 'assets/imagegen/expressions/role_005_tease.png', 'serious': 'assets/imagegen/expressions/role_005_serious.png'}; Hxr portrait assets/imagegen/portraits/role_002.png, expressions {'neutral': 'assets/imagegen/expressions/role_002_neutral.png', 'happy': 'assets/imagegen/expressions/role_002_happy.png', 'tease': 'assets/imagegen/expressions/role_002_tease.png', 'serious': 'assets/imagegen/expressions/role_002_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 青山照（青山回声调停者）与Hxr（零点连招手）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。青山照（青山回声调停者）：主色 #f0d8d8 / #d8a8a8，符号 圆形构图、牌纹徽章，梗种子 Hxr、回复、多点、图包、关心；Hxr（零点连招手）：主色 #304860 / #304848，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、妈妈。
Relationship acting: 一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。 围绕“小康钟”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
Cover/poster/meme inspiration: 可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_012_role_006 早上了喵～ × 力竭了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_012_role_006.png`
- 剧情来源：`pair_role_012_role_006` / 自制异常与 bug 验收 / 固定搭档型
- 实际场景：龙牌馆（旧区域是否冲突：是）
- 核心物件：额外牌堆
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_012.png` + `assets/imagegen/portraits/role_006.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_012_role_006
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 早上了喵～ × 力竭了：先别急，这段算两个人都看见了。早上了喵～和力竭了是群聊中高频互动搭档之一。两人在565个共同活跃日中频繁互动，通过287次显式回复和395次@建立了双向均衡的互动模式。他们的关系属于'固定搭档型'，共同出现在1263个话题窗口中。
Episode type: 自制异常与 bug 验收；关系类型：固定搭档型。
Story beats to visualize: 旁白：力竭了和早上了喵～在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。龙牌馆这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: 力竭了：“嘿，过来。龙牌馆这边有个东西你肯定会感兴趣。”；早上了喵～：“什么东西——又是你以为只有你一个人发现的那种？”；力竭了：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；早上了喵～：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；力竭了：“不赖”；早上了喵～：“晚安”
Choice energy: 拱火：早上了喵～负责把话题推高，力竭了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：额外牌堆。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. 早上了喵～ portrait assets/imagegen/portraits/role_012.png, expressions {'neutral': 'assets/imagegen/expressions/role_012_neutral.png', 'happy': 'assets/imagegen/expressions/role_012_happy.png', 'tease': 'assets/imagegen/expressions/role_012_tease.png', 'serious': 'assets/imagegen/expressions/role_012_serious.png'}; 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 早上了喵～（晨报铃使）与力竭了（疲劳判定官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。早上了喵～（晨报铃使）：主色 #603018 / #483018，符号 圆形构图、像素画笔，梗种子 超量、反叛、图包、弧形、图片；力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“额外牌堆”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_007_role_008 V² × 沉机：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_007_role_008.png`
- 剧情来源：`pair_role_007_role_008` / 淡季、路灯与吐槽停顿 / 固定搭档型
- 实际场景：小镇中心（旧区域是否冲突：是）
- 核心物件：路灯复读串
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_007.png` + `assets/imagegen/portraits/role_008.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_007_role_008
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: V² × 沉机：先别急，这段算两个人都看见了。V²和沉机是群聊中高频互动搭档之一。两人在532个共同活跃日中频繁互动，通过248次显式回复和288次@建立了双向均衡的互动模式。他们的关系属于'固定搭档型'，共同出现在2163个话题窗口中。
Episode type: 淡季、路灯与吐槽停顿；关系类型：固定搭档型。
Story beats to visualize: 旁白：V²和沉机在小镇中心碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天小镇中心特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小镇中心在记录这次相遇。
Dialogue basis: V²：“今天小镇中心特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；沉机：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；V²：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；沉机：“我和路灯还不够？路灯又不会吐槽你。”；V²：“何意味”；沉机：“有没有懂的”
Choice energy: 拱火：V²负责把话题推高，沉机负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小镇中心。视觉元素：暖色石砖、星砂喷泉、小康钟、路灯、入口门牌和弹幕告示。核心物件：路灯复读串。可带入区域 motif：喷泉弹幕、小康钟、公告牌、星砂摊位。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. V² portrait assets/imagegen/portraits/role_007.png, expressions {'neutral': 'assets/imagegen/expressions/role_007_neutral.png', 'happy': 'assets/imagegen/expressions/role_007_happy.png', 'tease': 'assets/imagegen/expressions/role_007_tease.png', 'serious': 'assets/imagegen/expressions/role_007_serious.png'}; 沉机 portrait assets/imagegen/portraits/role_008.png, expressions {'neutral': 'assets/imagegen/expressions/role_008_neutral.png', 'happy': 'assets/imagegen/expressions/role_008_happy.png', 'tease': 'assets/imagegen/expressions/role_008_tease.png', 'serious': 'assets/imagegen/expressions/role_008_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: V²（V平方调律师）与沉机（回声转译师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。V²（V平方调律师）：主色 #606078 / #a8a8c0，符号 明亮眼神、像素画笔，梗种子 图包、图片、截图、标题党、色值；沉机（回声转译师）：主色 #d8a8a8 / #c090a8，符号 明亮眼神、餐厅小勺，梗种子 图片、图包、截图、标题党、色值。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“路灯复读串”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_007_role_002 V² × Hxr：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_007_role_002.png`
- 剧情来源：`pair_role_007_role_002` / NPC行动路线与任务导航误判 / 动态拱火拆台型
- 实际场景：小镇中心（旧区域是否冲突：否）
- 核心物件：下次一定摊
- 关系动作：一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：two_buttons, general_train_poster
- 立绘参考：`assets/imagegen/portraits/role_007.png` + `assets/imagegen/portraits/role_002.png`
- Meme/番剧构图：双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
- 封面/海报/梗图灵感：可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。
- 构图分析：画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。
- ACG/neta：NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_007_role_002
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: V² × Hxr：先别急，这段算两个人都看见了。V²和Hxr不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: NPC行动路线与任务导航误判；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：V²和Hxr在小镇中心碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 我就知道会在这里碰到你。你每次上线都在小镇中心——你的行动模式比NPC还好猜。 / 好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。 / 换地方是因为我在找人。有些线索只会出现在特定区域。 / 找什么人——你说的是任务目标还是你自己标错的？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小镇中心在记录这次相遇。
Dialogue basis: V²：“我就知道会在这里碰到你。你每次上线都在小镇中心——你的行动模式比NPC还好猜。”；Hxr：“好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。”；V²：“换地方是因为我在找人。有些线索只会出现在特定区域。”；Hxr：“找什么人——你说的是任务目标还是你自己标错的？”；V²：“何意味”；Hxr：“羡慕你”
Choice energy: 拱火：V²负责把话题推高，Hxr负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小镇中心。视觉元素：暖色石砖、星砂喷泉、小康钟、路灯、入口门牌和弹幕告示。核心物件：下次一定摊。可带入区域 motif：喷泉弹幕、小康钟、公告牌、星砂摊位。
Reference frame: first inspect `.reference_cache/bond_cg_v3/two_buttons.jpg` (Daily Struggle / Two Buttons decision composition, source Know Your Meme). Use it only as a composition storyboard: use the two-choice route skeleton: two unreadable quest paths or markers collide, and both characters realize the navigation logic is nonsense. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original man, table, button labels, red buttons, or readable text.. Backup reference(s): general_train_poster .reference_cache/bond_cg_v3/general_train_poster.jpg (Diagonal chase/action poster: vehicle or prop rushes through frame while characters react in comic panic.).
Character reference images: before generating, inspect and follow these exact designs. V² portrait assets/imagegen/portraits/role_007.png, expressions {'neutral': 'assets/imagegen/expressions/role_007_neutral.png', 'happy': 'assets/imagegen/expressions/role_007_happy.png', 'tease': 'assets/imagegen/expressions/role_007_tease.png', 'serious': 'assets/imagegen/expressions/role_007_serious.png'}; Hxr portrait assets/imagegen/portraits/role_002.png, expressions {'neutral': 'assets/imagegen/expressions/role_002_neutral.png', 'happy': 'assets/imagegen/expressions/role_002_happy.png', 'tease': 'assets/imagegen/expressions/role_002_tease.png', 'serious': 'assets/imagegen/expressions/role_002_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: V²（V平方调律师）与Hxr（零点连招手）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。V²（V平方调律师）：主色 #606078 / #a8a8c0，符号 明亮眼神、像素画笔，梗种子 图包、图片、截图、标题党、色值；Hxr（零点连招手）：主色 #304860 / #304848，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、妈妈。
Relationship acting: 一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。 围绕“下次一定摊”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
Cover/poster/meme inspiration: 可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_001_role_008 弧形反叛超量🐉 × 沉机：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_001_role_008.png`
- 剧情来源：`pair_role_001_role_008` / 同步蹲点事件 / 固定搭档型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：栈道留言瓶
- 关系动作：一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：community_pizza_fire, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_001.png` + `assets/imagegen/portraits/role_008.png`
- Meme/番剧构图：进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
- 封面/海报/梗图灵感：可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。
- 构图分析：把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。
- ACG/neta：二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_001_role_008
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 弧形反叛超量🐉 × 沉机：先别急，这段算两个人都看见了。弧形反叛超量🐉和沉机是群聊中高频互动搭档之一。两人在533个共同活跃日中频繁互动，通过202次显式回复和231次@建立了双向均衡的互动模式。他们的关系属于'固定搭档型'，共同出现在1972个话题窗口中。
Episode type: 同步蹲点事件；关系类型：固定搭档型。
Story beats to visualize: 旁白：弧形反叛超量🐉和沉机在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哎你也在——我还以为今天就我一个人在湖边回声栈道晃。 / 我也是刚到的。听到你在这边就过来了。 / 那正好，省得我发私信。过来帮我看个东西。 / 又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 弧形反叛超量🐉：“哎你也在——我还以为今天就我一个人在湖边回声栈道晃。”；沉机：“我也是刚到的。听到你在这边就过来了。”；弧形反叛超量🐉：“那正好，省得我发私信。过来帮我看个东西。”；沉机：“又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。”；弧形反叛超量🐉：“图呢”；沉机：“有没有懂的”
Choice energy: 拱火：弧形反叛超量🐉负责把话题推高，沉机负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：栈道留言瓶。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/community_pizza_fire.gif` (Community pizza fire reaction composition, source Know Your Meme). Use it only as a composition storyboard: use the doorway-arrival chaos skeleton: one character enters/catches the other in a too-obvious stakeout, with the core prop already causing a tiny incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original actors, room, fire, pizza box, show logo, or live-action look.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 弧形反叛超量🐉 portrait assets/imagegen/portraits/role_001.png, expressions {'neutral': 'assets/imagegen/expressions/role_001_neutral.png', 'happy': 'assets/imagegen/expressions/role_001_happy.png', 'tease': 'assets/imagegen/expressions/role_001_tease.png', 'serious': 'assets/imagegen/expressions/role_001_serious.png'}; 沉机 portrait assets/imagegen/portraits/role_008.png, expressions {'neutral': 'assets/imagegen/expressions/role_008_neutral.png', 'happy': 'assets/imagegen/expressions/role_008_happy.png', 'tease': 'assets/imagegen/expressions/role_008_tease.png', 'serious': 'assets/imagegen/expressions/role_008_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 弧形反叛超量🐉（龙牌超量判官）与沉机（回声转译师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。弧形反叛超量🐉（龙牌超量判官）：主色 #904800 / #303000，符号 圆形构图、月光丝带，梗种子 图包、图片、截图、标题党、色值；沉机（回声转译师）：主色 #d8a8a8 / #c090a8，符号 明亮眼神、餐厅小勺，梗种子 图片、图包、截图、标题党、色值。
Relationship acting: 一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。 围绕“栈道留言瓶”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
Cover/poster/meme inspiration: 可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_008_role_002 沉机 × Hxr：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_008_role_002.png`
- 剧情来源：`pair_role_008_role_002` / 淡季、路灯与吐槽停顿 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：否）
- 核心物件：留言灯
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_008.png` + `assets/imagegen/portraits/role_002.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_008_role_002
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 沉机 × Hxr：先别急，这段算两个人都看见了。沉机和Hxr不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 淡季、路灯与吐槽停顿；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Hxr和沉机在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天湖边回声栈道特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: Hxr：“今天湖边回声栈道特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；沉机：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；Hxr：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；沉机：“我和路灯还不够？路灯又不会吐槽你。”；Hxr：“羡慕你”；沉机：“有没有懂的”
Choice energy: 拱火：沉机负责把话题推高，Hxr负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：留言灯。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 沉机 portrait assets/imagegen/portraits/role_008.png, expressions {'neutral': 'assets/imagegen/expressions/role_008_neutral.png', 'happy': 'assets/imagegen/expressions/role_008_happy.png', 'tease': 'assets/imagegen/expressions/role_008_tease.png', 'serious': 'assets/imagegen/expressions/role_008_serious.png'}; Hxr portrait assets/imagegen/portraits/role_002.png, expressions {'neutral': 'assets/imagegen/expressions/role_002_neutral.png', 'happy': 'assets/imagegen/expressions/role_002_happy.png', 'tease': 'assets/imagegen/expressions/role_002_tease.png', 'serious': 'assets/imagegen/expressions/role_002_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 沉机（回声转译师）与Hxr（零点连招手）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。沉机（回声转译师）：主色 #d8a8a8 / #c090a8，符号 明亮眼神、餐厅小勺，梗种子 图片、图包、截图、标题党、色值；Hxr（零点连招手）：主色 #304860 / #304848，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、妈妈。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“留言灯”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_006_role_009 力竭了 × 多点关心：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_006_role_009.png`
- 剧情来源：`pair_role_006_role_009` / 观测点与三行诗 / 固定搭档型
- 实际场景：小康餐厅（旧区域是否冲突：否）
- 核心物件：吧台式餐桌灯
- 关系动作：一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：sherlock_jr_projection, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_006.png` + `assets/imagegen/portraits/role_009.png`
- Meme/番剧构图：电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
- 封面/海报/梗图灵感：可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。
- 构图分析：让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。
- ACG/neta：日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_006_role_009
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 力竭了 × 多点关心：先别急，这段算两个人都看见了。力竭了和多点关心是群聊中高频互动搭档之一。两人在567个共同活跃日中频繁互动，通过235次显式回复和275次@建立了双向均衡的互动模式。他们的关系属于'固定搭档型'，共同出现在1796个话题窗口中。
Episode type: 观测点与三行诗；关系类型：固定搭档型。
Story beats to visualize: 旁白：力竭了和多点关心在小康餐厅碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 喂，过来坐。小康餐厅这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。 / 你今天不跑任务了？居然有时间坐着看灯。 / 任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。 / 三行——像三行诗。你是不是又在准备写什么东西？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小康餐厅在记录这次相遇。
Dialogue basis: 力竭了：“喂，过来坐。小康餐厅这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。”；多点关心：“你今天不跑任务了？居然有时间坐着看灯。”；力竭了：“任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。”；多点关心：“三行——像三行诗。你是不是又在准备写什么东西？”；力竭了：“不赖”；多点关心：“[[呵呵]]”
Choice energy: 拱火：力竭了负责把话题推高，多点关心负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小康餐厅。视觉元素：暖黄灯、木桌、料理台、饮品柜、蒸汽、半糖裁判杯。核心物件：吧台式餐桌灯。可带入区域 motif：晚饭召集锅、半糖裁判杯、加饭按钮、蒸汽表情云。
Reference frame: first inspect `.reference_cache/bond_cg_v3/sherlock_jr_projection.jpg` (Sherlock Jr. poster projection/detective composition, source Wikimedia Commons). Use it only as a composition storyboard: use the projection-screen observation skeleton: two characters study light/reflection/core prop like a tiny cinema clue, offset rather than posed as a couple. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Buster Keaton, poster typography, magnifying-glass branding, or exact costume.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}; 多点关心 portrait assets/imagegen/portraits/role_009.png, expressions {'neutral': 'assets/imagegen/expressions/role_009_neutral.png', 'happy': 'assets/imagegen/expressions/role_009_happy.png', 'tease': 'assets/imagegen/expressions/role_009_tease.png', 'serious': 'assets/imagegen/expressions/role_009_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 力竭了（疲劳判定官）与多点关心（关心信标使）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ；多点关心（关心信标使）：主色 #d8d8d8 / #d8c0d8，符号 星砂发饰、舞台票根，梗种子 图包、图片、截图、回复、Hxr。
Relationship acting: 一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。 围绕“吧台式餐桌灯”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
Cover/poster/meme inspiration: 可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_012_role_009 早上了喵～ × 多点关心：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_012_role_009.png`
- 剧情来源：`pair_role_012_role_009` / 淡季、路灯与吐槽停顿 / 动态拱火拆台型
- 实际场景：小康餐厅（旧区域是否冲突：是）
- 核心物件：吧台小灯
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_012.png` + `assets/imagegen/portraits/role_009.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_012_role_009
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 早上了喵～ × 多点关心：先别急，这段算两个人都看见了。早上了喵～和多点关心不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 淡季、路灯与吐槽停顿；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：多点关心和早上了喵～在小康餐厅碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天小康餐厅特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小康餐厅在记录这次相遇。
Dialogue basis: 多点关心：“今天小康餐厅特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；早上了喵～：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；多点关心：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；早上了喵～：“我和路灯还不够？路灯又不会吐槽你。”；多点关心：“[[呵呵]]”；早上了喵～：“晚安”
Choice energy: 拱火：早上了喵～负责把话题推高，多点关心负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小康餐厅。视觉元素：暖黄灯、木桌、料理台、饮品柜、蒸汽、半糖裁判杯。核心物件：吧台小灯。可带入区域 motif：晚饭召集锅、半糖裁判杯、加饭按钮、蒸汽表情云。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 早上了喵～ portrait assets/imagegen/portraits/role_012.png, expressions {'neutral': 'assets/imagegen/expressions/role_012_neutral.png', 'happy': 'assets/imagegen/expressions/role_012_happy.png', 'tease': 'assets/imagegen/expressions/role_012_tease.png', 'serious': 'assets/imagegen/expressions/role_012_serious.png'}; 多点关心 portrait assets/imagegen/portraits/role_009.png, expressions {'neutral': 'assets/imagegen/expressions/role_009_neutral.png', 'happy': 'assets/imagegen/expressions/role_009_happy.png', 'tease': 'assets/imagegen/expressions/role_009_tease.png', 'serious': 'assets/imagegen/expressions/role_009_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 早上了喵～（晨报铃使）与多点关心（关心信标使）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。早上了喵～（晨报铃使）：主色 #603018 / #483018，符号 圆形构图、像素画笔，梗种子 超量、反叛、图包、弧形、图片；多点关心（关心信标使）：主色 #d8d8d8 / #d8c0d8，符号 星砂发饰、舞台票根，梗种子 图包、图片、截图、回复、Hxr。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“吧台小灯”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_010_role_013 普罗米亚写真集 × 已电子ed：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_010_role_013.png`
- 剧情来源：`pair_role_010_role_013` / 短句连招与线索物判定 / 固定搭档型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：像素屏幕
- 关系动作：剧情只剩高密度短句，重点是两人用极短反应把线索物判成群聊名场面。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：general_train_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_010.png` + `assets/imagegen/portraits/role_013.png`
- Meme/番剧构图：少年漫技能连招/吐槽役接招构图：一人像放技能一样抛梗，另一人用判定手势接住，背景有速度线但无文字。
- 封面/海报/梗图灵感：可借热血动画封面、动作喜剧搭档海报、格斗游戏必杀技 cut-in、吐槽役接梗 meme 的分屏近景；允许斜切画面和强透视。
- 构图分析：画成战斗漫画式短句连招：一人抛出线索，另一人用判定姿势接住，核心物件发出夸张但不可读的效果线。
- ACG/neta：弹幕番短句 combo、对话像技能前摇、吐槽役与接梗役合体技、SSR 判定演出。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_010_role_013
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 普罗米亚写真集 × 已电子ed：先别急，这段算两个人都看见了。普罗米亚绳艺写真集和已电子ed是群聊中高频互动搭档之一。两人在525个共同活跃日中频繁互动，通过85次显式回复和110次@建立了双向均衡的互动模式。他们的关系属于'固定搭档型'，共同出现在942个话题窗口中。
Episode type: 短句连招与线索物判定；关系类型：固定搭档型。
Story beats to visualize: 可以 / 可以 / 多发点 / 所以先看像素屏幕，别急着判。 / 那我问一句，谁先卡住？ / 有内味了
Dialogue basis: 普罗米亚写真集：“可以”；已电子ed：“多发点”；普罗米亚写真集：“所以先看像素屏幕，别急着判。”；已电子ed：“那我问一句，谁先卡住？”；普罗米亚写真集：“你这也太会挑时间”；已电子ed：“有内味了”
Choice energy: 拱火：普罗米亚写真集负责把话题推高，已电子ed负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：像素屏幕。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/general_train_poster.jpg` (The General train chase poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the diagonal action skeleton: a short dialogue combo turns into a fast prop chase or split-screen impact line with clear comic timing. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the train design, actor likeness, poster text, or exact chase layout.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 普罗米亚写真集 portrait assets/imagegen/portraits/role_010.png, expressions {'neutral': 'assets/imagegen/expressions/role_010_neutral.png', 'happy': 'assets/imagegen/expressions/role_010_happy.png', 'tease': 'assets/imagegen/expressions/role_010_tease.png', 'serious': 'assets/imagegen/expressions/role_010_serious.png'}; 已电子ed portrait assets/imagegen/portraits/role_013.png, expressions {'neutral': 'assets/imagegen/expressions/role_013_neutral.png', 'happy': 'assets/imagegen/expressions/role_013_happy.png', 'tease': 'assets/imagegen/expressions/role_013_tease.png', 'serious': 'assets/imagegen/expressions/role_013_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 普罗米亚写真集（星火影集师）与已电子ed（电子梦游者）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。普罗米亚写真集（星火影集师）：主色 #c0c0c0 / #d8d8d8，符号 星砂发饰、牌纹徽章，梗种子 图包、图片、截图、标题党、色值；已电子ed（电子梦游者）：主色 #c0f090 / #90a8c0，符号 星砂发饰、餐厅小勺，梗种子 图片、图包、截图、标题党、超量。
Relationship acting: 剧情只剩高密度短句，重点是两人用极短反应把线索物判成群聊名场面。 围绕“像素屏幕”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 少年漫技能连招/吐槽役接招构图：一人像放技能一样抛梗，另一人用判定手势接住，背景有速度线但无文字。
Cover/poster/meme inspiration: 可借热血动画封面、动作喜剧搭档海报、格斗游戏必杀技 cut-in、吐槽役接梗 meme 的分屏近景；允许斜切画面和强透视。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画成战斗漫画式短句连招：一人抛出线索，另一人用判定姿势接住，核心物件发出夸张但不可读的效果线。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 弹幕番短句 combo、对话像技能前摇、吐槽役与接梗役合体技、SSR 判定演出。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_010_role_004 普罗米亚写真集 × 赛博鳏夫：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_010_role_004.png`
- 剧情来源：`pair_role_010_role_004` / 重叠人影与新梗标题 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：是）
- 核心物件：立绘修补台
- 关系动作：一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：nosferatu_shadow, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_010.png` + `assets/imagegen/portraits/role_004.png`
- Meme/番剧构图：灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
- 封面/海报/梗图灵感：可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。
- 构图分析：用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。
- ACG/neta：灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_010_role_004
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 普罗米亚写真集 × 赛博鳏夫：先别急，这段算两个人都看见了。普罗米亚写真集和赛博鳏夫不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 重叠人影与新梗标题；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：普罗米亚写真集和赛博鳏夫在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 等一下——你刚才是不是在头像工坊那边？我好像看到一个人影。 / 可能是我。也可能不是——头像工坊这边回声多，人影有时候会重叠。 / 重叠的人影听起来像个新梗的标题。记下来。 / 你什么都记。上次记的「路灯复读事件」到现在还没下文。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: 普罗米亚写真集：“等一下——你刚才是不是在头像工坊那边？我好像看到一个人影。”；赛博鳏夫：“可能是我。也可能不是——头像工坊这边回声多，人影有时候会重叠。”；普罗米亚写真集：“重叠的人影听起来像个新梗的标题。记下来。”；赛博鳏夫：“你什么都记。上次记的「路灯复读事件」到现在还没下文。”；普罗米亚写真集：“妈妈”；赛博鳏夫：“嚯嚯嚯”
Choice energy: 拱火：普罗米亚写真集负责把话题推高，赛博鳏夫负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：立绘修补台。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/nosferatu_shadow.png` (Nosferatu shadow silhouette composition, source Wikimedia Commons). Use it only as a composition storyboard: use the oversized-shadow skeleton: one character points at a suspicious overlapping shadow while the other records it as a new title-worthy incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the vampire silhouette, claws, stairs, or exact horror iconography.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 普罗米亚写真集 portrait assets/imagegen/portraits/role_010.png, expressions {'neutral': 'assets/imagegen/expressions/role_010_neutral.png', 'happy': 'assets/imagegen/expressions/role_010_happy.png', 'tease': 'assets/imagegen/expressions/role_010_tease.png', 'serious': 'assets/imagegen/expressions/role_010_serious.png'}; 赛博鳏夫 portrait assets/imagegen/portraits/role_004.png, expressions {'neutral': 'assets/imagegen/expressions/role_004_neutral.png', 'happy': 'assets/imagegen/expressions/role_004_happy.png', 'tease': 'assets/imagegen/expressions/role_004_tease.png', 'serious': 'assets/imagegen/expressions/role_004_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 普罗米亚写真集（星火影集师）与赛博鳏夫（赛博夜航人）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。普罗米亚写真集（星火影集师）：主色 #c0c0c0 / #d8d8d8，符号 星砂发饰、牌纹徽章，梗种子 图包、图片、截图、标题党、色值；赛博鳏夫（赛博夜航人）：主色 #d8d8d8 / #f0f0f0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、Hxr、出处。
Relationship acting: 一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。 围绕“立绘修补台”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
Cover/poster/meme inspiration: 可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_010_role_006 普罗米亚写真集 × 力竭了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_010_role_006.png`
- 剧情来源：`pair_role_010_role_006` / 短句连招与线索物判定 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：像素屏幕
- 关系动作：剧情只剩高密度短句，重点是两人用极短反应把线索物判成群聊名场面。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：general_train_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_010.png` + `assets/imagegen/portraits/role_006.png`
- Meme/番剧构图：少年漫技能连招/吐槽役接招构图：一人像放技能一样抛梗，另一人用判定手势接住，背景有速度线但无文字。
- 封面/海报/梗图灵感：可借热血动画封面、动作喜剧搭档海报、格斗游戏必杀技 cut-in、吐槽役接梗 meme 的分屏近景；允许斜切画面和强透视。
- 构图分析：画成战斗漫画式短句连招：一人抛出线索，另一人用判定姿势接住，核心物件发出夸张但不可读的效果线。
- ACG/neta：弹幕番短句 combo、对话像技能前摇、吐槽役与接梗役合体技、SSR 判定演出。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_010_role_006
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 普罗米亚写真集 × 力竭了：先别急，这段算两个人都看见了。普罗米亚写真集和力竭了不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 短句连招与线索物判定；关系类型：动态拱火拆台型。
Story beats to visualize: 可以 / 可以 / ？ / 所以先看同步色板，别急着判。 / 这不是同步色板的问题，是你们都看见了。 / 这图有说法
Dialogue basis: 普罗米亚写真集：“可以”；力竭了：“？”；普罗米亚写真集：“所以先看同步色板，别急着判。”；力竭了：“这不是同步色板的问题，是你们都看见了。”；普罗米亚写真集：“妈妈”；力竭了：“这图有说法”
Choice energy: 拱火：普罗米亚写真集负责把话题推高，力竭了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：像素屏幕。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/general_train_poster.jpg` (The General train chase poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the diagonal action skeleton: a short dialogue combo turns into a fast prop chase or split-screen impact line with clear comic timing. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the train design, actor likeness, poster text, or exact chase layout.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 普罗米亚写真集 portrait assets/imagegen/portraits/role_010.png, expressions {'neutral': 'assets/imagegen/expressions/role_010_neutral.png', 'happy': 'assets/imagegen/expressions/role_010_happy.png', 'tease': 'assets/imagegen/expressions/role_010_tease.png', 'serious': 'assets/imagegen/expressions/role_010_serious.png'}; 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 普罗米亚写真集（星火影集师）与力竭了（疲劳判定官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。普罗米亚写真集（星火影集师）：主色 #c0c0c0 / #d8d8d8，符号 星砂发饰、牌纹徽章，梗种子 图包、图片、截图、标题党、色值；力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ。
Relationship acting: 剧情只剩高密度短句，重点是两人用极短反应把线索物判成群聊名场面。 围绕“像素屏幕”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 少年漫技能连招/吐槽役接招构图：一人像放技能一样抛梗，另一人用判定手势接住，背景有速度线但无文字。
Cover/poster/meme inspiration: 可借热血动画封面、动作喜剧搭档海报、格斗游戏必杀技 cut-in、吐槽役接梗 meme 的分屏近景；允许斜切画面和强透视。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画成战斗漫画式短句连招：一人抛出线索，另一人用判定姿势接住，核心物件发出夸张但不可读的效果线。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 弹幕番短句 combo、对话像技能前摇、吐槽役与接梗役合体技、SSR 判定演出。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_020_role_011 高手 × 没办法：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_020_role_011.png`
- 剧情来源：`pair_role_020_role_011` / 观测点与三行诗 / 动态拱火拆台型
- 实际场景：龙牌馆（旧区域是否冲突：否）
- 核心物件：龙角裁判席
- 关系动作：一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：sherlock_jr_projection, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_020.png` + `assets/imagegen/portraits/role_011.png`
- Meme/番剧构图：电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
- 封面/海报/梗图灵感：可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。
- 构图分析：让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。
- ACG/neta：日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_020_role_011
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 高手 × 没办法：先别急，这段算两个人都看见了。高手和没办法不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 观测点与三行诗；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：高手和没办法在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 喂，过来坐。龙牌馆这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。 / 你今天不跑任务了？居然有时间坐着看灯。 / 任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。 / 三行——像三行诗。你是不是又在准备写什么东西？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: 高手：“喂，过来坐。龙牌馆这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。”；没办法：“你今天不跑任务了？居然有时间坐着看灯。”；高手：“任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。”；没办法：“三行——像三行诗。你是不是又在准备写什么东西？”；高手：“好玩吗”；没办法：“这是你”
Choice energy: 拱火：高手负责把话题推高，没办法负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：龙角裁判席。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/sherlock_jr_projection.jpg` (Sherlock Jr. poster projection/detective composition, source Wikimedia Commons). Use it only as a composition storyboard: use the projection-screen observation skeleton: two characters study light/reflection/core prop like a tiny cinema clue, offset rather than posed as a couple. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Buster Keaton, poster typography, magnifying-glass branding, or exact costume.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 高手 portrait assets/imagegen/portraits/role_020.png, expressions {'neutral': 'assets/imagegen/expressions/role_020_neutral.png', 'happy': 'assets/imagegen/expressions/role_020_happy.png', 'tease': 'assets/imagegen/expressions/role_020_tease.png', 'serious': 'assets/imagegen/expressions/role_020_serious.png'}; 没办法 portrait assets/imagegen/portraits/role_011.png, expressions {'neutral': 'assets/imagegen/expressions/role_011_neutral.png', 'happy': 'assets/imagegen/expressions/role_011_happy.png', 'tease': 'assets/imagegen/expressions/role_011_tease.png', 'serious': 'assets/imagegen/expressions/role_011_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 高手（牌桌高手）与没办法（无解牌桌顾问）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。高手（牌桌高手）：主色 #606060 / #787890，符号 圆形构图、牌纹徽章，梗种子 图包、图片、截图、...、沉机；没办法（无解牌桌顾问）：主色 #606060 / #484830，符号 星砂发饰、月光丝带，梗种子 图包、图片、截图、标题党、色值。
Relationship acting: 一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。 围绕“龙角裁判席”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
Cover/poster/meme inspiration: 可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_011_role_013 没办法 × 已电子ed：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_011_role_013.png`
- 剧情来源：`pair_role_011_role_013` / 观测点与三行诗 / 动态拱火拆台型
- 实际场景：龙牌馆（旧区域是否冲突：否）
- 核心物件：龙角裁判席
- 关系动作：一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：sherlock_jr_projection, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_011.png` + `assets/imagegen/portraits/role_013.png`
- Meme/番剧构图：电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
- 封面/海报/梗图灵感：可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。
- 构图分析：让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。
- ACG/neta：日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_011_role_013
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 没办法 × 已电子ed：先别急，这段算两个人都看见了。没办法和已电子ed不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 观测点与三行诗；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：没办法和已电子ed在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 喂，过来坐。龙牌馆这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。 / 你今天不跑任务了？居然有时间坐着看灯。 / 任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。 / 三行——像三行诗。你是不是又在准备写什么东西？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: 没办法：“喂，过来坐。龙牌馆这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。”；已电子ed：“你今天不跑任务了？居然有时间坐着看灯。”；没办法：“任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。”；已电子ed：“三行——像三行诗。你是不是又在准备写什么东西？”；没办法：“这是你”；已电子ed：“[[呵呵]]”
Choice energy: 拱火：没办法负责把话题推高，已电子ed负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：龙角裁判席。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/sherlock_jr_projection.jpg` (Sherlock Jr. poster projection/detective composition, source Wikimedia Commons). Use it only as a composition storyboard: use the projection-screen observation skeleton: two characters study light/reflection/core prop like a tiny cinema clue, offset rather than posed as a couple. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Buster Keaton, poster typography, magnifying-glass branding, or exact costume.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 没办法 portrait assets/imagegen/portraits/role_011.png, expressions {'neutral': 'assets/imagegen/expressions/role_011_neutral.png', 'happy': 'assets/imagegen/expressions/role_011_happy.png', 'tease': 'assets/imagegen/expressions/role_011_tease.png', 'serious': 'assets/imagegen/expressions/role_011_serious.png'}; 已电子ed portrait assets/imagegen/portraits/role_013.png, expressions {'neutral': 'assets/imagegen/expressions/role_013_neutral.png', 'happy': 'assets/imagegen/expressions/role_013_happy.png', 'tease': 'assets/imagegen/expressions/role_013_tease.png', 'serious': 'assets/imagegen/expressions/role_013_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 没办法（无解牌桌顾问）与已电子ed（电子梦游者）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。没办法（无解牌桌顾问）：主色 #606060 / #484830，符号 星砂发饰、月光丝带，梗种子 图包、图片、截图、标题党、色值；已电子ed（电子梦游者）：主色 #c0f090 / #90a8c0，符号 星砂发饰、餐厅小勺，梗种子 图片、图包、截图、标题党、超量。
Relationship acting: 一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。 围绕“龙角裁判席”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
Cover/poster/meme inspiration: 可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_011_role_010 没办法 × 普罗米亚写真集：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_011_role_010.png`
- 剧情来源：`pair_role_011_role_010` / 淡季、路灯与吐槽停顿 / 动态拱火拆台型
- 实际场景：龙牌馆（旧区域是否冲突：是）
- 核心物件：龙角裁判席
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_011.png` + `assets/imagegen/portraits/role_010.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_011_role_010
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 没办法 × 普罗米亚写真集：先别急，这段算两个人都看见了。没办法和普罗米亚写真集不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 淡季、路灯与吐槽停顿；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：没办法和普罗米亚写真集在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天龙牌馆特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: 没办法：“今天龙牌馆特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；普罗米亚写真集：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；没办法：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；普罗米亚写真集：“我和路灯还不够？路灯又不会吐槽你。”；没办法：“这是你”；普罗米亚写真集：“妈妈”
Choice energy: 拱火：没办法负责把话题推高，普罗米亚写真集负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：龙角裁判席。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 没办法 portrait assets/imagegen/portraits/role_011.png, expressions {'neutral': 'assets/imagegen/expressions/role_011_neutral.png', 'happy': 'assets/imagegen/expressions/role_011_happy.png', 'tease': 'assets/imagegen/expressions/role_011_tease.png', 'serious': 'assets/imagegen/expressions/role_011_serious.png'}; 普罗米亚写真集 portrait assets/imagegen/portraits/role_010.png, expressions {'neutral': 'assets/imagegen/expressions/role_010_neutral.png', 'happy': 'assets/imagegen/expressions/role_010_happy.png', 'tease': 'assets/imagegen/expressions/role_010_tease.png', 'serious': 'assets/imagegen/expressions/role_010_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 没办法（无解牌桌顾问）与普罗米亚写真集（星火影集师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。没办法（无解牌桌顾问）：主色 #606060 / #484830，符号 星砂发饰、月光丝带，梗种子 图包、图片、截图、标题党、色值；普罗米亚写真集（星火影集师）：主色 #c0c0c0 / #d8d8d8，符号 星砂发饰、牌纹徽章，梗种子 图包、图片、截图、标题党、色值。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“龙角裁判席”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_012_role_002 早上了喵～ × Hxr：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_012_role_002.png`
- 剧情来源：`pair_role_012_role_002` / 自制异常与 bug 验收 / 动态拱火拆台型
- 实际场景：小镇中心（旧区域是否冲突：否）
- 核心物件：喷泉弹幕井
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_012.png` + `assets/imagegen/portraits/role_002.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_012_role_002
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 早上了喵～ × Hxr：先别急，这段算两个人都看见了。早上了喵～和Hxr不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 自制异常与 bug 验收；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：早上了喵～和Hxr在小镇中心碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。小镇中心这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小镇中心在记录这次相遇。
Dialogue basis: 早上了喵～：“嘿，过来。小镇中心这边有个东西你肯定会感兴趣。”；Hxr：“什么东西——又是你以为只有你一个人发现的那种？”；早上了喵～：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；Hxr：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；早上了喵～：“晚安”；Hxr：“羡慕你”
Choice energy: 拱火：早上了喵～负责把话题推高，Hxr负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小镇中心。视觉元素：暖色石砖、星砂喷泉、小康钟、路灯、入口门牌和弹幕告示。核心物件：喷泉弹幕井。可带入区域 motif：喷泉弹幕、小康钟、公告牌、星砂摊位。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. 早上了喵～ portrait assets/imagegen/portraits/role_012.png, expressions {'neutral': 'assets/imagegen/expressions/role_012_neutral.png', 'happy': 'assets/imagegen/expressions/role_012_happy.png', 'tease': 'assets/imagegen/expressions/role_012_tease.png', 'serious': 'assets/imagegen/expressions/role_012_serious.png'}; Hxr portrait assets/imagegen/portraits/role_002.png, expressions {'neutral': 'assets/imagegen/expressions/role_002_neutral.png', 'happy': 'assets/imagegen/expressions/role_002_happy.png', 'tease': 'assets/imagegen/expressions/role_002_tease.png', 'serious': 'assets/imagegen/expressions/role_002_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 早上了喵～（晨报铃使）与Hxr（零点连招手）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。早上了喵～（晨报铃使）：主色 #603018 / #483018，符号 圆形构图、像素画笔，梗种子 超量、反叛、图包、弧形、图片；Hxr（零点连招手）：主色 #304860 / #304848，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、妈妈。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“喷泉弹幕井”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_003_role_013 NNZ × 已电子ed：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_003_role_013.png`
- 剧情来源：`pair_role_003_role_013` / 短句连招与线索物判定 / 熟人接梗型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：像素屏幕
- 关系动作：剧情只剩高密度短句，重点是两人用极短反应把线索物判成群聊名场面。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：general_train_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_003.png` + `assets/imagegen/portraits/role_013.png`
- Meme/番剧构图：少年漫技能连招/吐槽役接招构图：一人像放技能一样抛梗，另一人用判定手势接住，背景有速度线但无文字。
- 封面/海报/梗图灵感：可借热血动画封面、动作喜剧搭档海报、格斗游戏必杀技 cut-in、吐槽役接梗 meme 的分屏近景；允许斜切画面和强透视。
- 构图分析：画成战斗漫画式短句连招：一人抛出线索，另一人用判定姿势接住，核心物件发出夸张但不可读的效果线。
- ACG/neta：弹幕番短句 combo、对话像技能前摇、吐槽役与接梗役合体技、SSR 判定演出。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_003_role_013
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: NNZ × 已电子ed：先别急，这段算两个人都看见了。NNZ和已电子ed之间形成了稳定的固定搭档型。互动高频度为64.2，两人互动较为频繁，但互惠性很高。
Episode type: 短句连招与线索物判定；关系类型：熟人接梗型。
Story beats to visualize: 可以 / 可以 / 呆傻的孩子一般都长这样 / 所以先看像素屏幕，别急着判。 / 那我问一句，谁先卡住？ / 这句能接
Dialogue basis: NNZ：“可以”；已电子ed：“呆傻的孩子一般都长这样”；NNZ：“所以先看像素屏幕，别急着判。”；已电子ed：“那我问一句，谁先卡住？”；NNZ：“你这也太会挑时间”；已电子ed：“这句能接”
Choice energy: 拱火：NNZ负责把话题推高，已电子ed负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：像素屏幕。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/general_train_poster.jpg` (The General train chase poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the diagonal action skeleton: a short dialogue combo turns into a fast prop chase or split-screen impact line with clear comic timing. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the train design, actor likeness, poster text, or exact chase layout.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. NNZ portrait assets/imagegen/portraits/role_003.png, expressions {'neutral': 'assets/imagegen/expressions/role_003_neutral.png', 'happy': 'assets/imagegen/expressions/role_003_happy.png', 'tease': 'assets/imagegen/expressions/role_003_tease.png', 'serious': 'assets/imagegen/expressions/role_003_serious.png'}; 已电子ed portrait assets/imagegen/portraits/role_013.png, expressions {'neutral': 'assets/imagegen/expressions/role_013_neutral.png', 'happy': 'assets/imagegen/expressions/role_013_happy.png', 'tease': 'assets/imagegen/expressions/role_013_tease.png', 'serious': 'assets/imagegen/expressions/role_013_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: NNZ（星砂资料馆长）与已电子ed（电子梦游者）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。NNZ（星砂资料馆长）：主色 #f0f0f0 / #78a8a8，符号 圆形构图、餐厅小勺，梗种子 图包、图片、截图、标题党、色值；已电子ed（电子梦游者）：主色 #c0f090 / #90a8c0，符号 星砂发饰、餐厅小勺，梗种子 图片、图包、截图、标题党、超量。
Relationship acting: 剧情只剩高密度短句，重点是两人用极短反应把线索物判成群聊名场面。 围绕“像素屏幕”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 少年漫技能连招/吐槽役接招构图：一人像放技能一样抛梗，另一人用判定手势接住，背景有速度线但无文字。
Cover/poster/meme inspiration: 可借热血动画封面、动作喜剧搭档海报、格斗游戏必杀技 cut-in、吐槽役接梗 meme 的分屏近景；允许斜切画面和强透视。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画成战斗漫画式短句连招：一人抛出线索，另一人用判定姿势接住，核心物件发出夸张但不可读的效果线。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 弹幕番短句 combo、对话像技能前摇、吐槽役与接梗役合体技、SSR 判定演出。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_013_role_004 已电子ed × 赛博鳏夫：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_013_role_004.png`
- 剧情来源：`pair_role_013_role_004` / 淡季、路灯与吐槽停顿 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：像素屏幕
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_013.png` + `assets/imagegen/portraits/role_004.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_013_role_004
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 已电子ed × 赛博鳏夫：先别急，这段算两个人都看见了。已电子ed和赛博鳏夫不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 淡季、路灯与吐槽停顿；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：已电子ed和赛博鳏夫在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天头像工坊特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: 已电子ed：“今天头像工坊特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；赛博鳏夫：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；已电子ed：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；赛博鳏夫：“我和路灯还不够？路灯又不会吐槽你。”；已电子ed：“[[呵呵]]”；赛博鳏夫：“嚯嚯嚯”
Choice energy: 拱火：已电子ed负责把话题推高，赛博鳏夫负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：像素屏幕。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 已电子ed portrait assets/imagegen/portraits/role_013.png, expressions {'neutral': 'assets/imagegen/expressions/role_013_neutral.png', 'happy': 'assets/imagegen/expressions/role_013_happy.png', 'tease': 'assets/imagegen/expressions/role_013_tease.png', 'serious': 'assets/imagegen/expressions/role_013_serious.png'}; 赛博鳏夫 portrait assets/imagegen/portraits/role_004.png, expressions {'neutral': 'assets/imagegen/expressions/role_004_neutral.png', 'happy': 'assets/imagegen/expressions/role_004_happy.png', 'tease': 'assets/imagegen/expressions/role_004_tease.png', 'serious': 'assets/imagegen/expressions/role_004_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 已电子ed（电子梦游者）与赛博鳏夫（赛博夜航人）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。已电子ed（电子梦游者）：主色 #c0f090 / #90a8c0，符号 星砂发饰、餐厅小勺，梗种子 图片、图包、截图、标题党、超量；赛博鳏夫（赛博夜航人）：主色 #d8d8d8 / #f0f0f0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、Hxr、出处。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“像素屏幕”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_014_role_013 健康哥哥 × 已电子ed：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_014_role_013.png`
- 剧情来源：`pair_role_014_role_013` / 同步蹲点事件 / 动态拱火拆台型
- 实际场景：小康餐厅（旧区域是否冲突：是）
- 核心物件：晚饭召集锅
- 关系动作：一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：community_pizza_fire, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_014.png` + `assets/imagegen/portraits/role_013.png`
- Meme/番剧构图：进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
- 封面/海报/梗图灵感：可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。
- 构图分析：把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。
- ACG/neta：二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_014_role_013
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 健康哥哥 × 已电子ed：先别急，这段算两个人都看见了。健康哥哥和已电子ed不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 同步蹲点事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：健康哥哥和已电子ed在小康餐厅碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哎你也在——我还以为今天就我一个人在小康餐厅晃。 / 我也是刚到的。听到你在这边就过来了。 / 那正好，省得我发私信。过来帮我看个东西。 / 又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小康餐厅在记录这次相遇。
Dialogue basis: 健康哥哥：“哎你也在——我还以为今天就我一个人在小康餐厅晃。”；已电子ed：“我也是刚到的。听到你在这边就过来了。”；健康哥哥：“那正好，省得我发私信。过来帮我看个东西。”；已电子ed：“又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。”；健康哥哥：“睡醒了”；已电子ed：“[[呵呵]]”
Choice energy: 拱火：健康哥哥负责把话题推高，已电子ed负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小康餐厅。视觉元素：暖黄灯、木桌、料理台、饮品柜、蒸汽、半糖裁判杯。核心物件：晚饭召集锅。可带入区域 motif：晚饭召集锅、半糖裁判杯、加饭按钮、蒸汽表情云。
Reference frame: first inspect `.reference_cache/bond_cg_v3/community_pizza_fire.gif` (Community pizza fire reaction composition, source Know Your Meme). Use it only as a composition storyboard: use the doorway-arrival chaos skeleton: one character enters/catches the other in a too-obvious stakeout, with the core prop already causing a tiny incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original actors, room, fire, pizza box, show logo, or live-action look.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 健康哥哥 portrait assets/imagegen/portraits/role_014.png, expressions {'neutral': 'assets/imagegen/expressions/role_014_neutral.png', 'happy': 'assets/imagegen/expressions/role_014_happy.png', 'tease': 'assets/imagegen/expressions/role_014_tease.png', 'serious': 'assets/imagegen/expressions/role_014_serious.png'}; 已电子ed portrait assets/imagegen/portraits/role_013.png, expressions {'neutral': 'assets/imagegen/expressions/role_013_neutral.png', 'happy': 'assets/imagegen/expressions/role_013_happy.png', 'tease': 'assets/imagegen/expressions/role_013_tease.png', 'serious': 'assets/imagegen/expressions/role_013_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 健康哥哥（体力补给官）与已电子ed（电子梦游者）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。健康哥哥（体力补给官）：主色 #909090 / #787878，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、标题党、回复；已电子ed（电子梦游者）：主色 #c0f090 / #90a8c0，符号 星砂发饰、餐厅小勺，梗种子 图片、图包、截图、标题党、超量。
Relationship acting: 一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。 围绕“晚饭召集锅”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
Cover/poster/meme inspiration: 可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_014_role_003 健康哥哥 × NNZ：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_014_role_003.png`
- 剧情来源：`pair_role_014_role_003` / 观测点与三行诗 / 动态拱火拆台型
- 实际场景：小康餐厅（旧区域是否冲突：是）
- 核心物件：吧台式餐桌灯
- 关系动作：一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：sherlock_jr_projection, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_014.png` + `assets/imagegen/portraits/role_003.png`
- Meme/番剧构图：电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
- 封面/海报/梗图灵感：可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。
- 构图分析：让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。
- ACG/neta：日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_014_role_003
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 健康哥哥 × NNZ：先别急，这段算两个人都看见了。健康哥哥和NNZ不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 观测点与三行诗；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：健康哥哥和NNZ在小康餐厅碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 喂，过来坐。小康餐厅这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。 / 你今天不跑任务了？居然有时间坐着看灯。 / 任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。 / 三行——像三行诗。你是不是又在准备写什么东西？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小康餐厅在记录这次相遇。
Dialogue basis: 健康哥哥：“喂，过来坐。小康餐厅这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。”；NNZ：“你今天不跑任务了？居然有时间坐着看灯。”；健康哥哥：“任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。”；NNZ：“三行——像三行诗。你是不是又在准备写什么东西？”；健康哥哥：“睡醒了”；NNZ：“神秘”
Choice energy: 拱火：健康哥哥负责把话题推高，NNZ负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小康餐厅。视觉元素：暖黄灯、木桌、料理台、饮品柜、蒸汽、半糖裁判杯。核心物件：吧台式餐桌灯。可带入区域 motif：晚饭召集锅、半糖裁判杯、加饭按钮、蒸汽表情云。
Reference frame: first inspect `.reference_cache/bond_cg_v3/sherlock_jr_projection.jpg` (Sherlock Jr. poster projection/detective composition, source Wikimedia Commons). Use it only as a composition storyboard: use the projection-screen observation skeleton: two characters study light/reflection/core prop like a tiny cinema clue, offset rather than posed as a couple. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Buster Keaton, poster typography, magnifying-glass branding, or exact costume.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 健康哥哥 portrait assets/imagegen/portraits/role_014.png, expressions {'neutral': 'assets/imagegen/expressions/role_014_neutral.png', 'happy': 'assets/imagegen/expressions/role_014_happy.png', 'tease': 'assets/imagegen/expressions/role_014_tease.png', 'serious': 'assets/imagegen/expressions/role_014_serious.png'}; NNZ portrait assets/imagegen/portraits/role_003.png, expressions {'neutral': 'assets/imagegen/expressions/role_003_neutral.png', 'happy': 'assets/imagegen/expressions/role_003_happy.png', 'tease': 'assets/imagegen/expressions/role_003_tease.png', 'serious': 'assets/imagegen/expressions/role_003_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 健康哥哥（体力补给官）与NNZ（星砂资料馆长）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。健康哥哥（体力补给官）：主色 #909090 / #787878，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、标题党、回复；NNZ（星砂资料馆长）：主色 #f0f0f0 / #78a8a8，符号 圆形构图、餐厅小勺，梗种子 图包、图片、截图、标题党、色值。
Relationship acting: 一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。 围绕“吧台式餐桌灯”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
Cover/poster/meme inspiration: 可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_014_role_017 健康哥哥 × 很复杂：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_014_role_017.png`
- 剧情来源：`pair_role_014_role_017` / 重叠人影与新梗标题 / 动态拱火拆台型
- 实际场景：小康餐厅（旧区域是否冲突：是）
- 核心物件：蒸汽表情云
- 关系动作：一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：nosferatu_shadow, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_014.png` + `assets/imagegen/portraits/role_017.png`
- Meme/番剧构图：灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
- 封面/海报/梗图灵感：可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。
- 构图分析：用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。
- ACG/neta：灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_014_role_017
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 健康哥哥 × 很复杂：先别急，这段算两个人都看见了。健康哥哥和很复杂不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 重叠人影与新梗标题；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：健康哥哥和很复杂在小康餐厅碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 等一下——你刚才是不是在小康餐厅那边？我好像看到一个人影。 / 可能是我。也可能不是——小康餐厅这边回声多，人影有时候会重叠。 / 重叠的人影听起来像个新梗的标题。记下来。 / 你什么都记。上次记的「路灯复读事件」到现在还没下文。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小康餐厅在记录这次相遇。
Dialogue basis: 健康哥哥：“等一下——你刚才是不是在小康餐厅那边？我好像看到一个人影。”；很复杂：“可能是我。也可能不是——小康餐厅这边回声多，人影有时候会重叠。”；健康哥哥：“重叠的人影听起来像个新梗的标题。记下来。”；很复杂：“你什么都记。上次记的「路灯复读事件」到现在还没下文。”；健康哥哥：“睡醒了”；很复杂：“有感觉吗”
Choice energy: 拱火：健康哥哥负责把话题推高，很复杂负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小康餐厅。视觉元素：暖黄灯、木桌、料理台、饮品柜、蒸汽、半糖裁判杯。核心物件：蒸汽表情云。可带入区域 motif：晚饭召集锅、半糖裁判杯、加饭按钮、蒸汽表情云。
Reference frame: first inspect `.reference_cache/bond_cg_v3/nosferatu_shadow.png` (Nosferatu shadow silhouette composition, source Wikimedia Commons). Use it only as a composition storyboard: use the oversized-shadow skeleton: one character points at a suspicious overlapping shadow while the other records it as a new title-worthy incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the vampire silhouette, claws, stairs, or exact horror iconography.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 健康哥哥 portrait assets/imagegen/portraits/role_014.png, expressions {'neutral': 'assets/imagegen/expressions/role_014_neutral.png', 'happy': 'assets/imagegen/expressions/role_014_happy.png', 'tease': 'assets/imagegen/expressions/role_014_tease.png', 'serious': 'assets/imagegen/expressions/role_014_serious.png'}; 很复杂 portrait assets/imagegen/portraits/role_017.png, expressions {'neutral': 'assets/imagegen/expressions/role_017_neutral.png', 'happy': 'assets/imagegen/expressions/role_017_happy.png', 'tease': 'assets/imagegen/expressions/role_017_tease.png', 'serious': 'assets/imagegen/expressions/role_017_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 健康哥哥（体力补给官）与很复杂（分岔解码员）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。健康哥哥（体力补给官）：主色 #909090 / #787878，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、标题党、回复；很复杂（分岔解码员）：主色 #d8c090 / #787860，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、NNZ。
Relationship acting: 一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。 围绕“蒸汽表情云”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
Cover/poster/meme inspiration: 可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_015_role_002 重新减肥 × Hxr：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_015_role_002.png`
- 剧情来源：`pair_role_015_role_002` / 淡季、路灯与吐槽停顿 / 动态拱火拆台型
- 实际场景：小康养老院（旧区域是否冲突：否）
- 核心物件：安眠躺椅
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_015.png` + `assets/imagegen/portraits/role_002.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_015_role_002
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 重新减肥 × Hxr：先别急，这段算两个人都看见了。重新减肥和Hxr不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 淡季、路灯与吐槽停顿；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：重新减肥和Hxr在小康养老院碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天小康养老院特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小康养老院在记录这次相遇。
Dialogue basis: 重新减肥：“今天小康养老院特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；Hxr：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；重新减肥：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；Hxr：“我和路灯还不够？路灯又不会吐槽你。”；重新减肥：“[/敬礼]”；Hxr：“羡慕你”
Choice energy: 拱火：重新减肥负责把话题推高，Hxr负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小康养老院。视觉元素：花园、茶桌、软椅、零点钟楼、存档柜与结局门。核心物件：安眠躺椅。可带入区域 motif：零点钟楼、茶室值班表、安眠躺椅、结局门垫。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 重新减肥 portrait assets/imagegen/portraits/role_015.png, expressions {'neutral': 'assets/imagegen/expressions/role_015_neutral.png', 'happy': 'assets/imagegen/expressions/role_015_happy.png', 'tease': 'assets/imagegen/expressions/role_015_tease.png', 'serious': 'assets/imagegen/expressions/role_015_serious.png'}; Hxr portrait assets/imagegen/portraits/role_002.png, expressions {'neutral': 'assets/imagegen/expressions/role_002_neutral.png', 'happy': 'assets/imagegen/expressions/role_002_happy.png', 'tease': 'assets/imagegen/expressions/role_002_tease.png', 'serious': 'assets/imagegen/expressions/role_002_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 重新减肥（作息重启师）与Hxr（零点连招手）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。重新减肥（作息重启师）：主色 #300018 / #180000，符号 发色锚点、牌纹徽章，梗种子 图包、图片、截图、小目标、感觉；Hxr（零点连招手）：主色 #304860 / #304848，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、妈妈。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“安眠躺椅”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_022_role_015 N2过了不恨了 × 重新减肥：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_022_role_015.png`
- 剧情来源：`pair_role_022_role_015` / 第三个到与错过事件 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：图鉴抽屉
- 关系动作：一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：safety_last_clock, community_pizza_fire
- 立绘参考：`assets/imagegen/portraits/role_022.png` + `assets/imagegen/portraits/role_015.png`
- Meme/番剧构图：番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
- 封面/海报/梗图灵感：可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。
- 构图分析：核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。
- ACG/neta：错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_022_role_015
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: N2过了不恨了 × 重新减肥：先别急，这段算两个人都看见了。N2过了不恨了和重新减肥不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 第三个到与错过事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：N2过了不恨了和重新减肥在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哈，果然在。每次头像工坊有什么事，你都是第一个到的。 / 这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。 / 走了？那他们看到了什么？ / 看到了你不在，就走了。所以你现在来了，刚好。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: N2过了不恨了：“哈，果然在。每次头像工坊有什么事，你都是第一个到的。”；重新减肥：“这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。”；N2过了不恨了：“走了？那他们看到了什么？”；重新减肥：“看到了你不在，就走了。所以你现在来了，刚好。”；N2过了不恨了：“不恨了”；重新减肥：“[/敬礼]”
Choice energy: 拱火：N2过了不恨了负责把话题推高，重新减肥负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：图鉴抽屉。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/safety_last_clock.jpg` (Safety Last! clock-hanging frame, source Wikimedia Commons). Use it only as a composition storyboard: use the giant deadline-object skeleton: one character clings to or rushes around a huge scene prop while the other points out they are already third to arrive. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Harold Lloyd, the city facade, exact clock face, or live-action monochrome look.. Backup reference(s): community_pizza_fire .reference_cache/bond_cg_v3/community_pizza_fire.gif (Doorway entry into a scene that has already gone off the rails; foreground newcomer, chaotic background, instant reaction comedy.).
Character reference images: before generating, inspect and follow these exact designs. N2过了不恨了 portrait assets/imagegen/portraits/role_022.png, expressions {'neutral': 'assets/imagegen/expressions/role_022_neutral.png', 'happy': 'assets/imagegen/expressions/role_022_happy.png', 'tease': 'assets/imagegen/expressions/role_022_tease.png', 'serious': 'assets/imagegen/expressions/role_022_serious.png'}; 重新减肥 portrait assets/imagegen/portraits/role_015.png, expressions {'neutral': 'assets/imagegen/expressions/role_015_neutral.png', 'happy': 'assets/imagegen/expressions/role_015_happy.png', 'tease': 'assets/imagegen/expressions/role_015_tease.png', 'serious': 'assets/imagegen/expressions/role_015_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: N2过了不恨了（炼画调色师）与重新减肥（作息重启师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。N2过了不恨了（炼画调色师）：主色 #486078 / #486090，符号 圆形构图、像素画笔，梗种子 图包、图片、回复、毛鸽、截图；重新减肥（作息重启师）：主色 #300018 / #180000，符号 发色锚点、牌纹徽章，梗种子 图包、图片、截图、小目标、感觉。
Relationship acting: 一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。 围绕“图鉴抽屉”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
Cover/poster/meme inspiration: 可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_015_role_006 重新减肥 × 力竭了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_015_role_006.png`
- 剧情来源：`pair_role_015_role_006` / 重叠人影与新梗标题 / 动态拱火拆台型
- 实际场景：小康养老院（旧区域是否冲突：否）
- 核心物件：结局门垫
- 关系动作：一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：nosferatu_shadow, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_015.png` + `assets/imagegen/portraits/role_006.png`
- Meme/番剧构图：灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
- 封面/海报/梗图灵感：可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。
- 构图分析：用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。
- ACG/neta：灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_015_role_006
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 重新减肥 × 力竭了：先别急，这段算两个人都看见了。重新减肥和力竭了不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 重叠人影与新梗标题；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：重新减肥和力竭了在小康养老院碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 等一下——你刚才是不是在小康养老院那边？我好像看到一个人影。 / 可能是我。也可能不是——小康养老院这边回声多，人影有时候会重叠。 / 重叠的人影听起来像个新梗的标题。记下来。 / 你什么都记。上次记的「路灯复读事件」到现在还没下文。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小康养老院在记录这次相遇。
Dialogue basis: 重新减肥：“等一下——你刚才是不是在小康养老院那边？我好像看到一个人影。”；力竭了：“可能是我。也可能不是——小康养老院这边回声多，人影有时候会重叠。”；重新减肥：“重叠的人影听起来像个新梗的标题。记下来。”；力竭了：“你什么都记。上次记的「路灯复读事件」到现在还没下文。”；重新减肥：“[/敬礼]”；力竭了：“不赖”
Choice energy: 拱火：重新减肥负责把话题推高，力竭了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小康养老院。视觉元素：花园、茶桌、软椅、零点钟楼、存档柜与结局门。核心物件：结局门垫。可带入区域 motif：零点钟楼、茶室值班表、安眠躺椅、结局门垫。
Reference frame: first inspect `.reference_cache/bond_cg_v3/nosferatu_shadow.png` (Nosferatu shadow silhouette composition, source Wikimedia Commons). Use it only as a composition storyboard: use the oversized-shadow skeleton: one character points at a suspicious overlapping shadow while the other records it as a new title-worthy incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the vampire silhouette, claws, stairs, or exact horror iconography.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 重新减肥 portrait assets/imagegen/portraits/role_015.png, expressions {'neutral': 'assets/imagegen/expressions/role_015_neutral.png', 'happy': 'assets/imagegen/expressions/role_015_happy.png', 'tease': 'assets/imagegen/expressions/role_015_tease.png', 'serious': 'assets/imagegen/expressions/role_015_serious.png'}; 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 重新减肥（作息重启师）与力竭了（疲劳判定官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。重新减肥（作息重启师）：主色 #300018 / #180000，符号 发色锚点、牌纹徽章，梗种子 图包、图片、截图、小目标、感觉；力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ。
Relationship acting: 一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。 围绕“结局门垫”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
Cover/poster/meme inspiration: 可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_016_role_012 我早已麻痹 × 早上了喵～：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_016_role_012.png`
- 剧情来源：`pair_role_016_role_012` / 淡季、路灯与吐槽停顿 / 动态拱火拆台型
- 实际场景：小康养老院（旧区域是否冲突：是）
- 核心物件：安眠躺椅
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_016.png` + `assets/imagegen/portraits/role_012.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_016_role_012
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 我早已麻痹 × 早上了喵～：先别急，这段算两个人都看见了。我早已麻痹和早上了喵～不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 淡季、路灯与吐槽停顿；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：我早已麻痹和早上了喵～在小康养老院碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天小康养老院特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小康养老院在记录这次相遇。
Dialogue basis: 我早已麻痹：“今天小康养老院特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；早上了喵～：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；我早已麻痹：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；早上了喵～：“我和路灯还不够？路灯又不会吐槽你。”；我早已麻痹：“？？？”；早上了喵～：“晚安”
Choice energy: 拱火：我早已麻痹负责把话题推高，早上了喵～负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小康养老院。视觉元素：花园、茶桌、软椅、零点钟楼、存档柜与结局门。核心物件：安眠躺椅。可带入区域 motif：零点钟楼、茶室值班表、安眠躺椅、结局门垫。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 我早已麻痹 portrait assets/imagegen/portraits/role_016.png, expressions {'neutral': 'assets/imagegen/expressions/role_016_neutral.png', 'happy': 'assets/imagegen/expressions/role_016_happy.png', 'tease': 'assets/imagegen/expressions/role_016_tease.png', 'serious': 'assets/imagegen/expressions/role_016_serious.png'}; 早上了喵～ portrait assets/imagegen/portraits/role_012.png, expressions {'neutral': 'assets/imagegen/expressions/role_012_neutral.png', 'happy': 'assets/imagegen/expressions/role_012_happy.png', 'tease': 'assets/imagegen/expressions/role_012_tease.png', 'serious': 'assets/imagegen/expressions/role_012_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 我早已麻痹（回声收束者）与早上了喵～（晨报铃使）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。我早已麻痹（回声收束者）：主色 #d8d8d8 / #c0c0c0，符号 圆形构图、月光丝带，梗种子 图包、图片、毛鸽、哥哥、健康；早上了喵～（晨报铃使）：主色 #603018 / #483018，符号 圆形构图、像素画笔，梗种子 超量、反叛、图包、弧形、图片。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“安眠躺椅”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_016_role_010 我早已麻痹 × 普罗米亚写真集：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_016_role_010.png`
- 剧情来源：`pair_role_016_role_010` / 自制异常与 bug 验收 / 动态拱火拆台型
- 实际场景：小康养老院（旧区域是否冲突：是）
- 核心物件：零点钟楼
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_016.png` + `assets/imagegen/portraits/role_010.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_016_role_010
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 我早已麻痹 × 普罗米亚写真集：先别急，这段算两个人都看见了。我早已麻痹和普罗米亚写真集不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 自制异常与 bug 验收；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：我早已麻痹和普罗米亚写真集在小康养老院碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。小康养老院这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小康养老院在记录这次相遇。
Dialogue basis: 我早已麻痹：“嘿，过来。小康养老院这边有个东西你肯定会感兴趣。”；普罗米亚写真集：“什么东西——又是你以为只有你一个人发现的那种？”；我早已麻痹：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；普罗米亚写真集：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；我早已麻痹：“？？？”；普罗米亚写真集：“妈妈”
Choice energy: 拱火：我早已麻痹负责把话题推高，普罗米亚写真集负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小康养老院。视觉元素：花园、茶桌、软椅、零点钟楼、存档柜与结局门。核心物件：零点钟楼。可带入区域 motif：零点钟楼、茶室值班表、安眠躺椅、结局门垫。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. 我早已麻痹 portrait assets/imagegen/portraits/role_016.png, expressions {'neutral': 'assets/imagegen/expressions/role_016_neutral.png', 'happy': 'assets/imagegen/expressions/role_016_happy.png', 'tease': 'assets/imagegen/expressions/role_016_tease.png', 'serious': 'assets/imagegen/expressions/role_016_serious.png'}; 普罗米亚写真集 portrait assets/imagegen/portraits/role_010.png, expressions {'neutral': 'assets/imagegen/expressions/role_010_neutral.png', 'happy': 'assets/imagegen/expressions/role_010_happy.png', 'tease': 'assets/imagegen/expressions/role_010_tease.png', 'serious': 'assets/imagegen/expressions/role_010_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 我早已麻痹（回声收束者）与普罗米亚写真集（星火影集师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。我早已麻痹（回声收束者）：主色 #d8d8d8 / #c0c0c0，符号 圆形构图、月光丝带，梗种子 图包、图片、毛鸽、哥哥、健康；普罗米亚写真集（星火影集师）：主色 #c0c0c0 / #d8d8d8，符号 星砂发饰、牌纹徽章，梗种子 图包、图片、截图、标题党、色值。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“零点钟楼”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_017_role_009 很复杂 × 多点关心：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_017_role_009.png`
- 剧情来源：`pair_role_017_role_009` / 重叠人影与新梗标题 / 动态拱火拆台型
- 实际场景：北境野地（旧区域是否冲突：是）
- 核心物件：溪边缓存
- 关系动作：一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：nosferatu_shadow, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_017.png` + `assets/imagegen/portraits/role_009.png`
- Meme/番剧构图：灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
- 封面/海报/梗图灵感：可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。
- 构图分析：用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。
- ACG/neta：灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_017_role_009
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 很复杂 × 多点关心：先别急，这段算两个人都看见了。很复杂和多点关心不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 重叠人影与新梗标题；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：很复杂和多点关心在北境野地碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 等一下——你刚才是不是在北境野地那边？我好像看到一个人影。 / 可能是我。也可能不是——北境野地这边回声多，人影有时候会重叠。 / 重叠的人影听起来像个新梗的标题。记下来。 / 你什么都记。上次记的「路灯复读事件」到现在还没下文。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是北境野地在记录这次相遇。
Dialogue basis: 很复杂：“等一下——你刚才是不是在北境野地那边？我好像看到一个人影。”；多点关心：“可能是我。也可能不是——北境野地这边回声多，人影有时候会重叠。”；很复杂：“重叠的人影听起来像个新梗的标题。记下来。”；多点关心：“你什么都记。上次记的「路灯复读事件」到现在还没下文。”；很复杂：“有感觉吗”；多点关心：“[[呵呵]]”
Choice energy: 拱火：很复杂负责把话题推高，多点关心负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：北境野地。视觉元素：树林、小溪、蘑菇、露营灯、信号塔、野花和石径。核心物件：溪边缓存。可带入区域 motif：野外信号塔、蘑菇路标、溪边缓存、露营留言火。
Reference frame: first inspect `.reference_cache/bond_cg_v3/nosferatu_shadow.png` (Nosferatu shadow silhouette composition, source Wikimedia Commons). Use it only as a composition storyboard: use the oversized-shadow skeleton: one character points at a suspicious overlapping shadow while the other records it as a new title-worthy incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the vampire silhouette, claws, stairs, or exact horror iconography.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 很复杂 portrait assets/imagegen/portraits/role_017.png, expressions {'neutral': 'assets/imagegen/expressions/role_017_neutral.png', 'happy': 'assets/imagegen/expressions/role_017_happy.png', 'tease': 'assets/imagegen/expressions/role_017_tease.png', 'serious': 'assets/imagegen/expressions/role_017_serious.png'}; 多点关心 portrait assets/imagegen/portraits/role_009.png, expressions {'neutral': 'assets/imagegen/expressions/role_009_neutral.png', 'happy': 'assets/imagegen/expressions/role_009_happy.png', 'tease': 'assets/imagegen/expressions/role_009_tease.png', 'serious': 'assets/imagegen/expressions/role_009_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 很复杂（分岔解码员）与多点关心（关心信标使）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。很复杂（分岔解码员）：主色 #d8c090 / #787860，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、NNZ；多点关心（关心信标使）：主色 #d8d8d8 / #d8c0d8，符号 星砂发饰、舞台票根，梗种子 图包、图片、截图、回复、Hxr。
Relationship acting: 一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。 围绕“溪边缓存”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
Cover/poster/meme inspiration: 可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_019_role_017 不好办 × 很复杂：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_019_role_017.png`
- 剧情来源：`pair_role_019_role_017` / 重叠人影与新梗标题 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：湖面倒影
- 关系动作：一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：nosferatu_shadow, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_019.png` + `assets/imagegen/portraits/role_017.png`
- Meme/番剧构图：灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
- 封面/海报/梗图灵感：可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。
- 构图分析：用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。
- ACG/neta：灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_019_role_017
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 不好办 × 很复杂：先别急，这段算两个人都看见了。不好办和很复杂不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 重叠人影与新梗标题；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：不好办和很复杂在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 等一下——你刚才是不是在湖边回声栈道那边？我好像看到一个人影。 / 可能是我。也可能不是——湖边回声栈道这边回声多，人影有时候会重叠。 / 重叠的人影听起来像个新梗的标题。记下来。 / 你什么都记。上次记的「路灯复读事件」到现在还没下文。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 不好办：“等一下——你刚才是不是在湖边回声栈道那边？我好像看到一个人影。”；很复杂：“可能是我。也可能不是——湖边回声栈道这边回声多，人影有时候会重叠。”；不好办：“重叠的人影听起来像个新梗的标题。记下来。”；很复杂：“你什么都记。上次记的「路灯复读事件」到现在还没下文。”；不好办：“有没有懂的”；很复杂：“有感觉吗”
Choice energy: 拱火：不好办负责把话题推高，很复杂负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：湖面倒影。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/nosferatu_shadow.png` (Nosferatu shadow silhouette composition, source Wikimedia Commons). Use it only as a composition storyboard: use the oversized-shadow skeleton: one character points at a suspicious overlapping shadow while the other records it as a new title-worthy incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the vampire silhouette, claws, stairs, or exact horror iconography.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 不好办 portrait assets/imagegen/portraits/role_019.png, expressions {'neutral': 'assets/imagegen/expressions/role_019_neutral.png', 'happy': 'assets/imagegen/expressions/role_019_happy.png', 'tease': 'assets/imagegen/expressions/role_019_tease.png', 'serious': 'assets/imagegen/expressions/role_019_serious.png'}; 很复杂 portrait assets/imagegen/portraits/role_017.png, expressions {'neutral': 'assets/imagegen/expressions/role_017_neutral.png', 'happy': 'assets/imagegen/expressions/role_017_happy.png', 'tease': 'assets/imagegen/expressions/role_017_tease.png', 'serious': 'assets/imagegen/expressions/role_017_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 不好办（未解事务官）与很复杂（分岔解码员）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。不好办（未解事务官）：主色 #f0d8d8 / #f0c0c0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、NNZ、哔哩；很复杂（分岔解码员）：主色 #d8c090 / #787860，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、NNZ。
Relationship acting: 一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。 围绕“湖面倒影”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
Cover/poster/meme inspiration: 可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_017_role_006 很复杂 × 力竭了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_017_role_006.png`
- 剧情来源：`pair_role_017_role_006` / 淡季、路灯与吐槽停顿 / 动态拱火拆台型
- 实际场景：北境野地（旧区域是否冲突：是）
- 核心物件：露营留言火
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_017.png` + `assets/imagegen/portraits/role_006.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_017_role_006
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 很复杂 × 力竭了：先别急，这段算两个人都看见了。很复杂和力竭了不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 淡季、路灯与吐槽停顿；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：很复杂和力竭了在北境野地碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天北境野地特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是北境野地在记录这次相遇。
Dialogue basis: 很复杂：“今天北境野地特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；力竭了：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；很复杂：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；力竭了：“我和路灯还不够？路灯又不会吐槽你。”；很复杂：“有感觉吗”；力竭了：“不赖”
Choice energy: 拱火：很复杂负责把话题推高，力竭了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：北境野地。视觉元素：树林、小溪、蘑菇、露营灯、信号塔、野花和石径。核心物件：露营留言火。可带入区域 motif：野外信号塔、蘑菇路标、溪边缓存、露营留言火。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 很复杂 portrait assets/imagegen/portraits/role_017.png, expressions {'neutral': 'assets/imagegen/expressions/role_017_neutral.png', 'happy': 'assets/imagegen/expressions/role_017_happy.png', 'tease': 'assets/imagegen/expressions/role_017_tease.png', 'serious': 'assets/imagegen/expressions/role_017_serious.png'}; 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 很复杂（分岔解码员）与力竭了（疲劳判定官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。很复杂（分岔解码员）：主色 #d8c090 / #787860，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、NNZ；力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“露营留言火”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_018_role_006 Mini Oreo × 力竭了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_018_role_006.png`
- 剧情来源：`pair_role_018_role_006` / 观测点与三行诗 / 动态拱火拆台型
- 实际场景：小康餐厅（旧区域是否冲突：否）
- 核心物件：吧台式餐桌灯
- 关系动作：一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：sherlock_jr_projection, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_018.png` + `assets/imagegen/portraits/role_006.png`
- Meme/番剧构图：电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
- 封面/海报/梗图灵感：可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。
- 构图分析：让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。
- ACG/neta：日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_018_role_006
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Mini Oreo × 力竭了：先别急，这段算两个人都看见了。Mini Oreo和力竭了不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 观测点与三行诗；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Mini Oreo和力竭了在小康餐厅碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 喂，过来坐。小康餐厅这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。 / 你今天不跑任务了？居然有时间坐着看灯。 / 任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。 / 三行——像三行诗。你是不是又在准备写什么东西？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小康餐厅在记录这次相遇。
Dialogue basis: Mini Oreo：“喂，过来坐。小康餐厅这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。”；力竭了：“你今天不跑任务了？居然有时间坐着看灯。”；Mini Oreo：“任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。”；力竭了：“三行——像三行诗。你是不是又在准备写什么东西？”；Mini Oreo：“不知道”；力竭了：“不赖”
Choice energy: 拱火：Mini Oreo负责把话题推高，力竭了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小康餐厅。视觉元素：暖黄灯、木桌、料理台、饮品柜、蒸汽、半糖裁判杯。核心物件：吧台式餐桌灯。可带入区域 motif：晚饭召集锅、半糖裁判杯、加饭按钮、蒸汽表情云。
Reference frame: first inspect `.reference_cache/bond_cg_v3/sherlock_jr_projection.jpg` (Sherlock Jr. poster projection/detective composition, source Wikimedia Commons). Use it only as a composition storyboard: use the projection-screen observation skeleton: two characters study light/reflection/core prop like a tiny cinema clue, offset rather than posed as a couple. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Buster Keaton, poster typography, magnifying-glass branding, or exact costume.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. Mini Oreo portrait assets/imagegen/portraits/role_018.png, expressions {'neutral': 'assets/imagegen/expressions/role_018_neutral.png', 'happy': 'assets/imagegen/expressions/role_018_happy.png', 'tease': 'assets/imagegen/expressions/role_018_tease.png', 'serious': 'assets/imagegen/expressions/role_018_serious.png'}; 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Mini Oreo（夹心观察员）与力竭了（疲劳判定官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Mini Oreo（夹心观察员）：主色 #f0d8a8 / #f0d8d8，符号 明亮眼神、餐厅小勺，梗种子 图包、图片、回复、确实、Oreo；力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ。
Relationship acting: 一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。 围绕“吧台式餐桌灯”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
Cover/poster/meme inspiration: 可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_018_role_008 Mini Oreo × 沉机：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_018_role_008.png`
- 剧情来源：`pair_role_018_role_008` / 重叠人影与新梗标题 / 动态拱火拆台型
- 实际场景：小康餐厅（旧区域是否冲突：否）
- 核心物件：蒸汽表情云
- 关系动作：一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：nosferatu_shadow, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_018.png` + `assets/imagegen/portraits/role_008.png`
- Meme/番剧构图：灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
- 封面/海报/梗图灵感：可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。
- 构图分析：用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。
- ACG/neta：灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_018_role_008
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Mini Oreo × 沉机：先别急，这段算两个人都看见了。Mini Oreo和沉机不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 重叠人影与新梗标题；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Mini Oreo和沉机在小康餐厅碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 等一下——你刚才是不是在小康餐厅那边？我好像看到一个人影。 / 可能是我。也可能不是——小康餐厅这边回声多，人影有时候会重叠。 / 重叠的人影听起来像个新梗的标题。记下来。 / 你什么都记。上次记的「路灯复读事件」到现在还没下文。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小康餐厅在记录这次相遇。
Dialogue basis: Mini Oreo：“等一下——你刚才是不是在小康餐厅那边？我好像看到一个人影。”；沉机：“可能是我。也可能不是——小康餐厅这边回声多，人影有时候会重叠。”；Mini Oreo：“重叠的人影听起来像个新梗的标题。记下来。”；沉机：“你什么都记。上次记的「路灯复读事件」到现在还没下文。”；Mini Oreo：“不知道”；沉机：“有没有懂的”
Choice energy: 拱火：Mini Oreo负责把话题推高，沉机负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小康餐厅。视觉元素：暖黄灯、木桌、料理台、饮品柜、蒸汽、半糖裁判杯。核心物件：蒸汽表情云。可带入区域 motif：晚饭召集锅、半糖裁判杯、加饭按钮、蒸汽表情云。
Reference frame: first inspect `.reference_cache/bond_cg_v3/nosferatu_shadow.png` (Nosferatu shadow silhouette composition, source Wikimedia Commons). Use it only as a composition storyboard: use the oversized-shadow skeleton: one character points at a suspicious overlapping shadow while the other records it as a new title-worthy incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the vampire silhouette, claws, stairs, or exact horror iconography.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. Mini Oreo portrait assets/imagegen/portraits/role_018.png, expressions {'neutral': 'assets/imagegen/expressions/role_018_neutral.png', 'happy': 'assets/imagegen/expressions/role_018_happy.png', 'tease': 'assets/imagegen/expressions/role_018_tease.png', 'serious': 'assets/imagegen/expressions/role_018_serious.png'}; 沉机 portrait assets/imagegen/portraits/role_008.png, expressions {'neutral': 'assets/imagegen/expressions/role_008_neutral.png', 'happy': 'assets/imagegen/expressions/role_008_happy.png', 'tease': 'assets/imagegen/expressions/role_008_tease.png', 'serious': 'assets/imagegen/expressions/role_008_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Mini Oreo（夹心观察员）与沉机（回声转译师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Mini Oreo（夹心观察员）：主色 #f0d8a8 / #f0d8d8，符号 明亮眼神、餐厅小勺，梗种子 图包、图片、回复、确实、Oreo；沉机（回声转译师）：主色 #d8a8a8 / #c090a8，符号 明亮眼神、餐厅小勺，梗种子 图片、图包、截图、标题党、色值。
Relationship acting: 一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。 围绕“蒸汽表情云”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
Cover/poster/meme inspiration: 可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_018_role_005 Mini Oreo × 青山照：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_018_role_005.png`
- 剧情来源：`pair_role_018_role_005` / 同步蹲点事件 / 动态拱火拆台型
- 实际场景：小康餐厅（旧区域是否冲突：是）
- 核心物件：晚饭召集锅
- 关系动作：一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：community_pizza_fire, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_018.png` + `assets/imagegen/portraits/role_005.png`
- Meme/番剧构图：进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
- 封面/海报/梗图灵感：可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。
- 构图分析：把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。
- ACG/neta：二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_018_role_005
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Mini Oreo × 青山照：先别急，这段算两个人都看见了。Mini Oreo和青山照不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 同步蹲点事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Mini Oreo和青山照在小康餐厅碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哎你也在——我还以为今天就我一个人在小康餐厅晃。 / 我也是刚到的。听到你在这边就过来了。 / 那正好，省得我发私信。过来帮我看个东西。 / 又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是小康餐厅在记录这次相遇。
Dialogue basis: Mini Oreo：“哎你也在——我还以为今天就我一个人在小康餐厅晃。”；青山照：“我也是刚到的。听到你在这边就过来了。”；Mini Oreo：“那正好，省得我发私信。过来帮我看个东西。”；青山照：“又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。”；Mini Oreo：“不知道”；青山照：“羡慕你”
Choice energy: 拱火：Mini Oreo负责把话题推高，青山照负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：小康餐厅。视觉元素：暖黄灯、木桌、料理台、饮品柜、蒸汽、半糖裁判杯。核心物件：晚饭召集锅。可带入区域 motif：晚饭召集锅、半糖裁判杯、加饭按钮、蒸汽表情云。
Reference frame: first inspect `.reference_cache/bond_cg_v3/community_pizza_fire.gif` (Community pizza fire reaction composition, source Know Your Meme). Use it only as a composition storyboard: use the doorway-arrival chaos skeleton: one character enters/catches the other in a too-obvious stakeout, with the core prop already causing a tiny incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original actors, room, fire, pizza box, show logo, or live-action look.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. Mini Oreo portrait assets/imagegen/portraits/role_018.png, expressions {'neutral': 'assets/imagegen/expressions/role_018_neutral.png', 'happy': 'assets/imagegen/expressions/role_018_happy.png', 'tease': 'assets/imagegen/expressions/role_018_tease.png', 'serious': 'assets/imagegen/expressions/role_018_serious.png'}; 青山照 portrait assets/imagegen/portraits/role_005.png, expressions {'neutral': 'assets/imagegen/expressions/role_005_neutral.png', 'happy': 'assets/imagegen/expressions/role_005_happy.png', 'tease': 'assets/imagegen/expressions/role_005_tease.png', 'serious': 'assets/imagegen/expressions/role_005_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Mini Oreo（夹心观察员）与青山照（青山回声调停者）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Mini Oreo（夹心观察员）：主色 #f0d8a8 / #f0d8d8，符号 明亮眼神、餐厅小勺，梗种子 图包、图片、回复、确实、Oreo；青山照（青山回声调停者）：主色 #f0d8d8 / #d8a8a8，符号 圆形构图、牌纹徽章，梗种子 Hxr、回复、多点、图包、关心。
Relationship acting: 一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。 围绕“晚饭召集锅”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
Cover/poster/meme inspiration: 可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_019_role_002 不好办 × Hxr：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_019_role_002.png`
- 剧情来源：`pair_role_019_role_002` / 自制异常与 bug 验收 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：否）
- 核心物件：月相开关
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_019.png` + `assets/imagegen/portraits/role_002.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_019_role_002
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 不好办 × Hxr：先别急，这段算两个人都看见了。不好办和Hxr不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 自制异常与 bug 验收；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：不好办和Hxr在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。湖边回声栈道这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 不好办：“嘿，过来。湖边回声栈道这边有个东西你肯定会感兴趣。”；Hxr：“什么东西——又是你以为只有你一个人发现的那种？”；不好办：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；Hxr：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；不好办：“有没有懂的”；Hxr：“羡慕你”
Choice energy: 拱火：不好办负责把话题推高，Hxr负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：月相开关。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. 不好办 portrait assets/imagegen/portraits/role_019.png, expressions {'neutral': 'assets/imagegen/expressions/role_019_neutral.png', 'happy': 'assets/imagegen/expressions/role_019_happy.png', 'tease': 'assets/imagegen/expressions/role_019_tease.png', 'serious': 'assets/imagegen/expressions/role_019_serious.png'}; Hxr portrait assets/imagegen/portraits/role_002.png, expressions {'neutral': 'assets/imagegen/expressions/role_002_neutral.png', 'happy': 'assets/imagegen/expressions/role_002_happy.png', 'tease': 'assets/imagegen/expressions/role_002_tease.png', 'serious': 'assets/imagegen/expressions/role_002_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 不好办（未解事务官）与Hxr（零点连招手）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。不好办（未解事务官）：主色 #f0d8d8 / #f0c0c0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、NNZ、哔哩；Hxr（零点连招手）：主色 #304860 / #304848，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、妈妈。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“月相开关”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_019_role_006 不好办 × 力竭了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_019_role_006.png`
- 剧情来源：`pair_role_019_role_006` / 第三个到与错过事件 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：栈道留言瓶
- 关系动作：一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：safety_last_clock, community_pizza_fire
- 立绘参考：`assets/imagegen/portraits/role_019.png` + `assets/imagegen/portraits/role_006.png`
- Meme/番剧构图：番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
- 封面/海报/梗图灵感：可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。
- 构图分析：核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。
- ACG/neta：错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_019_role_006
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 不好办 × 力竭了：先别急，这段算两个人都看见了。不好办和力竭了不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 第三个到与错过事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：不好办和力竭了在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哈，果然在。每次湖边回声栈道有什么事，你都是第一个到的。 / 这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。 / 走了？那他们看到了什么？ / 看到了你不在，就走了。所以你现在来了，刚好。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 不好办：“哈，果然在。每次湖边回声栈道有什么事，你都是第一个到的。”；力竭了：“这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。”；不好办：“走了？那他们看到了什么？”；力竭了：“看到了你不在，就走了。所以你现在来了，刚好。”；不好办：“有没有懂的”；力竭了：“不赖”
Choice energy: 拱火：不好办负责把话题推高，力竭了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：栈道留言瓶。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/safety_last_clock.jpg` (Safety Last! clock-hanging frame, source Wikimedia Commons). Use it only as a composition storyboard: use the giant deadline-object skeleton: one character clings to or rushes around a huge scene prop while the other points out they are already third to arrive. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Harold Lloyd, the city facade, exact clock face, or live-action monochrome look.. Backup reference(s): community_pizza_fire .reference_cache/bond_cg_v3/community_pizza_fire.gif (Doorway entry into a scene that has already gone off the rails; foreground newcomer, chaotic background, instant reaction comedy.).
Character reference images: before generating, inspect and follow these exact designs. 不好办 portrait assets/imagegen/portraits/role_019.png, expressions {'neutral': 'assets/imagegen/expressions/role_019_neutral.png', 'happy': 'assets/imagegen/expressions/role_019_happy.png', 'tease': 'assets/imagegen/expressions/role_019_tease.png', 'serious': 'assets/imagegen/expressions/role_019_serious.png'}; 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 不好办（未解事务官）与力竭了（疲劳判定官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。不好办（未解事务官）：主色 #f0d8d8 / #f0c0c0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、NNZ、哔哩；力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ。
Relationship acting: 一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。 围绕“栈道留言瓶”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
Cover/poster/meme inspiration: 可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_020_role_012 高手 × 早上了喵～：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_020_role_012.png`
- 剧情来源：`pair_role_020_role_012` / 第三个到与错过事件 / 动态拱火拆台型
- 实际场景：龙牌馆（旧区域是否冲突：是）
- 核心物件：龙角裁判席
- 关系动作：一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：safety_last_clock, community_pizza_fire
- 立绘参考：`assets/imagegen/portraits/role_020.png` + `assets/imagegen/portraits/role_012.png`
- Meme/番剧构图：番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
- 封面/海报/梗图灵感：可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。
- 构图分析：核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。
- ACG/neta：错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_020_role_012
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 高手 × 早上了喵～：先别急，这段算两个人都看见了。高手和早上了喵～不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 第三个到与错过事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：高手和早上了喵～在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哈，果然在。每次龙牌馆有什么事，你都是第一个到的。 / 这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。 / 走了？那他们看到了什么？ / 看到了你不在，就走了。所以你现在来了，刚好。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: 高手：“哈，果然在。每次龙牌馆有什么事，你都是第一个到的。”；早上了喵～：“这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。”；高手：“走了？那他们看到了什么？”；早上了喵～：“看到了你不在，就走了。所以你现在来了，刚好。”；高手：“好玩吗”；早上了喵～：“晚安”
Choice energy: 拱火：高手负责把话题推高，早上了喵～负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：龙角裁判席。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/safety_last_clock.jpg` (Safety Last! clock-hanging frame, source Wikimedia Commons). Use it only as a composition storyboard: use the giant deadline-object skeleton: one character clings to or rushes around a huge scene prop while the other points out they are already third to arrive. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Harold Lloyd, the city facade, exact clock face, or live-action monochrome look.. Backup reference(s): community_pizza_fire .reference_cache/bond_cg_v3/community_pizza_fire.gif (Doorway entry into a scene that has already gone off the rails; foreground newcomer, chaotic background, instant reaction comedy.).
Character reference images: before generating, inspect and follow these exact designs. 高手 portrait assets/imagegen/portraits/role_020.png, expressions {'neutral': 'assets/imagegen/expressions/role_020_neutral.png', 'happy': 'assets/imagegen/expressions/role_020_happy.png', 'tease': 'assets/imagegen/expressions/role_020_tease.png', 'serious': 'assets/imagegen/expressions/role_020_serious.png'}; 早上了喵～ portrait assets/imagegen/portraits/role_012.png, expressions {'neutral': 'assets/imagegen/expressions/role_012_neutral.png', 'happy': 'assets/imagegen/expressions/role_012_happy.png', 'tease': 'assets/imagegen/expressions/role_012_tease.png', 'serious': 'assets/imagegen/expressions/role_012_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 高手（牌桌高手）与早上了喵～（晨报铃使）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。高手（牌桌高手）：主色 #606060 / #787890，符号 圆形构图、牌纹徽章，梗种子 图包、图片、截图、...、沉机；早上了喵～（晨报铃使）：主色 #603018 / #483018，符号 圆形构图、像素画笔，梗种子 超量、反叛、图包、弧形、图片。
Relationship acting: 一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。 围绕“龙角裁判席”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
Cover/poster/meme inspiration: 可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_020_role_003 高手 × NNZ：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_020_role_003.png`
- 剧情来源：`pair_role_020_role_003` / 重叠人影与新梗标题 / 动态拱火拆台型
- 实际场景：龙牌馆（旧区域是否冲突：是）
- 核心物件：额外牌堆
- 关系动作：一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：nosferatu_shadow, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_020.png` + `assets/imagegen/portraits/role_003.png`
- Meme/番剧构图：灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
- 封面/海报/梗图灵感：可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。
- 构图分析：用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。
- ACG/neta：灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_020_role_003
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 高手 × NNZ：先别急，这段算两个人都看见了。高手和NNZ不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 重叠人影与新梗标题；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：高手和NNZ在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 等一下——你刚才是不是在龙牌馆那边？我好像看到一个人影。 / 可能是我。也可能不是——龙牌馆这边回声多，人影有时候会重叠。 / 重叠的人影听起来像个新梗的标题。记下来。 / 你什么都记。上次记的「路灯复读事件」到现在还没下文。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: 高手：“等一下——你刚才是不是在龙牌馆那边？我好像看到一个人影。”；NNZ：“可能是我。也可能不是——龙牌馆这边回声多，人影有时候会重叠。”；高手：“重叠的人影听起来像个新梗的标题。记下来。”；NNZ：“你什么都记。上次记的「路灯复读事件」到现在还没下文。”；高手：“好玩吗”；NNZ：“神秘”
Choice energy: 拱火：高手负责把话题推高，NNZ负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：额外牌堆。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/nosferatu_shadow.png` (Nosferatu shadow silhouette composition, source Wikimedia Commons). Use it only as a composition storyboard: use the oversized-shadow skeleton: one character points at a suspicious overlapping shadow while the other records it as a new title-worthy incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the vampire silhouette, claws, stairs, or exact horror iconography.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 高手 portrait assets/imagegen/portraits/role_020.png, expressions {'neutral': 'assets/imagegen/expressions/role_020_neutral.png', 'happy': 'assets/imagegen/expressions/role_020_happy.png', 'tease': 'assets/imagegen/expressions/role_020_tease.png', 'serious': 'assets/imagegen/expressions/role_020_serious.png'}; NNZ portrait assets/imagegen/portraits/role_003.png, expressions {'neutral': 'assets/imagegen/expressions/role_003_neutral.png', 'happy': 'assets/imagegen/expressions/role_003_happy.png', 'tease': 'assets/imagegen/expressions/role_003_tease.png', 'serious': 'assets/imagegen/expressions/role_003_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 高手（牌桌高手）与NNZ（星砂资料馆长）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。高手（牌桌高手）：主色 #606060 / #787890，符号 圆形构图、牌纹徽章，梗种子 图包、图片、截图、...、沉机；NNZ（星砂资料馆长）：主色 #f0f0f0 / #78a8a8，符号 圆形构图、餐厅小勺，梗种子 图包、图片、截图、标题党、色值。
Relationship acting: 一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。 围绕“额外牌堆”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
Cover/poster/meme inspiration: 可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_021_role_012 ❗您无法在已退出的群聊发送消息 × 早上了喵～：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_021_role_012.png`
- 剧情来源：`pair_role_021_role_012` / NPC行动路线与任务导航误判 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：像素屏幕
- 关系动作：一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：two_buttons, general_train_poster
- 立绘参考：`assets/imagegen/portraits/role_021.png` + `assets/imagegen/portraits/role_012.png`
- Meme/番剧构图：双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
- 封面/海报/梗图灵感：可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。
- 构图分析：画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。
- ACG/neta：NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_021_role_012
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: ❗您无法在已退出的群聊发送消息 × 早上了喵～：先别急，这段算两个人都看见了。❗您无法在已退出的群聊发送消息和早上了喵～不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: NPC行动路线与任务导航误判；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：❗您无法在已退出的群聊发送消息和早上了喵～在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 我就知道会在这里碰到你。你每次上线都在头像工坊——你的行动模式比NPC还好猜。 / 好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。 / 换地方是因为我在找人。有些线索只会出现在特定区域。 / 找什么人——你说的是任务目标还是你自己标错的？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: ❗您无法在已退出的群聊发送消息：“我就知道会在这里碰到你。你每次上线都在头像工坊——你的行动模式比NPC还好猜。”；早上了喵～：“好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。”；❗您无法在已退出的群聊发送消息：“换地方是因为我在找人。有些线索只会出现在特定区域。”；早上了喵～：“找什么人——你说的是任务目标还是你自己标错的？”；❗您无法在已退出的群聊发送消息：“有没有懂的”；早上了喵～：“晚安”
Choice energy: 拱火：❗您无法在已退出的群聊发送消息负责把话题推高，早上了喵～负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：像素屏幕。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/two_buttons.jpg` (Daily Struggle / Two Buttons decision composition, source Know Your Meme). Use it only as a composition storyboard: use the two-choice route skeleton: two unreadable quest paths or markers collide, and both characters realize the navigation logic is nonsense. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original man, table, button labels, red buttons, or readable text.. Backup reference(s): general_train_poster .reference_cache/bond_cg_v3/general_train_poster.jpg (Diagonal chase/action poster: vehicle or prop rushes through frame while characters react in comic panic.).
Character reference images: before generating, inspect and follow these exact designs. ❗您无法在已退出的群聊发送消息 portrait assets/imagegen/portraits/role_021.png, expressions {'neutral': 'assets/imagegen/expressions/role_021_neutral.png', 'happy': 'assets/imagegen/expressions/role_021_happy.png', 'tease': 'assets/imagegen/expressions/role_021_tease.png', 'serious': 'assets/imagegen/expressions/role_021_serious.png'}; 早上了喵～ portrait assets/imagegen/portraits/role_012.png, expressions {'neutral': 'assets/imagegen/expressions/role_012_neutral.png', 'happy': 'assets/imagegen/expressions/role_012_happy.png', 'tease': 'assets/imagegen/expressions/role_012_tease.png', 'serious': 'assets/imagegen/expressions/role_012_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: ❗您无法在已退出的群聊发送消息（星砂调色师）与早上了喵～（晨报铃使）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。❗您无法在已退出的群聊发送消息（星砂调色师）：主色 #907878 / #604848，符号 星砂发饰、月光丝带，梗种子 图包、图片、多点、截图、关心；早上了喵～（晨报铃使）：主色 #603018 / #483018，符号 圆形构图、像素画笔，梗种子 超量、反叛、图包、弧形、图片。
Relationship acting: 一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。 围绕“像素屏幕”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
Cover/poster/meme inspiration: 可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_021_role_008 ❗您无法在已退出的群聊发送消息 × 沉机：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_021_role_008.png`
- 剧情来源：`pair_role_021_role_008` / 第三个到与错过事件 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：是）
- 核心物件：图鉴抽屉
- 关系动作：一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：safety_last_clock, community_pizza_fire
- 立绘参考：`assets/imagegen/portraits/role_021.png` + `assets/imagegen/portraits/role_008.png`
- Meme/番剧构图：番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
- 封面/海报/梗图灵感：可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。
- 构图分析：核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。
- ACG/neta：错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_021_role_008
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: ❗您无法在已退出的群聊发送消息 × 沉机：先别急，这段算两个人都看见了。❗您无法在已退出的群聊发送消息和沉机不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 第三个到与错过事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：❗您无法在已退出的群聊发送消息和沉机在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哈，果然在。每次头像工坊有什么事，你都是第一个到的。 / 这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。 / 走了？那他们看到了什么？ / 看到了你不在，就走了。所以你现在来了，刚好。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: ❗您无法在已退出的群聊发送消息：“哈，果然在。每次头像工坊有什么事，你都是第一个到的。”；沉机：“这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。”；❗您无法在已退出的群聊发送消息：“走了？那他们看到了什么？”；沉机：“看到了你不在，就走了。所以你现在来了，刚好。”；❗您无法在已退出的群聊发送消息：“有没有懂的”；沉机：“有没有懂的”
Choice energy: 拱火：❗您无法在已退出的群聊发送消息负责把话题推高，沉机负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：图鉴抽屉。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/safety_last_clock.jpg` (Safety Last! clock-hanging frame, source Wikimedia Commons). Use it only as a composition storyboard: use the giant deadline-object skeleton: one character clings to or rushes around a huge scene prop while the other points out they are already third to arrive. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Harold Lloyd, the city facade, exact clock face, or live-action monochrome look.. Backup reference(s): community_pizza_fire .reference_cache/bond_cg_v3/community_pizza_fire.gif (Doorway entry into a scene that has already gone off the rails; foreground newcomer, chaotic background, instant reaction comedy.).
Character reference images: before generating, inspect and follow these exact designs. ❗您无法在已退出的群聊发送消息 portrait assets/imagegen/portraits/role_021.png, expressions {'neutral': 'assets/imagegen/expressions/role_021_neutral.png', 'happy': 'assets/imagegen/expressions/role_021_happy.png', 'tease': 'assets/imagegen/expressions/role_021_tease.png', 'serious': 'assets/imagegen/expressions/role_021_serious.png'}; 沉机 portrait assets/imagegen/portraits/role_008.png, expressions {'neutral': 'assets/imagegen/expressions/role_008_neutral.png', 'happy': 'assets/imagegen/expressions/role_008_happy.png', 'tease': 'assets/imagegen/expressions/role_008_tease.png', 'serious': 'assets/imagegen/expressions/role_008_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: ❗您无法在已退出的群聊发送消息（星砂调色师）与沉机（回声转译师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。❗您无法在已退出的群聊发送消息（星砂调色师）：主色 #907878 / #604848，符号 星砂发饰、月光丝带，梗种子 图包、图片、多点、截图、关心；沉机（回声转译师）：主色 #d8a8a8 / #c090a8，符号 明亮眼神、餐厅小勺，梗种子 图片、图包、截图、标题党、色值。
Relationship acting: 一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。 围绕“图鉴抽屉”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
Cover/poster/meme inspiration: 可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_021_role_013 ❗您无法在已退出的群聊发送消息 × 已电子ed：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_021_role_013.png`
- 剧情来源：`pair_role_021_role_013` / 同步蹲点事件 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：图鉴抽屉
- 关系动作：一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：community_pizza_fire, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_021.png` + `assets/imagegen/portraits/role_013.png`
- Meme/番剧构图：进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
- 封面/海报/梗图灵感：可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。
- 构图分析：把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。
- ACG/neta：二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_021_role_013
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: ❗您无法在已退出的群聊发送消息 × 已电子ed：先别急，这段算两个人都看见了。❗您无法在已退出的群聊发送消息和已电子ed不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 同步蹲点事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：❗您无法在已退出的群聊发送消息和已电子ed在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哎你也在——我还以为今天就我一个人在头像工坊晃。 / 我也是刚到的。听到你在这边就过来了。 / 那正好，省得我发私信。过来帮我看个东西。 / 又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: ❗您无法在已退出的群聊发送消息：“哎你也在——我还以为今天就我一个人在头像工坊晃。”；已电子ed：“我也是刚到的。听到你在这边就过来了。”；❗您无法在已退出的群聊发送消息：“那正好，省得我发私信。过来帮我看个东西。”；已电子ed：“又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。”；❗您无法在已退出的群聊发送消息：“有没有懂的”；已电子ed：“[[呵呵]]”
Choice energy: 拱火：❗您无法在已退出的群聊发送消息负责把话题推高，已电子ed负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：图鉴抽屉。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/community_pizza_fire.gif` (Community pizza fire reaction composition, source Know Your Meme). Use it only as a composition storyboard: use the doorway-arrival chaos skeleton: one character enters/catches the other in a too-obvious stakeout, with the core prop already causing a tiny incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original actors, room, fire, pizza box, show logo, or live-action look.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. ❗您无法在已退出的群聊发送消息 portrait assets/imagegen/portraits/role_021.png, expressions {'neutral': 'assets/imagegen/expressions/role_021_neutral.png', 'happy': 'assets/imagegen/expressions/role_021_happy.png', 'tease': 'assets/imagegen/expressions/role_021_tease.png', 'serious': 'assets/imagegen/expressions/role_021_serious.png'}; 已电子ed portrait assets/imagegen/portraits/role_013.png, expressions {'neutral': 'assets/imagegen/expressions/role_013_neutral.png', 'happy': 'assets/imagegen/expressions/role_013_happy.png', 'tease': 'assets/imagegen/expressions/role_013_tease.png', 'serious': 'assets/imagegen/expressions/role_013_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: ❗您无法在已退出的群聊发送消息（星砂调色师）与已电子ed（电子梦游者）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。❗您无法在已退出的群聊发送消息（星砂调色师）：主色 #907878 / #604848，符号 星砂发饰、月光丝带，梗种子 图包、图片、多点、截图、关心；已电子ed（电子梦游者）：主色 #c0f090 / #90a8c0，符号 星砂发饰、餐厅小勺，梗种子 图片、图包、截图、标题党、超量。
Relationship acting: 一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。 围绕“图鉴抽屉”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
Cover/poster/meme inspiration: 可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_022_role_006 N2过了不恨了 × 力竭了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_022_role_006.png`
- 剧情来源：`pair_role_022_role_006` / 淡季、路灯与吐槽停顿 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：是）
- 核心物件：像素屏幕
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_022.png` + `assets/imagegen/portraits/role_006.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_022_role_006
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: N2过了不恨了 × 力竭了：先别急，这段算两个人都看见了。N2过了不恨了和力竭了不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 淡季、路灯与吐槽停顿；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：N2过了不恨了和力竭了在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天头像工坊特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: N2过了不恨了：“今天头像工坊特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；力竭了：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；N2过了不恨了：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；力竭了：“我和路灯还不够？路灯又不会吐槽你。”；N2过了不恨了：“不恨了”；力竭了：“不赖”
Choice energy: 拱火：N2过了不恨了负责把话题推高，力竭了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：像素屏幕。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. N2过了不恨了 portrait assets/imagegen/portraits/role_022.png, expressions {'neutral': 'assets/imagegen/expressions/role_022_neutral.png', 'happy': 'assets/imagegen/expressions/role_022_happy.png', 'tease': 'assets/imagegen/expressions/role_022_tease.png', 'serious': 'assets/imagegen/expressions/role_022_serious.png'}; 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: N2过了不恨了（炼画调色师）与力竭了（疲劳判定官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。N2过了不恨了（炼画调色师）：主色 #486078 / #486090，符号 圆形构图、像素画笔，梗种子 图包、图片、回复、毛鸽、截图；力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“像素屏幕”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_022_role_021 N2过了不恨了 × ❗您无法在已退出的群聊发送消息：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_022_role_021.png`
- 剧情来源：`pair_role_022_role_021` / 第三个到与错过事件 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：图鉴抽屉
- 关系动作：一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：safety_last_clock, community_pizza_fire
- 立绘参考：`assets/imagegen/portraits/role_022.png` + `assets/imagegen/portraits/role_021.png`
- Meme/番剧构图：番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
- 封面/海报/梗图灵感：可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。
- 构图分析：核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。
- ACG/neta：错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_022_role_021
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: N2过了不恨了 × ❗您无法在已退出的群聊发送消息：先别急，这段算两个人都看见了。N2过了不恨了和❗您无法在已退出的群聊发送消息不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 第三个到与错过事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：N2过了不恨了和❗您无法在已退出的群聊发送消息在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哈，果然在。每次头像工坊有什么事，你都是第一个到的。 / 这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。 / 走了？那他们看到了什么？ / 看到了你不在，就走了。所以你现在来了，刚好。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: N2过了不恨了：“哈，果然在。每次头像工坊有什么事，你都是第一个到的。”；❗您无法在已退出的群聊发送消息：“这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。”；N2过了不恨了：“走了？那他们看到了什么？”；❗您无法在已退出的群聊发送消息：“看到了你不在，就走了。所以你现在来了，刚好。”；N2过了不恨了：“不恨了”；❗您无法在已退出的群聊发送消息：“有没有懂的”
Choice energy: 拱火：N2过了不恨了负责把话题推高，❗您无法在已退出的群聊发送消息负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：图鉴抽屉。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/safety_last_clock.jpg` (Safety Last! clock-hanging frame, source Wikimedia Commons). Use it only as a composition storyboard: use the giant deadline-object skeleton: one character clings to or rushes around a huge scene prop while the other points out they are already third to arrive. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Harold Lloyd, the city facade, exact clock face, or live-action monochrome look.. Backup reference(s): community_pizza_fire .reference_cache/bond_cg_v3/community_pizza_fire.gif (Doorway entry into a scene that has already gone off the rails; foreground newcomer, chaotic background, instant reaction comedy.).
Character reference images: before generating, inspect and follow these exact designs. N2过了不恨了 portrait assets/imagegen/portraits/role_022.png, expressions {'neutral': 'assets/imagegen/expressions/role_022_neutral.png', 'happy': 'assets/imagegen/expressions/role_022_happy.png', 'tease': 'assets/imagegen/expressions/role_022_tease.png', 'serious': 'assets/imagegen/expressions/role_022_serious.png'}; ❗您无法在已退出的群聊发送消息 portrait assets/imagegen/portraits/role_021.png, expressions {'neutral': 'assets/imagegen/expressions/role_021_neutral.png', 'happy': 'assets/imagegen/expressions/role_021_happy.png', 'tease': 'assets/imagegen/expressions/role_021_tease.png', 'serious': 'assets/imagegen/expressions/role_021_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: N2过了不恨了（炼画调色师）与❗您无法在已退出的群聊发送消息（星砂调色师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。N2过了不恨了（炼画调色师）：主色 #486078 / #486090，符号 圆形构图、像素画笔，梗种子 图包、图片、回复、毛鸽、截图；❗您无法在已退出的群聊发送消息（星砂调色师）：主色 #907878 / #604848，符号 星砂发饰、月光丝带，梗种子 图包、图片、多点、截图、关心。
Relationship acting: 一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。 围绕“图鉴抽屉”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
Cover/poster/meme inspiration: 可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_023_role_009 Du. × 多点关心：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_023_role_009.png`
- 剧情来源：`pair_role_023_role_009` / 名字回声事件 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：否）
- 核心物件：栈道留言瓶
- 关系动作：两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：is_this_a_pigeon, sherlock_jr_projection
- 立绘参考：`assets/imagegen/portraits/role_023.png` + `assets/imagegen/portraits/role_009.png`
- Meme/番剧构图：番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
- 封面/海报/梗图灵感：可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。
- 构图分析：用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。
- ACG/neta：角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_023_role_009
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Du. × 多点关心：先别急，这段算两个人都看见了。Du.和多点关心不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 名字回声事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Du.和多点关心在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 你刚才是不是叫我了？我好像听到有回声在喊我的名字。 / 没有——至少不是我叫的。可能是湖边回声栈道自己。有些地方会记住经常来的人的名字。 / 如果湖边回声栈道会记名字——那它现在应该能背出我们所有人的ID了。 / 它肯定能。我就是来确认它有没有拼错的。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: Du.：“你刚才是不是叫我了？我好像听到有回声在喊我的名字。”；多点关心：“没有——至少不是我叫的。可能是湖边回声栈道自己。有些地方会记住经常来的人的名字。”；Du.：“如果湖边回声栈道会记名字——那它现在应该能背出我们所有人的ID了。”；多点关心：“它肯定能。我就是来确认它有没有拼错的。”；Du.：“回声”；多点关心：“[[呵呵]]”
Choice energy: 拱火：Du.负责把话题推高，多点关心负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：栈道留言瓶。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/is_this_a_pigeon.jpg` (Is This a Pigeon? pointing mislabel composition, source Know Your Meme). Use it only as a composition storyboard: use the confident misidentification skeleton: one character points at a glowing record/name echo, the other checks the core prop with deadpan disbelief. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original anime character, butterfly, caption layout, labels, or readable text.. Backup reference(s): sherlock_jr_projection .reference_cache/bond_cg_v3/sherlock_jr_projection.jpg (Detective/film-within-film framing: a big framed view, a smaller observer figure, and a clue that invites shared inspection.).
Character reference images: before generating, inspect and follow these exact designs. Du. portrait assets/imagegen/portraits/role_023.png, expressions {'neutral': 'assets/imagegen/expressions/role_023_neutral.png', 'happy': 'assets/imagegen/expressions/role_023_happy.png', 'tease': 'assets/imagegen/expressions/role_023_tease.png', 'serious': 'assets/imagegen/expressions/role_023_serious.png'}; 多点关心 portrait assets/imagegen/portraits/role_009.png, expressions {'neutral': 'assets/imagegen/expressions/role_009_neutral.png', 'happy': 'assets/imagegen/expressions/role_009_happy.png', 'tease': 'assets/imagegen/expressions/role_009_tease.png', 'serious': 'assets/imagegen/expressions/role_009_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Du.（回声诗页客）与多点关心（关心信标使）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Du.（回声诗页客）：主色 #784830 / #603018，符号 发色锚点、餐厅小勺，梗种子 图包、图片、截图、写真集、普罗米；多点关心（关心信标使）：主色 #d8d8d8 / #d8c0d8，符号 星砂发饰、舞台票根，梗种子 图包、图片、截图、回复、Hxr。
Relationship acting: 两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。 围绕“栈道留言瓶”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
Cover/poster/meme inspiration: 可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_023_role_006 Du. × 力竭了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_023_role_006.png`
- 剧情来源：`pair_role_023_role_006` / 自制异常与 bug 验收 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：月相开关
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_023.png` + `assets/imagegen/portraits/role_006.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_023_role_006
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Du. × 力竭了：先别急，这段算两个人都看见了。Du.和力竭了不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 自制异常与 bug 验收；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Du.和力竭了在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。湖边回声栈道这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: Du.：“嘿，过来。湖边回声栈道这边有个东西你肯定会感兴趣。”；力竭了：“什么东西——又是你以为只有你一个人发现的那种？”；Du.：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；力竭了：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；Du.：“回声”；力竭了：“不赖”
Choice energy: 拱火：Du.负责把话题推高，力竭了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：月相开关。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. Du. portrait assets/imagegen/portraits/role_023.png, expressions {'neutral': 'assets/imagegen/expressions/role_023_neutral.png', 'happy': 'assets/imagegen/expressions/role_023_happy.png', 'tease': 'assets/imagegen/expressions/role_023_tease.png', 'serious': 'assets/imagegen/expressions/role_023_serious.png'}; 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Du.（回声诗页客）与力竭了（疲劳判定官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Du.（回声诗页客）：主色 #784830 / #603018，符号 发色锚点、餐厅小勺，梗种子 图包、图片、截图、写真集、普罗米；力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“月相开关”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_023_role_019 Du. × 不好办：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_023_role_019.png`
- 剧情来源：`pair_role_023_role_019` / 名字回声事件 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：否）
- 核心物件：栈道留言瓶
- 关系动作：两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：is_this_a_pigeon, sherlock_jr_projection
- 立绘参考：`assets/imagegen/portraits/role_023.png` + `assets/imagegen/portraits/role_019.png`
- Meme/番剧构图：番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
- 封面/海报/梗图灵感：可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。
- 构图分析：用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。
- ACG/neta：角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_023_role_019
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Du. × 不好办：先别急，这段算两个人都看见了。Du.和不好办不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 名字回声事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Du.和不好办在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 你刚才是不是叫我了？我好像听到有回声在喊我的名字。 / 没有——至少不是我叫的。可能是湖边回声栈道自己。有些地方会记住经常来的人的名字。 / 如果湖边回声栈道会记名字——那它现在应该能背出我们所有人的ID了。 / 它肯定能。我就是来确认它有没有拼错的。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: Du.：“你刚才是不是叫我了？我好像听到有回声在喊我的名字。”；不好办：“没有——至少不是我叫的。可能是湖边回声栈道自己。有些地方会记住经常来的人的名字。”；Du.：“如果湖边回声栈道会记名字——那它现在应该能背出我们所有人的ID了。”；不好办：“它肯定能。我就是来确认它有没有拼错的。”；Du.：“回声”；不好办：“有没有懂的”
Choice energy: 拱火：Du.负责把话题推高，不好办负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：栈道留言瓶。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/is_this_a_pigeon.jpg` (Is This a Pigeon? pointing mislabel composition, source Know Your Meme). Use it only as a composition storyboard: use the confident misidentification skeleton: one character points at a glowing record/name echo, the other checks the core prop with deadpan disbelief. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original anime character, butterfly, caption layout, labels, or readable text.. Backup reference(s): sherlock_jr_projection .reference_cache/bond_cg_v3/sherlock_jr_projection.jpg (Detective/film-within-film framing: a big framed view, a smaller observer figure, and a clue that invites shared inspection.).
Character reference images: before generating, inspect and follow these exact designs. Du. portrait assets/imagegen/portraits/role_023.png, expressions {'neutral': 'assets/imagegen/expressions/role_023_neutral.png', 'happy': 'assets/imagegen/expressions/role_023_happy.png', 'tease': 'assets/imagegen/expressions/role_023_tease.png', 'serious': 'assets/imagegen/expressions/role_023_serious.png'}; 不好办 portrait assets/imagegen/portraits/role_019.png, expressions {'neutral': 'assets/imagegen/expressions/role_019_neutral.png', 'happy': 'assets/imagegen/expressions/role_019_happy.png', 'tease': 'assets/imagegen/expressions/role_019_tease.png', 'serious': 'assets/imagegen/expressions/role_019_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Du.（回声诗页客）与不好办（未解事务官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Du.（回声诗页客）：主色 #784830 / #603018，符号 发色锚点、餐厅小勺，梗种子 图包、图片、截图、写真集、普罗米；不好办（未解事务官）：主色 #f0d8d8 / #f0c0c0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、NNZ、哔哩。
Relationship acting: 两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。 围绕“栈道留言瓶”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
Cover/poster/meme inspiration: 可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_025_role_020 敏龟的感头 × 高手：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_025_role_020.png`
- 剧情来源：`pair_role_025_role_020` / 同步蹲点事件 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：是）
- 核心物件：图鉴抽屉
- 关系动作：一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：community_pizza_fire, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_025.png` + `assets/imagegen/portraits/role_020.png`
- Meme/番剧构图：进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
- 封面/海报/梗图灵感：可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。
- 构图分析：把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。
- ACG/neta：二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_025_role_020
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 敏龟的感头 × 高手：先别急，这段算两个人都看见了。敏龟的感头和高手不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 同步蹲点事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：敏龟的感头和高手在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哎你也在——我还以为今天就我一个人在头像工坊晃。 / 我也是刚到的。听到你在这边就过来了。 / 那正好，省得我发私信。过来帮我看个东西。 / 又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: 敏龟的感头：“哎你也在——我还以为今天就我一个人在头像工坊晃。”；高手：“我也是刚到的。听到你在这边就过来了。”；敏龟的感头：“那正好，省得我发私信。过来帮我看个东西。”；高手：“又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。”；敏龟的感头：“感觉到了”；高手：“好玩吗”
Choice energy: 拱火：敏龟的感头负责把话题推高，高手负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：图鉴抽屉。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/community_pizza_fire.gif` (Community pizza fire reaction composition, source Know Your Meme). Use it only as a composition storyboard: use the doorway-arrival chaos skeleton: one character enters/catches the other in a too-obvious stakeout, with the core prop already causing a tiny incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original actors, room, fire, pizza box, show logo, or live-action look.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 敏龟的感头 portrait assets/imagegen/portraits/role_025.png, expressions {'neutral': 'assets/imagegen/expressions/role_025_neutral.png', 'happy': 'assets/imagegen/expressions/role_025_happy.png', 'tease': 'assets/imagegen/expressions/role_025_tease.png', 'serious': 'assets/imagegen/expressions/role_025_serious.png'}; 高手 portrait assets/imagegen/portraits/role_020.png, expressions {'neutral': 'assets/imagegen/expressions/role_020_neutral.png', 'happy': 'assets/imagegen/expressions/role_020_happy.png', 'tease': 'assets/imagegen/expressions/role_020_tease.png', 'serious': 'assets/imagegen/expressions/role_020_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 敏龟的感头（星砂调色师）与高手（牌桌高手）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。敏龟的感头（星砂调色师）：主色 #9090a8 / #a8a8c0，符号 明亮眼神、牌纹徽章，梗种子 图包、图片、截图、赛博、鳏夫；高手（牌桌高手）：主色 #606060 / #787890，符号 圆形构图、牌纹徽章，梗种子 图包、图片、截图、...、沉机。
Relationship acting: 一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。 围绕“图鉴抽屉”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
Cover/poster/meme inspiration: 可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_026_role_025 LQS群里指定丈夫 × 敏龟的感头：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_026_role_025.png`
- 剧情来源：`pair_role_026_role_025` / 第三个到与错过事件 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：栈道留言瓶
- 关系动作：一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：safety_last_clock, community_pizza_fire
- 立绘参考：`assets/imagegen/portraits/role_026.png` + `assets/imagegen/portraits/role_025.png`
- Meme/番剧构图：番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
- 封面/海报/梗图灵感：可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。
- 构图分析：核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。
- ACG/neta：错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_026_role_025
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: LQS群里指定丈夫 × 敏龟的感头：先别急，这段算两个人都看见了。LQS群里指定丈夫和敏龟的感头不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 第三个到与错过事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：LQS群里指定丈夫和敏龟的感头在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哈，果然在。每次湖边回声栈道有什么事，你都是第一个到的。 / 这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。 / 走了？那他们看到了什么？ / 看到了你不在，就走了。所以你现在来了，刚好。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: LQS群里指定丈夫：“哈，果然在。每次湖边回声栈道有什么事，你都是第一个到的。”；敏龟的感头：“这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。”；LQS群里指定丈夫：“走了？那他们看到了什么？”；敏龟的感头：“看到了你不在，就走了。所以你现在来了，刚好。”；LQS群里指定丈夫：“回忆”；敏龟的感头：“感觉到了”
Choice energy: 拱火：LQS群里指定丈夫负责把话题推高，敏龟的感头负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：栈道留言瓶。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/safety_last_clock.jpg` (Safety Last! clock-hanging frame, source Wikimedia Commons). Use it only as a composition storyboard: use the giant deadline-object skeleton: one character clings to or rushes around a huge scene prop while the other points out they are already third to arrive. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Harold Lloyd, the city facade, exact clock face, or live-action monochrome look.. Backup reference(s): community_pizza_fire .reference_cache/bond_cg_v3/community_pizza_fire.gif (Doorway entry into a scene that has already gone off the rails; foreground newcomer, chaotic background, instant reaction comedy.).
Character reference images: before generating, inspect and follow these exact designs. LQS群里指定丈夫 portrait assets/imagegen/portraits/role_026.png, expressions {'neutral': 'assets/imagegen/expressions/role_026_neutral.png', 'happy': 'assets/imagegen/expressions/role_026_happy.png', 'tease': 'assets/imagegen/expressions/role_026_tease.png', 'serious': 'assets/imagegen/expressions/role_026_serious.png'}; 敏龟的感头 portrait assets/imagegen/portraits/role_025.png, expressions {'neutral': 'assets/imagegen/expressions/role_025_neutral.png', 'happy': 'assets/imagegen/expressions/role_025_happy.png', 'tease': 'assets/imagegen/expressions/role_025_tease.png', 'serious': 'assets/imagegen/expressions/role_025_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: LQS群里指定丈夫（回声诗页客）与敏龟的感头（星砂调色师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。LQS群里指定丈夫（回声诗页客）：主色 #d8d8d8 / #a8a8a8，符号 圆形构图、月光丝带，梗种子 图包、图片、截图、沉机、NNZ；敏龟的感头（星砂调色师）：主色 #9090a8 / #a8a8c0，符号 明亮眼神、牌纹徽章，梗种子 图包、图片、截图、赛博、鳏夫。
Relationship acting: 一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。 围绕“栈道留言瓶”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
Cover/poster/meme inspiration: 可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_025_role_015 敏龟的感头 × 重新减肥：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_025_role_015.png`
- 剧情来源：`pair_role_025_role_015` / 观测点与三行诗 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：同步色板
- 关系动作：一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：sherlock_jr_projection, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_025.png` + `assets/imagegen/portraits/role_015.png`
- Meme/番剧构图：电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
- 封面/海报/梗图灵感：可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。
- 构图分析：让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。
- ACG/neta：日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_025_role_015
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 敏龟的感头 × 重新减肥：先别急，这段算两个人都看见了。敏龟的感头和重新减肥不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 观测点与三行诗；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：敏龟的感头和重新减肥在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 喂，过来坐。头像工坊这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。 / 你今天不跑任务了？居然有时间坐着看灯。 / 任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。 / 三行——像三行诗。你是不是又在准备写什么东西？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: 敏龟的感头：“喂，过来坐。头像工坊这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。”；重新减肥：“你今天不跑任务了？居然有时间坐着看灯。”；敏龟的感头：“任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。”；重新减肥：“三行——像三行诗。你是不是又在准备写什么东西？”；敏龟的感头：“感觉到了”；重新减肥：“[/敬礼]”
Choice energy: 拱火：敏龟的感头负责把话题推高，重新减肥负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：同步色板。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/sherlock_jr_projection.jpg` (Sherlock Jr. poster projection/detective composition, source Wikimedia Commons). Use it only as a composition storyboard: use the projection-screen observation skeleton: two characters study light/reflection/core prop like a tiny cinema clue, offset rather than posed as a couple. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Buster Keaton, poster typography, magnifying-glass branding, or exact costume.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 敏龟的感头 portrait assets/imagegen/portraits/role_025.png, expressions {'neutral': 'assets/imagegen/expressions/role_025_neutral.png', 'happy': 'assets/imagegen/expressions/role_025_happy.png', 'tease': 'assets/imagegen/expressions/role_025_tease.png', 'serious': 'assets/imagegen/expressions/role_025_serious.png'}; 重新减肥 portrait assets/imagegen/portraits/role_015.png, expressions {'neutral': 'assets/imagegen/expressions/role_015_neutral.png', 'happy': 'assets/imagegen/expressions/role_015_happy.png', 'tease': 'assets/imagegen/expressions/role_015_tease.png', 'serious': 'assets/imagegen/expressions/role_015_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 敏龟的感头（星砂调色师）与重新减肥（作息重启师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。敏龟的感头（星砂调色师）：主色 #9090a8 / #a8a8c0，符号 明亮眼神、牌纹徽章，梗种子 图包、图片、截图、赛博、鳏夫；重新减肥（作息重启师）：主色 #300018 / #180000，符号 发色锚点、牌纹徽章，梗种子 图包、图片、截图、小目标、感觉。
Relationship acting: 一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。 围绕“同步色板”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
Cover/poster/meme inspiration: 可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_032_role_026 猫耳半圆 × LQS群里指定丈夫：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_032_role_026.png`
- 剧情来源：`pair_role_032_role_026` / 自制异常与 bug 验收 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：否）
- 核心物件：月相开关
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_032.png` + `assets/imagegen/portraits/role_026.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_032_role_026
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 猫耳半圆 × LQS群里指定丈夫：先别急，这段算两个人都看见了。猫耳半圆和LQS群里指定丈夫不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 自制异常与 bug 验收；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：猫耳半圆和LQS群里指定丈夫在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。湖边回声栈道这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 猫耳半圆：“嘿，过来。湖边回声栈道这边有个东西你肯定会感兴趣。”；LQS群里指定丈夫：“什么东西——又是你以为只有你一个人发现的那种？”；猫耳半圆：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；LQS群里指定丈夫：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；猫耳半圆：“猫耳”；LQS群里指定丈夫：“回忆”
Choice energy: 拱火：猫耳半圆负责把话题推高，LQS群里指定丈夫负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：月相开关。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. 猫耳半圆 portrait assets/imagegen/portraits/role_032.png, expressions {'neutral': 'assets/imagegen/expressions/role_032_neutral.png', 'happy': 'assets/imagegen/expressions/role_032_happy.png', 'tease': 'assets/imagegen/expressions/role_032_tease.png', 'serious': 'assets/imagegen/expressions/role_032_serious.png'}; LQS群里指定丈夫 portrait assets/imagegen/portraits/role_026.png, expressions {'neutral': 'assets/imagegen/expressions/role_026_neutral.png', 'happy': 'assets/imagegen/expressions/role_026_happy.png', 'tease': 'assets/imagegen/expressions/role_026_tease.png', 'serious': 'assets/imagegen/expressions/role_026_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 猫耳半圆（回声诗页客）与LQS群里指定丈夫（回声诗页客）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。猫耳半圆（回声诗页客）：主色 #c0d8d8 / #d8d8d8，符号 星砂发饰、像素画笔，梗种子 图包、图片、回复、截图、哥哥；LQS群里指定丈夫（回声诗页客）：主色 #d8d8d8 / #a8a8a8，符号 圆形构图、月光丝带，梗种子 图包、图片、截图、沉机、NNZ。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“月相开关”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_026_role_022 LQS群里指定丈夫 × N2过了不恨了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_026_role_022.png`
- 剧情来源：`pair_role_026_role_022` / 淡季、路灯与吐槽停顿 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：留言灯
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_026.png` + `assets/imagegen/portraits/role_022.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_026_role_022
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: LQS群里指定丈夫 × N2过了不恨了：先别急，这段算两个人都看见了。LQS群里指定丈夫和N2过了不恨了不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 淡季、路灯与吐槽停顿；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：LQS群里指定丈夫和N2过了不恨了在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天湖边回声栈道特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: LQS群里指定丈夫：“今天湖边回声栈道特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；N2过了不恨了：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；LQS群里指定丈夫：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；N2过了不恨了：“我和路灯还不够？路灯又不会吐槽你。”；LQS群里指定丈夫：“回忆”；N2过了不恨了：“不恨了”
Choice energy: 拱火：LQS群里指定丈夫负责把话题推高，N2过了不恨了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：留言灯。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. LQS群里指定丈夫 portrait assets/imagegen/portraits/role_026.png, expressions {'neutral': 'assets/imagegen/expressions/role_026_neutral.png', 'happy': 'assets/imagegen/expressions/role_026_happy.png', 'tease': 'assets/imagegen/expressions/role_026_tease.png', 'serious': 'assets/imagegen/expressions/role_026_serious.png'}; N2过了不恨了 portrait assets/imagegen/portraits/role_022.png, expressions {'neutral': 'assets/imagegen/expressions/role_022_neutral.png', 'happy': 'assets/imagegen/expressions/role_022_happy.png', 'tease': 'assets/imagegen/expressions/role_022_tease.png', 'serious': 'assets/imagegen/expressions/role_022_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: LQS群里指定丈夫（回声诗页客）与N2过了不恨了（炼画调色师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。LQS群里指定丈夫（回声诗页客）：主色 #d8d8d8 / #a8a8a8，符号 圆形构图、月光丝带，梗种子 图包、图片、截图、沉机、NNZ；N2过了不恨了（炼画调色师）：主色 #486078 / #486090，符号 圆形构图、像素画笔，梗种子 图包、图片、回复、毛鸽、截图。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“留言灯”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_027_role_023 Dark Kami Slayer × Du.：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_027_role_023.png`
- 剧情来源：`pair_role_027_role_023` / 同步蹲点事件 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：是）
- 核心物件：图鉴抽屉
- 关系动作：一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：community_pizza_fire, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_027.png` + `assets/imagegen/portraits/role_023.png`
- Meme/番剧构图：进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
- 封面/海报/梗图灵感：可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。
- 构图分析：把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。
- ACG/neta：二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_027_role_023
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Dark Kami Slayer × Du.：先别急，这段算两个人都看见了。Dark Kami Slayer和Du.不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 同步蹲点事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Dark Kami Slayer和Du.在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哎你也在——我还以为今天就我一个人在头像工坊晃。 / 我也是刚到的。听到你在这边就过来了。 / 那正好，省得我发私信。过来帮我看个东西。 / 又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: Dark Kami Slayer：“哎你也在——我还以为今天就我一个人在头像工坊晃。”；Du.：“我也是刚到的。听到你在这边就过来了。”；Dark Kami Slayer：“那正好，省得我发私信。过来帮我看个东西。”；Du.：“又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。”；Dark Kami Slayer：“像素之力”；Du.：“回声”
Choice energy: 拱火：Dark Kami Slayer负责把话题推高，Du.负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：图鉴抽屉。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/community_pizza_fire.gif` (Community pizza fire reaction composition, source Know Your Meme). Use it only as a composition storyboard: use the doorway-arrival chaos skeleton: one character enters/catches the other in a too-obvious stakeout, with the core prop already causing a tiny incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original actors, room, fire, pizza box, show logo, or live-action look.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. Dark Kami Slayer portrait assets/imagegen/portraits/role_027.png, expressions {'neutral': 'assets/imagegen/expressions/role_027_neutral.png', 'happy': 'assets/imagegen/expressions/role_027_happy.png', 'tease': 'assets/imagegen/expressions/role_027_tease.png', 'serious': 'assets/imagegen/expressions/role_027_serious.png'}; Du. portrait assets/imagegen/portraits/role_023.png, expressions {'neutral': 'assets/imagegen/expressions/role_023_neutral.png', 'happy': 'assets/imagegen/expressions/role_023_happy.png', 'tease': 'assets/imagegen/expressions/role_023_tease.png', 'serious': 'assets/imagegen/expressions/role_023_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Dark Kami Slayer（炼画调色师）与Du.（回声诗页客）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Dark Kami Slayer（炼画调色师）：主色 #303048 / #303030，符号 圆形构图、像素画笔，梗种子 图包、图片、截图、标题党、NNZ；Du.（回声诗页客）：主色 #784830 / #603018，符号 发色锚点、餐厅小勺，梗种子 图包、图片、截图、写真集、普罗米。
Relationship acting: 一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。 围绕“图鉴抽屉”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
Cover/poster/meme inspiration: 可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_027_role_016 Dark Kami Slayer × 我早已麻痹：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_027_role_016.png`
- 剧情来源：`pair_role_027_role_016` / 同步蹲点事件 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：是）
- 核心物件：图鉴抽屉
- 关系动作：一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：community_pizza_fire, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_027.png` + `assets/imagegen/portraits/role_016.png`
- Meme/番剧构图：进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
- 封面/海报/梗图灵感：可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。
- 构图分析：把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。
- ACG/neta：二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_027_role_016
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Dark Kami Slayer × 我早已麻痹：先别急，这段算两个人都看见了。Dark Kami Slayer和我早已麻痹不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 同步蹲点事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Dark Kami Slayer和我早已麻痹在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哎你也在——我还以为今天就我一个人在头像工坊晃。 / 我也是刚到的。听到你在这边就过来了。 / 那正好，省得我发私信。过来帮我看个东西。 / 又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: Dark Kami Slayer：“哎你也在——我还以为今天就我一个人在头像工坊晃。”；我早已麻痹：“我也是刚到的。听到你在这边就过来了。”；Dark Kami Slayer：“那正好，省得我发私信。过来帮我看个东西。”；我早已麻痹：“又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。”；Dark Kami Slayer：“像素之力”；我早已麻痹：“？？？”
Choice energy: 拱火：Dark Kami Slayer负责把话题推高，我早已麻痹负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：图鉴抽屉。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/community_pizza_fire.gif` (Community pizza fire reaction composition, source Know Your Meme). Use it only as a composition storyboard: use the doorway-arrival chaos skeleton: one character enters/catches the other in a too-obvious stakeout, with the core prop already causing a tiny incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original actors, room, fire, pizza box, show logo, or live-action look.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. Dark Kami Slayer portrait assets/imagegen/portraits/role_027.png, expressions {'neutral': 'assets/imagegen/expressions/role_027_neutral.png', 'happy': 'assets/imagegen/expressions/role_027_happy.png', 'tease': 'assets/imagegen/expressions/role_027_tease.png', 'serious': 'assets/imagegen/expressions/role_027_serious.png'}; 我早已麻痹 portrait assets/imagegen/portraits/role_016.png, expressions {'neutral': 'assets/imagegen/expressions/role_016_neutral.png', 'happy': 'assets/imagegen/expressions/role_016_happy.png', 'tease': 'assets/imagegen/expressions/role_016_tease.png', 'serious': 'assets/imagegen/expressions/role_016_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Dark Kami Slayer（炼画调色师）与我早已麻痹（回声收束者）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Dark Kami Slayer（炼画调色师）：主色 #303048 / #303030，符号 圆形构图、像素画笔，梗种子 图包、图片、截图、标题党、NNZ；我早已麻痹（回声收束者）：主色 #d8d8d8 / #c0c0c0，符号 圆形构图、月光丝带，梗种子 图包、图片、毛鸽、哥哥、健康。
Relationship acting: 一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。 围绕“图鉴抽屉”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
Cover/poster/meme inspiration: 可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_027_role_005 Dark Kami Slayer × 青山照：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_027_role_005.png`
- 剧情来源：`pair_role_027_role_005` / 自制异常与 bug 验收 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：是）
- 核心物件：像素屏幕
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_027.png` + `assets/imagegen/portraits/role_005.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_027_role_005
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Dark Kami Slayer × 青山照：先别急，这段算两个人都看见了。Dark Kami Slayer和青山照不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 自制异常与 bug 验收；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Dark Kami Slayer和青山照在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。头像工坊这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: Dark Kami Slayer：“嘿，过来。头像工坊这边有个东西你肯定会感兴趣。”；青山照：“什么东西——又是你以为只有你一个人发现的那种？”；Dark Kami Slayer：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；青山照：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；Dark Kami Slayer：“像素之力”；青山照：“羡慕你”
Choice energy: 拱火：Dark Kami Slayer负责把话题推高，青山照负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：像素屏幕。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. Dark Kami Slayer portrait assets/imagegen/portraits/role_027.png, expressions {'neutral': 'assets/imagegen/expressions/role_027_neutral.png', 'happy': 'assets/imagegen/expressions/role_027_happy.png', 'tease': 'assets/imagegen/expressions/role_027_tease.png', 'serious': 'assets/imagegen/expressions/role_027_serious.png'}; 青山照 portrait assets/imagegen/portraits/role_005.png, expressions {'neutral': 'assets/imagegen/expressions/role_005_neutral.png', 'happy': 'assets/imagegen/expressions/role_005_happy.png', 'tease': 'assets/imagegen/expressions/role_005_tease.png', 'serious': 'assets/imagegen/expressions/role_005_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Dark Kami Slayer（炼画调色师）与青山照（青山回声调停者）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Dark Kami Slayer（炼画调色师）：主色 #303048 / #303030，符号 圆形构图、像素画笔，梗种子 图包、图片、截图、标题党、NNZ；青山照（青山回声调停者）：主色 #f0d8d8 / #d8a8a8，符号 圆形构图、牌纹徽章，梗种子 Hxr、回复、多点、图包、关心。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“像素屏幕”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_033_role_028 Celestial × ナナリ：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_033_role_028.png`
- 剧情来源：`pair_role_033_role_028` / 同步蹲点事件 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：栈道留言瓶
- 关系动作：一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：community_pizza_fire, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_033.png` + `assets/imagegen/portraits/role_028.png`
- Meme/番剧构图：进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
- 封面/海报/梗图灵感：可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。
- 构图分析：把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。
- ACG/neta：二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_033_role_028
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Celestial × ナナリ：先别急，这段算两个人都看见了。Celestial和ナナリ不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 同步蹲点事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Celestial和ナナリ在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哎你也在——我还以为今天就我一个人在湖边回声栈道晃。 / 我也是刚到的。听到你在这边就过来了。 / 那正好，省得我发私信。过来帮我看个东西。 / 又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: Celestial：“哎你也在——我还以为今天就我一个人在湖边回声栈道晃。”；ナナリ：“我也是刚到的。听到你在这边就过来了。”；Celestial：“那正好，省得我发私信。过来帮我看个东西。”；ナナリ：“又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。”；Celestial：“星空”；ナナリ：“判定”
Choice energy: 拱火：Celestial负责把话题推高，ナナリ负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：栈道留言瓶。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/community_pizza_fire.gif` (Community pizza fire reaction composition, source Know Your Meme). Use it only as a composition storyboard: use the doorway-arrival chaos skeleton: one character enters/catches the other in a too-obvious stakeout, with the core prop already causing a tiny incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original actors, room, fire, pizza box, show logo, or live-action look.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. Celestial portrait assets/imagegen/portraits/role_033.png, expressions {'neutral': 'assets/imagegen/expressions/role_033_neutral.png', 'happy': 'assets/imagegen/expressions/role_033_happy.png', 'tease': 'assets/imagegen/expressions/role_033_tease.png', 'serious': 'assets/imagegen/expressions/role_033_serious.png'}; ナナリ portrait assets/imagegen/portraits/role_028.png, expressions {'neutral': 'assets/imagegen/expressions/role_028_neutral.png', 'happy': 'assets/imagegen/expressions/role_028_happy.png', 'tease': 'assets/imagegen/expressions/role_028_tease.png', 'serious': 'assets/imagegen/expressions/role_028_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Celestial（回声诗页客）与ナナリ（判定判官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Celestial（回声诗页客）：主色 #787860 / #786048，符号 星砂发饰、餐厅小勺，梗种子 截图、羡慕、图片、图包、哥哥；ナナリ（判定判官）：主色 #c07890 / #c090a8，符号 圆形构图、餐厅小勺，梗种子 柯林斯、家族、老大、布丁、尾巴。
Relationship acting: 一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。 围绕“栈道留言瓶”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
Cover/poster/meme inspiration: 可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_028_role_017 ナナリ × 很复杂：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_028_role_017.png`
- 剧情来源：`pair_role_028_role_017` / NPC行动路线与任务导航误判 / 动态拱火拆台型
- 实际场景：龙牌馆（旧区域是否冲突：是）
- 核心物件：无效门禁
- 关系动作：一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：two_buttons, general_train_poster
- 立绘参考：`assets/imagegen/portraits/role_028.png` + `assets/imagegen/portraits/role_017.png`
- Meme/番剧构图：双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
- 封面/海报/梗图灵感：可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。
- 构图分析：画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。
- ACG/neta：NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_028_role_017
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: ナナリ × 很复杂：先别急，这段算两个人都看见了。ナナリ和很复杂不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: NPC行动路线与任务导航误判；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：ナナリ和很复杂在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 我就知道会在这里碰到你。你每次上线都在龙牌馆——你的行动模式比NPC还好猜。 / 好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。 / 换地方是因为我在找人。有些线索只会出现在特定区域。 / 找什么人——你说的是任务目标还是你自己标错的？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: ナナリ：“我就知道会在这里碰到你。你每次上线都在龙牌馆——你的行动模式比NPC还好猜。”；很复杂：“好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。”；ナナリ：“换地方是因为我在找人。有些线索只会出现在特定区域。”；很复杂：“找什么人——你说的是任务目标还是你自己标错的？”；ナナリ：“判定”；很复杂：“有感觉吗”
Choice energy: 拱火：ナナリ负责把话题推高，很复杂负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：无效门禁。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/two_buttons.jpg` (Daily Struggle / Two Buttons decision composition, source Know Your Meme). Use it only as a composition storyboard: use the two-choice route skeleton: two unreadable quest paths or markers collide, and both characters realize the navigation logic is nonsense. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original man, table, button labels, red buttons, or readable text.. Backup reference(s): general_train_poster .reference_cache/bond_cg_v3/general_train_poster.jpg (Diagonal chase/action poster: vehicle or prop rushes through frame while characters react in comic panic.).
Character reference images: before generating, inspect and follow these exact designs. ナナリ portrait assets/imagegen/portraits/role_028.png, expressions {'neutral': 'assets/imagegen/expressions/role_028_neutral.png', 'happy': 'assets/imagegen/expressions/role_028_happy.png', 'tease': 'assets/imagegen/expressions/role_028_tease.png', 'serious': 'assets/imagegen/expressions/role_028_serious.png'}; 很复杂 portrait assets/imagegen/portraits/role_017.png, expressions {'neutral': 'assets/imagegen/expressions/role_017_neutral.png', 'happy': 'assets/imagegen/expressions/role_017_happy.png', 'tease': 'assets/imagegen/expressions/role_017_tease.png', 'serious': 'assets/imagegen/expressions/role_017_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: ナナリ（判定判官）与很复杂（分岔解码员）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。ナナリ（判定判官）：主色 #c07890 / #c090a8，符号 圆形构图、餐厅小勺，梗种子 柯林斯、家族、老大、布丁、尾巴；很复杂（分岔解码员）：主色 #d8c090 / #787860，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、NNZ。
Relationship acting: 一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。 围绕“无效门禁”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
Cover/poster/meme inspiration: 可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_028_role_031 ナナリ × 六界三鲜：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_028_role_031.png`
- 剧情来源：`pair_role_028_role_031` / 名字回声事件 / 动态拱火拆台型
- 实际场景：龙牌馆（旧区域是否冲突：是）
- 核心物件：翻车记录板
- 关系动作：两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：is_this_a_pigeon, sherlock_jr_projection
- 立绘参考：`assets/imagegen/portraits/role_028.png` + `assets/imagegen/portraits/role_031.png`
- Meme/番剧构图：番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
- 封面/海报/梗图灵感：可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。
- 构图分析：用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。
- ACG/neta：角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_028_role_031
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: ナナリ × 六界三鲜：先别急，这段算两个人都看见了。ナナリ和六界三鲜不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 名字回声事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：ナナリ和六界三鲜在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 你刚才是不是叫我了？我好像听到有回声在喊我的名字。 / 没有——至少不是我叫的。可能是龙牌馆自己。有些地方会记住经常来的人的名字。 / 如果龙牌馆会记名字——那它现在应该能背出我们所有人的ID了。 / 它肯定能。我就是来确认它有没有拼错的。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: ナナリ：“你刚才是不是叫我了？我好像听到有回声在喊我的名字。”；六界三鲜：“没有——至少不是我叫的。可能是龙牌馆自己。有些地方会记住经常来的人的名字。”；ナナリ：“如果龙牌馆会记名字——那它现在应该能背出我们所有人的ID了。”；六界三鲜：“它肯定能。我就是来确认它有没有拼错的。”；ナナリ：“判定”；六界三鲜：“三鲜”
Choice energy: 拱火：ナナリ负责把话题推高，六界三鲜负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：翻车记录板。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/is_this_a_pigeon.jpg` (Is This a Pigeon? pointing mislabel composition, source Know Your Meme). Use it only as a composition storyboard: use the confident misidentification skeleton: one character points at a glowing record/name echo, the other checks the core prop with deadpan disbelief. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original anime character, butterfly, caption layout, labels, or readable text.. Backup reference(s): sherlock_jr_projection .reference_cache/bond_cg_v3/sherlock_jr_projection.jpg (Detective/film-within-film framing: a big framed view, a smaller observer figure, and a clue that invites shared inspection.).
Character reference images: before generating, inspect and follow these exact designs. ナナリ portrait assets/imagegen/portraits/role_028.png, expressions {'neutral': 'assets/imagegen/expressions/role_028_neutral.png', 'happy': 'assets/imagegen/expressions/role_028_happy.png', 'tease': 'assets/imagegen/expressions/role_028_tease.png', 'serious': 'assets/imagegen/expressions/role_028_serious.png'}; 六界三鲜 portrait assets/imagegen/portraits/role_031.png, expressions {'neutral': 'assets/imagegen/expressions/role_031_neutral.png', 'happy': 'assets/imagegen/expressions/role_031_happy.png', 'tease': 'assets/imagegen/expressions/role_031_tease.png', 'serious': 'assets/imagegen/expressions/role_031_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: ナナリ（判定判官）与六界三鲜（星砂调色师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。ナナリ（判定判官）：主色 #c07890 / #c090a8，符号 圆形构图、餐厅小勺，梗种子 柯林斯、家族、老大、布丁、尾巴；六界三鲜（星砂调色师）：主色 #181818 / #303030，符号 明亮眼神、月光丝带，梗种子 表情、NNZ、羡慕、回复、沉机。
Relationship acting: 两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。 围绕“翻车记录板”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
Cover/poster/meme inspiration: 可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_029_role_019 kuro × 不好办：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_029_role_019.png`
- 剧情来源：`pair_role_029_role_019` / 观测点与三行诗 / 动态拱火拆台型
- 实际场景：龙牌馆（旧区域是否冲突：是）
- 核心物件：龙角裁判席
- 关系动作：一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：sherlock_jr_projection, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_029.png` + `assets/imagegen/portraits/role_019.png`
- Meme/番剧构图：电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
- 封面/海报/梗图灵感：可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。
- 构图分析：让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。
- ACG/neta：日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_029_role_019
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: kuro × 不好办：先别急，这段算两个人都看见了。kuro和不好办不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 观测点与三行诗；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：kuro和不好办在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 喂，过来坐。龙牌馆这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。 / 你今天不跑任务了？居然有时间坐着看灯。 / 任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。 / 三行——像三行诗。你是不是又在准备写什么东西？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: kuro：“喂，过来坐。龙牌馆这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。”；不好办：“你今天不跑任务了？居然有时间坐着看灯。”；kuro：“任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。”；不好办：“三行——像三行诗。你是不是又在准备写什么东西？”；kuro：“战报”；不好办：“有没有懂的”
Choice energy: 拱火：kuro负责把话题推高，不好办负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：龙角裁判席。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/sherlock_jr_projection.jpg` (Sherlock Jr. poster projection/detective composition, source Wikimedia Commons). Use it only as a composition storyboard: use the projection-screen observation skeleton: two characters study light/reflection/core prop like a tiny cinema clue, offset rather than posed as a couple. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Buster Keaton, poster typography, magnifying-glass branding, or exact costume.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. kuro portrait assets/imagegen/portraits/role_029.png, expressions {'neutral': 'assets/imagegen/expressions/role_029_neutral.png', 'happy': 'assets/imagegen/expressions/role_029_happy.png', 'tease': 'assets/imagegen/expressions/role_029_tease.png', 'serious': 'assets/imagegen/expressions/role_029_serious.png'}; 不好办 portrait assets/imagegen/portraits/role_019.png, expressions {'neutral': 'assets/imagegen/expressions/role_019_neutral.png', 'happy': 'assets/imagegen/expressions/role_019_happy.png', 'tease': 'assets/imagegen/expressions/role_019_tease.png', 'serious': 'assets/imagegen/expressions/role_019_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: kuro（判定判官）与不好办（未解事务官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。kuro（判定判官）：主色 #d8d8d8 / #d8c0c0，符号 发色锚点、舞台票根，梗种子 截图、图片、图包、标题党、表情；不好办（未解事务官）：主色 #f0d8d8 / #f0c0c0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、NNZ、哔哩。
Relationship acting: 一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。 围绕“龙角裁判席”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
Cover/poster/meme inspiration: 可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_029_role_003 kuro × NNZ：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_029_role_003.png`
- 剧情来源：`pair_role_029_role_003` / 第三个到与错过事件 / 动态拱火拆台型
- 实际场景：龙牌馆（旧区域是否冲突：否）
- 核心物件：龙角裁判席
- 关系动作：一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：safety_last_clock, community_pizza_fire
- 立绘参考：`assets/imagegen/portraits/role_029.png` + `assets/imagegen/portraits/role_003.png`
- Meme/番剧构图：番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
- 封面/海报/梗图灵感：可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。
- 构图分析：核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。
- ACG/neta：错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_029_role_003
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: kuro × NNZ：先别急，这段算两个人都看见了。kuro和NNZ不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 第三个到与错过事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：kuro和NNZ在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哈，果然在。每次龙牌馆有什么事，你都是第一个到的。 / 这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。 / 走了？那他们看到了什么？ / 看到了你不在，就走了。所以你现在来了，刚好。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: kuro：“哈，果然在。每次龙牌馆有什么事，你都是第一个到的。”；NNZ：“这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。”；kuro：“走了？那他们看到了什么？”；NNZ：“看到了你不在，就走了。所以你现在来了，刚好。”；kuro：“战报”；NNZ：“神秘”
Choice energy: 拱火：kuro负责把话题推高，NNZ负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：龙角裁判席。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/safety_last_clock.jpg` (Safety Last! clock-hanging frame, source Wikimedia Commons). Use it only as a composition storyboard: use the giant deadline-object skeleton: one character clings to or rushes around a huge scene prop while the other points out they are already third to arrive. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Harold Lloyd, the city facade, exact clock face, or live-action monochrome look.. Backup reference(s): community_pizza_fire .reference_cache/bond_cg_v3/community_pizza_fire.gif (Doorway entry into a scene that has already gone off the rails; foreground newcomer, chaotic background, instant reaction comedy.).
Character reference images: before generating, inspect and follow these exact designs. kuro portrait assets/imagegen/portraits/role_029.png, expressions {'neutral': 'assets/imagegen/expressions/role_029_neutral.png', 'happy': 'assets/imagegen/expressions/role_029_happy.png', 'tease': 'assets/imagegen/expressions/role_029_tease.png', 'serious': 'assets/imagegen/expressions/role_029_serious.png'}; NNZ portrait assets/imagegen/portraits/role_003.png, expressions {'neutral': 'assets/imagegen/expressions/role_003_neutral.png', 'happy': 'assets/imagegen/expressions/role_003_happy.png', 'tease': 'assets/imagegen/expressions/role_003_tease.png', 'serious': 'assets/imagegen/expressions/role_003_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: kuro（判定判官）与NNZ（星砂资料馆长）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。kuro（判定判官）：主色 #d8d8d8 / #d8c0c0，符号 发色锚点、舞台票根，梗种子 截图、图片、图包、标题党、表情；NNZ（星砂资料馆长）：主色 #f0f0f0 / #78a8a8，符号 圆形构图、餐厅小勺，梗种子 图包、图片、截图、标题党、色值。
Relationship acting: 一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。 围绕“龙角裁判席”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
Cover/poster/meme inspiration: 可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_029_role_021 kuro × ❗您无法在已退出的群聊发送消息：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_029_role_021.png`
- 剧情来源：`pair_role_029_role_021` / NPC行动路线与任务导航误判 / 动态拱火拆台型
- 实际场景：龙牌馆（旧区域是否冲突：是）
- 核心物件：无效门禁
- 关系动作：一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：two_buttons, general_train_poster
- 立绘参考：`assets/imagegen/portraits/role_029.png` + `assets/imagegen/portraits/role_021.png`
- Meme/番剧构图：双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
- 封面/海报/梗图灵感：可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。
- 构图分析：画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。
- ACG/neta：NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_029_role_021
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: kuro × ❗您无法在已退出的群聊发送消息：先别急，这段算两个人都看见了。kuro和❗您无法在已退出的群聊发送消息不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: NPC行动路线与任务导航误判；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：kuro和❗您无法在已退出的群聊发送消息在龙牌馆碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 我就知道会在这里碰到你。你每次上线都在龙牌馆——你的行动模式比NPC还好猜。 / 好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。 / 换地方是因为我在找人。有些线索只会出现在特定区域。 / 找什么人——你说的是任务目标还是你自己标错的？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是龙牌馆在记录这次相遇。
Dialogue basis: kuro：“我就知道会在这里碰到你。你每次上线都在龙牌馆——你的行动模式比NPC还好猜。”；❗您无法在已退出的群聊发送消息：“好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。”；kuro：“换地方是因为我在找人。有些线索只会出现在特定区域。”；❗您无法在已退出的群聊发送消息：“找什么人——你说的是任务目标还是你自己标错的？”；kuro：“战报”；❗您无法在已退出的群聊发送消息：“有没有懂的”
Choice energy: 拱火：kuro负责把话题推高，❗您无法在已退出的群聊发送消息负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：无效门禁。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/two_buttons.jpg` (Daily Struggle / Two Buttons decision composition, source Know Your Meme). Use it only as a composition storyboard: use the two-choice route skeleton: two unreadable quest paths or markers collide, and both characters realize the navigation logic is nonsense. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original man, table, button labels, red buttons, or readable text.. Backup reference(s): general_train_poster .reference_cache/bond_cg_v3/general_train_poster.jpg (Diagonal chase/action poster: vehicle or prop rushes through frame while characters react in comic panic.).
Character reference images: before generating, inspect and follow these exact designs. kuro portrait assets/imagegen/portraits/role_029.png, expressions {'neutral': 'assets/imagegen/expressions/role_029_neutral.png', 'happy': 'assets/imagegen/expressions/role_029_happy.png', 'tease': 'assets/imagegen/expressions/role_029_tease.png', 'serious': 'assets/imagegen/expressions/role_029_serious.png'}; ❗您无法在已退出的群聊发送消息 portrait assets/imagegen/portraits/role_021.png, expressions {'neutral': 'assets/imagegen/expressions/role_021_neutral.png', 'happy': 'assets/imagegen/expressions/role_021_happy.png', 'tease': 'assets/imagegen/expressions/role_021_tease.png', 'serious': 'assets/imagegen/expressions/role_021_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: kuro（判定判官）与❗您无法在已退出的群聊发送消息（星砂调色师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。kuro（判定判官）：主色 #d8d8d8 / #d8c0c0，符号 发色锚点、舞台票根，梗种子 截图、图片、图包、标题党、表情；❗您无法在已退出的群聊发送消息（星砂调色师）：主色 #907878 / #604848，符号 星砂发饰、月光丝带，梗种子 图包、图片、多点、截图、关心。
Relationship acting: 一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。 围绕“无效门禁”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
Cover/poster/meme inspiration: 可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_030_role_019 白给人 × 不好办：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_030_role_019.png`
- 剧情来源：`pair_role_030_role_019` / NPC行动路线与任务导航误判 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：否）
- 核心物件：月相开关
- 关系动作：一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：two_buttons, general_train_poster
- 立绘参考：`assets/imagegen/portraits/role_030.png` + `assets/imagegen/portraits/role_019.png`
- Meme/番剧构图：双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
- 封面/海报/梗图灵感：可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。
- 构图分析：画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。
- ACG/neta：NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_030_role_019
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 白给人 × 不好办：先别急，这段算两个人都看见了。白给人和不好办不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: NPC行动路线与任务导航误判；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：白给人和不好办在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 我就知道会在这里碰到你。你每次上线都在湖边回声栈道——你的行动模式比NPC还好猜。 / 好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。 / 换地方是因为我在找人。有些线索只会出现在特定区域。 / 找什么人——你说的是任务目标还是你自己标错的？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 白给人：“我就知道会在这里碰到你。你每次上线都在湖边回声栈道——你的行动模式比NPC还好猜。”；不好办：“好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。”；白给人：“换地方是因为我在找人。有些线索只会出现在特定区域。”；不好办：“找什么人——你说的是任务目标还是你自己标错的？”；白给人：“给你”；不好办：“有没有懂的”
Choice energy: 拱火：白给人负责把话题推高，不好办负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：月相开关。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/two_buttons.jpg` (Daily Struggle / Two Buttons decision composition, source Know Your Meme). Use it only as a composition storyboard: use the two-choice route skeleton: two unreadable quest paths or markers collide, and both characters realize the navigation logic is nonsense. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original man, table, button labels, red buttons, or readable text.. Backup reference(s): general_train_poster .reference_cache/bond_cg_v3/general_train_poster.jpg (Diagonal chase/action poster: vehicle or prop rushes through frame while characters react in comic panic.).
Character reference images: before generating, inspect and follow these exact designs. 白给人 portrait assets/imagegen/portraits/role_030.png, expressions {'neutral': 'assets/imagegen/expressions/role_030_neutral.png', 'happy': 'assets/imagegen/expressions/role_030_happy.png', 'tease': 'assets/imagegen/expressions/role_030_tease.png', 'serious': 'assets/imagegen/expressions/role_030_serious.png'}; 不好办 portrait assets/imagegen/portraits/role_019.png, expressions {'neutral': 'assets/imagegen/expressions/role_019_neutral.png', 'happy': 'assets/imagegen/expressions/role_019_happy.png', 'tease': 'assets/imagegen/expressions/role_019_tease.png', 'serious': 'assets/imagegen/expressions/role_019_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 白给人（回声诗页客）与不好办（未解事务官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。白给人（回声诗页客）：主色 #d8d8d8 / #f0f0f0，符号 发色锚点、牌纹徽章，梗种子 图包、图片、截图、NNZ、标题党；不好办（未解事务官）：主色 #f0d8d8 / #f0c0c0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、NNZ、哔哩。
Relationship acting: 一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。 围绕“月相开关”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
Cover/poster/meme inspiration: 可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_030_role_004 白给人 × 赛博鳏夫：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_030_role_004.png`
- 剧情来源：`pair_role_030_role_004` / 重叠人影与新梗标题 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：湖面倒影
- 关系动作：一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：nosferatu_shadow, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_030.png` + `assets/imagegen/portraits/role_004.png`
- Meme/番剧构图：灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
- 封面/海报/梗图灵感：可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。
- 构图分析：用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。
- ACG/neta：灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_030_role_004
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 白给人 × 赛博鳏夫：先别急，这段算两个人都看见了。白给人和赛博鳏夫不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 重叠人影与新梗标题；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：白给人和赛博鳏夫在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 等一下——你刚才是不是在湖边回声栈道那边？我好像看到一个人影。 / 可能是我。也可能不是——湖边回声栈道这边回声多，人影有时候会重叠。 / 重叠的人影听起来像个新梗的标题。记下来。 / 你什么都记。上次记的「路灯复读事件」到现在还没下文。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 白给人：“等一下——你刚才是不是在湖边回声栈道那边？我好像看到一个人影。”；赛博鳏夫：“可能是我。也可能不是——湖边回声栈道这边回声多，人影有时候会重叠。”；白给人：“重叠的人影听起来像个新梗的标题。记下来。”；赛博鳏夫：“你什么都记。上次记的「路灯复读事件」到现在还没下文。”；白给人：“给你”；赛博鳏夫：“嚯嚯嚯”
Choice energy: 拱火：白给人负责把话题推高，赛博鳏夫负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：湖面倒影。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/nosferatu_shadow.png` (Nosferatu shadow silhouette composition, source Wikimedia Commons). Use it only as a composition storyboard: use the oversized-shadow skeleton: one character points at a suspicious overlapping shadow while the other records it as a new title-worthy incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the vampire silhouette, claws, stairs, or exact horror iconography.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 白给人 portrait assets/imagegen/portraits/role_030.png, expressions {'neutral': 'assets/imagegen/expressions/role_030_neutral.png', 'happy': 'assets/imagegen/expressions/role_030_happy.png', 'tease': 'assets/imagegen/expressions/role_030_tease.png', 'serious': 'assets/imagegen/expressions/role_030_serious.png'}; 赛博鳏夫 portrait assets/imagegen/portraits/role_004.png, expressions {'neutral': 'assets/imagegen/expressions/role_004_neutral.png', 'happy': 'assets/imagegen/expressions/role_004_happy.png', 'tease': 'assets/imagegen/expressions/role_004_tease.png', 'serious': 'assets/imagegen/expressions/role_004_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 白给人（回声诗页客）与赛博鳏夫（赛博夜航人）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。白给人（回声诗页客）：主色 #d8d8d8 / #f0f0f0，符号 发色锚点、牌纹徽章，梗种子 图包、图片、截图、NNZ、标题党；赛博鳏夫（赛博夜航人）：主色 #d8d8d8 / #f0f0f0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、Hxr、出处。
Relationship acting: 一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。 围绕“湖面倒影”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
Cover/poster/meme inspiration: 可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_030_role_033 白给人 × Celestial：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_030_role_033.png`
- 剧情来源：`pair_role_030_role_033` / 淡季、路灯与吐槽停顿 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：否）
- 核心物件：留言灯
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_030.png` + `assets/imagegen/portraits/role_033.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_030_role_033
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 白给人 × Celestial：先别急，这段算两个人都看见了。白给人和Celestial不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 淡季、路灯与吐槽停顿；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：白给人和Celestial在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天湖边回声栈道特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 白给人：“今天湖边回声栈道特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；Celestial：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；白给人：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；Celestial：“我和路灯还不够？路灯又不会吐槽你。”；白给人：“给你”；Celestial：“星空”
Choice energy: 拱火：白给人负责把话题推高，Celestial负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：留言灯。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 白给人 portrait assets/imagegen/portraits/role_030.png, expressions {'neutral': 'assets/imagegen/expressions/role_030_neutral.png', 'happy': 'assets/imagegen/expressions/role_030_happy.png', 'tease': 'assets/imagegen/expressions/role_030_tease.png', 'serious': 'assets/imagegen/expressions/role_030_serious.png'}; Celestial portrait assets/imagegen/portraits/role_033.png, expressions {'neutral': 'assets/imagegen/expressions/role_033_neutral.png', 'happy': 'assets/imagegen/expressions/role_033_happy.png', 'tease': 'assets/imagegen/expressions/role_033_tease.png', 'serious': 'assets/imagegen/expressions/role_033_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 白给人（回声诗页客）与Celestial（回声诗页客）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。白给人（回声诗页客）：主色 #d8d8d8 / #f0f0f0，符号 发色锚点、牌纹徽章，梗种子 图包、图片、截图、NNZ、标题党；Celestial（回声诗页客）：主色 #787860 / #786048，符号 星砂发饰、餐厅小勺，梗种子 截图、羡慕、图片、图包、哥哥。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“留言灯”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_031_role_016 六界三鲜 × 我早已麻痹：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_031_role_016.png`
- 剧情来源：`pair_role_031_role_016` / 自制异常与 bug 验收 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：是）
- 核心物件：像素屏幕
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_031.png` + `assets/imagegen/portraits/role_016.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_031_role_016
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 六界三鲜 × 我早已麻痹：先别急，这段算两个人都看见了。六界三鲜和我早已麻痹不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 自制异常与 bug 验收；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：六界三鲜和我早已麻痹在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。头像工坊这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: 六界三鲜：“嘿，过来。头像工坊这边有个东西你肯定会感兴趣。”；我早已麻痹：“什么东西——又是你以为只有你一个人发现的那种？”；六界三鲜：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；我早已麻痹：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；六界三鲜：“三鲜”；我早已麻痹：“？？？”
Choice energy: 拱火：六界三鲜负责把话题推高，我早已麻痹负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：像素屏幕。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. 六界三鲜 portrait assets/imagegen/portraits/role_031.png, expressions {'neutral': 'assets/imagegen/expressions/role_031_neutral.png', 'happy': 'assets/imagegen/expressions/role_031_happy.png', 'tease': 'assets/imagegen/expressions/role_031_tease.png', 'serious': 'assets/imagegen/expressions/role_031_serious.png'}; 我早已麻痹 portrait assets/imagegen/portraits/role_016.png, expressions {'neutral': 'assets/imagegen/expressions/role_016_neutral.png', 'happy': 'assets/imagegen/expressions/role_016_happy.png', 'tease': 'assets/imagegen/expressions/role_016_tease.png', 'serious': 'assets/imagegen/expressions/role_016_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 六界三鲜（星砂调色师）与我早已麻痹（回声收束者）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。六界三鲜（星砂调色师）：主色 #181818 / #303030，符号 明亮眼神、月光丝带，梗种子 表情、NNZ、羡慕、回复、沉机；我早已麻痹（回声收束者）：主色 #d8d8d8 / #c0c0c0，符号 圆形构图、月光丝带，梗种子 图包、图片、毛鸽、哥哥、健康。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“像素屏幕”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_031_role_012 六界三鲜 × 早上了喵～：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_031_role_012.png`
- 剧情来源：`pair_role_031_role_012` / 同步蹲点事件 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：是）
- 核心物件：图鉴抽屉
- 关系动作：一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：community_pizza_fire, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_031.png` + `assets/imagegen/portraits/role_012.png`
- Meme/番剧构图：进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
- 封面/海报/梗图灵感：可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。
- 构图分析：把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。
- ACG/neta：二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_031_role_012
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 六界三鲜 × 早上了喵～：先别急，这段算两个人都看见了。六界三鲜和早上了喵～不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 同步蹲点事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：六界三鲜和早上了喵～在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哎你也在——我还以为今天就我一个人在头像工坊晃。 / 我也是刚到的。听到你在这边就过来了。 / 那正好，省得我发私信。过来帮我看个东西。 / 又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: 六界三鲜：“哎你也在——我还以为今天就我一个人在头像工坊晃。”；早上了喵～：“我也是刚到的。听到你在这边就过来了。”；六界三鲜：“那正好，省得我发私信。过来帮我看个东西。”；早上了喵～：“又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。”；六界三鲜：“三鲜”；早上了喵～：“晚安”
Choice energy: 拱火：六界三鲜负责把话题推高，早上了喵～负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：图鉴抽屉。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/community_pizza_fire.gif` (Community pizza fire reaction composition, source Know Your Meme). Use it only as a composition storyboard: use the doorway-arrival chaos skeleton: one character enters/catches the other in a too-obvious stakeout, with the core prop already causing a tiny incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original actors, room, fire, pizza box, show logo, or live-action look.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 六界三鲜 portrait assets/imagegen/portraits/role_031.png, expressions {'neutral': 'assets/imagegen/expressions/role_031_neutral.png', 'happy': 'assets/imagegen/expressions/role_031_happy.png', 'tease': 'assets/imagegen/expressions/role_031_tease.png', 'serious': 'assets/imagegen/expressions/role_031_serious.png'}; 早上了喵～ portrait assets/imagegen/portraits/role_012.png, expressions {'neutral': 'assets/imagegen/expressions/role_012_neutral.png', 'happy': 'assets/imagegen/expressions/role_012_happy.png', 'tease': 'assets/imagegen/expressions/role_012_tease.png', 'serious': 'assets/imagegen/expressions/role_012_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 六界三鲜（星砂调色师）与早上了喵～（晨报铃使）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。六界三鲜（星砂调色师）：主色 #181818 / #303030，符号 明亮眼神、月光丝带，梗种子 表情、NNZ、羡慕、回复、沉机；早上了喵～（晨报铃使）：主色 #603018 / #483018，符号 圆形构图、像素画笔，梗种子 超量、反叛、图包、弧形、图片。
Relationship acting: 一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。 围绕“图鉴抽屉”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
Cover/poster/meme inspiration: 可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_031_role_021 六界三鲜 × ❗您无法在已退出的群聊发送消息：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_031_role_021.png`
- 剧情来源：`pair_role_031_role_021` / 名字回声事件 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：图鉴抽屉
- 关系动作：两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：is_this_a_pigeon, sherlock_jr_projection
- 立绘参考：`assets/imagegen/portraits/role_031.png` + `assets/imagegen/portraits/role_021.png`
- Meme/番剧构图：番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
- 封面/海报/梗图灵感：可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。
- 构图分析：用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。
- ACG/neta：角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_031_role_021
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 六界三鲜 × ❗您无法在已退出的群聊发送消息：先别急，这段算两个人都看见了。六界三鲜和❗您无法在已退出的群聊发送消息不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 名字回声事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：六界三鲜和❗您无法在已退出的群聊发送消息在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 你刚才是不是叫我了？我好像听到有回声在喊我的名字。 / 没有——至少不是我叫的。可能是头像工坊自己。有些地方会记住经常来的人的名字。 / 如果头像工坊会记名字——那它现在应该能背出我们所有人的ID了。 / 它肯定能。我就是来确认它有没有拼错的。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: 六界三鲜：“你刚才是不是叫我了？我好像听到有回声在喊我的名字。”；❗您无法在已退出的群聊发送消息：“没有——至少不是我叫的。可能是头像工坊自己。有些地方会记住经常来的人的名字。”；六界三鲜：“如果头像工坊会记名字——那它现在应该能背出我们所有人的ID了。”；❗您无法在已退出的群聊发送消息：“它肯定能。我就是来确认它有没有拼错的。”；六界三鲜：“三鲜”；❗您无法在已退出的群聊发送消息：“有没有懂的”
Choice energy: 拱火：六界三鲜负责把话题推高，❗您无法在已退出的群聊发送消息负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：图鉴抽屉。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/is_this_a_pigeon.jpg` (Is This a Pigeon? pointing mislabel composition, source Know Your Meme). Use it only as a composition storyboard: use the confident misidentification skeleton: one character points at a glowing record/name echo, the other checks the core prop with deadpan disbelief. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original anime character, butterfly, caption layout, labels, or readable text.. Backup reference(s): sherlock_jr_projection .reference_cache/bond_cg_v3/sherlock_jr_projection.jpg (Detective/film-within-film framing: a big framed view, a smaller observer figure, and a clue that invites shared inspection.).
Character reference images: before generating, inspect and follow these exact designs. 六界三鲜 portrait assets/imagegen/portraits/role_031.png, expressions {'neutral': 'assets/imagegen/expressions/role_031_neutral.png', 'happy': 'assets/imagegen/expressions/role_031_happy.png', 'tease': 'assets/imagegen/expressions/role_031_tease.png', 'serious': 'assets/imagegen/expressions/role_031_serious.png'}; ❗您无法在已退出的群聊发送消息 portrait assets/imagegen/portraits/role_021.png, expressions {'neutral': 'assets/imagegen/expressions/role_021_neutral.png', 'happy': 'assets/imagegen/expressions/role_021_happy.png', 'tease': 'assets/imagegen/expressions/role_021_tease.png', 'serious': 'assets/imagegen/expressions/role_021_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 六界三鲜（星砂调色师）与❗您无法在已退出的群聊发送消息（星砂调色师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。六界三鲜（星砂调色师）：主色 #181818 / #303030，符号 明亮眼神、月光丝带，梗种子 表情、NNZ、羡慕、回复、沉机；❗您无法在已退出的群聊发送消息（星砂调色师）：主色 #907878 / #604848，符号 星砂发饰、月光丝带，梗种子 图包、图片、多点、截图、关心。
Relationship acting: 两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。 围绕“图鉴抽屉”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
Cover/poster/meme inspiration: 可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_032_role_019 猫耳半圆 × 不好办：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_032_role_019.png`
- 剧情来源：`pair_role_032_role_019` / 重叠人影与新梗标题 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：否）
- 核心物件：湖面倒影
- 关系动作：一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：nosferatu_shadow, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_032.png` + `assets/imagegen/portraits/role_019.png`
- Meme/番剧构图：灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
- 封面/海报/梗图灵感：可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。
- 构图分析：用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。
- ACG/neta：灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_032_role_019
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 猫耳半圆 × 不好办：先别急，这段算两个人都看见了。猫耳半圆和不好办不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 重叠人影与新梗标题；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：猫耳半圆和不好办在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 等一下——你刚才是不是在湖边回声栈道那边？我好像看到一个人影。 / 可能是我。也可能不是——湖边回声栈道这边回声多，人影有时候会重叠。 / 重叠的人影听起来像个新梗的标题。记下来。 / 你什么都记。上次记的「路灯复读事件」到现在还没下文。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 猫耳半圆：“等一下——你刚才是不是在湖边回声栈道那边？我好像看到一个人影。”；不好办：“可能是我。也可能不是——湖边回声栈道这边回声多，人影有时候会重叠。”；猫耳半圆：“重叠的人影听起来像个新梗的标题。记下来。”；不好办：“你什么都记。上次记的「路灯复读事件」到现在还没下文。”；猫耳半圆：“猫耳”；不好办：“有没有懂的”
Choice energy: 拱火：猫耳半圆负责把话题推高，不好办负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：湖面倒影。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/nosferatu_shadow.png` (Nosferatu shadow silhouette composition, source Wikimedia Commons). Use it only as a composition storyboard: use the oversized-shadow skeleton: one character points at a suspicious overlapping shadow while the other records it as a new title-worthy incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the vampire silhouette, claws, stairs, or exact horror iconography.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 猫耳半圆 portrait assets/imagegen/portraits/role_032.png, expressions {'neutral': 'assets/imagegen/expressions/role_032_neutral.png', 'happy': 'assets/imagegen/expressions/role_032_happy.png', 'tease': 'assets/imagegen/expressions/role_032_tease.png', 'serious': 'assets/imagegen/expressions/role_032_serious.png'}; 不好办 portrait assets/imagegen/portraits/role_019.png, expressions {'neutral': 'assets/imagegen/expressions/role_019_neutral.png', 'happy': 'assets/imagegen/expressions/role_019_happy.png', 'tease': 'assets/imagegen/expressions/role_019_tease.png', 'serious': 'assets/imagegen/expressions/role_019_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 猫耳半圆（回声诗页客）与不好办（未解事务官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。猫耳半圆（回声诗页客）：主色 #c0d8d8 / #d8d8d8，符号 星砂发饰、像素画笔，梗种子 图包、图片、回复、截图、哥哥；不好办（未解事务官）：主色 #f0d8d8 / #f0c0c0，符号 圆形构图、舞台票根，梗种子 图包、图片、截图、NNZ、哔哩。
Relationship acting: 一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。 围绕“湖面倒影”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
Cover/poster/meme inspiration: 可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_032_role_005 猫耳半圆 × 青山照：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_032_role_005.png`
- 剧情来源：`pair_role_032_role_005` / 第三个到与错过事件 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：栈道留言瓶
- 关系动作：一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：safety_last_clock, community_pizza_fire
- 立绘参考：`assets/imagegen/portraits/role_032.png` + `assets/imagegen/portraits/role_005.png`
- Meme/番剧构图：番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
- 封面/海报/梗图灵感：可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。
- 构图分析：核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。
- ACG/neta：错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_032_role_005
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 猫耳半圆 × 青山照：先别急，这段算两个人都看见了。猫耳半圆和青山照不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 第三个到与错过事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：猫耳半圆和青山照在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哈，果然在。每次湖边回声栈道有什么事，你都是第一个到的。 / 这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。 / 走了？那他们看到了什么？ / 看到了你不在，就走了。所以你现在来了，刚好。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 猫耳半圆：“哈，果然在。每次湖边回声栈道有什么事，你都是第一个到的。”；青山照：“这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。”；猫耳半圆：“走了？那他们看到了什么？”；青山照：“看到了你不在，就走了。所以你现在来了，刚好。”；猫耳半圆：“猫耳”；青山照：“羡慕你”
Choice energy: 拱火：猫耳半圆负责把话题推高，青山照负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：栈道留言瓶。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/safety_last_clock.jpg` (Safety Last! clock-hanging frame, source Wikimedia Commons). Use it only as a composition storyboard: use the giant deadline-object skeleton: one character clings to or rushes around a huge scene prop while the other points out they are already third to arrive. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Harold Lloyd, the city facade, exact clock face, or live-action monochrome look.. Backup reference(s): community_pizza_fire .reference_cache/bond_cg_v3/community_pizza_fire.gif (Doorway entry into a scene that has already gone off the rails; foreground newcomer, chaotic background, instant reaction comedy.).
Character reference images: before generating, inspect and follow these exact designs. 猫耳半圆 portrait assets/imagegen/portraits/role_032.png, expressions {'neutral': 'assets/imagegen/expressions/role_032_neutral.png', 'happy': 'assets/imagegen/expressions/role_032_happy.png', 'tease': 'assets/imagegen/expressions/role_032_tease.png', 'serious': 'assets/imagegen/expressions/role_032_serious.png'}; 青山照 portrait assets/imagegen/portraits/role_005.png, expressions {'neutral': 'assets/imagegen/expressions/role_005_neutral.png', 'happy': 'assets/imagegen/expressions/role_005_happy.png', 'tease': 'assets/imagegen/expressions/role_005_tease.png', 'serious': 'assets/imagegen/expressions/role_005_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 猫耳半圆（回声诗页客）与青山照（青山回声调停者）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。猫耳半圆（回声诗页客）：主色 #c0d8d8 / #d8d8d8，符号 星砂发饰、像素画笔，梗种子 图包、图片、回复、截图、哥哥；青山照（青山回声调停者）：主色 #f0d8d8 / #d8a8a8，符号 圆形构图、牌纹徽章，梗种子 Hxr、回复、多点、图包、关心。
Relationship acting: 一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。 围绕“栈道留言瓶”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
Cover/poster/meme inspiration: 可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_033_role_023 Celestial × Du.：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_033_role_023.png`
- 剧情来源：`pair_role_033_role_023` / 自制异常与 bug 验收 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：否）
- 核心物件：月相开关
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_033.png` + `assets/imagegen/portraits/role_023.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_033_role_023
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Celestial × Du.：先别急，这段算两个人都看见了。Celestial和Du.不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 自制异常与 bug 验收；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Celestial和Du.在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。湖边回声栈道这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: Celestial：“嘿，过来。湖边回声栈道这边有个东西你肯定会感兴趣。”；Du.：“什么东西——又是你以为只有你一个人发现的那种？”；Celestial：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；Du.：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；Celestial：“星空”；Du.：“回声”
Choice energy: 拱火：Celestial负责把话题推高，Du.负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：月相开关。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. Celestial portrait assets/imagegen/portraits/role_033.png, expressions {'neutral': 'assets/imagegen/expressions/role_033_neutral.png', 'happy': 'assets/imagegen/expressions/role_033_happy.png', 'tease': 'assets/imagegen/expressions/role_033_tease.png', 'serious': 'assets/imagegen/expressions/role_033_serious.png'}; Du. portrait assets/imagegen/portraits/role_023.png, expressions {'neutral': 'assets/imagegen/expressions/role_023_neutral.png', 'happy': 'assets/imagegen/expressions/role_023_happy.png', 'tease': 'assets/imagegen/expressions/role_023_tease.png', 'serious': 'assets/imagegen/expressions/role_023_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Celestial（回声诗页客）与Du.（回声诗页客）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Celestial（回声诗页客）：主色 #787860 / #786048，符号 星砂发饰、餐厅小勺，梗种子 截图、羡慕、图片、图包、哥哥；Du.（回声诗页客）：主色 #784830 / #603018，符号 发色锚点、餐厅小勺，梗种子 图包、图片、截图、写真集、普罗米。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“月相开关”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_033_role_022 Celestial × N2过了不恨了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_033_role_022.png`
- 剧情来源：`pair_role_033_role_022` / 第三个到与错过事件 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：栈道留言瓶
- 关系动作：一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：safety_last_clock, community_pizza_fire
- 立绘参考：`assets/imagegen/portraits/role_033.png` + `assets/imagegen/portraits/role_022.png`
- Meme/番剧构图：番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
- 封面/海报/梗图灵感：可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。
- 构图分析：核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。
- ACG/neta：错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_033_role_022
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Celestial × N2过了不恨了：先别急，这段算两个人都看见了。Celestial和N2过了不恨了不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 第三个到与错过事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：Celestial和N2过了不恨了在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哈，果然在。每次湖边回声栈道有什么事，你都是第一个到的。 / 这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。 / 走了？那他们看到了什么？ / 看到了你不在，就走了。所以你现在来了，刚好。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: Celestial：“哈，果然在。每次湖边回声栈道有什么事，你都是第一个到的。”；N2过了不恨了：“这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。”；Celestial：“走了？那他们看到了什么？”；N2过了不恨了：“看到了你不在，就走了。所以你现在来了，刚好。”；Celestial：“星空”；N2过了不恨了：“不恨了”
Choice energy: 拱火：Celestial负责把话题推高，N2过了不恨了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：栈道留言瓶。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/safety_last_clock.jpg` (Safety Last! clock-hanging frame, source Wikimedia Commons). Use it only as a composition storyboard: use the giant deadline-object skeleton: one character clings to or rushes around a huge scene prop while the other points out they are already third to arrive. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Harold Lloyd, the city facade, exact clock face, or live-action monochrome look.. Backup reference(s): community_pizza_fire .reference_cache/bond_cg_v3/community_pizza_fire.gif (Doorway entry into a scene that has already gone off the rails; foreground newcomer, chaotic background, instant reaction comedy.).
Character reference images: before generating, inspect and follow these exact designs. Celestial portrait assets/imagegen/portraits/role_033.png, expressions {'neutral': 'assets/imagegen/expressions/role_033_neutral.png', 'happy': 'assets/imagegen/expressions/role_033_happy.png', 'tease': 'assets/imagegen/expressions/role_033_tease.png', 'serious': 'assets/imagegen/expressions/role_033_serious.png'}; N2过了不恨了 portrait assets/imagegen/portraits/role_022.png, expressions {'neutral': 'assets/imagegen/expressions/role_022_neutral.png', 'happy': 'assets/imagegen/expressions/role_022_happy.png', 'tease': 'assets/imagegen/expressions/role_022_tease.png', 'serious': 'assets/imagegen/expressions/role_022_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Celestial（回声诗页客）与N2过了不恨了（炼画调色师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Celestial（回声诗页客）：主色 #787860 / #786048，符号 星砂发饰、餐厅小勺，梗种子 截图、羡慕、图片、图包、哥哥；N2过了不恨了（炼画调色师）：主色 #486078 / #486090，符号 圆形构图、像素画笔，梗种子 图包、图片、回复、毛鸽、截图。
Relationship acting: 一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。 围绕“栈道留言瓶”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
Cover/poster/meme inspiration: 可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_034_role_006 只能往标志方向发展了 × 力竭了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_034_role_006.png`
- 剧情来源：`pair_role_034_role_006` / 第三个到与错过事件 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：图鉴抽屉
- 关系动作：一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：safety_last_clock, community_pizza_fire
- 立绘参考：`assets/imagegen/portraits/role_034.png` + `assets/imagegen/portraits/role_006.png`
- Meme/番剧构图：番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
- 封面/海报/梗图灵感：可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。
- 构图分析：核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。
- ACG/neta：错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_034_role_006
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 只能往标志方向发展了 × 力竭了：先别急，这段算两个人都看见了。只能往标志方向发展了和力竭了不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 第三个到与错过事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：只能往标志方向发展了和力竭了在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哈，果然在。每次头像工坊有什么事，你都是第一个到的。 / 这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。 / 走了？那他们看到了什么？ / 看到了你不在，就走了。所以你现在来了，刚好。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: 只能往标志方向发展了：“哈，果然在。每次头像工坊有什么事，你都是第一个到的。”；力竭了：“这次你错了——我已经是第三个到的了。前面还有两个人，但他们都走了。”；只能往标志方向发展了：“走了？那他们看到了什么？”；力竭了：“看到了你不在，就走了。所以你现在来了，刚好。”；只能往标志方向发展了：“没办法”；力竭了：“不赖”
Choice energy: 拱火：只能往标志方向发展了负责把话题推高，力竭了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：图鉴抽屉。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/safety_last_clock.jpg` (Safety Last! clock-hanging frame, source Wikimedia Commons). Use it only as a composition storyboard: use the giant deadline-object skeleton: one character clings to or rushes around a huge scene prop while the other points out they are already third to arrive. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Harold Lloyd, the city facade, exact clock face, or live-action monochrome look.. Backup reference(s): community_pizza_fire .reference_cache/bond_cg_v3/community_pizza_fire.gif (Doorway entry into a scene that has already gone off the rails; foreground newcomer, chaotic background, instant reaction comedy.).
Character reference images: before generating, inspect and follow these exact designs. 只能往标志方向发展了 portrait assets/imagegen/portraits/role_034.png, expressions {'neutral': 'assets/imagegen/expressions/role_034_neutral.png', 'happy': 'assets/imagegen/expressions/role_034_happy.png', 'tease': 'assets/imagegen/expressions/role_034_tease.png', 'serious': 'assets/imagegen/expressions/role_034_serious.png'}; 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 只能往标志方向发展了（星砂调色师）与力竭了（疲劳判定官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。只能往标志方向发展了（星砂调色师）：主色 #484848 / #304848，符号 星砂发饰、舞台票根，梗种子 图包、图片、截图、标题党、岁己；力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ。
Relationship acting: 一个人以为对方总是第一个到，结果对方已经第三个到；“你不在他们就走了”变成登场时差笑点。 围绕“图鉴抽屉”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“你来晚了”空椅构图：前景两人错愕对视，背景有两个刚离开的半透明残影或空椅，像错过隐藏 CG。
Cover/poster/meme inspiration: 可借校园番活动室散场封面、电影片尾彩蛋迟到梗、错过公交/空椅 meme、侦探片案发现场迟到海报式构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件旁留下两个半透明离场残影或空椅；当前两人站在事件现场边缘，像刚错过前一幕番剧名场面。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 错过隐藏事件、after credits 迟到、CG 差一格收集、社团活动室门口“刚刚才散场”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_034_role_021 只能往标志方向发展了 × ❗您无法在已退出的群聊发送消息：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_034_role_021.png`
- 剧情来源：`pair_role_034_role_021` / 观测点与三行诗 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：否）
- 核心物件：同步色板
- 关系动作：一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：sherlock_jr_projection, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_034.png` + `assets/imagegen/portraits/role_021.png`
- Meme/番剧构图：电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
- 封面/海报/梗图灵感：可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。
- 构图分析：让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。
- ACG/neta：日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_034_role_021
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 只能往标志方向发展了 × ❗您无法在已退出的群聊发送消息：先别急，这段算两个人都看见了。只能往标志方向发展了和❗您无法在已退出的群聊发送消息不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 观测点与三行诗；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：只能往标志方向发展了和❗您无法在已退出的群聊发送消息在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 喂，过来坐。头像工坊这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。 / 你今天不跑任务了？居然有时间坐着看灯。 / 任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。 / 三行——像三行诗。你是不是又在准备写什么东西？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: 只能往标志方向发展了：“喂，过来坐。头像工坊这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。”；❗您无法在已退出的群聊发送消息：“你今天不跑任务了？居然有时间坐着看灯。”；只能往标志方向发展了：“任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。”；❗您无法在已退出的群聊发送消息：“三行——像三行诗。你是不是又在准备写什么东西？”；只能往标志方向发展了：“没办法”；❗您无法在已退出的群聊发送消息：“有没有懂的”
Choice energy: 拱火：只能往标志方向发展了负责把话题推高，❗您无法在已退出的群聊发送消息负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：同步色板。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/sherlock_jr_projection.jpg` (Sherlock Jr. poster projection/detective composition, source Wikimedia Commons). Use it only as a composition storyboard: use the projection-screen observation skeleton: two characters study light/reflection/core prop like a tiny cinema clue, offset rather than posed as a couple. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Buster Keaton, poster typography, magnifying-glass branding, or exact costume.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 只能往标志方向发展了 portrait assets/imagegen/portraits/role_034.png, expressions {'neutral': 'assets/imagegen/expressions/role_034_neutral.png', 'happy': 'assets/imagegen/expressions/role_034_happy.png', 'tease': 'assets/imagegen/expressions/role_034_tease.png', 'serious': 'assets/imagegen/expressions/role_034_serious.png'}; ❗您无法在已退出的群聊发送消息 portrait assets/imagegen/portraits/role_021.png, expressions {'neutral': 'assets/imagegen/expressions/role_021_neutral.png', 'happy': 'assets/imagegen/expressions/role_021_happy.png', 'tease': 'assets/imagegen/expressions/role_021_tease.png', 'serious': 'assets/imagegen/expressions/role_021_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 只能往标志方向发展了（星砂调色师）与❗您无法在已退出的群聊发送消息（星砂调色师）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。只能往标志方向发展了（星砂调色师）：主色 #484848 / #304848，符号 星砂发饰、舞台票根，梗种子 图包、图片、截图、标题党、岁己；❗您无法在已退出的群聊发送消息（星砂调色师）：主色 #907878 / #604848，符号 星砂发饰、月光丝带，梗种子 图包、图片、多点、截图、关心。
Relationship acting: 一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。 围绕“同步色板”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
Cover/poster/meme inspiration: 可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_034_role_002 只能往标志方向发展了 × Hxr：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_034_role_002.png`
- 剧情来源：`pair_role_034_role_002` / 重叠人影与新梗标题 / 动态拱火拆台型
- 实际场景：头像工坊（旧区域是否冲突：是）
- 核心物件：立绘修补台
- 关系动作：一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：nosferatu_shadow, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_034.png` + `assets/imagegen/portraits/role_002.png`
- Meme/番剧构图：灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
- 封面/海报/梗图灵感：可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。
- 构图分析：用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。
- ACG/neta：灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_034_role_002
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 只能往标志方向发展了 × Hxr：先别急，这段算两个人都看见了。只能往标志方向发展了和Hxr不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 重叠人影与新梗标题；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：只能往标志方向发展了和Hxr在头像工坊碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 等一下——你刚才是不是在头像工坊那边？我好像看到一个人影。 / 可能是我。也可能不是——头像工坊这边回声多，人影有时候会重叠。 / 重叠的人影听起来像个新梗的标题。记下来。 / 你什么都记。上次记的「路灯复读事件」到现在还没下文。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是头像工坊在记录这次相遇。
Dialogue basis: 只能往标志方向发展了：“等一下——你刚才是不是在头像工坊那边？我好像看到一个人影。”；Hxr：“可能是我。也可能不是——头像工坊这边回声多，人影有时候会重叠。”；只能往标志方向发展了：“重叠的人影听起来像个新梗的标题。记下来。”；Hxr：“你什么都记。上次记的「路灯复读事件」到现在还没下文。”；只能往标志方向发展了：“没办法”；Hxr：“羡慕你”
Choice energy: 拱火：只能往标志方向发展了负责把话题推高，Hxr负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：头像工坊。视觉元素：画架、色板、像素屏幕、图鉴架、魔法打印机、颜料桶。核心物件：立绘修补台。可带入区域 motif：同步色板、立绘修补台、像素屏幕、图鉴抽屉。
Reference frame: first inspect `.reference_cache/bond_cg_v3/nosferatu_shadow.png` (Nosferatu shadow silhouette composition, source Wikimedia Commons). Use it only as a composition storyboard: use the oversized-shadow skeleton: one character points at a suspicious overlapping shadow while the other records it as a new title-worthy incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the vampire silhouette, claws, stairs, or exact horror iconography.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 只能往标志方向发展了 portrait assets/imagegen/portraits/role_034.png, expressions {'neutral': 'assets/imagegen/expressions/role_034_neutral.png', 'happy': 'assets/imagegen/expressions/role_034_happy.png', 'tease': 'assets/imagegen/expressions/role_034_tease.png', 'serious': 'assets/imagegen/expressions/role_034_serious.png'}; Hxr portrait assets/imagegen/portraits/role_002.png, expressions {'neutral': 'assets/imagegen/expressions/role_002_neutral.png', 'happy': 'assets/imagegen/expressions/role_002_happy.png', 'tease': 'assets/imagegen/expressions/role_002_tease.png', 'serious': 'assets/imagegen/expressions/role_002_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 只能往标志方向发展了（星砂调色师）与Hxr（零点连招手）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。只能往标志方向发展了（星砂调色师）：主色 #484848 / #304848，符号 星砂发饰、舞台票根，梗种子 图包、图片、截图、标题党、岁己；Hxr（零点连招手）：主色 #304860 / #304848，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、妈妈。
Relationship acting: 一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。 围绕“立绘修补台”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
Cover/poster/meme inspiration: 可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_036_role_038 夜处理炼金师 × 请关注一百满天原莎乐美喵：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_036_role_038.png`
- 剧情来源：`pair_role_036_role_038` / NPC行动路线与任务导航误判 / 动态拱火拆台型
- 实际场景：服务器机房（旧区域是否冲突：否）
- 核心物件：线路桥
- 关系动作：一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：two_buttons, general_train_poster
- 立绘参考：`assets/imagegen/portraits/role_036.png` + `assets/imagegen/portraits/role_038.png`
- Meme/番剧构图：双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
- 封面/海报/梗图灵感：可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。
- 构图分析：画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。
- ACG/neta：NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_036_role_038
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 夜处理炼金师 × 请关注一百满天原莎乐美喵：先别急，这段算两个人都看见了。夜处理炼金师和请关注一百满天原莎乐美喵不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: NPC行动路线与任务导航误判；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：夜处理炼金师和请关注一百满天原莎乐美喵在服务器机房碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 我就知道会在这里碰到你。你每次上线都在服务器机房——你的行动模式比NPC还好猜。 / 好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。 / 换地方是因为我在找人。有些线索只会出现在特定区域。 / 找什么人——你说的是任务目标还是你自己标错的？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是服务器机房在记录这次相遇。
Dialogue basis: 夜处理炼金师：“我就知道会在这里碰到你。你每次上线都在服务器机房——你的行动模式比NPC还好猜。”；请关注一百满天原莎乐美喵：“好猜就对了。好猜说明我稳定。不像你，每次上线都换地方。”；夜处理炼金师：“换地方是因为我在找人。有些线索只会出现在特定区域。”；请关注一百满天原莎乐美喵：“找什么人——你说的是任务目标还是你自己标错的？”；夜处理炼金师：“炼金”；请关注一百满天原莎乐美喵：“喵”
Choice energy: 拱火：夜处理炼金师负责把话题推高，请关注一百满天原莎乐美喵负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：服务器机房。视觉元素：蓝光机柜、核心阵列、状态灯、线路桥、维护桌和回声缓存。核心物件：线路桥。可带入区域 motif：缓存清理台、核心重启杆、状态灯墙、线路桥。
Reference frame: first inspect `.reference_cache/bond_cg_v3/two_buttons.jpg` (Daily Struggle / Two Buttons decision composition, source Know Your Meme). Use it only as a composition storyboard: use the two-choice route skeleton: two unreadable quest paths or markers collide, and both characters realize the navigation logic is nonsense. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original man, table, button labels, red buttons, or readable text.. Backup reference(s): general_train_poster .reference_cache/bond_cg_v3/general_train_poster.jpg (Diagonal chase/action poster: vehicle or prop rushes through frame while characters react in comic panic.).
Character reference images: before generating, inspect and follow these exact designs. 夜处理炼金师 portrait assets/imagegen/portraits/role_036.png, expressions {'neutral': 'assets/imagegen/expressions/role_036_neutral.png', 'happy': 'assets/imagegen/expressions/role_036_happy.png', 'tease': 'assets/imagegen/expressions/role_036_tease.png', 'serious': 'assets/imagegen/expressions/role_036_serious.png'}; 请关注一百满天原莎乐美喵 portrait assets/imagegen/portraits/role_038.png, expressions {'neutral': 'assets/imagegen/expressions/role_038_neutral.png', 'happy': 'assets/imagegen/expressions/role_038_happy.png', 'tease': 'assets/imagegen/expressions/role_038_tease.png', 'serious': 'assets/imagegen/expressions/role_038_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 夜处理炼金师（夜处理炼金师）与请关注一百满天原莎乐美喵（回声诗页客）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。夜处理炼金师（夜处理炼金师）：主色 #181848 / #909090，符号 圆形构图、月光丝带，梗种子 ...、下载、搜索、编号、序号；请关注一百满天原莎乐美喵（回声诗页客）：主色 #603018 / #906078，符号 明亮眼神、餐厅小勺，梗种子 标题党、截图、色值、图片、大小。
Relationship acting: 一个人指出对方行动模式像 NPC，另一个把找线索讲成导航事故；笑点是任务目标、路线标记和核心物件一起判错，不是关系暗示。 围绕“线路桥”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 双按钮/路线选择 meme 构图：两条不可读任务箭头同时亮起，角色像在选“继续巡逻”还是“重算路线”，核心物件变成错误导航点。
Cover/poster/meme inspiration: 可借双按钮纠结 meme、RPG 攻略路线图、导航软件重算路线、任务标记撞车和动作喜剧追逐海报的构图；不必平视站桩。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画成两条任务路线在核心物件前撞车或绕圈：一边像 NPC 巡逻路线，另一边像地图重新规划；两人表情一个认真指路、一个拿着错误标记当场卡住。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: NPC巡逻路线、quest flag、迷你地图重算、导航把人当任务点、路线规划全错。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_036_role_039 夜处理炼金师 × vv：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_036_role_039.png`
- 剧情来源：`pair_role_036_role_039` / 观测点与三行诗 / 动态拱火拆台型
- 实际场景：服务器机房（旧区域是否冲突：否）
- 核心物件：状态灯墙
- 关系动作：一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：sherlock_jr_projection, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_036.png` + `assets/imagegen/portraits/role_039.png`
- Meme/番剧构图：电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
- 封面/海报/梗图灵感：可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。
- 构图分析：让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。
- ACG/neta：日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_036_role_039
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 夜处理炼金师 × vv：先别急，这段算两个人都看见了。夜处理炼金师和vv不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 观测点与三行诗；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：夜处理炼金师和vv在服务器机房碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 喂，过来坐。服务器机房这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。 / 你今天不跑任务了？居然有时间坐着看灯。 / 任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。 / 三行——像三行诗。你是不是又在准备写什么东西？ / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是服务器机房在记录这次相遇。
Dialogue basis: 夜处理炼金师：“喂，过来坐。服务器机房这个位置是全镇最好的观测点，能看到对面的灯慢慢亮起来。”；vv：“你今天不跑任务了？居然有时间坐着看灯。”；夜处理炼金师：“任务可以等。但这一刻的好光线不会等。你看，对面的灯刚好排成了三行。”；vv：“三行——像三行诗。你是不是又在准备写什么东西？”；夜处理炼金师：“炼金”；vv：“可以”
Choice energy: 拱火：夜处理炼金师负责把话题推高，vv负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：服务器机房。视觉元素：蓝光机柜、核心阵列、状态灯、线路桥、维护桌和回声缓存。核心物件：状态灯墙。可带入区域 motif：缓存清理台、核心重启杆、状态灯墙、线路桥。
Reference frame: first inspect `.reference_cache/bond_cg_v3/sherlock_jr_projection.jpg` (Sherlock Jr. poster projection/detective composition, source Wikimedia Commons). Use it only as a composition storyboard: use the projection-screen observation skeleton: two characters study light/reflection/core prop like a tiny cinema clue, offset rather than posed as a couple. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy Buster Keaton, poster typography, magnifying-glass branding, or exact costume.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 夜处理炼金师 portrait assets/imagegen/portraits/role_036.png, expressions {'neutral': 'assets/imagegen/expressions/role_036_neutral.png', 'happy': 'assets/imagegen/expressions/role_036_happy.png', 'tease': 'assets/imagegen/expressions/role_036_tease.png', 'serious': 'assets/imagegen/expressions/role_036_serious.png'}; vv portrait assets/imagegen/portraits/role_039.png, expressions {'neutral': 'assets/imagegen/expressions/role_039_neutral.png', 'happy': 'assets/imagegen/expressions/role_039_happy.png', 'tease': 'assets/imagegen/expressions/role_039_tease.png', 'serious': 'assets/imagegen/expressions/role_039_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 夜处理炼金师（夜处理炼金师）与vv（回声诗页客）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。夜处理炼金师（夜处理炼金师）：主色 #181848 / #909090，符号 圆形构图、月光丝带，梗种子 ...、下载、搜索、编号、序号；vv（回声诗页客）：主色 #303030 / #181818，符号 明亮眼神、舞台票根，梗种子 图包、图片、截图、哈基、阿西。
Relationship acting: 一方叫对方坐下看光线，另一方把三行灯光读成诗；关系从任务暂停变成共同观测。 围绕“状态灯墙”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 电影放映/日常番 ED 静止帧构图：两人处在画面下三分之一但不贴近，三道光/三排倒影横穿背景，像暂停任务看线索。
Cover/poster/meme inspiration: 可借早期电影放映海报、日常番 ED 封面、文艺片横向光带、远景小人对巨大天空/倒影的海报构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，让三道灯光、三排窗或三行倒影切过画面；两人错开距离坐在同一侧看向光，核心物件像临时取景器或小放映窗。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 日常番静止帧、ED 插画、光影诗、暂停任务看风景的支线奖励、把线索看成三行弹幕。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_036_role_001 夜处理炼金师 × 弧形反叛超量🐉：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_036_role_001.png`
- 剧情来源：`pair_role_036_role_001` / 自制异常与 bug 验收 / 动态拱火拆台型
- 实际场景：服务器机房（旧区域是否冲突：是）
- 核心物件：核心重启杆
- 关系动作：一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：trip_to_moon_impact, metropolis_machine
- 立绘参考：`assets/imagegen/portraits/role_036.png` + `assets/imagegen/portraits/role_001.png`
- Meme/番剧构图：ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
- 封面/海报/梗图灵感：可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。
- 构图分析：核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。
- ACG/neta：测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_036_role_001
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 夜处理炼金师 × 弧形反叛超量🐉：先别急，这段算两个人都看见了。夜处理炼金师和弧形反叛超量🐉不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 自制异常与 bug 验收；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：夜处理炼金师和弧形反叛超量🐉在服务器机房碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 嘿，过来。服务器机房这边有个东西你肯定会感兴趣。 / 什么东西——又是你以为只有你一个人发现的那种？ / 这次不一样。这次是真的只有我一个人发现。因为是我弄的。 / ……你弄的？那我要先确认是不是bug再决定夸不夸你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是服务器机房在记录这次相遇。
Dialogue basis: 夜处理炼金师：“嘿，过来。服务器机房这边有个东西你肯定会感兴趣。”；弧形反叛超量🐉：“什么东西——又是你以为只有你一个人发现的那种？”；夜处理炼金师：“这次不一样。这次是真的只有我一个人发现。因为是我弄的。”；弧形反叛超量🐉：“……你弄的？那我要先确认是不是bug再决定夸不夸你。”；夜处理炼金师：“炼金”；弧形反叛超量🐉：“图呢”
Choice energy: 拱火：夜处理炼金师负责把话题推高，弧形反叛超量🐉负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：服务器机房。视觉元素：蓝光机柜、核心阵列、状态灯、线路桥、维护桌和回声缓存。核心物件：核心重启杆。可带入区域 motif：缓存清理台、核心重启杆、状态灯墙、线路桥。
Reference frame: first inspect `.reference_cache/bond_cg_v3/trip_to_moon_impact.jpg` (A Trip to the Moon rocket impact frame, source Wikimedia Commons). Use it only as a composition storyboard: use the absurd impact skeleton: the self-made bug/core prop lands dead center like an impossible experiment while one character celebrates and the other audits the damage. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the moon face, rocket design, historical engraving texture, title, or exact layout.. Backup reference(s): metropolis_machine .reference_cache/bond_cg_v3/metropolis_machine.jpg (Central machine altar and symmetrical light columns, useful for server-room/debug drama without romance framing.).
Character reference images: before generating, inspect and follow these exact designs. 夜处理炼金师 portrait assets/imagegen/portraits/role_036.png, expressions {'neutral': 'assets/imagegen/expressions/role_036_neutral.png', 'happy': 'assets/imagegen/expressions/role_036_happy.png', 'tease': 'assets/imagegen/expressions/role_036_tease.png', 'serious': 'assets/imagegen/expressions/role_036_serious.png'}; 弧形反叛超量🐉 portrait assets/imagegen/portraits/role_001.png, expressions {'neutral': 'assets/imagegen/expressions/role_001_neutral.png', 'happy': 'assets/imagegen/expressions/role_001_happy.png', 'tease': 'assets/imagegen/expressions/role_001_tease.png', 'serious': 'assets/imagegen/expressions/role_001_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 夜处理炼金师（夜处理炼金师）与弧形反叛超量🐉（龙牌超量判官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。夜处理炼金师（夜处理炼金师）：主色 #181848 / #909090，符号 圆形构图、月光丝带，梗种子 ...、下载、搜索、编号、序号；弧形反叛超量🐉（龙牌超量判官）：主色 #904800 / #303000，符号 圆形构图、月光丝带，梗种子 图包、图片、截图、标题党、色值。
Relationship acting: 一个角色炫耀“这是我弄的”，另一个先做 bug 验收再决定夸不夸，关系是拱火与审核同屏。 围绕“核心重启杆”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: ACG 社团活动“发明失控”构图：一人得意举手展示，另一人像测试员/吐槽役用放大镜验 bug，物件冒出夸张效果线。
Cover/poster/meme inspiration: 可借怪发明爆炸后的社团动画封面、灾难片海报的中心爆光、实验失败 meme 的烟雾和僵硬笑容、英雄登场反被道具炸脸的构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，核心物件像失控但可爱的测试服机关；发起者得意展示，审核者拿放大镜/判定手势，周围有不可读的 patch-note 光块。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 测试服事故、debug 回、补丁说明没人看、SSR 出货前先验 bug、社团活动道具暴走。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_038_role_005 请关注一百满天原莎乐美喵 × 青山照：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_038_role_005.png`
- 剧情来源：`pair_role_038_role_005` / 淡季、路灯与吐槽停顿 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：留言灯
- 关系动作：一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？”
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：caligari_warped_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_038.png` + `assets/imagegen/portraits/role_005.png`
- Meme/番剧构图：经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
- 封面/海报/梗图灵感：可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。
- 构图分析：画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。
- ACG/neta：治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_038_role_005
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 请关注一百满天原莎乐美喵 × 青山照：先别急，这段算两个人都看见了。请关注一百满天原莎乐美喵和青山照不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 淡季、路灯与吐槽停顿；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：请关注一百满天原莎乐美喵和青山照在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 今天湖边回声栈道特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。 / 想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。 / 你每次都这么说。每次晚上我来了，就只有你和路灯。 / 我和路灯还不够？路灯又不会吐槽你。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 请关注一百满天原莎乐美喵：“今天湖边回声栈道特别安静——安静到我开始怀疑是不是所有人都在瞒着我去别的地方。”；青山照：“想多了。安静是因为现在是淡季。等晚上你再来看——所有人都会冒出来。”；请关注一百满天原莎乐美喵：“你每次都这么说。每次晚上我来了，就只有你和路灯。”；青山照：“我和路灯还不够？路灯又不会吐槽你。”；请关注一百满天原莎乐美喵：“喵”；青山照：“羡慕你”
Choice energy: 拱火：请关注一百满天原莎乐美喵负责把话题推高，青山照负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：留言灯。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/caligari_warped_poster.jpg` (The Cabinet of Dr. Caligari warped poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the warped quiet-stage skeleton: large empty negative space, one lamp/core prop as a third comic presence, characters slightly apart in a deadpan pause. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the poster lettering, character silhouettes, exact buildings, or horror mood too literally.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. 请关注一百满天原莎乐美喵 portrait assets/imagegen/portraits/role_038.png, expressions {'neutral': 'assets/imagegen/expressions/role_038_neutral.png', 'happy': 'assets/imagegen/expressions/role_038_happy.png', 'tease': 'assets/imagegen/expressions/role_038_tease.png', 'serious': 'assets/imagegen/expressions/role_038_serious.png'}; 青山照 portrait assets/imagegen/portraits/role_005.png, expressions {'neutral': 'assets/imagegen/expressions/role_005_neutral.png', 'happy': 'assets/imagegen/expressions/role_005_happy.png', 'tease': 'assets/imagegen/expressions/role_005_tease.png', 'serious': 'assets/imagegen/expressions/role_005_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 请关注一百满天原莎乐美喵（回声诗页客）与青山照（青山回声调停者）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。请关注一百满天原莎乐美喵（回声诗页客）：主色 #603018 / #906078，符号 明亮眼神、餐厅小勺，梗种子 标题党、截图、色值、图片、大小；青山照（青山回声调停者）：主色 #f0d8d8 / #d8a8a8，符号 圆形构图、牌纹徽章，梗种子 Hxr、回复、多点、图包、关心。
Relationship acting: 一个人怀疑大家都去了别处，另一个用淡季和路灯安慰；笑点是“我和路灯还不够？” 围绕“留言灯”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 经典“空镜头 + 两人一灯”停顿梗构图：大面积留白，人物保持安全距离，路灯/状态灯像第三位吐槽役。
Cover/poster/meme inspiration: 可借孤独喜剧电影海报的大留白、深夜小剧场、空镜头 meme 的尴尬停顿、路灯像第三主角的三角构图。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画面留大块安静夜色，只让两人和一盏灯/躺椅/状态灯形成不对称小剧场；第三个“角色”是发光物件。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 治愈系日常回、空镜头、路灯拟人、ED 后小剧场、低保真值班感。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_038_role_009 请关注一百满天原莎乐美喵 × 多点关心：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_038_role_009.png`
- 剧情来源：`pair_role_038_role_009` / 重叠人影与新梗标题 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：湖面倒影
- 关系动作：一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：nosferatu_shadow, caligari_warped_poster
- 立绘参考：`assets/imagegen/portraits/role_038.png` + `assets/imagegen/portraits/role_009.png`
- Meme/番剧构图：灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
- 封面/海报/梗图灵感：可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。
- 构图分析：用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。
- ACG/neta：灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_038_role_009
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 请关注一百满天原莎乐美喵 × 多点关心：先别急，这段算两个人都看见了。请关注一百满天原莎乐美喵和多点关心不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 重叠人影与新梗标题；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：请关注一百满天原莎乐美喵和多点关心在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 等一下——你刚才是不是在湖边回声栈道那边？我好像看到一个人影。 / 可能是我。也可能不是——湖边回声栈道这边回声多，人影有时候会重叠。 / 重叠的人影听起来像个新梗的标题。记下来。 / 你什么都记。上次记的「路灯复读事件」到现在还没下文。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 请关注一百满天原莎乐美喵：“等一下——你刚才是不是在湖边回声栈道那边？我好像看到一个人影。”；多点关心：“可能是我。也可能不是——湖边回声栈道这边回声多，人影有时候会重叠。”；请关注一百满天原莎乐美喵：“重叠的人影听起来像个新梗的标题。记下来。”；多点关心：“你什么都记。上次记的「路灯复读事件」到现在还没下文。”；请关注一百满天原莎乐美喵：“喵”；多点关心：“[[呵呵]]”
Choice energy: 拱火：请关注一百满天原莎乐美喵负责把话题推高，多点关心负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：湖面倒影。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/nosferatu_shadow.png` (Nosferatu shadow silhouette composition, source Wikimedia Commons). Use it only as a composition storyboard: use the oversized-shadow skeleton: one character points at a suspicious overlapping shadow while the other records it as a new title-worthy incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the vampire silhouette, claws, stairs, or exact horror iconography.. Backup reference(s): caligari_warped_poster .reference_cache/bond_cg_v3/caligari_warped_poster.jpg (Expressionist empty-space framing: tilted architecture, long shadows, and one small lit island inside an odd night scene.).
Character reference images: before generating, inspect and follow these exact designs. 请关注一百满天原莎乐美喵 portrait assets/imagegen/portraits/role_038.png, expressions {'neutral': 'assets/imagegen/expressions/role_038_neutral.png', 'happy': 'assets/imagegen/expressions/role_038_happy.png', 'tease': 'assets/imagegen/expressions/role_038_tease.png', 'serious': 'assets/imagegen/expressions/role_038_serious.png'}; 多点关心 portrait assets/imagegen/portraits/role_009.png, expressions {'neutral': 'assets/imagegen/expressions/role_009_neutral.png', 'happy': 'assets/imagegen/expressions/role_009_happy.png', 'tease': 'assets/imagegen/expressions/role_009_tease.png', 'serious': 'assets/imagegen/expressions/role_009_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 请关注一百满天原莎乐美喵（回声诗页客）与多点关心（关心信标使）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。请关注一百满天原莎乐美喵（回声诗页客）：主色 #603018 / #906078，符号 明亮眼神、餐厅小勺，梗种子 标题党、截图、色值、图片、大小；多点关心（关心信标使）：主色 #d8d8d8 / #d8c0d8，符号 星砂发饰、舞台票根，梗种子 图包、图片、截图、回复、Hxr。
Relationship acting: 一方看到疑似人影，另一方说可能是自己也可能不是；两人把重叠人影当成新梗标题记录。 围绕“湖面倒影”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 灵异番伪预告 + 标题回收构图：画面边缘有重叠剪影，角色一人吓到指过去，另一人掏出记录道具像在记新标题。
Cover/poster/meme inspiration: 可借灵异动画预告海报、惊悚电影的巨大背影压迫感、双重曝光海报、镜子里多一个人的 meme 构图；搞笑恐怖而不真恐怖。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用半透明重叠剪影、镜面或屏幕反光制造“是你又不是你”的画面；一人指向影子，另一人已经在记录。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 灵异番伪预告、标题回收、截图证据、作画分身、弹幕说“这集标题有了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_038_role_006 请关注一百满天原莎乐美喵 × 力竭了：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_038_role_006.png`
- 剧情来源：`pair_role_038_role_006` / 名字回声事件 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：栈道留言瓶
- 关系动作：两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：is_this_a_pigeon, sherlock_jr_projection
- 立绘参考：`assets/imagegen/portraits/role_038.png` + `assets/imagegen/portraits/role_006.png`
- Meme/番剧构图：番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
- 封面/海报/梗图灵感：可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。
- 构图分析：用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。
- ACG/neta：角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_038_role_006
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: 请关注一百满天原莎乐美喵 × 力竭了：先别急，这段算两个人都看见了。请关注一百满天原莎乐美喵和力竭了不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 名字回声事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：请关注一百满天原莎乐美喵和力竭了在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 你刚才是不是叫我了？我好像听到有回声在喊我的名字。 / 没有——至少不是我叫的。可能是湖边回声栈道自己。有些地方会记住经常来的人的名字。 / 如果湖边回声栈道会记名字——那它现在应该能背出我们所有人的ID了。 / 它肯定能。我就是来确认它有没有拼错的。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: 请关注一百满天原莎乐美喵：“你刚才是不是叫我了？我好像听到有回声在喊我的名字。”；力竭了：“没有——至少不是我叫的。可能是湖边回声栈道自己。有些地方会记住经常来的人的名字。”；请关注一百满天原莎乐美喵：“如果湖边回声栈道会记名字——那它现在应该能背出我们所有人的ID了。”；力竭了：“它肯定能。我就是来确认它有没有拼错的。”；请关注一百满天原莎乐美喵：“喵”；力竭了：“不赖”
Choice energy: 拱火：请关注一百满天原莎乐美喵负责把话题推高，力竭了负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：栈道留言瓶。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/is_this_a_pigeon.jpg` (Is This a Pigeon? pointing mislabel composition, source Know Your Meme). Use it only as a composition storyboard: use the confident misidentification skeleton: one character points at a glowing record/name echo, the other checks the core prop with deadpan disbelief. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original anime character, butterfly, caption layout, labels, or readable text.. Backup reference(s): sherlock_jr_projection .reference_cache/bond_cg_v3/sherlock_jr_projection.jpg (Detective/film-within-film framing: a big framed view, a smaller observer figure, and a clue that invites shared inspection.).
Character reference images: before generating, inspect and follow these exact designs. 请关注一百满天原莎乐美喵 portrait assets/imagegen/portraits/role_038.png, expressions {'neutral': 'assets/imagegen/expressions/role_038_neutral.png', 'happy': 'assets/imagegen/expressions/role_038_happy.png', 'tease': 'assets/imagegen/expressions/role_038_tease.png', 'serious': 'assets/imagegen/expressions/role_038_serious.png'}; 力竭了 portrait assets/imagegen/portraits/role_006.png, expressions {'neutral': 'assets/imagegen/expressions/role_006_neutral.png', 'happy': 'assets/imagegen/expressions/role_006_happy.png', 'tease': 'assets/imagegen/expressions/role_006_tease.png', 'serious': 'assets/imagegen/expressions/role_006_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: 请关注一百满天原莎乐美喵（回声诗页客）与力竭了（疲劳判定官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。请关注一百满天原莎乐美喵（回声诗页客）：主色 #603018 / #906078，符号 明亮眼神、餐厅小勺，梗种子 标题党、截图、色值、图片、大小；力竭了（疲劳判定官）：主色 #787878 / #d8d8d8，符号 明亮眼神、月光丝带，梗种子 图片、图包、截图、标题党、NNZ。
Relationship acting: 两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。 围绕“栈道留言瓶”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
Cover/poster/meme inspiration: 可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_039_role_012 vv × 早上了喵～：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_039_role_012.png`
- 剧情来源：`pair_role_039_role_012` / 名字回声事件 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：栈道留言瓶
- 关系动作：两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：is_this_a_pigeon, sherlock_jr_projection
- 立绘参考：`assets/imagegen/portraits/role_039.png` + `assets/imagegen/portraits/role_012.png`
- Meme/番剧构图：番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
- 封面/海报/梗图灵感：可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。
- 构图分析：用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。
- ACG/neta：角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_039_role_012
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: vv × 早上了喵～：先别急，这段算两个人都看见了。vv和早上了喵～不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 名字回声事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：vv和早上了喵～在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 你刚才是不是叫我了？我好像听到有回声在喊我的名字。 / 没有——至少不是我叫的。可能是湖边回声栈道自己。有些地方会记住经常来的人的名字。 / 如果湖边回声栈道会记名字——那它现在应该能背出我们所有人的ID了。 / 它肯定能。我就是来确认它有没有拼错的。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: vv：“你刚才是不是叫我了？我好像听到有回声在喊我的名字。”；早上了喵～：“没有——至少不是我叫的。可能是湖边回声栈道自己。有些地方会记住经常来的人的名字。”；vv：“如果湖边回声栈道会记名字——那它现在应该能背出我们所有人的ID了。”；早上了喵～：“它肯定能。我就是来确认它有没有拼错的。”；vv：“可以”；早上了喵～：“晚安”
Choice energy: 拱火：vv负责把话题推高，早上了喵～负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：栈道留言瓶。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/is_this_a_pigeon.jpg` (Is This a Pigeon? pointing mislabel composition, source Know Your Meme). Use it only as a composition storyboard: use the confident misidentification skeleton: one character points at a glowing record/name echo, the other checks the core prop with deadpan disbelief. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original anime character, butterfly, caption layout, labels, or readable text.. Backup reference(s): sherlock_jr_projection .reference_cache/bond_cg_v3/sherlock_jr_projection.jpg (Detective/film-within-film framing: a big framed view, a smaller observer figure, and a clue that invites shared inspection.).
Character reference images: before generating, inspect and follow these exact designs. vv portrait assets/imagegen/portraits/role_039.png, expressions {'neutral': 'assets/imagegen/expressions/role_039_neutral.png', 'happy': 'assets/imagegen/expressions/role_039_happy.png', 'tease': 'assets/imagegen/expressions/role_039_tease.png', 'serious': 'assets/imagegen/expressions/role_039_serious.png'}; 早上了喵～ portrait assets/imagegen/portraits/role_012.png, expressions {'neutral': 'assets/imagegen/expressions/role_012_neutral.png', 'happy': 'assets/imagegen/expressions/role_012_happy.png', 'tease': 'assets/imagegen/expressions/role_012_tease.png', 'serious': 'assets/imagegen/expressions/role_012_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: vv（回声诗页客）与早上了喵～（晨报铃使）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。vv（回声诗页客）：主色 #303030 / #181818，符号 明亮眼神、舞台票根，梗种子 图包、图片、截图、哈基、阿西；早上了喵～（晨报铃使）：主色 #603018 / #483018，符号 圆形构图、像素画笔，梗种子 超量、反叛、图包、弧形、图片。
Relationship acting: 两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。 围绕“栈道留言瓶”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
Cover/poster/meme inspiration: 可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_039_role_002 vv × Hxr：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_039_role_002.png`
- 剧情来源：`pair_role_039_role_002` / 名字回声事件 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：否）
- 核心物件：栈道留言瓶
- 关系动作：两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：is_this_a_pigeon, sherlock_jr_projection
- 立绘参考：`assets/imagegen/portraits/role_039.png` + `assets/imagegen/portraits/role_002.png`
- Meme/番剧构图：番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
- 封面/海报/梗图灵感：可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。
- 构图分析：用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。
- ACG/neta：角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_039_role_002
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: vv × Hxr：先别急，这段算两个人都看见了。vv和Hxr不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 名字回声事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：vv和Hxr在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 你刚才是不是叫我了？我好像听到有回声在喊我的名字。 / 没有——至少不是我叫的。可能是湖边回声栈道自己。有些地方会记住经常来的人的名字。 / 如果湖边回声栈道会记名字——那它现在应该能背出我们所有人的ID了。 / 它肯定能。我就是来确认它有没有拼错的。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: vv：“你刚才是不是叫我了？我好像听到有回声在喊我的名字。”；Hxr：“没有——至少不是我叫的。可能是湖边回声栈道自己。有些地方会记住经常来的人的名字。”；vv：“如果湖边回声栈道会记名字——那它现在应该能背出我们所有人的ID了。”；Hxr：“它肯定能。我就是来确认它有没有拼错的。”；vv：“可以”；Hxr：“羡慕你”
Choice energy: 拱火：vv负责把话题推高，Hxr负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：栈道留言瓶。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/is_this_a_pigeon.jpg` (Is This a Pigeon? pointing mislabel composition, source Know Your Meme). Use it only as a composition storyboard: use the confident misidentification skeleton: one character points at a glowing record/name echo, the other checks the core prop with deadpan disbelief. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original anime character, butterfly, caption layout, labels, or readable text.. Backup reference(s): sherlock_jr_projection .reference_cache/bond_cg_v3/sherlock_jr_projection.jpg (Detective/film-within-film framing: a big framed view, a smaller observer figure, and a clue that invites shared inspection.).
Character reference images: before generating, inspect and follow these exact designs. vv portrait assets/imagegen/portraits/role_039.png, expressions {'neutral': 'assets/imagegen/expressions/role_039_neutral.png', 'happy': 'assets/imagegen/expressions/role_039_happy.png', 'tease': 'assets/imagegen/expressions/role_039_tease.png', 'serious': 'assets/imagegen/expressions/role_039_serious.png'}; Hxr portrait assets/imagegen/portraits/role_002.png, expressions {'neutral': 'assets/imagegen/expressions/role_002_neutral.png', 'happy': 'assets/imagegen/expressions/role_002_happy.png', 'tease': 'assets/imagegen/expressions/role_002_tease.png', 'serious': 'assets/imagegen/expressions/role_002_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: vv（回声诗页客）与Hxr（零点连招手）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。vv（回声诗页客）：主色 #303030 / #181818，符号 明亮眼神、舞台票根，梗种子 图包、图片、截图、哈基、阿西；Hxr（零点连招手）：主色 #304860 / #304848，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、妈妈。
Relationship acting: 两人围绕“是不是有人叫我”互相确认，场景像把他们的名字和共同出没记录偷偷存档。 围绕“栈道留言瓶”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 番剧“突然听到背后有人喊名字”的回头构图：一人惊讶回头，另一人拿着记录/判定道具确认，背景出现世界线存档感光效。
Cover/poster/meme inspiration: 可借悬疑动画海报的背后呼唤回头、电影预告里光束照亮证据板、互联网“被点名当场回头”表情包的夸张脸部近景。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，用记录板、留言瓶或钟楼作为发光中心；一个角色回头听见名字，另一个检查记录，空气里有不可读的光粒回声。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 角色名被世界线记住、ED staff roll 只剩轮廓、存档名拼写确认、弹幕空耳召唤。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_039_role_003 vv × NNZ：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_039_role_003.png`
- 剧情来源：`pair_role_039_role_003` / 同步蹲点事件 / 动态拱火拆台型
- 实际场景：湖边回声栈道（旧区域是否冲突：是）
- 核心物件：栈道留言瓶
- 关系动作：一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：community_pizza_fire, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_039.png` + `assets/imagegen/portraits/role_003.png`
- Meme/番剧构图：进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
- 封面/海报/梗图灵感：可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。
- 构图分析：把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。
- ACG/neta：二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_039_role_003
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: vv × NNZ：先别急，这段算两个人都看见了。vv和NNZ不是“固定站一起”的模板组合，而是会根据谁先开口改变形状：一个负责把梗点燃，另一个负责判断是灭火还是加柴。
Episode type: 同步蹲点事件；关系类型：动态拱火拆台型。
Story beats to visualize: 旁白：vv和NNZ在湖边回声栈道碰上了。不是偶遇——在小镇里，所有人最后都会在同一个地方碰上。 / 哎你也在——我还以为今天就我一个人在湖边回声栈道晃。 / 我也是刚到的。听到你在这边就过来了。 / 那正好，省得我发私信。过来帮我看个东西。 / 又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。 / 旁白：角落里有什么东西轻轻亮了一下。不是灯——是湖边回声栈道在记录这次相遇。
Dialogue basis: vv：“哎你也在——我还以为今天就我一个人在湖边回声栈道晃。”；NNZ：“我也是刚到的。听到你在这边就过来了。”；vv：“那正好，省得我发私信。过来帮我看个东西。”；NNZ：“又是「正好」——你知不知道你这个「正好」已经用了一百多次了？每次都像是蹲点。”；vv：“可以”；NNZ：“神秘”
Choice energy: 拱火：vv负责把话题推高，NNZ负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：湖边回声栈道。视觉元素：月光湖面、木栈道、漂流瓶、诗页、萤火和留言灯。核心物件：栈道留言瓶。可带入区域 motif：漂流诗页、月相开关、栈道留言瓶、湖面倒影。
Reference frame: first inspect `.reference_cache/bond_cg_v3/community_pizza_fire.gif` (Community pizza fire reaction composition, source Know Your Meme). Use it only as a composition storyboard: use the doorway-arrival chaos skeleton: one character enters/catches the other in a too-obvious stakeout, with the core prop already causing a tiny incident. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the original actors, room, fire, pizza box, show logo, or live-action look.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. vv portrait assets/imagegen/portraits/role_039.png, expressions {'neutral': 'assets/imagegen/expressions/role_039_neutral.png', 'happy': 'assets/imagegen/expressions/role_039_happy.png', 'tease': 'assets/imagegen/expressions/role_039_tease.png', 'serious': 'assets/imagegen/expressions/role_039_serious.png'}; NNZ portrait assets/imagegen/portraits/role_003.png, expressions {'neutral': 'assets/imagegen/expressions/role_003_neutral.png', 'happy': 'assets/imagegen/expressions/role_003_happy.png', 'tease': 'assets/imagegen/expressions/role_003_tease.png', 'serious': 'assets/imagegen/expressions/role_003_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: vv（回声诗页客）与NNZ（星砂资料馆长）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。vv（回声诗页客）：主色 #303030 / #181818，符号 明亮眼神、舞台票根，梗种子 图包、图片、截图、哈基、阿西；NNZ（星砂资料馆长）：主色 #f0f0f0 / #78a8a8，符号 圆形构图、餐厅小勺，梗种子 图包、图片、截图、标题党、色值。
Relationship acting: 一个角色假装偶遇，另一个直接拆穿“正好”其实像蹲点；两人的熟人默契是核心。 围绕“栈道留言瓶”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 进门发现现场已经爆炸的反应梗构图：前景是刚进门/刚上线的人，背景是蹲点痕迹和核心物件的小事故，笑点来自当场抓包。
Cover/poster/meme inspiration: 可借情景喜剧混乱入场截图、侦探电影门缝窥视、监控回放多格画面和固定刷新点游戏截图的构图；允许广角、鱼眼、俯拍或夸张近景表情。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，把核心物件放在画面事故中心，入口/门框/转角做成抓包现场；一个角色刚入镜，另一个已经在固定刷新点旁露出“被抓到了”的吐槽表情。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 二周目读档蹲点、固定刷新点、上线提醒、监控回放、弹幕催“这也太会蹲了”。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```

## cg_pair_role_002_role_001 Hxr × 弧形反叛超量🐉：先别急，这段算两个人都看见了

- 输出：`assets/imagegen/cg/bonds/cg_pair_role_002_role_001.png`
- 剧情来源：`pair_role_002_role_001` / 短句连招与线索物判定 / 熟人接梗型
- 实际场景：龙牌馆（旧区域是否冲突：否）
- 核心物件：额外牌堆
- 关系动作：剧情只剩高密度短句，重点是两人用极短反应把线索物判成群聊名场面。
- 关系安全：群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
- 构图参考：general_train_poster, steamboat_wheel
- 立绘参考：`assets/imagegen/portraits/role_002.png` + `assets/imagegen/portraits/role_001.png`
- Meme/番剧构图：少年漫技能连招/吐槽役接招构图：一人像放技能一样抛梗，另一人用判定手势接住，背景有速度线但无文字。
- 封面/海报/梗图灵感：可借热血动画封面、动作喜剧搭档海报、格斗游戏必杀技 cut-in、吐槽役接梗 meme 的分屏近景；允许斜切画面和强透视。
- 构图分析：画成战斗漫画式短句连招：一人抛出线索，另一人用判定姿势接住，核心物件发出夸张但不可读的效果线。
- ACG/neta：弹幕番短句 combo、对话像技能前摇、吐槽役与接梗役合体技、SSR 判定演出。

```text
Use case: illustration-story
Asset type: 小康Online 双人羁绊解锁 CG，路径 pair_role_002_role_001
Primary request: 根据实际双人关系剧情重做一张羁绊图；画面必须让玩家看出这两个人为什么会解锁这张图，而不是普通双人合照。
Story source: Hxr × 弧形反叛超量🐉：先别急，这段算两个人都看见了。Hxr和弧形反叛超量🐉之间形成了稳定的固定搭档型。互动高频度为63.9，两人互动较为频繁，但互惠性很高。
Episode type: 短句连招与线索物判定；关系类型：熟人接梗型。
Story beats to visualize: 哪来的 / 哪来的 / 有内味了 / 别装没看见 / 这不是额外牌堆的问题，是你们都看见了。 / 可以
Dialogue basis: Hxr：“哪来的”；弧形反叛超量🐉：“有内味了”；Hxr：“别装没看见”；弧形反叛超量🐉：“这不是额外牌堆的问题，是你们都看见了。”；Hxr：“有游戏没有”；弧形反叛超量🐉：“可以”
Choice energy: 拱火：Hxr负责把话题推高，弧形反叛超量🐉负责把结论拐弯。 / 拆台：两人短暂沉默，然后一致决定先把镜头交给线索物。 / 认真问任务：他们终于说正事，但正事讲到一半还是变成梗。
Relationship safety: 群友都是真实存在的人，羁绊只表现朋友、群聊搭档、队友、吐槽役、共同目击者或任务协作者。禁止 CP/恋爱/暧昧/告白/约会/情侣感；禁止爱心、红线、心动箭头、脸红害羞、壁咚、牵手、拥抱、贴脸情侣海报、双人约会构图。如果立绘或参考里有心形小装饰，生成时改成星形、方牌、猫爪、问号或中性贴纸，不要保留心形符号。
Scene/backdrop: 以剧情文本实际场景为准：龙牌馆。视觉元素：深红木地板、龙角招牌、牌形地砖、绿色牌桌和额外牌堆。核心物件：额外牌堆。可带入区域 motif：无效门禁、额外牌堆、龙角裁判席、翻车记录板。
Reference frame: first inspect `.reference_cache/bond_cg_v3/general_train_poster.jpg` (The General train chase poster composition, source Wikimedia Commons). Use it only as a composition storyboard: use the diagonal action skeleton: a short dialogue combo turns into a fast prop chase or split-screen impact line with clear comic timing. Borrow camera angle, blocking, depth, negative space, silhouette rhythm, and gag timing only. Avoid copying: Do not copy the train design, actor likeness, poster text, or exact chase layout.. Backup reference(s): steamboat_wheel .reference_cache/bond_cg_v3/steamboat_wheel.jpg (Simple readable circular prop with elastic cartoon acting; useful as backup for slapstick object control.).
Character reference images: before generating, inspect and follow these exact designs. Hxr portrait assets/imagegen/portraits/role_002.png, expressions {'neutral': 'assets/imagegen/expressions/role_002_neutral.png', 'happy': 'assets/imagegen/expressions/role_002_happy.png', 'tease': 'assets/imagegen/expressions/role_002_tease.png', 'serious': 'assets/imagegen/expressions/role_002_serious.png'}; 弧形反叛超量🐉 portrait assets/imagegen/portraits/role_001.png, expressions {'neutral': 'assets/imagegen/expressions/role_001_neutral.png', 'happy': 'assets/imagegen/expressions/role_001_happy.png', 'tease': 'assets/imagegen/expressions/role_001_tease.png', 'serious': 'assets/imagegen/expressions/role_001_serious.png'}. Preserve hair shape, outfit silhouette, palette, accessories, and expression style from these立绘 references.
Subject: Hxr（零点连招手）与弧形反叛超量🐉（龙牌超量判官）同框，都是原创二次元像素 RPG 小镇居民，不是真实人物。Hxr（零点连招手）：主色 #304860 / #304848，符号 星砂发饰、像素画笔，梗种子 图包、图片、截图、感觉、妈妈；弧形反叛超量🐉（龙牌超量判官）：主色 #904800 / #303000，符号 圆形构图、月光丝带，梗种子 图包、图片、截图、标题党、色值。
Relationship acting: 剧情只剩高密度短句，重点是两人用极短反应把线索物判成群聊名场面。 围绕“额外牌堆”演出来，必须有明确的递话/接梗/拆台姿态。
Meme/anime composition: 少年漫技能连招/吐槽役接招构图：一人像放技能一样抛梗，另一人用判定手势接住，背景有速度线但无文字。
Cover/poster/meme inspiration: 可借热血动画封面、动作喜剧搭档海报、格斗游戏必杀技 cut-in、吐槽役接梗 meme 的分屏近景；允许斜切画面和强透视。 只借构图语法，不复刻具体商业作品画面、角色、logo、海报标题或可读文字。
Composition/framing: 横向 4:3，画成战斗漫画式短句连招：一人抛出线索，另一人用判定姿势接住，核心物件发出夸张但不可读的效果线。 两人和核心物件形成清楚三角关系；背景要能辨认区域，但不要抢走人物关系。
Camera/action freedom: 不需要保持 Q 版站姿或平视视角；可以自由使用俯视、仰视、近景夸张表情、追逐、回头、背靠背、分屏、剪影、错位透视、电影海报中心构图和强动态动作。角色可以更像事件 CG/海报中的二次元人物，但必须保留立绘的发型、服装轮廓、主色和配件。
ACG/neta direction: 弹幕番短句 combo、对话像技能前摇、吐槽役与接梗役合体技、SSR 判定演出。 用姿态、道具、分镜节奏、光效和表情表现，不要画成可读文字，不要引用具体商业动画角色或 logo。
Style/medium: 卡通像素 / 像素动漫 / ACG pixel event CG。只锁定像素卡通大方向；色调、质感、配色、光影和氛围可以完全按剧情与梗图灵感自由发挥，可以是温暖日常、霓虹悬疑、灾难片海报、热血分屏、胶片预告、夸张喜剧或暗色反差。角色表情可以夸张但不能崩，角色设计必须跟立绘一致。
Avatar constraint: 不要圆球头像背景，不要圆形头像底，不要 UI 头像框；如果需要小头像式符号，只保留头像/角色本体加清晰白色描边，像贴纸一样。
Constraints: 无可读文字、无水印、无真实照片、无程序化拼贴、不要把角色画成现实人物、不要聊天框、不要 UI、不要菜单。
```
