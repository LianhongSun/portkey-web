import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { basicPortkeyView, PortkeyState } from './actions';
import { BasicActions } from './utils';
import { Theme } from '../types';
import { ChainType } from '@portkey/types';

const INITIAL_STATE = {
  theme: 'light',
  chainType: 'aelf',
};
const PortkeyContext = createContext<any>(INITIAL_STATE);

export function usePortkey(): [PortkeyState, BasicActions] {
  return useContext(PortkeyContext);
}

//reducer
function reducer(state: any, { type, payload }: any) {
  switch (type) {
    case basicPortkeyView.destroy.type: {
      return {};
    }
    default: {
      const { destroy } = payload;
      if (destroy) return Object.assign({}, payload);
      return Object.assign({}, state, payload);
    }
  }
}

export default function Provider({
  theme,
  chainType,
  networkType,
  children,
}: {
  theme?: Theme;
  chainType?: ChainType;
  networkType: string;
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <PortkeyContext.Provider
      value={useMemo(
        () => [{ ...state, theme, networkType, chainType }, { dispatch }],
        [networkType, state, theme, chainType],
      )}>
      {children}
    </PortkeyContext.Provider>
  );
}
