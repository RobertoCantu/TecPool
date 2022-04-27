import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';

// UI

import {Card, Button, Stack, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';

// Components

import RidesTable from '../components/RidesTable';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// Utils

import { PATH_DASHBOARD } from '../routes/paths';

const RidesList: React.FC = () => {
  
    // const [sports, setSports] = useState<SportType[]>();
    //   const [count, setCount] = useState(0);
      const [loadingTable, setLoadingTable] = useState(false);

    //   const getSports = async (rowsPerPage:number,page:number,searchValue:string) => {
    //     setLoadingTable(true);
    //     try {
    //       const accessToken = window.localStorage.getItem('accessToken');
    //       const response = await fetchSports(accessToken,
    //                                         rowsPerPage, page, searchValue);
    //       console.log(response);
    //       const {sports, count} = response;
    //       setSports(sports);
    //       setCount(count);
    //       setLoadingTable(false);
    //     } catch(err) {
    //       console.log(err);
    //     }
    //   }

    const getRides = () => {

    }
    const rides = [
        {
            id: '1',
            driver: 'Pepito',
            rating: '5',
            availability: 'Si'
        }
    ]

    /*
                action={
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.root}
                startIcon={<Icon icon={plusFill} />}
              >
                Agregar ruta
              </Button>
            }
    */

      return (<>
        <Stack>
          <HeaderBreadcrumbs
            heading="Rutas Disponibles"
            links={[]}
          />
          <Card>
            <RidesTable
              defaultRides={rides}
              count={rides.length}
              getRides={getRides}
              loading= {loadingTable}
            />
          </Card>
        </Stack>
        <Fab color="primary" variant="extended" aria-label="add" sx={{position: "fixed", bottom: '64px', right: '124px'}}>
          <AddIcon />
          Agregar ruta
        </Fab>
      </> )
}

export default RidesList