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
      !data.txtDni||
      !data.txtTelefono||
      !data.txtCiudad ||
      !data.txtCalle ||
      !data.txtAltura||
      !data.txtPiso||
      !data.txtDepartamento||
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
                <h4>Pronto te estaremos enviando tu pedido a ${data.txtCalle} ${data.txtAltura} ${data.txtPiso&&data.txtPiso} ${data.txtDepartamento&&data.txtDepartamento} ${data.txtCiudad}, CP ${data.txtCod_postal}</h4>
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
                <h2 style="padding:10px; background:black; color:white; border-radius:10px;">Total $${total}</h2>`
      };

      const requestBody = {
        idPedido:0,
        cliente: {
          idCliente:0,
          nombre: `${data.txtNombre} ${data.txtApellido}`,
          dni: data.txtDni,
          telefono: data.txtTelefono,
          email: data.txtEmail,
          direccion: {
            idDireccion:0,
            calle: data.txtCalle,
            altura: parseInt(data.txtAltura, 10),
            piso: parseInt(data.txtPiso, 10),
            departamento: data.txtDepartamento,
            codigo_postal: parseInt(data.txtCod_postal, 10),
            aclaraciones: data.txtAclaraciones,
            provincia: data.txtCiudad
          }
        },
        detalleDelPedido: []
      };

      requestBody.detalleDelPedido = data.productos.map(producto => ({
        producto: producto.nombre,
        idProducto: parseInt(producto.idSku, 10),
        imagen_producto: producto.imagenes[0],
        precio_unitario: parseFloat(producto.precio),
        unidades_compradas: parseInt(producto.cantidad, 10),
        subtotal: parseFloat((producto.precio *producto.cantidad))
      }));

      console.log(JSON.stringify(requestBody))
      

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

      const options = {
        method: 'POST',
        headers: {
          'x-app-token': 'prueba123',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      };
      
      
      await fetch('https://hor5.bsite.net/api/pedidos/create', options)
        .then(async response => {
          console.log(await response.json())
        })
        .catch(async error => {
          console.log("Algo salió mal>>")
          console.log(await error.message)
        });


    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
