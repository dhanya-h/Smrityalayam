export type NERState =
  | 'Assam'
  | 'Arunachal Pradesh'
  | 'Manipur'
  | 'Meghalaya'
  | 'Mizoram'
  | 'Nagaland'
  | 'Sikkim'
  | 'Tripura'

export interface NERMemory {
  id: string
  state: NERState
  title: string
  prompt: string
  emoji: string
  items: string[]
}

export interface NERFood {
  state: NERState
  name: string
  emoji: string
  description: string
}

export interface NERFestival {
  state: NERState
  name: string
  emoji: string
  description: string
  sequence: string[]
}

export interface NERGame {
  state: NERState
  name: string
  emoji: string
  description: string
}

export interface NERMusic {
  state: NERState
  tradition: string
  emoji: string
  instrument: string
  description: string
  pattern: number[]
}

/**
 * Cultural content for the eight states of Northeast India.
 *
 * This is intentionally framed as memory/engagement material rather than
 * medical or diagnostic content. Some foods, festivals and musical traditions
 * are community-specific; the UI therefore identifies the state/community
 * context instead of implying that every elder has experienced every item.
 */
export const NER_STATES: { id: NERState; emoji: string; description: string }[] = [
  { id: 'Assam', emoji: '🌾', description: 'Bihu, pitha, pepa and dhol traditions' },
  { id: 'Arunachal Pradesh', emoji: '🏔️', description: 'Nyokum, Mopin, Solung and diverse tribal traditions' },
  { id: 'Manipur', emoji: '🦌', description: 'Yaoshang, Lai Haraoba, Pung Cholom and Sagol Kangjei' },
  { id: 'Meghalaya', emoji: '🥁', description: 'Wangala, Khasi/Jaintia/Garo traditions and local foods' },
  { id: 'Mizoram', emoji: '🎋', description: 'Chapchar Kut, Cheraw and Mizo food traditions' },
  { id: 'Nagaland', emoji: '🦅', description: 'Hornbill, folk traditions, music and indigenous games' },
  { id: 'Sikkim', emoji: '🏔️', description: 'Losar, Pang Lhabsol and Sikkimese/Himalayan foods' },
  { id: 'Tripura', emoji: '🌿', description: 'Garia, Mui Borok and Tripuri traditions' },
]

export const NER_FESTIVALS: NERFestival[] = [
  {
    state: 'Assam',
    name: 'Bihu',
    emoji: '🌾',
    description: 'Assamese seasonal celebrations including Bohag/Rongali Bihu, with song, dance, dhol and pepa.',
    sequence: ['Preparing for the celebration', 'Bihu songs and pepa/dhol', 'Community dance and gathering', 'Sharing festive foods'],
  },
  {
    state: 'Arunachal Pradesh',
    name: 'Nyokum',
    emoji: '🏔️',
    description: 'A major Nyishi community festival associated with prayers, community gathering and traditional performances.',
    sequence: ['Community prepares the festival space', 'Prayers and traditional ceremony', 'Songs, dances and gathering', 'Community meal and celebration'],
  },
  {
    state: 'Arunachal Pradesh',
    name: 'Mopin',
    emoji: '🌿',
    description: 'A Galo community festival with songs, dances and community participation.',
    sequence: ['Festival preparation', 'Community ritual', 'Traditional songs and dance', 'Feasting and visiting'],
  },
  {
    state: 'Manipur',
    name: 'Yaoshang',
    emoji: '🌸',
    description: 'A spring festival in Manipur known for community participation, cultural programmes and sports.',
    sequence: ['Festival begins', 'Community visits and celebration', 'Games and cultural activities', 'Music, dance and gathering'],
  },
  {
    state: 'Manipur',
    name: 'Lai Haraoba',
    emoji: '🌺',
    description: 'A Meitei cultural festival featuring ritual traditions, dance and music.',
    sequence: ['Preparations and ritual setting', 'Traditional ceremony', 'Maibi dances and music', 'Community celebration'],
  },
  {
    state: 'Meghalaya',
    name: 'Wangala',
    emoji: '🥁',
    description: 'Garo harvest festival associated with thanksgiving, drums, dancing and community celebration.',
    sequence: ['Harvest is completed', 'Ragula ceremony', 'Nagra drums and Wangala dance', 'Community food and celebration'],
  },
  {
    state: 'Mizoram',
    name: 'Chapchar Kut',
    emoji: '🎋',
    description: 'Mizo spring festival associated with community celebration, music, dance and traditional games.',
    sequence: ['Community prepares for the festival', 'Traditional gathering', 'Cheraw and cultural performances', 'Games, food and celebration'],
  },
  {
    state: 'Nagaland',
    name: 'Hornbill Festival',
    emoji: '🦅',
    description: 'A major cultural festival bringing together traditions, music, food and indigenous games from Nagaland.',
    sequence: ['Arrive at the festival', 'Traditional performances', 'Taste local foods', 'Watch games and meet communities'],
  },
  {
    state: 'Sikkim',
    name: 'Losar',
    emoji: '🏔️',
    description: 'Tibetan Buddhist New Year traditions observed in Sikkim with prayers, gatherings and cultural activities.',
    sequence: ['Clean and prepare the home', 'Prayers and monastery traditions', 'Family/community gathering', 'Festive food and greetings'],
  },
  {
    state: 'Sikkim',
    name: 'Pang Lhabsol',
    emoji: '⛰️',
    description: 'A Sikkim festival associated with Khangchendzonga and traditional masked dances.',
    sequence: ['Festival preparations', 'Prayers and offerings', 'Traditional masked dance', 'Community gathering'],
  },
  {
    state: 'Tripura',
    name: 'Garia Puja',
    emoji: '🌿',
    description: 'An important Tripuri festival associated with prayer, community traditions and seasonal life.',
    sequence: ['Prepare the ritual space', 'Garia ceremony', 'Traditional songs and activities', 'Family/community gathering'],
  },
]

