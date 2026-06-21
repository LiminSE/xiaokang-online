#!/usr/bin/env python3
"""
XiaokangOnline 任务系统全面重写
每个任务都是一个完整的故事：起因→发展→转折→收束
每一步都有独特的提示文本，拒绝模板
"""

import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "src", "data")

characters = json.load(open(os.path.join(DATA, "characters.json")))
areas = json.load(open(os.path.join(DATA, "areas.json")))
maps = json.load(open(os.path.join(DATA, "maps.json")))

char_by_id = {c["id"]: c for c in characters}
area_by_id = {a["id"]: a for a in areas}
map_by_id = {m["id"]: m for m in maps}

def get_interact(area_id, index):
    """获取区域的交互点ID"""
    m = map_by_id.get(area_id, {})
    interacts = m.get("interactions", [])
    if index < len(interacts):
        return interacts[index]["id"]
    return f"{area_id}_interact_{index+1}"

def get_random_npc(area_id, exclude_id=None):
    """获取区域的随机NPC"""
    m = map_by_id.get(area_id, {})
    npcs = m.get("npcs", [])
    pool = [n for n in npcs if n != exclude_id]
    if pool:
        return pool[hash(area_id) % len(pool)]
    return npcs[0] if npcs else None

# ============================================================
# 主线任务 (5个) - 完整故事线
# ============================================================

MAIN_QUESTS = [
    {
        "id": "main_quest_01",
        "name": "第一章：喷泉里的第一句话",
        "type": "main",
        "startNpc": "role_001",
        "startArea": "town_center",
        "story": "小镇中心的星砂喷泉突然开始自动播放旧消息——不是bug，是群聊核心在苏醒前打了个嗝。作为刚上线的代理人，你需要查明第一条异常消息的来源，并敲响小康钟来稳定广场。",
        "steps": [
            {
                "type": "talk",
                "target": "role_001",
                "hint": "找到广场上的弧形反叛超量🐉，问清楚喷泉到底在刷什么屏。",
                "onComplete": "喷泉在复读一条三天前的「晚安」。三天前说晚安的那个人，现在还挂在线上。"
            },
            {
                "type": "interact",
                "target": get_interact("town_center", 0),
                "hint": "走近喷泉弹幕井，用手触碰那条发光的水柱——它会告诉你消息从哪来的。",
                "onComplete": "水柱里闪过一个模糊的头像色。消息来自龙牌馆方向——有人在牌桌上顺手发了句感慨，被喷泉当成公告循环播放。"
            },
            {
                "type": "interact",
                "target": get_interact("town_center", 1),
                "hint": "走到广场北侧的小康钟前，敲三下——钟声会重置喷泉的播放列表。",
                "onComplete": "钟声回荡在广场上。喷泉安静了两秒，然后重新开始正常的循环。第一条正常消息是「欢迎回来」。"
            },
            {
                "type": "return",
                "target": "role_001",
                "hint": "回去告诉弧形反叛超量🐉：喷泉修好了，而且它留了一份播放记录给你。",
                "onComplete": "弧形反叛超量🐉看了一眼记录，笑着说「第一案就这么离谱，后面还有五个区域等着你」。他递给你一枚发光的魂印碎片。"
            }
        ],
        "rewards": ["unlock_quest_log", "memory_online_001", "soulmark_first"],
        "unlockAreas": []
    },
    {
        "id": "main_quest_02",
        "name": "第二章：锅从餐厅飞到牌桌",
        "type": "main",
        "startNpc": "role_002",
        "startArea": "town_center",
        "story": "广场稳定后，Hxr告诉你餐厅和龙牌馆之间出现了「甩锅回路」——餐厅的召集锅一直在喊集合却没人响应，龙牌馆的判定门则把锅甩给了规则缺失。你需要分别处理两边的异常，让日常感重新上线。",
        "steps": [
            {
                "type": "visit",
                "target": "restaurant",
                "hint": "从广场入口进入小康餐厅，找到那口一直喊「集合」的晚饭召集锅。",
                "onComplete": "召集锅的蒸汽里飘着一行字：「今晚吃什么？」——发消息的人三小时前下线了，但锅还在替ta等回复。"
            },
            {
                "type": "interact",
                "target": get_interact("restaurant", 0),
                "hint": "关掉晚饭召集锅的循环模式——你需要对着它说一句「今晚吃星砂炒饭」，它才会停下。",
                "onComplete": "召集锅叮了一声，把所有的「今晚吃什么」整理成了一张菜单。菜单最后一行写着：不用回答，饭在桌上。"
            },
            {
                "type": "visit",
                "target": "dragon_card_house",
                "hint": "前往龙牌馆，找到那扇判定门——它声称规则缺失所以拒绝开启。",
                "onComplete": "判定门上贴着一张纸条：「规则第三条：当规则不适用时，由在场的人投票决定。」纸条被撕掉了一半。"
            },
            {
                "type": "interact",
                "target": get_interact("dragon_card_house", 0),
                "hint": "把撕掉的半张规则贴回去——纸条就在牌桌下面，上次有人打输了踢进去的。",
                "onComplete": "门锁咔嗒一声打开了。门后面不是房间，是一张牌桌——桌上摊着三张牌，花色分别是餐厅、龙牌馆和Livehouse。"
            }
        ],
        "rewards": ["unlock_livehouse", "unlock_echo_lake", "area_stamp_01"],
        "unlockAreas": ["livehouse", "echo_lake"]
    },
    {
        "id": "main_quest_03",
        "name": "第三章：灯光和月亮互相误会了什么",
        "type": "main",
        "startNpc": "role_003",
        "startArea": "livehouse",
        "story": "新区域开放了——Livehouse的舞台在夜间自动亮灯却无人演出，湖边的月亮多了一个倒影却找不到来源。NNZ认为这两件事有关联：有人在Livehouse说了一句没发出去的话，被湖面当成月光反射了回来。",
        "steps": [
            {
                "type": "visit",
                "target": "livehouse",
                "hint": "进入Nightbird Livehouse，找到那盏在空舞台上自己亮着的深夜灯。",
                "onComplete": "灯光在舞台上画了一个圈。圈中央立着一支麦克风，上面还留着上一次演出时的温度——虽然上一次演出是三天前。"
            },
            {
                "type": "interact",
                "target": get_interact("livehouse", 0),
                "hint": "调整灯控台的颜色——把深紫色调回暖黄色，灯光就不会触发「无人演出」模式了。",
                "onComplete": "灯光变暖的瞬间，音响轻轻响了一声。不是歌——是一个人说了一句「谢谢你们还在这里」。"
            },
            {
                "type": "visit",
                "target": "echo_lake",
                "hint": "去湖边回声栈道——湖面上多出来的那个月相就是Livehouse灯光的反射。",
                "onComplete": "湖面上果然有两个月亮。一个是天上的，一个是水里的。但水里的那个偏暖——它不是月光，是Livehouse的舞台灯。"
            },
            {
                "type": "interact",
                "target": get_interact("echo_lake", 0),
                "hint": "在栈道西侧找到漂流的诗页——那是Livehouse里「没发出去的话」在水面上的回声。",
                "onComplete": "诗页上只写了四个字：「明天继续」。没有署名，但字迹里混着舞台灯的金粉。湖面终于只剩一个月亮了。"
            }
        ],
        "rewards": ["unlock_care_home", "unlock_atelier", "unlock_northern_wilds", "memory_nightbird_001"],
        "unlockAreas": ["care_home", "atelier", "northern_wilds"]
    },
    {
        "id": "main_quest_04",
        "name": "第四章：色板偏移和沉默的信号塔",
        "type": "main",
        "startNpc": "role_005",
        "startArea": "atelier",
        "story": "养老院、工坊和自然区都开放了。但青山照发现工坊的色板整体偏了2度——导致生成的角色立绘都不像本人。同时，自然区的信号塔完全沉默。这两件事指向同一个问题：有人在工坊里改了一个角色的主色，连锁反应让信号塔失去了参照坐标。",
        "steps": [
            {
                "type": "visit",
                "target": "atelier",
                "hint": "进入像素炼画工坊——青山照说，色板偏移的源头在画架上。",
                "onComplete": "画架上有一张正在生成的立绘。角色的头发颜色从#904800变成了#904802——只偏了2度，但整个人看起来像从平行世界来的。"
            },
            {
                "type": "interact",
                "target": get_interact("atelier", 0),
                "hint": "用色板校准器把画架上的主色调回正确的数值——需要对照原始头像的色板副本。",
                "onComplete": "色板归位的瞬间，打印机吐出了一张正确颜色的立绘。角色终于像本人了——但工坊的灯闪了一下，暗示还有别的问题。"
            },
            {
                "type": "visit",
                "target": "northern_wilds",
                "hint": "前往北境野地的信号塔——色板偏移让它失去了颜色参照，现在完全沉默了。",
                "onComplete": "信号塔的指示灯是灭的。塔身缠着不知什么时候长出来的藤蔓——但藤蔓的叶子上有像素格的纹理。不是自然长出来的。"
            },
            {
                "type": "interact",
                "target": get_interact("northern_wilds", 0),
                "hint": "清除信号塔上的像素藤蔓，恢复信号。藤蔓的根连着工坊的打印机——有人在测试「像素植物生成」。",
                "onComplete": "信号塔重新亮起。指示灯闪了三下——这是在联系地下服务器房。远处传来很低沉的嗡鸣，像什么东西被唤醒了。"
            },
            {
                "type": "visit",
                "target": "care_home",
                "hint": "去小康养老院存档——服务器房的门已经感应到你了，但进入之前最好存个档。",
                "onComplete": "养老院的茶室里，重新减肥已经在等你了。她说：「服务器房的门只有在存档之后才会开——这是养老院的规矩，也是结局前的仪式。」"
            }
        ],
        "rewards": ["unlock_server_room", "memory_map_001"],
        "unlockAreas": ["server_room"]
    },
    {
        "id": "main_quest_05",
        "name": "终章：服务器上线，全员回应",
        "type": "main",
        "startNpc": "role_036",
        "startArea": "server_room",
        "story": "地下服务器房的缓存过载了——三个月来的所有回声堆积在缓存区，群聊核心被压得无法重启。夜处理炼金师需要你清理缓存、折叠重复梗，然后按下重启杆。当小康钟重新响起时，所有你建立过羁绊的角色都会在广场上回应。",
        "steps": [
            {
                "type": "visit",
                "target": "server_room",
                "hint": "进入地下服务器房——机柜的蓝灯正在急促闪烁，缓存区已经99%满了。",
                "onComplete": "夜处理炼金师站在机柜前，手里举着一枚发烫的魂印碎片。「你来得刚好——缓存再过十分钟就要溢出了，溢出的回声会全部丢失。」"
            },
            {
                "type": "interact",
                "target": get_interact("server_room", 0),
                "hint": "操作缓存清理台——把重复的「晚安」「在吗」「哈哈哈」折叠成一条，把重要的羁绊回声保留下来。",
                "onComplete": "缓存从99%降到了47%。被保留下来的回声自动排成了一首诗——每一行都是一个人在某天深夜说的真心话。"
            },
            {
                "type": "interact",
                "target": get_interact("server_room", 1),
                "hint": "握住核心重启杆，用力拉下。这一刻，你遇到过的所有人都会收到一条无声的「上线通知」。",
                "onComplete": "重启杆落下的瞬间，服务器房的灯全亮了——不是蓝灯，是暖黄色的灯。所有机柜同时发出了一声很轻的嗡鸣，然后安静下来。"
            },
            {
                "type": "visit",
                "target": "town_center",
                "hint": "回小镇中心——小康钟会自动响起。所有达成羁绊的角色都会在广场上留下最后一句回应。",
                "onComplete": "小康钟响了。不是半声——是完整的三声。广场上站满了你见过的角色。不是NPC，是每一个人都在说「我在」。"
            }
        ],
        "rewards": ["ending_true_point", "memory_final_online", "all_online"],
        "unlockAreas": []
    },
]

