// ─── app/layout.tsx ───────────────────────────────────
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '필코노미 — 감정 기반 가계부',
  description: '당신의 감정이 소비와 저축을 결정합니다. 필코노미로 감정 경제를 관리하세요.',
  openGraph: {
    title: '필코노미 (Feelconomy)',
    description: '감정이 곧 경제입니다',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,  // 모바일 핀치줌 방지
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}


// ─── app/globals.css ──────────────────────────────────
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-display: var(--font-noto);
  }
}

@layer utilities {
  .font-display {
    font-family: var(--font-display), sans-serif;
  }

  .animate-slide-up {
    animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
*/


// ─── tailwind.config.ts ───────────────────────────────
/*
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**\/*.{js,ts,jsx,tsx,mdx}',
    './components/**\/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto)', 'sans-serif'],
        display: ['var(--font-noto)', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'slide-up': 'slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
*/


// ─── next.config.ts ───────────────────────────────────
/*
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Vercel 최적화
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // 이미지 최적화 (감정 아이콘 등)
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // 딥링크 리다이렉트 규칙 (예: 카카오 공유 링크)
  async redirects() {
    return []
  },
}

export default nextConfig
*/


// ─── package.json ─────────────────────────────────────
/*
{
  "name": "feelconomy",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.x",
    "react": "^19",
    "react-dom": "^19",
    "lucide-react": "^0.383.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.x",
    "tailwindcss": "^3.4",
    "typescript": "^5"
  }
}
*/
