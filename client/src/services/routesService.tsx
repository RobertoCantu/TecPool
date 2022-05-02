// utils
import axios from '../utils/axios';

export async function getRoutes() {
  return new Promise(async (resolve,reject) => {
    const url = '/rutas';
    try {
        const response =  await axios.get(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
        });

        resolve(response.data)

    } catch(err){
        reject(err);
    }
  });
};

export async function createRoute(conductor:string, origen:string,
   horaLlegada:string,
  asientos:string, gasolina:boolean, dias:[]) {
  return new Promise(async (resolve,reject) => {
    const url = '/rutas';
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('accessToken');
        const response =  await axios.post(url, {
          conductor,
          origen,
          horaLlegada,
          asientos,
          gasolina,
          dias
        });
        resolve(response.data)
    } catch(err){
        reject(err);
    }
  });
};

export async function fetchRouteById(id:string) {
  return new Promise(async (resolve,reject) => {
    const url = `/rutas/${id}`;
    try {
        const response =  await axios.get(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
        });

        resolve(response.data)

    } catch(err){
        reject(err);
    }
  });
};

export async function editRouteById(id:string, conductor:string, origen:string,
  horaLlegada:string, asientos:string, gasolina:boolean, dias:[]) {
  return new Promise(async (resolve,reject) => {
    const url = `/rutas/${id}`;
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('accessToken');
        const response =  await axios.post(url, {
          conductor,
          origen,
          horaLlegada,
          asientos,
          gasolina,
          dias
        });
        resolve(response.data)
    } catch(err){
        reject(err);
    }
  });
};

export async function deleteRouteById(id:number) {
  return new Promise(async (resolve,reject) => {
    const url = `/rutas/${id}`;
    try {
        const response =  await axios.delete(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
        });
        resolve(response.data)
    } catch(err){
        reject(err);
    }
  });
}