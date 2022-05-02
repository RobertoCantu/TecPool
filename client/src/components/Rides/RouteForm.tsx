import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

// Components

import { MapInput } from '../inputs/MapInput';

// UI

import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { TextField, Stack, Grid, OutlinedInput, CircularProgress} from '@mui/material';
import { FormGroup, FormControlLabel, Checkbox, Select, FormControl, InputLabel, MenuItem, Box, ListItemText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TimePicker } from '@mui/lab';

// Hooks

import useAuth from '../../hooks/useAuth';

// Utils

import { PATH_DASHBOARD } from '../../routes/paths';
import { createRoute, editRouteById} from '../../services/routesService'
import { MIconButton } from '../@material-extend';
import { fetchRouteById } from '../../services/routesService';

interface InitialValues {
  direccion: string;
  hora: any;
  gasolina: boolean;
  asientos: string;
  days: any;
  afterSubmit?: string;
};

const AddRouteSchema = Yup.object().shape({
  direccion: Yup.string().required('Se requiere una direccion'),
  hora: Yup.string().required('Se requiere una hora'),
});

export const RouteForm = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [selected, setSelected] = useState<any>([]);
  const [ride, setRide] = useState<any>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let { rideId } = useParams();


  const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  const isAllSelected =
  dias.length > 0 && selected.length === dias.length;

  useEffect(() => {
    const getRouteInfo = async () => {
      try {
        const response: any = rideId && await fetchRouteById(rideId)
        console.log("response", response)
        setRide(response);
        setSelected(response.dias)
      } catch(err){
        console.log(err);
      }
    }

    getRouteInfo()
  }, [rideId])

  const handleChangeCheck = (event:any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === dias.length ? [] : dias);
      return;
    }
    setSelected(value);
  };

  return (
    <Box>
      <Formik
        enableReinitialize={true} 
        initialValues={{
          direccion: ride?.origen || '',
          hora: ride?.horaLlegada || null,
          gasolina: ride?.gasolina || false,
          asientos: ride?.asientos || '',
          days: ride?.dias || []
        }}
        onSubmit={async (
          values: InitialValues,
          { setSubmitting, resetForm, setErrors }: FormikHelpers<InitialValues>
        ) => {
          try {
            const {direccion, hora, gasolina, asientos, days } = values;
            if(rideId){
              await editRouteById(rideId!, user?.id, direccion, hora, asientos, gasolina, days)
            } else {
              await createRoute(user?.id, direccion, hora, asientos, gasolina, days)
            }
            enqueueSnackbar(rideId ? '¡Ruta actualizada exitosamente!': '¡Ruta creada exitosamente!', {
              variant: 'success',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            });
            navigate(PATH_DASHBOARD.root);
          } catch (error:any){
            console.log(error.response.data.message)
            resetForm();
            setSelected([]);
            setErrors({ afterSubmit: error.response.data.message });
          }
        }}
      >
        {({handleChange, values, errors, touched, isSubmitting, setFieldValue}) => {
        return (          
          <Form>
            <Grid container spacing={4}>
              <Grid item xs={12}>
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
              <Grid item container xs={12} spacing={4}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                      <TimePicker
                        views={['hours', 'minutes']}
                        label="Llegada a parada"
                        value={values.hora}
                        onChange={(newValue) => {
                          setFieldValue('hora', newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-asientos">Asientos</InputLabel>
                    <Select
                      labelId="select-label-asientos"
                      id="select-asientos"
                      value={values.asientos}
                      name="asientos"
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
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <MapInput
                  height={300}
                  width={300}
                  setAddress={value => setFieldValue('direccion', value)}
                  error={Boolean(touched.direccion && errors.direccion)} // el .address se cambia por la variable que quieran
                  helperText={touched.direccion && errors.direccion}
                  defaultAddress={values.direccion}
                  enableTextInput
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel 
                    control={<Checkbox />} 
                    label="Apoyo para la gasolina" 
                    checked={values.gasolina}
                    onChange= {() => setFieldValue('gasolina', !values.gasolina)}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  loading={isSubmitting}
                >
                  {rideId ? 'Guardar cambios' : 'Agregar ruta'}
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        )}}
      </Formik>
    </Box>
  )
}