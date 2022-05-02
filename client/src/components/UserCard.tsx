import {useContext } from 'react'

// UI

import { createStyles, makeStyles } from '@mui/styles';
import { Table, TableCell, TableBody, TableRow, Card, CardContent, Link,Box, Grid, Typography} from '@mui/material';

// Utils
import useAuth from '../hooks/useAuth';


function UserCard() {

  const classes = useStyles();
  const { user } = useAuth();

  const message = '¡Hola! Me gustaría separar un lugar para el ride al Tec.'

  const didTapPhoneNumber = () => {
    if(user){
      window.open(
        `https://wa.me/+${user.phone}?text=${message}`,
        '_blank'
      )
    }
  }

  return (
    <div>
      {user ? 
      <>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                <TableRow className={classes.tableRow}>
                  <TableCell className={classes.tableLabel}>Nombre</TableCell>
                  <TableCell>{user.name + ' ' + user.lastName}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell className={classes.tableLabel}>Email</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell className={classes.tableLabel}>
                    Telefono
                  </TableCell>
                  <TableCell onClick={() =>didTapPhoneNumber()}>
                    {user.phone}
                  </TableCell>
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

export default UserCard