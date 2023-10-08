import React, { FC, useContext, useMemo } from 'react'
import { List, Paper } from '@mui/material'
import { EntryCard } from './'
import { EntryStatus } from '@/interfaces'
import { EntriesContext } from '@/context/entries';

interface Props {
    status: EntryStatus;
}

export const EntryList:FC<Props> = ({ status }) => {

  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries, status ]);
  
  return (
    <div>
        <Paper elevation={3} square={false} sx={{ height: 'calc(100vh - 250px)',  overflow: 'hidden', padding: '5px 10px'}}>
            <List sx={{ opacity: 1 }}>
                {
                    entriesByStatus.map( entryByStattus => (
                        <EntryCard key={ entryByStattus._id } entry={ entryByStattus }/>
                    ))
                }
            </List>
        </Paper>
    </div>
  )
}
