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
};

export async function createRoute(conductor:string, origen:string,
  horaInicio:string, minutoInicio:string, horaLlegada:string, minutoLlegada:string,
  asientos:string, gasolina:boolean, dias:[]) {
  return new Promise(async (resolve,reject) => {
    const url = '/rutas';
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer' //+ accessToken;
        const response =  await axios.post(url, {
          conductor,
          origen,
          horaInicio,
          minutoInicio,
          horaLlegada,
          minutoLlegada,
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
            Authorization: 'Bearer '
          }
        });

        resolve(response.data)

    } catch(err){
        reject(err);
    }
  });
};

export async function editRouteById(id:string, conductor:string, origen:string, destino:string,
  horaInicio:string, minutoInicio:string, horaLlegada:string, minutoLlegada:string) {
  return new Promise(async (resolve,reject) => {
    const url = `/rutas/${id}`;
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer' //+ accessToken;
        const response =  await axios.post(url, {
          conductor,
          origen,
          destino,
          horaInicio,
          minutoInicio,
          horaLlegada,
          minutoLlegada,
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
            Authorization: 'Bearer '
          }
        });
        resolve(response.data)
    } catch(err){
        reject(err);
    }
  });
}