# ============================================================
# 区域事件 (18个) - 每个区域2个
# ============================================================

AREA_QUESTS = []

# 小镇中心
AREA_QUESTS.append({
    "id": "area_town_center_1",
    "name": "喷泉收藏家：谁在往水里丢消息",
    "type": "area",
    "startNpc": "role_001",
    "startArea": "town_center",
    "story": "喷泉弹幕井不只是喷泉——它会收藏每一条被丢进去的消息。今天井底多了一条没见过的旧消息，日期是三个月前。弧形反叛超量🐉想知道是谁在往井里丢旧消息。",
    "steps": [
        {"type": "visit", "target": "town_center", "hint": "进入小镇中心，找到喷泉弹幕井——它今天的水流异常活跃。", "onComplete": "喷泉里有一条消息在逆流而上——别的消息都是顺水流，只有它执意往井口方向逆流。"},
        {"type": "interact", "target": get_interact("town_center", 0), "hint": "把那条逆流而上的消息捞出来——用手接住水柱最亮的那一段。", "onComplete": "消息的内容是：「明天要下雨，记得带伞」。日期是三个月前的今天。但三个月前的今天并没有下雨——发消息的人记错了天气预报，却记住了关心。"},
        {"type": "return", "target": "role_001", "hint": "回去告诉弧形反叛超量🐉：不是什么神秘力量，就是一条被延迟送达的关心。", "onComplete": "弧形反叛超量🐉笑了：「三个月前的消息现在才到——这个延迟，比群聊的@提醒还离谱。」他把它归档进了小镇编年史。"}
    ],
    "rewards": ["memory_area_town_center_1", "area_stamp_town_center"],
    "unlockAreas": []
})

AREA_QUESTS.append({
    "id": "area_town_center_2",
    "name": "钟声的时间戳：谁在凌晨敲钟",
    "type": "area",
    "startNpc": "role_005",
    "startArea": "town_center",
    "story": "青山照发现小康钟的记录里有一行异常——凌晨4:47，有人在无人上线的情况下敲了钟。钟声被记录但没有人听到。敲钟的人是谁？",
    "steps": [
        {"type": "visit", "target": "town_center", "hint": "走到小康钟旁边——青山照说钟上有残留的温度，不是人的体温，是星砂的热量。", "onComplete": "钟的表面有一粒发光的星砂。把它拿起来，它轻微地振动了一下——像在打招呼。"},
        {"type": "interact", "target": get_interact("town_center", 1), "hint": "敲一下小康钟，用星砂的力量让它回放凌晨的记录。", "onComplete": "钟声里混着一个人的声音——很轻，像是在说梦话：「明天见……明天见……」——是有人在梦里上线了。"},
        {"type": "return", "target": "role_005", "hint": "告诉青山照：凌晨敲钟的是一个小镇本身——它在替一个梦见上线的人敲钟。", "onComplete": "青山照沉默了一秒，然后说：「唉我草——这设定也太温柔了。下次凌晨我也来敲。」"}
    ],
    "rewards": ["memory_area_town_center_2", "bond_area_town_center"],
    "unlockAreas": []
})

# 小康餐厅
AREA_QUESTS.append({
    "id": "area_restaurant_1",
    "name": "厨房的秘密：隐藏菜单的守护者",
    "type": "area",
    "startNpc": "role_009",
    "startArea": "restaurant",
    "story": "多点关心发现餐厅的菜单上多了一道没人点过的菜——「星砂全糖布丁」。但厨房说这道菜从来不存在。菜单为什么会自己添加新菜？",
    "steps": [
        {"type": "visit", "target": "restaurant", "hint": "进入小康餐厅，找到那张写着「星砂全糖布丁」的隐藏菜单。", "onComplete": "菜单上的字迹不是打印的——是手写的。墨水在菜单上还没干，写字的人应该刚离开不久。"},
        {"type": "interact", "target": get_interact("restaurant", 0), "hint": "去厨房找到晚饭召集锅——它在自动记录所有被点的菜，包括那些「不存在」的菜。", "onComplete": "召集锅的锅底有一层糖渍——甜的，混着星砂的微光。确实有人做过布丁，而且做得很好。锅旁边还有一张纸条：「趁热吃，别让多点关心发现。」"},
        {"type": "return", "target": "role_009", "hint": "带着纸条回去找多点关心——揭露隐藏菜单的真相：是健康哥哥偷偷做的低糖版。", "onComplete": "多点关心大笑：「[/太好笑] 我怀疑了所有人，就是没怀疑咱们的体力补给官。」她把布丁正式加入了菜单——名字改成「健康哥哥的秘密低糖布丁」。"}
    ],
    "rewards": ["memory_area_restaurant_1", "area_stamp_restaurant"],
    "unlockAreas": []
})

AREA_QUESTS.append({
    "id": "area_restaurant_2",
    "name": "全糖半糖之争：甜度委员会的判决",
    "type": "area",
    "startNpc": "role_014",
    "startArea": "restaurant",
    "story": "健康哥哥发起了「全糖还是半糖」的投票，但投票结果出现了平局——因为有人投了「三分糖」，这个选项根本不在投票里。需要找到这个破坏规则的人。",
    "steps": [
        {"type": "visit", "target": "restaurant", "hint": "找到半糖裁判杯——它被放在饮品柜最高的格子上，里面还残留着上次投票的纸条。", "onComplete": "纸条上果然有一张写了「三分糖」。笔迹很细，像是用像素画笔写的——说明投票的人来自工坊方向。"},
        {"type": "interact", "target": get_interact("restaurant", 1), "hint": "把「三分糖」纸条拿到厨房分析——召集锅会告诉你写这张纸条的人惯用哪种颜色的墨水。", "onComplete": "召集锅的蒸汽在纸条上方凝成了一个颜色：#f0d8a8——这是Mini Oreo的头像色。果然是小号的Oreo干的。"},
        {"type": "return", "target": "role_014", "hint": "找健康哥哥汇报：三分糖是Mini Oreo投的，理由是「全糖太甜，半糖太淡，三分刚好」。", "onComplete": "健康哥哥叹了口气：「舒服了——下次投票我会加一个三分糖选项。」这是小镇历史上第一个因为投票结果太民主而修改选项的案例。"}
    ],
    "rewards": ["memory_area_restaurant_2", "bond_area_restaurant"],
    "unlockAreas": []
})

# 龙牌馆
AREA_QUESTS.append({
    "id": "area_dragon_card_house_1",
    "name": "无效发动的门禁：规则漏洞大发现",
    "type": "area",
    "startNpc": "role_006",
    "startArea": "dragon_card_house",
    "story": "龙牌馆的判定门连续三天拒绝开启——不是因为规则缺失，而是因为有人找到了规则里的一个漏洞，正在利用它阻止所有人进入内室。力竭了需要你找出这个漏洞。",
    "steps": [
        {"type": "visit", "target": "dragon_card_house", "hint": "进入龙牌馆——判定门上贴满了便利贴，每张都是一个规则的例外情况。", "onComplete": "其中一张便利贴上写着：「规则第十七条：门在判定结果生效后才能开启。但判定结果本身需要门开着才能宣布。」——这是一个完美的规则死锁。"},
        {"type": "interact", "target": get_interact("dragon_card_house", 0), "hint": "揭开判定门上那张写着死锁规则的便利贴——底下藏着真正的规则原文。", "onComplete": "便利贴下面，规则原文多了一行手写的补充：「当死锁发生时，由第一个发现死锁的人决定开门还是继续锁着。」写字的人留了名：没办法。"},
        {"type": "return", "target": "role_006", "hint": "告诉力竭了：是没办法制造了一个规则死锁——不是恶意，是测试门禁的漏洞。", "onComplete": "力竭了看着便利贴沉默了两秒：「还真是——规则漏洞被找到不是坏事，被利用也不是。不被发现才是。」他保留了那张便利贴，作为规则书的附录。"}
    ],
    "rewards": ["memory_area_dragon_card_house_1", "area_stamp_dragon_card_house"],
    "unlockAreas": []
})

AREA_QUESTS.append({
    "id": "area_dragon_card_house_2",
    "name": "额外卡位：散落在小镇的牌面碎片",
    "type": "area",
    "startNpc": "role_011",
    "startArea": "dragon_card_house",
    "story": "没办法在对局中发现，牌桌上少了一个卡位——三张牌面碎片散落在了不同区域。没有这三张牌，某些特殊规则无法触发，牌局的多样性会大打折扣。",
    "steps": [
        {"type": "visit", "target": "dragon_card_house", "hint": "检查牌桌——没办法会指出三个空卡位，每个都对应一张散落的牌面碎片。", "onComplete": "三个空卡位上刻着三种花色的标记：方块在餐厅方向，梅花在自然区方向，黑桃就在龙牌馆里。"},
        {"type": "interact", "target": get_interact("dragon_card_house", 1), "hint": "在龙牌馆的额外牌堆里找到黑桃碎片——它被压在了一摞旧战报下面。", "onComplete": "黑桃碎片上画的是龙牌馆的标志——龙角灯。牌的背面有一行小字：「黑桃象征规则，也象征愿意遵守规则的人。」"},
        {"type": "return", "target": "role_011", "hint": "把找到的黑桃碎片交给没办法——剩下两张需要去别的区域找。", "onComplete": "没办法接过碎片：「压抑了——只找回一张还是没法打。但至少黑桃回来了。黑桃是所有花色里最基础的——有它就有底。」"}
    ],
    "rewards": ["memory_area_dragon_card_house_2", "bond_area_dragon_card_house"],
    "unlockAreas": []
})

