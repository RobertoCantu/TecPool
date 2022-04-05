import pkg from 'twilio';
const { Twilio } = pkg;
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new Twilio(accountSid, authToken);

function whatsapp(numTelefono, mensaje) {
  return new Promise((resolve, reject) => {
    client.messages
      .create({
        from: "whatsapp:+14155238886",
        body: mensaje,
        to: "whatsapp:+521" + numTelefono,
      })
      .then((mensaje) => resolve())
      .catch((err) => reject(err));
  });
}

export { whatsapp };