#!/usr/bin/env python3
"""
V2 Game Text Generator:
- Rewrites quest stories using new item names/themes
- Adds topic-based conflict dialogues between characters
- Deepens character personalities through topic reactions
- Syncs with user's modified 游戏全文案.md item changes
"""

import json, os, random, copy
from collections import defaultdict

random.seed(42)
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE, "src", "data")

# ================================================================
# ITEM NAME MAPPING (old → new from user's modifications)
# ================================================================
ITEM_RENAME = {
    "star_sand": ("星砂", "精华消息"),
    "online_echo": ("在线回声", "哦哦"),
    "poem_page": ("月边诗页", "聊天记录"),
    "card_shard": ("牌桌碎角", "yo-gi-oh!"),
    "meal_ticket": ("夜宵票根", "黄哥烤五花"),
    "palette_chip": ("调色碎片", "色图"),
    "next_time_coupon": ("稍后兑现券", "下次一定"),
    "half_sugar_verdict": ("半糖裁决", "快乐水"),
    "rice_button": ("饭点按钮", "美食图片"),
    "meme_steam": ("梗气蒸汽", "这是你"),
    "next_time_card": ("改日再战卡", "上分券"),
    "verdict_bell": ("裁决小铃", "针对米哈游玩家在本群地位的历史决议"),
    "stage_light_note": ("舞台灯便签", "XOX"),
    "portrait_patch": ("立绘补丁", "二向箔"),
    "codex_tab": ("图鉴页签", "老资历"),
    "moon_toggle": ("月色开关", "emo开关"),
    "tea_roster": ("茶局名单", "TS集合"),
    "nap_ticket": ("补觉票", "早上了喵"),
    "ending_key": ("终章钥匙", "管理员权限"),
    "signal_leaf": ("信号叶", "csn"),
    "mushroom_hint": ("蘑菇提示", "猴"),
    "campfire_reply": ("篝火回帖", "群聊之火"),
    "cache_broom": ("缓存扫帚", "缓存"),
    "core_key": ("核心密钥", "核心密钥"),
    "reply_tailwind": ("回帖顺风", "引用消息"),
}

# ================================================================
# CHARACTER TOPIC STANCES (verified from chat records)
# ================================================================
CHAR_TOPICS = {
    "role_001": {
        "name": "弧形反叛超量🐉",
        "game王": "狂热玩家，中二构筑解说，快嘴念技能，'有没有懂的'",
        "色图": "发图大户，r18g鉴赏家，'我现在已经在看r18g了'",
        "动画": "打牌动画悲观，拔作岛推广，'不要再看大奈奈的动画女生了'",
        "漫画": "海量转发，图片为主，偶尔评论画风",
        "游戏": "游戏王为主，怪猎联机，mhr开荒",
        "吃饭": "吃什么不重要，'一想到几小时前吃的💩就难受'",
        "XOX": "藤田琴音闹铃，国庆计划文学，偶像池子版《活着》评价",
    },
    "role_002": {
        "name": "Hxr",
        "XOX": "藤田琴音发病现场，'覚悟はいい？声出していくよ！'，重度偶像吃",
        "游戏": "硬核FPS玩家，排位上分，R6/APEX/瓦",
        "联机": "TS常驻，发IP拉人，车队组织者",
        "吃饭": "送大的，排队吃饭，'外边什么吃的都在排队'",
        "动画": "avemujica，mygo，考试耽误看番",
        "女声优": "羊宫妃那，CV话题，cv豚",
    },
    "role_003": {
        "name": "NNZ",
        "漫画": "本子画师点评，海量图片，'如何评价老牌本子画师'",
        "游戏": "什么游戏都玩，废萌galgame，发图机器",
        "动画": "物语系列，机器人动画片，回寝看动画片",
        "米哈游": "'如何评价原神'，星穹铁道抽卡梗",
        "色图": "'有没有这种题材的色图多来点'",
        "XOX": "imas梗，老资历考证，'90年代偶像剧'",
    },
    "role_004": {
        "name": "赛博鳏夫",
        "游戏": "格斗游戏，直播开播，dota2",
        "联机": "TS语音，排位，风暴点，车队核心",
        "色图": "'让我舔一下大腿'，大腿/腚鉴赏家",
        "动画": "'mygo又整烂活了吗'，女同动画片爱好者",
        "吃饭": "'是因为我只吃一顿饭导致的吗'",
        "米哈游": "男人一生只哭N次文学传播者",
    },
    "role_005": {
        "name": "青山照",
        "游戏": "galgame专家，甜蜜女友，爱上火车，ef",
        "XOX": "'你放心打学院偶像大师'，金毛妹妹段子",
        "动画": "物语动画，GOSICK，ef动画",
        "漫画": "海量转发，日语学习素材",
        "联机": "'有没有什么联机游戏'，手残友好型",
        "吃饭": "'甜蜜女友那个动态立绘有点猪鼻'，甜点爱好者",
    },
    "role_006": {
        "name": "力竭了",
        "XOX": "偶像大师超人，imassp汉化进度追踪，培育幻想文学",
        "动画": "素晴推荐，动画区已死论，漫画游戏小说代入",
        "游戏王": "老登打牌，游戏王二次元浓度，规则讨论",
        "上班": "'我上班两年半了，高二还没上完'，社畜文学",
        "女声优": "黄油CV关注，x上全关注的声优画师",
        "游戏": "胶带游戏王，日式rpg，slg",
    },
}

