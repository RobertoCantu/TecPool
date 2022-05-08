// UI

import { Box, Card, Stack, Container, Typography } from '@mui/material';

// Components

import { RouteForm } from '../components/Rides/RouteForm'
import { ReturnButton } from '../components/ReturnButton'

type AddRoutProps = {
  mainText: string,
  secondaryText: string
}

export const AddRoute = ({mainText, secondaryText}: AddRoutProps) => {
  return (
    <Stack>
      <ReturnButton text='Regresar' />
      <Box sx={{ pb: '56px' }}>
        <Container maxWidth="sm">
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
          <Card sx={{ padding:5 }}>
            <RouteForm />
          </Card>
        </Container>
      </Box>
    </Stack>
  )
};