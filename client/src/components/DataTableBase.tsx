import DataTable from 'react-data-table-component';
import {Checkbox} from '@mui/material'

// import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import { ArrowDownward } from '@material-ui/icons';

// const sortIcon = <ArrowDownward />;
// const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

const customStyles = {
    headCells: {
        style: {
                backgroundColor: '#f4f6f8',
                color: '#667684',
                fontWeight: 'bold',
                fontSize: '14px'
        },
    }
};

function DataTableBase(props:any) {
    return (
        <DataTable
            pagination
            paginationServer
            selectableRowsComponent={Checkbox}
            // selectableRowsComponentProps={selectProps}
            //sortIcon={sortIcon}
            customStyles={customStyles}
            {...props}
        />
    );
}

export default DataTableBase;