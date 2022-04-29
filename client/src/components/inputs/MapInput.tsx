import { useState, useRef } from 'react'
import { makeStyles } from '@mui/styles';

// UI

import {Button, TextField, Stack, Box, CircularProgress } from '@mui/material';

// Utils

import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'

// MapInput styles
const useStyles = makeStyles({
  autoComplete: {
    width: '100%'
  },
});

// Define types and props
type Coordinates = {
  lat: number,
  lng: number,
};

type MapProps = {
  height: number,
  width: number,
  error: boolean,
  helperText: string  | boolean | undefined,
  setAddress: (value: string) => void
}

export const MapInput = ({height, width, setAddress, error, helperText}:MapProps) => {
  const classes = useStyles();

  const [directionsResponse, setDirectionResponse] = useState<google.maps.DirectionsResult | null>(null)
  const originRef = useRef<HTMLInputElement | null>(null)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'] // enable places API
  })

  // Save map in ref if we want to access the map
  const mapRef = useRef<google.maps.Map | null>(null);

  const onload = (map: google.maps.Map): void => {
    mapRef.current = map;
  }

  const onUnMount = (): void => {
    mapRef.current = null;
  }

  const center: Coordinates = {
    lat: 25.652164527595186,
    lng: -100.2896687460225,
  };

  const calculateRoute = async(): Promise<void> => {
    if(originRef.current?.value === '') return;

    const directionService = new google.maps.DirectionsService()
    const results = await directionService.route({
      origin: originRef.current?.value!,
      destination: 'Tecnológico de Monterrey, Avenida Eugenio Garza Sada, Tecnológico, Monterrey, Nuevo León, México',
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionResponse(results)
    setAddress(originRef.current?.value!)
    console.log("RESULTS", results)
  }
  
  if(!isLoaded) return <CircularProgress />

    return (
      <Stack alignItems= 'center' spacing={4} justifyContent= 'center' sx={{width: '100%'}}>
        <Autocomplete onPlaceChanged={()=> calculateRoute()} className={classes.autoComplete}>
          <TextField error={error} helperText={helperText} sx={{width: '100%'}} label="Dirreción de la parada" variant="outlined" inputRef={originRef} onChange={(e) => setAddress(e.target.value)}/>
        </Autocomplete>
        <Box sx={{ height: 100, width: 100 }}>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{width:'100%', height: '100%'}}
            onLoad={onload}
            onUnmount={onUnMount}
          >
            <Marker position={center}/>
            {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
          </GoogleMap>
        </Box>
        <Button onClick={() => mapRef.current?.panTo(center)}>
          Centrar
        </Button>
      </Stack>
    )
}