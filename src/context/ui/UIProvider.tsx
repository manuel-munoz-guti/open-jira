import React, { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';


type Props = {
    children: ReactNode
}

export interface UIState {
    sidemenuOpen: boolean,
    isAddingEntry: boolean,
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
}

export const UIProvider: FC<Props> = ({ children }) => {
  
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' })

  const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' });

  const setIsAddingEntry = ( isAddingEntry: boolean ) => dispatch({ type: 'UI - Setting Entry', payload: isAddingEntry}); 

  return (
    <UIContext.Provider value={{ 
        ...state,
        //Methods
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
    }}>
        { children }
    </UIContext.Provider>
  )
}