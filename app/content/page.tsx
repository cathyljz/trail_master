import Link from 'next/link'
import { BookOpen, Clock, ChevronRight } from 'lucide-react'
import { articles, categoryInfo, type Category } from '@/data/articles'

const categories: Category[] = ['beginner', 'advanced', 'race']

export default function ContentPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="text-[#5c9e6e]" size={28} />
          <h1 className="text-4xl font-black text-[#e8e4dc]">内容中心</h1>
        </div>
        <p className="text-[#8fa898] text-lg">
          从零基础到赛事冠军，每一步都有专业指引
        </p>
      </div>

      {/* Category grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {categories.map((cat) => {
          const info = categoryInfo[cat]
          const catArticles = articles.filter((a) => a.category === cat)

          const headerColor =
            cat === 'beginner'
              ? 'border-[#5c9e6e]/60 bg-[#5c9e6e]/5'
              : cat === 'advanced'
              ? 'border-[#d4622a]/60 bg-[#d4622a]/5'
              : 'border-yellow-400/60 bg-yellow-400/5'

          const tagColor =
            cat === 'beginner'
              ? 'text-[#5c9e6e] border-[#5c9e6e]/40 bg-[#5c9e6e]/10'
              : cat === 'advanced'
              ? 'text-[#d4622a] border-[#d4622a]/40 bg-[#d4622a]/10'
              : 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10'

          const titleColor =
            cat === 'beginner'
              ? 'text-[#5c9e6e]'
              : cat === 'advanced'
              ? 'text-[#d4622a]'
              : 'text-yellow-400'

          return (
            <div key={cat} className="flex flex-col gap-4">
              {/* Category header */}
              <div className={`border rounded-xl p-5 ${headerColor}`}>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${tagColor}`}>
                  {info.label}
                </span>
                <p className="text-[#8fa898] text-sm mt-2">{info.description}</p>
              </div>

              {/* Articles */}
              {catArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/content/${article.slug}`}
                  className="group bg-[#162418] border border-[#2d4a30] rounded-xl p-5 hover:bg-[#1e3022] hover:border-[#5c9e6e]/30 transition-all"
                >
                  <h3
                    className={`font-semibold mb-2 ${titleColor} group-hover:brightness-110 transition-all leading-snug`}
                  >
                    {article.title}
                  </h3>
                  <p className="text-[#8fa898] text-sm line-clamp-2 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-[#3d4a3e]">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {article.readTime}
                    </span>
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[#5c9e6e]"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
