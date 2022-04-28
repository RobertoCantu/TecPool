import pkg from 'twilio';
import nodemailer from "nodemailer";
import dotenv from "dotenv";
const { Twilio } = pkg;

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mailPassword = process.env.MAIL_PASS;

const client = new Twilio(accountSid, authToken);

function whatsPassenger(numTelefono) {
  return new Promise((resolve, reject) => {
    client.messages
      .create({
        from: "whatsapp:+14155238886",
        body: "Se ha agregado una ruta que podría ser de tu interés. Ingresa a tecpools.tec.mx para verla.",
        to: "whatsapp:+521" + numTelefono,
      })
      .then((mensaje) => resolve())
      .catch((err) => reject(err));
  });
}

function whatsDriver(numTelefono) {
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

const notifyEmail = (email) => {
  const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
          user: 'tecpools@outlook.com',
          pass: mailPassword,
      },
  });

  transporter.sendMail({
      from: '"TecPools" <tecpools@outlook.com>',
      to: email,
      subject: "Bienvenido a TecPools",
      html: `<h1>Bienvenido a TecPools</h1><p>Tu cuenta fue creada exitosamente.
      </p><p>Inicia sesión en tecpools.tec.mx.<p>`,
  }, (err, info) => {
      if (err) {
          console.log(err);
          return;
      }
      console.log(info.response)
  });
}

export { whatsPassenger, whatsDriver, notifyEmail};

