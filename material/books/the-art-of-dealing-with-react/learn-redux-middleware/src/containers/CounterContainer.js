import Counter from "../components/Counter";
import { connect } from "react-redux";
import { increaseAsync, decreaseAsync } from "../modules/counter_thunk";

const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
  return (
    <Counter
      number={number}
      onIncrease={increaseAsync}
      onDecrease={decreaseAsync}
    />
  );
};

const mapStateToProps = (state) => ({
  number: state.counter.number,
});

export default connect(mapStateToProps, { increaseAsync, decreaseAsync })(
  CounterContainer
);