export const NER_FOODS: NERFood[] = [
  { state: 'Assam', name: 'Til Pitha', emoji: '🥞', description: 'A rice-based Assamese pitha filled with sesame and jaggery.' },
  { state: 'Assam', name: 'Ghila Pitha', emoji: '🍘', description: 'A traditional Assamese rice-and-jaggery pitha.' },
  { state: 'Assam', name: 'Masor Tenga', emoji: '🐟', description: 'A light, tangy Assamese fish preparation.' },
  { state: 'Assam', name: 'Jolpaan', emoji: '🍚', description: 'A traditional Assamese breakfast/snacking spread with regional rice preparations.' },
  { state: 'Arunachal Pradesh', name: 'Bamboo-cooked food', emoji: '🎋', description: 'Cooking in bamboo is practiced in several Arunachal communities; dishes vary by community.' },
  { state: 'Arunachal Pradesh', name: 'Thukpa', emoji: '🍜', description: 'A noodle soup widely eaten in Himalayan parts of Arunachal Pradesh.' },
  { state: 'Manipur', name: 'Eromba', emoji: '🌶️', description: 'A well-known Manipuri preparation made with vegetables and fermented fish in many versions.' },
  { state: 'Manipur', name: 'Singju', emoji: '🥗', description: 'A Manipuri salad preparation made with vegetables and herbs.' },
  { state: 'Manipur', name: 'Nga-thongba', emoji: '🐟', description: 'A traditional Manipuri fish curry/preparation.' },
  { state: 'Meghalaya', name: 'Jadoh', emoji: '🍚', description: 'A Khasi rice-and-meat dish, with variations across households.' },
  { state: 'Meghalaya', name: 'Doh Khlieh', emoji: '🥗', description: 'A Khasi pork salad/preparation traditionally served in different local variations.' },
  { state: 'Meghalaya', name: 'Putharo', emoji: '🫓', description: 'A traditional Khasi steamed rice cake.' },
  { state: 'Mizoram', name: 'Bai', emoji: '🥬', description: 'A Mizo vegetable-based dish with many household variations.' },
  { state: 'Mizoram', name: 'Sawhchiar', emoji: '🍚', description: 'A Mizo rice-and-meat dish prepared in regional variations.' },
  { state: 'Nagaland', name: 'Smoked pork', emoji: '🥩', description: 'A prominent ingredient in many Naga cuisines, prepared differently among tribes.' },
  { state: 'Nagaland', name: 'Bamboo shoot dishes', emoji: '🎋', description: 'Bamboo shoot is an important ingredient across many Naga food traditions.' },
  { state: 'Nagaland', name: 'Naga king chilli', emoji: '🌶️', description: 'A chilli associated with Nagaland and used in regional foods.' },
  { state: 'Sikkim', name: 'Momo', emoji: '🥟', description: 'Steamed dumplings popular across Sikkim and Himalayan food culture.' },
  { state: 'Sikkim', name: 'Thukpa', emoji: '🍜', description: 'A warm noodle soup common in Sikkim and Himalayan cuisine.' },
  { state: 'Sikkim', name: 'Phagshapa', emoji: '🥩', description: 'A traditional Sikkimese pork dish with radish and chilli.' },
  { state: 'Tripura', name: 'Mui Borok', emoji: '🍲', description: 'A term used for Tripuri traditional cuisine and food culture.' },
  { state: 'Tripura', name: 'Muya Awandru', emoji: '🎋', description: 'A Tripuri bamboo-shoot and rice-flour preparation.' },
  { state: 'Tripura', name: 'Gudok', emoji: '🍲', description: 'A traditional Tripuri dish prepared with local ingredients; versions vary by household.' },
  { state: 'Tripura', name: 'Mosdeng Serma', emoji: '🌶️', description: 'A Tripuri chutney/relish traditionally prepared with local ingredients.' },
]

