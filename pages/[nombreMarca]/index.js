import { Heading,Center, SimpleGrid, Box,IconButton } from "@chakra-ui/react"
import ProductCard from "@/components/ProductCard"
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export default function Marca({Skus,marca,productosCarrito,status,agregarCarrito,eliminarDeCarrito}) {
  const router = useRouter()
  return (
    <>
    <Layout productosCarrito={productosCarrito} eliminarDeCarrito={eliminarDeCarrito}>
      <IconButton variant='outline'
              colorScheme='blackAlpha'
              aria-label='Volver'
              fontSize='30px'
              rounded='full'
              m={2}
              icon={<ChevronLeftIcon />}
              onClick={() => router.back()}
            />
        {status!=404?
            <>
   
          <Center>
            <Heading>Productos {marca} disponibles</Heading>
          </Center>

        <SimpleGrid columns={[1, null, 3]} spacing='40px' mb={100}>
            {Skus.map((sku, index) => (
             
                <Box key={index}>
                  <ProductCard Sku={sku} agregarCarrito={agregarCarrito}/>
                </Box>
              

            ))}
          </SimpleGrid>
            </>
          :
              <>
              <Center m='50'>
                <Heading>
                  La marca {marca} todavia no tiene productos disponibles.
                </Heading>
              </Center>
              </>
        }
    </Layout>
    </>
  )
}

export const getStaticPaths = async () => {

    const options = {
        method: 'GET',
        headers: {
          'x-app-token': process.env.API_KEY
        }
      };
  var url='https://hor5.bsite.net/api/marcas/all'
  const res = await fetch(url, options)
  const marcas = await res.json();

  const paths = marcas.map(marca => {
    return {
      params: { nombreMarca: marca.nombre.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }

}
export async function getStaticProps(context) {
  // Obtener los datos de la API
    const marcaSeleccionada = context.params.nombreMarca
    const options = {
        method: 'GET',
        headers: {
        'x-app-token': process.env.API_KEY
        }
    };

    var url = `https://hor5.bsite.net/api/marcas/${marcaSeleccionada}/skus`
    const res = await fetch(url, options)
    const data = await res.json()
    const status = res.status

  // Retornar los datos como props
  return {
    props: {
      marca: marcaSeleccionada,
      Skus: data,
      status: status
    },
  };
}