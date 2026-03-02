import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, BookOpen } from 'lucide-react'
import { articles, getArticleBySlug } from '@/data/articles'

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const tagColor =
    article.category === 'beginner'
      ? 'text-[#5c9e6e] border-[#5c9e6e]/40 bg-[#5c9e6e]/10'
      : article.category === 'advanced'
      ? 'text-[#d4622a] border-[#d4622a]/40 bg-[#d4622a]/10'
      : 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10'

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/content"
        className="inline-flex items-center gap-2 text-[#8fa898] hover:text-[#e8e4dc] text-sm mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> 返回内容中心
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tagColor}`}>
            {article.categoryLabel}
          </span>
          <span className="flex items-center gap-1.5 text-[#8fa898] text-xs">
            <Clock size={12} /> {article.readTime} 阅读
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#e8e4dc] leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-[#8fa898] text-lg leading-relaxed">{article.excerpt}</p>
      </div>

      <div className="border-t border-[#2d4a30] pt-8">
        <div
          className="prose-trail"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      {/* Related articles */}
      <div className="mt-16 pt-8 border-t border-[#2d4a30]">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen size={18} className="text-[#5c9e6e]" />
          <h2 className="text-[#e8e4dc] font-bold text-lg">更多文章</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {articles
            .filter((a) => a.slug !== slug)
            .slice(0, 2)
            .map((a) => (
              <Link
                key={a.slug}
                href={`/content/${a.slug}`}
                className="bg-[#162418] border border-[#2d4a30] rounded-xl p-4 hover:bg-[#1e3022] hover:border-[#5c9e6e]/30 transition-all group"
              >
                <p className="text-[#8fa898] text-xs mb-1">{a.categoryLabel}</p>
                <h3 className="text-[#e8e4dc] text-sm font-semibold group-hover:text-[#7dba8e] transition-colors leading-snug">
                  {a.title}
                </h3>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
