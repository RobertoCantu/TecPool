import React, { useState, useEffect} from 'react';

// UI

import { createStyles, makeStyles } from '@mui/styles';
import { Table, TableCell, TableBody, TableRow, Card, CardContent, CircularProgress, Box } from '@mui/material';

// Components

import { MapInput } from './inputs/MapInput'

// Utils

import { fetchRouteById } from '../services/routesService';

interface RideCardType {
  rideId : string
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    tableRow: {
      borderBottom: '1px solid #eef1f4',

      '& td:first-child': {
        paddingLeft: '0px'
      }
    },
    tableLabel: {
      color: '#7c858e',
      width: '25%'
    }
  }),
);

function RideCard({rideId}: RideCardType) {
  const [ride, setRide] = useState<any>();
  const [_, setAddress] = useState<string>('');
  const classes = useStyles();

  useEffect(() => {
    const getRideById = async () => {
      try {
        const response: any = await fetchRouteById((rideId))
        setRide(response);
      } catch(err){
        console.log(err);
      }
    };
    getRideById();
  }, [rideId]);

  const formatDate = (date: string) => {
    let newDate = new Date(date);
    let pm = newDate.getHours() >= 12 ? true : false
    return `${newDate.getHours()}: ${newDate.getMinutes()} ${pm ? 'PM' : 'AM'}`
  }

    return (
      <Box>
        {ride ? 
          <Card sx={{ minWidth: 200, height: '100%', width: '100%', px:'8px'}}>
            <CardContent>
              <Table sx={{ minWidth: 250 }}>
                <TableBody>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableLabel}>Parada</TableCell>
                    <TableCell>{ride.origen}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableLabel}>Conductor</TableCell>
                    <TableCell>{ride.conductor.name + ' ' + ride.conductor.lastName}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableLabel}>Asientos</TableCell>
                    <TableCell>{ride.asientos}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableLabel}>Hora de Llegada</TableCell>
                    <TableCell>{formatDate(ride.horaLlegada)}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableLabel}>Cooperación de gasolina</TableCell>
                    <TableCell>{ride.gasolina}</TableCell>
                  </TableRow>
                  <TableRow sx={{ mt: '64px'}}>
                  <TableCell className={classes.tableLabel}>
                    <MapInput
                      height={250}
                      width={250}
                      setAddress={value => setAddress(value)}
                      defaultAddress={ride.origen}
                    />
                  </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        : 
          <CircularProgress size={80}/>
        }
      </Box>  
    )
  }

export default RideCard