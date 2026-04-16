// lib/deeplinks.ts
/**
 * 앱 딥링크를 플랫폼에 맞게 처리하는 유틸리티
 * - 네이티브 앱이 설치된 경우: 딥링크 실행
 * - 설치 안 된 경우: 웹 폴백 URL로 리다이렉트
 */

const FALLBACK_URLS: Record<string, string> = {
  'supertoss://': 'https://toss.im',
  'baemin://': 'https://baemin.com',
  'yogiyo://': 'https://yogiyo.co.kr',
  'coupangeats://': 'https://coupangeats.com',
}

export function resolveDeepLink(url: string): string {
  // 이미 https:// 웹 URL이면 그대로 반환
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url
  }

  // 딥링크 스킴 감지 후 폴백
  for (const [scheme, fallback] of Object.entries(FALLBACK_URLS)) {
    if (url.startsWith(scheme)) {
      // 모바일 환경이면 딥링크, 아니면 웹 URL
      if (typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
        return url  // 딥링크 그대로 사용
      }
      return fallback
    }
  }

  return url
}


// ─────────────────────────────────────────────────────
// hooks/useSavings.ts
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'feelconomy_savings'

interface SavingsState {
  totalSaved: number
  streak: number
  history: { date: string; amount: number; emotionId: string }[]
}

const DEFAULT_STATE: SavingsState = { totalSaved: 0, streak: 0, history: [] }

export function useSavings() {
  const [state, setState] = useState<SavingsState>(DEFAULT_STATE)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setState(JSON.parse(stored))
    } catch { /* ignore */ }
  }, [])

  const addSavings = (amount: number, emotionId = 'unknown') => {
    setState(prev => {
      const next: SavingsState = {
        totalSaved: prev.totalSaved + amount,
        streak: prev.streak + 1,
        history: [
          ...prev.history,
          { date: new Date().toISOString(), amount, emotionId },
        ],
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch { /* ignore */ }
      return next
    })
  }

  const resetSavings = () => {
    setState(DEFAULT_STATE)
    localStorage.removeItem(STORAGE_KEY)
  }

  return { ...state, addSavings, resetSavings }
}
