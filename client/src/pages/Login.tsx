import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
// routes
import { PATH_AUTH } from '../routes/paths';
// UI

import { Box, Card, Stack, Container, Typography, Link } from '@mui/material';

// Components

import LoginForm from '../components/authentication/LoginForm'

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
                  Iniciar Sesión en TecPool
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Ingresa tus datos
                </Typography>
              </Box>
            </Stack>
            <LoginForm/>
             <Typography variant="body2" align="center" sx={{ mt: 3 }}>
             ¿No tienes una cuenta?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                Haz click para crear una
              </Link>
            </Typography>
          </Card>
        </div>
      </Container>
    </div>

  )
};

export default Login