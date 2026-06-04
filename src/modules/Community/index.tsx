import { useState } from 'react'
import {
  Users,
  Search,
  Plus,
  DollarSign,
  TrendingUp,
  Tag,
  MessageSquare,
  X,
} from 'lucide-react'
import { communityProjects } from '../../data/mockData'

export default function Community() {
  const [filter, setFilter] = useState('')
  const [showPostForm, setShowPostForm] = useState(false)
  const [postTitle, setPostTitle] = useState('')
  const [postDescription, setPostDescription] = useState('')
  const [postSeeking, setPostSeeking] = useState('')
  const [postMrr, setPostMrr] = useState('')
  const [postUsers, setPostUsers] = useState('')
  const [postStage, setPostStage] = useState('Pre-launch')
  const [posts, setPosts] = useState(communityProjects)

  const filteredProjects = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
  )

  const handlePost = () => {
    if (!postTitle.trim() || !postDescription.trim()) return
    const newPost = {
      id: posts.length + 1,
      title: postTitle,
      author: 'Rayan A.',
      description: postDescription,
      mrr: parseInt(postMrr) || 0,
      users: parseInt(postUsers) || 0,
      stage: postStage,
      seeking: postSeeking || 'Open to offers',
      tags: ['new'],
    }
    setPosts([newPost, ...posts])
    setShowPostForm(false)
    setPostTitle('')
    setPostDescription('')
    setPostSeeking('')
    setPostMrr('')
    setPostUsers('')
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Community
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Discover projects, find co-founders, and connect with investors.
          </p>
        </div>
        <button
          onClick={() => setShowPostForm(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Publish Project
        </button>
      </div>

      {showPostForm && (
        <div className="bg-white rounded-xl border border-primary/30 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-900">Publish Your Project</h2>
            <button onClick={() => setShowPostForm(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Project name"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <textarea
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              placeholder="What does your project do? Include current MRR, user count, and what stage you're at. (3 sentences max)"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <div className="grid grid-cols-4 gap-3">
              <input
                type="text"
                value={postMrr}
                onChange={(e) => setPostMrr(e.target.value)}
                placeholder="MRR ($)"
                className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <input
                type="text"
                value={postUsers}
                onChange={(e) => setPostUsers(e.target.value)}
                placeholder="Users"
                className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <select
                value={postStage}
                onChange={(e) => setPostStage(e.target.value)}
                className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option>Pre-launch</option>
                <option>Growth</option>
                <option>Traction</option>
                <option>Scaling</option>
              </select>
              <input
                type="text"
                value={postSeeking}
                onChange={(e) => setPostSeeking(e.target.value)}
                placeholder="What you need"
                className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handlePost}
                disabled={!postTitle.trim() || !postDescription.trim()}
                className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search projects by name or tag..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">{project.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">by {project.author}</p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {project.stage}
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">{project.description}</p>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <DollarSign className="w-3.5 h-3.5" />
                <span className="font-medium text-slate-700">${project.mrr.toLocaleString()}</span>
                <span className="text-xs">MRR</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="font-medium text-slate-700">{project.users.toLocaleString()}</span>
                <span className="text-xs">users</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium text-primary">{project.seeking}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <button className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-colors">
                <MessageSquare className="w-3.5 h-3.5" /> Reach out
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No projects match your search</p>
        </div>
      )}
    </div>
  )
}