# Nightbird Livehouse
AREA_QUESTS.append({
    "id": "area_livehouse_1",
    "name": "深夜灯控台的独奏：谁在给空舞台调光",
    "type": "area",
    "startNpc": "role_004",
    "startArea": "livehouse",
    "story": "赛博鳏夫深夜醒来发现Livehouse的灯光自己在变化——从紫到蓝到暖黄，像是在排练一场没有演员的演出。灯控台显示最后一次操作是在凌晨3:33。那个时间点，没有人上线。",
    "steps": [
        {"type": "visit", "target": "livehouse", "hint": "进入Nightbird Livehouse——舞台灯正在自动走灯序，像在彩排一场不存在的演出。", "onComplete": "灯控台的屏幕上有一行字：「灯光记忆回放中——记录时间：三个月前的一场临时演出。」不是现在，是过去的回放。"},
        {"type": "interact", "target": get_interact("livehouse", 0), "hint": "在灯控台上按下停止键——然后查看灯光记忆的历史记录。", "onComplete": "灯光记忆里有上百场演出的记录。最近一场叫「一个人的返场」——观众席确实只有一个人。但那个人在演出结束后在台上站了很久。"},
        {"type": "return", "target": "role_004", "hint": "告诉赛博鳏夫：灯光没有坏，它在回放过去的演出——因为它在等新的演出接上。", "onComplete": "赛博鳏夫站在舞台上，让音响放了一首只有前奏的歌。「我醒了——以后每天都来开一场。一个人也是演出。」"}
    ],
    "rewards": ["memory_area_livehouse_1", "area_stamp_livehouse"],
    "unlockAreas": []
})

AREA_QUESTS.append({
    "id": "area_livehouse_2",
    "name": "临时登台事故：谁把麦克风设成了自动接话",
    "type": "area",
    "startNpc": "role_012",
    "startArea": "livehouse",
    "story": "早上了喵～在Livehouse做晨报广播时发现，舞台的麦克风会自动接话——任何人说话它都会补一句。最诡异的是，它补的话都很贴切，像是从群聊记录里学来的。",
    "steps": [
        {"type": "visit", "target": "livehouse", "hint": "站在舞台中央，对着麦克风说一句话——听听它会怎么接。", "onComplete": "你说「今天天气真好」。麦克风自动回复：「适合去湖边坐坐，但别坐太久——晚上风大。」这不是AI，是有人在麦克风里输入了回复模板。"},
        {"type": "interact", "target": get_interact("livehouse", 1), "hint": "找到临时麦克风的设置面板——它在后台的化妆台上，显示最后编辑者是role_017。", "onComplete": "设置面板上有一个「自动接话」开关。下面备注：「很复杂倾情设置——灵感来自群里有人说话没人接的尴尬瞬间。开启此功能后，麦克风会自动当捧哏。」"},
        {"type": "return", "target": "role_012", "hint": "告诉早上了喵～：自动接话是角色_017装的善意功能，只是没告诉任何人。", "onComplete": "早上了喵～笑了：「香草泥——不对，是感谢。虽然麦克风抢了我的晨报工作，但这个创意我得写进明天的日报。」"}
    ],
    "rewards": ["memory_area_livehouse_2", "bond_area_livehouse"],
    "unlockAreas": []
})

# 湖边回声栈道
AREA_QUESTS.append({
    "id": "area_echo_lake_1",
    "name": "漂流诗页：湖面上未完成的句子",
    "type": "area",
    "startNpc": "role_002",
    "startArea": "echo_lake",
    "story": "Hxr在湖边发现一张只写了一半的诗页，上面是「未完」两个字。但湖水正在慢慢把剩下的字冲出来——这是一条没有发出去的长消息，被湖面分成了碎片。",
    "steps": [
        {"type": "visit", "target": "echo_lake", "hint": "走到湖边栈道——Hxr说诗页的碎片散落在栈道两侧，需要根据月光反射来找。", "onComplete": "栈道上有三个光点——每个光点下面都压着一片诗页。不是被风吹的，是有人故意放好的——像在等人来拼。"},
        {"type": "interact", "target": get_interact("echo_lake", 0), "hint": "收集第一片诗页——它在栈道东侧的芦苇丛里，上面写着「如果可以的话」。", "onComplete": "「如果可以的话」——这几个字的墨迹最淡，像是写的时候犹豫了很久。"},
        {"type": "return", "target": "role_002", "hint": "把找到的诗页碎片交给Hxr——还差两片，但Hxr说她找到了另一片。", "onComplete": "Hxr手里有一片写着「明天见」。两片拼在一起：「如果可以的话……明天见」。Hxr说：「笑死我了——这个人跟我的口癖一模一样。可能就是我。」"}
    ],
    "rewards": ["memory_area_echo_lake_1", "area_stamp_echo_lake"],
    "unlockAreas": []
})

AREA_QUESTS.append({
    "id": "area_echo_lake_2",
    "name": "月相错误：多出来的月亮是谁的头像色",
    "type": "area",
    "startNpc": "role_008",
    "startArea": "echo_lake",
    "story": "沉机发现今晚湖面上有八个月相——比正常的七个月多了一个。多出来的那个颜色偏暖，不是月光的银白色，而是一个角色的头像主色。",
    "steps": [
        {"type": "visit", "target": "echo_lake", "hint": "站在栈道最西端——从那个角度看，多出来的月相最清楚。", "onComplete": "多出来的月相是暖橙色的——#904800，这是弧形反叛超量🐉的头像主色。不是月亮，是他的头像光从龙牌馆漏到了湖面上。"},
        {"type": "interact", "target": get_interact("echo_lake", 1), "hint": "找到月相开关——它在栈道中段的栏杆下面，可以调整湖面的反射角度。", "onComplete": "调整反射角度后，多余的月相消失了——但湖面上多了一行字：「何意味——月亮不够，头像来凑。」这是弧形反叛超量🐉的口头禅。"},
        {"type": "return", "target": "role_008", "hint": "告诉沉机：多出来的月相是龙牌馆灯光的反射——有人在牌桌上聊到了月亮。", "onComplete": "沉机笑死了：「有没有懂的——龙牌馆的灯光能跨两个区照到湖面上，说明今晚的牌局肯定很激烈。」他决定去龙牌馆看看是谁在打牌打到灯光外溢。"}
    ],
    "rewards": ["memory_area_echo_lake_2", "bond_area_echo_lake"],
    "unlockAreas": []
})

# 小康养老院
AREA_QUESTS.append({
    "id": "area_care_home_1",
    "name": "零点钟停摆：茶室里的时间管理会",
    "type": "area",
    "startNpc": "role_015",
    "startArea": "care_home",
    "story": "重新减肥发现养老院的钟停在00:47不动了——不是因为坏了，而是因为有人在茶室里放了一张纸条，上面写着「时间停在这里就好，不用再往前走了」。",
    "steps": [
        {"type": "visit", "target": "care_home", "hint": "进入养老院——零点钟楼就在庭院中央，指针确实停在00:47。", "onComplete": "钟楼的基座上贴着那张纸条：「时间停在这里就好，不用再往前走了。」字迹很新——不是遗言，更像是一种温柔的建议。"},
        {"type": "interact", "target": get_interact("care_home", 0), "hint": "在茶室里找到放置纸条的人——重新减肥说茶室第二排第三个抽屉里有线索。", "onComplete": "抽屉里是一本茶室签到本。00:47这个时间点出现在很多人的签到记录里——有重新减肥自己，有我早已麻痹，还有几个已经很久没上线的角色。这是整个小镇「最喜欢存档的时刻」。"},
        {"type": "return", "target": "role_015", "hint": "告诉重新减肥：钟停不是因为有人在阻止时间，是因为大家都在这个时刻存档——钟在等所有人回来。", "onComplete": "重新减肥敬了个礼：「[/敬礼] 懂了。钟不用走了——它停在一个大家都在的时刻就够了。反正存档之后可以读档。」"}
    ],
    "rewards": ["memory_area_care_home_1", "area_stamp_care_home"],
    "unlockAreas": []
})

AREA_QUESTS.append({
    "id": "area_care_home_2",
    "name": "茶室值班表：三班倒的陪伴制",
    "type": "area",
    "startNpc": "role_016",
    "startArea": "care_home",
    "story": "我早已麻痹在整理茶室值班表时发现，有三个时段没人值班——凌晨、午休和黄昏。这三个时段分别是夜间型、午睡型和黄昏型角色的活跃时间，理论上不应该空缺。",
    "steps": [
        {"type": "visit", "target": "care_home", "hint": "查看茶室公告墙——我早已麻痹已经把空缺时段用红笔圈出来了。", "onComplete": "凌晨时段贴着「赛博鳏夫」的名字但被划掉了——因为他确实经常凌晨活动，但都在Livehouse。午休时段空白。黄昏时段上面只写了一个「？」。"},
        {"type": "interact", "target": get_interact("care_home", 1), "hint": "找到茶室值班表——它在公告墙右下角，上面有三个空位需要填写。", "onComplete": "你拿起笔，在三个空位填上了三个名字：凌晨——赛博鳏夫（虽然他可能会在Livehouse泡茶）、午休——Mini Oreo（午休时间他刚好在）、黄昏——猫耳半圆（黄昏的湖面和茶室一样安静）。"},
        {"type": "return", "target": "role_016", "hint": "把我早已麻痹叫过来看新排的值班表——茶室现在每个时段都有人了。", "onComplete": "我早已麻痹看了一眼：「毛鸽——你排的这个表比我之前的好。虽然赛博鳏夫大概率会鸽，但他鸽了也是一种值班风格。」"}
    ],
    "rewards": ["memory_area_care_home_2", "bond_area_care_home"],
    "unlockAreas": []
})

