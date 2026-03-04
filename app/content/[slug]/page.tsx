import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, BookOpen, Play, Globe, User, ExternalLink } from 'lucide-react'
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
      ? 'text-[#4ade80] border-[#4ade80]/40 bg-[#4ade80]/10'
      : article.category === 'advanced'
      ? 'text-[#fb923c] border-[#fb923c]/40 bg-[#fb923c]/10'
      : 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10'

  const resourceIcon = (type: string) => {
    if (type === 'video') return Play
    if (type === 'website') return Globe
    return User
  }

  const resourceAccent = (type: string) => {
    if (type === 'video') return 'text-red-400 bg-red-400/10'
    if (type === 'website') return 'text-[#4ade80] bg-[#4ade80]/10'
    return 'text-blue-400 bg-blue-400/10'
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/content"
        className="inline-flex items-center gap-2 text-[#8fa898] hover:text-[#e8e4dc] text-sm mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> 返回内容中心
      </Link>

      {/* Hero image */}
      <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 bg-[#1e3022]">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0e]/80 via-transparent to-transparent" />
      </div>

      {/* Meta */}
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

      {/* Article content */}
      <div className="border-t border-[#2d4a30] pt-8">
        <div className="prose-trail" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {/* Resources section */}
      {article.resources.length > 0 && (
        <section className="mt-16 pt-8 border-t border-[#2d4a30]">
          <div className="flex items-center gap-2 mb-6">
            <ExternalLink size={18} className="text-[#4ade80]" />
            <h2 className="text-[#e8e4dc] font-bold text-xl">拓展资源</h2>
            <span className="text-[#8fa898] text-sm">· 视频 · 网站 · 博主推荐</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {article.resources.map((resource, i) => {
              const Icon = resourceIcon(resource.type)
              return (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 bg-[#162418] border border-[#2d4a30] rounded-xl p-4 hover:bg-[#1e3022] hover:border-[#4ade80]/25 transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${resourceAccent(resource.type)}`}
                  >
                    <Icon size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#e8e4dc] font-semibold text-sm group-hover:text-[#4ade80] transition-colors leading-snug mb-0.5">
                      {resource.title}
                    </p>
                    <p className="text-[#3d4a3e] text-xs mb-1.5">{resource.platform}</p>
                    <p className="text-[#8fa898] text-xs line-clamp-2">{resource.description}</p>
                  </div>
                  <ExternalLink
                    size={13}
                    className="text-[#3d4a3e] group-hover:text-[#4ade80] flex-shrink-0 transition-colors mt-0.5"
                  />
                </a>
              )
            })}
          </div>
        </section>
      )}

      {/* Related articles */}
      <div className="mt-16 pt-8 border-t border-[#2d4a30]">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen size={18} className="text-[#4ade80]" />
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
                className="group bg-[#162418] border border-[#2d4a30] rounded-xl overflow-hidden hover:border-[#4ade80]/25 transition-all"
              >
                <div className="h-24 overflow-hidden bg-[#1e3022]">
                  <img
                    src={a.coverImage}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[#8fa898] text-xs mb-1">{a.categoryLabel}</p>
                  <h3 className="text-[#e8e4dc] text-sm font-semibold group-hover:text-[#4ade80] transition-colors leading-snug">
                    {a.title}
                  </h3>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
