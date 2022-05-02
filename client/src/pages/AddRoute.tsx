import React from 'react'

import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
// routes
import { PATH_AUTH } from '../routes/paths';
// UI

import { Box, Card, Stack, Container, Typography, Link } from '@mui/material';

// Components

import AddRouteForm from '../components/Rides/AddRouteForm'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh'
  },
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px'
  }
});

function AddRoute() {
  const classes = useStyles();

  return (
    <div >
      <Container maxWidth="lg">
       <div >
        <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Nueva Ruta
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Ingresa los datos
                </Typography>
              </Box>
            </Stack>
          <Card sx={{padding:5}}>
            
            <AddRouteForm/>
          </Card>
        </div>
      </Container>
    </div>

  )
};

export default AddRoute