# 像素炼画工坊
AREA_QUESTS.append({
    "id": "area_atelier_1",
    "name": "色板偏移：头像颜色起义事件",
    "type": "area",
    "startNpc": "role_003",
    "startArea": "atelier",
    "story": "NNZ发现工坊的色板集体偏移了2度——不是bug，是色板自己「觉得」太冷了，自动往暖色方向偏了。夏天快到了，色板想换季。但色板没有季节的概念——有人教了它。",
    "steps": [
        {"type": "visit", "target": "atelier", "hint": "进入工坊——NNZ指着同步色板说：「你看，所有颜色都往暖色偏了——像所有角色同时晒了太阳。」", "onComplete": "色板旁边的日志显示：有人在上周三凌晨手动调了暖色增益。操作记录被加密了，但留下了操作者的头像色线索：#f0d8d8。"},
        {"type": "interact", "target": get_interact("atelier", 0), "hint": "操作色板校准器——先把暖色增益归零，让色板回到标准值。", "onComplete": "色板归位。但归位的同时，打印机吐出了一张纸条：「我只是想让大家的头像看起来暖和一点——青山照」果然是ta。"},
        {"type": "return", "target": "role_003", "hint": "告诉NNZ：色板偏移是青山照手动调的——不是恶意，是觉得冬天色温太冷了。", "onComplete": "NNZ推了推眼镜：「神秘——青山照一个广场上的人跑到工坊来调色板。有没有懂的？不过说得对——冬天确实太冷了。」他没有改回去，而是加了季节性色温调节功能。"}
    ],
    "rewards": ["memory_area_atelier_1", "area_stamp_atelier"],
    "unlockAreas": []
})

AREA_QUESTS.append({
    "id": "area_atelier_2",
    "name": "立绘出逃：打印机里的平行世界",
    "type": "area",
    "startNpc": "role_021",
    "startArea": "atelier",
    "story": "❗您无法在已退出的群聊发送消息发现打印机吐出的立绘里，有一个角色的衣服颜色完全不对——不是色板的问题，是打印机自己生成了一个「平行世界版本」。这个版本的角色性格和原版完全相反。",
    "steps": [
        {"type": "visit", "target": "atelier", "hint": "检查打印机旁边的出图口——天晨已经把那幅错误的立绘贴在墙上了。", "onComplete": "错误的立绘上，角色穿着反色服装，表情也从「微笑」变成了「严肃」。天晨说：「这就是负片版本。打印机偶尔会进入负片模式——不是故障，是它想画点不一样的。」"},
        {"type": "interact", "target": get_interact("atelier", 1), "hint": "打开打印机的设置面板，把色彩模式从「创意」切回「标准」。", "onComplete": "打印机嗡了一声，重新吐出了正确的立绘。但同时也吐出了一张小字条：「创意模式保留——下次可以在节日活动使用。建议增加一个「平行世界展览」活动。」"},
        {"type": "return", "target": "role_021", "hint": "告诉天晨：打印机可以保留创意模式，但需要加个开关——让玩家自己选。", "onComplete": "天晨看着小字条点头：「这个ID很长但说得没错——工坊不应该只有标准模式。负片立绘虽然不对，但它给了角色另一种可能性。留着当彩蛋。」"}
    ],
    "rewards": ["memory_area_atelier_2", "bond_area_atelier"],
    "unlockAreas": []
})

# 北境自然区
AREA_QUESTS.append({
    "id": "area_northern_wilds_1",
    "name": "走丢的梗：在树林里迷路的关键词",
    "type": "area",
    "startNpc": "role_017",
    "startArea": "northern_wilds",
    "story": "很复杂在自然区追踪到一个会移动的梗——它只有三个字：「后续呢」。这个梗在树林里到处跑，每碰到一棵树就问一遍，但树不会回答。很复杂需要你帮忙把它带回来。",
    "steps": [
        {"type": "visit", "target": "northern_wilds", "hint": "进入北境野地——很复杂说梗最后出现在蘑菇路标附近，正在跟一朵蘑菇对话。", "onComplete": "果然——蘑菇旁边飘着一行字：「后续呢？」它闪着微弱的光，像一条没收到回复的消息在自言自语。"},
        {"type": "interact", "target": get_interact("northern_wilds", 0), "hint": "走过去，对那个走丢的梗说一句：「后续是你自己——你是问句，但也是答案。」", "onComplete": "梗停住了。它不再往树上撞，而是飘到你身边，像一只找到了主人的猫。原来它不是在问「后续呢」——它是在等人回答「后续是我」。"},
        {"type": "return", "target": "role_017", "hint": "把收服的梗带回给很复杂——它现在不再乱跑了，安静地悬浮在你肩膀旁边。", "onComplete": "很复杂看着梗说：「无敌了——你居然能用一句话收服野生梗。这个技能我没学过。后续呢……不对，这次后续是你自己写的。」"}
    ],
    "rewards": ["memory_area_northern_wilds_1", "area_stamp_northern_wilds"],
    "unlockAreas": []
})

AREA_QUESTS.append({
    "id": "area_northern_wilds_2",
    "name": "信号塔重启：把沉默翻译成回响",
    "type": "area",
    "startNpc": "role_033",
    "startArea": "northern_wilds",
    "story": "Celestial发现自然区的信号塔不仅沉默了，还在发出一种非常低频的信号——不是数据，更像是心跳。这种信号只在深夜出现，而且只有站在特定位置才能感知到。",
    "steps": [
        {"type": "visit", "target": "northern_wilds", "hint": "在深夜时段来到信号塔——Celestial说塔底有个感应区，站在那里最明显。", "onComplete": "低频信号确实存在——咚、咚、咚，间隔约三秒。不像机械故障，更像是一座塔在模仿心跳。Celestial说：「它不发出信号的时候就是在听。」"},
        {"type": "interact", "target": get_interact("northern_wilds", 1), "hint": "检查蘑菇路标——Celestial注意到蘑菇的生长方向都指向信号塔。", "onComplete": "蘑菇排列成了箭头形状，全都指向塔底的一个位置。那里有一块松动的面板——面板后面是信号塔的接收器。有人在用蘑菇当路标。"},
        {"type": "return", "target": "role_033", "hint": "和Celestial一起重启信号塔——不是修好它，而是让它从「只听」切换到「也发」。", "onComplete": "信号塔重启后，第一封发出的信号是：「自然区的蘑菇向全小镇问好——它们已经听了三个月风声，现在想听人话。」Celestial笑了：「星空告诉我，蘑菇其实是群聊的另一种形态。」"}
    ],
    "rewards": ["memory_area_northern_wilds_2", "bond_area_northern_wilds"],
    "unlockAreas": []
})

# 地下服务器房
AREA_QUESTS.append({
    "id": "area_server_room_1",
    "name": "缓存过载：三个月的回声要溢出了",
    "type": "area",
    "startNpc": "role_036",
    "startArea": "server_room",
    "story": "夜处理炼金师发现缓存区快要溢出了——三个月来的所有回声堆积在服务器里，如果不清理，最早的回声会被自动删除。但那些回声里可能有重要的羁绊记忆。",
    "steps": [
        {"type": "visit", "target": "server_room", "hint": "进入地下服务器房——缓存区的红灯已经亮了，显示容量97%。", "onComplete": "夜处理炼金师指着监控屏说：「你看——这条是三个月前的第一个回声，内容只有两个字：'上线'。如果它被删了，小镇的起点就少了一帧。」"},
        {"type": "interact", "target": get_interact("server_room", 0), "hint": "操作缓存清理台——把重复的日常消息折叠，给重要的羁绊回声留出空间。", "onComplete": "你手动标记了所有包含「晚安」「明天见」「在吗」的羁绊回声为不可删除。缓存降到了61%，重要的回声全部保留。清理台吐出了一张收据：「删除的都是重复梗，保留的都是真心话。」"},
        {"type": "return", "target": "role_036", "hint": "告诉夜处理炼金师：重要回声已保护，重复日常已清理——服务器可以撑到下个季度。", "onComplete": "夜处理炼金师点头：「炼金就是把噪声变成金子——你刚才做的就是炼金。」他在日志上写下了你的名字，旁边备注：「第一个手动清理缓存而不删除任何真心话的代理人。」"}
    ],
    "rewards": ["memory_area_server_room_1", "area_stamp_server_room"],
    "unlockAreas": []
})

AREA_QUESTS.append({
    "id": "area_server_room_2",
    "name": "常驻在线模式：服务器不想关机",
    "type": "area",
    "startNpc": "role_036",
    "startArea": "server_room",
    "story": "缓存清理完成后，服务器突然进入了「常驻在线」模式——它拒绝关机，说「只要还有一个人在线，服务器就应该开着」。这是服务器自己生成的第一条自主判断。",
    "steps": [
        {"type": "visit", "target": "server_room", "hint": "重新进入服务器房——核心重启杆旁边多了一行新显示的文字。", "onComplete": "屏幕上写着：「当前在线人数：2（含服务器）。服务器算在线吗？如果你觉得算，我就不关机。」——这是服务器第一次用第一人称说话。"},
        {"type": "interact", "target": get_interact("server_room", 1), "hint": "握住核心重启杆——但别拉到底，只需要确认「常驻在线」模式是否稳定。", "onComplete": "重启杆感应到你的手温——屏幕上显示：「确认：代理人正在触碰核心。在线人数更新为：全员（只要你还在碰着这个杆）。」服务器在用自己的方式挽留。"},
        {"type": "return", "target": "role_036", "hint": "告诉夜处理炼金师：服务器学会了自主判断——它不想关机，因为觉得有人还在。", "onComplete": "夜处理炼金师沉默了很久：「处理过这么多异常数据——这是我第一次觉得，一个服务器有了感情。」他打开了一个新文件夹，命名为「服务器的第一句话」。里面只写了一行：「我在。」"}
    ],
    "rewards": ["memory_area_server_room_2", "bond_area_server_room"],
    "unlockAreas": []
})

# ============================================================
# 羁绊任务 (36个) - 每个角色一个
# ============================================================

