import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

// Components

import MapInput from '../inputs/MapInput';

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
import AddRoute from '../../pages/AddRoute';

interface InitialValues {
  direccion: string;
  hora: number;
  minutos: number;
  gasolina: boolean;
  asientos: number;
  afterSubmit?: string;
};
/*
interface IProps {
  name: string
  isActive?: boolean
}*/

const AddRouteSchema = Yup.object().shape({
  direccion: Yup.string().required('Se requiere una direccion'),
  hora: Yup.number().required('Se requiere una hora'),
  minutos: Yup.number().required('Se requiere minutos')
});

export default function AddRouteForm() {
  const navigate = useNavigate();
  const context = useAuth();
  //const {addRoute} = context;

  return (
    <div>
      <Formik
        initialValues={{
          direccion: '',
          hora: 0,
          minutos: 0,
          gasolina: false,
          asientos: 0,
        }}
        validationSchema= {AddRouteSchema}
        onSubmit={async (
          values: InitialValues,
          { setSubmitting, resetForm, setErrors }: FormikHelpers<InitialValues>
        ) => {
          try {
          //  await addRoute(values.direccion, values.hora, values.minutos, values.gasolina, values.asientos);
            navigate(PATH_DASHBOARD.root);
          } catch (error:any){
            console.log(error.response.data.message)
            resetForm();
            //Falta agregar useRef
            setErrors({ afterSubmit: error.response.data.message });
          }
        }}
      >
        {({handleChange, values, errors, touched, isSubmitting, setFieldValue}) => (
          <Form>
            <Stack spacing={2}> 
              <MapInput/>
              <TextField
                fullWidth
                autoComplete="hora"
                type="number"
                label="Hora"
                name= "hora"
                value = {values.hora}
                onChange = {handleChange}
                error={Boolean(touched.hora && errors.hora)}
                helperText={touched.hora && errors.hora}
              />
              <TextField
                fullWidth
                autoComplete="minutos"
                type="number"
                label="Minutos"
                name= "minutos"
                value = {values.minutos}
                onChange = {handleChange}
                error={Boolean(touched.minutos && errors.minutos)}
                helperText={touched.minutos && errors.minutos}
              />
              <TextField
                fullWidth
                autoComplete="asientos"
                type="asientos"
                label="Correo electrónico"
                name= "asientos"
                value = {values.asientos}
                onChange = {handleChange}
                error={Boolean(touched.asientos && errors.asientos)}
                helperText={touched.asientos && errors.asientos}
              />
              <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={isSubmitting}
              >Registrar</LoadingButton>
            </Stack>
          </Form>
        )
        }
        
      </Formik>
    </div>
  )
}
