import React, { useState, useEffect} from 'react';
import { useSnackbar } from 'notistack';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
import { Link as RouterLink } from 'react-router-dom';
// material
import { makeStyles } from '@mui/styles';
import {Box, Link, Dialog, DialogTitle, DialogContent, DialogContentText,
        DialogActions, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MIconButton } from './@material-extend';

// icons
import { Icon } from '@iconify/react';
import eyeIcon from '@iconify/icons-eva/eye-outline';
import trash from '@iconify/icons-eva/trash-2-outline';
import edit from '@iconify/icons-eva/edit-2-outline';
import closeFill from '@iconify/icons-eva/close-fill';

// services
import { deleteRouteById } from '../services/routesService';

// interfaces 
interface data {
    data?:any;
    tableName?:any;
  };

interface GeneralType {
    app: string;
    policies: string;
    sports: string;
    certificates: string;
    createCertificates: string;
    insureds: string;
    products: string;
}

function TableIcons({data, tableName}: data) {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [deleteRide, setDeleteRide] = useState(false);
    const rideId = data.id;

    const handleDeleteSubmit = () => {
      setDeleteRide(true);
      const getRideById = async () => {
        try {
          const accessToken = window.localStorage.getItem('accessToken');
          const response: any = await deleteRouteById((rideId));
          enqueueSnackbar('Ruta eliminada correctamente', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
          console.log(response);
        } catch(err){
          console.log(err);
        }
        setDeleteRide(false);
      };
      getRideById();
    }

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Box sx={{ display: 'flex', justifyContent: "space-evenly",width:'100%', }}>
        <Link 
          sx={{fontWeight:'bold'}} 
          underline="none" 
          color="#637381"  
          component={RouterLink} 
          to={PATH_DASHBOARD.general.rides + 
              `/${data.id}`}
        >
          <Icon 
            className={classes.eyeHover} 
            style={{ fontSize: '22px' }} 
            icon={eyeIcon}
          />
        </Link>
        <Link 
          color="#637381" 
          component={RouterLink} 
          to={PATH_DASHBOARD.general.rides + `/${data.id}/edit`}
        >
          <Icon 
            className={classes.editHover} 
            style={{ fontSize: '22px' }} 
            icon={edit}
          />
        </Link>
        <Link 
          color="#637381" 
          // component={RouterLink} 
          // to={PATH_DASHBOARD.general[tableName as keyof GeneralType] + `/${sport.id}`}
          //onClick={handleClickOpen}
        >
          <Icon 
            className={classes.trashHover} 
            style={{ fontSize: '22px' }} 
            icon={trash}
            onClick={handleClickOpen}
          />
        </Link>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Esta seguro de eliminar este item?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Una vez confirmada la accion no se podra deshacer los cambios
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancelar
            </Button>
            <LoadingButton
              size="small"
              onClick={handleDeleteSubmit}
              variant="contained"
              loading={deleteRide}
            >
              Continuar
            </LoadingButton> 
          </DialogActions>
        </Dialog>
      </Box>
    )
};

const useStyles = makeStyles({
    eyeHover: {
      '&:hover': {
        color:'blue'
      }
    },
    trashHover: {
      '&:hover': {
        color:'red'
      }
    },
    editHover: {
      '&:hover': {
        color:'blue'
      }
    },
    search:{
      margin:"20px"
    },
    enhancedTableToolbar: {
      flex: 1
    },
  });

export default TableIcons