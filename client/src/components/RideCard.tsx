import React, { useState, useEffect} from 'react';

// UI

import { createStyles, makeStyles } from '@mui/styles';
import { Table, TableCell, TableBody, TableRow, Card, CardContent, Link,Box, Grid, Typography} from '@mui/material';

// Utils

import { fetchRouteById } from '../services/routesService';

interface RideCardType {
  rideId : string
}

function RideCard({rideId}: RideCardType) {
  const [ride, setRide] = useState<any>();
  const classes = useStyles();

  useEffect(() => {
    const getRideById = async () => {
      try {
        const response: any = await fetchRouteById((rideId))
        console.log("RESPONSE", response);
        setRide(response);
      } catch(err){
        console.log(err);
      }
    };
    getRideById();
    }, []);

    return (
      <div>
        {ride ? 
        <>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Table sx={{ minWidth: 650 }}>
                <TableBody>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableLabel}>ID</TableCell>
                    <TableCell>{ride._id}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableLabel}>Conductor</TableCell>
                    <TableCell>{ride.conductor.name}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableLabel}>Hora inicio</TableCell>
                    <TableCell>{ride.horaInicio}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableLabel}>Hora de Llegada</TableCell>
                    <TableCell>{ride.horaLlegada}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableLabel}>Minuto Inicio</TableCell>
                    <TableCell>{ride.minutoInicio}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableLabel}>Minuto Llegada</TableCell>
                    <TableCell>{ride.minutoLlegada}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card> 
        </>
        : 
          null
        }
      </div>  
    )
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


export default RideCard