// components/smrityalayam/memoryEngine.ts

export interface MediaAsset {
  id: string;
  url: string;
  caption: string;
  dateCreated?: string;
  location?: string;
  associatedPeople?: string[];
}

export interface MemoryCapsule {
  id: string;
  title: string;
  era: string; // e.g., "1982 - Guwahati Home"
  location: string;
  culturalTags: string[]; // e.g., ['Bihu', 'Pitha', 'Dhol']
  photos: MediaAsset[];
  familyAudioUrl?: string;
  associatedMusicGenre?: string; // e.g., "Assamese Tokari Geet"
  storyFragments: string[];
  caregiverVerified: boolean;
}

export interface MemoryProfile {
  elderId: string;
  scores: {
    photoRecognition: number; // 0 - 100
    chronologicalSequencing: number;
    voiceRecall: number;
    musicAssociation: number;
  };
  preferredTopics: string[];
}