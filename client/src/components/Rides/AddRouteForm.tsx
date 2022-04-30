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
import { TextField, Stack, IconButton, InputAdornment } from '@mui/material';
import { FormGroup, FormControlLabel, Checkbox, Select, SelectChangeEvent, FormControl, InputLabel, MenuItem, Box, ListItemText } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Hooks

import useAuth from '../../hooks/useAuth';

// Utils

import { PATH_DASHBOARD } from '../../routes/paths';
import AddRoute from '../../pages/AddRoute';
import Container from '../../theme/overrides/Container';

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
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  //const {addRoute} = context;
  //const [personName, setPersonName] = React.useState<string[]>([]);

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
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                 // value={personName}
                  onChange={handleChange}
                 // input={<OutlinedInput label="Tag" />}
                //  renderValue={(selected) => selected.join(', ')}
                //  MenuProps={MenuProps}
                >
                  {/*dias.map((dia) => (
                    <MenuItem key={dia} value={dia}>
                      <Checkbox checked={personName.indexOf(dia) > -1} />
                      <ListItemText primary={dia} />
                    </MenuItem>
                  ))*/}
                </Select>
              </FormControl>
              <Stack direction="row" spacing={2}>
                <Box
                  sx={{
                    width: 200,
                    height: 70
                  }}
                >
                  {/*<TimeInput
                    setHour={value => setFieldValue('hora', value)}
                    setMinutes={value => setFieldValue('minutos', value)}                   error={Boolean(touched.hora && errors.hora && touched.minutos && errors.minutos)}
                    helperText={touched.hora && errors.hora && touched.minutos && errors.minutos}
                  />*/}
                </Box>
                <Box
                  sx={{
                    width: 100,
                    height: 70
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="select-asientos">Asientos</InputLabel>
                    <Select
                      labelId="select-label-asientos"
                      id="select-asientos"
                      value={values.asientos}
                      label="Asientos"
                      //setAddress={value => setFieldValue('direccion', value)}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
              <MapInput
                height={300}
                width={300}
                setAddress={value => setFieldValue('direccion', value)}
                error={Boolean(touched.direccion && errors.direccion)} // el .address se cambia por la variable que quieran
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
