import React, { ChangeEvent, useContext, useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';

export const NewEntry = () => {

  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);
  const { addNewEntry } = useContext(EntriesContext);
  
  const onHandleAdding = () => setIsAddingEntry(true);
  const onHandleCancel = () =>{ 
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  };
  const onFocusLost = () => setTouched(true); 

  const onTextFieldChanged = (event : ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value); 
  }

  const onSave = () => {
    
    if (inputValue.length === 0) return;
    
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>  
        { isAddingEntry ? 
          (<>
            <TextField
              fullWidth
              sx={{ marginTop: 2, marginBottom: 1  }}
              placeholder='Nueva entrada'
              autoFocus
              multiline
              label='Nueva Entrada'
              helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
              error={ inputValue.length <= 0 && touched }
              value={ inputValue }
              onChange={ onTextFieldChanged }
              onBlur={ onFocusLost }
            />
            <Box display='flex' justifyContent='space-between'>
                <Button
                    variant='outlined'
                    color='primary'
                    endIcon= { <SaveOutlinedIcon /> }
                    onClick={ onSave }
                >
                    Guardar
                </Button>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={ onHandleCancel }
                >
                    Cancelar
                </Button>
            </Box> 
          </>) : (
            <Button
                startIcon={ <AddCircleOutlineOutlinedIcon /> }
                fullWidth
                variant='outlined'
                onClick={ onHandleAdding }
             >
                AGREGAR TAREA
            </Button>   
          )
        }
    </Box>
  )
}
