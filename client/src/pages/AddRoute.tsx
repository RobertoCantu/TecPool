import React from 'react'

import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
// routes
import { PATH_AUTH } from '../routes/paths';
// UI

import { Box, Card, Stack, Container, Typography, Link } from '@mui/material';

// Components

import { RouteForm } from '../components/Rides/RouteForm'

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

type AddRoutProps = {
  mainText: string,
  secondaryText: string
}

export const AddRoute = ({mainText, secondaryText}:AddRoutProps) => {
  const classes = useStyles();

  return (
    <Box sx={{pb: '56px'}}>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              {mainText}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {secondaryText}
            </Typography>
          </Box>
        </Stack>
        <Card sx={{padding:5}}>
          <RouteForm />
        </Card>
      </Container>
    </Box>
  )
};