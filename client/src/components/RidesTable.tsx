import React from 'react'
import { TableColumn } from 'react-data-table-component';
import Table from './DataTable';

// interfaces 
interface rides {
	defaultRides:any;
	count:any;
	getRides:any;
	loading:any;
}


function Rides({defaultRides, count, getRides, loading}: rides) {

	const columns: TableColumn<any>[]  = [
		{
			name: 'Colonia',
			selector: row => row.id
		},
		{
			name: 'Conductor',
			selector: row => row.driver
		},
		{
			name: 'Rating',
			selector: row => row.rating
		},
		{
			name: 'Disponibilidad',
			selector: row => row.availability
		},
	]

  return (
		<Table
      data={defaultRides}
      columns={columns}
      getItems={getRides}
      count={count}
      loading={loading}
    />
  )
}

export default Rides