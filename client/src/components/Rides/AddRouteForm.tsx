import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


// Components

import { MapInput } from '../inputs/MapInput';
import { TimeInput } from '../inputs/TimeInput';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

// UI

import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { TextField, Stack, IconButton, InputAdornment, Grid, OutlinedInput} from '@mui/material';
import { FormGroup, FormControlLabel, Checkbox, Select, SelectChangeEvent, FormControl, InputLabel, MenuItem, Box, ListItemText } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// services
import {createRoute} from '../../services/routesService'

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
  days: any;
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
  const {user} = useAuth();
  const [selected, setSelected] = useState<any>([]);

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const isAllSelected =
  dias.length > 0 && selected.length === dias.length;
  //const {addRoute} = context;
  //const [personName, setPersonName] = React.useState<string[]>([]);
  const handleChangeCheck = (event:any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === dias.length ? [] : dias);
      return;
    }
    setSelected(value);
  };
  return (
    <div>
      <Formik
        initialValues={{
          direccion: '',
          hora: 0,
          minutos: 0,
          gasolina: false,
          asientos: 0,
          days: []
        }}
        validationSchema= {AddRouteSchema}
        onSubmit={async (
          values: InitialValues,
          { setSubmitting, resetForm, setErrors }: FormikHelpers<InitialValues>
        ) => {
          try {
            console.log(values)
            // extract values
           const {direccion, hora, minutos, gasolina, asientos, days } = values;
          //  await addRoute(values.direccion, values.hora, values.minutos, values.gasolina, values.asientos);
          //const response:any = await createRoute(user.id, "tec", direccion,  )
            // navigate(PATH_DASHBOARD.root);
          } catch (error:any){
            console.log(error.response.data.message)
            resetForm();
            //Falta agregar useRef
            setErrors({ afterSubmit: error.response.data.message });
          }
        }}
      >
        {({handleChange, values, errors, touched, isSubmitting, setFieldValue}) => {
          
        return (
          
          <Form>
            <Box sx={{marginBottom:3}}>

            <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={6}>

              <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">Dias</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selected}
                  onChange={(event) => {
                    handleChangeCheck(event);
                    setFieldValue('days', event.target.value);
                  }}
                  input={<OutlinedInput label="Dias" />}
                  renderValue={(selected) => selected.join(', ')}
                  // MenuProps={MenuProps}
                >
                  {
                    dias.map((dia) => (
                      <MenuItem key={dia} value={dia}>
                        <Checkbox checked={selected.indexOf(dia) > -1} />
                        <ListItemText primary={dia} />
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>

                <Box
                  sx={{
                    width: 200,
                    height: 70
                  }}
                >
                  <TimeInput
                    setHour={value => setFieldValue('hora', value)}
                    setMinutes={value => setFieldValue('minutos', value)}                   error={Boolean(touched.hora && errors.hora && touched.minutos && errors.minutos)}
                    helperText={touched.hora && errors.hora && touched.minutos && errors.minutos}
                  />
                </Box>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>

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
                </Grid>


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
              >Agregar</LoadingButton>
            </Grid>
            </Box>
          </Form>
        )
                }
        }
        
      </Formik>
    </div>
  )
}