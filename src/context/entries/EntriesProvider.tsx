import React, { FC, ReactNode, useEffect, useReducer } from 'react';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/api';

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

  const addNewEntry = async( description: string ) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', { description });
      dispatch({ type: '[Entry] - Add Entry', payload: data });
    } catch (error) {
      console.error(error);
    }
  }

  const updateEntry = async( entry: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, { 
        description: entry.description,
        status: entry.status
      });
      dispatch({ type: '[Entry] - Update Entry', payload: data });
    } catch (error) {
      console.error(error);
    }
  }

  const refreshEntries = async() => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] - Refresh Data', payload: data });
  }

  useEffect(() => {
    refreshEntries();
  }, []);
  
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