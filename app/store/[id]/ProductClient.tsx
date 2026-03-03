'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, ShoppingCart, Check, ChevronRight } from 'lucide-react'
import { products, type Product } from '@/data/products'

interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  qty: number
}

function addToCart(product: Product) {
  const cart: CartItem[] = JSON.parse(localStorage.getItem('trail-cart') || '[]')
  const existing = cart.find((item) => item.id === product.id)
  if (existing) {
    existing.qty += 1
  } else {
    cart.push({ id: product.id, name: product.name, brand: product.brand, price: product.price, qty: 1 })
  }
  localStorage.setItem('trail-cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
}

export default function ProductClient({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link
        href="/store"
        className="inline-flex items-center gap-2 text-[#8fa898] hover:text-[#e8e4dc] text-sm mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> 返回商城
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className={`bg-gradient-to-br ${product.color} rounded-2xl aspect-square flex items-center justify-center text-9xl`}>
          {product.image}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs border border-[#2d4a30] text-[#8fa898] rounded-full px-2.5 py-0.5">
              {product.category}
            </span>
            <span className="text-[#8fa898] text-sm">{product.brand}</span>
          </div>
          <h1 className="text-3xl font-black text-[#e8e4dc] mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-[#3d4a3e]'} />
              ))}
            </div>
            <span className="text-[#8fa898] text-sm">{product.rating} · {product.reviewCount} 条评价</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl font-black text-[#d4622a]">¥{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-[#3d4a3e] line-through text-lg">¥{product.originalPrice}</span>
                <span className="bg-[#d4622a]/15 text-[#d4622a] text-sm px-2 py-0.5 rounded-full font-medium">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="text-[#c8c4bc] leading-relaxed mb-6">{product.description}</p>

          <div className="bg-[#162418] border border-[#2d4a30] rounded-xl p-4 mb-4">
            <p className="text-[#e8e4dc] font-semibold text-sm mb-3">产品亮点</p>
            <ul className="flex flex-col gap-2">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#c8c4bc]">
                  <Check size={14} className="text-[#5c9e6e] flex-shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#162418] border border-[#2d4a30] rounded-xl p-4 mb-6">
            <p className="text-[#e8e4dc] font-semibold text-sm mb-3">规格参数</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key}>
                  <p className="text-[#8fa898] text-xs">{key}</p>
                  <p className="text-[#e8e4dc] text-sm font-medium">{val}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base transition-all ${
              added ? 'bg-[#2d4a30] text-[#5c9e6e]' : 'bg-[#5c9e6e] hover:bg-[#7dba8e] text-[#0d1a0e]'
            }`}
          >
            {added ? <><Check size={20} /> 已加入购物车</> : <><ShoppingCart size={20} /> 加入购物车</>}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#e8e4dc] font-bold text-xl">同类装备</h2>
            <Link href="/store" className="text-[#5c9e6e] text-sm flex items-center gap-1 hover:underline">
              查看全部 <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link key={p.id} href={`/store/${p.id}`} className="group bg-[#162418] border border-[#2d4a30] rounded-xl overflow-hidden hover:border-[#5c9e6e]/40 hover:-translate-y-1 transition-all">
                <div className={`bg-gradient-to-br ${p.color} h-32 flex items-center justify-center text-5xl`}>{p.image}</div>
                <div className="p-4">
                  <p className="text-[#8fa898] text-xs">{p.brand}</p>
                  <p className="text-[#e8e4dc] font-semibold text-sm group-hover:text-[#7dba8e] transition-colors">{p.name}</p>
                  <p className="text-[#d4622a] font-bold mt-1">¥{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
