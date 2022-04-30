import React, { useState, useEffect} from 'react';
// services
import { fetchRouteById } from '../services/routesService';

interface RideCardType {
  rideId : number
}

function RideCard({rideId}: RideCardType) {
  const [ride, setRide] = useState<any>();

  useEffect(() => {
    const getRideById = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const response: any = await fetchRouteById((rideId))
        const { product } = response;
        console.log(response);
        //setRide(product);
      } catch(err){
        console.log(err);
      }
    };
    getRideById();
    }, []);

  return (
    <div>RideCard</div>
  )
}

export default RideCard