# ================================================================
# TOPIC CONFLICT DIALOGUES - natural group chat sparks
# ================================================================
TOPIC_CONFLICTS = [
    {
        "id": "topic_xox_debate",
        "topic": "XOX/小偶像",
        "trigger": "有人在群里发了一张藤田琴音的截图",
        "lines": [
            {"speaker": "narrator", "text": "旁白：一张学园偶像大师的截图出现在聊天框里。三秒之内，战争爆发了。"},
            {"speaker": "role_002", "text": "我超琴音🥰🥰🥰 啦啦啦啦啦啦啦啦 库里库里库里库里🤩🤩"},
            {"speaker": "role_012", "text": "不要对小偶像瑟瑟。我已经说过了。"},
            {"speaker": "role_002", "text": "我没瑟瑟！我只是在表达艺术欣赏！！"},
            {"speaker": "role_005", "text": "兄弟，刚有个1米56金毛妹妹一直打听你5月20号是不是一个人，你不是人还能是什么？我帮你把她骂走了，不用谢，你放心打学院偶像大师👍🏻"},
            {"speaker": "role_006", "text": "又幻想了，幻想我会培育憧憬偶像总是平地摔的普通女孩……"},
            {"speaker": "role_009", "text": "我看管人粉丝就跟看sb一样。哦等等这不是管人，这是小偶像。那没事了。"},
            {"speaker": "player", "text": "所以到底是可以瑟瑟还是不可以。"},
            {"speaker": "role_012", "text": "不可以。下一个问题。"},
            {"speaker": "role_001", "text": "我不管什么小偶像，我问你们有没有人打牌。"},
        ],
        "rewards": ["memory_topic_xox"]
    },
    {
        "id": "topic_eating_debate",
        "topic": "吃饭",
        "trigger": "晚饭时间，有人发了黄哥烤五花的照片",
        "lines": [
            {"speaker": "narrator", "text": "旁白：一张黄哥烤五花的照片。群聊瞬间进入了另一个维度。"},
            {"speaker": "role_002", "text": "有没有黄？有没有黄？"},
            {"speaker": "role_005", "text": "外边什么吃的都在排队。我先看看照片解馋。"},
            {"speaker": "role_014", "text": "全糖还是半糖？我是说快乐水。不对我问的是布丁。算了两个都问。"},
            {"speaker": "role_004", "text": "是因为我只吃一顿饭导致的吗。这烤肉看起来好香。"},
            {"speaker": "role_001", "text": "一想到几小时前吃的💩就难受。发这个图你是想让我死。"},
            {"speaker": "role_018", "text": "三分糖。烤肉也三分糖。"},
            {"speaker": "role_014", "text": "没有三分糖烤肉这种东西。"},
            {"speaker": "player", "text": "所以到底有没有黄。"},
            {"speaker": "role_009", "text": "我还在外面宝宝QAQ 别发了我要OD可口可乐了😭"},
        ],
        "rewards": ["memory_topic_eating"]
    },
    {
        "id": "topic_ygoh_debate",
        "topic": "游戏王",
        "trigger": "有人在龙牌馆发了新卡表",
        "lines": [
            {"speaker": "narrator", "text": "旁白：新卡表截图出现在龙牌馆。牌桌周围瞬间围满了人。"},
            {"speaker": "role_001", "text": "不是，主轴十二张废件三张俱舍独角兽加狼不带自在天通召点比命贵被灰了转狼狼被灰了转主轴三条线全能动手坑三灰五G两结界波泡影换一滴有没有懂的。"},
            {"speaker": "role_006", "text": "听懂了。但这构筑打天杯还是吃瘪。"},
            {"speaker": "role_001", "text": "你懂什么。这是我的羁绊同盟。今天后攻七连胜。"},
            {"speaker": "role_011", "text": "压抑了。我玩的卡组全在T3。"},
            {"speaker": "role_020", "text": "T3怎么了。高手都在T3。T1是留给没想象力的人的。"},
            {"speaker": "role_003", "text": "有没有懂的。游戏王卡图故事比打牌本身好看多了。"},
            {"speaker": "role_001", "text": "你说烙印？烙印ur抽的差不多了。异画阿尔贝两张。"},
            {"speaker": "player", "text": "所以这游戏到底是打牌还是抽卡。"},
            {"speaker": "role_001", "text": "都是。打牌是羁绊，抽卡是命运。分不开的。"},
        ],
        "rewards": ["memory_topic_ygoh"]
    },
    {
        "id": "topic_spicy_debate",
        "topic": "色图",
        "trigger": "凌晨三点，一张图片出现在聊天框里",
        "lines": [
            {"speaker": "narrator", "text": "旁白：凌晨三点。一张图片。发的人没有说话。"},
            {"speaker": "role_003", "text": "gkd"},
            {"speaker": "role_004", "text": "一个健壮的大腿或者一个大腚出现在屏幕里。好。"},
            {"speaker": "role_016", "text": "毛鸽。你们能不能注意一下时间。"},
            {"speaker": "role_001", "text": "zjsn,wcsn。只要你发了这图就是你，我不管的。"},
            {"speaker": "role_012", "text": "早上了喵～ [🔥5]。但现在是凌晨三点不是早上。"},
            {"speaker": "role_005", "text": "你不玩r18就好比青山照不吃屎。"},
            {"speaker": "role_009", "text": "我在外面宝宝QAQ。能不能不要在公共场合发这个。"},
            {"speaker": "player", "text": "所以这不是你的图？"},
            {"speaker": "role_001", "text": "我发了就是我的。我不发就不是我的。这是最基本的群聊物权法。"},
        ],
        "rewards": ["memory_topic_spicy"]
    },
    {
        "id": "topic_mhy_debate",
        "topic": "米哈游",
        "trigger": "有人不小心在群里提了原神",
        "lines": [
            {"speaker": "narrator", "text": "旁白：不知谁提了一嘴原神。群里的空气凝固了0.5秒。"},
            {"speaker": "role_003", "text": "wc，o"},
            {"speaker": "role_006", "text": "推荐崩铁没绷住。"},
            {"speaker": "role_009", "text": "你是来找可莉玩的吗？"},
            {"speaker": "role_001", "text": "我之前确实看到聊天室有发原神的🤣"},
            {"speaker": "role_005", "text": "我在一教自习那边桌子路过的时候听到了原神的启动声音。差点报警。"},
            {"speaker": "role_018", "text": "你玩原神吗？"},
            {"speaker": "role_005", "text": "@Mini Oreo 你玩原神吗？不要反问我。"},
            {"speaker": "role_003", "text": "针对米哈游玩家在本群地位的历史决议：可以玩，但不能说。"},
            {"speaker": "player", "text": "所以这里是禁米还是不禁。"},
            {"speaker": "role_009", "text": "不禁。但会收获群友的特别关爱。你准备好就行。"},
        ],
        "rewards": ["memory_topic_mhy"]
    },
    {
        "id": "topic_anime_debate",
        "topic": "动画",
        "trigger": "有人提到avemujica最新一集",
        "lines": [
            {"speaker": "narrator", "text": "旁白：avemujica这个词出现在屏幕上。整个群进入了动画评论模式。"},
            {"speaker": "role_002", "text": "都因为傻逼考试我avemujica都没看。别剧透！！"},
            {"speaker": "role_004", "text": "mygo又整烂活了吗。"},
            {"speaker": "role_006", "text": "唉，感觉是动画区死了，没有太多创作热情。"},
            {"speaker": "role_003", "text": "到点了，回寝看动画片。今天看物语。"},
            {"speaker": "role_001", "text": "@NNZ nnz 不要再看大奈奈的动画女生了。"},
            {"speaker": "role_005", "text": "我还记得当初看ef动画第一季的感觉。那时候还没这么多异世界。"},
            {"speaker": "role_003", "text": "很多动画都喜欢和恋爱这种特别亲密关系靠拢。不是不好，是太多了。"},
            {"speaker": "player", "text": "所以avemujica到底好不好看。"},
            {"speaker": "role_002", "text": "我说了别剧透！！！！"},
        ],
        "rewards": ["memory_topic_anime"]
    },
]

