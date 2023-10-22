import React, { FC, useContext } from 'react';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '@/context/ui';
import NextLink from 'next/link';

export const Navbar: FC = () => {

  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position='sticky' elevation={ 0 }>
        <Toolbar>
            <IconButton 
              size='large' 
              edge='start'
              onClick={ openSideMenu }
            >
                <MenuOutlinedIcon />
            </IconButton>
            <Link component={ NextLink } href="/" underline="none">
                <div style={{ display:'flex', flexDirection:'row', alignItems:'center' }}>
                  <Typography variant='h6'>OpenJira</Typography>
                </div>
            </Link>
        </Toolbar>
    </AppBar>
  )
}
