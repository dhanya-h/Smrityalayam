'use client'

import { useState } from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useT, useLang } from '../useT'
import { useApp } from '../AppContext'

export default function ActivitiesScreen() {
  const { navigate } = useApp()
  const t = useT()
  const lang = useLang()
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const getTitle = () => {
    if (lang === 'hi') return 'मानसिक अभ्यास और खेल'
    if (lang === 'as') return 'মানসিক ব্যায়াম আৰু খেলসমূহ'
    if (lang === 'bn') return 'মানসিক ব্যায়াম ও খেলাসমূহ'
    return t?.activitiesTitle || 'Cognitive Exercises & Regional Games'
  }

  const getSub = () => {
    if (lang === 'hi') return 'अपने दैनिक दिमागी अभ्यास के लिए कोई भी खेल चुनें।'
    if (lang === 'as') return 'আপোনাৰ দৈনিক মানসিক ব্যায়ামৰ বাবে খেল বাছনি কৰক।'
    if (lang === 'bn') return 'আপনার দৈনিক মানসিক চর্চার জন্য খেলা বেছে নিন।'
    return t?.activitiesSub || 'Choose an activity tailored to personal memories and Northeast regional culture.'
  }

  const categories = [
    { id: 'all', label: lang === 'hi' ? 'सभी' : 'All' },
    { id: 'memory', label: lang === 'hi' ? 'स्मृति' : 'Personal Memory' },
    { id: 'attention', label: lang === 'hi' ? 'ध्यान' : 'Focus & Attention' },
    { id: 'culture', label: lang === 'hi' ? 'संस्कृति' : 'NER Culture' },
    { id: 'tabletop', label: lang === 'hi' ? 'पारंपरिक खेल' : 'Traditional Games' },
  ]

  const games = [
    {
      id: 'story-sequence',
      icon: '🧩',
      title: lang === 'hi' ? 'मेरी कहानी का क्रम' : 'Put My Story Together',
      desc: lang === 'hi' ? 'अपने जीवन की घटनाओं और पारिवारिक तस्वीरों को सही क्रम में लगाएं।' : 'Chronological sequencing exercise built from family memory capsules.',
      duration: '5 min',
      category: 'memory',
      tag: 'Flagship USP',
      screen: 'story-sequence',
    },
    {
      id: 'focus-game',
      icon: '🎯',
      title: lang === 'hi' ? 'एकाग्रता परीक्षण' : 'Focus & Selective Attention',
      desc: lang === 'hi' ? 'CogniFit आधारित ध्यान अभ्यास। सही प्रतीकों पर तुरंत टैप करें।' : 'CogniFit-inspired visual target tracking and spatial focus session.',
      duration: '3 min',
      category: 'attention',
      tag: 'CogniFit Test',
      screen: 'focus-game',
    },
    {
      id: 'sorting-game',
      icon: '🍲',
      title: lang === 'hi' ? 'पूर्वांचल व्यंजन अनुक्रम' : 'NER Culinary Sequencing',
      desc: lang === 'hi' ? 'माछर टेंगा और एरोम्बा जैसे पारंपरिक व्यंजनों को सही क्रम में सजाएं।' : 'Sequence authentic regional recipes like Masor Tenga and Eromba.',
      duration: '4 min',
      category: 'culture',
      tag: 'Regional',
      screen: 'sorting-game',
    },
    {
      id: 'memory-match',
      icon: '🪷',
      title: lang === 'hi' ? 'पूर्वांचल विरासत मैच' : 'Northeast Heritage Match',
      desc: lang === 'hi' ? 'जापी, पेना ढोल और दुईतारा जैसे सांस्कृतिक प्रतीकों के जोड़े मिलाएं।' : 'Match pairs of traditional Northeast instruments and crafts.',
      duration: '5 min',
      category: 'culture',
      tag: 'NER Heritage',
      screen: 'memory-match',
    },
    {
      id: 'tabletop-games',
      icon: '🎲',
      title: lang === 'hi' ? 'पारंपरिक टेबलटॉप खेल' : 'NER Tabletop & Strategy',
      desc: lang === 'hi' ? 'झंडी मुंडा, शोलो गुट्टी (16 मोती) और सोलाइमानी खेलें।' : 'Engage with Jhandi Munda, Sholo Gutti (16 Beads), and Solaimani board strategy.',
      duration: '5 min',
      category: 'tabletop',
      tag: 'Traditional',
      screen: 'tabletop-games',
    },
    {
      id: 'voice-recall',
      icon: '🗣️',
      title: lang === 'hi' ? 'बोलकर यादें बताएं' : 'Tell Me About This',
      desc: lang === 'hi' ? 'पारिवारिक फोटो देखकर अपनी बोली में बोलकर यादें साझा करें।' : 'Speak naturally to share memories about personal photos.',
      duration: '4 min',
      category: 'memory',
      tag: 'Voice AI',
      screen: 'voice-recall',
    },
    {
      id: 'music-recall',
      icon: '🎵',
      title: lang === 'hi' ? 'संगीत और यादें' : 'Match Music to Memory',
      desc: lang === 'hi' ? 'लोक धुनें सुनें और पारिवारिक यादों के साथ सही संगीत का मिलान करें।' : 'Pair regional folk melodies with family memory capsules.',
      duration: '5 min',
      category: 'culture',
      tag: 'Acoustic',
      screen: 'music-recall',
    },
  ]

  const filteredGames = activeCategory === 'all'
    ? games
    : games.filter((g) => g.category === activeCategory)

  return (
    <ElderLayout active="activities">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Screen Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-maroon">
              {getTitle()}
            </h1>
            <p className="text-warm-gray text-sm mt-1">
              {getSub()}
            </p>
          </div>
          <ReadAloudButton textToRead={`${getTitle()}. ${getSub()}`} />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-saffron text-white shadow-sm'
                    : 'bg-cream border border-warm-tan text-warm-black hover:bg-warm-peach'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => navigate(game.screen as any)}
              className="bg-cream border-2 border-warm-tan hover:border-maroon rounded-2xl p-6 cursor-pointer transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl">{game.icon}</span>
                  <span className="text-[10px] font-bold px-3 py-1 bg-warm-peach text-maroon rounded-full border border-warm-tan">
                    {game.tag} • {game.duration}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-maroon">{game.title}</h3>
                <p className="text-warm-gray text-xs mt-2 leading-relaxed">
                  {game.desc}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-warm-tan flex justify-between items-center">
                <span className="text-xs font-bold text-saffron">
                  {lang === 'hi' ? 'अभ्यास शुरू करें ➔' : 'Start Activity ➔'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ElderLayout>
  )
}