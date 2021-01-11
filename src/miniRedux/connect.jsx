import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from './Provider';

const connect = (mapStateToProps, mapDispatchToProps) => (WrapComponent) => {
  const ConnectComponent = () => {
    const { getState, dispatch, subscribe } = useContext(StoreContext);
    const [props, setProps] = useState({
      getState,
      dispatch,
    });

    let stateToProps;
    let dispatchToProps;

    const update = () => {
      if (mapStateToProps) {
        stateToProps = mapStateToProps(getState());
      }

      if (mapDispatchToProps) {
        dispatchToProps = mapDispatchToProps(dispatch);
      }

      setProps({
        ...props,
        ...stateToProps,
        ...dispatchToProps,
      });
    };

    useEffect(() => {
      update();
      subscribe(() => update());
    }, []);

    return <WrapComponent {...props} />;
  };

  return ConnectComponent;
};

export default connect;
