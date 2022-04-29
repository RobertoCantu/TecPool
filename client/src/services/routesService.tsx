// utils
import axios from '../utils/axios';

export async function getRoutes() {
  return new Promise(async (resolve,reject) => {
    const url = '/rutas';
    try {
        const response =  await axios.get(url, {
          headers: {
            Authorization: 'Bearer '
          }
        });

        resolve(response.data)

    } catch(err){
        reject(err);
    }
  });
}