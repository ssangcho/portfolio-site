# ssangcho.studio PRD — Portfolio Site Restructure + Faraday Case Study

## Context

**What**: ssangcho.studio = Product UI Motion 포트폴리오 사이트 (React)
**Why**: Big Tech / Automotive UI 채용팀에 시스템 레벨 모션 디자인 역량을 보여주기 위한 핵심 도구
**현재 상태**: Airbnb 케이스 스터디 1개만 있는 단일 페이지 (라우팅 없음)
**목표**: 랜딩 페이지 + 개별 케이스 스터디 구조로 확장, Faraday CID 케이스 추가

---

## 1. 사이트 개요

### 무엇인가
Product UI Motion Designer의 작업을 보여주는 케이스 스터디 포트폴리오.
각 케이스는 Challenge → Solution → Motion Spec 구조로, "왜 이 모션인가"를 데이터/시스템 근거로 설명.

### 누구를 위해
- Product/UX 팀 채용 담당자 (Google, Apple, Meta, Rivian 등)
- 디자인 매니저 / Art Director
- 포트폴리오 링크를 받는 모든 사람 (첫인상 30초 내 판단)

### 핵심 원칙
1. **시스템 사고력 증명** — 예쁜 모션이 아니라, 설계된 시스템
2. **간결함** — 스크롤 한번에 이해, 불필요한 텍스트 없음
3. **기존 스타일 유지** — Airbnb 페이지의 미니멀 톤 그대로

---

## 2. 현재 구조 → 목표 구조

### 현재
```
ssangcho.studio → App.js (Airbnb 풀페이지, 라우터 없음)
```

### 목표
```
ssangcho.studio/          → Landing (썸네일 그리드)
ssangcho.studio/airbnb    → Airbnb 케이스 스터디 (기존 그대로)
ssangcho.studio/faraday   → Faraday CID 케이스 스터디 (신규)
```

---

## 3. 페이지 구조

### 3-1. Landing Page

```
Nav (기존 동일)

Hero
  "Sangcho Shin"
  "Product UI Motion Designer"

Thumbnail Grid (2컬럼 or 1컬럼)
  ┌──────────────────┐  ┌──────────────────┐
  │                  │  │                  │
  │  Faraday CID     │  │  Airbnb UI       │
  │  Motion System   │  │  Motion Studies  │
  │                  │  │                  │
  │  [썸네일 이미지]  │  │  [썸네일 이미지]  │
  │                  │  │                  │
  └──────────────────┘  └──────────────────┘
  클릭 → /faraday         클릭 → /airbnb
```

- 썸네일은 hover 시 미세한 모션 (scale or shadow 변화)
- Faraday가 1번 (최신, 시스템 레벨) / Airbnb가 2번
- 추후 3번째 케이스 추가 가능한 그리드 구조

### 3-2. Airbnb Page (`/airbnb`)

기존 App.js 내용 그대로. 변경 없음.
Nav에서 로고 클릭 시 Landing으로 돌아가도록만 수정.

### 3-3. Faraday Page (`/faraday`)

Airbnb 포맷 기반이지만 **시스템 중심** 접근:

```
Nav (동일)

HERO
  "Faraday CID Motion System"
  subtitle: In-vehicle display choreography for FF 91

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 00: CONTEXT
  - Faraday Future FF 91 소개 (1-2줄)
  - CID = 15.4" center display (1600×2560, portrait 5:8), 운전자/승객 공용
  - 탭 구조: Quick Controls / Climate / Doors / Energy / Seats
  - [CID 풀스크린 이미지]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 01: TAB NAVIGATION SYSTEM
  subtitle: Choreographing screen transitions

  [Challenge Block]
    탭 전환 시 모든 콘텐츠가 동시에 바뀌면
    운전 중 시선 이동이 불명확 → 인지 부하 증가

  [Solution Block]
    → AE 영상 임베드 (Quick → Doors → Energy 전환)
    순차적 choreography: indicator → exit → stagger enter

  [Motion Token System] ★ Airbnb와의 핵심 차별점
    토큰 정의 테이블:
    ┌───────────────────┬─────────┬──────────────┐
    │ Token             │ Value   │ Usage        │
    ├───────────────────┼─────────┼──────────────┤
    │ duration.fast     │ 150ms   │ content exit │
    │ duration.normal   │ 300ms   │ indicator    │
    │ duration.slow     │ 400ms   │ max budget   │
    │ ease.standard     │ cubic() │ all enter    │
    │ stagger.step      │ 40ms    │ per card     │
    └───────────────────┴─────────┴──────────────┘

  [Timing Calculation] ★
    토큰 조합 → 전체 전환 시간 계산 다이어그램
    indicator(duration.normal)
      → exit(duration.fast)
        → enter(duration.normal) + stagger(step × N)
    = total ≤ duration.slow (400ms)

    "왜 400ms?" → NHTSA glance time 연구 근거

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 02: CID ↔ MOBILE SYNC
  subtitle: Cross-device system response

  [Challenge Block]
    두 디바이스가 따로 반응하면 "연결됐다"는 느낌이 없음

  [Solution Block]
    → AE 영상 (Mobile + CID 나란히)
    Mobile 탭 → CID 반응, 연동 타이밍으로 하나의 시스템

  [Sync Timing Spec]
    - TRIGGER  | Xms | Mobile 입력
    - DELAY    | Xms | 인지적 연결 간격
    - RESPONSE | Xms | CID 반응
    - TOTAL    | Xms | 전체 연동 시간

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 03: CONFIGURATOR (TBD — 별도 결정 필요)
  - Three.js 임베드 or AE 영상 캡처
  - 차량 외관 + 컬러 스와치 전환
  - 3D 파일 보유 (FF91 USD/FBX/UE)
  - 구현 방식 미정 → AE 작업 완료 후 결정

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Footer (선택)
```

