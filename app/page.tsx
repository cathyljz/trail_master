import Link from 'next/link'
import { BookOpen, Users, ShoppingBag, ChevronRight, Mountain, ArrowDown } from 'lucide-react'
import { articles } from '@/data/articles'
import { products } from '@/data/products'

export default function HomePage() {
  const featuredArticles = articles.slice(0, 3)
  const featuredProducts = products.slice(0, 3)

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative min-h-[95vh] flex flex-col justify-end"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1920&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
        }}
      >
        {/* Multi-layer gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091409] via-[#091409]/60 to-[#091409]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#091409]/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#091409]/30" />

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 pb-32 pt-40 w-full">
          {/* Eyebrow badge */}
          <div className="animate-fade-up animate-delay-100 inline-flex items-center gap-2 mb-8">
            <span className="section-eyebrow">
              <Mountain size={11} />
              征服每一座山
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up animate-delay-200 font-black tracking-tighter leading-[0.88] mb-8">
            <span className="block text-[clamp(4rem,10vw,8rem)] text-[#f0ece4] drop-shadow-2xl">越野</span>
            <span className="block text-[clamp(4rem,10vw,8rem)] text-gradient-green drop-shadow-2xl">巅峰</span>
          </h1>

          {/* Divider */}
          <div className="animate-fade-up animate-delay-200 w-12 h-0.5 bg-gradient-to-r from-[#4ade80] to-transparent mb-6" />

          <p className="animate-fade-up animate-delay-300 text-[#f0ece4]/60 text-lg sm:text-xl max-w-md mb-10 leading-relaxed font-light">
            为越野跑爱好者打造的专业平台——装备、赛事、约跑，一站搞定。
          </p>

          {/* CTA buttons */}
          <div className="animate-fade-up animate-delay-300 flex flex-wrap gap-3 mb-20">
            <Link
              href="/content"
              className="group inline-flex items-center gap-2 bg-[#4ade80] hover:bg-[#86efac] text-[#091409] font-bold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] text-sm"
            >
              开始探索
              <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/14 backdrop-blur border border-white/15 hover:border-white/25 text-[#f0ece4] font-medium px-7 py-3.5 rounded-xl transition-all duration-200 text-sm"
            >
              约跑组队
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up animate-delay-400 flex gap-8 sm:gap-12">
            {[
              { value: '1,200+', label: '注册跑友' },
              { value: '6 篇', label: '专业文章' },
              { value: '8 场', label: '即将开赛' },
            ].map(({ value, label }, i) => (
              <div key={label} className={`${i > 0 ? 'border-l border-white/10 pl-8 sm:pl-12' : ''}`}>
                <p className="text-2xl sm:text-3xl font-black text-[#f0ece4] tabular-nums">{value}</p>
                <p className="text-[#f0ece4]/40 text-xs mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 scroll-indicator">
          <span className="text-white/30 text-[10px] uppercase tracking-widest">scroll</span>
          <ArrowDown size={14} className="text-white/30" />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#091409] to-transparent" />
      </section>

      {/* ── Section Cards ── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="section-eyebrow">平台功能</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              href: '/content',
              icon: BookOpen,
              label: '内容中心',
              desc: '新手 101 · 进阶之路 · 赛事指南',
              accent: '#4ade80',
              accentBg: 'rgba(74,222,128,0.08)',
              hoverBorder: 'hover:border-[#4ade80]/25',
            },
            {
              href: '/community',
              icon: Users,
              label: '约跑 · 赛事',
              desc: '发起约跑 · 组队出发 · 赛事报名',
              accent: '#fb923c',
              accentBg: 'rgba(251,146,60,0.08)',
              hoverBorder: 'hover:border-[#fb923c]/25',
            },
            {
              href: '/store',
              icon: ShoppingBag,
              label: '装备商城',
              desc: '跑鞋 · 水袋包 · 头灯',
              accent: '#facc15',
              accentBg: 'rgba(250,204,21,0.08)',
              hoverBorder: 'hover:border-yellow-400/25',
            },
          ].map(({ href, icon: Icon, label, desc, accent, accentBg, hoverBorder }) => (
            <Link
              key={href}
              href={href}
              className={`group relative bg-[#111d12] border border-[#1e3820] rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${hoverBorder} overflow-hidden`}
            >
              {/* Subtle background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left, ${accentBg} 0%, transparent 60%)` }}
              />

              <div
                className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: accentBg, border: `1px solid ${accent}22` }}
              >
                <Icon size={22} style={{ color: accent }} />
              </div>
              <h3 className="relative text-[#f0ece4] font-bold text-lg mb-2">{label}</h3>
              <p className="relative text-[#7a9b83] text-sm leading-relaxed">{desc}</p>
              <div className="relative flex items-center gap-1 mt-6" style={{ color: accent }}>
                <span className="text-xs font-semibold">查看更多</span>
                <ChevronRight size={13} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Articles ── */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col gap-2">
            <span className="section-eyebrow">
              <BookOpen size={11} />
              精选内容
            </span>
            <h2 className="text-[#f0ece4] text-2xl font-bold mt-1">精选文章</h2>
          </div>
          <Link href="/content" className="flex items-center gap-1 text-[#4ade80] text-sm hover:text-[#86efac] transition-colors group">
            全部文章
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/content/${article.slug}`}
              className="group bg-[#111d12] border border-[#1e3820] rounded-2xl overflow-hidden hover:border-[#4ade80]/20 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-[#192b1a]">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111d12] via-[#111d12]/30 to-transparent" />
                <span
                  className={`absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    article.category === 'beginner'
                      ? 'text-[#4ade80] border-[#4ade80]/40 bg-[#4ade80]/12'
                      : article.category === 'advanced'
                      ? 'text-[#fb923c] border-[#fb923c]/40 bg-[#fb923c]/12'
                      : 'text-yellow-400 border-yellow-400/40 bg-yellow-400/12'
                  } uppercase tracking-wider`}
                >
                  {article.categoryLabel}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-[#f0ece4] font-semibold mb-2 group-hover:text-[#4ade80] transition-colors duration-200 leading-snug text-[0.95rem]">
                  {article.title}
                </h3>
                <p className="text-[#7a9b83] text-sm line-clamp-2 leading-relaxed">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-[#2e3d2f] text-xs">{article.readTime} 阅读</p>
                  <ChevronRight size={13} className="text-[#4ade80] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="max-w-6xl mx-auto px-4 pb-28">
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col gap-2">
            <span className="section-eyebrow">
              <ShoppingBag size={11} />
              装备推荐
            </span>
            <h2 className="text-[#f0ece4] text-2xl font-bold mt-1">精选装备</h2>
          </div>
          <Link href="/store" className="flex items-center gap-1 text-[#4ade80] text-sm hover:text-[#86efac] transition-colors group">
            查看全部
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/store/${product.id}`}
              className="group bg-[#111d12] border border-[#1e3820] rounded-2xl overflow-hidden hover:border-yellow-400/20 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300"
            >
              <div className={`relative bg-gradient-to-br ${product.color} h-44 flex items-center justify-center overflow-hidden`}>
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{product.image}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-[#7a9b83] text-xs uppercase tracking-wider font-medium">{product.brand}</p>
                <h3 className="text-[#f0ece4] font-semibold mt-1 mb-3 group-hover:text-[#4ade80] transition-colors duration-200">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#fb923c] font-bold text-lg">¥{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-[#2e3d2f] line-through text-sm">¥{product.originalPrice}</span>
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
