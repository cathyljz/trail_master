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
      <body className={`${geist.variable} antialiased bg-[#0d1a0e] text-[#e8e4dc] min-h-screen`}>
        <Navigation />
        <main>{children}</main>
        <footer className="border-t border-[#2d4a30] mt-20 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-8 mb-10">
              <div>
                <p className="text-[#e8e4dc] font-bold mb-3">越野巅峰</p>
                <p className="text-[#8fa898] text-sm leading-relaxed">
                  为越野跑爱好者打造的专业平台，内容、社区、装备一站搞定。
                </p>
              </div>
              <div>
                <p className="text-[#8fa898] font-semibold text-xs uppercase tracking-wider mb-3">快速导航</p>
                <div className="flex flex-col gap-2 text-sm text-[#8fa898]">
                  <a href="/content" className="hover:text-[#4ade80] transition-colors">内容中心</a>
                  <a href="/community" className="hover:text-[#4ade80] transition-colors">约跑·赛事</a>
                  <a href="/store" className="hover:text-[#4ade80] transition-colors">装备商城</a>
                </div>
              </div>
              <div>
                <p className="text-[#8fa898] font-semibold text-xs uppercase tracking-wider mb-3">推荐资源</p>
                <div className="flex flex-col gap-2 text-sm text-[#8fa898]">
                  <a href="https://www.etji.cn" target="_blank" rel="noopener noreferrer" className="hover:text-[#4ade80] transition-colors">越野E族</a>
                  <a href="https://itra.run" target="_blank" rel="noopener noreferrer" className="hover:text-[#4ade80] transition-colors">ITRA 国际积分</a>
                  <a href="https://www.irunfar.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4ade80] transition-colors">iRunFar 装备评测</a>
                </div>
              </div>
            </div>
            <div className="border-t border-[#2d4a30] pt-6 text-center text-[#3d4a3e] text-xs">
              © 2026 越野巅峰 Trail Master · 征服每一座山
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
