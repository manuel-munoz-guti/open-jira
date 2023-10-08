import React, { FC, ReactNode, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { NewEntry } from '../../components/ui/NewEntry';

type Props = {
    children: ReactNode
}

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pending: Est et culpa veniam dolore consequat quis.',
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            _id: uuidv4(),
            description: 'Progress: Pariatur nulla dolore aute voluptate sint.',
            createdAt: Date.now() - 1000000,
            status: 'in-progress'
        },
        {
            _id: uuidv4(),
            description: 'Terminada: Quis aute dolor mollit officia deserunt minim anim ex officia amet incididunt Lorem.',
            createdAt: Date.now() - 100000,
            status: 'finished'
        }
    ],
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = ( description: string ) => {
     
    const newEntry: Entry = {
        _id: uuidv4(),
        description,
        createdAt: Date.now(),
        status: 'pending'
    }
    dispatch({ type: '[Entry] - Add Entry', payload: newEntry });
  }

  return (
    <EntriesContext.Provider value={{
        ...state,

        // Metodos
        addNewEntry,
    }}>
        { children }
    </EntriesContext.Provider>
  )
}