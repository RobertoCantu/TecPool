import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// UI

import {Card, Button, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColumns } from '@mui/x-data-grid';

// Components

import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import TableIcons from '../components/TableIcons';

// Utils

import { PATH_DASHBOARD } from '../routes/paths';
import { getRoutes } from '../services/routesService';
import { fetchUserById } from '../services/userService'

const tableLanguageOptions = {
  columnMenuUnsort: "Esta columna no se puede orderar",
  columnMenuSortAsc: "Clasificar en orden ascendente",
  columnMenuSortDesc: "Classificar en orden descendente",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar",
  columnMenuShowColumns: "Mostrar columnas"
};

const centerColumns = (cellValues: any) => {
  return (
    <div
      style={{
        fontSize: 16,
        width: "100%",
        textAlign: "center"
      }}
    >
      {cellValues.value}
    </div>
  );
}



// Define row type
type Row = {
  id: string,
  destiny: string,
  driver: string;
  gasoline: boolean;
  availableSeats: number;
}

export default function RidesList() {
  const [routes, setRoutes] = useState<Row[]>([])
  const navigate = useNavigate();

  const columns: GridColumns = [
    { field: 'destiny',
      headerName: 'Colonia',
      flex: 1,
      headerAlign: 'center',
      renderCell: (cellValues) => centerColumns(cellValues)
    },
    {
      field: 'driver',
      headerName: 'Conductor',
      flex: 1,
      editable: false,
      sortable: false,
      headerAlign: 'center',
      renderCell: (cellValues) => centerColumns(cellValues)
    },
    {
      field: 'gasoline',
      headerName: 'Requiere gasolina',
      type: 'boolean',
      flex: 1,
      editable: true,
      sortable: false,
      headerAlign: 'center',
    },
    {
      field: 'availableSeats',
      headerName: 'Asientos disponibles',
      type: 'number',
      flex: 1,
      editable: true,
      sortable: false,
      headerAlign: 'center',
      renderCell: (cellValues) => centerColumns(cellValues)
    },
    {
      field: 'actions',
      type: 'actions',
      renderCell: (cellValues) => <TableIcons data={cellValues} setRoutes= {setRoutes}/>
    },
  ];

  // On load component, grab all available routes from db
  useEffect(() => {

    const getRides = async () => {
      let formattedRoutes: Array<any> = []

      try {
        await getRoutes().then(async (response: any) => {
          response.map(async (element: any) => {
            await fetchUserById(element.conductor).then((user: any) => {
              let newRoute = {
                id: element._id,
                destiny: element.origen,
                driver: user.name + ' ' + user.lastName,
                gasoline: element.gasolina,
                availableSeats: element.asientos,
              }
              formattedRoutes = [...formattedRoutes, newRoute];
              setRoutes(formattedRoutes)
            })
          })
        })
      } catch(err){
        console.log(err);
      }
    };
    getRides();
  }, []);

  return (
    <Stack justifyContent='center' sx={{ height: '100vh', width:'100%', position: 'relative', zIndex:1}}>
      <HeaderBreadcrumbs
        heading="Rutas Disponibles"
        links={[]}
      />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 4, alignSelf: 'flex-end'}}
        onClick={() => navigate(PATH_DASHBOARD.general.rides + '/addRoute')}
      >
        Agregar ruta
      </Button>
      <Card style={{ height: '60%', width: '100%', padding:'32px 24px 12px' }}>
        <Box sx={{ height: '100%'}}>
          <DataGrid
            rows={routes}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={6}
            rowsPerPageOptions={[6]}
            localeText={tableLanguageOptions}
            disableSelectionOnClick
          />
        </Box>
      </Card>
    </Stack>
  );
}