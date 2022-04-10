// import * as React from 'react';
// import { useState, useEffect } from 'react';
// // formik
// import { Form, FormikProvider, ErrorMessage, FieldArray, Field, getIn, FastField } from 'formik';
// // custom hook
// import useCertificateForm from './useCertificateForm'
// // date utils
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateTimePicker from '@mui/lab/DateTimePicker';
// import DatePicker from '@mui/lab/DatePicker';
// // material
// import  {
//         Stack,
//         TextField,
//         FormControlLabel,
//         Grid,
//         FormLabel,
//         Radio,
//         RadioGroup,
//         FormControl,
//         Select,
//         InputLabel,
//         MenuItem,
//         Box,
//         Snackbar,
//         FormHelperText,
//         Button,
//     } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import { SnippetFolder } from '@mui/icons-material';

// function RideForm() {
//   return (
// <FormikProvider value={formik} >
//     <Form 
//         autoComplete="on" 
//         onSubmit={handleSubmit}
//     >
//         <Box sx={{marginBottom:3}}>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={12}>
//                     {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
//                 </Grid>
//                 <Grid item xs={12} md={12} lg={6}>
//     <TextField
//         fullWidth
//         type="text"
//         label="Nombre del deporte"
//         {...getFieldProps('sport')}
//         error={Boolean(touched.sport && errors.sport)}
//         helperText={touched.sport && errors.sport}
//       />            
//                 </Grid>
//                 <Grid item xs={12} md={12} lg={6}>
//                     <TextField
//                         fullWidth
//                         type="text"
//                         label="Deducible"
//                         {...getFieldProps('deductible')}
//                         error={Boolean(touched.deductible && errors.deductible)}
//                         helperText={touched.deductible && errors.deductible}
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={12} lg={6}>
//                     <TextField
//                         fullWidth
//                         type="text"
//                         label="Cobertura"
//                         {...getFieldProps('coverage')}
//                         error={Boolean(touched.coverage && errors.coverage)}
//                         helperText={touched.coverage && errors.coverage}
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={12} lg={6}>
//                     <FormControl fullWidth>
//                         <InputLabel id="demo-simple-select-label">Temporalidad</InputLabel>
//                         <Select
//                             fullWidth
//                             label="Temporalidad"
//                             {...getFieldProps('temporality')}
//                             error={Boolean(touched.temporality && errors.temporality)}
//                         >
//                             <MenuItem value={'ANUAL'} >Anual</MenuItem>
//                             <MenuItem value={'MONTHLY'}>Monthly</MenuItem>
//                             <MenuItem value={'DAILY'}>Daily</MenuItem>
//                         </Select>
//                         {touched.temporality && errors.temporality && <FormHelperText sx={{color:'red'}}>Selecciona una opcion</FormHelperText>}
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={12} lg={6}>
//                     <TextField
//                         fullWidth
//                         type="text"
//                         label="Numero de poliza"
//                         {...getFieldProps('policy_number')}
//                         error={Boolean(touched.policy_number && errors.policy_number)}
//                         helperText={touched.policy_number && errors.policy_number}
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={12} lg={6}>
//                     <TextField
//                         fullWidth
//                         type="text"
//                         label="Precio"
//                         {...getFieldProps('price')}
//                         error={Boolean(touched.price && errors.price)}
//                         helperText={touched.price && errors.price}
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={12} lg={12}>
//                     {!isEdit ? 
//                         null
//                         :
//                         <TextField
//                         fullWidth
//                         type="text"
//                         label="Url"
//                         {...getFieldProps('urlCertificate')}
//                         inputProps={
//                             { readOnly: true, }
//                         }
//                         /> 
//                     }
//                 </Grid>
//             </Grid>
//         </Box>
//         <Box sx={{marginBottom:3}}>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={12} lg={6}>
//                     <LocalizationProvider dateAdapter={AdapterDateFns}>
//                         <DateTimePicker
//                             label="Fecha de inicio"
//                             value={values.init_at}
//                             onChange={(value) => setFieldValue('init_at', value)}
//                             renderInput={(params,) => <TextField  {...params} value={values.init_at} error={
//                                 formik.touched?.init_at &&
//                                 !!formik.errors?.init_at
//                             }/> }
//                         />
//                         {touched.init_at && errors.init_at && <FormHelperText sx={{color:'red'}}>Se requiere una fecha de inicio</FormHelperText>}
//                     </LocalizationProvider>
//                 </Grid>
//                 <Grid item xs={12} md={12} lg={6}>
//                     <LocalizationProvider dateAdapter={AdapterDateFns}>
//                         <DateTimePicker
//                             label="Fecha de termino"
//                             value={values.end_at}
//                             onChange={(value) => setFieldValue('end_at', value)}
//                             renderInput={(params,) => <TextField  {...params} error={
//                                 formik.touched?.end_at &&
//                                 !!formik.errors?.end_at
//                             }/> }
//                         />
//                         {touched.end_at && errors.end_at && <FormHelperText sx={{color:'red'}}>Se requiere una fecha de termino</FormHelperText>}
//                     </LocalizationProvider>
//                 </Grid>
//             </Grid>
//         </Box>
//         <Box sx={{marginBottom:3}}>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={12} lg={6}>
//                     <FormControl component="fieldset"
//                         error={Boolean(touched.is_group && errors.is_group)}
//                     >
//                         <FormLabel component="legend">Grupo</FormLabel>
//                         <RadioGroup
//                             aria-label="group"
//                             defaultValue="No"
//                             value= {values.is_group}
//                             onChange= {(event:any) => {
//                                 setFieldValue('is_group', event.target.value)
//                                 setIsGroup(prev => !prev )
//                                 }}
//                         >
//                             <FormControlLabel  value={true} control={<Radio />} label="Si"  />
//                             <FormControlLabel value={false} control={<Radio />} label="No" />
//                         </RadioGroup>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={12} lg={6}>
//                     <FormControl component="fieldset"
//                         error={Boolean(touched.has_competitions && errors.has_competitions)}
//                     >
//                         <FormLabel component="legend">Incluye competencias</FormLabel>
//                         <RadioGroup
//                             aria-label="has_competitions"
//                             defaultValue="No"
//         value= {values.has_competitions}
//         onChange= {(event:any) => {
//           setFieldValue('has_competitions', event.target.value)
//           setIsGroup(prev => !prev )
//           }}
//                         >
//                             <FormControlLabel  value={true} control={<Radio />} label="Si"  />
//                             <FormControlLabel value={false} control={<Radio />} label="No" />
//                         </RadioGroup>
//                     </FormControl>
//                 </Grid>
//             </Grid>
//         </Box>
//         <Box>
//             <FieldArray
//                 name="insured"
//                 render={arrayHelpers => (
//                     <>
//                         {
//                             values.insured.map((insured, index) => (
//                                 <Box sx={{marginBottom:2, marginTop:2}} key={`key-${index}`}>
//                                     <Grid container spacing={3} >
//                                         <Grid item xs={3} >
//                                             <TextField
//                                                 fullWidth
//                                                 type="text"
//                                                 label="Nombre"
//                                                 {...getFieldProps(`insured[${index}].name`)}
//                                                 error={Boolean(getIn(touched, `insured[${index}][name]`) && getIn(errors, `insured[${index}][name]`))}
//                                                 helperText={getIn(touched, `insured[${index}][name]`) && getIn(errors, `insured[${index}][name]`)}
//                                             />
//                                         </Grid>
//                                         <Grid item xs={3} >
//                                             <TextField
//                                                 fullWidth
//                                                 type="text"
//                                                 label="Apellido"
//                                                 {...getFieldProps(`insured[${index}].last_name`)}
//                                                 error={Boolean(getIn(touched, `insured[${index}][last_name]`) && getIn(errors, `insured[${index}][last_name]`))}
//                                                 helperText={getIn(touched, `insured[${index}][last_name]`) && getIn(errors, `insured[${index}][last_name]`)}
//                                             />
//                                         </Grid>
//                                         <Grid item xs={3}>
//                                             <LocalizationProvider dateAdapter={AdapterDateFns}>
//                                                 <DatePicker
//                                                     label="Nacimiento"
//                                                     value={values.insured[index].birth_date}
//                                                     onChange={(value) => setFieldValue(`insured[${index}].birth_date`, value)}
//                                                     renderInput={(params,) => <TextField  {...params}  
//                                                                                                         error = {Boolean(getIn(touched, `insured[${index}][birth_date]`) && getIn(errors, `insured[${index}][birth_date]`))}
//                                                                                                         />}
//                                                 />
//                                                 {getIn(touched, `insured[${index}][birth_date]`) && getIn(errors, `insured[${index}][birth_date]`) && <FormHelperText sx={{color:'red'}}>La fecha de nacimiento es obligatoria</FormHelperText>}
//                                             </LocalizationProvider>
//                                         </Grid>
//                                         <Grid item xs={2}>
//                                             <FormControl fullWidth error={Boolean(getIn(touched, `insured[${index}][gender]`) && getIn(errors, `insured[${index}][gender]`))}>
//                                                 <InputLabel id="demo-simple-select-label">Genero</InputLabel>
//                                                 <Select
//                                                     fullWidth
//                                                     label="Genero"
//                                                     {...getFieldProps(`insured[${index}].gender`)}
//                                                 >
//                                                     <MenuItem value={'Masculino'} >Masculino</MenuItem>
//                                                     <MenuItem value={'Femenino'}>Femenino</MenuItem>
//                                                 </Select>
//                                                 {getIn(touched, `insured[${index}][gender]`) && getIn(errors, `insured[${index}][gender]`) && <FormHelperText sx={{color:'red'}}>El genero es obligatorio</FormHelperText>}
//                                             </FormControl>
//                                         </Grid>
//                                         <Button onClick={() => arrayHelpers.remove(index)}>-</Button>
//                                     </Grid>
//                                 </Box>
//                             ))			
//                         }
//                         <Button onClick= {() => arrayHelpers.push({'name':'', 'last_name':'', 'birth_date':'', 'gender': ''})}>
//                             Agregar Asegurado
//                         </Button>
//                     </>
//                 )}
//             />
//         </Box>
//         <Box>
//             <FieldArray
//                 name="_tags"
//                 render={arrayHelpers => (
//                     <>
//                         {
//                             values._tags.map((tag, index) => (
//                                 <Box sx={{marginBottom:2, marginTop:2}} key={`key-${index}`}>
//                                     <Grid container spacing={3} >
//                                         <Grid item xs={2}>
//                                             <FormControl fullWidth
//                                                 error={Boolean(getIn(touched, `_tags[${index}]`) && getIn(errors, `_tags[${index}]`))}
//                                             >
//                                                 <InputLabel id="demo-simple-select-label">Tags</InputLabel>
//                                                 <Select
//                                                     fullWidth
//                                                     label="Llaves"
//                                                     // value={options[index] ? options[index] : ''}

