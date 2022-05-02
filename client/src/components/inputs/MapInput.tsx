import { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@mui/styles';

// UI

import {Button, TextField, Stack, Box, CircularProgress } from '@mui/material';

// Utils

import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'

const center: Coordinates = {
  lat: 25.652164527595186,
  lng: -100.2896687460225,
};

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
  error?: boolean,
  helperText?: string  | boolean | undefined,
  setAddress: (value: string) => void,
  enableTextInput? : boolean,
  defaultAddress?: string, // For calculating a route on mount
}

export const MapInput = ({height, width, setAddress, error, helperText, defaultAddress, enableTextInput}:MapProps) => {
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
    if(defaultAddress){
      calculateRoute(defaultAddress)
    }
  }

  const onUnMount = (): void => {
    mapRef.current = null;
  }

  const calculateRoute = async(defaultAddress?: string): Promise<void> => {
    if(originRef.current?.value === '' && defaultAddress === '') return;

    const directionService = new google.maps.DirectionsService()
    const results = await directionService.route({
      origin: defaultAddress || originRef.current?.value!,
      destination: 'Tecnológico de Monterrey, Avenida Eugenio Garza Sada, Tecnológico, Monterrey, Nuevo León, México',
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionResponse(results)
    setAddress(defaultAddress || originRef.current?.value!)
  }

  if(!isLoaded) return <CircularProgress />

    return (
      <Stack alignItems= 'center' spacing={4} justifyContent= 'center' sx={{width: '100%'}}>
        {enableTextInput &&
          <Autocomplete onPlaceChanged={()=> calculateRoute()} className={classes.autoComplete}>
            <TextField value={defaultAddress} error={error} helperText={helperText} sx={{width: '100%'}} label="Dirreción de la parada" variant="outlined" inputRef={originRef} onChange={(e) => setAddress(e.target.value)}/>
          </Autocomplete>
        }
        <Box sx={{ height: height, width: width }}>
          <GoogleMap
            center={center}
            zoom={directionsResponse ? 60 : 15}
            mapContainerStyle={{width:'100%', height: '100%'}}
            onLoad={onload}
            onUnmount={onUnMount}
          >
            <Marker position={center}/>
            {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
          </GoogleMap>
        </Box>
        {/*<Button onClick={() => mapRef.current?.panTo(center)}>
          Centrar
        </Button>*/}
      </Stack>
    )
}