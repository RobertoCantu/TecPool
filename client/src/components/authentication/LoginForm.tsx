import * as Yup from 'yup'
// icons
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
import {useState} from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { TextField, Stack, Box, Card, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAuth from '../../hooks/useAuth';

interface InitialValues {
  userName: string;
  password: string;
  afterSubmit?: string;
};

const LoginSchema = Yup.object().shape({
  userName: Yup.string().email('El nombre de usuario debe ser valido').required('Se requiere un nombre de usuario'),
  password: Yup.string().required('Se requiere una contraseña')
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const context = useAuth();
  const {login} = context;

  const onClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  };

  return (
    <div>
      <Formik
        initialValues={{
          userName: '',
          password: '',
        }}
        validationSchema= {LoginSchema}
        onSubmit={async (
          values: InitialValues,
          { setSubmitting, resetForm, setErrors }: FormikHelpers<InitialValues>
        ) => {
          try {
            await login(values.userName, values.password);
          } catch (error:any){
            console.log(error.response.data.message)
            resetForm();
            //Falta agregar useRef
            setErrors({ afterSubmit: error.response.data.message });
          }
        }}
      >
        {({handleChange, values, errors, touched, isSubmitting}) => (
          <Form>
            <Stack spacing={2}>
              <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label="Nombre de usuario"
                name= "userName"
                value = {values.userName}
                onChange = {handleChange}
                error={Boolean(touched.userName && errors.userName)}
                helperText={touched.userName && errors.userName}
              />
              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                label="Contraseña"
                name= "password"
                value= {values.password}
                onChange = {handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={onClickShowPassword}>
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={isSubmitting}
              >Iniciar Sesion</LoadingButton>
            </Stack>
          </Form>
        )
        }
        
      </Formik>
    </div>
  )
}