# ================================================================
# QUEST STORY REWRITES using new item names
# ================================================================
QUEST_REWRITES = {
    "main_quest_01": {
        "name": "第一章：龙王喷泉！？",
        "story": "小镇中心的龙王喷泉突然开始自动播放旧消息——不是bug，是群聊核心在苏醒前打了个嗝。许多过往的记忆都冒了出来，喷泉里飘着三年前的「晚安」和昨天的「有没有黄」。作为刚上线的代理人，你需要查明第一条异常消息的来源，通过找回精华消息来和这股奇妙的力量对冲。",
        "conclusion": "喷泉自动播放旧消息的原因找到了：服务器的缓存数据通过喷泉水柱泄露了出来。你从水柱中提取了第一条异常消息——一条三天前发出的'晚安'，发消息的人至今还在线上。敲响小康钟后喷泉恢复正常，广场的群聊核心重新进入稳定待机状态。你获得了第一枚魂印碎片，任务日志系统已解锁。"
    },
    "main_quest_02": {
        "name": "第二章：锅从餐厅飞到牌桌",
        "story": "广场稳定后，Hxr告诉你餐厅和龙牌馆之间出现了「甩锅回路」——餐厅的召集锅一直在喊集合却没人响应，龙牌馆的判定门则把锅甩给了规则缺失。而在这一切发生的同时，群聊里的黄哥烤五花照片还在刷屏。你需要分别处理两边的异常，让日常感重新上线。",
        "conclusion": "餐厅和龙牌馆的异常是同一个问题的两种表现：群聊核心的日常模块在广场修复后没有同步更新。你分别调试了两个区域的物件——餐厅的召集锅确认了晚饭继续，龙牌馆的判定门补上了规则纸条。两个区域恢复正常后，Livehouse和湖边回声栈道的入口自动解锁。Hxr说了一句「有没有黄？」然后自己回答了「有」。"
    },
    "main_quest_03": {
        "name": "第三章：灯光和月亮互相误会了什么",
        "story": "新区域开放——Livehouse的舞台在夜间自动亮灯却无人演出，湖边的月亮多了一个倒影却找不到来源。NNZ认为这两件事有关联：赛博鳏夫在Livehouse说了一句没发出去的话，被湖面当成月光反射了回来。与此同时，有人在群里问「有没有这种题材的色图多来点」。",
        "conclusion": "Livehouse的舞台灯自动亮起是因为上一次演出后灯光记忆没有被清除。湖面多出来的月相是舞台灯在水面上的反射——颜色偏暖，介于舞台灯的金色和某个角色的头像色之间。你调整了灯控台并捞起了湖上的聊天记录诗页后，两个异常同时消失。养老院、工坊和自然区三个新区域同步解锁。NNZ顺手发了一张色图庆祝。"
    },
    "main_quest_04": {
        "name": "第四章：色板偏移和沉默的信号塔",
        "story": "养老院、工坊和自然区都开放了。但青山照发现工坊的色板整体偏了2度——导致生成的色图立绘都不像本人。同时，自然区的信号塔完全沉默，连「哦哦」都发不出去。这两件事指向同一个问题：有人在工坊里改了一个角色的主色，连锁反应让信号塔失去了参照坐标。青山照怀疑是XOX的光污染导致的。",
        "conclusion": "工坊色板偏移的原因是有人在调试色图滤镜——把冷色调调暖了2度，想让色图看起来更有温度。这个改动通过打印机同步影响到了龙牌馆的yo-gi-oh!牌面印刷，连锁反应让自然区信号塔失去了颜色参照坐标而停止工作。你校准了色板、清理了信号塔后，地下服务器房的入口感应到你并自动解锁。养老院的存档点已更新——老资历们又可以吹寒武纪的故事了。"
    },
    "main_quest_05": {
        "name": "终章：服务器上线，全员回应",
        "story": "地下服务器房的缓存过载了——三个月来的所有「哦哦」和「你在吗」堆积在缓存区，群聊核心被压得无法重启。夜处理炼金师需要你清理缓存、折叠重复梗，然后按下重启杆。当小康钟重新响起时，所有你建立过羁绊的角色都会在广场上回应。聊天记录里的每一条精华消息都会变成一颗星砂。",
        "conclusion": "服务器缓存过载的原因是三个月来的所有回声没有被分类——重复的「晚安」「在吗」「哈哈哈」和重要的羁绊回声混在一起。你手动清理了缓存，折叠了重复内容，标记了所有羁绊回声为不可删除。核心重启后，小康钟响了三声，所有达成羁绊的角色在广场上给出了收尾回应。小镇进入常驻在线模式。青山照说了一句「唉我草——这设定也太温柔了」，然后发了今夜的第一张黄哥烤五花。"
    },
}

