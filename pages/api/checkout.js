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
      let total=0
      const message = {
        from: process.env.GMAIL_EMAIL_ADDRESS,
        to: data.txtEmail,
        subject: '✅ Confirmación de compra - TIENDA TIEMPO ',
        text: 'prueba',
        html: `<h1>Confirmación de compra</h1
                <h3>Gracias ${data.txtNombre} por tu compra!</h3>
                <h4>Pronto te estaremos enviando tu pedido a ${data.txtDireccion} ${data.txtCiudad}, CP ${data.txtCod_postal}</h4>
                <h3>🛒 Resumen de tu compra</h3>
                

              ${data.productos&& data.productos.map(producto=>
                
                `<table style= "background-color:#E5E4E2; border-radius:30px">
                <tr>
                  <th></th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Unidades</th>
                  <th>Subtotal</th>
                </tr>
                <tr>
                  <td><img src=${producto.imagenes[0]} with="100px" height="100px" style="border-radius:50%"/></td>
                  <td>${producto.nombre}</td>
                  <td>$${producto.precio}</td>
                  <td>${producto.cantidad}</td>
                  <td>$${producto.precio *producto.cantidad}</td>
                </tr>
              
                   <p style="display:none">${total+=(producto.precio *producto.cantidad)}</p>
                </table>`)}
                <h2>Total $${total}</h2>`
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
