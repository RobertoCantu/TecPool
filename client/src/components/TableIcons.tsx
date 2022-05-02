import React, { useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// UI

import { makeStyles } from '@mui/styles';
import {Box, Link, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MIconButton } from './@material-extend';
import { Icon } from '@iconify/react';
import eyeIcon from '@iconify/icons-eva/eye-outline';
import trash from '@iconify/icons-eva/trash-2-outline';
import edit from '@iconify/icons-eva/edit-2-outline';
import closeFill from '@iconify/icons-eva/close-fill';

// Utils

import { deleteRouteById } from '../services/routesService';
import { fetchUserById } from '../services/userService'
import { PATH_DASHBOARD } from '../routes/paths';

// Hooks

import useAuth from '../hooks/useAuth';

// interfaces 
interface data {
  data?:any;
  tableName?:any;
};

function TableIcons({data, tableName}: data) {

    const classes = useStyles();
    const context = useAuth();
    const { user } = context;

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [enableModifications, setEnableModifications] = useState(false);
    const [deleteRide, setDeleteRide] = useState(false);
    const [open, setOpen] = useState(false);
    const rideId = data.id;

    useEffect(() => {
      const getUserRoutes = async () => {
        if(user) {
          await fetchUserById(user.id).then((response: any) => {
            let found = response.routes.includes(rideId)
            console.log(false)
            if(found) {
              setEnableModifications(true)
            } else {
              setEnableModifications(false)
            }
          })
        }
      }
      getUserRoutes()
    },[user, rideId])

    const handleDeleteSubmit = () => {
      setDeleteRide(true);
      const getRideById = async () => {
        try {
          await deleteRouteById((rideId)).then(() => {
            enqueueSnackbar('La ruta fue eliminada correctamente', {
              variant: 'success',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            });
            setOpen(false)
          })
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
          to={PATH_DASHBOARD.general.rides + `/${data.id}`}
        >
          <Icon 
            className={classes.eyeHover} 
            style={{ fontSize: '22px' }} 
            icon={eyeIcon}
          />
        </Link>
       {enableModifications &&
        <Link 
            color="#637381" 
            component={RouterLink} 
            to={PATH_DASHBOARD.general.rides + `/edit/${data.id}`}
          >
            <Icon 
              className={classes.editHover} 
              style={{ fontSize: '22px' }} 
              icon={edit}
            />
          </Link>
        }
        {enableModifications &&
          <Link 
            color="#637381" 
          >
            <Icon 
              className={classes.trashHover} 
              style={{ fontSize: '22px' }} 
              icon={trash}
              onClick={handleClickOpen}
            />
          </Link>
        }
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"¿Estás seguro de eliminar esta ruta?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Una vez confirmado no se podrán deshacer los cambios.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancelar
            </Button>
            <LoadingButton
              size="small"
              color="error"
              onClick={handleDeleteSubmit}
              variant="contained"
              loading={deleteRide}
            >
              Borrar
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