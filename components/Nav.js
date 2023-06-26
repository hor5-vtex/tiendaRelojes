import useSWR from 'swr';

const fetcher = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        accept: 'text/plain',
        'x-app-token': 'prueba123',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw new Error('Error al obtener los datos');
  }
};

const Subcategorias = ({ categoria }) => {
  const { data: subcategorias, error: errorSubcategorias } = useSWR(
    `https://hor5.bsite.net/api/${categoria.nombre}/subcategorias`,
    fetcher
  );
  
  
  if (errorSubcategorias) {
    return <div>Error al cargar las subcategorías</div>;
  }

  return (
    <>
      {subcategorias &&
        subcategorias.map((subcategoria, index) => (
          <li key={index}>{subcategoria.nombre}</li>
        ))}
    </>
  );
};

const Nav = () => {


  const { data: categorias, error: errorCategorias } = useSWR(
    'https://hor5.bsite.net/api/categorias/all',
    fetcher
  );

  if (errorCategorias) {
    return <div>Error al cargar las categorías</div>;
  }

  const { data: marcas, error: errorMarcas } = useSWR(
    'https://hor5.bsite.net/api/marcas/all',
    fetcher
  );

  if (errorMarcas) {
    return <div>Error al cargar las marcas</div>;
  }

  return (
    <nav>
      <ul>
        {categorias &&
          categorias.map((categoria, index) => (
            <li key={index}>
              {categoria.nombre}
              {categoria.subcategorias && (
                <ul>
                  <Subcategorias categoria={categoria} />
                </ul>
              )}
            </li>
          ))}
      </ul>
      <ul>
        {marcas &&
          marcas.map((marca, index) => <li key={index}>{marca.nombre}</li>)}
      </ul>
    </nav>
  );
};



export default Nav;
