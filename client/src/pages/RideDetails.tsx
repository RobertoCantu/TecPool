import React from 'react';
import { useParams } from 'react-router-dom';
import RideCard from '../components/RideCard';

function RideDetails() {
  const { rideId } = useParams();

  return (
    <div>
      { rideId ? 
        <RideCard rideId={parseInt(rideId)}/>
      : null }
    </div>
  )
}

export default RideDetails