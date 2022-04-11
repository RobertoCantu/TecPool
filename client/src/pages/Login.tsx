import React from 'react';
import { makeStyles } from '@mui/styles';
import LoginForm from '../components/authentication/LoginForm'
//import Card from '../theme/overrides/Card'
// material
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';

function Login() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
       <div className={classes.content}>
          <Card sx={{padding:5}}>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Iniciar Sesión a TecPool
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Ingresa tus datos debajo</Typography>
              </Box>
            </Stack>
            <LoginForm/>
          </Card>
        </div>
      </Container>
    </div>

  )
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    paddingTop: '20px',
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

export default Login