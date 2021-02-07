import { useSpring, animated, interpolate } from "react-spring";

function FadeIn() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return <animated.div style={props}>I will fade in</animated.div>;
}

function IncreaseNumber() {
  const props = useSpring({ number: 1, from: { number: 0 } });
  console.log(props); // Not JS number type, AnimatedValue Object
  return <animated.span>{props.number}</animated.span>;
}

function LoadingBar({ per, backgroundColor }) {
  return (
    <div style={{ width: 500, height: 20 }}>
      <div
        style={{
          backgroundColor,
          width: `${per || 0}%`,
          height: "100%",
        }}
      />
    </div>
  );
}
const AnimatedLoadingBar = animated(LoadingBar);

function LoadingBarContainer() {
  const props = useSpring({
    from: { percentage: 0, backgroundColor: "#0FF" },
    percentage: 100,
    backgroundColor: "#000000",
  });
  return (
    <AnimatedLoadingBar
      per={props.percentage}
      backgroundColor={props.backgroundColor}
    />
  );
}

function ViewInterpolation() {
  const { o, xyz, color } = useSpring({
    from: { o: 0, xyz: [0, 0, 0], color: "red" },
    o: 1,
    xyz: [10, 20, 5],
    color: "green",
  });

  return (
    <animated.div
      style={{
        // If you can, use plain animated values like always, ...
        // You would do that in all cases where values "just fit"
        color,
        // Unless you need to interpolate them
        background: o.interpolate((o) => `rgba(210, 57, 77, ${o})`),
        // Which works with arrays as well
        transform: xyz.interpolate(
          (x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`
        ),
        // If you want to combine multiple values use the "interpolate" helper
        border: interpolate([o, color], (o, c) => `${o * 10}px solid ${c}`),
        // You can also form ranges, even chain multiple interpolations
        padding: o
          .interpolate({ range: [0, 0.5, 1], output: [0, 0, 10] })
          .interpolate((o) => `${o}%`),
        // Interpolating strings (like up-front) through ranges is allowed ...
        borderColor: o.interpolate({
          range: [0, 1],
          output: ["red", "#ffaabb"],
        }),
        // There's also a shortcut for plain, optionless ranges ...
        opacity: o.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1]),
      }}
    >
      {o.interpolate((n) => n.toFixed(9)) /* innerText interpolation ... */}
    </animated.div>
  );
}

function App() {
  return (
    <div>
      <FadeIn />
      <IncreaseNumber />
      <LoadingBarContainer />
      <ViewInterpolation />
    </div>
  );
}

export default App;
