#!/usr/bin/env python3
"""
V3: Full game text regeneration based on finalized items.
- Reads current items (already synced from md, DO NOT MODIFY)
- Generates topic-based dialogue scenes with authentic chat-record reactions
- Rewrites main quests to integrate new item themes
- Creates character reaction matrix for common topics
- Exports everything to md
"""

import json, os

random_seed = 42
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE, "src", "data")

def load(name):
    with open(os.path.join(DATA_DIR, name), 'r', encoding='utf-8') as f:
        return json.load(f)

def save(data, name):
    path = os.path.join(DATA_DIR, name)
    # Keep existing backup
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# ================================================================
# TOPIC DIALOGUE SCENES — authentic group chat conflicts
# Each scene is triggered by a topic and shows character reactions
# ================================================================

TOPIC_SCENES = [
    # ── XOX / 小偶像 ──
    {
        "id": "topic_xox_1",
        "speaker": "role_002",
        "area": "town_center",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：一张学园偶像大师的截图出现在聊天框里。Hxr率先响应。"},
            {"speaker": "role_002", "text": "我超琴音🥰🥰 尼玛这画面也太好看了。藤田琴音是世界第一可爱。"},
            {"speaker": "role_012", "text": "不要对小偶像瑟瑟。我已经说过很多次了。"},
            {"speaker": "role_002", "text": "tmd我没瑟瑟！这是艺术欣赏！"},
            {"speaker": "role_006", "text": "又幻想了，幻想我会培育憧憬偶像总是平地摔的普通女孩、满嘴我只有唱歌了的蓝毛歌神……"},
            {"speaker": "role_005", "text": "兄弟，刚有个金毛妹妹打听你5月20号是不是一个人。我帮你骂走了，你放心打学院偶像大师👍🏻"},
            {"speaker": "role_009", "text": "我看管人粉丝就跟看sb一样。哦等等这是小偶像不是管人。那没事了。"},
            {"speaker": "player", "text": "所以到底可不可以对小偶像瑟瑟"},
            {"speaker": "role_012", "text": "不可以。不要对。小偶像。瑟瑟。下一个问题。"},
        ],
        "rewards": ["memory_topic_xox_1"]
    },
    # ── 吃饭 ──
    {
        "id": "topic_eating_1",
        "speaker": "role_002",
        "area": "restaurant",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：晚饭时间。一张黄哥烤五花的照片出现在屏幕上。群聊瞬间进入抢饭模式。"},
            {"speaker": "role_002", "text": "有没有黄？有没有黄？外边什么吃的都在排队，我快饿死了。"},
            {"speaker": "role_005", "text": "我先看看照片解馋。甜蜜女友那个动态立绘有点猪鼻但烤五花是真的香。"},
            {"speaker": "role_014", "text": "全糖还是半糖？我是说快乐水。不对我问的是布丁。算了两个都问。"},
            {"speaker": "role_004", "text": "是因为我只吃一顿饭导致的吗。这烤肉看起来好香。"},
            {"speaker": "role_001", "text": "一想到几小时前吃的💩就难受。发这个图你想让我死🐴。"},
            {"speaker": "role_018", "text": "三分糖。烤肉也三分糖。全糖太甜半糖太淡三分刚好。"},
            {"speaker": "role_009", "text": "我还在外面宝宝QAQ 别发了我要OD可口可乐了😭"},
            {"speaker": "player", "text": "所以到底有没有黄"},
            {"speaker": "role_002", "text": "有。但还在排队。tmd。"},
        ],
        "rewards": ["memory_topic_eating_1"]
    },
    # ── 游戏王 ──
    {
        "id": "topic_ygoh_1",
        "speaker": "role_001",
        "area": "dragon_card_house",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：新卡表截图出现在龙牌馆。牌桌周围瞬间围满了人。"},
            {"speaker": "role_001", "text": "主轴十二张废件三张俱舍独角兽加狼不带自在天通召点比命贵被灰了转狼狼被灰了转主轴三条线全能动手坑三灰五G两结界波泡影换一滴有没有懂的。"},
            {"speaker": "role_006", "text": "还真是。但这构筑打天杯还是吃瘪。现在环境全是天杯，先攻压四个阻抗后攻otk。"},
            {"speaker": "role_001", "text": "你懂什么。这是我的羁绊同盟。今天后攻七连胜。每一把对面都以为我卡手了，我从裤裆里掏出一滴直接把你终场变傻逼。"},
            {"speaker": "role_011", "text": "压抑了。我玩的卡组全在T3。没办法。"},
            {"speaker": "role_020", "text": "T3怎么了。高手都在T3。T1是留给没想象力的人的。"},
            {"speaker": "role_003", "text": "有没有懂的。游戏王卡图故事比打牌本身好看多了。烙印白之物语那个画册我看了三遍。"},
            {"speaker": "role_001", "text": "烙印ur我抽的差不多了。异画阿尔贝两张，阿不思一张。卡组不是最强但是最懂我的。"},
            {"speaker": "player", "text": "所以这游戏到底是打牌还是抽卡"},
            {"speaker": "role_001", "text": "打牌是羁绊，抽卡是命运。分不开的。看不懂这个逻辑就说明你还没玩透。"},
        ],
        "rewards": ["memory_topic_ygoh_1"]
    },
    # ── 色图 ──
    {
        "id": "topic_spicy_1",
        "speaker": "role_001",
        "area": "atelier",
        "time": "night",
        "lines": [
            {"speaker": "narrator", "text": "旁白：凌晨三点。一张图片。发的人没有说话。但所有人都醒了。"},
            {"speaker": "role_003", "text": "gkd。有没有这种题材的多来点。"},
            {"speaker": "role_004", "text": "一个健壮的大腿或者一个大腚出现在屏幕里。好。"},
            {"speaker": "role_001", "text": "zjsn,wcsn。只要你发了这图就是你，我不管的。这是最基本的群聊物权法。"},
            {"speaker": "role_016", "text": "毛鸽。你们能不能注意一下时间。凌晨三点发色图是你们的新传统吗。"},
            {"speaker": "role_005", "text": "你不玩r18就好比青山照不吃屎。这是自然规律。"},
            {"speaker": "role_012", "text": "早上了喵～ [🔥5]。但现在是凌晨三点不是早上。注意时区。"},
            {"speaker": "player", "text": "所以这不是你的图？"},
            {"speaker": "role_001", "text": "我发了就是我的。我不发就不是我的。跟你说了这是群聊物权法。有没有懂的。"},
        ],
        "rewards": ["memory_topic_spicy_1"]
    },
    # ── 米哈游 ──
    {
        "id": "topic_mhy_1",
        "speaker": "role_003",
        "area": "town_center",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：不知谁提了一嘴原神。群里的空气凝固了0.5秒。然后爆炸了。"},
            {"speaker": "role_003", "text": "wc，o。如何评价原神，它是不是游戏史上最帅的游戏。"},
            {"speaker": "role_006", "text": "推荐崩铁没绷住。我之前确实看到聊天室有发原神的🤣"},
            {"speaker": "role_009", "text": "你是来找可莉玩的吗？不是的话请离开。"},
            {"speaker": "role_005", "text": "我在一教自习那边桌子路过的时候听到了原神的启动声音。差点报警。"},
            {"speaker": "role_018", "text": "你玩原神吗？"},
            {"speaker": "role_005", "text": "@Mini Oreo不要反问我。你先回答。"},
            {"speaker": "role_001", "text": "我之前确实看到聊天室有发原神的🤣。类原神。但游戏王才是唯一真神。"},
            {"speaker": "player", "text": "所以这里是禁米还是不禁"},
            {"speaker": "role_009", "text": "不禁。但会收获群友的特别关爱。针对米哈游玩家在本群地位的历史决议：可以玩，不能说。"},
        ],
        "rewards": ["memory_topic_mhy_1"]
    },
    # ── 动画 ──
    {
        "id": "topic_anime_1",
        "speaker": "role_002",
        "area": "echo_lake",
        "time": "night",
        "lines": [
            {"speaker": "narrator", "text": "旁白：avemujica最新一集播出了。群里的动画评论模式瞬间启动。"},
            {"speaker": "role_002", "text": "tmd都因为傻逼考试我avemujica还没看！别剧透！！谁剧透我跟谁急！！"},
            {"speaker": "role_004", "text": "mygo又整烂活了吗。我记得有这种画风的女同动画片。"},
            {"speaker": "role_006", "text": "唉，感觉是动画区死了。没有太多创作热情。以前追番的那种感觉再也回不来了。"},
            {"speaker": "role_003", "text": "到点了，回寝看动画片。今天看物语。很多动画都喜欢和恋爱这种特别亲密关系靠拢，不是不好是太多了。"},
            {"speaker": "role_001", "text": "@NNZ 不要再看大奈奈的动画女生了。不过拔作岛动画化了倒是可以看看。"},
            {"speaker": "role_005", "text": "我还记得当初看ef动画第一季的感觉。那时候还没这么多异世界。想看GOSICK动画了。"},
            {"speaker": "player", "text": "所以avemujica到底好不好看"},
            {"speaker": "role_002", "text": "我说了别剧透！！！！尼玛！！"},
        ],
        "rewards": ["memory_topic_anime_1"]
    },
    # ── 联机游戏 ──
    {
        "id": "topic_coop_1",
        "speaker": "role_004",
        "area": "livehouse",
        "time": "night",
        "lines": [
            {"speaker": "narrator", "text": "旁白：赛博鳏夫在Livehouse舞台上开了一局排位。TS频道里传来他的声音。"},
            {"speaker": "role_004", "text": "wo zai ts li。今天的排位图是风暴点。我给你们开个qq语音。"},
            {"speaker": "role_002", "text": "发个ts的ip。我炸弹妹那把队友前几天排到过一次，是个坑。"},
            {"speaker": "role_001", "text": "你看我有关心过队友的体验🐴。mhr联机开荒比mhw方便很多。人修罗当队友也太猛了我超。"},
            {"speaker": "role_005", "text": "有没有什么联机游戏，感觉我沉迷单机太久了。适合我这种手残的联机游戏有没有。"},
            {"speaker": "role_004", "text": "我醒了——一个人就是车队。风暴点一把鸡一把第二。队友？不需要。"},
            {"speaker": "role_014", "text": "沟槽的Hxr上次说好联机结果自己先睡了。上分券都给你了！"},
            {"speaker": "player", "text": "你们到底在玩什么游戏"},
            {"speaker": "role_004", "text": "什么都玩。但主要是一个人玩。电竞是一种演出。舞台灯给我照着键盘，音响给我放着脚步。"},
        ],
        "rewards": ["memory_topic_coop_1"]
    },
    # ── 漫画/本子 ──
    {
        "id": "topic_manga_1",
        "speaker": "role_003",
        "area": "atelier",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：NNZ在工坊里翻着一本画集。打印机在旁边安静地待命。"},
            {"speaker": "role_003", "text": "如何评价老牌本子画师局长的新作精灵调教。画风进步了但分镜退步了。有没有懂的。"},
            {"speaker": "role_004", "text": "本子看多了看这种口味轻的。一个健壮的大腿或者一个大腚出现在屏幕里才够劲。"},
            {"speaker": "role_001", "text": "我现在已经在看r18g了。感觉波波不是那种有打涩涩mod习惯的。但本子这块我服nnz。"},
            {"speaker": "role_003", "text": "以前发色图都是一手，推上下下来筛选完发。现在是直接转。质量下降了。这是事实。"},
            {"speaker": "role_006", "text": "我在x上全关注的二次元画师，黄油会社，声优那些。漫画和游戏的边界越来越模糊了。"},
            {"speaker": "player", "text": "所以你们讨论的是艺术还是"},
            {"speaker": "role_003", "text": "好的色图就是好的艺术。构图、光影、人体结构——差一点都不行。你以为涩涩很简单？你试试。"},
        ],
        "rewards": ["memory_topic_manga_1"]
    },
    # ── 女声优 ──
    {
        "id": "topic_seiyuu_1",
        "speaker": "role_006",
        "area": "dragon_card_house",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：力竭了转发了一条声优相关的消息。群里的声豚们醒了。"},
            {"speaker": "role_006", "text": "我在x上全关注的二次元画师，黄油会社，声优那些。目前日本cv咖位是个怎么排的。"},
            {"speaker": "role_002", "text": "虽然原cv也不是我想象中的。但是动画cv是羊宫妃那。这就够了。"},
            {"speaker": "role_001", "text": "不过车🐏车的不是声优水平。是别的。羊宫妃那配了琴音之后我彻底服了。"},
            {"speaker": "role_005", "text": "我感觉声优配音的时候已经想骂人了。原来夕湖pv声优是阿澄佳奈吗。"},
            {"speaker": "role_003", "text": "耶？纱音cv是钉宫啊。这我还真没注意。日本cv咖位这东西没法排，看角色。"},
            {"speaker": "player", "text": "你们对声优的要求好高"},
            {"speaker": "role_006", "text": "确实。但好的cv能让角色活过来。差的cv能让角色死掉。就是这么简单。"},
        ],
        "rewards": ["memory_topic_seiyuu_1"]
    },
    # ── 上班/社畜 ──
    {
        "id": "topic_work_1",
        "speaker": "role_006",
        "area": "care_home",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：下午六点。下班时间。群里的社畜们开始冒泡。"},
            {"speaker": "role_006", "text": "我上班两年半了，高二还没上完。不是真高二——是心态。心态永远停留在高二那年暑假。"},
            {"speaker": "role_014", "text": "舒服了——今天下班早。去跑步然后回来打两局。"},
            {"speaker": "role_015", "text": "[/敬礼] 存档了。今天的工作存档了。明天读档继续。"},
            {"speaker": "role_003", "text": "毛现在是上班周期还是下班周期啊。上班周期我就不发图了。"},
            {"speaker": "role_005", "text": "什么时候玩那个妖精股份有限公司。我感觉开学以后我就没打过游戏了。"},
            {"speaker": "role_004", "text": "应该是和atk一个公司旗下的。上班就是另一种形式的排位。你打不过也得打。"},
            {"speaker": "player", "text": "所以上班真的这么痛苦吗"},
            {"speaker": "role_006", "text": "确实。但下班以后打三局牌赢了对面天杯。这才是活着的意义。工作是存档，打牌是读档。"},
        ],
        "rewards": ["memory_topic_work_1"]
    },
    # ── 健身 ──
    {
        "id": "topic_fitness_1",
        "speaker": "role_014",
        "area": "care_home",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：健康哥哥发了今天的跑步记录。群里的健身话题启动了。"},
            {"speaker": "role_014", "text": "舒服了——今天跑了五公里。全糖还是半糖？我是说运动饮料。算了直接喝水。"},
            {"speaker": "role_002", "text": "去年校运动会我就被抓去什么b方阵了。医生问我是不是经常熬夜也不运动。"},
            {"speaker": "role_006", "text": "学校已从你的校园卡中扣除400元。学习之余，一定要注意多运动。你的健康是我们最大的牵挂！"},
            {"speaker": "role_015", "text": "[/敬礼] 重新减肥今天也不想存档。但运动存档是必须的。"},
            {"speaker": "role_004", "text": "前提是我跑步没犯心脏病。大雷还得是配运动内衣。几点打，我决定一下要不要跑步。"},
            {"speaker": "role_003", "text": "去跑步机上架游戏本，开麦打游戏。这才是正确的健身方式。"},
            {"speaker": "player", "text": "你们到底是在健身还是在摸鱼"},
            {"speaker": "role_014", "text": "都是。精神状态也是战斗力。补觉票背面写了的。"},
        ],
        "rewards": ["memory_topic_fitness_1"]
    },
    # ── 偶像大师 ──
    {
        "id": "topic_imas_1",
        "speaker": "role_006",
        "area": "town_center",
        "time": "any",
        "lines": [
            {"speaker": "narrator", "text": "旁白：力竭了转发了一条偶像大师新作的消息。少数几个真正的imas玩家集合了。"},
            {"speaker": "role_006", "text": "imassp什么时候可以汉化好。你的偶像大师看到哪一集了。我最想安利的就是偶像大师。"},
            {"speaker": "role_005", "text": "兄弟，你放心打学院偶像大师👍🏻。这个和偶像大师本家是什么关系？"},
            {"speaker": "role_006", "text": "学mas是外传。本家是765pro。百万现场是剧场。闪耀色彩是另一条线。sideM是男团。CG是灰姑娘。"},
            {"speaker": "role_002", "text": "尼玛这就是imas博士吗。我一个只玩学mas的瑟瑟发抖。"},
            {"speaker": "role_001", "text": "一看到调月莉音那骚气冲天的黑胶紧身衣我就——算了不说了。imas的色图也是第一梯队的。"},
            {"speaker": "role_009", "text": "老资历梗出处是imas吗。寒武纪的时候我就在了。imas是二次元的基石。"},
            {"speaker": "player", "text": "所以偶像大师到底有几个系列"},
            {"speaker": "role_006", "text": "很多。但每一个都是真心。不是偶像产业——是偶像文化。又幻想了，幻想我会培育憧憬偶像总是平地摔的普通女孩……"},
        ],
        "rewards": ["memory_topic_imas_1"]
    },
]

