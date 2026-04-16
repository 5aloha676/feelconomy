// app/result/[emotion]/ResultClient.tsx
'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, ExternalLink, PiggyBank, TrendingUp } from 'lucide-react'
import { type Emotion, type EmotionAction } from '@/lib/emotions'
import { useSavings } from '@/hooks/useSavings'
import { resolveDeepLink } from '@/lib/deeplinks'

interface Props {
  emotion: Emotion
}

export default function ResultClient({ emotion }: Props) {
  const router = useRouter()
  const { totalSaved, streak, addSavings } = useSavings()

  const handleAction = (action: EmotionAction) => {
    // 저축 액션이면 상태 업데이트
    if (emotion.savingsMode && emotion.suggestedSavings) {
      addSavings(emotion.suggestedSavings)
    }
    // 딥링크 or 웹 URL로 이동
    const url = resolveDeepLink(action.url)
    window.open(url, '_blank', 'noopener noreferrer')
  }

  return (
    <main
      className="min-h-screen relative overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: emotion.bgColor }}
    >
      {/* 감정별 배경 오브 */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-15 blur-[80px] transition-all duration-700"
          style={{ backgroundColor: emotion.orb1Color }}
        />
        <div
          className="absolute bottom-24 -right-20 w-72 h-72 rounded-full opacity-15 blur-[80px] transition-all duration-700"
          style={{ backgroundColor: emotion.orb2Color }}
        />
      </div>

      <div className="relative z-10 max-w-sm mx-auto px-5 pb-12 pt-2">
        {/* 뒤로가기 */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/50 text-sm py-2 mt-2 mb-6 hover:text-white/90 transition-colors"
        >
          <ArrowLeft size={16} />
          다른 감정 선택하기
        </button>

        {/* 헤더 */}
        <div className="mb-6">
          <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-1">
            지금 당신은
          </p>
          <h1 className="text-2xl font-bold text-white font-display">
            {emotion.icon} {emotion.label} 상태
          </h1>
        </div>

        {/* 메인 카드 */}
        <div
          className="rounded-3xl p-6 backdrop-blur-xl border mb-4 animate-slide-up"
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderColor: `${emotion.themeColor}30`,
          }}
        >
          {/* 감정 태그 */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 border"
            style={{
              background: `${emotion.themeColor}20`,
              borderColor: `${emotion.themeColor}40`,
            }}
          >
            <span className="text-xl">{emotion.icon}</span>
            <span
              className="text-sm font-bold font-display"
              style={{ color: emotion.themeColor }}
            >
              {emotion.label}
            </span>
          </div>

          {/* 헤드라인 */}
          <h2 className="text-xl font-bold text-white font-display leading-snug mb-3">
            {emotion.headline}
          </h2>
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            {emotion.description}
          </p>

          <hr className="border-white/10 mb-5" />

          {/* 액션 버튼들 */}
          <div className="space-y-2.5">
            {emotion.actions.map((action, i) => (
              <ActionButton
                key={i}
                action={action}
                themeColor={emotion.themeColor}
                onClick={() => handleAction(action)}
              />
            ))}
          </div>
        </div>

        {/* 저축 위젯 (저축 모드일 때) */}
        {emotion.savingsMode && (
          <div
            className="rounded-2xl p-5 border mb-4 animate-slide-up"
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderColor: 'rgba(255,255,255,0.12)',
              animationDelay: '0.1s',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <PiggyBank size={14} className="text-white/40" />
              <p className="text-xs text-white/45 font-medium uppercase tracking-wider">
                오늘까지 감정 저축
              </p>
            </div>
            <p className="text-3xl font-bold text-white font-display">
              {totalSaved.toLocaleString()}
              <span className="text-base text-white/50 font-light ml-1">원</span>
            </p>
            <p className="text-xs text-white/50 mt-1 flex items-center gap-1">
              <TrendingUp size={12} />
              {streak}번째 기분 좋은 저축
            </p>
          </div>
        )}

        {/* 하단 팁 */}
        <div className="flex items-center gap-2 justify-center mt-2">
          <span className="text-xs text-white/40 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
            📝 감정 기록은 더 나은 소비 습관을 만들어요
          </span>
        </div>
      </div>
    </main>
  )
}

/* ─── ActionButton ──────────────────────────────────── */

interface ActionButtonProps {
  action: EmotionAction
  themeColor: string
  onClick: () => void
}

function ActionButton({ action, themeColor, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl
        transition-all duration-200 active:scale-[0.98] hover:scale-[1.02]
        ${action.isPrimary ? 'border' : 'bg-white/7 border border-white/12'}
      `}
      style={
        action.isPrimary
          ? { background: `${themeColor}20`, borderColor: `${themeColor}40` }
          : {}
      }
    >
      <span className="text-xl flex-shrink-0">{action.icon}</span>
      <div className="flex-1 text-left">
        <p className="text-sm font-bold text-white font-display">{action.title}</p>
        <p className="text-xs text-white/60 mt-0.5">{action.description}</p>
      </div>
      <ExternalLink size={14} className="text-white/40 flex-shrink-0" />
    </button>
  )
}
