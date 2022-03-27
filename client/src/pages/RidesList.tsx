import { useState } from 'react'
// routes
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from '../routes/paths';
// material
import {Card, Button,} from '@mui/material';
// components
// import {SportsTable} from '../../../components/insurance/sport';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// import Page from '../../../components/Page';
// icons
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// // services
// import { fetchSports } from '../../../services/insuranceService';
// // types
// import { SportType } from '../../../@types/insurance';
import Rides from '../components/RidesTable';


function RidesList() {
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

      return (
        <div>
          <HeaderBreadcrumbs
            heading="Lista de Viajes"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Lista' }
            ]}
            action={
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.root}
                startIcon={<Icon icon={plusFill} />}
              >
                Agregar viaje
              </Button>
            }
          />
          <Card>
            <Rides
              defaultRides={rides}
              count={rides.length}
              getRides={getRides}
              loading= {loadingTable}
            />
          </Card>
        </div>
      )
}

export default RidesList