# ================================================================
# CHARACTER DEEPENING: Daily dialogues enriched with topic stances
# ================================================================
TOPIC_DAILY_SCENES = [
    {
        "id": "daily_topic_role_001_game王",
        "speaker": "role_001",
        "area": "dragon_card_house",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：弧形反叛超量🐉正对着龙角灯发呆。他在想新构筑。"},
            {"speaker": "role_001", "text": "我跟你说，我现在这个构筑，主轴十二张废件三张。不是不会组卡，是相信羁绊。三张废件是我留给命运的变量——上手了是我运气不好，不上手的时候这副牌的纯度是别人的三倍。你看不懂这个逻辑就说明你还没玩透。"},
            {"speaker": "player", "text": "我听懂了，但我不确定我懂了。"},
            {"speaker": "role_001", "text": "这就对了。真正理解构筑的人永远不确定自己懂了。我打牌打了四万局，每一局都在学习。"},
            {"speaker": "narrator", "text": "旁白：龙角灯闪了一下。不是在回应——是电压不稳。"},
        ],
        "rewards": ["codex_role_001"]
    },
    {
        "id": "daily_topic_role_002_xox",
        "speaker": "role_002",
        "area": "echo_lake",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：Hxr对着湖面小声哼着什么。听起来像是偶像大师的某首曲子。"},
            {"speaker": "role_002", "text": "你怎么看小偶像？我跟你说，藤田琴音是世界上最可爱的生物。我同桌说有点恶心——我一瞬间红了眼，上去就——算了不说这个了。"},
            {"speaker": "player", "text": "你同桌还活着吗。"},
            {"speaker": "role_002", "text": "活着。但再也不敢在我面前说小偶像的坏话了。你要不要听听琴音的闹铃？我设为起床铃了。"},
            {"speaker": "narrator", "text": "旁白：湖面泛起涟漪。湖里的回声似乎也在哼歌。"},
        ],
        "rewards": ["codex_role_002"]
    },
    {
        "id": "daily_topic_role_003_manga",
        "speaker": "role_003",
        "area": "atelier",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：NNZ正在整理像素炼画工坊的图鉴。抽屉里塞满了各种画风的参考图。"},
            {"speaker": "role_003", "text": "如何评价老牌本子画师的新作。我看了。画风进步了但分镜退步了。有没有懂的。"},
            {"speaker": "player", "text": "你是在分析艺术还是在分析别的什么。"},
            {"speaker": "role_003", "text": "都是。好的色图就是好的艺术。构图、光影、人体结构——差一点都不行。你以为涩涩很简单？你试试。"},
            {"speaker": "narrator", "text": "旁白：打印机嗡了一声，吐出了一张参考图。图上的光影确实很讲究。"},
        ],
        "rewards": ["codex_role_003"]
    },
    {
        "id": "daily_topic_role_004_gaming",
        "speaker": "role_004",
        "area": "livehouse",
        "time": "night",
        "lines": [
            {"speaker": "narrator", "text": "旁白：赛博鳏夫在Livehouse的舞台上调试设备。麦克风旁边放着一台游戏本。"},
            {"speaker": "role_004", "text": "我醒了——今天排位上了两段。风暴点一把鸡一把第二。队友？不需要。我一个人就是车队。"},
            {"speaker": "player", "text": "你这Livehouse到底是演出场地还是网吧。"},
            {"speaker": "role_004", "text": "都是。舞台灯给我照着键盘，音响给我放着脚步。谁说电竞不是一种演出。"},
            {"speaker": "narrator", "text": "旁白：灯控台的屏幕亮了一下——它在自动回放昨晚那场排位的灯光记录。"},
        ],
        "rewards": ["codex_role_004"]
    },
    {
        "id": "daily_topic_role_005_galgame",
        "speaker": "role_005",
        "area": "town_center",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：青山照坐在广场的长椅上，手里拿着一本轻小说。"},
            {"speaker": "role_005", "text": "唉我草——你知道甜蜜女友那个动态立绘吗。不是一般的猪鼻。但剧情是真的甜。个人感觉是异世界题材里结合得最好的。"},
            {"speaker": "player", "text": "甜蜜女友是异世界题材？"},
            {"speaker": "role_005", "text": "不是。我说的是另一部。算了别管了。关键是我的存档丢了——不想活了。"},
            {"speaker": "narrator", "text": "旁白：小康钟轻轻响了一声——存档点的守护者在回应。"},
        ],
        "rewards": ["codex_role_005"]
    },
    {
        "id": "daily_topic_role_006_work",
        "speaker": "role_006",
        "area": "dragon_card_house",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：力竭了今天看起来很累。他的茶已经凉了三次。"},
            {"speaker": "role_006", "text": "我上班两年半了，高二还没上完。不是真的高二——是心态。心态永远停留在高二那年暑假。"},
            {"speaker": "player", "text": "社畜的终极形态。"},
            {"speaker": "role_006", "text": "确实。但你猜怎么着——我下班以后打了三局牌。赢了。对面是天杯。天杯被我打爆了。这才是活着的意义。"},
            {"speaker": "narrator", "text": "旁白：力竭了端起茶喝了一口。茶还是凉的。但他说这话的时候是热的。"},
        ],
        "rewards": ["codex_role_006"]
    },
]

