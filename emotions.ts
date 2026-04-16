// lib/emotions.ts

export type EmotionId =
  | 'joy' | 'sad' | 'angry' | 'lethargic'
  | 'excited' | 'stressed' | 'calm'
  | 'depressed' | 'thrilled' | 'exhausted'

export interface EmotionAction {
  icon: string
  title: string
  description: string
  url: string       // 딥링크 or 웹 URL
  isPrimary: boolean
  appName: string   // "배달의 민족" | "토스" | ...
}

export interface Emotion {
  id: EmotionId
  label: string
  icon: string
  themeColor: string   // CSS hex
  bgColor: string      // 다크 배경
  orb1Color: string
  orb2Color: string
  headline: string     // 감정별 핵심 멘트
  description: string  // 서브 설명
  actions: EmotionAction[]
  savingsMode: boolean
  suggestedSavings?: number  // 저축 추천액 (원)
}

export const EMOTIONS: Record<EmotionId, Emotion> = {
  joy: {
    id: 'joy',
    label: '기쁨',
    icon: '😄',
    themeColor: '#FFD93D',
    bgColor: '#1a1600',
    orb1Color: '#FFD93D',
    orb2Color: '#FF6B35',
    headline: '이 행복을 미래의 나에게 선물하세요.',
    description: '기쁜 순간은 저축의 최적 타이밍! 좋은 기분일 때 결정한 저축은 오래 지속돼요.',
    savingsMode: true,
    suggestedSavings: 5000,
    actions: [
      {
        icon: '🐷', title: '5,000원 저축하기',
        description: '토스 자동이체 바로 설정',
        url: 'supertoss://home', appName: '토스', isPrimary: true,
      },
      {
        icon: '🎁', title: '선물 저축 챌린지 시작',
        description: '미래의 나에게 선물 보내기',
        url: 'supertoss://savings', appName: '토스', isPrimary: false,
      },
    ],
  },

  sad: {
    id: 'sad',
    label: '슬픔',
    icon: '😢',
    themeColor: '#74B9FF',
    bgColor: '#000f1a',
    orb1Color: '#74B9FF',
    orb2Color: '#a29bfe',
    headline: '따뜻한 위로가 필요한 날이에요.',
    description: '달달한 디저트 한 입이 마음을 달래줄 수 있어요. 단, 감정 과소비는 No!',
    savingsMode: false,
    actions: [
      {
        icon: '🍮', title: '위로 디저트 주문하기',
        description: '배달의 민족에서 카페 디저트',
        url: 'baemin://home?category=dessert', appName: '배달의 민족', isPrimary: true,
      },
      {
        icon: '🫧', title: '감정 가계부 기록하기',
        description: '슬픔을 기록하면 마음이 가벼워져요',
        url: 'supertoss://home', appName: '토스', isPrimary: false,
      },
    ],
  },

  angry: {
    id: 'angry',
    label: '분노',
    icon: '😤',
    themeColor: '#FF6B6B',
    bgColor: '#1a0000',
    orb1Color: '#FF6B6B',
    orb2Color: '#fd7979',
    headline: '매운 음식으로 스트레스를 날려버리세요!',
    description: '분노 에너지를 맛있는 것으로 승화시켜요. 엽기떡볶이 한 판이면 충분해요.',
    savingsMode: false,
    actions: [
      {
        icon: '🌶️', title: '엽기떡볶이 주문하기',
        description: '배달의 민족에서 엽떡 바로가기',
        url: 'baemin://home?query=엽기떡볶이', appName: '배달의 민족', isPrimary: true,
      },
      {
        icon: '💪', title: '분노 저축하기',
        description: '화날 때 1,000원 저축 — 진짜 효과있어요',
        url: 'supertoss://savings', appName: '토스', isPrimary: false,
      },
    ],
  },

  lethargic: {
    id: 'lethargic',
    label: '무기력',
    icon: '😴',
    themeColor: '#A29BFE',
    bgColor: '#0d0014',
    orb1Color: '#A29BFE',
    orb2Color: '#6c5ce7',
    headline: '에너지를 충전할 시간이에요.',
    description: '카페인 한 잔과 좋은 음악이 당신을 깨워줄 거예요. 일단 작은 것 하나만.',
    savingsMode: false,
    actions: [
      {
        icon: '☕', title: '카페 배달 주문하기',
        description: '요기요 카페 음료 빠른배달',
        url: 'yogiyo://home?category=cafe', appName: '요기요', isPrimary: true,
      },
      {
        icon: '🌱', title: '무기력 극복 저축',
        description: '작은 목표로 동기부여 저축 시작',
        url: 'supertoss://savings', appName: '토스', isPrimary: false,
      },
    ],
  },

  excited: {
    id: 'excited',
    label: '설렘',
    icon: '🥰',
    themeColor: '#FD79A8',
    bgColor: '#1a0010',
    orb1Color: '#FD79A8',
    orb2Color: '#e84393',
    headline: '설레는 마음으로 특별한 경험을 만들어요!',
    description: '설렘은 투자할 가치가 있어요. 오늘 특별한 경험에 합리적으로 써보세요.',
    savingsMode: false,
    actions: [
      {
        icon: '🌸', title: '특별한 레스토랑 예약',
        description: '캐치테이블에서 분위기 있는 곳 찾기',
        url: 'https://catchtable.co.kr', appName: '캐치테이블', isPrimary: true,
      },
      {
        icon: '💝', title: '설렘 저축 시작',
        description: '설레는 여행/경험을 위한 목표 저축',
        url: 'supertoss://savings', appName: '토스', isPrimary: false,
      },
    ],
  },

  stressed: {
    id: 'stressed',
    label: '스트레스',
    icon: '😰',
    themeColor: '#FDCB6E',
    bgColor: '#150f00',
    orb1Color: '#FDCB6E',
    orb2Color: '#e17055',
    headline: '스트레스를 현명하게 해소해요.',
    description: '스트레스성 과소비 주의! 잠깐 멈추고 진짜 필요한 것인지 체크해봐요.',
    savingsMode: false,
    actions: [
      {
        icon: '🍜', title: '위로 라멘 주문하기',
        description: '쿠팡이츠 라멘/라면 카테고리',
        url: 'coupangeats://home?query=라멘', appName: '쿠팡이츠', isPrimary: true,
      },
      {
        icon: '🧘', title: '스트레스 방어 저축',
        description: '충동구매 대신 저축 — 10,000원',
        url: 'supertoss://savings', appName: '토스', isPrimary: false,
      },
    ],
  },

  calm: {
    id: 'calm',
    label: '평온',
    icon: '😌',
    themeColor: '#55EFC4',
    bgColor: '#001a10',
    orb1Color: '#55EFC4',
    orb2Color: '#00b894',
    headline: '평온한 지금이 재정 계획의 최적 타이밍!',
    description: '감정적 판단 없이 재정 계획을 세울 수 있는 가장 좋은 상태예요.',
    savingsMode: true,
    suggestedSavings: 3000,
    actions: [
      {
        icon: '📊', title: '이번 달 예산 계획하기',
        description: '토스 머니 관리로 스마트한 계획',
        url: 'supertoss://money', appName: '토스', isPrimary: true,
      },
      {
        icon: '🌿', title: '평온 습관 저축',
        description: '매일 3,000원 자동저축 설정하기',
        url: 'supertoss://savings', appName: '토스', isPrimary: false,
      },
    ],
  },

  depressed: {
    id: 'depressed',
    label: '우울',
    icon: '😞',
    themeColor: '#6C5CE7',
    bgColor: '#0a0014',
    orb1Color: '#6C5CE7',
    orb2Color: '#74b9ff',
    headline: '오늘은 나를 위한 작은 선물이 필요해요.',
    description: '자신을 너무 몰아붙이지 마세요. 작은 위로를 허락하되, 후회 없이 써요.',
    savingsMode: false,
    actions: [
      {
        icon: '🍫', title: '초콜릿 디저트 주문',
        description: '배달의 민족 달달한 디저트 탐색',
        url: 'baemin://home?category=dessert', appName: '배달의 민족', isPrimary: true,
      },
      {
        icon: '💙', title: '우울 극복 저축',
        description: '미래의 나에게 희망 저금하기',
        url: 'supertoss://savings', appName: '토스', isPrimary: false,
      },
    ],
  },

  thrilled: {
    id: 'thrilled',
    label: '짜릿',
    icon: '🤩',
    themeColor: '#00CEC9',
    bgColor: '#001a1a',
    orb1Color: '#00CEC9',
    orb2Color: '#00b894',
    headline: '짜릿한 에너지를 현명하게 써볼까요?',
    description: '흥분 상태에서의 충동구매 주의! 이 에너지를 저축 동기로 전환해봐요.',
    savingsMode: false,
    actions: [
      {
        icon: '🎮', title: '특별 경험 구매하기',
        description: '공연, 스포츠 직관 티켓 예매',
        url: 'https://tickets.interpark.com', appName: '인터파크', isPrimary: true,
      },
      {
        icon: '⚡', title: '짜릿 목표 저축',
        description: '더 큰 짜릿함을 위한 도전 저축',
        url: 'supertoss://savings', appName: '토스', isPrimary: false,
      },
    ],
  },

  exhausted: {
    id: 'exhausted',
    label: '지침',
    icon: '😩',
    themeColor: '#B2BEC3',
    bgColor: '#0d0d0f',
    orb1Color: '#B2BEC3',
    orb2Color: '#636e72',
    headline: '지친 나를 위한 회복 처방전이에요.',
    description: '오늘만큼은 편하고 맛있는 것을 배달시켜도 돼요. 단, 한 가지만!',
    savingsMode: false,
    actions: [
      {
        icon: '🍱', title: '프리미엄 밀키트 배달',
        description: '마켓컬리 간편식 바로 주문하기',
        url: 'https://kurly.com', appName: '마켓컬리', isPrimary: true,
      },
      {
        icon: '🛌', title: '회복 저축 챌린지',
        description: '쉰 날은 더 저축 — 5,000원',
        url: 'supertoss://savings', appName: '토스', isPrimary: false,
      },
    ],
  },
}

export const EMOTION_LIST = Object.values(EMOTIONS)
