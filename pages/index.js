
import Banner from "@/components/Banner"
import InfoComponent from "@/components/InfoComponent";
import Layout from "@/components/Layout"
import Nav from "@/components/Nav";
import ProductShelf from "@/components/ProductShelf"
import { Box, Center, Heading } from "@chakra-ui/react";



export default function Home({SkusPulseras, SkusRolex,productosCarrito,agregarCarrito,eliminarDeCarrito}) {
  return (
    <>
    <Layout productosCarrito={productosCarrito} eliminarDeCarrito={eliminarDeCarrito}>

        <Banner/>

        <InfoComponent/>
        
        <Box p={4}>
          <Center>
            <Heading>Relojes Rolex</Heading>
          </Center>
          <ProductShelf Skus={SkusRolex} agregarCarrito={agregarCarrito}/>
        </Box>

        <Box p={4}>
          <Center>
            <Heading>Pulseras</Heading>
          </Center>
          <ProductShelf Skus={SkusPulseras} agregarCarrito={agregarCarrito}/>
        </Box>
    </Layout>


      
      
    </>
  )
}

export async function getStaticProps() {
  // Obtener los datos de la API
  
      var url = 'https://hor5.bsite.net/api/categorias/Pulseras/skus';
      const options = {
        method: 'GET',
        headers: {
          'x-app-token': process.env.API_KEY
        }
      };

  const res = await fetch(url, options)
  const SkusCategoriaPulseras = await res.json();

  url = 'https://hor5.bsite.net/api/marcas/Rolex/skus';
  const response = await fetch(url, options)
  const SkusMarcaRolex = await response.json();

  // Retornar los datos como props
  return {
    props: {
      SkusPulseras: SkusCategoriaPulseras,
      SkusRolex: SkusMarcaRolex
    },
  };
}