export const NER_GAMES: NERGame[] = [
  { state: 'Assam', name: 'Dhopkhel', emoji: '🏃', description: 'A traditional Assamese team game involving a ball and a marked playing area.' },
  { state: 'Manipur', name: 'Sagol Kangjei', emoji: '🐎', description: 'The traditional Manipuri form of polo, played on horseback.' },
  { state: 'Manipur', name: 'Mukna', emoji: '🤼', description: 'A traditional Manipuri wrestling form.' },
  { state: 'Manipur', name: 'Yubi Lakpi', emoji: '🏉', description: 'A traditional Manipuri contact ball game played as a cultural sport.' },
  { state: 'Meghalaya', name: 'Ka Iasiat Thong', emoji: '🎯', description: 'A traditional archery-related sport/game associated with Meghalaya.' },
  { state: 'Mizoram', name: 'Inbuan', emoji: '🤼', description: 'A traditional Mizo wrestling sport.' },
  { state: 'Mizoram', name: 'Inuknawr', emoji: '🏃', description: 'A traditional Mizo game/sport associated with community recreation.' },
  { state: 'Nagaland', name: 'Naga wrestling', emoji: '🤼', description: 'Traditional wrestling practiced in several Naga communities, with local rules and styles.' },
  { state: 'Sikkim', name: 'Traditional archery', emoji: '🏹', description: 'Archery has a longstanding place in Himalayan and Sikkimese community traditions.' },
  { state: 'Tripura', name: 'Gella Chutt', emoji: '🏃', description: 'A traditional Tripuri game documented among indigenous sports and games.' },
  { state: 'Arunachal Pradesh', name: 'Hinam', emoji: '🎯', description: 'A traditional indigenous game documented among Arunachal Pradesh community sports.' },
]

export const NER_MUSIC: NERMusic[] = [
  { state: 'Assam', tradition: 'Bihu music', emoji: '🥁', instrument: 'Dhol & pepa', description: 'Festive Bihu sound associated with Assamese song, dance and celebration.', pattern: [1,0,1,1,0,1] },
  { state: 'Manipur', tradition: 'Pung Cholom', emoji: '🥁', instrument: 'Pung', description: 'A dynamic Manipuri drum tradition combining rhythm and movement.', pattern: [1,1,0,1,0,1] },
  { state: 'Meghalaya', tradition: 'Wangala drumming', emoji: '🥁', instrument: 'Nagra/drums', description: 'Drumming is central to Wangala festival performances.', pattern: [1,0,1,0,1,1] },
  { state: 'Mizoram', tradition: 'Cheraw/Kut music', emoji: '🎋', instrument: 'Community percussion & song', description: 'Music and song accompany Mizo cultural dances and festival gatherings.', pattern: [1,0,0,1,1,0] },
  { state: 'Nagaland', tradition: 'Naga folk song', emoji: '🎶', instrument: 'Voice & community instruments', description: 'Folk songs and community music are important parts of Naga cultural traditions.', pattern: [1,1,0,0,1,1] },
  { state: 'Sikkim', tradition: 'Festival/monastery music', emoji: '🔔', instrument: 'Ceremonial instruments', description: 'Religious and festival traditions in Sikkim include distinctive ceremonial music.', pattern: [1,0,1,0,0,1] },
  { state: 'Tripura', tradition: 'Tripuri folk traditions', emoji: '🎶', instrument: 'Community percussion & song', description: 'Tripuri communities maintain traditional songs, dances and musical practices.', pattern: [1,0,1,1,1,0] },
  { state: 'Arunachal Pradesh', tradition: 'Community festival songs', emoji: '🎶', instrument: 'Local community instruments', description: 'Arunachal Pradesh has many distinct musical traditions across its indigenous communities.', pattern: [1,1,0,1,1,0] },
]

