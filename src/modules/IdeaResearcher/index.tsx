import { useState } from 'react'
import { Search, Sparkles, TrendingUp, Target, DollarSign, BarChart3, Globe } from 'lucide-react'
import { sampleIdeas, type IdeaResult } from '../../data/mockData'

const SUGGESTED_TOPICS = ['fintech', 'saas', 'edtech', 'healthtech', 'e-commerce', 'AI tools', 'logistics']

export default function IdeaResearcher() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<IdeaResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchedTopic, setSearchedTopic] = useState('')

  const handleSearch = (searchQuery: string) => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return
    setIsSearching(true)
    setSearchedTopic(searchQuery.trim())

    setTimeout(() => {
      const key = Object.keys(sampleIdeas).find((k) => q.includes(k))
      setResults(key ? sampleIdeas[key] : sampleIdeas['saas'])
      setIsSearching(false)
    }, 1200)
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Idea Researcher
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Enter a sector or keyword. Get buildable, monetizable app ideas with competition analysis.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              placeholder="Enter a sector, trend, or keyword (e.g. fintech, habit tracking, AI for freelancers)"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <button
            onClick={() => handleSearch(query)}
            disabled={isSearching || !query.trim()}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            Research
          </button>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {SUGGESTED_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => { setQuery(topic); handleSearch(topic) }}
              className="px-3 py-1 text-xs font-medium text-slate-500 bg-slate-50 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {isSearching && (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Analyzing market data for "{searchedTopic}"...</p>
        </div>
      )}

      {!isSearching && results.length > 0 && (
        <div>
          <p className="text-sm text-slate-500 mb-4">
            Found <span className="font-semibold text-slate-900">{results.length} ideas</span> for "{searchedTopic}"
          </p>
          <div className="space-y-4">
            {results.map((idea, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    {idea.title}
                    {idea.africaRelevant && (
                      <span className="flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                        <Globe className="w-2.5 h-2.5" /> Africa-ready
                      </span>
                    )}
                  </h3>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      idea.competitionLevel === 'low'
                        ? 'bg-emerald-50 text-emerald-700'
                        : idea.competitionLevel === 'medium'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {idea.competitionLevel} competition
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Problem</p>
                      <p className="text-slate-700">{idea.problem}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Target User</p>
                      <p className="text-slate-700">{idea.targetUser}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Monetization</p>
                      <p className="text-slate-700">{idea.monetization}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BarChart3 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Market Signal</p>
                      <p className="text-slate-700">{idea.marketSignal}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-start gap-2">
                    <BarChart3 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Competition</p>
                      <p className="text-sm text-slate-700">{idea.competition}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isSearching && results.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Search a sector above to discover buildable ideas</p>
        </div>
      )}
    </div>
  )
}

function Lightbulb({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}
