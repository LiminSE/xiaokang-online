# Imagegen 角色资产导入说明

本项目最终角色资产必须来自聊天窗口 imagegen 生成图或等价 imagegen 输出；程序化绘制的小人图不得作为最终验收资产。

导入目标：

- 母图：`assets/imagegen/sheets/{role_id}_sheet.png`
- 像素头像：`assets/imagegen/avatars/{role_id}.png`
- 对话立绘：`assets/imagegen/portraits/{role_id}.png`
- 行走 sprite：`assets/imagegen/sprites/{role_id}.png`
- 表情差分：`assets/imagegen/expressions/{role_id}_{neutral|happy|tease|serious}.png`

当前聊天窗口已生成 8 张 5 人角色包图。由于该工具未暴露可复制的本地文件路径，工程内同时保留了逐角色 prompt 清单，便于将聊天窗口保存的 imagegen 图放入上述目录后验收。

## 逐角色 Prompt

### role_001 弧形反叛超量🐉

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_001
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 弧形反叛超量🐉 as 龙牌超量判官, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、月光丝带. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、气氛组. Native area mood: 龙牌馆.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #904800, #303000, #484818, #183000; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_002 Hxr

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_002
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: Hxr as 零点连招手, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 星砂发饰、像素画笔. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、气氛组. Native area mood: 湖边回声栈道.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #304860, #304848, #183048, #486078; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_003 NNZ

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_003
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: NNZ as 星砂资料馆长, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、餐厅小勺. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、话题发起者. Native area mood: 像素炼画工坊.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #f0f0f0, #78a8a8, #d8d8d8, #a8c0c0; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_004 赛博鳏夫

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_004
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 赛博鳏夫 as 赛博夜航人, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、舞台票根. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、好问型. Native area mood: Nightbird Livehouse.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #d8d8d8, #f0f0f0, #604848, #606060; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_005 青山照

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_005
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 青山照 as 青山回声调停者, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、牌纹徽章. Personality rhythm: 高能量发言者、情绪支持型、表情包使用者、吐槽达人. Native area mood: 小镇中心.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #f0d8d8, #d8a8a8, #606090, #f0c0a8; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_006 力竭了

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_006
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 力竭了 as 疲劳判定官, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 明亮眼神、月光丝带. Personality rhythm: 高能量发言者、理性分析型、表情包使用者、图片分享者. Native area mood: 龙牌馆.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #787878, #d8d8d8, #c0c0c0, #606060; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_007 V²

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_007
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: V² as V平方调律师, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 明亮眼神、像素画笔. Personality rhythm: 高能量发言者、情绪支持型、表情包使用者、图片分享者. Native area mood: 小镇中心.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #606078, #a8a8c0, #c0c0c0, #484860; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_008 沉机

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_008
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 沉机 as 回声转译师, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 明亮眼神、餐厅小勺. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、气氛组. Native area mood: 湖边回声栈道.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #d8a8a8, #c090a8, #c09090, #f0d8d8; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_009 多点关心

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_009
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 多点关心 as 关心信标使, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 星砂发饰、舞台票根. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、话题发起者. Native area mood: 小康餐厅.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #d8d8d8, #d8c0d8, #a8a8c0, #c0a8c0; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_010 普罗米亚写真集

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_010
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 普罗米亚写真集 as 星火影集师, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 星砂发饰、牌纹徽章. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、话题发起者. Native area mood: 像素炼画工坊.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #c0c0c0, #d8d8d8, #d8d8c0, #a8a8a8; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_011 没办法

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_011
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 没办法 as 无解牌桌顾问, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 星砂发饰、月光丝带. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、话题发起者. Native area mood: 龙牌馆.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #606060, #484830, #484848, #786060; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_012 早上了喵～

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_012
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 早上了喵～ as 晨报铃使, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、像素画笔. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、话题发起者. Native area mood: 小镇中心.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #603018, #483018, #784830, #604830; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_013 已电子ed

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_013
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 已电子ed as 电子梦游者, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 星砂发饰、餐厅小勺. Personality rhythm: 高能量发言者、情绪支持型、表情包使用者、图片分享者. Native area mood: 像素炼画工坊.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #c0f090, #90a8c0, #d8f0f0, #d8d8d8; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_014 健康哥哥

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_014
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 健康哥哥 as 体力补给官, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、舞台票根. Personality rhythm: 理性分析型、表情包使用者、图片分享者、回复积极型. Native area mood: 小康餐厅.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #909090, #787878, #606060, #a8a8a8; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_015 重新减肥

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_015
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 重新减肥 as 作息重启师, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 发色锚点、牌纹徽章. Personality rhythm: 高能量发言者、情绪支持型、表情包使用者、图片分享者. Native area mood: 小康养老院.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #300018, #180000, #180018, #000018; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_016 我早已麻痹

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_016
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 我早已麻痹 as 回声收束者, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、月光丝带. Personality rhythm: 高能量发言者、情绪支持型、表情包使用者、图片分享者. Native area mood: 小康养老院.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #d8d8d8, #c0c0c0, #d8c0c0, #a8a8a8; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_017 很复杂

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_017
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 很复杂 as 分岔解码员, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 星砂发饰、像素画笔. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、话题发起者. Native area mood: 北部自然区.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #d8c090, #787860, #c0a890, #786048; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_018 Mini Oreo

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_018
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: Mini Oreo as 夹心观察员, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 明亮眼神、餐厅小勺. Personality rhythm: 情绪支持型、表情包使用者、图片分享者、潜水观察型. Native area mood: 小康餐厅.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #f0d8a8, #f0d8d8, #f0c0a8, #d8c0c0; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_019 不好办

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_019
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 不好办 as 未解事务官, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、舞台票根. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、话题发起者. Native area mood: 湖边回声栈道.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #f0d8d8, #f0c0c0, #d8c0c0, #f0d8c0; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_020 高手

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_020
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 高手 as 牌桌高手, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、牌纹徽章. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、话题发起者. Native area mood: 龙牌馆.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #606060, #787890, #301818, #c0c0d8; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_021 ❗您无法在已退出的群聊发送消息

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_021
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: ❗您无法在已退出的群聊发送消息 as 星砂调色师, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 星砂发饰、月光丝带. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、回复积极型. Native area mood: 像素炼画工坊.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #907878, #604848, #c0c0a8, #a89090; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_022 N2过了不恨了

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_022
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: N2过了不恨了 as 炼画调色师, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、像素画笔. Personality rhythm: 表情包使用者、图片分享者、吐槽达人、回复积极型. Native area mood: 像素炼画工坊.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #486078, #486090, #606090, #183048; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_023 Du.

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_023
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: Du. as 回声诗页客, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 发色锚点、餐厅小勺. Personality rhythm: 高能量发言者、情绪支持型、表情包使用者、图片分享者. Native area mood: 湖边回声栈道.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #784830, #603018, #481818, #906048; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_025 敏龟的感头

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_025
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 敏龟的感头 as 星砂调色师, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 明亮眼神、牌纹徽章. Personality rhythm: 高能量发言者、表情包使用者、图片分享者、回复积极型. Native area mood: 像素炼画工坊.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #9090a8, #a8a8c0, #a8a8a8, #909090; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_026 LQS群里指定丈夫

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_026
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: LQS群里指定丈夫 as 回声诗页客, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、月光丝带. Personality rhythm: 高能量发言者、情绪支持型、表情包使用者、图片分享者. Native area mood: 湖边回声栈道.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #d8d8d8, #a8a8a8, #d8c0c0, #c0a8a8; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_027 Dark Kami Slayer

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_027
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: Dark Kami Slayer as 炼画调色师, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、像素画笔. Personality rhythm: 表情包使用者、图片分享者、回复积极型、气氛组. Native area mood: 像素炼画工坊.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #303048, #303030, #a8c0d8, #183048; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_028 ナナリ

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_028
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: ナナリ as 判定判官, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、餐厅小勺. Personality rhythm: 理性分析型、表情包使用者、图片分享者、长篇输出型. Native area mood: 龙牌馆.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #c07890, #c090a8, #303048, #784878; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_029 kuro

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_029
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: kuro as 判定判官, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 发色锚点、舞台票根. Personality rhythm: 理性分析型、表情包使用者、图片分享者、话题发起者. Native area mood: 龙牌馆.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #d8d8d8, #d8c0c0, #f0d8d8, #d8d8c0; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_030 白给人

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_030
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 白给人 as 回声诗页客, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 发色锚点、牌纹徽章. Personality rhythm: 情绪支持型、表情包使用者、图片分享者、话题发起者. Native area mood: 湖边回声栈道.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #d8d8d8, #f0f0f0, #c0c0c0, #c68342; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_031 六界三鲜

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_031
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 六界三鲜 as 星砂调色师, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 明亮眼神、月光丝带. Personality rhythm: 表情包使用者、图片分享者、话题发起者、回复积极型. Native area mood: 像素炼画工坊.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #181818, #303030, #000000, #484848; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_032 猫耳半圆

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_032
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 猫耳半圆 as 回声诗页客, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 星砂发饰、像素画笔. Personality rhythm: 表情包使用者、图片分享者、话题发起者、回复积极型. Native area mood: 湖边回声栈道.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #c0d8d8, #d8d8d8, #d8f0f0, #c0c0d8; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_033 Celestial

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_033
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: Celestial as 回声诗页客, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 星砂发饰、餐厅小勺. Personality rhythm: 情绪支持型、表情包使用者、图片分享者、话题发起者. Native area mood: 湖边回声栈道.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #787860, #786048, #907860, #909078; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_034 只能往标志方向发展了

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_034
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 只能往标志方向发展了 as 星砂调色师, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 星砂发饰、舞台票根. Personality rhythm: 表情包使用者、图片分享者、话题发起者、气氛组. Native area mood: 像素炼画工坊.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #484848, #304848, #183030, #483048; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_036 夜处理炼金师

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_036
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 夜处理炼金师 as 夜处理炼金师, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 圆形构图、月光丝带. Personality rhythm: 理性分析型、表情包使用者、图片分享者、信息分享者. Native area mood: 地下服务器房.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #181848, #909090, #606060, #787890; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_038 请关注一百满天原莎乐美喵

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_038
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: 请关注一百满天原莎乐美喵 as 回声诗页客, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 明亮眼神、餐厅小勺. Personality rhythm: 情绪支持型、表情包使用者、图片分享者、话题发起者. Native area mood: 湖边回声栈道.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #603018, #906078, #603030, #907878; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

