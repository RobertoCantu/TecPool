import React, { useState, useEffect } from 'react';
import DataTableBase from './DataTableBase';
// material
import { makeStyles } from '@mui/styles';
import { alpha } from "@mui/material/styles";
import {Box, Link, OutlinedInput,InputAdornment, styled} from '@mui/material';
// components
// import TableLoader from './TableLoader';
// icons
import { Icon } from '@iconify/react';
import eyeIcon from '@iconify/icons-eva/eye-outline';
import trash from '@iconify/icons-eva/trash-2-outline'
import edit from '@iconify/icons-eva/edit-2-outline'
import searchFill from '@iconify/icons-eva/search-fill';


interface props {
    data:any;
//	keyWord:any;
    columns:any;
    getItems:any;
    count:any;
    loading:any;
};

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`
    },
    margin: '15px',
}));

function DataTable({data, columns, getItems,count, loading}:props) {
    const classes = useStyles();
    const [action, setAction] = useState<string>('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [keyWord, setKeyWord ] = useState("");
    const [searchValue, setSearchValue ] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [open, setOpen ] = useState(false);
    const [openDialogbox, setOpenDialogbox] = useState(false);
    const [disableConfirmButton, setDisableConfirmButton] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(()=> {
        if (searchValue != keyWord){
            const timeout = setTimeout(async () => {
                setSearchValue(keyWord);
            },1000);
            return () => clearTimeout(timeout);
        }
    }, [keyWord]);

    useEffect(()=> {
        getItems(rowsPerPage,page,searchValue);
    }, [rowsPerPage, page, searchValue]);

    const onSelectedRowChangeItems = (sec:any) => {
        const {allSelected, selectedCount, selectedRows} = sec;
        setSelectedItems(selectedRows);
    };

    const handleChangeSearch = (e:any) => {
        setKeyWord(e.target.value)
    };

    const handleConfirmDialogbox = async () => {
        try {
            setDisableConfirmButton(true);
            setIsSubmitting(true);
            const accessToken = window.localStorage.getItem('accessToken');
            //const response: any = await fetchPdf(accessToken, 1528);
            setOpen(true);
        } catch(error){
                console.log(error);
        };
        setDisableConfirmButton(false);
        setIsSubmitting(false);
        setOpenDialogbox(false);
    };

    const handleCloseDialogbox = () => {
        setOpenDialogbox(false);
    };

    const handleClickSnackbar = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onClickPlay = async (selecxdted:any) => {
        console.log(selectedItems);
        if(action === 'Enviar'){
                setOpenDialogbox(true);
                // const accessToken = window.localStorage.getItem('accessToken');
                // const response: any = await fetchPdf(accessToken, 1528);
                //console.log(response);
                //setSucess(true);
                //setOpen(true);
        }
    };

    const handleChangeAction = (event: any) => {
        setAction(event.target.value);
    };

    const handleChangeRowsPerPage = (currentRowsPerPage:number, currentPage:number) => 
    {
        setRowsPerPage(currentRowsPerPage);
        setPage(0);
    };

    const handleChange = (e:any) => {
        setKeyWord(e.target.value)
    }

  return (
        <Box>
            <Box sx={{
                display: 'flex',
                //justifyContent: 'space-between',
                alignItems: 'center',
                ...(selectedItems.length > 0 && {
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.activatedOpacity
                            )
                    })
            }}>
                <SearchStyle
                    value={keyWord}
                    onChange={handleChangeSearch}
                    placeholder="Buscar..."
                    startAdornment={
                        <InputAdornment position="start">
                            <Box 
                                component={Icon} 
                                icon={searchFill} 
                                sx={{ color: 'text.disabled' }}  
                            />
                        </InputAdornment>
                    }
                />
            </Box>
            <DataTableBase
                columns={columns}
                data={data}
                paginationTotalRows={count}
                paginationRowsPerPageOptions={[10,25,50,100]}
                paginationPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChangePage={(page:number, totalRows:number) => {setPage(page - 1)}}
                selectableRows
                onSelectedRowsChange={onSelectedRowChangeItems}
                progressPending={loading}
                // progressComponent = {<TableLoader/>}
            />
        </Box>
  )
}

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
        margin:"20px",
        display: 'flex',
        justifyContent: 'space-between'
    },
    enhancedTableToolbar: {
        flex: 1
    }
});

export default DataTable