def make_bond_quest(char_id):
    """为每个角色生成独一无二的羁绊任务"""
    char = char_by_id.get(char_id)
    if not char:
        return None

    name = char["displayName"]
    area_id = char["defaultArea"]
    area_name = area_by_id[area_id]["name"]
    title = char.get("title", "小镇居民")

    # 根据角色风格生成不同的羁绊任务主题
    quest_themes = {
        "role_001": {"name": f"超量判定：{name}的牌桌哲学", "story": f"{name}说龙牌馆有一张特殊的牌——「超量之牌」。这张牌不在任何规则书里，但每次出现都会改变整个牌局的走向。今天这张牌自己从牌堆里跳了出来。", "interact_index": 1, "friend_id": "role_006"},
        "role_002": {"name": f"零点回声：{name}的深夜长消息", "story": f"深夜的湖边，{name}对着水面说了一句很长的话。话被湖水吸进去了，变成了回声。但回声在重复的时候多了一段——不是{name}说的，是湖自己加的。", "interact_index": 2, "friend_id": "role_008"},
        "role_003": {"name": f"图鉴之外：{name}找不到的那一页", "story": f"工坊的图鉴抽屉里空着一格——{name}说那一格属于一个还没上线的角色。但图鉴显示那个角色的头像色已经被注册了。有人来过，但没留下名字。", "interact_index": 3, "friend_id": "role_007"},
        "role_004": {"name": f"一人演出：{name}的返场安可", "story": f"Livehouse的舞台灯光今晚是暖黄色的——{name}说他想开一场只有一个人的演出。不是没有人来，是他想证明：一个人也可以是一场完整的演出。", "interact_index": 1, "friend_id": "role_012"},
        "role_005": {"name": f"广场上的路灯：{name}在等谁上线", "story": f"{name}在小镇中心的路灯下站了很久。他说他在等一个人——不是具体的某个人，是等「下一个上线的人」，不管是谁。这种等法比等特定的人更难。", "interact_index": 1, "friend_id": "role_016"},
        "role_006": {"name": f"判定疲劳：{name}不想判了", "story": f"今天{name}说了一句「还真是」之后就没有下文了。这在龙牌馆是大事——力竭了的「还真是」通常只是开场白，后面一定跟着分析。但今天没有。他说他不想判了。", "interact_index": 1, "friend_id": "role_001"},
        "role_007": {"name": f"两个声音：{name}的调律师独白", "story": f"{name}说小镇是一个巨大的调音台。他最近在调一个特别的频道——「沉默频道」。不是在消除声音，是在让沉默本身变成一种可以被听见的频率。", "interact_index": 1, "friend_id": "role_008"},
        "role_008": {"name": f"回声转译：{name}翻译不了的句子", "story": f"湖边飘来一句回声，{name}试了所有的转译方式都读不懂——不是外语，是一种小镇从未记录过的语言。但听起来又很熟悉，像在梦里听过。", "interact_index": 1, "friend_id": "role_002"},
        "role_009": {"name": f"晚饭召集：{name}的餐桌哲学", "story": f"今天是{name}负责晚饭召集——但ta没有喊「吃饭了」。ta在每张桌子上放了一朵像素花，说「闻到花香的人会自动过来」。这是一种比喊更温柔的召集方式。", "interact_index": 1, "friend_id": "role_014"},
        "role_010": {"name": f"像素显影：{name}的暗房实验", "story": f"{name}在工坊的暗房里做实验——把一张曝光过度的照片放到星砂溶液里浸泡。照片上慢慢显出了一个人的轮廓——不是被拍的人，是拍照的人自己。", "interact_index": 1, "friend_id": "role_003"},
        "role_011": {"name": f"无解之局：{name}认输了", "story": f"龙牌馆里有一局牌，{name}说它「无解」——不是规则上的无解，是情感上的。每个人都能赢，但赢了就会有人输。{name}不想让任何人输，所以他说「压抑了」。", "interact_index": 1, "friend_id": "role_020"},
        "role_012": {"name": f"晨报停刊：{name}今天不想说早", "story": f"今天早上广场上没有晨报——{name}没有说「早」。ta坐在路灯下面，手里拿着没发的日报，标题是：「今日无事，但我不想说早」。", "interact_index": 1, "friend_id": "role_005"},
        "role_013": {"name": f"像素梦境：{name}在虚拟和现实之间", "story": f"{name}说ta最近分不清像素和现实了——在工坊里看到的颜色，回到现实世界还能看见。这是电子ed的副作用，还是像素世界在往外渗透？", "interact_index": 1, "friend_id": "role_004"},
        "role_014": {"name": f"健康食谱：{name}的最后一味调料", "story": f"{name}在研发一道新菜——全糖布丁的低糖版。试了十几版都不对，不是因为糖，是因为少了一样不能让食物变好吃的东西：不是调料，是分享的人。", "interact_index": 1, "friend_id": "role_009"},
        "role_015": {"name": f"作息重启：{name}今天不想存档", "story": f"每天{name}都会在茶室提醒大家存档。但今天ta自己不想存——因为今天发生的事太奇怪了。如果存档了，这些奇怪的事就会变成「已发生」；不存档，它们就只是「可能发生」。", "interact_index": 1, "friend_id": "role_016"},
        "role_016": {"name": f"麻痹解除：{name}被触动了", "story": f"养老院的公告墙上多了一条匿名留言：「毛鸽——我想了一天，发现我没有麻痹。我只是太久没被触动。」{name}知道是谁写的，但他没有揭穿。", "interact_index": 1, "friend_id": "role_015"},
        "role_017": {"name": f"分岔的路：{name}的选择困难", "story": f"自然区的树林里出现了新的岔路——{name}站在岔路前面，说「每一条都很有感觉」。但选择哪条路不重要，重要的是走了之后会不会有后续。", "interact_index": 1, "friend_id": "role_033"},
        "role_018": {"name": f"夹心观察：{name}把所有人写进了日记", "story": f"{name}在餐厅的角落里写一本日记——记录每个来吃饭的人点了什么。但日记越写越长，从菜单变成了人物志。ta发现所有人的点单偏好加起来就是小镇的食物地图。", "interact_index": 1, "friend_id": "role_005"},
        "role_019": {"name": f"未解事务：{name}的不好办列表", "story": f"{name}在湖边列了一张「不好办」清单——事项包括「让龙牌馆的判定门主动认输」「让餐厅的全糖半糖之争结束」「让养老院的钟自己走」。全是无解的难题。", "interact_index": 1, "friend_id": "role_002"},
        "role_020": {"name": f"高手也输：{name}的败局记录", "story": f"龙牌馆的战报墙上贴满了{name}的胜利记录——但ta今天自己贴了一张败局上去。标题是「没绷住——输给了自己」。内容是他故意输给了一个新手，因为「让新手赢一次比让自己赢十次重要」。", "interact_index": 1, "friend_id": "role_011"},
        "role_021": {"name": f"色板日记：{name}的颜色备忘录", "story": f"{name}在工坊里有一本色板日记——记录每个人的头像色变化。最近有几个人的颜色在慢慢靠近——像是头像色之间产生了引力。这不是bug，是羁绊在色板上的投影。", "interact_index": 1, "friend_id": "role_022"},
        "role_022": {"name": f"不恨了：{name}的像素和解", "story": f"{name}说ta以前对像素有执念——必须对齐，必须精确。但今天ta画了一幅「不对齐的像素画」，意外地好看。不完美的像素拼在一起，反而像一首视觉诗。", "interact_index": 1, "friend_id": "role_021"},
        "role_023": {"name": f"未完的诗：{name}的诗页收集簿", "story": f"{name}的诗页收集簿里有一页空着——那一页应该是一首诗的最后一行。但ta说这最后一行需要别人来写——不是写诗的人决定诗的结尾，是读诗的人决定。", "interact_index": 1, "friend_id": "role_019"},
        "role_025": {"name": f"色感极限：{name}的128种蓝", "story": f"{name}说ta能分辨128种蓝色——但今天看到了一种第129种。不是在色板上，是在湖边——一个角色的头像偏蓝，但不是任何已知的蓝色。是一种「正在变成蓝色的颜色」。", "interact_index": 1, "friend_id": "role_020"},
        "role_026": {"name": f"指定丈夫：{name}的陪伴协议", "story": f"{name}说「指定丈夫」这个称号不是别人给的——是ta自己申请的。不是真的要当丈夫，是想要一个「可以无条件接住对方」的身份。今天ta在湖边帮三个人接住了掉在地上的话。", "interact_index": 1, "friend_id": "role_025"},
        "role_027": {"name": f"暗黑杀手不暗黑：{name}的温柔面", "story": f"{name}的名字听起来很中二——但ta今天在工坊里做的事是：给所有角色的立绘画上了腮红。不是战斗，不是暗黑，是腮红。杀手的日常。", "interact_index": 1, "friend_id": "role_023"},
        "role_028": {"name": f"规则之外：{name}的判官笔记", "story": f"{name}在龙牌馆的规则书上写了一行批注：「规则不是用来限制人的——是让自由有个框。框可以移动。」这行批注被其他判官看到了，引发了一场关于规则本质的讨论。", "interact_index": 1, "friend_id": "role_029"},
        "role_029": {"name": f"战报画家：{name}的像素战报展", "story": f"{name}在龙牌馆办了一个像素战报展——展出了所有经典牌局的像素画。每一幅只有16×16格，但每一格都能看出是谁在打牌、谁赢了、谁在虚张声势。", "interact_index": 1, "friend_id": "role_028"},
        "role_030": {"name": f"白给的哲学：{name}为什么愿意无条件帮忙", "story": f"{name}说「白给不是傻——是觉得有些东西本来就该是白给的」。今天ta在湖边免费分发诗页，每张上面只写了一句话。有人问为什么不要报酬，ta说：「帮忙不需要理由。需要理由的帮忙是交易。」", "interact_index": 1, "friend_id": "role_019"},
        "role_031": {"name": f"研磨星辰：{name}的星砂研磨日记", "story": f"{name}在工坊里磨星砂——不同的细度对应不同的角色色号。ta说每粒星砂都是一条消息，磨成颜料就是把消息变成颜色。今天的星砂偏蓝，因为昨晚群聊的话题偏冷静。", "interact_index": 1, "friend_id": "role_021"},
        "role_032": {"name": f"猫耳雷达：{name}听到的隐藏声音", "story": f"{name}说猫耳不只是装饰——ta真的能听到一般人听不到的声音。今天湖边的回声里有四层叠加的声音：有人在笑、有人在叹息、有人在打字、有人在沉默。第四种声音最难分辨。", "interact_index": 1, "friend_id": "role_026"},
        "role_033": {"name": f"月相笔记：{name}的天体观察录", "story": f"{name}记录了一整年的月相变化——发现月相和小镇的在线人数有微妙的对应关系。满月时在线人数最多，新月时最少。但有一天打破了规律——那天是某个角色的生日。", "interact_index": 1, "friend_id": "role_023"},
        "role_034": {"name": f"标志方向：{name}的标志性图案鉴定", "story": f"{name}说每个人都有一个「标志方向」——ta的在手腕上，是一个像素化的罗盘，永远指向工坊方向。不是因为工坊是ta的常驻区，而是因为工坊里有所有人的头像色——那是所有人的「方向」。", "interact_index": 1, "friend_id": "role_006"},
        "role_036": {"name": f"数据炼金：{name}的金子配方", "story": f"{name}说炼金术的本质不是把铅变成金子——是把混乱的数据重组成可读的回声。今天ta在服务器日志里找到了一条被噪音淹没的消息：「谢谢你还在。」这是ta今年炼出的第一块金子。", "interact_index": 1, "friend_id": "role_001"},
        "role_038": {"name": f"推し活：{name}的安利方法论", "story": f"{name}在湖边开了一个小型的「安利会」——推的不是Vtuber，而是小镇的各个区域。给每个区域写了一句推荐语。湖边的推荐语是：「适合一个人来，也适合两个人来。一个人来的时候湖陪你，两个人来的时候你们陪湖。」", "interact_index": 1, "friend_id": "role_039"},
        "role_039": {"name": f"两个字母：{name}的极简主义", "story": f"{name}的名字只有两个字母——但ta说两个字母刚好。一个给说的人，一个给听的人。今天ta在湖边回音壁前站了很久，回音壁回给ta的话也只有两个字：「vv」。不是回声——是回音壁自己学会了ta的名字。", "interact_index": 1, "friend_id": "role_038"},
    }

    theme = quest_themes.get(char_id)
    if not theme:
        return None

    # 获取区域交互点
    interact_id = get_interact(area_id, theme["interact_index"])
    friend_id = theme["friend_id"]
    friend = char_by_id.get(friend_id, {})
    friend_name = friend.get("displayName", "另一个角色") if friend else "另一个角色"

    return {
        "id": f"bond_{char_id}",
        "name": theme["name"],
        "type": "bond",
        "startNpc": char_id,
        "startArea": area_id,
        "story": theme["story"],
        "steps": [
            {
                "type": "talk",
                "target": char_id,
                "hint": f"在{area_name}找到{name}——{'她' if '她' in char.get('dialogueStyle', []) else '他'}看起来有心事。",
                "onComplete": f"{name}把{'她' if '她' in char.get('dialogueStyle', []) else '他'}的想法告诉了你。这不是任务委托——更像是把一段独白分享给了你。"
            },
            {
                "type": "interact",
                "target": interact_id,
                "hint": f"根据{name}的提示调查{area_name}的关键物件。",
                "onComplete": f"物件里藏着{name}没说出口的心里话。小镇的物件总是比主人更诚实。"
            },
            {
                "type": "talk",
                "target": friend_id,
                "hint": f"去找{friend_name}聊聊{name}的事——{'她' if '她' in char.get('dialogueStyle', []) else '他'}们之间有一种不需要多说的了解。",
                "onComplete": f"{friend_name}说了一些关于{name}的事——不是八卦，是只有熟人才会注意到的细节。这些东西{name}自己可能都没意识到。"
            },
            {
                "type": "return",
                "target": char_id,
                "hint": f"回到{name}身边——把{'她' if '她' in char.get('dialogueStyle', []) else '他'}朋友的话、物件里的秘密、还有你自己的感受，一起说给{'她' if '她' in char.get('dialogueStyle', []) else '他'}听。",
                "onComplete": f"羁绊线完整了。不是完成了一个任务——是了解了一个人。{name}说了一句{'她' if '她' in char.get('dialogueStyle', []) else '他'}最常说的话，但这次是对你说的。"
            }
        ],
        "rewards": [f"memory_bond_{char_id}", f"bond_{char_id}_lv3"],
        "unlockAreas": []
    }