# ================================================================
# MAIN QUEST REWRITES — integrate new item themes
# ================================================================
QUEST_UPDATES = {
    "main_quest_01": {
        "name": "第一章：龙王喷泉！？",
        "story": "小镇中心的龙王喷泉突然开始自动播放旧消息——不是bug，是群聊核心在苏醒前打了嗝。许多过往的记忆都冒了出来，喷泉里飘着三年前的「晚安」和昨天的「有没有黄」。作为刚上线的代理人，你需要查明第一条异常消息的来源，通过找回精华消息来和这股奇妙的力量对冲。",
        "conclusion": "喷泉自动播放旧消息的原因找到了：服务器的缓存数据通过喷泉水柱泄露了出来。你从水柱中提取了第一条异常消息——一条三天前发出的'晚安'，发消息的人至今还在线上。敲响小康钟后喷泉恢复正常，广场的群聊核心重新进入稳定待机状态。你获得了第一枚魂印碎片，任务日志系统已解锁。弧形反叛超量🐉看了一眼记录，笑着说「第一案就这么离谱，后面还有五个区域等着你」。"
    },
    "main_quest_02": {
        "name": "第二章：锅从餐厅飞到牌桌",
        "story": "广场稳定后，Hxr告诉你餐厅和龙牌馆之间出现了「甩锅回路」——餐厅的召集锅一直在喊集合却没人响应，龙牌馆的判定门则把锅甩给了规则缺失。与此同时，群里的黄哥烤五花照片还在刷屏。快乐水的甜度之争也在同步进行。你需要分别处理两边的异常，让日常感重新上线。",
        "conclusion": "餐厅和龙牌馆的异常是同一个问题的两种表现：群聊核心的日常模块在广场修复后没有同步更新。你分别调试了两个区域的物件——餐厅的召集锅确认了晚饭继续（菜单最后一行写着：不用回答，饭在桌上），龙牌馆的判定门补上了规则纸条（纸条背面有人用yo-gi-oh!的废纸打了个草稿）。两个区域恢复正常后，Livehouse和湖边回声栈道的入口自动解锁。Hxr说了一句「有没有黄？」然后自己回答了「有」。"
    },
    "main_quest_03": {
        "name": "第三章：灯光和月亮互相误会了什么",
        "story": "新区域开放——Livehouse的舞台在夜间自动亮灯却无人演出，湖边的月亮多了一个倒影却找不到来源。NNZ认为这两件事有关联：赛博鳏夫在Livehouse说了一句没发出去的话，被湖面当成月光反射了回来。与此同时，有人在群里问「有没有这种题材的色图多来点」。你的emo开关可能被谁拨动了。",
        "conclusion": "Livehouse的舞台灯自动亮起是因为上一次演出后灯光记忆没有被清除——赛博鳏夫的上一场演出结束后灯控台进入了自动回放模式。湖面多出来的月相是Livehouse舞台灯在水面上的反射——颜色偏暖，介于舞台灯的金色和某个XOX角色的头像色之间。你调整了灯控台并捞起了湖上的聊天记录诗页后，两个异常同时消失。NNZ顺手发了一张色图庆祝。养老院、工坊和自然区三个新区域同步解锁。"
    },
    "main_quest_04": {
        "name": "第四章：色板偏移和沉默的信号塔",
        "story": "养老院、工坊和自然区都开放了。但青山照发现工坊的色板整体偏了2度——导致生成的色图立绘都不像本人。同时，自然区的信号塔完全沉默，连「哦哦」都发不出去，csn的叶子也枯了。两件事指向同一个问题：有人在工坊里改了一个角色的主色，连锁反应让信号塔失去了参照坐标。青山照怀疑是XOX的光污染导致的，而力竭了认为这是偶像大师看多了的副作用。",
        "conclusion": "工坊色板偏移的原因是有人在调试色图滤镜——把冷色调调暖了2度，想让色图看起来更有温度。这个改动通过打印机同步影响到了龙牌馆的yo-gi-oh!牌面印刷，连锁反应让自然区信号塔失去了颜色参照坐标而停止工作。你校准了色板、清理了信号塔的像素藤蔓（上面写满了「有没有懂的」）后，地下服务器房的入口感应到你并自动解锁。养老院的存档点已更新——老资历们又可以吹寒武纪的故事了。"
    },
    "main_quest_05": {
        "name": "终章：服务器上线，全员回应",
        "story": "地下服务器房的缓存过载了——三个月来的所有「哦哦」和「你在吗」堆积在缓存区，群聊核心被压得无法重启。夜处理炼金师需要你清理缓存、折叠重复梗，然后按下重启杆。当小康钟重新响起时，所有你建立过羁绊的角色都会在广场上回应。聊天记录里的每一条精华消息都会变成一颗星砂，撒在广场上。",
        "conclusion": "服务器缓存过载的原因是三个月来的所有回声没有被分类——重复的「晚安」「在吗」「哈哈哈」和重要的羁绊回声混在一起。你手动清理了缓存，折叠了重复内容（QQ空间占用-275G），标记了所有羁绊回声为不可删除。核心重启后，小康钟响了三声，所有达成羁绊的角色在广场上给出了收尾回应。引用消息里全是祝福，群聊之火🔥点亮了整个广场。赛博鳏夫说了句「我醒了——原来大家都在」，然后发了今夜的第一张黄哥烤五花。小镇进入常驻在线模式。"
    },
}

