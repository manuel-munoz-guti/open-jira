import { createContext } from 'react';


export interface ContextProps {
     sidemenuOpen: boolean;
     isAddingEntry: boolean;
     //Merthods
     openSideMenu: () => void;
     closeSideMenu: () => void;
     setIsAddingEntry: (isAddingEntry: boolean) => void;
}


export const UIContext = createContext({} as ContextProps);