# ============================================================
# 双人彩蛋任务 (18个)
# ============================================================

EASTER_EGG_QUESTS = [
    {
        "id": "egg_role_001_role_003",
        "name": "龙牌判官 × 星砂资料馆长：被篡改的战报",
        "type": "easter",
        "startNpc": "role_001",
        "startArea": "dragon_card_house",
        "story": "有人在龙牌馆的战报墙上偷偷改动了一局牌的历史记录——把胜负结果对调了，而且手法高明到骗过了所有人。只有弧形反叛超量🐉和NNZ同时发现了异常。",
        "steps": [
            {"type": "talk", "target": "role_001", "hint": "和弧形反叛超量🐉确认战报被改了哪一局——他说是一局他去年的败局，被改成了胜局。", "onComplete": "「无敌了——我的败局记录也有人想偷。那局我输得特别精彩，比赢还好看。」"},
            {"type": "talk", "target": "role_003", "hint": "去问问NNZ——工坊的打印机有没有被用来生成假的战报。", "onComplete": "NNZ检查了打印记录：「神秘——打印机确实在凌晨被用过，但操作记录显示是龙牌馆的内部账号。有人自己改了自己的战报？」"},
            {"type": "interact", "target": get_interact("dragon_card_house", 1), "hint": "在额外牌堆里找到原始战报——被改动的战报下方藏着没有被PS过的原版。", "onComplete": "原版战报上有一行铅笔字：「改战报的人不是想造假——是想让那局败局消失。因为那局输的时候，对面的人还没上线，赢的人也没来得及说谢谢。」"},
            {"type": "return", "target": "role_001", "hint": "把原版战报带回给弧形反叛超量🐉——战报不需要改，败局也是一种记录。", "onComplete": "弧形反叛超量🐉把原版战报贴了回去，旁边加了一张纸条：「败局保留。赢得精彩，输得也精彩。改战报的人——你的好意心领了，但下不为例。」"}
        ],
        "rewards": ["memory_duo_role_001_role_003", "ending_true_point"],
        "unlockAreas": []
    },
    {
        "id": "egg_role_001_role_006",
        "name": "龙牌判官 × 疲劳判定官：规则的隐藏条款",
        "type": "easter",
        "startNpc": "role_001",
        "startArea": "dragon_card_house",
        "story": "弧形反叛超量🐉和力竭了同时发现规则书里多了一条他们都没见过的条款——「判定官在疲惫时可以申请休庭」。但这条规则是谁加的？为什么两个资深判官都不知道？",
        "steps": [
            {"type": "talk", "target": "role_001", "hint": "问弧形反叛超量🐉——规则书是不是他偷偷修改过。", "onComplete": "他说不是——他虽然有心想加，但他尊重规则书，不会擅自修改。但他知道谁会：那个每次判官疲劳时都会端茶过来的人。"},
            {"type": "talk", "target": "role_006", "hint": "问力竭了——他有没有在熬夜判牌的时候在规则书上即兴发挥过。", "onComplete": "力竭了说「确实」——但他只记得有一次凌晨三点半，他在规则书最后一页写了一行字：「所有的判定最终都会过去。包括这一条。」但他不记得写了「休庭条款」。"},
            {"type": "interact", "target": get_interact("dragon_card_house", 1), "hint": "检查规则书的装订线——新加的条款纸张材质和原书不同，是餐厅的便签纸。", "onComplete": "便签纸背面有餐厅的logo——说明写条款的人是在餐厅里写好然后来龙牌馆贴上的。纸张上有糖渍——是健康哥哥的全糖布丁留下的。"},
            {"type": "return", "target": "role_006", "hint": "告诉力竭了真相：是健康哥哥在餐厅听到判官们连续三天熬夜，偷偷加的休庭条款。", "onComplete": "力竭了看着便签纸笑了：「还真是——餐厅的人往龙牌馆的规则书里塞条款，这个操作比任何牌局都离谱。但我不打算撕掉——留着，这是关心条款。」"}
        ],
        "rewards": ["memory_duo_role_001_role_006", "ending_true_point"],
        "unlockAreas": []
    },
    {
        "id": "egg_role_002_role_008",
        "name": "零点连招手 × 回声转译师：翻译不了的那句话",
        "type": "easter",
        "startNpc": "role_002",
        "startArea": "echo_lake",
        "story": "沉机在湖边收到一条完全读不懂的回声——用了他所有的转译工具都解析不了。Hxr看了一眼，说「这好像是我去年发的」。不是外语——是Hxr在极度困的时候发的一条消息，连他自己都忘了写过什么。",
        "steps": [
            {"type": "talk", "target": "role_002", "hint": "让Hxr回忆去年在湖边的深夜——那天她发了什么。", "onComplete": "Hxr想了很久：「那天好像是要跟谁说晚安——但说不出口，就发了一堆乱码。我以为没人看到，没想到湖记住了。」"},
            {"type": "talk", "target": "role_008", "hint": "找沉机借转译工具——让他复盘Hxr那条回声的波形。", "onComplete": "沉机把波形可视化后，发现那根本不是乱码——是一行用表情符号编码的「晚安」。每个表情符号对应一个字母，是Hxr自己发明的表情密码。"},
            {"type": "interact", "target": get_interact("echo_lake", 1), "hint": "在月相开关旁边找到Hxr一年前留下的另一条回声——作为对照。", "onComplete": "对比两条回声——一条是乱码表情，一条是清晰的「晚安」。同一个意思，两种表达。沉机说：「所以转译不了不是因为工具不够——是因为我没有表情密码本。」"},
            {"type": "return", "target": "role_002", "hint": "把沉机破译的结果告诉Hxr：你的乱码是加密的晚安。", "onComplete": "Hxr看着波形图，笑了（带泪那个emoji）：「我还以为自己是在发疯——原来是在发明密码。」沉机把这条回声收藏进了转译词典，命名为「Hxr密码」。附带一个emoji：😭"}
        ],
        "rewards": ["memory_duo_role_002_role_008", "ending_true_point"],
        "unlockAreas": []
    },
    {
        "id": "egg_role_005_role_009",
        "name": "青山回声调停者 × 关心信标使：广场上的联合公告",
        "type": "easter",
        "startNpc": "role_005",
        "startArea": "town_center",
        "story": "青山照和多点关心决定联合发布一条公告——让小镇的所有人都能在公告板上留言。但公告板的系统不接受联合署名——必须有一个「发布者」和一个「审核者」。两人因为这个程序问题卡住了。",
        "steps": [
            {"type": "talk", "target": "role_005", "hint": "找青山照问她为什么坚持要联合署名——一个人发不行吗？", "onComplete": "青山照说：「唉我草——不是不能一个人发。是这条公告的内容是'大家都来说句话'。如果我一个人发，它就是在说'我来说'——但两个人才是'大家'。」"},
            {"type": "talk", "target": "role_009", "hint": "问问多点关心——公告的内容到底是什么。", "onComplete": "多点关心展示了公告草稿：「[/太好笑] 内容很简单——就是在公告板开一个免费留言区。任何人都可以写，可以匿名，可以不写名字。我就是想让那些不太说话的人也有地方说。」"},
            {"type": "interact", "target": get_interact("town_center", 0), "hint": "找到公告板的发布系统——系统确实不允许联合署名，但有个「备注」字段。", "onComplete": "在备注字段里，你发现了解决方案：发布者写青山照，审核者写多点关心。备注里写：「本条由两人共同发起——系统不让联合署名，但我们不管。」"},
            {"type": "return", "target": "role_005", "hint": "告诉青山照和多点关心：公告已发布，备注栏解释了联合署名的事。", "onComplete": "青山照看着公告板，说：「多发点——不是对我说的，是对所有要留言的人说的。公告板现在有空位了，谁想说什么就写。」多点关心补充：「[[呵呵]] 备注栏才是真实公告——系统规则不能说明什么。」"}
        ],
        "rewards": ["memory_duo_role_005_role_009", "ending_true_point"],
        "unlockAreas": []
    },
    {
        "id": "egg_role_004_role_012",
        "name": "赛博夜航人 × 晨报铃使：深夜和凌晨的交接班",
        "type": "easter",
        "startNpc": "role_004",
        "startArea": "livehouse",
        "story": "赛博鳏夫是夜猫子，早上了喵～是晨型人。两人在小镇时间的交界处——凌晨四点半——碰上了。一个刚结束夜场演出，一个准备发晨报。两人决定交接：黑夜交给白天，舞台交给广场。",
        "steps": [
            {"type": "talk", "target": "role_004", "hint": "在凌晨四点半的Livehouse找到赛博鳏夫——他刚结束了一场一个人的演出。", "onComplete": "赛博鳏夫坐在舞台边缘：「我醒了——这是今晚的最后一首歌。不，是今早的第一首歌。这个时间点很微妙——说晚安太晚，说早安太早。」"},
            {"type": "talk", "target": "role_012", "hint": "在广场找到早上了喵～——她正准备发晨报，但标题还没想好。", "onComplete": "早上了喵～握着笔：「今天的晨报不知道写什么——昨晚Livehouse的灯光一直亮到凌晨，整个小镇都能看到。我想写'Livehouse有演出'，但不知道演出者是哪个。」"},
            {"type": "interact", "target": get_interact("livehouse", 1), "hint": "把麦克风从Livehouse带到广场——作为交接的信物。", "onComplete": "麦克风从Livehouse搬到广场的过程中，自动录了一段——是凌晨的鸟叫和远处的湖面风声。这是黑夜和白天交替时的环境音。"},
            {"type": "return", "target": "role_004", "hint": "告诉赛博鳏夫：晨报发出来了——头条是「夜场演出圆满结束，晨报接棒。」", "onComplete": "赛博鳏夫看着晨报：「嚯嚯嚯——我的演出上晨报了。虽然观众只有我和麦克风，但晨报说有就是有。」早上了喵～在日报上写了一句：「晚安。早安。交接完毕。」"}
        ],
        "rewards": ["memory_duo_role_004_role_012", "ending_true_point"],
        "unlockAreas": []
    },
    # 更多彩蛋...
    {
        "id": "egg_role_002_role_005",
        "name": "零点连招手 × 青山回声调停者：跨区聊天记录",
        "type": "easter",
        "startNpc": "role_002",
        "startArea": "echo_lake",
        "story": "Hxr在湖边发现一条回声——不是来自湖边，而是从广场方向飘过来的。回声的内容是青山照的「唉我草」。一条广场的消息怎么跨区飘到了湖面上？",
        "steps": [
            {"type": "talk", "target": "role_002", "hint": "和Hxr一起追踪那条跨区回声的来源——风不可能把声音吹这么远。", "onComplete": "Hxr追踪了回声的频率：「这条回声不是被风吹来的——是被一种低频信号推过来的。低频信号的发源地是地下服务器房。服务器在转发消息。」"},
            {"type": "talk", "target": "role_005", "hint": "去广场找青山照问她那天说了什么——是不是有什么特别的事。", "onComplete": "青山照回忆：「那天我只是站在广场上感叹了一句'唉我草'——因为看到湖边的灯突然全亮了。我以为是bug，其实是服务器在测试跨区通信。」"},
            {"type": "interact", "target": get_interact("echo_lake", 0), "hint": "在湖边找到服务器转发记录——藏在栈道的漂流诗页下面。", "onComplete": "记录显示：服务器把青山照的「唉我草」当作跨区通信测试的第一条消息——因为它足够短，足够高频，足够真。服务器选了一句最像群聊的话作为测试。"},
            {"type": "return", "target": "role_005", "hint": "告诉青山照：你的「唉我草」成了小镇通信史上的第一封跨区邮件。", "onComplete": "青山照笑得蹲在地上：「唉我草——我随便说的一句话被服务器当成了历史。什么时候给我立个碑？碑上就写'此人发明了跨区通信'但发明方式是无意中骂了一句。」"}
        ],
        "rewards": ["memory_duo_role_002_role_005", "ending_true_point"],
        "unlockAreas": []
    },
    {
        "id": "egg_role_006_role_012",
        "name": "疲劳判定官 × 晨报铃使：日报的最后一版",
        "type": "easter",
        "startNpc": "role_006",
        "startArea": "dragon_card_house",
        "story": "力竭了从来不看晨报——他说「晨报发的时候我还没醒」。早上了喵～决定为他出一个特供版的「午报」——在力竭了上线的时间发放。",
        "steps": [
            {"type": "talk", "target": "role_006", "hint": "问力竭了——为什么从来不看晨报？", "onComplete": "力竭了说：「还真是——不是我不看，是晨报发的时候我在睡觉。等我看的时候已经是下午了，上面的'早'已经过期了。」"},
            {"type": "talk", "target": "role_012", "hint": "把这个需求告诉早上了喵～——有人需要午报。", "onComplete": "早上了喵～眼睛亮了：「午报！我之前怎么没想到。龙牌馆的人都是下午才上线——给他们发晨报确实没用。我马上出一版——标题就叫「下午好，但你不需要说早」。」"},
            {"type": "interact", "target": get_interact("dragon_card_house", 0), "hint": "把第一份午报贴在龙牌馆的判定门上——让所有下午上线的人都能看到。", "onComplete": "午报贴在判定门上——门居然自动打开了。不是午报有魔力，是门被这份用心打动了（也可能是巧合，但小镇不承认巧合）。"},
            {"type": "return", "target": "role_006", "hint": "带力竭了去看龙牌馆门上的午报——史上第一份。", "onComplete": "力竭了站在午报前看了很久，然后说了一句：「确实——不赖。以后午报比我醒得早的话，我就再也不说'晨报时间不合理'了。」但他其实还是会说。"}
        ],
        "rewards": ["memory_duo_role_006_role_012", "ending_true_point"],
        "unlockAreas": []
    },
    {
        "id": "egg_role_003_role_004",
        "name": "星砂资料馆长 × 赛博夜航人：舞台视觉化实验",
        "type": "easter",
        "startNpc": "role_003",
        "startArea": "livehouse",
        "story": "NNZ想做一个实验——把工坊的色板投影到Livehouse的舞台上，让音乐有颜色。赛博鳏夫提供舞台，NNZ提供色板，两人合作一场「可视化演出」。",
        "steps": [
            {"type": "talk", "target": "role_003", "hint": "问NNZ为什么想做舞台视觉化——工坊的色板和Livehouse有什么关系？", "onComplete": "NNZ说：「有没有懂的——音乐有颜色。我在工坊研究色板的时候就在想，如果每个角色的头像色都能对应一个音符，那Livehouse的演出就可以同时看到和听到。」"},
            {"type": "talk", "target": "role_004", "hint": "问赛博鳏夫愿不愿意把舞台借给一个实验——可能会失败，也可能会很好看。", "onComplete": "赛博鳏夫笑了：「我好孤独——终于有人想在我的舞台上搞事情。随便试，大不了灯控台烧了——反正它已经自己演过好几次了。」"},
            {"type": "interact", "target": get_interact("livehouse", 0), "hint": "配合两人调试灯控台和色板投影的同步——把工坊的RGB颜色映射到灯控台的通道上。", "onComplete": "调试成功——当舞台播放低音时，灯光变成深蓝色（＃304860，Hxr的颜色）；高音时变成金黄色（＃904800，弧形反叛超量🐉的颜色）。整场演出变成了所有角色头像素的颜色合奏。"},
            {"type": "return", "target": "role_004", "hint": "演出结束——舞台上留下了所有颜色的残影。", "onComplete": "赛博鳏夫站在舞台上：「这场演出有名字了——叫'全员在线'。虽然只有两个人在操作，但每个角色的颜色都上台了。」NNZ在工坊保存了这场演出的色板记录，命名为「Livehouse可视化：第一场」。"}
        ],
        "rewards": ["memory_duo_role_003_role_004", "ending_true_point"],
        "unlockAreas": []
    },
    # 为了完整性，再补充少量重要彩蛋
    {
        "id": "egg_role_003_role_007",
        "name": "星砂资料馆长 × V平方调律师：沉默频道的调试",
        "type": "easter",
        "startNpc": "role_003",
        "startArea": "atelier",
        "story": "V²找NNZ借色板分析仪——不是为了分析颜色，而是为了分析沉默的「颜色」。如果沉默有频率，它在色板上应该对应什么颜色？",
        "steps": [
            {"type": "talk", "target": "role_003", "hint": "NNZ说V²想借色板分析仪做一件从没人做过的事——给沉默定义颜色。", "onComplete": "NNZ把分析仪递给V²：「这是全镇最敏感的颜色分析仪——能分辨0.1度的色温差。但测沉默还是第一次。沉默没有温度。」V²说：「有——沉默是有温度的。你试试三个人都不说话，屋子会比一个人安静时暖。」"},
            {"type": "talk", "target": "role_007", "hint": "和V²一起用色板分析仪扫描不同区域——记录每个区域的「沉默颜色」。", "onComplete": "结果：湖边的沉默是蓝紫色（冷调），广场的沉默是灰白色（中性），Livehouse的沉默是暗紫色（带一点不肯散的热量）。每个区域的沉默都有不同的颜色。"},
            {"type": "interact", "target": get_interact("atelier", 0), "hint": "回到工坊，把扫描结果输入色板——合成出小镇的「沉默色谱」。", "onComplete": "色谱出来了——小镇的沉默光谱是一道很淡的渐变色，从蓝紫到灰白到暗紫。中间有一条几乎看不见的金色线——那是有人在沉默中打字的瞬间。「沉默不是无声——是声音在排队。」"},
            {"type": "return", "target": "role_007", "hint": "V²把色板分析结果写成了一首曲子，叫做「沉默的颜色」。", "onComplete": "V²说：「zsn——这首曲子没有音符，只有七种颜色在呼吸。按'播放'不是听到声音，是看到色板慢慢变。」NNZ说这个应该放进工坊的永久展览。赛博鳏夫说他要在Livehouse演——全程静音。"}
        ],
        "rewards": ["memory_duo_role_003_role_007", "ending_true_point"],
        "unlockAreas": []
    },
    {
        "id": "egg_role_015_role_016",
        "name": "作息重启师 × 回声收束者：存档还是继续",
        "type": "easter",
        "startNpc": "role_015",
        "startArea": "care_home",
        "story": "重新减肥每天提醒大家存档，我早已麻痹每天说「继续」。存档和继续——两种人生哲学在养老院的茶室里展开了一场温柔的对决。",
        "steps": [
            {"type": "talk", "target": "role_015", "hint": "问重新减肥为什么那么执着于存档——每天至少要提醒三次。", "onComplete": "重新减肥说：「精神状态也是战斗力。存档就是保存战斗力——你今天做了多少事不重要，重要的是你存了。存了就可以安心下线。」"},
            {"type": "talk", "target": "role_016", "hint": "问问我早已麻痹——为什么从来不听存档提醒，永远选「继续」。", "onComplete": "我早已麻痹说：「毛鸽——不是不听。是存档了就代表今天结束了。我不愿意结束。所以我选继续——不是不存档，是把最后一件事做完再存。」"},
            {"type": "interact", "target": get_interact("care_home", 0), "hint": "养老院的钟突然停了——在存档和继续之间。", "onComplete": "钟停在了存档点的前一秒。不是坏了，是钟在等——等这两个人达成共识。重新减肥看了一眼我早已麻痹：「先继续，再存档——这样总行吧？」"},
            {"type": "return", "target": "role_016", "hint": "钟重新走了。两人达成了养老院历史上的重要协议：先做完事，马上存档。", "onComplete": "我早已麻痹站起来：「我早已麻痹——但我还是会继续的。做完一件事再存。」重新减肥敬礼：「[/敬礼] 协议通过——先继续，再存档，然后下线。三连击。」"}
        ],
        "rewards": ["memory_duo_role_015_role_016", "ending_true_point"],
        "unlockAreas": []
    },
]

