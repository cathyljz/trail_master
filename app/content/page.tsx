import Link from 'next/link'
import { BookOpen, Clock, ChevronRight } from 'lucide-react'
import { articles, categoryInfo, type Category } from '@/data/articles'

const categories: Category[] = ['beginner', 'advanced', 'race']

const categoryAccent: Record<Category, { text: string; border: string; bg: string; dot: string }> = {
  beginner: {
    text: 'text-[#4ade80]',
    border: 'border-[#4ade80]/30',
    bg: 'bg-[#4ade80]/8',
    dot: 'bg-[#4ade80]',
  },
  advanced: {
    text: 'text-[#fb923c]',
    border: 'border-[#fb923c]/30',
    bg: 'bg-[#fb923c]/8',
    dot: 'bg-[#fb923c]',
  },
  race: {
    text: 'text-yellow-400',
    border: 'border-yellow-400/30',
    bg: 'bg-yellow-400/8',
    dot: 'bg-yellow-400',
  },
}

export default function ContentPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="text-[#4ade80]" size={28} />
          <h1 className="text-4xl font-black text-[#e8e4dc]">内容中心</h1>
        </div>
        <p className="text-[#8fa898] text-lg">从零基础到赛事冠军，每一步都有专业指引</p>
      </div>

      {/* Category sections */}
      <div className="flex flex-col gap-14">
        {categories.map((cat) => {
          const info = categoryInfo[cat]
          const accent = categoryAccent[cat]
          const catArticles = articles.filter((a) => a.category === cat)

          return (
            <div key={cat}>
              {/* Category header */}
              <div className={`flex items-center gap-4 mb-6 pb-4 border-b ${accent.border}`}>
                <div className={`w-2.5 h-2.5 rounded-full ${accent.dot}`} />
                <span className={`font-black text-xl ${accent.text}`}>{info.label}</span>
                <span className="text-[#8fa898] text-sm">{info.description}</span>
              </div>

              {/* Article cards with images */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {catArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/content/${article.slug}`}
                    className="group bg-[#162418] border border-[#2d4a30] rounded-2xl overflow-hidden hover:border-[#4ade80]/20 hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Cover image */}
                    <div className="relative h-44 overflow-hidden bg-[#1e3022]">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#162418]/70 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3
                        className={`font-bold mb-2 leading-snug text-[#e8e4dc] group-hover:${accent.text} transition-colors`}
                      >
                        {article.title}
                      </h3>
                      <p className="text-[#8fa898] text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-[#3d4a3e]">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {article.readTime}
                        </span>
                        <ChevronRight
                          size={14}
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
