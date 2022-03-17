# HTML5 - video

## 용어

- playback - 재생이라는 뜻으로, 이전에 녹화된 소리 또는 영상을 re-play한다는 뜻으로 쓰인다. 즉, 재생과 비슷한 의미로 받아들이면 된다.

## 사용방법

```html
<video>
  <source src="/media/cc0-videos/flower.webm" type="video/webm" />
  <source src="/media/cc0-videos/flower.mp4" type="video/mp4" />

  <!-- fallback -->
  Sorry, your browser doesn't support embedded videos.
</video>
```

### 속성

- autoplay: 재생가능한 가장 빠른 시점에 재생됨 (Chrome 70.0 등은 muted 에서만 정상 동작함)
- autopictureinpicture (실험): 다른 문서로 이동시 pip 모드 자동 전환
- controls: 기본 컨트롤러 제공
- controlslist (실험): `nodownload`, `nofullscreen`, `noremoteplayback`
- crossorigin: `anonymous|use-credentials`
- disablepictureinpicture (실험)
- disableremoteplayback (실험): 장치에 의한 재생을 차단. (safari: x-webkit-airplay="deny")
- loop
- muted
- playsinline 🤢
- poster: 이 속성이 명시되지 않으면 영상이 재생되기 전까지 첫번째 프레임을 표시함
- preload: `none|metadata|auto` (hint로 사용되며 autoplay 속성이 우선시 된다)
  - `none`: 최소한의 트래픽 사용. 즉, 비디오가 캐시되지 않아야함
  - `metadata`: 영상 데이터 외에 메타데이터(영상의 길이) 등을 가져오는 것은 허용함
  - `auto`: 사용자가 사용하지 않더라도 영상 전체가 다운로드 되어질 수 있음
- src: 이 속성 대신 블록내에 `<source>`를 명시해도 무방함
- width
- height
- played `TimeRanges`
- buffered `TimeRanges`

### 이벤트

- canplay: 영상의 전체 로딩 여부와 상관없이 재생 가능하면 발생
- canplaythrough: 영상 전체가 로딩되었고 버퍼링없이 재생 가능하면 발생
- [complete](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext/complete_event) 🤢
- durationchange: 영상의 duration 속성이 업데이트되었을 때 발생
- emptied: 미디어가 이미 일부 로드 되었다가, `load()` 호출 등의 이유로 인해 다시 로드하여 **비워지는** 경우 발생
- ended: 미디어의 끝에 도달하여 정지된 경우 발생
- loadeddata: 미디어의 첫 프레임이 로딩 완료 되면 발생
- loadedmetadata: 메타데이터가 로드 완료 되면 발생
- pause: 일시정지되면 발생
- play: 재생되면 발생
- playing: paused 상태이거나 버퍼링등의 이유로 지연되었다가 시작할 준비가 되었을 때 발생 (시작시 발생인지는 확인 필요)
- progress: 브라우저가 리소스를 로드함에 따라 주기적으로 발생
- ratechange: 재생속도 변경됨
- seeked: seek operation 이 완료됨
- seeking: seek operation 이 시작됨
- stalled: 미디어 데이터를 fetch 하려 시도하지만 데이터가 예기치못하게 받아지지 않으면 발생
- suspend: 미디어 데이터 로딩이 suspend됨
- timeupdate: `currentTime` 속성이 표시하는 시간이 업데이트 됨
- volumechange
- waiting: 일시적인 데이터 부족으로 재생이 정지되면 발생

## Tips

- 브라우전 모든 비디오 포맷을 지원하지 않는다. 그래서 `<source>`로 명시한 것들중 이해가능한 첫번째 소스를 사용한다.
-