export const NER_MEMORIES: NERMemory[] = [
  { id: 'assam-bihu', state: 'Assam', title: 'A Bihu morning', prompt: 'Imagine a Bihu morning. Put these familiar moments in order.', emoji: '🌾', items: ['Preparing for the celebration', 'Hearing dhol and pepa', 'Joining the community gathering', 'Sharing festive food'] },
  { id: 'assam-pitha', state: 'Assam', title: 'Pitha at home', prompt: 'Can you remember the order of a festive Assamese meal?', emoji: '🥞', items: ['Rice preparation', 'Making pitha', 'Adding sesame and jaggery', 'Sharing with family'] },
  { id: 'arunachal-nyokum', state: 'Arunachal Pradesh', title: 'A Nyokum gathering', prompt: 'Reconstruct this community festival memory.', emoji: '🏔️', items: ['Preparing the gathering space', 'Traditional ceremony', 'Songs and dance', 'Community meal'] },
  { id: 'arunachal-bamboo', state: 'Arunachal Pradesh', title: 'Cooking with bamboo', prompt: 'Remember the steps in a traditional bamboo-cooking scene.', emoji: '🎋', items: ['Prepare local ingredients', 'Prepare the bamboo', 'Cook over the fire', 'Share the meal'] },
  { id: 'manipur-yaoshang', state: 'Manipur', title: 'Yaoshang evening', prompt: 'Put this spring-festival memory in order.', emoji: '🌸', items: ['Festival gathering', 'Community activities', 'Games and cultural events', 'Music and celebration'] },
  { id: 'manipur-pung', state: 'Manipur', title: 'The sound of the pung', prompt: 'Remember this musical sequence.', emoji: '🥁', items: ['Quiet beginning', 'First drum pattern', 'Faster rhythm', 'Group performance'] },
  { id: 'meghalaya-wangala', state: 'Meghalaya', title: 'Wangala drums', prompt: 'Put a Wangala celebration in order.', emoji: '🥁', items: ['Harvest completed', 'Ragula ceremony', 'Nagra drums and dance', 'Community feast'] },
  { id: 'meghalaya-jadoh', state: 'Meghalaya', title: 'A family meal in Meghalaya', prompt: 'Which foods belong together in this memory?', emoji: '🍚', items: ['Jadoh', 'Doh Khlieh', 'Putharo', 'Tea and conversation'] },
  { id: 'mizoram-chapchar', state: 'Mizoram', title: 'Chapchar Kut', prompt: 'Rebuild this festival scene.', emoji: '🎋', items: ['Community preparation', 'Festival gathering', 'Cheraw and cultural performances', 'Food and games'] },
  { id: 'nagaland-hornbill', state: 'Nagaland', title: 'A Hornbill day', prompt: 'Remember a day at a cultural festival.', emoji: '🦅', items: ['Arrive at the festival', 'Watch traditional performances', 'Taste local food', 'See indigenous games'] },
  { id: 'sikkim-losar', state: 'Sikkim', title: 'Losar at home', prompt: 'Put this New Year memory in order.', emoji: '🏔️', items: ['Clean and prepare the home', 'Prayers and greetings', 'Family gathering', 'Festive food'] },
  { id: 'tripura-garia', state: 'Tripura', title: 'Garia festival', prompt: 'Reconstruct this Tripuri festival memory.', emoji: '🌿', items: ['Prepare the ritual space', 'Garia ceremony', 'Traditional songs and activities', 'Family gathering'] },
]
