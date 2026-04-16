# 필코노미 (Feelconomy) — 디렉토리 구조

```
feelconomy/
├── app/
│   ├── layout.tsx          ← 루트 레이아웃 (폰트, 메타)
│   ├── page.tsx            ← 메인 페이지 (감정 선택)
│   ├── globals.css         ← 전역 스타일
│   └── result/
│       └── [emotion]/
│           └── page.tsx    ← 감정별 결과 페이지
├── components/
│   ├── EmotionGrid.tsx     ← 10개 감정 버튼 그리드
│   ├── EmotionButton.tsx   ← 개별 감정 버튼
│   ├── ResultCard.tsx      ← 제안 카드 UI
│   ├── ActionButton.tsx    ← 딥링크 액션 버튼
│   └── SavingsWidget.tsx   ← 저축 현황 위젯
├── lib/
│   ├── emotions.ts         ← 감정 데이터 & 타입
│   └── deeplinks.ts        ← 앱 딥링크 유틸리티
├── hooks/
│   └── useSavings.ts       ← 저축 상태 관리 훅
├── public/
│   └── icons/              ← 감정 아이콘 에셋
├── tailwind.config.ts
├── next.config.ts
└── package.json
```
