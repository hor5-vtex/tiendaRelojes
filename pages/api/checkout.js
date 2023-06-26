// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_EMAIL_ADDRESS,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  if (req.method === 'POST') {
    const data = req.body;

    if (
      !data.txtNombre ||
      !data.txtApellido ||
      !data.txtEmail ||
      !data.txtCiudad ||
      !data.txtDireccion ||
      !data.txtCod_postal ||
      !data.txtTitular ||
      !data.txtNumTarjeta ||
      !data.txtVencimiento ||
      !data.txtCod_Seguridad
    ) {
      res.status(400).json({ message: 'Bad Request' });
    } else {
      const message = {
        from: process.env.GMAIL_EMAIL_ADDRESS,
        to: data.txtEmail,
        subject: 'Confirmación de compra - TIENDA TIEMPO ',
        text: 'prueba',
        html: `<h1>Confirmación de compra</h1
                <h3>Gracias ${data.txtNombre} por tu compra!</h3>
                <h5>Pronto te estaremos enviando tu pedido a ${data.txtDireccion} ${data.txtCiudad}, CP ${data.txtCod_postal}</h5>`,
      };

      try {
        await new Promise((resolve, reject) => {
          transporter.sendMail(message, (err, info) => {
            if (err) {
              console.log("No se pudo completar el envío del correo electrónico a " + data.txtEmail);
              reject(err);
            } else {
              console.log("Correo electrónico enviado a " + data.txtEmail);
              resolve(info);
            }
          });
        });

        res.status(250).json({ success: `Message delivered to ${data.txtEmail}` });
      } catch (error) {
        console.log(error);
        res.status(404).json({ error: `Connection refused at ${error.address}` });
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
