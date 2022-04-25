import pkg from 'twilio';
const { Twilio } = pkg;
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new Twilio(accountSid, authToken);

function pasajero(numTelefono) {
  return new Promise((resolve, reject) => {
    client.messages
      .create({
        from: "whatsapp:+14155238886",
        body: "Se ha encontrado una ruta que podría ser de tu interés. Ingresa a tecpools.tec.mx para verla.",
        to: "whatsapp:+521" + numTelefono,
      })
      .then((mensaje) => resolve())
      .catch((err) => reject(err));
  });
}

function conductor(numTelefono) {
  return new Promise((resolve, reject) => {
    client.messages
      .create({
        from: "whatsapp:+14155238886",
        body: "Hay nuevos pasajeros buscando rutas. Entra a tecpools.tec.mx para conocerlos.",
        to: "whatsapp:+521" + numTelefono,
      })
      .then((mensaje) => resolve())
      .catch((err) => reject(err));
  });
}

export { pasajero, conductor };