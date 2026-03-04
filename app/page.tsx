import Link from 'next/link'
import { BookOpen, Users, ShoppingBag, ChevronRight, Mountain, Zap, Trophy, TrendingUp, Route } from 'lucide-react'
import { articles } from '@/data/articles'
import { products } from '@/data/products'

export default function HomePage() {
  const featuredArticles = articles.slice(0, 3)
  const featuredProducts = products.slice(0, 3)

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex flex-col justify-end"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1920&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundColor: '#0a1509',
        }}
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0e] via-[#0d1a0e]/55 to-[#0d1a0e]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a0e]/40 to-transparent" />

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 pb-28 pt-40 w-full">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-sm text-white/75 mb-7">
            <Mountain size={13} />
            征服每一座山
          </div>

          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
            <span className="text-white">越野</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #86efac 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              巅峰
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/65 max-w-lg mb-10 leading-relaxed">
            为越野跑爱好者打造的专业平台。从新手装备到赛事攻略，从约跑组队到精品装备，一站搞定。
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href="/content"
              className="bg-[#22c55e] hover:bg-[#4ade80] text-black font-bold px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              开始探索
            </Link>
            <Link
              href="/community"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              约跑组队
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10">
            {[
              { value: '1,200+', label: '注册跑友' },
              { value: '6 篇', label: '专业文章' },
              { value: '8 场', label: '即将开赛' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-white/45 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 64" fill="none" className="w-full block">
            <path
              d="M0,64 C240,28 480,64 720,42 C960,20 1200,54 1440,32 L1440,64 Z"
              fill="#0d1a0e"
            />
          </svg>
        </div>
      </section>

      {/* ── Section Cards ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              href: '/content',
              icon: BookOpen,
              label: '内容中心',
              desc: '新手 101 · 进阶之路 · 赛事指南',
              accent: '#4ade80',
              glow: 'hover:shadow-[0_0_40px_rgba(74,222,128,0.08)]',
              border: 'hover:border-[#4ade80]/30',
            },
            {
              href: '/community',
              icon: Users,
              label: '约跑 · 赛事',
              desc: '发起约跑 · 组队出发 · 赛事报名',
              accent: '#fb923c',
              glow: 'hover:shadow-[0_0_40px_rgba(251,146,60,0.08)]',
              border: 'hover:border-[#fb923c]/30',
            },
            {
              href: '/store',
              icon: ShoppingBag,
              label: '装备商城',
              desc: '跑鞋 · 水袋包 · 头灯',
              accent: '#facc15',
              glow: 'hover:shadow-[0_0_40px_rgba(250,204,21,0.08)]',
              border: 'hover:border-yellow-400/30',
            },
          ].map(({ href, icon: Icon, label, desc, accent, glow, border }) => (
            <Link
              key={href}
              href={href}
              className={`group bg-[#162418] border border-[#2d4a30] rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${glow} ${border}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${accent}18` }}
              >
                <Icon size={24} style={{ color: accent }} />
              </div>
              <h3 className="text-[#e8e4dc] font-bold text-xl mb-2">{label}</h3>
              <p className="text-[#8fa898] text-sm leading-relaxed">{desc}</p>
              <div className="flex items-center gap-1 mt-5" style={{ color: accent }}>
                <span className="text-xs font-semibold">查看更多</span>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Articles ── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Zap className="text-[#fb923c]" size={22} />
            <h2 className="text-[#e8e4dc] text-2xl font-bold">精选文章</h2>
          </div>
          <Link href="/content" className="text-[#4ade80] text-sm hover:underline flex items-center gap-1">
            全部文章 <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/content/${article.slug}`}
              className="group bg-[#162418] border border-[#2d4a30] rounded-2xl overflow-hidden hover:border-[#4ade80]/25 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Cover image */}
              <div className="relative h-44 overflow-hidden bg-[#1e3022]">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#162418]/80 to-transparent" />
                <span
                  className={`absolute bottom-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full border ${
                    article.category === 'beginner'
                      ? 'text-[#4ade80] border-[#4ade80]/40 bg-[#4ade80]/10'
                      : article.category === 'advanced'
                      ? 'text-[#fb923c] border-[#fb923c]/40 bg-[#fb923c]/10'
                      : 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10'
                  }`}
                >
                  {article.categoryLabel}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-[#e8e4dc] font-semibold mb-2 group-hover:text-[#4ade80] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-[#8fa898] text-sm line-clamp-2">{article.excerpt}</p>
                <p className="text-[#3d4a3e] text-xs mt-3">{article.readTime} 阅读</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Trophy className="text-yellow-400" size={22} />
            <h2 className="text-[#e8e4dc] text-2xl font-bold">推荐装备</h2>
          </div>
          <Link href="/store" className="text-[#4ade80] text-sm hover:underline flex items-center gap-1">
            查看全部 <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/store/${product.id}`}
              className="group bg-[#162418] border border-[#2d4a30] rounded-2xl overflow-hidden hover:border-yellow-400/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`bg-gradient-to-br ${product.color} h-40 flex items-center justify-center text-6xl`}
              >
                {product.image}
              </div>
              <div className="p-5">
                <p className="text-[#8fa898] text-xs">{product.brand}</p>
                <h3 className="text-[#e8e4dc] font-semibold mt-0.5 group-hover:text-[#4ade80] transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[#fb923c] font-bold">¥{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-[#3d4a3e] line-through text-sm">¥{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
