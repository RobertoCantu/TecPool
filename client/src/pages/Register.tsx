import { makeStyles } from '@mui/styles';
import RegisterForm  from '../components/authentication/RegisterForm'
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Container, Typography, Tooltip } from '@mui/material';
// routes
import { PATH_AUTH } from '../routes/paths';

function Register() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography
            variant="body2"
          >
            Ya tienes una cuenta? &nbsp;
        </Typography>
      
        <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
          Iniciar Sesión
        </Link>
      </div>
      <Container>
        <div className={classes.content}>
          <Card sx={{padding: 5}}>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Comienza tu viaje hoy!
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Llena el formulario para crear tu cuenta
                </Typography>
              </Box>
            </Box>
            <RegisterForm/>
          </Card>
        </div>
      </Container>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    
  },
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    paddingTop: '5px',
    justifyContent: 'end',
  }
});

export default Register
 