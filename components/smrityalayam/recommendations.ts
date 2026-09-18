export interface RecommendationCard {
  id: string
  title: string
  description: string
  interests: string[]
  screen: string
  icon: string
}

const POOL: RecommendationCard[] = [
  {
    id: 'rec-1',
    title: 'Put My Story Together',
    description: 'Arrange your family milestones in chronological sequence.',
    interests: ['family', 'storytelling', 'history'],
    screen: 'story-sequence',
    icon: '🧩',
  },
  {
    id: 'rec-2',
    title: 'Northeast Heritage Match',
    description: 'Pair matching traditional instruments like Duitara and Pena.',
    interests: ['culture', 'music', 'art'],
    screen: 'memory-match',
    icon: '🪷',
  },
  {
    id: 'rec-3',
    title: 'NER Tabletop Strategy',
    description: 'Play classic Jhandi Munda and Sholo Gutti board games.',
    interests: ['games', 'strategy', 'culture'],
    screen: 'tabletop-games',
    icon: '🎲',
  },
  {
    id: 'rec-4',
    title: 'Tell Me About This',
    description: 'Speak out loud to share memories about personal photos.',
    interests: ['family', 'voice', 'recollection'],
    screen: 'voice-recall',
    icon: '🗣️',
  },
  {
    id: 'rec-5',
    title: 'Match Music to Memory',
    description: 'Listen to regional folk melodies associated with family photos.',
    interests: ['music', 'culture', 'family'],
    screen: 'music-recall',
    icon: '🎵',
  },
]

export function getRecommendations(
  userInterests: string[] = [],
  mood?: string
): RecommendationCard[] {
  // Ensure array safety against null or undefined input
  const safeInterests = Array.isArray(userInterests) ? userInterests : []

  const scored = POOL.map((card) => {
    let score = 0

    const interestMatch =
      safeInterests.length === 0 ||
      card.interests.some((i) => safeInterests.includes(i))

    if (interestMatch) score += 3

    // Bonus score for matched interests
    score += card.interests.filter((i) => safeInterests.includes(i)).length

    return { card, score }
  })

  // Sort by highest score first
  scored.sort((a, b) => b.score - a.score)

  return scored.slice(0, 3).map((item) => item.card)
}