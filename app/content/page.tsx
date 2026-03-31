import Link from 'next/link'
import { BookOpen, Clock, ChevronRight } from 'lucide-react'
import { articles, categoryInfo, type Category } from '@/data/articles'

const categories: Category[] = ['beginner', 'advanced', 'race']

const categoryAccent: Record<Category, { text: string; border: string; bg: string; dot: string; hoverBorder: string }> = {
  beginner: {
    text: 'text-[#4ade80]',
    border: 'border-[#4ade80]/25',
    bg: 'bg-[#4ade80]/8',
    dot: 'bg-[#4ade80]',
    hoverBorder: 'hover:border-[#4ade80]/20',
  },
  advanced: {
    text: 'text-[#fb923c]',
    border: 'border-[#fb923c]/25',
    bg: 'bg-[#fb923c]/8',
    dot: 'bg-[#fb923c]',
    hoverBorder: 'hover:border-[#fb923c]/20',
  },
  race: {
    text: 'text-yellow-400',
    border: 'border-yellow-400/25',
    bg: 'bg-yellow-400/8',
    dot: 'bg-yellow-400',
    hoverBorder: 'hover:border-yellow-400/20',
  },
}

export default function ContentPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="mb-14">
        <span className="section-eyebrow mb-4 inline-flex">
          <BookOpen size={11} />
          内容中心
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-[#f0ece4] tracking-tight mt-4 mb-3">
          专业指引，<span className="text-gradient-green">每一步</span>
        </h1>
        <p className="text-[#7a9b83] text-lg font-light">从零基础到赛事冠军，系统化的越野跑学习路径</p>
      </div>

      {/* Category sections */}
      <div className="flex flex-col gap-16">
        {categories.map((cat) => {
          const info = categoryInfo[cat]
          const accent = categoryAccent[cat]
          const catArticles = articles.filter((a) => a.category === cat)

          return (
            <div key={cat}>
              {/* Category header */}
              <div className="flex items-center gap-4 mb-7">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${accent.dot}`} />
                <span className={`font-bold text-lg ${accent.text}`}>{info.label}</span>
                <span className="text-[#7a9b83] text-sm">{info.description}</span>
                <div className="flex-1 h-px bg-[#1e3820]" />
              </div>

              {/* Article cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {catArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/content/${article.slug}`}
                    className={`group bg-[#111d12] border border-[#1e3820] rounded-2xl overflow-hidden ${accent.hoverBorder} hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300`}
                  >
                    {/* Cover image */}
                    <div className="relative h-44 overflow-hidden bg-[#192b1a]">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111d12]/80 to-transparent" />
                      <span className={`absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${accent.text} ${accent.border} ${accent.bg}`}>
                        {article.categoryLabel}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className={`font-semibold mb-2 leading-snug text-[#f0ece4] group-hover:${accent.text} transition-colors duration-200 text-[0.95rem]`}>
                        {article.title}
                      </h3>
                      <p className="text-[#7a9b83] text-sm line-clamp-2 leading-relaxed mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-[#2e3d2f]">
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} /> {article.readTime}
                        </span>
                        <ChevronRight
                          size={13}
                          className={`opacity-0 group-hover:opacity-100 transition-opacity ${accent.text}`}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