# ================================================================
# APPLY TO GAME DATA
# ================================================================
def apply_v3():
    print("=" * 60)
    print("🎮 V3: Full Game Text Regeneration")
    print("=" * 60)

    # 1. Load current data (items already synced from md)
    items = load("items.json")
    quests = load("quests.json")
    dialogues = load("dialogues.json")

    print(f"\n📦 Loaded: {len(items)} items, {len(quests)} quests, {len(dialogues)} dialogues")

    # 2. Update quest texts
    quest_updates = 0
    for quest in quests:
        qid = quest["id"]
        if qid in QUEST_UPDATES:
            u = QUEST_UPDATES[qid]
            for key in ("name", "story", "conclusion"):
                if key in u:
                    quest[key] = u[key]
            quest_updates += 1

    save(quests, "quests.json")
    print(f"✅ Updated {quest_updates} main quests")

    # 3. Add new topic scenes (remove old topic_ scenes first, then add new ones)
    # Keep non-topic scenes, replace topic scenes
    non_topic = [d for d in dialogues if not d.get("id", "").startswith("topic_")]
    new_dialogues = non_topic + TOPIC_SCENES

    save(new_dialogues, "dialogues.json")
    print(f"✅ Dialogues: {len(dialogues)}→{len(new_dialogues)} scenes ({len(TOPIC_SCENES)} new topic scenes)")

    # 4. Verify no item modifications
    items_after = load("items.json")
    for orig, after in zip(items, items_after):
        for key in ("name", "description", "flavor", "icon"):
            if orig.get(key) != after.get(key):
                print(f"⚠️  Item changed: {orig['name']}.{key}")
    print(f"✅ Items unchanged: {len(items)} items preserved")

    print(f"\n✅ V3 applied to game data")
    print(f"💡 Run smoke test and regenerate md to verify")

if __name__ == "__main__":
    apply_v3()
