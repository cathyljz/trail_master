'use client'

import { useState, useEffect } from 'react'
import {
  Users,
  Trophy,
  MapPin,
  Calendar,
  TrendingUp,
  Route,
  Plus,
  X,
  ExternalLink,
  UserPlus,
  UserMinus,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

type Difficulty = 'easy' | 'moderate' | 'hard' | 'extreme'
type RaceStatus = 'open' | 'coming_soon' | 'closed' | 'finished'
type Tab = 'runs' | 'races'

interface GroupRun {
  id: string
  title: string
  organizer: string
  date: string
  time: string
  location: string
  meetPoint: string
  distance: number
  elevation: number
  difficulty: Difficulty
  maxParticipants: number
  participants: string[]
  description: string
  timestamp: number
}

interface Race {
  id: string
  name: string
  date: string
  location: string
  distances: string[]
  organizer: string
  status: RaceStatus
  deadline?: string
  url: string
  description: string
  color: string
  icon: string
}

// ────────────────────────────────────────────────────────────────────────────
// Config
// ────────────────────────────────────────────────────────────────────────────

const difficultyConfig: Record<Difficulty, { label: string; color: string }> = {
  easy: { label: '入门', color: 'text-[#4ade80] border-[#4ade80]/30 bg-[#4ade80]/10' },
  moderate: { label: '进阶', color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' },
  hard: { label: '高级', color: 'text-[#fb923c] border-[#fb923c]/30 bg-[#fb923c]/10' },
  extreme: { label: '极限', color: 'text-red-400 border-red-400/30 bg-red-400/10' },
}

const statusConfig: Record<RaceStatus, { label: string; color: string }> = {
  open: { label: '报名开放', color: 'text-[#4ade80] border-[#4ade80]/30 bg-[#4ade80]/10' },
  coming_soon: { label: '即将开放', color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' },
  closed: { label: '报名截止', color: 'text-[#8fa898] border-[#8fa898]/30 bg-[#8fa898]/10' },
  finished: { label: '赛事结束', color: 'text-[#3d4a3e] border-[#3d4a3e]/30 bg-[#3d4a3e]/10' },
}

// ────────────────────────────────────────────────────────────────────────────
// Static data — upcoming races
// ────────────────────────────────────────────────────────────────────────────

const upcomingRaces: Race[] = [
  {
    id: 'yunnan100-2026',
    name: '云南100越野赛',
    date: '2026-04-17',
    location: '云南 · 普者黑',
    distances: ['20K', '50K', '100K'],
    organizer: '云景体育',
    status: 'open',
    deadline: '2026-03-20',
    url: 'https://www.yunnan100.com',
    description:
      '穿越云南普者黑喀斯特地貌，百公里赛程爬升超5800m，是亚洲最具挑战性的越野赛之一。被誉为"中国的 UTMB"。',
    color: 'from-orange-900/50 to-amber-900/50',
    icon: '🏔',
  },
  {
    id: 'cangshan-2026',
    name: '苍山越野赛',
    date: '2026-05-08',
    location: '云南 · 大理',
    distances: ['25K', '50K', '100K'],
    organizer: '一群人体育',
    status: 'open',
    deadline: '2026-04-15',
    url: 'https://www.etji.cn',
    description:
      '大理苍山高山草甸与密林交错，下坡技术要求极高，沿途可俯瞰洱海，风景绝美。',
    color: 'from-sky-900/50 to-blue-900/50',
    icon: '🌤',
  },
  {
    id: 'tnf100-bj-2026',
    name: 'TNF100 北京站',
    date: '2026-05-23',
    location: '北京 · 延庆',
    distances: ['25K', '50K', '100K'],
    organizer: 'The North Face',
    status: 'coming_soon',
    deadline: '2026-04-30',
    url: 'https://www.thenorthface.com.cn',
    description:
      '中国历史最悠久的越野赛事之一，以北京延庆长城山地为核心赛场，适合各级别跑者。',
    color: 'from-slate-900/50 to-zinc-900/50',
    icon: '🏙',
  },
  {
    id: 'taihang-2026',
    name: '太行山越野赛',
    date: '2026-06-13',
    location: '河北 · 石家庄',
    distances: ['30K', '70K'],
    organizer: '众山小体育',
    status: 'coming_soon',
    deadline: '2026-05-20',
    url: 'https://www.zhongshanxiao.com',
    description:
      '太行山独特石板路与悬崖小道，地形雄浑壮美，爬升密度高，是国内最有辨识度的越野地形之一。',
    color: 'from-emerald-900/50 to-teal-900/50',
    icon: '⛰',
  },
  {
    id: 'chongli168-2026',
    name: '崇礼越野168',
    date: '2026-09-18',
    location: '河北 · 崇礼',
    distances: ['25K', '50K', '100Mi'],
    organizer: '众山小体育',
    status: 'coming_soon',
    deadline: '2026-08-01',
    url: 'https://www.zhongshanxiao.com',
    description:
      '中国顶级百英里赛事，以2022冬奥崇礼赛场为核心，总爬升超8000m，是中国越野跑的终极挑战。',
    color: 'from-blue-900/50 to-indigo-900/50',
    icon: '❄',
  },
  {
    id: 'siguniangshan-2026',
    name: '四姑娘山山地越野',
    date: '2026-10-09',
    location: '四川 · 小金',
    distances: ['21K', '55K'],
    organizer: '四姑娘山景区',
    status: 'coming_soon',
    deadline: '2026-09-01',
    url: 'https://www.etji.cn',
    description:
      '海拔最高的越野赛事之一，主赛场海拔逾3500m，穿越四姑娘山核心景区，赛道壮丽而挑战极高。',
    color: 'from-violet-900/50 to-purple-900/50',
    icon: '🗻',
  },
]

// ────────────────────────────────────────────────────────────────────────────
// Seed group runs
// ────────────────────────────────────────────────────────────────────────────

const seedRuns: GroupRun[] = [
  {
    id: 'run-seed-1',
    title: '北京香山经典线 · 周末晨跑',
    organizer: '山野行者',
    date: '2026-03-14',
    time: '06:30',
    location: '北京 · 海淀',
    meetPoint: '香山公园北门停车场',
    distance: 18,
    elevation: 780,
    difficulty: 'moderate',
    maxParticipants: 8,
    participants: ['u-a', 'u-b', 'u-c'],
    description:
      '香山经典长线，途经鬼见愁和主要峰顶，下坡技术性较强。建议有越野基础的跑者参加，新手请谨慎评估。',
    timestamp: Date.now() - 3600 * 48 * 1000,
  },
  {
    id: 'run-seed-2',
    title: '门头沟天门山 · 大爬升越野',
    organizer: '岩石脚步',
    date: '2026-03-21',
    time: '07:00',
    location: '北京 · 门头沟',
    meetPoint: '天门山景区停车场',
    distance: 30,
    elevation: 1600,
    difficulty: 'hard',
    maxParticipants: 6,
    participants: ['u-a', 'u-d'],
    description:
      '总爬升1600m，适合备赛崇礼168或其他高强度赛事的跑者进行专项爬升训练。需携带完整补给和急救包。',
    timestamp: Date.now() - 3600 * 12 * 1000,
  },
  {
    id: 'run-seed-3',
    title: '奥森公园 · 入门越野 · 新手欢迎',
    organizer: '绿野仙踪',
    date: '2026-03-08',
    time: '09:00',
    location: '北京 · 朝阳',
    meetPoint: '奥森南园入口广场',
    distance: 10,
    elevation: 80,
    difficulty: 'easy',
    maxParticipants: 15,
    participants: ['u-a', 'u-b', 'u-c', 'u-d', 'u-e'],
    description:
      '适合越野跑新手的入门路线，在奥森公园土路和草地上轻松跑10km，无技术难度，欢迎携带朋友一起来！',
    timestamp: Date.now() - 3600 * 36 * 1000,
  },
]

// ────────────────────────────────────────────────────────────────────────────
// Utils
// ────────────────────────────────────────────────────────────────────────────

const SESSION_KEY = 'trail-session-id'
const RUNS_KEY = 'trail-group-runs'

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = Math.random().toString(36).slice(2)
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

function timeAgo(ts: number): string {
  const diff = (Date.now() - ts) / 1000
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`
  return `${Math.floor(diff / 86400)} 天前`
}

// ────────────────────────────────────────────────────────────────────────────
// Default form state
// ────────────────────────────────────────────────────────────────────────────

const emptyForm = {
  title: '',
  organizer: '',
  date: '',
  time: '07:00',
  location: '',
  meetPoint: '',
  distance: '',
  elevation: '',
  difficulty: 'moderate' as Difficulty,
  maxParticipants: '8',
  description: '',
}

// ────────────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<Tab>('runs')
  const [runs, setRuns] = useState<GroupRun[]>([])
  const [sessionId, setSessionId] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [expandedDesc, setExpandedDesc] = useState<Set<string>>(new Set())

  useEffect(() => {
    const sid = getSessionId()
    setSessionId(sid)
    const saved = localStorage.getItem(RUNS_KEY)
    if (saved) {
      setRuns(JSON.parse(saved))
    } else {
      setRuns(seedRuns)
      localStorage.setItem(RUNS_KEY, JSON.stringify(seedRuns))
    }
    const savedOrganizer = localStorage.getItem('trail-author') || ''
    setForm((f) => ({ ...f, organizer: savedOrganizer }))
  }, [])

  const saveRuns = (updated: GroupRun[]) => {
    setRuns(updated)
    localStorage.setItem(RUNS_KEY, JSON.stringify(updated))
  }

  const handleJoin = (runId: string) => {
    saveRuns(
      runs.map((r) =>
        r.id === runId
          ? {
              ...r,
              participants: r.participants.includes(sessionId)
                ? r.participants.filter((id) => id !== sessionId)
                : r.participants.length < r.maxParticipants
                ? [...r.participants, sessionId]
                : r.participants,
            }
          : r
      )
    )
  }

  const handleSubmit = () => {
    if (
      !form.title.trim() ||
      !form.organizer.trim() ||
      !form.date ||
      !form.location.trim() ||
      !form.meetPoint.trim() ||
      !form.distance ||
      !form.elevation
    )
      return
    localStorage.setItem('trail-author', form.organizer)
    const newRun: GroupRun = {
      id: Date.now().toString(),
      title: form.title.trim(),
      organizer: form.organizer.trim(),
      date: form.date,
      time: form.time,
      location: form.location.trim(),
      meetPoint: form.meetPoint.trim(),
      distance: Number(form.distance),
      elevation: Number(form.elevation),
      difficulty: form.difficulty,
      maxParticipants: Number(form.maxParticipants),
      participants: [sessionId],
      description: form.description.trim(),
      timestamp: Date.now(),
    }
    saveRuns([newRun, ...runs])
    setForm({ ...emptyForm, organizer: form.organizer })
    setShowForm(false)
  }

  const toggleDesc = (id: string) => {
    setExpandedDesc((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const inputCls =
    'w-full bg-[#0d1a0e] border border-[#2d4a30] rounded-lg px-3 py-2.5 text-[#e8e4dc] text-sm placeholder-[#3d4a3e] focus:outline-none focus:border-[#4ade80]/60 transition-colors'

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#e8e4dc] mb-2">越野社区</h1>
        <p className="text-[#8fa898]">组队出发，征服山野；关注赛事，备战全年</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 bg-[#162418] border border-[#2d4a30] rounded-xl p-1 w-fit mb-10">
        {(
          [
            { key: 'runs', icon: Users, label: '约跑广场' },
            { key: 'races', icon: Trophy, label: '赛事报名' },
          ] as const
        ).map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === key
                ? 'bg-[#22c55e] text-black'
                : 'text-[#8fa898] hover:text-[#e8e4dc]'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* ── 约跑广场 ── */}
      {activeTab === 'runs' && (
        <div>
          {/* Action bar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-[#8fa898] text-sm">共 {runs.length} 条约跑活动</p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#4ade80] text-black font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              {showForm ? <X size={16} /> : <Plus size={16} />}
              {showForm ? '收起' : '发起约跑'}
            </button>
          </div>

          {/* Create form */}
          {showForm && (
            <div className="bg-[#162418] border border-[#2d4a30] rounded-2xl p-6 mb-8">
              <h3 className="text-[#e8e4dc] font-bold text-lg mb-5">发起约跑活动</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="sm:col-span-2">
                  <label className="text-[#8fa898] text-xs mb-1.5 block">活动标题 *</label>
                  <input
                    className={inputCls}
                    placeholder="例：香山经典线 · 周末越野晨跑"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#8fa898] text-xs mb-1.5 block">发起人昵称 *</label>
                  <input
                    className={inputCls}
                    placeholder="你的昵称"
                    value={form.organizer}
                    onChange={(e) => setForm({ ...form, organizer: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#8fa898] text-xs mb-1.5 block">城市 / 地区 *</label>
                  <input
                    className={inputCls}
                    placeholder="例：北京 · 海淀"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#8fa898] text-xs mb-1.5 block">出发日期 *</label>
                  <input
                    type="date"
                    className={inputCls}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#8fa898] text-xs mb-1.5 block">集合时间 *</label>
                  <input
                    type="time"
                    className={inputCls}
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[#8fa898] text-xs mb-1.5 block">集合地点（具体） *</label>
                  <input
                    className={inputCls}
                    placeholder="例：香山公园北门停车场"
                    value={form.meetPoint}
                    onChange={(e) => setForm({ ...form, meetPoint: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#8fa898] text-xs mb-1.5 block">距离（km）*</label>
                  <input
                    type="number"
                    className={inputCls}
                    placeholder="如 20"
                    value={form.distance}
                    onChange={(e) => setForm({ ...form, distance: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#8fa898] text-xs mb-1.5 block">爬升（m）*</label>
                  <input
                    type="number"
                    className={inputCls}
                    placeholder="如 800"
                    value={form.elevation}
                    onChange={(e) => setForm({ ...form, elevation: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#8fa898] text-xs mb-1.5 block">难度</label>
                  <select
                    className={inputCls}
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: e.target.value as Difficulty })}
                  >
                    <option value="easy">入门（适合新手）</option>
                    <option value="moderate">进阶（有越野基础）</option>
                    <option value="hard">高级（赛事水平）</option>
                    <option value="extreme">极限（精英选手）</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8fa898] text-xs mb-1.5 block">最多人数</label>
                  <input
                    type="number"
                    className={inputCls}
                    min={2}
                    max={30}
                    value={form.maxParticipants}
                    onChange={(e) => setForm({ ...form, maxParticipants: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[#8fa898] text-xs mb-1.5 block">活动说明</label>
                  <textarea
                    className={inputCls}
                    rows={3}
                    placeholder="路线简介、难度说明、注意事项、装备要求等…"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 text-sm text-[#8fa898] hover:text-[#e8e4dc] border border-[#2d4a30] rounded-xl transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 text-sm font-bold bg-[#22c55e] hover:bg-[#4ade80] text-black rounded-xl transition-colors"
                >
                  发布约跑
                </button>
              </div>
            </div>
          )}

          {/* Run cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {runs.map((run) => {
              const isJoined = run.participants.includes(sessionId)
              const isFull = run.participants.length >= run.maxParticipants && !isJoined
              const diffCfg = difficultyConfig[run.difficulty]
              const showDesc = expandedDesc.has(run.id)

              return (
                <div
                  key={run.id}
                  className="bg-[#162418] border border-[#2d4a30] rounded-2xl p-5 flex flex-col gap-4 hover:border-[#4ade80]/20 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#e8e4dc] font-bold text-base leading-snug mb-1">
                        {run.title}
                      </h3>
                      <p className="text-[#3d4a3e] text-xs">
                        {run.organizer} · {timeAgo(run.timestamp)}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${diffCfg.color}`}
                    >
                      {diffCfg.label}
                    </span>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                    <div className="flex items-center gap-1.5 text-[#8fa898] text-xs">
                      <Calendar size={12} className="text-[#4ade80] flex-shrink-0" />
                      {run.date} {run.time}
                    </div>
                    <div className="flex items-center gap-1.5 text-[#8fa898] text-xs">
                      <MapPin size={12} className="text-[#4ade80] flex-shrink-0" />
                      <span className="truncate">{run.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#8fa898] text-xs">
                      <Route size={12} className="text-[#fb923c] flex-shrink-0" />
                      {run.distance} km
                    </div>
                    <div className="flex items-center gap-1.5 text-[#8fa898] text-xs">
                      <TrendingUp size={12} className="text-[#fb923c] flex-shrink-0" />
                      爬升 {run.elevation}m
                    </div>
                  </div>

                  {/* Meet point */}
                  <div className="bg-[#0d1a0e] rounded-lg px-3 py-2 text-xs text-[#8fa898]">
                    <span className="text-[#3d4a3e]">集合：</span>
                    {run.meetPoint}
                  </div>

                  {/* Description toggle */}
                  {run.description && (
                    <div>
                      <p
                        className={`text-[#8fa898] text-xs leading-relaxed ${showDesc ? '' : 'line-clamp-2'}`}
                      >
                        {run.description}
                      </p>
                      {run.description.length > 60 && (
                        <button
                          onClick={() => toggleDesc(run.id)}
                          className="flex items-center gap-1 text-xs text-[#3d4a3e] hover:text-[#8fa898] mt-1 transition-colors"
                        >
                          {showDesc ? (
                            <>
                              <ChevronUp size={12} /> 收起
                            </>
                          ) : (
                            <>
                              <ChevronDown size={12} /> 展开
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#2d4a30] mt-auto">
                    <div className="flex items-center gap-1.5">
                      <Users size={13} className="text-[#4ade80]" />
                      <span className="text-[#8fa898] text-xs">
                        {run.participants.length}
                        <span className="text-[#3d4a3e]">/{run.maxParticipants} 人</span>
                      </span>
                    </div>
                    <button
                      onClick={() => handleJoin(run.id)}
                      disabled={isFull}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                        isJoined
                          ? 'border border-[#fb923c]/30 text-[#fb923c] hover:bg-[#fb923c]/10'
                          : isFull
                          ? 'border border-[#2d4a30] text-[#3d4a3e] cursor-not-allowed'
                          : 'bg-[#22c55e] hover:bg-[#4ade80] text-black'
                      }`}
                    >
                      {isJoined ? (
                        <>
                          <UserMinus size={13} /> 已参加·退出
                        </>
                      ) : isFull ? (
                        '名额已满'
                      ) : (
                        <>
                          <UserPlus size={13} /> 参加约跑
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── 赛事报名 ── */}
      {activeTab === 'races' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-[#8fa898] text-sm">
              {upcomingRaces.filter((r) => r.status === 'open').length} 场赛事正在报名 ·{' '}
              {upcomingRaces.filter((r) => r.status === 'coming_soon').length} 场即将开放
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingRaces.map((race) => {
              const statusCfg = statusConfig[race.status]
              return (
                <a
                  key={race.id}
                  href={race.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#162418] border border-[#2d4a30] rounded-2xl overflow-hidden hover:border-[#4ade80]/20 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Race banner */}
                  <div
                    className={`bg-gradient-to-br ${race.color} h-32 flex items-center justify-between px-6`}
                  >
                    <div>
                      <p className="text-white/60 text-xs mb-1">{race.organizer}</p>
                      <p className="text-white font-black text-lg leading-tight">{race.name}</p>
                    </div>
                    <span className="text-5xl">{race.icon}</span>
                  </div>

                  <div className="p-5 flex flex-col gap-3 flex-1">
                    {/* Status badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusCfg.color}`}
                      >
                        {statusCfg.label}
                      </span>
                      {race.deadline && (
                        <span className="text-[#3d4a3e] text-xs flex items-center gap-1">
                          <Clock size={11} /> 截止 {race.deadline}
                        </span>
                      )}
                    </div>

                    {/* Date & Location */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[#8fa898] text-xs">
                        <Calendar size={12} className="text-[#4ade80]" />
                        {race.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-[#8fa898] text-xs">
                        <MapPin size={12} className="text-[#4ade80]" />
                        {race.location}
                      </div>
                    </div>

                    {/* Distances */}
                    <div className="flex gap-1.5 flex-wrap">
                      {race.distances.map((d) => (
                        <span
                          key={d}
                          className="text-xs border border-[#2d4a30] text-[#4ade80] px-2 py-0.5 rounded-full"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-[#8fa898] text-xs leading-relaxed line-clamp-3 flex-1">
                      {race.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center justify-end gap-1 text-xs font-semibold text-[#4ade80] group-hover:underline mt-auto pt-2 border-t border-[#2d4a30]">
                      前往官网报名 <ExternalLink size={12} />
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          {/* Disclaimer */}
          <p className="text-[#3d4a3e] text-xs text-center mt-8">
            赛事信息仅供参考，具体报名日期和要求以各赛事官方公告为准。
          </p>
        </div>
      )}
    </div>
  )
}
