import ElderLayout from '../ElderLayout'
import { useApp } from '../AppContext'
import { useT } from '../useT'

const WEEKLY = [
  { day: 'Mon', count: 3 },
  { day: 'Tue', count: 5 },
  { day: 'Wed', count: 2 },
  { day: 'Thu', count: 4 },
  { day: 'Fri', count: 5 },
  { day: 'Sat', count: 3 },
  { day: 'Sun', count: 2 },
]

const RECENT = [
  { emoji: '🧩', name: 'Memory Match', when: 'Today, 2:30 PM', status: 'done' },
  { emoji: '🎵', name: 'Music Memory', when: 'Today, 10:15 AM', status: 'done' },
  { emoji: '📖', name: 'Story Sequence', when: 'Yesterday, 3:45 PM', status: 'done' },
  { emoji: '🔤', name: 'Word Recall', when: 'Mon, 11:00 AM', status: 'done' },
  { emoji: '🌺', name: 'Name the Flower', when: 'Sun, 4:00 PM', status: 'done' },
]

const FAVOURITES = [
  { emoji: '🎵', name: 'Music Memory', count: 12 },
  { emoji: '🧩', name: 'Memory Match', count: 8 },
  { emoji: '📖', name: 'Story Sequence', count: 4 },
]

const maxCount = Math.max(...WEEKLY.map((w) => w.count))

