import sql from 'mssql';

export default async function handler(req, res) {
  if(req.method === 'GET'){
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
  
      // Crea una instancia de conexión a la base de datos
      await sql.connect(config);
  
      // Ejecuta la consulta SELECT * FROM Subcategorias
      const result = await sql.query('SELECT * FROM Subcategorias');
  
      // Cierra la conexión a la base de datos
      await sql.close();
  
      // Devuelve el resultado como JSON
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
    }

  }
}