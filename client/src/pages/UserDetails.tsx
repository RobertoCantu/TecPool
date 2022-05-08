import React from 'react';

// UI

import { Typography, Box, Stack } from '@mui/material';

// Components

import UserCard from '../components/UserCard';
import { ReturnButton } from '../components/ReturnButton'

// Assets

import CarPoolEdit from '../assets/CarPoolEdit.png';

export default function UserDetails() {

  return (
    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4} justifyContent='center' alignItems={{xs: 'center', lg: 'stretch' }} sx={{height: '100vh', position: 'relative', mt: '24px'}}>
      <ReturnButton text='Regresar' />
      <Box sx={{ minWidth: 300, maxWidth: 500, zIndex: 10 }}>
        <Typography variant={"h4"} sx={{mb: 4, textAlign: 'center'}}>Mi Información</Typography>
        <UserCard />
      </Box>
      <Box sx={{alignSelf: 'flex-end'}}>
        <img
          src={CarPoolEdit}
          alt='carPool'
          style={{
            width: 'auto',
            height: '350px',
            borderRadius: '16px',
          }}
          />
      </Box>
    </Stack>
  )
}