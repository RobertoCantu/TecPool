import { useParams } from 'react-router-dom';

// UI

import { Typography, Box, Stack, Button, Container } from '@mui/material';

// Components

import RideCard from '../components/RideCard';
import { ReturnButton } from '../components/ReturnButton'

// Assets

import CarPool from '../assets/CarPool.png';

// Uitls

import { fetchRouteById } from '../services/routesService';

export default function RideDetails() {
  const { rideId } = useParams();

  const message = '¡Hola! Me gustaría separar un lugar para tu ride al Tec.'

  const didTapPhoneNumber = async () => {
    try {
      const ride : any = await fetchRouteById(rideId!);
      console.log(ride.conductor.phone)
      window.open(
        `https://wa.me/+52${ride.conductor.phone}?text=${message}`,
        '_blank'
      )
    } catch(err){
      console.log(err);
    }
  }

  return (
    <Stack>
      <ReturnButton text='Regresar' />
      <Box sx={{ pb: '56px' }}>
        <Stack direction='row' justifyContent='center'>
          <Container maxWidth="sm" sx={{display: 'flex', flexDirection:'column'}}>
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
          </Container>
          <Box sx={{ alignSelf: 'flex-end' }}>
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
      </Box>
    </Stack>
  )
}