# 🗺️ 사이트 배포 지도 (혼동 방지 - 매번 여기 먼저 읽기)

> 두 사이트가 비슷한 폴더로 흩어져 있어 헷갈림. 아래가 확정된 정답.
> Last verified: 2026-06-15 (git remote + .vercel 직접 확인)

## 라이브 사이트 = 이 2개만 진짜

| 사이트 | 소스 폴더 (여기만 고침) | GitHub repo | 호스팅 |
|---|---|---|---|
| **ssangcho.studio** ⭐ | `projects/08_MotionWebReact` | `ssangcho/portfolio-site.git` | Vercel |
| **ssangcho.com** (참고용) | `projects/18_SsangchoCom/site` | `ssangcho/ssangcho-com.git` | Vercel |

→ 둘 다 GitHub push 하면 Vercel 자동 배포.

**관계:** `ssangcho.com` = 메인/허브 사이트(참고용). 여기서 **`ssangcho.studio`(포트폴리오 본체)로 연결(링크)**됨.
→ 포트폴리오/CID/커브 작업의 **본체는 항상 ssangcho.studio = `08_MotionWebReact`.** com은 입구일 뿐.

## ⛔ 건드리면 안 되는 것 (라이브 아님)

| 경로 | 정체 | 왜 건드리면 안 되나 |
|---|---|---|
| `Desktop/faraday-cid-demo` | 로컬 작업본 | .git/.vercel 없음. 라이브에 반영 0 |
| `Desktop/faraday-versions` | 버전 비교용 | 배포 아님 |
| `projects/07_UI-Motion_portfolio/Docs/SiteCopy.md` | 기획 카피 문서 | 사이트 코드 아님. 참고용 정정본 |

## CID 모션(커브/M3/Challenge) 카피가 박힌 라이브 파일

**ssangcho.studio = `08_MotionWebReact` 안:**
- `src/data/siteContent.js` — Challenge/Solution 카피, 토큰 표 (line ~238-263)
- `src/pages/Faraday.js` — Faraday 페이지 렌더
- `src/components/faraday-cid/motionTokens.js` — easing 토큰 5개 (single source of truth)

## easing 토큰 = 5개 (2 메인 character + 변형)

| 토큰 | 값 | M3? |
|---|---|---|
| precision | [0, 0, 0, 1] | M3 그대로 (standard-decelerate) |
| refinement | [0.05, 0.7, 0.1, 1] | M3 그대로 (emphasized-decelerate) = M3 시그니처 |
| precisionSnap | [0, 0, 0.2, 0.8] | 변형 (micro-settle용) |
| refinementFade | [0.1, 0, 0.4, 1] | 변형 (opacity용) |

→ 메인 2개 = M3 / 변형 2개 = M3 base 상황별 튜닝. **"전부 M3"는 아님.**
→ 코드 주석에 이미 `// MD3-derived`, `// emphasized decelerate` 박혀있음 = 출처 정직.

## 작업 원칙
1. 사이트 카피 고칠 땐 **위 표의 소스 폴더에서만.** SiteCopy.md/로컬본 고쳐봤자 라이브 반영 안 됨.
2. push 전 `git remote -v`로 어느 repo인지 확인.
3. GM 면접 민감 파일(task.md, 실명/정치)은 절대 같이 commit 금지.
