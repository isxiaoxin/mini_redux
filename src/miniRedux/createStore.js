/**
 * 创建 store
 * @param {*} reducer
 * @param {*} initialState 初始 state
 * @param {*} enhancer 中间件
 */
const createStore = (reducer, initialState, enhancer) => {
  let currentState; // 当前 state
  let subQueue = []; // 创建一个监听队列
  let currentReducer = reducer;
  let isDispatch = false;

  if (initialState) {
    currentState = initialState;
  }

  /**
   * 返回最新的 state
   */
  const getState = () => {
    return currentState;
  };

  /**
   * 监听 state 的变动
   * @param {*} listener 数据变化时要执行的函数
   */
  const subscribe = (listener) => {
    // 把监听函数放入监听队列里
    subQueue.push(listener);
    // 移除监听事件
    return () => {
      subQueue = subQueue.filter((l) => l !== listener);
    };
  };

  /**
   * 派发 action 并执行所有 监听函数
   * @param {*} action
   */
  const dispatch = (action) => {
    // 这里使用 isDispatch 做标识，上一个处理完成后才能处理下一个
    if (isDispatch) {
      throw new Error('dispatching');
    }

    try {
      currentState = currentReducer(currentState, action);
      isDispatch = true;
    } finally {
      isDispatch = false;
    }

    // 执行所有监听函数
    subQueue.forEach((listener) => listener());
    return action;
  };

  /**
   * 替换 reducer
   * @param {*} reducer
   */
  const replaceReducer = (reducer) => {
    if (reducer) {
      // 直接把新的 reducer 覆盖掉旧的就行了
      currentReducer = reducer;
    }
    // 替换之后派发一次 dispatch
    dispatch({ type: 'MINI_REDUX_REPLACE' });
  };

  return {
    getState,
    dispatch,
    subscribe,
    replaceReducer,
  };
};

export default createStore;
