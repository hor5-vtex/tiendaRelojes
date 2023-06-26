import { Heading,Center, SimpleGrid, Box, HStack,Button, IconButton } from "@chakra-ui/react"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { ChevronLeftIcon } from '@chakra-ui/icons'

export default function Categoria({Skus,categoria,subcategorias,status, productosCarrito,agregarCarrito,eliminarDeCarrito}) {
  const router= useRouter()
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
            <Heading>{categoria} disponibles</Heading>
          </Center>

        <HStack m='2'>
          {
            subcategorias.map(subcategoria=>
              <Link href={`/subcategoria/${subcategoria.nombre}`} key={subcategoria.nombre}>
                <Button colorScheme='gray'borderRadius='full'>{subcategoria.nombre}</Button>
              </Link>
              )
          }
          
        </HStack>

          <SimpleGrid columns={[1, null, 3]} spacing='40px' mb={100}>
            {Skus.map((sku, index) => (
              <Box key={index}>
                <ProductCard Sku={sku} agregarCarrito={agregarCarrito} />
              </Box>
            ))}
          </SimpleGrid>
            </>
          :
          <>
          <Center m='50'>
            <Heading>
              La categoria {categoria} todavia no tiene productos disponibles.
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
  var url='https://hor5.bsite.net/api/categorias/all'
  const res = await fetch(url, options)
  const categorias = await res.json();

  const paths = categorias.map(cat => {
    return {
      params: { nombreCategoria: cat.nombre.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }

}
export async function getStaticProps(context) {
  // Obtener los datos de la API
    const categoriaSeleccionada = context.params.nombreCategoria
    const options = {
        method: 'GET',
        headers: {
        'x-app-token': process.env.API_KEY
        }
    };

    var url = `https://hor5.bsite.net/api/categorias/${categoriaSeleccionada}/skus`
    const res = await fetch(url, options)
    const data = await res.json()
    const status = res.status

    url=`https://hor5.bsite.net/api/${categoriaSeleccionada}/subcategorias`
    const response = await fetch(url,options)
    const subcat = await response.json()


  // Retornar los datos como props
  return {
    props: {
      categoria: categoriaSeleccionada,
      subcategorias:subcat,
      Skus: data,
      status:status
    },
  };
}