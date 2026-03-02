export type Category = 'beginner' | 'advanced' | 'race'

export interface Article {
  slug: string
  category: Category
  categoryLabel: string
  title: string
  excerpt: string
  readTime: string
  content: string
}

export const categoryInfo: Record<Category, { label: string; color: string; description: string }> = {
  beginner: {
    label: '新手 101',
    color: 'text-trail-green',
    description: '零基础入门，装备选购与跑姿基础',
  },
  advanced: {
    label: '进阶之路',
    color: 'text-trail-orange',
    description: '爬升训练、技术路面与体能提升',
  },
  race: {
    label: '赛事指南',
    color: 'text-yellow-400',
    description: '强制装备检查、补给策略与比赛心法',
  },
}

export const articles: Article[] = [
  {
    slug: 'gear-basics',
    category: 'beginner',
    categoryLabel: '新手 101',
    title: '越野跑装备基础：你需要的一切',
    excerpt: '从跑鞋到水袋，了解每件装备的作用，让你的第一次越野之旅安全又愉快。',
    readTime: '8 分钟',
    content: `
<h2>一、越野跑鞋：一切的基础</h2>
<p>越野跑鞋与公路跑鞋最大的区别在于抓地力和保护性。好的越野鞋应具备：</p>
<ul>
  <li><strong>大底鞋钉</strong>：深度 4-6mm 的鞋钉设计，适合泥地、碎石和湿滑路面</li>
  <li><strong>岩板保护</strong>（Rock Plate）：夹层硬板防止尖石刺穿鞋底</li>
  <li><strong>宽楦头</strong>：下坡时脚趾不会撞击鞋头</li>
  <li><strong>防水层</strong>（可选）：GORE-TEX 适合雨季，但会影响透气性</li>
</ul>
<p>推荐入门品牌：Salomon Speedcross、Hoka Speedgoat、Altra Lone Peak。</p>

<h2>二、水袋背包：补水与负重</h2>
<p>越野跑的补水需求远超公路跑。主要选择：</p>
<ul>
  <li><strong>软水瓶</strong>：150-500ml，放在胸前口袋，随时取用</li>
  <li><strong>水袋包（Vest）</strong>：5-12L 容量，适合中长距离，内置吸管管路</li>
</ul>
<p>选择背包时注意贴合度，晃动会导致肩膀和胸部磨损。推荐品牌：Salomon ADV Skin、Osprey Duro。</p>

<h2>三、导航工具：不迷路是底线</h2>
<ul>
  <li><strong>GPS 运动手表</strong>：Garmin Fenix、COROS APEX，可加载赛道 GPX 文件</li>
  <li><strong>手机离线地图</strong>：Komoot、Gaia GPS，提前下载离线地图</li>
  <li><strong>纸质地图 + 指南针</strong>：作为电子设备失效时的备用</li>
</ul>

<h2>四、其他必备装备清单</h2>
<ul>
  <li>头灯（即使白天出发，防止行程延误）</li>
  <li>急救包（绷带、碘伏棉球、弹力绷带）</li>
  <li>紧急保温毯（SOL 品牌，仅 50g）</li>
  <li>防晒霜 SPF50+</li>
  <li>能量胶 / 能量棒</li>
</ul>
<p>记住原则：<strong>轻量化≠不安全</strong>。每件装备都要有其存在的理由。</p>
    `,
  },
  {
    slug: 'running-form',
    category: 'beginner',
    categoryLabel: '新手 101',
    title: '越野跑姿基础：上坡下坡都不怕',
    excerpt: '掌握上坡用手臂、下坡用重力的越野跑姿技巧，减少受伤风险，跑得更远更快。',
    readTime: '6 分钟',
    content: `
<h2>越野跑姿与公路跑的核心区别</h2>
<p>越野跑的地面千变万化，你的步伐必须时刻适应地形。没有固定的"完美步频"，灵活性才是王道。</p>

<h2>一、上坡技巧：省力才能走得更远</h2>
<p>很多新手在上坡时用跑的，结果心率飙升、腿部堆积乳酸。专业选手的做法是：</p>
<ul>
  <li><strong>当坡度 > 10%</strong>：改为快走，双手扶膝盖助力（Pole Hiking）</li>
  <li><strong>上身前倾</strong>：重心落在前脚掌，减少踮脚跟</li>
  <li><strong>手臂摆动</strong>：有力地前后摆动，帮助身体向上的动力</li>
  <li><strong>步幅缩短</strong>：小步快走比大步慢跑更省力</li>
</ul>
<p>使用登山杖（Poles）可以减少 30% 的腿部负担，强烈推荐。</p>

<h2>二、下坡技巧：最考验技术的环节</h2>
<p>下坡受伤是越野跑最常见的事故，掌握技术才能快速安全地下撤：</p>
<ul>
  <li><strong>视线看远处</strong>：提前规划落脚点，而不是盯着脚下</li>
  <li><strong>膝盖微弯</strong>：作为缓冲弹簧，不要锁死关节</li>
  <li><strong>重心后移</strong>：防止向前摔跌</li>
  <li><strong>双臂展开</strong>：像翅膀一样保持平衡</li>
  <li><strong>落脚于全掌</strong>：避免只用脚跟着地</li>
</ul>

<h2>三、技术路面：碎石、树根、泥泞</h2>
<ul>
  <li><strong>碎石坡</strong>：脚掌"踩稳"再转移重心，不要跳跃</li>
  <li><strong>树根路</strong>：放低重心，步伐像猫一样轻柔</li>
  <li><strong>泥泞</strong>：踩在草丛或石头边缘，避免踩入泥坑中央</li>
</ul>

<h2>四、核心力量：被忽视的基础</h2>
<p>强壮的核心肌群让你在复杂地形中保持稳定。每周加入：深蹲、单腿深蹲、平板支撑、臀桥。这些看似枯燥的训练，是越野跑进步的秘密武器。</p>
    `,
  },
  {
    slug: 'climb-training',
    category: 'advanced',
    categoryLabel: '进阶之路',
    title: '爬升训练：如何建立你的"垂直引擎"',
    excerpt: '爬升能力是越野跑的核心竞争力。通过系统的爬升训练，让你在陡坡上超越对手。',
    readTime: '10 分钟',
    content: `
<h2>为什么爬升能力如此重要</h2>
<p>一场 100km 的越野赛可能累计爬升超过 6000m。即使是 50km 的赛事，爬升也往往超过 2500m。爬升效率直接决定你的完赛时间和体力分配。</p>

<h2>一、爬升训练的三个层次</h2>

<h3>基础层：有氧爬升</h3>
<p>在心率区间 2-3 区（最大心率的 65-80%），持续上坡行走 45-90 分钟。目标是建立有氧基础，训练脂肪代谢能力。</p>

<h3>力量层：重复爬坡冲刺</h3>
<p>找一段坡度 15-25% 的陡坡，长度 100-400m：</p>
<ul>
  <li>冲刺上坡（心率区间 4-5 区）</li>
  <li>慢跑或步行下坡恢复</li>
  <li>重复 6-10 组</li>
</ul>
<p>这个训练有效提升 VO2max 和神经肌肉适应性。</p>

<h3>专项层：模拟比赛地形</h3>
<p>在接近比赛地形的路线上进行 Back-to-Back 训练（连续两天长距离），让身体适应疲劳状态下的爬升。</p>

<h2>二、登山杖的正确使用</h2>
<p>登山杖不只是辅助工具，正确使用可以显著提升爬升效率：</p>
<ul>
  <li><strong>杖长设置</strong>：上坡缩短 5cm，下坡伸长 5cm</li>
  <li><strong>节奏</strong>：双杖同时撑地，与步伐同频</li>
  <li><strong>手腕带</strong>：穿过腕带，手掌向下压，而非握紧杆身</li>
</ul>

<h2>三、爬升训练周期安排</h2>
<p>以 12 周赛前周期为例：</p>
<ul>
  <li><strong>第 1-4 周</strong>：每周爬升量 1500-2000m，以有氧为主</li>
  <li><strong>第 5-8 周</strong>：每周爬升量 2500-3500m，加入爬坡冲刺训练</li>
  <li><strong>第 9-10 周</strong>：每周爬升量 3500-5000m，模拟赛事地形</li>
  <li><strong>第 11-12 周</strong>：减量恢复，每周爬升降至 1000m 以下</li>
</ul>

<h2>四、注意膝盖保护</h2>
<p>大量下坡训练会给膝盖带来压力。预防措施：强化股四头肌和臀肌、使用登山杖减负、必要时佩戴护膝（如 McDavid 6441）。</p>
    `,
  },
  {
    slug: 'technical-terrain',
    category: 'advanced',
    categoryLabel: '进阶之路',
    title: '技术路面攻略：从岩石到溪流全覆盖',
    excerpt: '巨石阵、悬崖小道、溪流穿越——让你在任何地形都能从容前行的实战技巧。',
    readTime: '9 分钟',
    content: `
<h2>什么是技术路面</h2>
<p>技术路面（Technical Terrain）指需要特别注意落脚点、速度控制和身体协调的路段，包括：巨石阵（Boulder Field）、碎石坡、悬崖小道、溪流穿越、湿润岩面等。</p>

<h2>一、巨石阵穿越</h2>
<p>巨石阵是最考验眼脚协调的路面。核心技巧：</p>
<ul>
  <li><strong>视线前移 3-5 步</strong>：提前规划路线，而非盯着当前落脚点</li>
  <li><strong>轻快步伐</strong>：重心快速转移，减少单脚停留时间</li>
  <li><strong>双臂展开</strong>：随时准备抓扶和保持平衡</li>
  <li><strong>相信鞋子</strong>：好的越野鞋抓地力远超你的想象，学会信任它</li>
</ul>

<h2>二、悬崖小道与窄脊</h2>
<p>心理因素往往比技术更重要：</p>
<ul>
  <li>降速，不要被其他选手的速度影响</li>
  <li>视线聚焦于路面，不要向下看悬崖</li>
  <li>必要时手脚并用，面向山坡侧移通过</li>
</ul>

<h2>三、溪流穿越</h2>
<ul>
  <li><strong>评估深度</strong>：用登山杖探测，超过大腿高度的流速急的溪流要绕行</li>
  <li><strong>脱鞋与否</strong>：短赛程可脱鞋过河保持干燥；长距离赛事直接踩入节省时间</li>
  <li><strong>过河后</strong>：立即甩水，换干袜子（如携带），防止水泡</li>
</ul>

<h2>四、夜间技术路面</h2>
<p>夜跑时技术路面的风险成倍增加：</p>
<ul>
  <li>降速 30-50%</li>
  <li>使用亮度不低于 300 流明的头灯</li>
  <li>增加头灯与腰灯的组合，消除阴影</li>
  <li>不要单人夜跑技术段</li>
</ul>

<h2>五、技术路面训练方法</h2>
<p>技术只能在实践中提升。建议：每周加入一次专门的技术路面训练，速度可慢，但要专注于落脚选择和身体控制。随身携带摄像头记录，事后复盘分析。</p>
    `,
  },
  {
    slug: 'mandatory-gear',
    category: 'race',
    categoryLabel: '赛事指南',
    title: '强制装备检查：一件都不能少',
    excerpt: '赛前装备检查（Gear Check）失败意味着 DNF。这份清单让你滴水不漏，顺利通过检查。',
    readTime: '7 分钟',
    content: `
<h2>什么是强制装备</h2>
<p>强制装备（Mandatory Equipment）是组委会规定每位参赛者必须携带的安全装备。未通过检查将被取消参赛资格（DNF），甚至被处以时间惩罚。</p>

<h2>国际越野跑通用强制装备清单</h2>

<h3>导航与通讯</h3>
<ul>
  <li>GPS 手表或手持 GPS（含赛道 GPX 文件）</li>
  <li>充满电的手机（通常需能打出紧急电话）</li>
  <li>赛事提供的紧急联络卡</li>
</ul>

<h3>照明</h3>
<ul>
  <li>头灯（亮度通常要求 ≥ 200 流明）</li>
  <li>备用电池或充电宝</li>
</ul>

<h3>保暖与防护</h3>
<ul>
  <li>防风防雨外套（有缝合接缝和帽子）</li>
  <li>保温层（抓绒或轻羽绒）</li>
  <li>急救毯（Survival Blanket）</li>
  <li>手套</li>
  <li>帽子或头套（Buff）</li>
</ul>

<h3>医疗急救</h3>
<ul>
  <li>弹性绷带（至少 100cm）</li>
  <li>碘伏棉球或消毒湿巾</li>
  <li>创可贴</li>
</ul>

<h3>补给与容量</h3>
<ul>
  <li>背包（容量通常要求 ≥ 8L）</li>
  <li>饮水容量（通常要求携带 ≥ 1L 饮水）</li>
  <li>能量食物（通常要求 ≥ 200kcal 的备用食物）</li>
</ul>

<h2>装备检查注意事项</h2>
<ul>
  <li><strong>提前一天检查</strong>：不要在比赛当天才发现缺少装备</li>
  <li><strong>装备要真实可用</strong>：不少选手带了电量耗尽的头灯被当场扣分</li>
  <li><strong>关注赛事特殊要求</strong>：高海拔赛事可能额外要求氧气袋、高山靴等</li>
  <li><strong>打印装备清单</strong>：逐条打勾，不靠记忆</li>
</ul>

<h2>中国主要赛事特殊要求</h2>
<p>UTMB China 系列赛、越野中国、TNF 100 等赛事在国际标准基础上，通常还要求：备用食物增至 500kcal、携带哨子、以及赛事专属号码布。每年要求可能有变化，<strong>务必以当年官方赛事手册为准</strong>。</p>
    `,
  },
  {
    slug: 'nutrition-strategy',
    category: 'race',
    categoryLabel: '赛事指南',
    title: '补给策略：用吃赢得比赛',
    excerpt: '越野赛中"吃"是第四项运动。掌握补水、能量补充和肠胃管理，让你的身体持续发动。',
    readTime: '11 分钟',
    content: `
<h2>越野跑补给的特殊性</h2>
<p>越野跑的能量消耗远比公路跑复杂：坡度变化导致代谢率波动、高海拔影响消化吸收、时间跨度长达数十小时。一个好的补给策略可以让你超越许多体能更好的对手。</p>

<h2>一、能量计算基础</h2>
<p>越野跑的能量消耗约为：<strong>每公里 80-120kcal × 你的体重（kg）/ 70</strong>。一场 50km 赛事约消耗 3500-5000kcal。但人体消化系统在运动时只能吸收约 60-90g 碳水/小时，即约 250-350kcal/小时。</p>

<h2>二、补能时机与频率</h2>
<ul>
  <li><strong>每 30-45 分钟补一次能量</strong>：不要等到饿了才吃</li>
  <li><strong>每小时喝 400-700ml 液体</strong>：根据气温和出汗量调整</li>
  <li><strong>固体食物优先在上坡食用</strong>：速度慢时消化系统更容易接受</li>
  <li><strong>液体补充在平路和下坡</strong>：不影响呼吸节奏</li>
</ul>

<h2>三、补给站策略</h2>
<p>每个补给站都是战略节点：</p>
<ul>
  <li><strong>进站前 2km</strong>：开始评估自己的能量和水分状态</li>
  <li><strong>进站后</strong>：先补水，再补食，最后检查装备</li>
  <li><strong>不要在站内停留超过 5 分钟</strong>（除非需要更换装备）</li>
  <li><strong>带走足够到下一站的补给</strong>，并留有 20% 余量</li>
</ul>

<h2>四、推荐补给食物</h2>
<h3>能量胶（每包约 100kcal）</h3>
<p>快速吸收，适合高强度段。搭配 200ml 水服用，防止肠胃不适。</p>
<h3>能量棒</h3>
<p>固体食物，更有饱腹感。适合低强度段和补给站食用。</p>
<h3>真实食物</h3>
<p>100km 以上赛事一定要加入：香蕉、煮土豆、米饭、盐腌梅子。肠胃更容易接受，还能提振心情。</p>
<h3>电解质</h3>
<p>每 1-2 小时补充一次电解质，防止低钠血症（运动性低钠是越野赛最危险的医疗状况之一）。</p>

<h2>五、肠胃危机处理</h2>
<p>恶心、呕吐、腹泻是越野赛的常见"杀手"：</p>
<ul>
  <li>出现恶心：停止摄入固体食物，改为少量液体补给</li>
  <li>腹胀：降低速度，腹式呼吸，喝生姜茶（部分补给站提供）</li>
  <li>严重呕吐无法补水：主动退出比赛，这是明智的选择</li>
</ul>
    `,
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getArticlesByCategory(category: Category): Article[] {
  return articles.filter((a) => a.category === category)
}
