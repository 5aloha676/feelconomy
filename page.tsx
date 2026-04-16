// app/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { EMOTION_LIST, type Emotion, type EmotionId } from '@/lib/emotions'

export default function HomePage() {
  const router = useRouter()
  const [selected, setSelected] = useState<EmotionId | null>(null)

  const handleSelect = (emotion: Emotion) => {
    setSelected(emotion.id)
    // 약간의 딜레이로 선택 애니메이션 후 이동
    setTimeout(() => {
      router.push(`/result/${emotion.id}`)
    }, 300)
  }

  return (
    <main className="min-h-screen bg-[#0f0f14] relative overflow-hidden">
      {/* 배경 오브 */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#ff6b6b] opacity-15 blur-[80px]" />
        <div className="absolute bottom-24 -right-20 w-72 h-72 rounded-full bg-[#4ecdc4] opacity-15 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-sm mx-auto px-5 pb-12 pt-2">
        {/* 헤더 */}
        <header className="text-center mb-10 pt-4">
          <p className="text-xs font-bold tracking-[0.15em] text-white/40 uppercase mb-6">
            Feelconomy · 필코노미
          </p>
          <h1 className="font-display text-2xl font-bold text-white leading-snug">
            지금 당신의 기분은
            <br />어떤가요?
          </h1>
          <p className="mt-2 text-sm text-white/50 font-light">
            감정이 곧 경제입니다
          </p>
        </header>

        {/* 감정 그리드 */}
        <section aria-label="감정 선택">
          <div className="grid grid-cols-5 gap-2.5">
            {EMOTION_LIST.map((emotion) => (
              <EmotionButton
                key={emotion.id}
                emotion={emotion}
                isSelected={selected === emotion.id}
                onClick={() => handleSelect(emotion)}
              />
            ))}
          </div>
        </section>

        {/* 하단 힌트 */}
        <div className="mt-6 flex items-center gap-2 justify-center">
          <span className="text-xs text-white/40 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
            💡 감정을 선택하면 맞춤 소비 / 저축 액션을 제안해드려요
          </span>
        </div>
      </div>
    </main>
  )
}

/* ─── 서브 컴포넌트 ─────────────────────────────────── */

interface EmotionButtonProps {
  emotion: Emotion
  isSelected: boolean
  onClick: () => void
}

function EmotionButton({ emotion, isSelected, onClick }: EmotionButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`감정 선택: ${emotion.label}`}
      className={`
        flex flex-col items-center gap-1.5 py-3.5 px-1 rounded-2xl
        border backdrop-blur-sm transition-all duration-300
        active:scale-95
        ${isSelected
          ? 'scale-110 border-white/30 bg-white/10'
          : 'border-white/10 bg-white/5 hover:-translate-y-1 hover:scale-105 hover:border-white/20'
        }
      `}
      style={{
        borderColor: isSelected ? `${emotion.themeColor}60` : undefined,
        backgroundColor: isSelected ? `${emotion.themeColor}15` : undefined,
      }}
    >
      <span className="text-[26px] leading-none" role="img" aria-hidden>
        {emotion.icon}
      </span>
      <span className="text-[11px] text-white/75 font-medium text-center leading-tight">
        {emotion.label}
      </span>
    </button>
  )
}
