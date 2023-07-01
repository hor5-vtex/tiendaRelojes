import sql from 'mssql';

export default async function handler(req, res) {
  try {
    // Configura la cadena de conexión
    const config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      server: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      options: {
        encrypt: false, // Si se utiliza una conexión segura
      },
    };

    if (req.method === 'POST') {
        // Crea una instancia de conexión a la base de datos
        await sql.connect(config);

        // Ejecuta la consulta SELECT * FROM Subcategorias
        data.forEach(async producto=>{

            await sql.query(`UPDATE Skus SET stock = ${producto.stock} WHERE idSku= ${producto.idSku}` );
        })

        // Cierra la conexión a la base de datos
        await sql.close();
        res.status(200).json({resultado:true});
    }

    // Devuelve el resultado como JSON
    
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).json({ error: 'Error al conectar a la base de datos' });
  }
}