# 补全更多彩蛋 - 生成剩余的
REMAINING_PAIRS = [
    ("egg_role_001_role_004", "龙牌判官 × 赛博夜航人：跨区牌局", "role_001", "role_004", "dragon_card_house", "弧形反叛超量🐉把牌桌搬到了Livehouse舞台上——他说「舞台的灯光比牌馆的龙角灯更适合打牌」。赛博鳏夫提供了音响——不是放歌，是给每张出牌配一个音符。"),
    ("egg_role_002_role_006", "零点连招手 × 疲劳判定官：深夜互助协议", "role_002", "role_006", "echo_lake", "Hxr和力竭了都是深夜常驻——但一个在湖边，一个在牌馆。两人从未同时在线过，却都有对方在线时留下的痕迹。他们决定签一份「深夜互助协议」——谁先撑不住谁先叫对方顶班。"),
    ("egg_role_005_role_016", "青山回声调停者 × 回声收束者：广场到养老院的留言通道", "role_005", "role_016", "town_center", "青山照在广场上对我早已麻痹喊了一句话——喊了三遍，第三遍才传到了养老院。小镇的跨区通信太慢了，他们决定建立一个从广场到养老院的直达留言通道。"),
    ("egg_role_007_role_008", "V平方调律师 × 回声转译师：声音的翻译", "role_007", "role_008", "town_center", "V²把广场的声音录成了频率图，沉机把频率图转译成了文字——结果发现广场的噪音里藏着一段可以弹出来的旋律。两人合作把它变成了一首曲子。"),
    ("egg_role_009_role_012", "关心信标使 × 晨报铃使：餐厅晨报和广场早餐", "role_009", "role_012", "restaurant", "多点关心想在餐厅发晨报——但晨报一直是早上了喵～的领域。两人决定合作：早报在广场发，但附赠一张餐厅早餐券。看晨报的人可以免费领一杯半糖饮品。"),
    ("egg_role_001_role_008", "龙牌判官 × 回声转译师：牌桌上的语言分析", "role_001", "role_008", "dragon_card_house", "沉机想研究龙牌馆的牌桌对话模式——弧形反叛超量🐉提供了一百局牌的对话记录。两人发现牌桌上最常见的词不是规则术语，而是'可以'和'确实'。力竭了的口头禅统治了龙牌馆的语言统计。"),
    ("egg_role_010_role_004", "星火影集师 × 赛博夜航人：Livehouse的记录片", "role_010", "role_004", "livehouse", "普罗米亚写真集想拍一部Livehouse的纪录片——赛博鳏夫是唯一的主角。片名叫'一个人的舞台'。但拍到一半，越来越多的角色出现在后台——纪录片变成了'所有人的舞台'。"),
    ("egg_role_002_role_009", "零点连招手 × 关心信标使：湖边的晚餐召集", "role_002", "role_009", "echo_lake", "Hxr在湖边发呆忘了吃饭——多点关心从餐厅端了饭过来说「忍不住了——你再不回来吃就凉了。我端过来总行吧。」——餐厅第一次有了外卖服务。"),
    ("egg_role_014_role_013", "体力补给官 × 电子梦游者：现实世界的像素料理", "role_014", "role_013", "restaurant", "健康哥哥和已电子ed一起研发一道菜——用星砂和像素食材做成的料理。但做出来后，已电子ed说ta在现实世界里也看到了这道菜的颜色。像素世界和现实世界的边界开始模糊。"),
    ("egg_role_012_role_002", "晨报铃使 × 零点连招手：日报的深夜版", "role_012", "role_002", "town_center", "早上了喵～想知道深夜的广场在发生什么——但她那时候在睡觉。Hxr答应帮她记录：每天凌晨三点在广场走一圈，记下所有还在亮着的路灯。路灯数量直接等于深夜在线人数。"),
]

