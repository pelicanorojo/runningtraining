/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2025-02-27T01:01:20-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-01T12:27:08-03:00
 */

'use client'
import { createContext, useContext, useReducer, Dispatch } from 'react';

import { configReducer, initialState } from '@/reducers/configReducer';
import { PlanConfig, ConfigReducerAction } from '@/types/global';

const ConfigContext = createContext(null as unknown as PlanConfig);
const ConfigDispatchContext = createContext(null as unknown as Dispatch<ConfigReducerAction>);

function ConfigProvider({ children }: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(configReducer, initialState); // Initial State Here
  

  return (
    <ConfigContext.Provider value={state}>
      <ConfigDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigDispatchContext.Provider>
    </ConfigContext.Provider>
  );
}

// move to hooks folder
function useConfig() {
  const context = useContext(ConfigContext) as PlanConfig;
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}

function useConfigDispatch() {
  const context = useContext(ConfigDispatchContext) as Dispatch<ConfigReducerAction>;
  if (!context) {
    throw new Error('useConfigDispatch must be used within a ConfigDispatchProvider');
  }
  return context;
}

export { ConfigProvider, useConfig, useConfigDispatch};
