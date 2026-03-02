export type ProductCategory = '跑鞋' | '水袋包' | '头灯'

export interface Product {
  id: string
  category: ProductCategory
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  color: string
  description: string
  features: string[]
  specs: Record<string, string>
}

export const products: Product[] = [
  {
    id: 'salomon-speedcross-6',
    category: '跑鞋',
    name: 'Speedcross 6',
    brand: 'Salomon',
    price: 1290,
    originalPrice: 1490,
    rating: 4.8,
    reviewCount: 342,
    image: '🟢',
    color: 'from-green-900 to-green-700',
    description: '越野跑鞋的传奇之作。深度 4.5mm 双密度鞋钉，泥地抓地力无可匹敌。Quicklace 系统让你在补给站秒速系鞋，专为竞技越野赛设计。',
    features: [
      '4.5mm 双密度鞋钉大底',
      'Quicklace™ 快系鞋带系统',
      'Endofit™ 内靴结构提供包裹感',
      '岩板保护（Rock Protection）',
      '重量：310g（男款 US9）',
    ],
    specs: {
      '鞋底落差': '10mm',
      '适用路面': '泥地、湿滑碎石',
      '宽度': '标准楦',
      '防水版本': '可选 GTX',
    },
  },
  {
    id: 'hoka-speedgoat-5',
    category: '跑鞋',
    name: 'Speedgoat 5',
    brand: 'HOKA',
    price: 1380,
    rating: 4.7,
    reviewCount: 285,
    image: '🔵',
    color: 'from-blue-900 to-blue-700',
    description: '由越野传奇 Karl Meltzer 联合开发。超厚中底提供卓越缓震，Vibram® Megagrip 大底适应多变地形，长距离赛事的最佳拍档。',
    features: [
      'Vibram® Megagrip 大底',
      '超厚 CMEVA 泡棉中底',
      '轻量网布鞋面',
      '足跟牵引系统',
      '重量：298g（男款 US9）',
    ],
    specs: {
      '鞋底落差': '4mm',
      '适用路面': '综合越野',
      '宽度': '宽楦',
      '防水版本': '可选 GTX',
    },
  },
  {
    id: 'altra-lone-peak-7',
    category: '跑鞋',
    name: 'Lone Peak 7',
    brand: 'Altra',
    price: 1150,
    originalPrice: 1280,
    rating: 4.6,
    reviewCount: 198,
    image: '🟠',
    color: 'from-orange-900 to-orange-700',
    description: '零落差设计让脚趾自然展开，Foot Shape™ 宽楦头完美贴合脚型。长途超马的首选，让你的脚在 100 英里后依然舒适。',
    features: [
      '零落差（0mm drop）设计',
      'Foot Shape™ 宽楦头',
      'MaxTrac™ 大底',
      'Stone Guard 岩板',
      '重量：284g（男款 US9）',
    ],
    specs: {
      '鞋底落差': '0mm',
      '适用路面': '综合越野、长距离',
      '宽度': '宽楦',
      '防水版本': '可选 Waterproof',
    },
  },
  {
    id: 'salomon-adv-skin-12',
    category: '水袋包',
    name: 'ADV Skin 12',
    brand: 'Salomon',
    price: 1680,
    rating: 4.9,
    reviewCount: 421,
    image: '🎒',
    color: 'from-trail-card to-trail-card2',
    description: '越野跑背包的标杆。贴身剪裁几乎感觉不到重量，12L 主仓 + 2 个 500ml 软水瓶，满足大多数越野赛的强制装备要求。',
    features: [
      '12L 总容量',
      '附 2x 500ml 软水瓶',
      '前胸口袋快取设计',
      'Sensifit™ 人体工学剪裁',
      '重量：198g（不含水）',
    ],
    specs: {
      '总容量': '12L',
      '主仓': '7L',
      '水袋兼容': '1.5L / 2L',
      '胸围范围': '82-115cm',
    },
  },
  {
    id: 'osprey-duro-6',
    category: '水袋包',
    name: 'Duro 6',
    brand: 'Osprey',
    price: 980,
    originalPrice: 1150,
    rating: 4.5,
    reviewCount: 163,
    image: '🟤',
    color: 'from-amber-900 to-amber-700',
    description: '轻量入门级越野背包。6L 容量适合短距离越野和日常训练，Osprey 的 All Mighty Guarantee 终身保修让你买得放心。',
    features: [
      '6L 总容量',
      '附 1.5L 水袋',
      '轻量网眼背板',
      '侧面水瓶袋',
      '重量：228g（不含水袋）',
    ],
    specs: {
      '总容量': '6L',
      '水袋': '附赠 1.5L',
      '胸围范围': '76-107cm',
      '保修': '终身保修',
    },
  },
  {
    id: 'petzl-nao-rl',
    category: '头灯',
    name: 'NAO RL',
    brand: 'Petzl',
    price: 1280,
    rating: 4.8,
    reviewCount: 209,
    image: '💡',
    color: 'from-yellow-900 to-yellow-700',
    description: '顶级越野跑头灯。1500 流明最大亮度，REACTIVE LIGHTING™ 技术自动调节亮度适应环境，续航可达 7 小时。充电宝可直连充电。',
    features: [
      '最大亮度 1500 流明',
      'REACTIVE LIGHTING™ 自动调节',
      '续航 7 小时（高亮模式 2h）',
      'USB-C 快速充电',
      '重量：100g（含电池）',
    ],
    specs: {
      '最大亮度': '1500 lm',
      '最大续航': '7 小时',
      '防水等级': 'IPX4',
      '充电接口': 'USB-C',
    },
  },
  {
    id: 'silva-trail-speed-5r',
    category: '头灯',
    name: 'Trail Speed 5R',
    brand: 'Silva',
    price: 780,
    originalPrice: 920,
    rating: 4.6,
    reviewCount: 127,
    image: '🔦',
    color: 'from-gray-800 to-gray-600',
    description: '性价比之王。500 流明足以应对大多数越野赛要求，可充电锂电池组，轻量设计不会在长距离赛事中产生颈部压力。',
    features: [
      '最大亮度 500 流明',
      '可充电锂电池',
      '红光模式（保护夜视）',
      '单手操作按键',
      '重量：70g（含电池）',
    ],
    specs: {
      '最大亮度': '500 lm',
      '最大续航': '70 小时（弱光）',
      '防水等级': 'IPX4',
      '充电接口': 'Micro-USB',
    },
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export const productCategories: ProductCategory[] = ['跑鞋', '水袋包', '头灯']
