// utils
import axios from '../utils/axios';

export async function fetchUserById(id:string) {
  return new Promise(async (resolve,reject) => {
    const url = `/users/${id}`;
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
};