### role_039 vv

```text
Use case: stylized-concept
Asset type: XiaokangOnline character sheet for role_039
Primary request: Generate one original anime-style feminized chibi pixel RPG character asset sheet based on the source QQ avatar visual DNA. The character must be a cute 二次元 娘化 pixel-art town resident, not a realistic person and not a direct copy of any avatar. Design theme: vv as 回声诗页客, inspired by avatar color anchors and symbols.
Input/reference rule: first analyze the source avatar as visual DNA, then transform it into a fantasy anime girl. Preserve the avatar's dominant palette, overall silhouette impression, one or more symbolic motifs, and emotional mood. Do not paste or trace the original avatar; this is a creative feminized anime translation.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background, no shadows, gradients, texture, floor plane, text, labels, watermark, or UI.
Subject: one cute chibi anime girl with large expressive eyes, clear hair silhouette, fantasy accessory, warm indie pixel RPG costume, and readable small-size shape. Avatar soulmark symbols to include subtly: 明亮眼神、舞台票根. Personality rhythm: 情绪支持型、表情包使用者、图片分享者、话题发起者. Native area mood: 湖边回声栈道.
Style/medium: high-quality Japanese anime chibi character design plus crisp pixel-art finish; cozy colorful RPG style; clean outline; feminine, charming, polished.
Composition/framing: one sheet containing, separated with generous padding: left large full-body front-view character; top-right four bust expression portraits (neutral, happy, teasing/tucao, serious); bottom-right RPG walking sprite strip with front/back/left/right directions and 3 frames each. Keep all parts consistent as the same character.
Color palette: use these dominant colors from the source avatar as anchors: #303030, #181818, #606060, #000000; vary with warm highlights, avoid muddy single-hue look.
Avatar-match acceptance: the final character must make the original avatar recognizable through color, silhouette, symbol, and mood after feminized anime translation.
Constraints: no text, no watermark, no logos, no QQ number, no real-world school/company/name hints; do not use #00ff00 in the character; character must be fully separated from the background.
```