//                     value = {options[index] ? ((options[index] == 'responsible') ? 'responsible' : ((options[index] == 'location_state') ? 'location_state' : ((options[index] == 'group_name') ? 'group_name' : 'other'))) : ''}
//                                                     onChange= {(e:any) => {
//                                                         const updatedOptions = [...options];
//                                                         updatedOptions[index] = e.target.value;
//                                                         setOptions(updatedOptions);
//                                                         if (e.target.value != 'other'){
//                                                             setFieldValue(`_tags[${index}].key`, e.target.value)
//                                                         } else {
//                                                             setFieldValue(`_tags[${index}].key`, '')
//                                                         }
//                                                         if(!isEdit){
//                                                             setFieldValue(`_tags[${index}].value`, '')
//                                                         }
//                                                     }}
//                     inputProps={
//                       { readOnly: false}
//                     }
//                                                 >
//                                                     <MenuItem value={'responsible'} >Responsable</MenuItem>
//                                                     <MenuItem value={'location_state'} >Estado</MenuItem>
//                                                     {isGroup && <MenuItem value={'group_name'} >Nombre de grupo</MenuItem>}
//                                                     <MenuItem value={'other'} >Otro</MenuItem>
//                                                 </Select>
//                                             </FormControl>
//                                         </Grid>
//                                         {
//                                             (options[index] != '' && options[index] != 'other' && options[index] != 'location_state') ?
//                                             <>
//                                                 <Grid item xs={2}>
//                                                     <TextField
//                                                         fullWidth
//                                                         type="text"
//                                                         label="Llave"
//                                                         value={options[index] ? options[index] : ''}
//                                                         inputProps={
//                                                             { readOnly: true, }
//                                                         }
//                                                     /> 
//                                                 </Grid>
//                                                 <Grid item xs={2}>
//                                                     <TextField
//                                                         fullWidth
//                                                         type="text"
//                                                         label="Valor"
//                                                         {...getFieldProps(`_tags[${index}].value`)}
//                                                         error={Boolean(getIn(touched, `_tags[${index}][value]`) && getIn(errors, `_tags[${index}][value]`))}
//                                                         helperText={getIn(touched, `_tags[${index}][value]`) && getIn(errors, `_tags[${index}][value]`)}
//                                                     /> 
//                                                 </Grid>
//                                             </> : null
//                                         }
//                                         {
//                                             (options[index] == 'location_state') ? 
//                                             <>
//                                                 <Grid item xs={2}>
//                                                     <TextField
//                                                         fullWidth
//                                                         type="text"
//                                                         label="Llave"
//                                                         value={options[index] ? options[index] : ''}
//                                                         inputProps={
//                                                             { readOnly: true, }
//                                                         }
//                                                     /> 
//                                                 </Grid>
//                                                 <Grid item xs={2}>
//                                                     <FormControl fullWidth error={Boolean(getIn(touched, `_tags[${index}][value]`) && getIn(errors, `_tags[${index}][value]`))}
//                                                     >
//                                                         <InputLabel id="demo-simple-select-label">Estado</InputLabel>
//                                                         <Select
//                                                             fullWidth
//                                                             label="Llaves"
//                                                             {...getFieldProps(`_tags[${index}].value`)}
//                                                         >
//                                                             {cities.map(city => {
//                                                                 return (
//                                                                     <MenuItem value={city} key={`key-${city}`} >{city}</MenuItem>
//                                                                 )
//                                                             })}
//                                                         </Select>
//                                                         {getIn(touched, `_tags[${index}][value]`) && getIn(errors, `_tags[${index}][value]`) && <FormHelperText sx={{color:'red'}}>Selecciona un estado</FormHelperText>}
//                                                     </FormControl>
//                                                 </Grid>
//                                             </> : null
//                                         }
//                                         {
//                                             (options[index] == 'other') ? 
//                                             <>
//                                                 <Grid item xs={2}>
//                                                     <TextField
//                                                         fullWidth
//                                                         type="text"
//                                                         label="Llave"
//                                                         {...getFieldProps(`_tags[${index}].key`)}
//                                                         error={Boolean(getIn(touched, `_tags[${index}][key]`) && getIn(errors, `_tags[${index}][key]`))}
//                                                         helperText={getIn(touched, `_tags[${index}][key]`) && getIn(errors, `_tags[${index}][key]`)}
//                                                     /> 
//                                                 </Grid>
//                                                 <Grid item xs={2}>
//                                                     <TextField
//                                                         fullWidth
//                                                         type="text"
//                                                         label="Valor"
//                                                         {...getFieldProps(`_tags[${index}].value`)}
//                                                         error={Boolean(getIn(touched, `_tags[${index}][value]`) && getIn(errors, `_tags[${index}][value]`))}
//                                                         helperText={getIn(touched, `_tags[${index}][value]`) && getIn(errors, `_tags[${index}][value]`)}
//                                                     /> 
//                                                 </Grid>
//                                             </> : null 
//                                         }
//                                         <Button onClick={() => arrayHelpers.remove(index)}>-</Button>
//                                     </Grid>
//                                 </Box>
//                             ))			
//                         }
//                         <Button onClick= {() => {arrayHelpers.push({'key': '', 'value': ''})
//                                                                         setOptions([...options, ''])}}>
//                             Agregar Tag
//                         </Button>
//                     </>
//                 )}
//             />
//         </Box>
//         <Stack justifyContent="flex-end" direction="row" sx={{ mt: 3 }}>
//             <LoadingButton
//                 size="large"
//                 type="submit"
//                 variant="contained"
//                 loading={isSubmitting}
//             >
//                 {isEdit ? 'Guardar Cambios' : 'Crear'}
//             </LoadingButton> 
//         </Stack>
//     </Form>
// </FormikProvider>
//   )
// }

// export default RideForm

import React from 'react'

function RideForm() {
	return (
		<div>RideForm</div>
	)
}

export default RideForm