# ================================================================
# MAIN: Generate v2 files
# ================================================================

def load_json(name):
    with open(os.path.join(DATA_DIR, name), 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(data, name):
    path = os.path.join(DATA_DIR, name)
    backup = path + ".v1bak"
    if os.path.exists(path) and not os.path.exists(backup):
        os.rename(path, backup)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return path

def update_items():
    """Update items.json with user's modified names and descriptions."""
    items = load_json("items.json")

    # Apply renames
    for item in items:
        item_id = item["id"]
        if item_id in ITEM_RENAME:
            old_name, new_name = ITEM_RENAME[item_id]
            item["name"] = new_name

    save_json(items, "items.json")
    print(f"✅ Items updated: {len(items)} items")
    return items

def update_quests():
    """Rewrite quest stories using new item names."""
    quests = load_json("quests.json")

    for quest in quests:
        qid = quest["id"]
        if qid in QUEST_REWRITES:
            rewrite = QUEST_REWRITES[qid]
            quest["name"] = rewrite.get("name", quest.get("name", ""))
            quest["story"] = rewrite.get("story", quest.get("story", ""))
            quest["conclusion"] = rewrite.get("conclusion", quest.get("conclusion", ""))

    save_json(quests, "quests.json")
    print(f"✅ Quests updated: {len(quests)} quests")
    return quests

def update_dialogues():
    """Add topic conflict scenes and character deepening dialogues."""
    dialogues = load_json("dialogues.json")

    # Add topic conflict scenes
    for conflict in TOPIC_CONFLICTS:
        # Check if already exists
        if not any(d.get("id") == conflict["id"] for d in dialogues):
            dialogues.append(conflict)

    # Add topic daily scenes
    for scene in TOPIC_DAILY_SCENES:
        if not any(d.get("id") == scene["id"] for d in dialogues):
            dialogues.append(scene)

    # Update existing quest dialogues to use new item names
    for scene in dialogues:
        for line in scene.get("lines", []):
            if "text" in line:
                for old_id, (old_name, new_name) in ITEM_RENAME.items():
                    if old_name in line["text"]:
                        line["text"] = line["text"].replace(old_name, new_name)

    save_json(dialogues, "dialogues.json")
    print(f"✅ Dialogues updated: {len(dialogues)} scenes (+{len(TOPIC_CONFLICTS)} topic conflicts, +{len(TOPIC_DAILY_SCENES)} character deepens)")
    return dialogues

if __name__ == "__main__":
    print("=" * 60)
    print("🎮 V2 Game Text Generator")
    print("=" * 60)

    items = update_items()
    quests = update_quests()
    dialogues = update_dialogues()

    print(f"\n✅ V2 generation complete!")
    print(f"📊 Summary:")
    print(f"   Items: {len(items)} (renamed per user's md)")
    print(f"   Quests: {len(quests)} (5 main quests rewritten)")
    print(f"   Dialogues: {len(dialogues)} scenes")
    print(f"     + {len(TOPIC_CONFLICTS)} topic conflict scenes")
    print(f"     + {len(TOPIC_DAILY_SCENES)} character deepening scenes")
    print(f"\n💡 Run smoke test to verify game loads correctly.")
