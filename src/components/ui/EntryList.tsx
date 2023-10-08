import React, { DragEvent, FC, useContext, useMemo } from 'react'
import { List, Paper } from '@mui/material'
import { EntryCard } from './'
import { EntryStatus } from '@/interfaces'
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';
import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList:FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries, status ]);
  
  const allowDrop = ( event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
 }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entrySelected = entries.find(entry =>  entry._id === id);

    if(!entrySelected) return;

    entrySelected.status = status;

    updateEntry( entrySelected );
    
    endDragging();
  }

  return (
    <div
      className={ isDragging ? styles.dragging : '' }
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
    >
        <Paper elevation={3} square={false} sx={{ height: 'calc(100vh - 250px)',  overflow: 'hidden', padding: '5px 10px'}}>
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
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
