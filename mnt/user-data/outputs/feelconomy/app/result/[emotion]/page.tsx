// app/result/[emotion]/page.tsx
import { notFound } from 'next/navigation'
import { EMOTIONS, type EmotionId } from '@/lib/emotions'
import ResultClient from './ResultClient'

interface Props {
  params: { emotion: string }
}

// SEO 메타데이터 동적 생성
export async function generateMetadata({ params }: Props) {
  const emotion = EMOTIONS[params.emotion as EmotionId]
  if (!emotion) return {}
  return {
    title: `${emotion.icon} ${emotion.label} — 필코노미`,
    description: emotion.headline,
  }
}

export default function ResultPage({ params }: Props) {
  const emotion = EMOTIONS[params.emotion as EmotionId]
  if (!emotion) notFound()

  return <ResultClient emotion={emotion} />
}
