import { useEffect, useRef, useState } from "react";
import "./App.css";
import poster from "./poster.jpg";

const checkIsFullScreen = () => !!document.fullscreenElement;

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);
  const progressRef2 = useRef<HTMLProgressElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.controls = false;

      videoEl.addEventListener("play", () => {
        setIsPlaying(true);
      });

      videoEl.addEventListener("pause", () => {
        setIsPlaying(false);
      });

      videoEl.addEventListener("timeupdate", function () {
        const progressEl = progressRef.current!;
        progressEl.max = videoEl.duration;
        progressEl.value = videoEl.currentTime;
      });

      videoEl.addEventListener("loadedmetadata", () => {
        progressRef.current!.max = videoEl.duration;
      });

      videoEl.addEventListener("progress", function () {
        var duration = videoEl.duration;
        if (duration > 0) {
          for (var i = 0; i < videoEl.buffered.length; i++) {
            progressRef2.current!.value =
              videoEl.buffered.end(videoEl.buffered.length - 1 - i) / duration;
            break;
          }
        }
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <video
        ref={videoRef}
        poster={poster}
        autoPlay
        muted
        controls
        src="http://127.0.0.1:8081/videos/oceans.mp4"
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
        }}
      >
        <span
          onClick={() => {
            isPlaying ? videoRef.current?.pause() : videoRef.current?.play();
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </span>
        <span
          onClick={() => {
            videoRef.current?.pause();
            videoRef.current!.currentTime = 0;
            setIsPlaying(false);
          }}
        >
          Stop
        </span>
        <div>
          <progress
            ref={progressRef}
            value={0}
            max={0}
            onClick={(e) => {
              var pos =
                (e.pageX -
                  ((e.target as HTMLProgressElement).offsetLeft +
                    (
                      (e.target as HTMLProgressElement)
                        .offsetParent as HTMLDivElement
                    ).offsetLeft)) /
                (e.target as HTMLProgressElement).offsetWidth;
              videoRef.current!.currentTime = pos * videoRef.current!.duration;
            }}
          />
        </div>
        <div>
          <progress
            ref={progressRef2}
            value={0}
            max={0}
            onClick={(e) => {
              var pos =
                (e.pageX -
                  ((e.target as HTMLProgressElement).offsetLeft +
                    (
                      (e.target as HTMLProgressElement)
                        .offsetParent as HTMLDivElement
                    ).offsetLeft)) /
                (e.target as HTMLProgressElement).offsetWidth;
              videoRef.current!.currentTime = pos * videoRef.current!.duration;
            }}
          />
        </div>
        <span
          onClick={() => {
            videoRef.current!.muted = !isMuted;
            setIsMuted(!isMuted);
          }}
        >
          {isMuted ? "🔈" : "🔇"}
        </span>
        <span
          onClick={() => {
            checkIsFullScreen()
              ? document.exitFullscreen()
              : containerRef.current?.requestFullscreen();
          }}
        >
          풀스크린
        </span>
      </div>
    </div>
  );
}

export default App;
