import * as React from 'react';
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

// UI

import {Card, Button, Box, Stack, Typography, Paper, Popper } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { createStyles, makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';

// Components

import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import TableIcons from '../components/TableIcons';

// Utils

import { PATH_DASHBOARD } from '../routes/paths';
import { getRoutes } from '../services/routesService';
import { fetchUserById } from '../services/userService'

// Customed styles
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      alignItems: 'center',
      lineHeight: '24px',
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      '& .cellValue': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  }),
);

// Customed messages for filters
const tableLanguageOptions = {
  columnMenuUnsort: "Esta columna no se puede orderar",
  columnMenuSortAsc: "Clasificar en orden ascendente",
  columnMenuSortDesc: "Classificar en orden descendente",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar",
  columnMenuShowColumns: "Mostrar columnas"
};

// Centers columns' content
const centerColumns = (cellValues: any) => {
  return (
    <Box
      style={{
        fontSize: 16,
        width: "100%",
        textAlign: "center"
      }}
    >
      {cellValues.value}
    </Box>
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

// Define expand column type
type GridCellExpandProps = {
  value: string;
  width: number;
}

const isOverflown = (element: Element): boolean => {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const customNoRowsOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      Por el momento no hay rutas disponibles
    </Stack>
  )
}

export default function RidesList() {
  const [routes, setRoutes] = useState<Row[]>([])
  const navigate = useNavigate();
  const classes = useStyles();

  const GridCellExpand = React.memo(function GridCellExpand(props: GridCellExpandProps) {
    const { width, value } = props;
    const wrapper = useRef<HTMLDivElement | null>(null);
    const cellDiv = useRef(null);
    const cellValue = useRef(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showFullCell, setShowFullCell] = useState(false);
    const [showPopper, setShowPopper] = useState(false);
  
    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown(cellValue.current!);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };
  
    const handleMouseLeave = () => {
      setShowFullCell(false);
    };
  
    useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }
  
      const handleKeyDown = (nativeEvent: KeyboardEvent) => {
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          setShowFullCell(false);
        }
      }
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);
  
    return (
      <Box
        ref={wrapper}
        className={classes.root}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box
          ref={cellDiv}
          style={{
            height: 1,
            width,
            display: 'block',
            position: 'absolute',
            top: 0,
          }}
        />
        <Box ref={cellValue} className="cellValue">
          {value}
        </Box>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, zIndex: 10 }}
          >
            <Paper
              elevation={1}
              style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
            >
              <Typography variant="body2" style={{ padding: 8 }}>
                {value}
              </Typography>
            </Paper>
          </Popper>
        )}
      </Box>
    );
  });

  const renderCellExpand = (params: GridRenderCellParams) => {
    return (
      <GridCellExpand
        value={params.value ? params.value.toString() : ''}
        width={params.colDef.computedWidth}
      />
    );
  }

  const columns: GridColDef[] = [
    { field: 'destiny',
      headerName: 'Dirección',
      flex: 1,
      headerAlign: 'center',
      renderCell: renderCellExpand,
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
      headerName: 'Cooperación de gasolina',
      type: 'boolean',
      flex: 1,
      editable: false,
      sortable: false,
      headerAlign: 'center',
    },
    {
      field: 'availableSeats',
      headerName: 'Asientos disponibles',
      type: 'number',
      flex: 1,
      editable: false,
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
            pageSize={5}
            localeText={tableLanguageOptions}
            components={{ NoRowsOverlay: customNoRowsOverlay }}
          />
        </Box>
      </Card>
    </Stack>
  );
}