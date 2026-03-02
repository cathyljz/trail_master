'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Star, Filter } from 'lucide-react'
import { products, productCategories, type ProductCategory } from '@/data/products'

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all')

  const filtered =
    activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <ShoppingBag className="text-yellow-400" size={28} />
          <h1 className="text-4xl font-black text-[#e8e4dc]">装备商城</h1>
        </div>
        <p className="text-[#8fa898]">专业越野跑装备，每一件都经过真实赛事验证</p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <Filter size={16} className="text-[#8fa898]" />
        {(['all', ...productCategories] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-[#5c9e6e] text-[#0d1a0e]'
                : 'border border-[#2d4a30] text-[#8fa898] hover:text-[#e8e4dc] hover:bg-[#1e3022]'
            }`}
          >
            {cat === 'all' ? '全部' : cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/store/${product.id}`}
            className="group bg-[#162418] border border-[#2d4a30] rounded-2xl overflow-hidden hover:border-[#5c9e6e]/40 hover:-translate-y-1 transition-all duration-200"
          >
            {/* Product image */}
            <div className={`bg-gradient-to-br ${product.color} h-44 flex items-center justify-center text-7xl`}>
              {product.image}
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-[#8fa898] text-xs">{product.brand}</p>
                  <h3 className="text-[#e8e4dc] font-bold group-hover:text-[#7dba8e] transition-colors">
                    {product.name}
                  </h3>
                </div>
                <span className="text-xs border border-[#2d4a30] text-[#8fa898] rounded-full px-2 py-0.5">
                  {product.category}
                </span>
              </div>

              <p className="text-[#8fa898] text-sm line-clamp-2 mt-2 mb-3">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-[#3d4a3e]'}
                    />
                  ))}
                </div>
                <span className="text-[#8fa898] text-xs">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-[#d4622a] font-bold text-lg">¥{product.price}</span>
                {product.originalPrice && (
                  <span className="text-[#3d4a3e] line-through text-sm">¥{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="text-xs bg-[#d4622a]/15 text-[#d4622a] px-1.5 py-0.5 rounded">
                    省 ¥{product.originalPrice - product.price}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
