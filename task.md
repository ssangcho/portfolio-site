# Portfolio Site (ssangcho.studio)

Last updated: 2026-04-01

## Context

- ssangcho.studio — 포트폴리오 사이트 (React, Create React App)
- GitHub: `ssangcho/portfolio-site` / Vercel: master=production, dev=staging
- **03-27 비디오 R2 이전**: 12개 mp4 파일을 Vercel 번들 → Cloudflare R2 CDN으로 이전 완료
  - R2 bucket: `vimeo-backup`, prefix: `portfolio/`
  - Public URL: `https://pub-c444b0ce9ea248a68357dd4ef54fa858.r2.dev/portfolio/`
  - 변경 파일: `Medical.js`, `Faraday.js`, `Airbnb.js` (import → R2 URL const)
  - 빌드 번들 ~25MB 감소
- **03-27 Airbnb 성능 최적화** (진행 중):
  - GiftCards + Three.js를 `GiftCardsSection.js`로 분리, `React.lazy` + `webpackPrefetch`
  - `App.js`에서 `GlbTest` route도 lazy로 변경
  - main bundle: 515KB → 164KB (-68%)
  - LazyVideo: viewport 벗어나면 pause 추가 (다중 비디오 동시 decode 방지)
  - Shadow map: 4096 → 1024
- R2 credentials: `projects/18_SsangchoCom/site/.env`
- **03-31 GA4 Key Event tracking 추가** (완료, push 완료):
  - `resume_download` — Nav Resume 클릭 (`Nav.js`)
  - `email_click` — Footer Email 클릭 (`Footer.js`)
  - `demo_click` — Medical "Try it live" / "Try OnCall" 2개 버튼 (`Medical.js`)
  - 함수: `src/analytics.js`에 `trackResumeDownload`, `trackEmailClick`, `trackDemoClick` 추가
- **GA4 30일 데이터** (2026-03-31 기준): 83 active users, 1.9K events, US 30명, Motion 페이지 107 views
- **04-01 Security hardening** (완료, push 완료):
  - `robots.txt` — AI 봇 차단 (GPTBot, CCBot, anthropic-ai, Claude-Web, Google-Extended 등)
  - `vercel.json` — security headers 추가 (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy)

## TODO

- [ ] **Airbnb 스크롤 stutter 해결** — dev 배포 후에도 버벅임 보고됨. 추가 조사 필요
  - 의심 원인: R2 dev URL rate limit, Three.js chunk 파싱 시 jank, framer-motion whileInView 다수
  - Chrome DevTools Performance 탭으로 실제 bottleneck 프로파일링 필요
- [ ] **GA4 Key Event 마킹** — deploy 후 GA4 Admin > Events에서 `resume_download`, `email_click`, `demo_click`을 "Mark as key event" 토글 (첫 fire 후 24-48시간 대기 필요)
- [ ] Medical Case Study — Motion Token 섹션 slowed-down 비디오
- [ ] Medical Case Study — token reasoning 강화
- [ ] SectionBlock / portalIcons unused warning 정리 (낮은 우선순위)
- [ ] favicon.ico 교체

## Failed / Issues

- ❌ Canvas `frameloop="demand"` + IntersectionObserver lazy mount → stutter 줄었지만 완전 해결 안 됨
- ❌ React.lazy로 GiftCardsSection 분리 → bundle은 줄었지만 chunk 로드 시 jank. user: "로딩이 더 느려짐"
- ❌ `webpackPrefetch` 추가 → idle time 다운로드는 되지만 parse 시 여전히 stutter 가능
- ❌ LazyVideo pause + shadow map 1024 → push 완료했으나 user 확인 전 handoff
- ⚠️ R2 Public Development URL은 rate-limited ("not recommended for production") — production 시 custom domain 연결 권장
- ❌ `align-self: start` 추가로 해결 시도 → Playwright diff=0으로 나와서 실제 브라우저와 측정값 불일치
- ❌ 전역 `.cs-row__media { margin-top }` → A/B/C 동시 영향, 섹션별 inline style로 분리
- ❌ `margin-top: -41px` 시도 → 비디오가 너무 위로 올라감
- ❌ ssangcho.studio/medical 흰 화면 → vercel.json rewrite로 해결
- ❌ Token highlight cards 검정 배경 → CSS var fallback dark값, portfolio 변수로 교체
- ❌ npm run dev 없음 → `PORT=4000 npm start`
- ⚠️ Challenge 카드 채워진 배경 → 멘토 피드백: "selected state" → 테두리만으로 변경
- ❌ Solution pulse animation → 눈에 안 띔, 제거
- ❌ Solution 빨간 underline → "링크" 처럼 보임, red dot으로 변경
