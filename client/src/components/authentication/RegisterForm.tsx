import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

// UI

import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { TextField, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Hooks

import useAuth from '../../hooks/useAuth';

// Utils

import { PATH_DASHBOARD } from '../../routes/paths';

type InitialValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  afterSubmit?: string;
  };
  
const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Demasiado Corto!')
    .max(50, 'Demasiado Largo!')
    .required('Se requiere el primer nombre'),
  lastName: Yup.string().min(2, 'Demasiado Corto!').max(50, 'Demasiado Largo!').required('Se requiere el apellido'),
  email: Yup.string().email('El correo debe ser una direccion de correo valida').required('Se requiere el email'),
  phone: Yup.string().required('Se requiere el numero telefonico'),
  password: Yup.string().required('Se requiere una contraseña')
});

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const context = useAuth();
  const {register} = context;

  const onClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  };

  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: ''
        }}
        validationSchema= {RegisterSchema}
        onSubmit={async (
          values: InitialValues,
          { setSubmitting, resetForm, setErrors }: FormikHelpers<InitialValues>
        ) => {
          try {
            console.log(values);
            await register(values.firstName, values.lastName, values.email, values.phone, values.password);
            navigate(PATH_DASHBOARD.root);
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
                  autoComplete="firstName"
                  type="text"
                  label="Primer Nombre"
                  name= "firstName"
                  value = {values.firstName}
                  onChange = {handleChange}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  fullWidth
                  autoComplete="lastName"
                  type="text"
                  label="Apellido"
                  name= "lastName"
                  value = {values.lastName}
                  onChange = {handleChange}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Correo electronico"
                  name= "email"
                  value = {values.email}
                  onChange = {handleChange}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                 <TextField
                  fullWidth
                  autoComplete="username"
                  type="text"
                  label="Numero telefónico"
                  name= "phone"
                  value = {values.phone}
                  onChange = {handleChange}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
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
                >
                  Registrarse
                </LoadingButton>
            </Stack>
          </Form>
        )
        }
      </Formik>
    </div>
  )
}

export default RegisterForm
