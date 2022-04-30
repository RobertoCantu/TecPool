import React from 'react';
// material
import {Typography, Card, Button, Box} from '@mui/material';
// componentes
import UserCard from '../components/UserCard';

function UserDetails() {
  return (
    <Box sx={{mb: 5}}>
      <Typography variant={"h4"} sx={{mt: 4, mb: 2}}>Información del usuario</Typography>
      <UserCard />
    </Box>
  )
}

export default UserDetails