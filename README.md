# feelconomy
How our feelings can bend to our finance and expenses/\.

feel-conomy/
├─ app/
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ emotion-grid.tsx
│  └─ recommendation-card.tsx
├─ lib/
│  └─ emotions.ts
├─ public/
│  └─ og-image.png
├─ tailwind.config.ts
├─ postcss.config.js
├─ next.config.ts
├─ package.json
└─ tsconfig.json

'use client';

import { useMemo, useState } from 'react';
import {
  Flame,
  Frown,
  Angry,
  BatteryLow,
  Sparkles,
  Siren,
  Leaf,
  CloudRain,
  Zap,
  Bed,
  PiggyBank,
  ExternalLink,
  Wallet,
} from 'lucide-react';

type EmotionKey =
  | 'joy'
  | 'sad'
  | 'anger'
  | 'lethargy'
  | 'flutter'
  | 'stress'
  | 'calm'
  | 'depressed'
  | 'thrill'
  | 'tired';

type SuggestionAction = {
  label: string;
  href: string;
  kind: 'delivery' | 'saving' | 'lifestyle';
};

type EmotionConfig = {
  key: EmotionKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  theme: {
    bg: string;
    ring: string;
    text: string;
    soft: string;
    button: string;
  };
  headline: string;
  description: string;
  action: SuggestionAction;
};

const emotions: EmotionConfig[] = [
  {
    key: 'joy',
    label: '기쁨',
    icon: Sparkles,
    theme: {
      bg: 'from-yellow-50 to-amber-100',
      ring: 'ring-yellow-200',
      text: 'text-amber-900',
      soft: 'bg-yellow-100',
      button: 'bg-amber-500 hover:bg-amber-600',
    },
    headline: '이 행복을 미래의 나에게 선물하세요.',
    description: '기분 좋은 순간에 소액 저축을 연결하면 감정과 자산 습관이 함께 쌓여요.',
    action: {
      label: '5,000원 저축하기',
      href: 'https://example-bank.app/save?amount=5000',
      kind: 'saving',
    },
  },
  {
    key: 'sad',
    label: '슬픔',
    icon: Frown,
    theme: {
      bg: 'from-sky-50 to-blue-100',
      ring: 'ring-blue-200',
      text: 'text-blue-900',
      soft: 'bg-blue-100',
      button: 'bg-blue-500 hover:bg-blue-600',
    },
    headline: '따뜻한 음식으로 마음을 조금 감싸볼까요?',
    description: '오늘은 소비를 죄책감 없이 기록하고, 감정 회복용 지출로 분류해보세요.',
    action: {
      label: '배달 앱 열기',
      href: 'https://www.baemin.com/',
      kind: 'delivery',
    },
  },
  {
    key: 'anger',
    label: '분노',
    icon: Angry,
    theme: {
      bg: 'from-rose-50 to-red-100',
      ring: 'ring-red-200',
      text: 'text-red-900',
      soft: 'bg-red-100',
      button: 'bg-red-500 hover:bg-red-600',
    },
    headline: '매운 음식으로 스트레스를 날려보세요!',
    description: '강한 감정일수록 즉흥 지출이 쉬워요. 원하는 소비를 하되, 감정 트리거를 함께 남겨보세요.',
    action: {
      label: '배달의민족에서 엽떡 주문하기',
      href: 'https://www.baemin.com/',
      kind: 'delivery',
    },
  },
  {
    key: 'lethargy',
    label: '무기력',
    icon: BatteryLow,
    theme: {
      bg: 'from-slate-50 to-gray-100',
      ring: 'ring-slate-200',
      text: 'text-slate-900',
      soft: 'bg-slate-100',
      button: 'bg-slate-700 hover:bg-slate-800',
    },
    headline: '지출보다 회복이 먼저예요.',
    description: '오늘은 큰 결제 대신, 10분 산책이나 카페인 한 잔 같은 작은 리셋을 선택해보세요.',
    action: {
      label: '회복 루틴 기록하기',
      href: 'https://example.com/recovery',
      kind: 'lifestyle',
    },
  },
  {
    key: 'flutter',
    label: '설렘',
    icon: Flame,
    theme: {
      bg: 'from-pink-50 to-fuchsia-100',
      ring: 'ring-pink-200',
      text: 'text-pink-900',
      soft: 'bg-pink-100',
      button: 'bg-pink-500 hover:bg-pink-600',
    },
    headline: '이 설렘을 나를 위한 경험에 써보세요.',
    description: '작은 자기보상 소비도 좋지만, 예산 한도 안에서 즐기는 것이 핵심이에요.',
    action: {
      label: '소확행 예산 10,000원 쓰기',
      href: 'https://example.com/reward-budget?amount=10000',
      kind: 'lifestyle',
    },
  },
  {
    key: 'stress',
    label: '스트레스',
    icon: Siren,
    theme: {
      bg: 'from-orange-50 to-amber-100',
      ring: 'ring-orange-200',
      text: 'text-orange-900',
      soft: 'bg-orange-100',
      button: 'bg-orange-500 hover:bg-orange-600',
    },
    headline: '지금 필요한 건 해소일까요, 통제감일까요?',
    description: '배달 주문이나 소액 저축 중 하나를 선택해서 감정을 행동으로 전환해보세요.',
    action: {
      label: '3,000원 스트레스 저축하기',
      href: 'https://example-bank.app/save?amount=3000',
      kind: 'saving',
    },
  },
  {
    key: 'calm',
    label: '평온',
    icon: Leaf,
    theme: {
      bg: 'from-emerald-50 to-green-100',
      ring: 'ring-green-200',
      text: 'text-green-900',
      soft: 'bg-green-100',
      button: 'bg-green-600 hover:bg-green-700',
    },
    headline: '평온한 날은 가장 좋은 재정 의사결정의 순간이에요.',
    description: '정기 저축, 예산 점검, 소비 카테고리 정리에 가장 적합한 감정 상태예요.',
    action: {
      label: '이번 주 소비 점검하기',
      href: 'https://example.com/weekly-review',
      kind: 'lifestyle',
    },
  },
  {
    key: 'depressed',
    label: '우울',
    icon: CloudRain,
    theme: {
      bg: 'from-indigo-50 to-blue-100',
      ring: 'ring-indigo-200',
      text: 'text-indigo-950',
      soft: 'bg-indigo-100',
      button: 'bg-indigo-500 hover:bg-indigo-600',
    },
    headline: '오늘은 무리한 소비보다 아주 작은 안전 행동이 좋아요.',
    description: '감정이 낮은 날에는 지출을 줄이는 것보다, 나를 해치지 않는 선택을 남기는 게 더 중요해요.',
    action: {
      label: '따뜻한 음료 주문하기',
      href: 'https://www.baemin.com/',
      kind: 'delivery',
    },
  },
  {
    key: 'thrill',
    label: '짜릿',
    icon: Zap,
    theme: {
      bg: 'from-violet-50 to-purple-100',
      ring: 'ring-violet-200',
      text: 'text-violet-950',
      soft: 'bg-violet-100',
      button: 'bg-violet-500 hover:bg-violet-600',
    },
    headline: '들뜬 순간일수록 충동 소비를 게임처럼 관리해보세요.',
    description: '지금 당장 결제 대신, 24시간 위시리스트 보관 규칙을 걸어도 좋아요.',
    action: {
      label: '충동구매 대신 7,000원 저축',
      href: 'https://example-bank.app/save?amount=7000',
      kind: 'saving',
    },
  },
  {
    key: 'tired',
    label: '지침',
    icon: Bed,
    theme: {
      bg: 'from-stone-50 to-neutral-100',
      ring: 'ring-stone-200',
      text: 'text-stone-900',
      soft: 'bg-stone-100',
      button: 'bg-stone-700 hover:bg-stone-800',
    },
    headline: '피곤한 날의 소비는 편의성을 사는 지출일 수 있어요.',
    description: '오늘은 죄책감보다 회복 효율을 보세요. 대신 내일 예산만 가볍게 점검하면 충분해요.',
    action: {
      label: '간편식 배달 주문하기',
      href: 'https://www.baemin.com/',
      kind: 'delivery',
    },
  },
];

