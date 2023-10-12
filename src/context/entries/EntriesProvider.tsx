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
    entries: [],
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

  const updateEntry = ( entry: Entry) => {
    dispatch({ type: '[Entry] - Update Entry', payload: entry });
  }

  return (
    <EntriesContext.Provider value={{
        ...state,

        // Metodos
        addNewEntry,
        updateEntry
    }}>
        { children }
    </EntriesContext.Provider>
  )
}