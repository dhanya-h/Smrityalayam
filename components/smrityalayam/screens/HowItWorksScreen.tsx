import { useApp } from '../AppContext'

const STEPS = [
  {
    n: '1',
    icon: '🎮',
    title: 'Play',
    body: 'Short games mix memory, attention and sequencing with regional stories, food, music and craft.',
  },
  {
    n: '2',
    icon: '🎯',
    title: 'Adapt',
    body: 'Difficulty adjusts on its own, so every session feels achievable rather than frustrating.',
  },
  {
    n: '3',
    icon: '🤝',
    title: 'Connect',
    body: 'Family and caregivers can join a session, or check in on progress from anywhere.',
  },
  {
    n: '4',
    icon: '🏺',
    title: 'Preserve',
    body: 'Every story played becomes part of a growing local archive of language and custom.',
  },
]

const IMPACT = [
  {
    emoji: '🧠',
    title: 'Cognitive well-being',
    color: 'text-saffron',
    border: 'border-saffron-lt',
    bg: 'bg-cream',
    points: [
      'Regular practice with memory, attention and sequencing',
      'Difficulty adjusts so activities stay achievable, not draining',
      'Personalised sessions instead of one-size-fits-all puzzles',
    ],
  },
  {
    emoji: '💛',
    title: 'Emotional well-being',
    color: 'text-kumkum',
    border: 'border-kumkum-lt',
    bg: 'bg-cream',
    points: [
      'Familiar stories and games bring comfort, not clinical routine',
      'A sense of achievement in every completed session',
      'Less boredom than repetitive, generic activities',
    ],
  },
  {
    emoji: '👨‍👩‍👧',
    title: 'Family & caregivers',
    color: 'text-forest',
    border: 'border-forest-lt',
    bg: 'bg-cream',
    points: [
      'Shared activities that create real conversation',
      'Progress that caregivers can see without extra effort',
      'One less thing for families to plan from scratch',
    ],
  },
  {
    emoji: '🪔',
    title: 'Cultural preservation',
    color: 'text-saffron-dk',
    border: 'border-saffron-lt',
    bg: 'bg-cream',
    points: [
      'Local stories, songs and games kept in everyday use',
      'Younger generations introduced to regional heritage',
      'A growing archive of content specific to the Northeast',
    ],
  },
  {
    emoji: '📡',
    title: 'Reach & accessibility',
    color: 'text-warm-gray',
    border: 'border-warm-tan',
    bg: 'bg-cream',
    points: [
      'Built for elders with limited digital experience',
      'Works in low-connectivity areas by design',
      'Physical and digital play, so a screen is never the only option',
    ],
  },
]

export default function HowItWorksScreen() {
  const { navigate } = useApp()

  return (
    <div className="min-h-full bg-parchment">
      {/* Hero header */}
      <div
        className="px-5 pt-10 pb-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #9E4E15 0%, #C96520 45%, #8B1A2E 100%)' }}
      >
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10 bg-white" />
        <div className="absolute bottom-0 left-4 w-32 h-32 rounded-full opacity-10 bg-white" />

        <div className="relative max-w-2xl mx-auto">
          <button
            onClick={() => navigate('elder-home')}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold mb-8 transition-colors"
          >
            ← Back to home
          </button>

          <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">How it works</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            A session that<br />grows with you
          </h1>
          <p className="text-white/75 mt-3 leading-relaxed max-w-sm">
            Four ideas at the heart of every Smrityalayam session.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-8 space-y-10 screen-enter">

        {/* Steps */}
        <section className="space-y-4">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex gap-5 p-5 bg-cream rounded-2xl border-2 border-warm-tan"
              style={{ boxShadow: '0 2px 10px rgba(28,13,5,0.07)' }}
            >
              {/* number badge */}
              <div className="shrink-0 flex flex-col items-center">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-xl text-white"
                  style={{ background: 'linear-gradient(135deg, #C96520, #8B1A2E)' }}
                >
                  {step.n}
                </div>
                {step.n !== '4' && (
                  <div className="w-0.5 flex-1 mt-2 bg-warm-tan rounded-full" style={{ minHeight: '1.5rem' }} />
                )}
              </div>

              <div className="pt-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{step.icon}</span>
                  <h3 className="font-display font-bold text-warm-black text-xl">{step.title}</h3>
                </div>
                <p className="text-warm-gray leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-warm-tan" />
          <span className="text-warm-gray text-xs font-semibold uppercase tracking-widest">Impact</span>
          <div className="flex-1 h-px bg-warm-tan" />
        </div>

        {/* Impact heading */}
        <div className="-mt-4">
          <h2 className="font-display text-2xl font-bold text-warm-black">What changes when someone plays</h2>
        </div>

        {/* Impact cards */}
        <section className="space-y-4 -mt-4">
          {IMPACT.map((item) => (
            <div
              key={item.title}
              className={`p-5 rounded-2xl border-2 ${item.border} ${item.bg}`}
              style={{ boxShadow: '0 2px 10px rgba(28,13,5,0.06)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{item.emoji}</span>
                <h3 className={`font-display font-bold text-lg ${item.color}`}>{item.title}</h3>
              </div>
              <ul className="space-y-2.5">
                {item.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3">
                    <span className={`mt-0.5 shrink-0 text-xs font-bold ${item.color}`}>✦</span>
                    <span className="text-warm-gray leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: 'linear-gradient(135deg, #F5D5B3 0%, #FAF0DC 60%, #F7D9DF 100%)', border: '2px solid #D4B48C' }}
        >
          <div className="text-4xl mb-3">🪷</div>
          <h3 className="font-display font-bold text-warm-black text-xl mb-2">Ready to begin?</h3>
          <p className="text-warm-gray text-sm mb-5 leading-relaxed">Your first session takes just five minutes.</p>
          <button
            onClick={() => navigate('activities')}
            className="px-8 py-3.5 bg-saffron hover:bg-saffron-dk text-white font-bold text-base rounded-xl transition-colors"
          >
            Start an activity →
          </button>
        </div>

        <div className="h-6" />
      </div>
    </div>
  )
}
