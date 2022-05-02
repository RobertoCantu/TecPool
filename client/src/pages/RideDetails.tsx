import React from 'react';

// UI

import { Typography, Box, Stack, Button } from '@mui/material';

// Components

import { useParams } from 'react-router-dom';
import RideCard from '../components/RideCard';

// Assets

import CarPool from '../assets/CarPool.png';

// Uitls

import useAuth from '../hooks/useAuth';

export default function RideDetails() {
  const { user } = useAuth();
  const { rideId } = useParams();

  const message = '¡Hola! Me gustaría separar un lugar para tu ride al Tec.'

  const didTapPhoneNumber = () => {
    if(user){
      window.open(
        `https://wa.me/+${user.phone}?text=${message}`,
        '_blank'
      )
    }
  }

  return (
    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4} justifyContent='center' alignItems={{xs: 'center', lg: 'stretch' }} sx={{height: '100%', position: 'relative', zIndex: 10}}>
      <Stack sx={{ minWidth: 300, maxWidth: 500, zIndex: 10 }}>
        <Typography variant={"h4"} sx={{ textAlign: 'center'}}>Acerca del Ride</Typography>
        <Typography sx={{ mb: 4, color: 'text.secondary' }}>¡Si te interesa este ride no dudes en reservar tu lugar!</Typography>
        {rideId && <RideCard rideId={(rideId)}/>}
        <Button
          variant="contained"
          sx={{ mt: 4, alignSelf: 'flex-start'}}
          onClick={didTapPhoneNumber}
        >
          Reservar mi lugar
        </Button>
      </Stack>
      <Box sx={{alignSelf: 'flex-end'}}>
        <img
            src={CarPool}
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