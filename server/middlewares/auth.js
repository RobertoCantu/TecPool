import { verifyToken } from "../utils/generateToken.js";
import Ruta from "../models/modeloRuta.js";

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);

        const tokenData = await verifyToken(token);
        //console.log(tokenData)
        if (tokenData.id){
            next();
        } else {
            res.status(409);
            res.send({error: 'No tienes acceso a este recurso'})   
        }
    }
    catch (err){
        res.send({error: 'No tienes acceso a este recurso'})  
    }
}

export const checkUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        const tokenData = await verifyToken(token);
        const routeData = await Ruta.findById(req.params.id);

        if (routeData.conductor == tokenData.id){
            next();
        } else {
            res.status(409);
            res.send({error: 'No tienes acceso a este recurso'})   
        }
    }
    catch (err){
        res.send({error: 'No tienes acceso a este recurso'})  
    }
}
