import React, { createContext, useContext, useReducer } from 'react';

/**
 * _ScreenName_ 에서 사용하는 상태값입니다.
 * Reducer 를 통해 정의합니다.
 */
export type _ScreenName_ScreenState = {};

/**
 * _ScreenName_ 에서 사용하는 전체 Context 입니다.
 * 상태값에서 유도된 값과 상태값을 조작하는 함수들을 추가로 넘겨줍니다.
 */
type _ScreenName_ContextType = _ScreenName_ScreenState & {};

/** */
const initial_ScreenName_ScreenState: _ScreenName_ScreenState = {};

/** */
const _ScreenName_ScreenContext = createContext<
  _ScreenName_ContextType | undefined
>(undefined);

/** */
export function use_ScreenName_Context() {
  const context = useContext(_ScreenName_ScreenContext);
  if (context === undefined) {
    throw new Error('_ScreenName_ 콘텍스트가 제공되지 않았습니다.');
  }
  return context;
}

/** */
function _ScreenName_ScreenStateReducer(
  state: _ScreenName_ScreenState,
  updatedState: Partial<_ScreenName_ScreenState>,
) {
  return { ...state, ...updatedState };
}

/** */
export function _ScreenName_ScreenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    _ScreenName_ScreenStateReducer,
    initial_ScreenName_ScreenState,
  );

  /** */
  function updateState() {
    dispatch({ type: '', payload: {} });
  }

  const value: _ScreenName_ContextType = {
    ...state,
  };

  return (
    <_ScreenName_ScreenContext.Provider value={value}>
      {children}
    </_ScreenName_ScreenContext.Provider>
  );
}
