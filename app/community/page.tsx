'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Send, ChevronDown, ChevronUp, Users } from 'lucide-react'

interface Reply {
  id: string
  author: string
  content: string
  timestamp: number
  likes: string[]
}

interface Post {
  id: string
  author: string
  content: string
  timestamp: number
  likes: string[]
  replies: Reply[]
}

const SESSION_KEY = 'trail-session-id'
const POSTS_KEY = 'trail-community-posts'

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

const seedPosts: Post[] = [
  {
    id: 'seed-1',
    author: '山巅追风者',
    content: '刚完成了人生第一场 50K 越野赛！爬升 3200m，历时 7h23min。最后 10km 腿已经不是自己的了，但冲过终点线那一刻，泪目了 🏔️ 感谢每一位补给站的志愿者！',
    timestamp: Date.now() - 2 * 3600 * 1000,
    likes: ['user-a', 'user-b', 'user-c'],
    replies: [
      {
        id: 'r1',
        author: '岩石脚步',
        content: '太厉害了！50K 爬升 3200m 是什么赛事？恭喜完赛！',
        timestamp: Date.now() - 1.5 * 3600 * 1000,
        likes: ['user-a'],
      },
      {
        id: 'r2',
        author: '山巅追风者',
        content: '是云南那边的一个越野赛，建议！明年你也可以报名试试～',
        timestamp: Date.now() - 1 * 3600 * 1000,
        likes: [],
      },
    ],
  },
  {
    id: 'seed-2',
    author: '绿野仙踪',
    content: '求推荐：第一双越野跑鞋选 Salomon Speedcross 6 还是 HOKA Speedgoat 5？主要跑云南的红土路和碎石混合路面，预算 1500 以内。',
    timestamp: Date.now() - 5 * 3600 * 1000,
    likes: ['user-b'],
    replies: [
      {
        id: 'r3',
        author: '装备控',
        content: 'Speedcross 泥地无敌，但碎石路稍微硬了点。Speedgoat 缓震更好，混合路面更全能。你的路况我会选 Speedgoat！',
        timestamp: Date.now() - 4 * 3600 * 1000,
        likes: ['user-b', 'user-c'],
      },
    ],
  },
  {
    id: 'seed-3',
    author: '夜跑精灵',
    content: '分享一个训练心得：连续 3 周的爬升训练之后，我的上坡速度提升了 20%！关键是把"有氧慢爬"和"短距离冲刺"结合起来。具体方法在评论里 👇',
    timestamp: Date.now() - 24 * 3600 * 1000,
    likes: ['user-a', 'user-b', 'user-c', 'user-d'],
    replies: [
      {
        id: 'r4',
        author: '夜跑精灵',
        content: '具体方法：每周 2 次长距离有氧爬升（60-90min，心率控制在 Zone 2-3），1 次短坡冲刺（200m 坡，重复 8 组）。坚持 3 周效果明显！',
        timestamp: Date.now() - 23 * 3600 * 1000,
        likes: ['user-a', 'user-c'],
      },
    ],
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [author, setAuthor] = useState('')
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    const sid = getSessionId()
    setSessionId(sid)
    const saved = localStorage.getItem(POSTS_KEY)
    if (saved) {
      setPosts(JSON.parse(saved))
    } else {
      setPosts(seedPosts)
      localStorage.setItem(POSTS_KEY, JSON.stringify(seedPosts))
    }
    const savedAuthor = localStorage.getItem('trail-author') || ''
    setAuthor(savedAuthor)
  }, [])

  const save = (updated: Post[]) => {
    setPosts(updated)
    localStorage.setItem(POSTS_KEY, JSON.stringify(updated))
  }

  const submitPost = () => {
    if (!newPost.trim() || !author.trim()) return
    localStorage.setItem('trail-author', author)
    const post: Post = {
      id: Date.now().toString(),
      author: author.trim(),
      content: newPost.trim(),
      timestamp: Date.now(),
      likes: [],
      replies: [],
    }
    save([post, ...posts])
    setNewPost('')
  }

  const toggleLikePost = (postId: string) => {
    save(
      posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              likes: p.likes.includes(sessionId)
                ? p.likes.filter((id) => id !== sessionId)
                : [...p.likes, sessionId],
            }
          : p
      )
    )
  }

  const toggleLikeReply = (postId: string, replyId: string) => {
    save(
      posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              replies: p.replies.map((r) =>
                r.id === replyId
                  ? {
                      ...r,
                      likes: r.likes.includes(sessionId)
                        ? r.likes.filter((id) => id !== sessionId)
                        : [...r.likes, sessionId],
                    }
                  : r
              ),
            }
          : p
      )
    )
  }

  const submitReply = (postId: string) => {
    if (!replyContent.trim() || !author.trim()) return
    localStorage.setItem('trail-author', author)
    const reply: Reply = {
      id: Date.now().toString(),
      author: author.trim(),
      content: replyContent.trim(),
      timestamp: Date.now(),
      likes: [],
    }
    save(
      posts.map((p) =>
        p.id === postId ? { ...p, replies: [...p.replies, reply] } : p
      )
    )
    setReplyContent('')
    setReplyingTo(null)
    setExpandedReplies((prev) => new Set([...prev, postId]))
  }

  const toggleReplies = (postId: string) => {
    setExpandedReplies((prev) => {
      const next = new Set(prev)
      if (next.has(postId)) next.delete(postId)
      else next.add(postId)
      return next
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Users className="text-[#d4622a]" size={28} />
          <h1 className="text-4xl font-black text-[#e8e4dc]">互动社区</h1>
        </div>
        <p className="text-[#8fa898]">分享你的越野故事，与跑友一起成长</p>
      </div>

      {/* Post composer */}
      <div className="bg-[#162418] border border-[#2d4a30] rounded-2xl p-5 mb-8">
        <input
          type="text"
          placeholder="你的昵称"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full bg-[#0d1a0e] border border-[#2d4a30] rounded-lg px-4 py-2.5 text-[#e8e4dc] text-sm placeholder-[#3d4a3e] mb-3 focus:outline-none focus:border-[#5c9e6e] transition-colors"
        />
        <textarea
          placeholder="分享你的越野故事、训练心得或装备问题…"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          rows={3}
          className="w-full bg-[#0d1a0e] border border-[#2d4a30] rounded-lg px-4 py-2.5 text-[#e8e4dc] text-sm placeholder-[#3d4a3e] resize-none focus:outline-none focus:border-[#5c9e6e] transition-colors"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={submitPost}
            disabled={!newPost.trim() || !author.trim()}
            className="flex items-center gap-2 bg-[#5c9e6e] hover:bg-[#7dba8e] disabled:opacity-40 disabled:cursor-not-allowed text-[#0d1a0e] font-bold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            <Send size={15} /> 发布
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-5">
        {posts.map((post) => {
          const liked = post.likes.includes(sessionId)
          const showReplies = expandedReplies.has(post.id)

          return (
            <div key={post.id} className="bg-[#162418] border border-[#2d4a30] rounded-2xl p-5">
              {/* Post header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#2d4a30] flex items-center justify-center text-[#5c9e6e] font-bold text-sm">
                  {post.author[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-[#e8e4dc] font-semibold text-sm">{post.author}</p>
                  <p className="text-[#3d4a3e] text-xs">{timeAgo(post.timestamp)}</p>
                </div>
              </div>

              <p className="text-[#c8c4bc] text-sm leading-relaxed mb-4">{post.content}</p>

              {/* Post actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleLikePost(post.id)}
                  className={`flex items-center gap-1.5 text-sm transition-colors ${
                    liked ? 'text-[#d4622a]' : 'text-[#8fa898] hover:text-[#d4622a]'
                  }`}
                >
                  <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                  {post.likes.length > 0 && post.likes.length}
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(replyingTo === post.id ? null : post.id)
                    setExpandedReplies((prev) => new Set([...prev, post.id]))
                  }}
                  className="flex items-center gap-1.5 text-sm text-[#8fa898] hover:text-[#5c9e6e] transition-colors"
                >
                  <MessageCircle size={16} />
                  回复
                </button>
                {post.replies.length > 0 && (
                  <button
                    onClick={() => toggleReplies(post.id)}
                    className="flex items-center gap-1 text-xs text-[#8fa898] hover:text-[#e8e4dc] ml-auto transition-colors"
                  >
                    {showReplies ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {post.replies.length} 条回复
                  </button>
                )}
              </div>

              {/* Replies */}
              {showReplies && post.replies.length > 0 && (
                <div className="mt-4 border-t border-[#2d4a30] pt-4 flex flex-col gap-3">
                  {post.replies.map((reply) => {
                    const replyLiked = reply.likes.includes(sessionId)
                    return (
                      <div key={reply.id} className="flex gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#1e3022] flex items-center justify-center text-[#5c9e6e] font-bold text-xs flex-shrink-0 mt-0.5">
                          {reply.author[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#e8e4dc] text-xs font-semibold">{reply.author}</span>
                            <span className="text-[#3d4a3e] text-xs">{timeAgo(reply.timestamp)}</span>
                          </div>
                          <p className="text-[#c8c4bc] text-sm leading-relaxed">{reply.content}</p>
                          <button
                            onClick={() => toggleLikeReply(post.id, reply.id)}
                            className={`flex items-center gap-1 text-xs mt-1.5 transition-colors ${
                              replyLiked ? 'text-[#d4622a]' : 'text-[#8fa898] hover:text-[#d4622a]'
                            }`}
                          >
                            <Heart size={12} fill={replyLiked ? 'currentColor' : 'none'} />
                            {reply.likes.length > 0 && reply.likes.length}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Reply box */}
              {replyingTo === post.id && (
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="回复内容…"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submitReply(post.id)}
                    className="flex-1 bg-[#0d1a0e] border border-[#2d4a30] rounded-lg px-3 py-2 text-[#e8e4dc] text-sm placeholder-[#3d4a3e] focus:outline-none focus:border-[#5c9e6e] transition-colors"
                  />
                  <button
                    onClick={() => submitReply(post.id)}
                    disabled={!replyContent.trim() || !author.trim()}
                    className="bg-[#5c9e6e] hover:bg-[#7dba8e] disabled:opacity-40 text-[#0d1a0e] font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    发送
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
