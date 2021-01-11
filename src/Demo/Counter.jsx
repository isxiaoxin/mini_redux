import React from 'react';
import { connect } from '../miniRedux';

const Counter = (props) => {
  console.log('Counter props', props);

  const add = () => {
    props.dispatch({ type: 'ADD' });
  };

  const sub = () => {
    props.dispatch({ type: 'SUB' });
  };

  return (
    <div>
      <p>{props.count}</p>
      <button onClick={add}>ADD</button>
      <button onClick={sub}>SUB</button>
    </div>
  );
};

export default connect((state) => {
  return {
    count: state.count,
  };
})(Counter);
