# Build Responsive Real World Websites with HTML5 and CSS3

- [Build Responsive Real World Websites with HTML5 and CSS3](#build-responsive-real-world-websites-with-html5-and-css3)
  - [1. What is HTML](#1-what-is-html)
  - [2. Dive into HTML](#2-dive-into-html)
  - [3. Formatting with CSS](#3-formatting-with-css)
    - [Box Model](#box-model)
    - [Float](#float)
  - [4. Web design basics](#4-web-design-basics)
  - [5. The killer website project](#5-the-killer-website-project)
    - [반응형 웹 디자인을 위한, Fluid grid](#반응형-웹-디자인을-위한-fluid-grid)
    - [Header 만들기](#header-만들기)

## 1. What is HTML

- Hyper Text Markup Language
- HTML은 프로그래밍 언어가 아니라, 마크업 언어

## 2. Dive into HTML

특이사항 없음

## 3. Formatting with CSS

- Cascading Style Sheets
- HTML이 어떻게 보이는지 정의함
- 정의 방법
  1. HTML tag
  2. style 태그 내부
  3. 외부 파일

### Box Model

기본적으로 모든 HTML 요소는 박스로서 볼 수 있다. 이는 엘리먼트의 사이즈와 엘리먼트 간에 공간을 정의하고 외곽선을 정의한다.

- Content
- Padding
- Border
- Margin

block 엘리먼트는 브라우저 전체 영역을 차지하며 line break가 강제된다. inline은 이런 특징이 없다.

### Float

블록 엘리먼트를 양옆으로 배치할 때 사용

## 4. Web design basics

- 최근 웹 디자인이 과도한 shadow나 3d로 구성되는 것 대신, flat하게 디자인 되는 추세이기 때문에 비교적 구현하기가 쉬워졌다.
- 15~25px 사이의 값을 body 텍스트 사이즈로 사용하는 것이좋다.
- Headline을 위해서 매우 큰 사이즈를 사용하는 것이좋다. (예를 들면, 32px ~ 90px)
- line-spacing을 폰트사이즈의 120~150% 정도를 사용하라 (그래야 읽기 편안함)
- 라인당 45~90 캐릭터를 배치하는 것이 좋다 (눈은 긴 문장을 읽기 힘들다)
- 좋은 폰트를 사용하라, 다음은 목적별로 추천되는 폰트 종류이다.
  - sans-serif: 좀더 중립적, 깔끔, 간단, 현대 웹사이트
    - Open Sans
    - Lato
    - RalewayMonsterrat
    - PT Sans
  - serif: 전통적인 목적, 스토리 텔링, 읽는데 오래 걸리는
    - Cardo
    - Merriweather
    - PT Serif
- 컬러
  - 1. 하나의 기본 컬러만 사용해라
    - 블랙, 화이트, 그레이 외에 하나로 기본 컬러를 정하자
    - 기본 컬러를 정하면 조금더 어두운거 하나, 밝은거 하나 정도를 더 선택할 수 있다.
    - 디자인을 할 때 베이스 컬러를 기준으로 컬러 팔레트를 만들어보고 시작하자
  - 2. 더 많은 색상을 원하면 툴을 사용하자 (컬러선택 툴)
  - 3. 주목을 끌기위해 색상을 사용하자 (다른 부분은 무채색으로해서 강조하는 방법)
  - 4. 완전한 검정색을 사용하지 말자 (자연스럽지 않다)
  - 5. 올바른 컬러를 선택하자 (색상에는 심리적인 부분이 작용한다)
    - 빨강: 힘, 열정 등... 밝은 톤은 에너지가 넘치고 어두운 톤은 더 파워풀하고 우아하다.
    - 오렌지: 빨간만큼 강렬하진않고 뭔가 창의적이고 용기있다.
    - 노랑: 밝음, 즐거움, 명량함 등...
    - 초록: 조화, 자연, 건강, 돈
    - 파랑: 참기, 안정, 평화, 믿음, 남성에게 인기있는 컬러, 믿음과 명예, 프로페셔널
    - 보라: 힘, 귀족, 건강, 지혜, 럭셔리
    - 핑크: 로맨스, 평화, affection
    - 브라운: 릴렉스, 자신감, 자연, 안정, 편안함

<!--
- Red is a great color to use when power, passion, strength and excitement want to be transmitted. Brighter tones are more energetic and darker shades are more powerful and elegant.
- Orange draws attention without being as overpowering as red. It means cheerfulness and creativity. Orange can be associated with friendliness, confidence, and courage.
- Yellow is energetic and gives the feeling of happiness and liveliness. Also, it associates with curiosity, intelligence, brightness, etc.
- Green is the color of harmony, nature, life and health. Also, it is often associated with money. In design, green can have a balancing and harmonizing effect.
- Blue means patience, peace, trustworthiness, and stability. It is one of the most beloved colors, especially by men. It is associated with professionalism, trust and honor. That's actually why the biggest social networks use blue.
- Purple is traditionally associated with power, nobility and wealth. In your design, purple can give a sense of wisdom, royalty, nobility, luxury, and mystery.
- Pink expresses romance, passivity, care, peace, affection, etc.
Brown is the color of relaxation and confidence. Brown means earthiness, nature, durability, comfort, and reliability.
 -->

- 이미지에 텍스트 배치시
  - 1. 어느정도 대비가 필요하다
  - 2. 이미지를 오버레이하자
  - 3. 텍스트를 박스안에 배치하면 더 잘 보인다.
  - 4. 이미지를 블러처리 하자
  - 5. 하단에 fade를 추가해 그 영역에 텍스트를 보여주자
  - 매우매우 큰 폰트를 다룰 때에는 font-weight를 조금 줄여보자
- 아이콘
  - 1. 리스트된 피쳐나 단계를 나타내기 위해서 아이콘을 사용하자
  - 2. 액션이나 링크에 아이콘을 사용하자 ("✏️ 글쓰기" 이런식으로)
  - 3. 아이콘이 주 무대가 되면 안된다. 단지 보조적인 역할로 들어가야함
  - 4. 가능하면 아이콘 폰트를 사용하자 (vector) -> 그래야 레티나 또는 폰에서 깨짐없이 보인다
- 공간과 레이아웃
  - 1. 여백을 주자
    - 엘리먼트 간에
    - 엘리먼트 그룹 간에
    - 섹션 사이에
    - 그렇다고 너무 과하게 공간을 주어서는 안된다. (공간은 연관성을 표현하므로 그 크기를 잘 선택하자)
  - 2. 디자인 위계를 정의하자 (컨텐츠 계층)
    - 고객이 어디를 먼저 볼지 정하자
    - 컨텐츠의 메시지에 따라서 흐름을 설립하자
    - 그 흐름을 따라 여백을 배치하자 (고객이 보는 방향을 고려해서 여백을 설정하자)
- UI/UX
  - UI: 제품의 표현이고 어떻게 보여지고 느껴지는지에 대한 것
  - UX: 유저가 제품에 갖는 전체 경험
  - 그냥 어떻게 생겼냐, 어떻게 느끼냐에 대한 것이 아니다. 디자인은 어떻게 동작하느냐를 말한다. - 스티브 잡스 - (이쁘기도하고 편리하게 동작해야한다)
  - https://www.udemy.com/course/web-design-secrets/ 를 참고하면 좋겠다.
- 다른 유능한 디자이너들이 어떻게 올바르게 디자인하는지 통찰을 얻자
  - 1. 좋아하는 디자인들을 모으자
  - 2. 거기서 모든 것을 이해하려고 시도해보고 질문해보자.
  - 3. 왜 보기 좋은가?
  - 4. 이들 사이트가 공통으로 가진 요소는 무엇인가?
  - 5. 어떻게 HTML/CSS로 만들어졌을까?
  - 예술가 처럼 훔치자 (드리블 같은 곳에서)

<!--
- Most of your content will be text, so beautiful typography is a key element to a good looking website.
- Images are getting more and more important in webdesign, so choosing great images and putting text on them is an essential part of your work.
- Icons are also a good way of setting a friendly tone for your website, but use them carefully.
- The adequate use of whitespace makes a website look professionally designed, so use it a lot, but in the correct way.
- Build a layout by defining the visual hierarchy of your content. Whitespace is also important for this.
- Your website should be designed in a way that ensures that both the user and the owner of the website achieve their goals. This is the user experience.
- It is very important that you get inspired by studying well-designed websites from other designers.
 -->

<!--

Beautiful Typography

1. Use a font-size between 15 and 25 pixels for body text

2. Use (really) big font sizes for headlines

3. Use a line spacing between 120 and 150% of the font size

4. 45 to 90 characters per line

5. Use good fonts

6. Chose a font which reflects the look and feel you want for your website

7. Use only one font

Using Colors Like a Pro

1. Use only one base color

2. Use a tool if you want to use more colors

3. Use color to draw attention

4. Never use black in your design

5. Choose colors wisely

Working with Images

1. Put text directly on the image

2. Overlay the image

3. Put your text in a box

4. Blur the image

5. The floor fade

Working with icons

1. Use icons to list features/steps

2. Use icons for actions and links

3. Icons should be recognizable

4. Label your icons

5. Icons should not take a center stage

6. Use icon fonts whenever possible

Spacing and layout

1. Put whitespace between your elements

2. Put whitespace between your groups of elements

3. Put whitespace between you website's sections

4. Define where you want your audience to look first

5. Establish a flow that corresponds to your content's message

6. Use whitespace to build that flow
 -->

## 5. The killer website project

1. Define your project
   - 프로젝트의 목표를 설정하자
   - 고객을 설정하자
   - 고객과 목표를 생각하면서 디자인
2. plan out everything
   - 컨텐츠를 계획하자: 텍스트, 이미지, 비디오, 아이콘 ...
   - 뷰의 위계를 생각해보자
   - 네비게이션을 설정하자
   - 사이트 구조를 생각하자 (만약 더 큰 프로젝트라면)
3. Sketch your ideas before you design
   - 디자인에 대해서 생각하고 영감을 받자
   - 머리속에서 디자인 빼내기: 아이디어를 스케치하고 디자인을 시작하자 (연필 + 종이)
   - 많이 스케치해보는 것은 중요하지만, 너무 완벽하게 스케치할 필요는 없음
   - 어떤것을 만들지 아이디어를 가지지 않고 디자인을 시작하지는 말자 절대로!
4. design and develop your website
   - 웹디자인 섹션에서 배운 가이드라인과 팁을 이용해 디자인
   - HTML/CSS 를 이용해 디자인 해보자
   - 1,2,3에서 만든 스케치, 컨텐츠, 결정된 계획들을 사용하자
   - 이 스텝이 가장 중요하지만 모든 스텝도 잘 챙겨야한다.
5. It's not done yet: optimization
   - 성능 최적화: 사이트 속도
   - SEO
6. Launch the masterpiece
   - 배포
7. Site maintenance
   - 배포가 이야기의 끝이 아님
   - 사용자의 행동을 모니터링하고, 웹사이트를 수정하자
   - 컨텐츠를 주기적으로 업데이트해서 죽지 않은 사이트라는 것을 계속 증명해야한다

### 반응형 웹 디자인을 위한, Fluid grid

> 참고: http://www.responsivegridsystem.com/

1. fluid grid: 모든 레이아웃 엘리먼트는 px같은 절대 값이 아니라, 상대 유닛을 통해 사이즈를 결정한다. (% 같은)
2. 유연한 이미지들도 마찬가지로 상대 유닛을 이용
3. 미디어 쿼리: 서로다른 브라우저 폭에 따라 다른 CSS 룰이 적용되도록 한다

### Header 만들기

- header, nav, ul, li => 📕 시맨틱 태그로서 검색 엔진이 이를 의미 있게 해석할 수 있다
- 이미지를 어둡게 만들고 그 위에 텍스트를 놓자
- 어떻게 이미지를 브라우저 뷰포트 크기만큼 높게 만들까
- 어떻게 정중앙에 박스를 위치 시킬까
- 버튼을 어떻게 디자인 할까
- 4가지 CSS 링크 상태: link, visited, hover, active
- 작은 애니메이션을 위한 CSS3 transitions
- 간단한 네비게이션을 어떻게 만들까