export default function ProgressScreen() {
  const { elderName } = useApp()
  const t = useT()

  return (
    <ElderLayout active="progress">
      <div className="p-5 md:p-8 max-w-3xl mx-auto screen-enter">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-warm-black mb-1">{t.progressTitle}</h1>
        <p className="text-warm-gray mb-6">{elderName} ji — {t.progressSub}</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-cream rounded-2xl p-4 text-center border-2 border-warm-tan" style={{ boxShadow: '0 2px 8px rgba(28,13,5,0.07)' }}>
            <div className="text-3xl font-bold text-saffron font-display">24</div>
            <div className="text-warm-gray text-xs mt-1">{t.activitiesThisMonth}</div>
          </div>
          <div className="bg-cream rounded-2xl p-4 text-center border-2 border-warm-tan" style={{ boxShadow: '0 2px 8px rgba(28,13,5,0.07)' }}>
            <div className="text-3xl font-bold text-kumkum font-display">5🔥</div>
            <div className="text-warm-gray text-xs mt-1">{t.dayStreak}</div>
          </div>
          <div className="bg-cream rounded-2xl p-4 text-center border-2 border-warm-tan" style={{ boxShadow: '0 2px 8px rgba(28,13,5,0.07)' }}>
            <div className="text-3xl font-bold text-forest font-display">82%</div>
            <div className="text-warm-gray text-xs mt-1">{t.completion}</div>
          </div>
        </div>

        {/* Weekly activity chart */}
        <section className="bg-cream rounded-2xl border-2 border-warm-tan p-5 mb-6" style={{ boxShadow: '0 2px 8px rgba(28,13,5,0.07)' }}>
          <h2 className="font-display font-semibold text-warm-black mb-4">{t.thisWeek}</h2>
          <div className="flex items-end gap-2 h-32">
            {WEEKLY.map(({ day, count }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-saffron transition-all"
                  style={{
                    height: count > 0 ? `${(count / maxCount) * 100}%` : '4px',
                    opacity: day === 'Sun' || day === 'Sat' ? 0.6 : 1,
                    minHeight: '4px',
                  }}
                />
                <div className="text-warm-gray text-xs">{day}</div>
                <div className="text-warm-black text-xs font-bold">{count}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-warm-gray text-sm">24 activities this week · best day: Tuesday</div>
        </section>

        {/* Favourite activities */}
        <section className="bg-cream rounded-2xl border-2 border-warm-tan p-5 mb-6" style={{ boxShadow: '0 2px 8px rgba(28,13,5,0.07)' }}>
          <h2 className="font-display font-semibold text-warm-black mb-4">{t.favouriteActivities}</h2>
          <div className="space-y-3">
            {FAVOURITES.map(({ emoji, name, count }, i) => (
              <div key={name} className="flex items-center gap-3">
                <span className="text-2xl">{emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-warm-black text-sm">{name}</span>
                    <span className="text-warm-gray text-xs">{count} times</span>
                  </div>
                  <div className="bg-warm-peach rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-saffron transition-all"
                      style={{ width: `${(count / FAVOURITES[0].count) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-warm-gray text-xs w-4">#{i + 1}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Personalized performance analysis */}
        <section className="bg-cream rounded-2xl border-2 border-warm-tan p-5 mb-6" style={{ boxShadow: '0 2px 8px rgba(28,13,5,0.07)' }}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
            <div>
              <h2 className="font-display font-semibold text-warm-black text-lg">Personalized Performance</h2>
              <p className="text-warm-gray text-sm mt-1">Activity-level analysis and next recommendations</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-warm-peach px-3 py-1 text-xs font-semibold text-warm-gray">User A</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
            <div className="rounded-xl bg-white/70 border border-warm-tan p-3 sm:col-span-2">
              <div className="text-xs text-warm-gray mb-1">Accuracy</div>
              <div className="text-2xl font-bold text-saffron font-display">72%</div>
            </div>
            <div className="rounded-xl bg-white/70 border border-warm-tan p-3 sm:col-span-2">
              <div className="text-xs text-warm-gray mb-1">Response time</div>
              <div className="text-2xl font-bold text-forest font-display">8.2 sec</div>
            </div>
            <div className="rounded-xl bg-white/70 border border-warm-tan p-3">
              <div className="text-xs text-warm-gray mb-1">Overall</div>
              <div className="text-lg font-bold text-warm-black">Adaptive</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h3 className="font-semibold text-warm-black mb-3">Performance by activity</h3>
              <div className="space-y-3">
                {[
                  ['Sequence memory', '★★☆☆☆'],
                  ['Visual recognition', '★★★★☆'],
                  ['Music recall', '★★★★★'],
                ].map(([label, score]) => (
                  <div key={label} className="flex items-center justify-between gap-4 rounded-xl bg-white/60 border border-warm-tan px-3 py-2.5">
                    <span className="text-sm font-medium text-warm-black">{label}</span>
                    <span className="text-sm tracking-wide text-saffron" aria-label={`${label}: ${score}`}>{score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-warm-black mb-3">Next recommended activities</h3>
              <div className="space-y-3">
                {[
                  ['🎵', 'Music memory', 'HIGH', 'bg-forest/10 text-forest'],
                  ['🖼️', 'Image matching', 'MEDIUM', 'bg-saffron/10 text-saffron'],
                  ['🔢', 'Sequence recall', 'LOW → MEDIUM', 'bg-kumkum/10 text-kumkum'],
                ].map(([emoji, activity, level, tone]) => (
                  <div key={activity} className="flex items-center gap-3 rounded-xl bg-white/60 border border-warm-tan px-3 py-2.5">
                    <span className="text-xl" aria-hidden="true">{emoji}</span>
                    <span className="flex-1 text-sm font-medium text-warm-black">{activity}</span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${tone}`}>{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-warm-peach/60 border border-warm-tan px-4 py-3 text-sm text-warm-gray">
            Recommendations are based on activity performance and are intended to personalize engagement, not diagnose a medical condition.
          </div>
        </section>

        {/* Recent activity */}
        <section className="bg-cream rounded-2xl border-2 border-warm-tan p-5" style={{ boxShadow: '0 2px 8px rgba(28,13,5,0.07)' }}>
          <h2 className="font-display font-semibold text-warm-black mb-4">{t.recentActivity}</h2>
          <div className="space-y-0">
            {RECENT.map((r, i) => (
              <div
                key={r.name + i}
                className={`flex items-center gap-3 py-3 ${i < RECENT.length - 1 ? 'border-b border-warm-tan' : ''}`}
              >
                <span className="text-2xl">{r.emoji}</span>
                <div className="flex-1">
                  <div className="font-semibold text-warm-black text-sm">{r.name}</div>
                  <div className="text-warm-gray text-xs">{r.when}</div>
                </div>
                <span className="text-forest font-bold text-lg">✓</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ElderLayout>
  )
}
