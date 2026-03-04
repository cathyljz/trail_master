import { Trophy, MapPin, Instagram, Twitter, Youtube, Medal, Mountain, Clock, TrendingUp } from 'lucide-react'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const medals = [
  { race: 'UTMB CCC 101km', year: '2024', result: '完赛 · 18:42:33', highlight: true },
  { race: '云南 · 苍山越野 50km', year: '2024', result: '年龄组第 3', highlight: false },
  { race: 'TNF 100 北京站', year: '2023', result: '完赛 · Top 15%', highlight: false },
  { race: '香港四径越野赛', year: '2023', result: '完赛 · 31h52min', highlight: true },
  { race: '崇礼 168 超级越野', year: '2022', result: '完赛 · 首次百英里', highlight: true },
  { race: '太行山越野 50km', year: '2022', result: '年龄组第 7', highlight: false },
]

const stats = [
  { icon: Mountain, label: '累计爬升', value: '280,000m', sub: '相当于攀登珠峰 31 次' },
  { icon: Clock, label: '赛事完赛', value: '23 场', sub: '包含 3 场百英里' },
  { icon: TrendingUp, label: '年均里程', value: '4,200km', sub: '约每天 11.5km' },
  { icon: Trophy, label: '领奖台次数', value: '5 次', sub: '年龄组前三名' },
]

const photos = [
  { src: '/photos/photo-1.jpg' },
  { src: '/photos/photo-2.jpg' },
  { src: '/photos/photo-3.jpg' },
  { src: '/photos/photo-4.jpg' },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* Profile hero */}
      <div className="bg-[#162418] border border-[#2d4a30] rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 80% 50%, #4ade80 0%, transparent 60%)',
          }}
        />
        <div className="relative flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-[#4ade80]/30">
            <img
              src={`${BASE}/photos/photo-2.jpg`}
              alt="Jiazhe Li"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-[#e8e4dc]">Jiazhe Li</h1>
              <span className="bg-[#fb923c]/15 text-[#fb923c] text-xs px-2 py-0.5 rounded-full border border-[#fb923c]/30">
                Trail Runner
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#8fa898] text-sm mb-4">
              <MapPin size={14} />
              <span>深圳 · 中国</span>
            </div>
            <p className="text-[#c8c4bc] leading-relaxed">
              热爱越野跑 8 年，累计参赛 23 场，完成 3 场百英里。
              相信山山水水是最好的老师，每一次出发都是一次新的成长。
              在这里分享我的训练方法、赛事经历和装备心得，希望帮助更多人爱上越野跑。
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: '微博' },
                { icon: Youtube, label: 'B站' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  title={label}
                  className="flex items-center gap-1.5 text-[#8fa898] hover:text-[#4ade80] transition-colors text-sm border border-[#2d4a30] hover:border-[#4ade80]/40 px-3 py-1.5 rounded-lg"
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value, sub }) => (
          <div key={label} className="bg-[#162418] border border-[#2d4a30] rounded-xl p-4 text-center">
            <Icon className="text-[#4ade80] mx-auto mb-2" size={22} />
            <p className="text-[#e8e4dc] font-black text-xl">{value}</p>
            <p className="text-[#8fa898] text-xs font-medium">{label}</p>
            <p className="text-[#3d4a3e] text-xs mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Photo gallery */}
      <div className="bg-[#162418] border border-[#2d4a30] rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-5">
          <Mountain className="text-[#4ade80]" size={22} />
          <h2 className="text-[#e8e4dc] font-bold text-xl">山野相册</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden bg-[#0d1a0e] group">
              <img
                src={`${BASE}${photo.src}`}
                alt={`照片 ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Medal wall */}
      <div className="bg-[#162418] border border-[#2d4a30] rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Medal className="text-yellow-400" size={22} />
          <h2 className="text-[#e8e4dc] font-bold text-xl">奖牌墙</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {medals.map((medal) => (
            <div
              key={medal.race}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                medal.highlight
                  ? 'border-yellow-400/30 bg-yellow-400/5'
                  : 'border-[#2d4a30] bg-[#0d1a0e]/50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  medal.highlight ? 'bg-yellow-400/15' : 'bg-[#2d4a30]'
                }`}
              >
                <Trophy size={18} className={medal.highlight ? 'text-yellow-400' : 'text-[#4ade80]'} />
              </div>
              <div>
                <p className="text-[#e8e4dc] font-semibold text-sm leading-tight">{medal.race}</p>
                <p className="text-[#8fa898] text-xs mt-0.5">
                  {medal.year} · {medal.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Running story */}
      <div className="bg-[#162418] border border-[#2d4a30] rounded-2xl p-6 mb-8">
        <h2 className="text-[#e8e4dc] font-bold text-xl mb-4">我的跑步故事</h2>
        <div className="flex flex-col gap-4 text-[#c8c4bc] leading-relaxed">
          <p>
            2016 年，我参加了人生第一场公路半马。那天北京下着小雨，我用 2 小时 18 分钟完赛，
            浑身湿透却笑得合不拢嘴。没想到这只是一个开始。
          </p>
          <p>
            2017 年，一位朋友拉我去参加京郊的一次 15km 越野跑。在山路上跌跌撞撞、在泥巴里打滚，
            那种原始的自由感彻底改变了我。从此，我的跑步从马路搬到了山野。
          </p>
          <p>
            2022 年，我完成了人生第一个百英里——崇礼 168。34 小时跋涉，两次想放弃，
            最终在黎明时分踏过终点线。那一刻我明白了：越野跑不只是脚的运动，更是心的修行。
          </p>
          <p>
            2024 年，我站在了 UTMB CCC 的起跑线上，完成了一个越野跑者最纯粹的梦想。
            现在，我希望通过这个平台，把自己积累的经验分享给每一位热爱山野的朋友。
          </p>
        </div>
      </div>

      {/* The real story */}
      <div className="bg-[#1e3022] border border-[#4ade80]/20 rounded-2xl p-6">
        <p className="text-[#c8c4bc] leading-relaxed text-lg">
          哈哈骗你的！我是一个最长越野距离 15km 的小白级专业跑者，但对越野跑的喜爱促使我做了这个网站，希望你喜欢！今年 30 公里希望能和姐妹们一起完赛！🏃‍♀️
        </p>
      </div>

    </div>
  )
}
