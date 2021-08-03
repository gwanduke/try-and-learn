# Jotai vs. Recoil

요즘은 일에 치여서 신기술이나 트렌드에 대해서 좀 관심을 끊고 살았는데, 이제야 숨통이 조금 트여서 오랜만에 이것저것 찾아봤다. 그리고 전회사 동료에게도 요즘 뭐 신박한거 없냐? 라고 물어보게 되었는데 `Jotai`를 쓴다고했다. 들어는 봤는데 이름이 맘에 안들어서(...) 외면했던 그 것! 이걸 프로덕션에서 사용한다고? 급 궁금해진다.

우선은 잘 요약된 자료를 먼저 찾아 읽어보자.

- [리액트 상태 관리 트렌드](https://leerob.io/blog/react-state-management)
- [화해 기술블로그: Atomic state management – Jotai](http://blog.hwahae.co.kr/all/tech/tech-tech/6099/)
- [Kent C. Dodds - Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react)

## [Jotai vs. Recoil: What are the differences?](https://blog.logrocket.com/jotai-vs-recoil-what-are-the-differences/)

최근 리액트 진영에서의 상태관리 라이브러리를 분류하면 다음과 같다.

- Flux (Redux, Zustand)
- Proxy (MobX, Valtio)
- Atomic (Recoil, Jotai)

Atomic한 방법이 Flux, Proxy한 방법 보다 리액트 상태 관리와 닮아있고, 리액트 트리에 저장된다. (그래서 비교적 React Context와 많이 비교당함)
