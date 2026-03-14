# Portfolio Site — Project Rules

## Video

- **모든 `<video>` 태그는 `<LazyVideo>` 컴포넌트를 사용할 것.**
- 일반 `<video>` 태그 직접 사용 금지.
- Import: `import LazyVideo from '../components/LazyVideo';`
- Usage: `<LazyVideo src={videoFile} className="..." />`
- LazyVideo는 IntersectionObserver 기반 lazy loading을 자동 적용함 (rootMargin 200px).

## Animation

- Hero 타이틀: `<TypeReveal>` 컴포넌트 사용 (character stagger reveal)
- Section 타이틀/블록: `<ScrollReveal>` 로 감싸기 (scroll-triggered fade-up)
- Role 메타 블록: `<RoleBlock data={...} />` — 내장 stagger animation 포함
- Import: `import { TypeReveal, ScrollReveal } from '../components/TextReveal';`

## Color System

- **컬러 하드코딩 절대 금지.** 모든 컬러는 CSS 변수로.
- Primitive scale (`--gray-50` ~ `--gray-900`, `--red-500`, `--pink-500` 등)은 `App.css :root`에 정의.
- Semantic token (`--bg`, `--text-muted`, `--border-strong` 등)은 primitive를 참조.
- 새 컬러 필요 시: primitive scale에 추가 → semantic token으로 alias → CSS에서 사용.
- FaradayCID.css는 자체 `--cid-*` 토큰 시스템 사용 (별도 dark theme).

## Content Data

- 텍스트 콘텐츠는 `src/data/siteContent.js`에 중앙 관리.
- 페이지 컴포넌트에 하드코딩 X → siteContent에서 import.

## Structure

- React 19 + framer-motion + lottie-web
- CSS: custom (Tailwind 아님)
- 각 case study 페이지: `src/pages/` 하위
- 공용 컴포넌트: `src/components/`
