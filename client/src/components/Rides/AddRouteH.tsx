import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

// Components

import { MapInput } from '../inputs/MapInput';
import { TimeInput } from '../inputs/TimeInput';

// UI

import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { TextField, Stack, IconButton, InputAdornment, touchRippleClasses, FormGroup, FormControlLabel, Checkbox, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
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
              <TimeInput
                setHour={value => setFieldValue('hora', value)}
                setMinutes={value => setFieldValue('minutos', value)}
                error={Boolean(touched.hora && errors.hora && touched.minutos && errors.minutos)}
                helperText={touched.hora && errors.hora && touched.minutos && errors.minutos}
              />
              <FormControl fullWidth>
                <InputLabel id="select-asientos">Asientos</InputLabel>
                  <Select
                    labelId="select-label-asientos"
                    id="select-asientos"
                    value={values.asientos}
                    label="Asientos"
                    onChange={handleChange}
                  >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                </Select>
              </FormControl>
              <MapInput
                height={50}
                width={50}
                setAddress={value => setFieldValue('direccion', value)}
                error={Boolean(touched.direccion && errors.direccion)}
                helperText={touched.direccion && errors.direccion}
              />
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Apoyo para la gasolina" />
              </FormGroup>
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
