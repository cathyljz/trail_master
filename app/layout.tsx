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
        <footer className="border-t border-[#2d4a30] mt-20 py-8 text-center text-[#8fa898] text-sm">
          <p>© 2026 越野巅峰 Trail Master · 征服每一座山</p>
        </footer>
      </body>
    </html>
  )
}
