import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: '越野巅峰 | Trail Master',
  description: '越野跑爱好者的内容中心、社区与装备商城',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={`${geist.variable} antialiased bg-[#091409] text-[#f0ece4] min-h-screen`}>
        <Navigation />
        <main>{children}</main>

        <footer className="relative mt-24 border-t border-[#1e3820] overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/4 w-96 h-48 bg-[#4ade80]/3 blur-[80px] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-8">
            <div className="grid sm:grid-cols-3 gap-10 mb-12">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4ade80] to-[#16a34a] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#091409" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3L4 15h5l-1 6 8-10h-5l2-8z" />
                    </svg>
                  </div>
                  <span className="text-[#f0ece4] font-bold text-sm">越野巅峰</span>
                </div>
                <p className="text-[#7a9b83] text-sm leading-relaxed">
                  为越野跑爱好者打造的专业平台，内容、社区、装备一站搞定。
                </p>
              </div>

              <div>
                <p className="text-[#7a9b83] font-semibold text-[10px] uppercase tracking-[0.15em] mb-4">快速导航</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { href: '/content', label: '内容中心' },
                    { href: '/community', label: '约跑·赛事' },
                    { href: '/store', label: '装备商城' },
                    { href: '/about', label: '关于我' },
                  ].map(({ href, label }) => (
                    <a key={href} href={href} className="text-sm text-[#7a9b83] hover:text-[#4ade80] transition-colors duration-200">
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[#7a9b83] font-semibold text-[10px] uppercase tracking-[0.15em] mb-4">推荐资源</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { href: 'https://www.etji.cn', label: '越野E族' },
                    { href: 'https://itra.run', label: 'ITRA 国际积分' },
                    { href: 'https://www.irunfar.com', label: 'iRunFar 装备评测' },
                  ].map(({ href, label }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-[#7a9b83] hover:text-[#4ade80] transition-colors duration-200 flex items-center gap-1.5 group">
                      {label}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className="opacity-0 group-hover:opacity-60 transition-opacity">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[#1e3820] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[#2e3d2f] text-xs">© 2026 越野巅峰 Trail Master</p>
              <p className="text-[#2e3d2f] text-xs tracking-wide">征服每一座山</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