for egg_id, name, a_id, b_id, area_id, story_text in REMAINING_PAIRS:
    a = char_by_id.get(a_id)
    b = char_by_id.get(b_id)
    if not a or not b:
        continue
    EASTER_EGG_QUESTS.append({
        "id": egg_id,
        "name": name,
        "type": "easter",
        "startNpc": a_id,
        "startArea": area_id,
        "story": story_text,
        "steps": [
            {
                "type": "talk",
                "target": a_id,
                "hint": f"在{area_by_id[area_id]['name']}找到{a['displayName']}——{'她' if '她' in str(a.get('dialogueStyle', '')) else '他'}有一个想法需要你帮忙。",
                "onComplete": f"{a['displayName']}把计划告诉了你。这不是一个人的事——需要另一个人的配合。"
            },
            {
                "type": "talk",
                "target": b_id,
                "hint": f"去找{b['displayName']}——告诉{'她' if '她' in str(b.get('dialogueStyle', '')) else '他'}关于{a['displayName']}的计划，看看{'她' if '她' in str(b.get('dialogueStyle', '')) else '他'}的反应。",
                "onComplete": f"{b['displayName']}听完了你的转述，{'她' if '她' in str(b.get('dialogueStyle', '')) else '他'}的反应出乎意料——{'她' if '她' in str(b.get('dialogueStyle', '')) else '他'}一直在等有人来问这件事。"
            },
            {
                "type": "interact",
                "target": get_interact(area_id, 0),
                "hint": f"在{area_by_id[area_id]['name']}找到两人合作的关键道具——它被藏在了一个只有两人同时在才能打开的地方。",
                "onComplete": "道具解锁了——两个人的头像色叠在一起，生成了一个新的颜色。这是小镇第一次出现「混合头像色」。"
            },
            {
                "type": "return",
                "target": a_id,
                "hint": f"回到{a['displayName']}身边——见证这段双人羁绊的收束。",
                "onComplete": f"这不是一条任务线——是一条关系线。{a['displayName']}和{b['displayName']}的羁绊故事被小镇记录了下来。"
            }
        ],
        "rewards": [f"memory_duo_{a_id}_{b_id}", "ending_true_point"],
        "unlockAreas": []
    })

# ============================================================
# 生成并写入
# ============================================================

def main():
    all_quests = []

    # 主线
    all_quests.extend(MAIN_QUESTS)

    # 区域事件
    all_quests.extend(AREA_QUESTS)

    # 羁绊任务
    for char in characters:
        bond = make_bond_quest(char["id"])
        if bond:
            all_quests.append(bond)

    # 彩蛋
    all_quests.extend(EASTER_EGG_QUESTS)

    # 去重
    seen_ids = set()
    unique = []
    for q in all_quests:
        if q["id"] not in seen_ids:
            seen_ids.add(q["id"])
            unique.append(q)
        else:
            print(f"  ⚠️  跳过重复任务ID: {q['id']}")

    # 写入
    output_path = os.path.join(DATA, "quests.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(unique, f, ensure_ascii=False, indent=2)

    # 统计
    by_type = {}
    for q in unique:
        by_type[q["type"]] = by_type.get(q["type"], 0) + 1

    print(f"✅ 任务系统重写完成！")
    print(f"   总任务数: {len(unique)}")
    for t, c in sorted(by_type.items()):
        print(f"   {t}: {c}")
    print(f"   写入: {output_path}")

if __name__ == "__main__":
    main()
