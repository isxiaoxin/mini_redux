import createStore from '../miniRedux';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        count: (state.count += 1),
      };
    case 'SUB':
      return {
        ...state,
        count: (state.count -= 1),
      };
    default:
      return state;
  }
};

const initState = {
  count: 0,
};

export const store = createStore(reducer, initState);
