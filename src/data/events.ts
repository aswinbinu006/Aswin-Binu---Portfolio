export interface PhotoPlaceholder {
  id: string;
  caption: string;
  aspect: 'landscape' | 'portrait' | 'square';
}

export interface EventItem {
  id: string;
  title: string;
  year: string;
  summary: string;
  image: string;
  tags: string[];
  posterAspect: 'portrait' | 'tall' | 'wide' | 'square';
  story: string;
  role: string;
  teamSize: string;
  participantCount: string;
  photoPlaceholders: PhotoPlaceholder[];
  motif: 'escape' | 'stranger' | 'hackathon' | 'workshop' | 'blockchain' | 'creative' | 'defense';
}

export const events: EventItem[] = [
  {
    id: 'tech-escape',
    title: 'Tech Escape',
    year: '2024',
    summary: 'Hardware-locked escape room challenge deciphering microcontroller payloads.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    tags: ['Hardware', 'Embedded C', 'Labyrinth'],
    posterAspect: 'portrait',
    story:
      'A timed technical labyrinth where participants solved embedded system puzzles, signal decoding challenges, and hardware faults to unlock progressive terminal locks.',
    role: 'Lead Technical Coordinator & Puzzle Architect',
    teamSize: '8 Organizers',
    participantCount: '120+ Engineers',
    photoPlaceholders: [
      { id: 'te-1', caption: 'Hardware decipher station 01', aspect: 'landscape' },
      { id: 'te-2', caption: 'Microcontroller circuit puzzle', aspect: 'square' },
      { id: 'te-3', caption: 'Live terminal timer countdown', aspect: 'portrait' },
    ],
    motif: 'escape',
  },
  {
    id: 'stranger-tech',
    title: 'Stranger Tech',
    year: '2024',
    summary: '80s retro-futuristic hack event investigating mysterious corrupted datastreams.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
    tags: ['Reverse Eng', 'Synthwave', 'Cryptography'],
    posterAspect: 'tall',
    story:
      'Inspired by nostalgic synthwave aesthetics, teams worked through progressive reverse-engineering problems to decrypt simulated covert radio transmissions.',
    role: 'Head of Infrastructure & Narrative Design',
    teamSize: '12 Organizers',
    participantCount: '180+ Participants',
    photoPlaceholders: [
      { id: 'st-1', caption: 'Synthwave CRT station setup', aspect: 'landscape' },
      { id: 'st-2', caption: 'Decrypting corrupted hex payload', aspect: 'landscape' },
    ],
    motif: 'stranger',
  },
  {
    id: 'sitnovate',
    title: 'SITNovate',
    year: '2023',
    summary: 'Flagship 36-hour technical innovation hackathon with enterprise mentors.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop',
    tags: ['Hackathon', 'AI/IoT', '36 Hours'],
    posterAspect: 'wide',
    story:
      'Inter-college flagship innovation forum hosting multi-track development across AI, IoT, and edge infrastructure with real-time judge scoring.',
    role: 'Core Technical Lead & Judge Liaison',
    teamSize: '20 Core Committee',
    participantCount: '350+ Hackers',
    photoPlaceholders: [
      { id: 'sn-1', caption: 'Auditorium pitch showcase', aspect: 'landscape' },
      { id: 'sn-2', caption: 'Midnight debugging marathon', aspect: 'landscape' },
      { id: 'sn-3', caption: 'Award ceremony & evaluation', aspect: 'square' },
    ],
    motif: 'hackathon',
  },
  {
    id: 'ieee-workshops',
    title: 'IEEE Workshops',
    year: '2023 - 2024',
    summary: 'Hands-on engineering masterclasses on deep learning and edge deployment.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    tags: ['TensorRT', 'Edge ML', 'Masterclass'],
    posterAspect: 'portrait',
    story:
      'Intensive practical laboratory sessions guiding undergraduate engineers from tensor math fundamentals to real-time inference on edge microcontrollers.',
    role: 'Key Speaker & Laboratory Instructor',
    teamSize: '4 Instructors',
    participantCount: '250+ Attendees across 4 sessions',
    photoPlaceholders: [
      { id: 'iw-1', caption: 'TensorRT hands-on demo', aspect: 'landscape' },
      { id: 'iw-2', caption: 'Hardware bench diagnostics', aspect: 'square' },
    ],
    motif: 'workshop',
  },
  {
    id: 'blockchain-money',
    title: 'Blockchain = Money',
    year: '2023',
    summary: 'Deep-dive consensus seminar exploring cryptographic security and smart contracts.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop',
    tags: ['Zero-Knowledge', 'EVM', 'Consensus'],
    posterAspect: 'square',
    story:
      'A pragmatic deconstruction of zero-knowledge rollups, EVM internals, and decentralized financial protocols beyond speculative market hype.',
    role: 'Event Co-Organizer & Moderator',
    teamSize: '6 Organizers',
    participantCount: '90+ Attendees',
    photoPlaceholders: [
      { id: 'bm-1', caption: 'Panelist cryptographic dispute', aspect: 'landscape' },
      { id: 'bm-2', caption: 'Smart contract audit breakdown', aspect: 'portrait' },
    ],
    motif: 'blockchain',
  },
  {
    id: 'vibe-to-reality',
    title: 'Vibe to Reality',
    year: '2024',
    summary: 'Rapid ideation sprint transforming loose sketches into working prototypes in 8 hours.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop',
    tags: ['Rapid Sprint', '8 Hours', 'Prototyping'],
    posterAspect: 'wide',
    story:
      'Design-to-code sprint where multidisciplinary teams were paired with strict hardware constraints to build proof-of-concepts before sunset.',
    role: 'Curator & Mentor Lead',
    teamSize: '5 Mentors',
    participantCount: '85 Creators',
    photoPlaceholders: [
      { id: 'vr-1', caption: 'Paper architecture sketching', aspect: 'landscape' },
      { id: 'vr-2', caption: 'Proof-of-concept sprint board', aspect: 'landscape' },
    ],
    motif: 'creative',
  },
  {
    id: 'doomsday-protocol',
    title: 'Doomsday Protocol',
    year: '2024',
    summary: 'Cyber-defense red team simulation under simulated total network failure.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    tags: ['Red Team', 'Mesh Radio', 'Defense'],
    posterAspect: 'tall',
    story:
      'Adversarial infrastructure resilience simulation testing offline command chains, encrypted radio mesh handshakes, and Byzantine fault tolerance.',
    role: 'Red Team Architect & Scenario Author',
    teamSize: '7 Systems Engineers',
    participantCount: '60 Advanced Competitors',
    photoPlaceholders: [
      { id: 'dp-1', caption: 'Command room dark operations', aspect: 'landscape' },
      { id: 'dp-2', caption: 'Mesh network signal analysis', aspect: 'square' },
      { id: 'dp-3', caption: 'Attack vector triage terminal', aspect: 'portrait' },
    ],
    motif: 'defense',
  },
];