---

## 4. 기술 구조

### 현재 스택
- React 19 (CRA)
- Framer Motion
- Lottie (lottie-web, lottie-react)
- Pure CSS (변수 기반)
- 배포: Vercel (별도 Git repo: github.com/ssangcho/portfolio-site)

### Git Branch 전략

| Branch | 역할 | 배포 |
|--------|------|------|
| `master` | Live 배포 — 현재 공개 중. 깨지면 안 됨 | Vercel 자동 배포 |
| `dev` | 작업 브랜치 — WIP 백업용. 자유롭게 push | 배포 안 됨 |

> `dev`에서 작업 → 완성 후 `master`로 merge → 자동 배포

### 추가 필요
- **React Router** — 랜딩/케이스 페이지 분리
- 배포 설정 (Vercel 연결)

### 파일 구조 변경

```
src/
├── App.js              → 라우터 셋업 (Landing, Airbnb, Faraday)
├── App.css             → 공통 스타일 (nav, typography, variables)
├── pages/
│   ├── Landing.js      → 썸네일 그리드
│   ├── Landing.css
│   ├── Airbnb.js       → 기존 App.js 내용 이동
│   ├── Airbnb.css      → 기존 App.css에서 Airbnb 전용 스타일 분리
│   ├── Faraday.js      → 신규
│   └── Faraday.css     → 신규
├── components/
│   ├── Nav.js          → 공통 Nav 컴포넌트
│   ├── TimingNote.js   → 기존 TimingNote 컴포넌트
│   └── MotionToken.js  → 신규: 토큰 테이블 + 계산 다이어그램
├── assets/
│   ├── images/         → 기존 Airbnb 이미지
│   ├── lottie/         → 기존 Lottie 파일
│   ├── videos/         → 기존 + Faraday AE 영상 (추후 추가)
│   └── faraday/        → Faraday CID 스크린샷 (image.png ~ image-5.png)
```

---

## 5. 작업 순서

### Phase 1: 사이트 구조 리팩토링
1. React Router 설치
2. 기존 App.js → pages/Airbnb.js로 분리
3. Nav 공통 컴포넌트화
4. Landing 페이지 생성 (썸네일 2개)
5. 라우팅 연결 (/, /airbnb, /faraday)
6. 기존 기능 깨지지 않는지 확인

### Phase 2: Faraday 페이지 골격
1. Faraday.js + Faraday.css 생성
2. Hero + Section 00 (Context) — CID 소개 + 스크린샷
3. Section 01 골격 — Challenge/Solution 블록 (영상 placeholder)
4. Motion Token System 섹션 — 토큰 테이블 + 계산 다이어그램
5. Section 02 골격 — Mobile Sync (영상 placeholder)

### Phase 3: AE 작업 (사용자 직접)
- Scene 1: Tab Nav choreography 영상
- Scene 2: Mobile Sync 영상
- 완성 후 mp4를 assets/videos/에 추가

### Phase 4: 콘텐츠 채우기
1. Faraday 케이스 카피 작성
2. 영상 임베드
3. Motion Token 실제 수치 반영
4. 반응형 조정

### Phase 5: 배포
1. Vercel 연결 (GitHub repo)
2. ssangcho.studio 도메인 연결
3. OG 메타태그, favicon 업데이트

---

## 6. 추후 확장 가능한 것들

### 케이스 스터디 추가
- 3번째 썸네일: GM Automotive UI (현 계약 작업 중 공개 가능한 부분)
- 4번째: Micro-interaction 모음 (Drive Mode, Door Lock 등)

### 사이트 기능
- **다크 모드** — Automotive UI는 다크 배경이 자연스러움
- **About 페이지** — 현재 ssangcho.com으로 링크. 자체 About 페이지로 전환 가능
- **모션 토큰 인터랙티브** — 토큰 값을 슬라이더로 조절하면 실시간 프리뷰 (기술력 쇼케이스)
- **Configurator 3D** — Three.js로 FF91 컬러 전환 임베드
- **프로젝트 필터/태그** — "Automotive" "Consumer" "System" 등 필터

### 콘텐츠
- **Motion Research** 섹션 — NHTSA glance time, NNG animation standards 등 연구 근거 페이지
- **Resume/Contact** — 포트폴리오 사이트 내 직접 연락 기능

---

## 7. Verification

### Phase 1 완료 확인
- `npm start` → localhost:3000에서 Landing 보이는지
- `/airbnb` 경로에서 기존 3개 케이스 모두 정상 동작 (Lottie, 스크롤, 영상)
- `/faraday` 경로에서 placeholder 페이지 보이는지
- Nav 로고 클릭 → Landing으로 복귀
- 브라우저 뒤로가기/앞으로가기 정상

### Phase 2 완료 확인
- Faraday 페이지 각 섹션 스크롤 확인
- Motion Token 테이블 렌더링
- 반응형 (768px) 레이아웃 확인

---

## Critical Files

### 수정 대상
- `src/App.js` — 라우터 셋업으로 교체
- `src/App.css` — 공통 스타일만 남기기

### 신규 생성
- `src/pages/Landing.js` + `Landing.css`
- `src/pages/Airbnb.js` + `Airbnb.css`
- `src/pages/Faraday.js` + `Faraday.css`
- `src/components/Nav.js`

### 참고 (수정 없음)
- `projects/07_UI-Motion_portfolio/2_Faraday/faraday작업순서.md` — 작업 순서
- `projects/07_UI-Motion_portfolio/2_Faraday/Assets.md` — Asset 목록
- `projects/07_UI-Motion_portfolio/Docs/Airbnb_pageCopy.md` — Airbnb 카피 참고
