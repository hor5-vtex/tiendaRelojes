import sql from 'mssql';

export default async function handler(req, res) {
  try {
    // Configura la cadena de conexión
    const config = {
      user: 'horaciocapdevila_SQLLogin_1',
      password: 'e2i89ek66l',
      server: 'Relojes.mssql.somee.com',
      database: 'Relojes',
      options: {
        encrypt: true, // Si se utiliza una conexión segura
      },
    };
    if (req.method === 'PUT') {
        // Crea una instancia de conexión a la base de datos
        await sql.connect(config);

        // Ejecuta la consulta SELECT * FROM Subcategorias
        data.forEach(async producto=>{

            const result = await sql.query(`UPDATE Skus SET stock = ${producto.stock} WHERE idSku= ${producto.stock}` );
        })

        // Cierra la conexión a la base de datos
        await sql.close();
        res.status(200).json(result.recordset);
    }

    // Devuelve el resultado como JSON
    
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).json({ error: 'Error al conectar a la base de datos' });
  }
}
