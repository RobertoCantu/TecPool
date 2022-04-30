import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom';

// UI

import {Card, Button, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColumns } from '@mui/x-data-grid';

// Components

import RidesTable from '../components/RidesTable';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import RegisterForm  from '../components/authentication/RegisterForm'
import { Modal } from '../components/shared/Modal';
import TableIcons from '../components/TableIcons';

// Utils

import { PATH_DASHBOARD } from '../routes/paths';

// Services 

// services
import { getRoutes } from '../services/routesService';

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

const columns: GridColumns = [
  { field: 'id',
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
    renderCell: (cellValues) => <TableIcons data={cellValues}/>
  },
];

// TODO: quitar cuando se traigan de db
const dummyRows = [
  { id: 1, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 2, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 4, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 3, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 5, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 6, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 7, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 8, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 9, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 10, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 11, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 12, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 13, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 14, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 15, driver: 'Snow', gasoline: true, availableSeats: 4 },
  { id: 16, driver: 'Snow', gasoline: true, availableSeats: 4 },
];

// Define row type
type Row = {
  id: number;
  driver: string;
  gasoline: boolean;
  availableSeats: number;
}

export default function RidesList() {
  const [routes, setRoutes] = useState<Row[]>([])
  const [open, setOpen] = useState(false);

  // Open modal
  const handleOpen = () => setOpen(true);
  // Close modal
  const handleClose = () => setOpen(false);

  // On load component, grab all available routes from db
  useEffect(() => {

    const getRides = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const response: any = await getRoutes()
        const { product } = response;
        console.log(response);
        //setRide(product);
      } catch(err){
        console.log(err);
      }
    };
    getRides();
  }, []);

  return (
    <Stack sx={{height: '100%'}}>
      <HeaderBreadcrumbs
        heading="Rutas Disponibles"
        links={[]}
      />
      <Card style={{ height: '100%', width: '100%' }}>
        <Box sx={{ height: '100%'}}>
          <DataGrid
            rows={routes}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            checkboxSelection
            disableSelectionOnClick
            onRowClick={(e) => {
              console.log("push -> /roles/");
            }}
          />
        </Box>
      </Card>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mt: 8, alignSelf: 'flex-end'}}
        onClick={handleOpen}
      >
        Agregar ruta
      </Button>
      <Modal
        CTA={
          <Button
            fullWidth
            size='large'
            variant="contained"
            sx={{ mt: 8 }}
          >
            Guardar
          </Button>
        }
        title='Agregar Nueva Ruta'
        dialogContent={RegisterForm}
        open={open}
        close={handleClose}
      />
    </Stack>
  );
}