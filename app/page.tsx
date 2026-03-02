import Link from 'next/link'
import { BookOpen, Users, ShoppingBag, ChevronRight, Mountain, Zap, Trophy } from 'lucide-react'
import { articles } from '@/data/articles'
import { products } from '@/data/products'

export default function HomePage() {
  const featuredArticles = articles.slice(0, 3)
  const featuredProducts = products.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 50%, #5c9e6e 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #d4622a 0%, transparent 50%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1e3022] border border-[#2d4a30] rounded-full px-4 py-1.5 text-sm text-[#7dba8e] mb-6">
            <Mountain size={14} />
            征服每一座山
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6">
            <span className="text-[#e8e4dc]">越野</span>
            <span className="text-[#5c9e6e]">巅峰</span>
          </h1>
          <p className="text-xl text-[#8fa898] max-w-2xl mx-auto mb-10 leading-relaxed">
            为越野跑爱好者打造的专业平台。从新手装备到赛事攻略，从社区交流到精品装备，一站搞定。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/content"
              className="bg-[#5c9e6e] hover:bg-[#7dba8e] text-[#0d1a0e] font-bold px-8 py-3 rounded-xl transition-colors"
            >
              开始探索
            </Link>
            <Link
              href="/community"
              className="border border-[#2d4a30] hover:bg-[#1e3022] text-[#e8e4dc] px-8 py-3 rounded-xl transition-colors"
            >
              加入社区
            </Link>
          </div>
        </div>
      </section>

      {/* Section cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              href: '/content',
              icon: BookOpen,
              label: '内容中心',
              desc: '新手 101 · 进阶之路 · 赛事指南',
              color: 'text-[#5c9e6e]',
            },
            {
              href: '/community',
              icon: Users,
              label: '互动社区',
              desc: '发帖 · 回复 · 点赞 · 交流',
              color: 'text-[#d4622a]',
            },
            {
              href: '/store',
              icon: ShoppingBag,
              label: '装备商城',
              desc: '跑鞋 · 水袋包 · 头灯',
              color: 'text-yellow-400',
            },
          ].map(({ href, icon: Icon, label, desc, color }) => (
            <Link
              key={href}
              href={href}
              className="group bg-[#162418] border border-[#2d4a30] rounded-2xl p-6 hover:bg-[#1e3022] transition-all duration-200 hover:border-[#5c9e6e]/40 hover:-translate-y-1"
            >
              <Icon className={`${color} mb-4`} size={32} />
              <h3 className="text-[#e8e4dc] font-bold text-lg mb-1">{label}</h3>
              <p className="text-[#8fa898] text-sm">{desc}</p>
              <ChevronRight
                className={`${color} mt-4 opacity-0 group-hover:opacity-100 transition-opacity`}
                size={18}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Zap className="text-[#d4622a]" size={22} />
            <h2 className="text-[#e8e4dc] text-2xl font-bold">精选文章</h2>
          </div>
          <Link href="/content" className="text-[#5c9e6e] text-sm hover:underline flex items-center gap-1">
            全部文章 <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/content/${article.slug}`}
              className="group bg-[#162418] border border-[#2d4a30] rounded-xl p-5 hover:bg-[#1e3022] hover:border-[#5c9e6e]/40 transition-all"
            >
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border mb-3 inline-block ${
                  article.category === 'beginner'
                    ? 'text-[#5c9e6e] border-[#5c9e6e]/40 bg-[#5c9e6e]/10'
                    : article.category === 'advanced'
                    ? 'text-[#d4622a] border-[#d4622a]/40 bg-[#d4622a]/10'
                    : 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10'
                }`}
              >
                {article.categoryLabel}
              </span>
              <h3 className="text-[#e8e4dc] font-semibold mb-2 group-hover:text-[#7dba8e] transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-[#8fa898] text-sm line-clamp-2">{article.excerpt}</p>
              <p className="text-[#3d4a3e] text-xs mt-3">{article.readTime} 阅读</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Trophy className="text-yellow-400" size={22} />
            <h2 className="text-[#e8e4dc] text-2xl font-bold">推荐装备</h2>
          </div>
          <Link href="/store" className="text-[#5c9e6e] text-sm hover:underline flex items-center gap-1">
            查看全部 <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/store/${product.id}`}
              className="group bg-[#162418] border border-[#2d4a30] rounded-xl overflow-hidden hover:border-[#5c9e6e]/40 transition-all hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-br ${product.color} h-40 flex items-center justify-center text-6xl`}>
                {product.image}
              </div>
              <div className="p-4">
                <p className="text-[#8fa898] text-xs">{product.brand}</p>
                <h3 className="text-[#e8e4dc] font-semibold mt-0.5 group-hover:text-[#7dba8e] transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[#d4622a] font-bold">¥{product.price}</span>
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
