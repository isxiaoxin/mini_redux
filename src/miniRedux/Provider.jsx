import React, { createContext } from 'react';

export const StoreContext = createContext(null);

const Provider = (props = {}) => {
  const { store, children } = props;
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export default Provider;
