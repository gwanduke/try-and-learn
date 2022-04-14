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

# Media buffering, seeking, 그리고 time ranges

비디오나 오디오가 얼마나 다운로드 되었는지 또는 delay 없이 재생 가능한지를 알고 싶을 때 유용하다. (버퍼 상태바가 대표적인 예)

## Buffered

`buffered` 속성으로 미디어의 어떤 부분이 다운로드 되어졌는지 알 수 있는데, 이는 [TimeRange](https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges) 객체를 반환한다. 대개 연속적이지만 사용자가 버퍼링중에 뛰어넘거나 하는 경우 중간이 비게될 수 있다.

```js
const video = document.getElementById("my-video");
const bufferedTimeRanges = video.buffered;
```

## TimeRange Object

시작과 끝 시간을 가지는 series of non-overlapping ranges of time.

TimeRange 프로퍼티

- `length`: 객체내의 time ranges의 수
- `start(index)`: time range의 시작 시간 (초)
- `end(index)`: time range의 끝 시간 (초)

```text
------------------------------------------------------
|=============|                    |===========|     |
------------------------------------------------------
0             5                    15          19    21
```

```js
myAudio.buffered.length; // returns 2
myAudio.buffered.start(0); // returns 0
myAudio.buffered.end(0); // returns 5
myAudio.buffered.start(1); // returns 15
myAudio.buffered.end(1); // returns 19
```

## Seekable

media가 지연없이 재생이 가능한 TimeRange가 어디인지 반환한다. 이는 다운로드 여부와는 상관없다. 예를들어 Byte range 요청이 허용되는 서버라면 거의 즉시 다운로드되어 재생되기 떄문에 seekable로 처리된다.

```js
var seekableTimeRanges = myAudio.seekable;
```

## 버퍼링 피드백

> 네이티브 컨트롤은 buffered를 참고해 버퍼링 상태를 표현한다.

```js
window.onload = function () {
  var myAudio = document.getElementById("my-audio");

  myAudio.addEventListener("progress", function () {
    var duration = myAudio.duration;
    if (duration > 0) {
      for (var i = 0; i < myAudio.buffered.length; i++) {
        if (
          myAudio.buffered.start(myAudio.buffered.length - 1 - i) <
          myAudio.currentTime
        ) {
          document.getElementById("buffered-amount").style.width =
            (myAudio.buffered.end(myAudio.buffered.length - 1 - i) / duration) *
              100 +
            "%";
          break;
        }
      }
    }
  });

  myAudio.addEventListener("timeupdate", function () {
    var duration = myAudio.duration;
    if (duration > 0) {
      document.getElementById("progress-amount").style.width =
        (myAudio.currentTime / duration) * 100 + "%";
    }
  });
};
```

## Played

`played` 프로퍼티도 재생된 구간을 TimeRange로 반환하는데, 이는 특정 부분의 미디어가 얼마나 많이 들어졌는지, 보여졌는지 판단하는데 용이하다.

# PlaybackRate

- Most browsers stop playing audio outside playbackRate bounds of 0.5 and 4, leaving the video playing silently. For most applications, it's recommended that you limit the range to between 0.5 and 4.
- Negative values will not cause the media to play in reverse