export default function HomePage() {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey>('joy');

  const currentEmotion = useMemo(
    () => emotions.find((emotion) => emotion.key === selectedEmotion) ?? emotions[0],
    [selectedEmotion],
  );

  const CurrentIcon = currentEmotion.icon;

  return (
    <main
      className={`min-h-screen bg-gradient-to-b ${currentEmotion.theme.bg} px-4 py-6 transition-all duration-300 sm:px-6`}
    >
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <section className="rounded-3xl bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm">
            <Wallet className="h-4 w-4" />
            Feel-conomy
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            지금 당신의 기분은 어떤가요?
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            감정을 선택하면 지금의 나에게 맞는 소비 또는 저축 액션을 추천해드릴게요.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3 rounded-3xl bg-white/70 p-4 shadow-sm backdrop-blur sm:grid-cols-3">
          {emotions.map((emotion) => {
            const Icon = emotion.icon;
            const isActive = emotion.key === selectedEmotion;

            return (
              <button
                key={emotion.key}
                type="button"
                onClick={() => setSelectedEmotion(emotion.key)}
                className={`group rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
                  isActive
                    ? `border-white ${emotion.theme.soft} ring-2 ${emotion.theme.ring} shadow-sm`
                    : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-sm'
                }`}
              >
                <Icon className={`mb-3 h-5 w-5 ${isActive ? emotion.theme.text : 'text-slate-500'}`} />
                <div className="text-sm font-semibold text-slate-900">{emotion.label}</div>
              </button>
            );
          })}
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className={`mb-4 inline-flex rounded-2xl p-3 ${currentEmotion.theme.soft}`}>
            <CurrentIcon className={`h-6 w-6 ${currentEmotion.theme.text}`} />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              Selected Emotion
            </p>
            <h2 className="text-xl font-bold text-slate-900">{currentEmotion.headline}</h2>
            <p className="text-sm leading-6 text-slate-600">{currentEmotion.description}</p>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <a
              href={currentEmotion.action.href}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${currentEmotion.theme.button}`}
            >
              {currentEmotion.action.kind === 'saving' ? (
                <PiggyBank className="h-4 w-4" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
              {currentEmotion.action.label}
            </a>
          </div>
        </section>

        <section className="rounded-3xl bg-white/70 p-5 shadow-sm backdrop-blur">
          <h3 className="text-sm font-semibold text-slate-900">추천 흐름</h3>
          <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>1. 감정을 고른다</li>
            <li>2. 소비/저축 액션을 받는다</li>
            <li>3. 외부 앱으로 이동해 행동한다</li>
            <li>4. 나중에 감정-지출 패턴을 분석한다</li>
          </ol>
        </section>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Feel-conomy',
  description: '감정 기반 소비/저축 제안 웹 앱',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}


action: {
  label: '배달 앱 열기',
  href: 'baemin://',
  kind: 'delivery'
}

const openExternalApp = () => {
  window.location.href = 'baemin://';
  setTimeout(() => {
    window.open('https://www.baemin.com/', '_blank');
  }, 800);
};