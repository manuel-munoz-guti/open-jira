import React, { FC, useContext } from 'react'
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'

import InboxIcon from '@mui/icons-material/Inbox';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { UIContext } from '../../context/ui/UIContext';


const menuItems: string[] = ['inbox', 'started', 'Send Email', 'Drafts'];

export const Sidebar: FC = () => {
  
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);
 
  return (
    <Drawer
        anchor='left'
        open={ sidemenuOpen }
        onClose={ closeSideMenu }
    >
        <Box sx={{ width: 250 }} >
            <Box sx={{ padding: '5px 10px' }}>
                <Typography variant='h4'>Menu</Typography>
            </Box>
            <List>
                { 
                    menuItems.map( (text, index) => (
                        <ListItem
                            button
                            key={ text }
                        >
                            <ListItemIcon>
                                { index % 2 ? <InboxIcon /> : <MailOutlineIcon /> }
                            </ListItemIcon>
                            <ListItemText primary={ text }/>
                        </ListItem>    
                    ))
                }
            </List>
            <Divider />
            <List>
                { 
                    menuItems.map( (text, index) => (
                        <ListItem
                            button
                            key={ text }
                        >
                            <ListItemIcon>
                                { index % 2 ? <InboxIcon /> : <MailOutlineIcon /> }
                            </ListItemIcon>
                            <ListItemText primary={ text }/>
                        </ListItem>    
                    ))
                }
            </List>
        </Box>
    </Drawer>
  )
}
