import { Heading, Center, SimpleGrid, Box, Text, Spinner, IconButton } from "@chakra-ui/react"
import ProductCard from "@/components/ProductCard"
import { useEffect } from "react"
import Layout from "@/components/Layout"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"

export default function Subcategoria({ Skus, subcategoria, status, productosCarrito, agregarCarrito, eliminarDeCarrito }) {
  const router = useRouter()

  if (!subcategoria) {
    return (
      <>
        <Layout productosCarrito={productosCarrito}>

          <IconButton variant='outline'
            colorScheme='blackAlpha'
            aria-label='Volver'
            fontSize='30px'
            rounded='full'
            m={2}
            icon={<ChevronLeftIcon />}
            onClick={() => router.back()}
          />

          <Center m='50'>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Center>
        </Layout>
      </>
    )
  }

  if (status == 404) {
    return (
      <>
        <Layout productosCarrito={productosCarrito}>
          <IconButton variant='outline'
            colorScheme='blackAlpha'
            aria-label='Volver'
            fontSize='30px'
            rounded='full'
            m={2}
            icon={<ChevronLeftIcon />}
            onClick={() => router.back()}
          />
          <Center m='50'>
            <Heading> La subcategoria no existe o aún no tiene productos</Heading>
          </Center>
        </Layout>
      </>

    )
  }

  if (!Skus) {
    // Aquí se puede mostrar un mensaje o un componente para indicar que no hay productos disponibles.
    return (
      <>
        <Layout productosCarrito={productosCarrito}>
          <IconButton variant='outline'
            colorScheme='blackAlpha'
            aria-label='Volver'
            fontSize='30px'
            rounded='full'
            m={2}
            icon={<ChevronLeftIcon />}
            onClick={() => router.back()}
          />
          <Center m='50'>
            <Heading> No hay productos disponibles en esta subcategoría.</Heading>
          </Center>
        </Layout>
      </>
    )
  }

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
        <Center>
          <Heading>{subcategoria} disponibles</Heading>
        </Center>

        <SimpleGrid columns={[1, null, 3]} spacing='40px' mb={100}>
          {Skus.map((sku, index) => (
            <Box key={index}>
              <ProductCard Sku={sku} agregarCarrito={agregarCarrito} />
            </Box>
          ))}
        </SimpleGrid>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  // Obtener los datos de la API
  const subcategoriaNombre = context.params.nombreSubcategoria;
  const options = {
    method: 'GET',
    headers: {
      'x-app-token': process.env.API_KEY
    }
  };

  const url = `https://hor5.bsite.net/api/subcategorias/${subcategoriaNombre}/skus`;
  const res = await fetch(url, options);
  const data = await res.json();
  const status = res.status;

  // Verificar si la subcategoría existe y retornar un objeto notFound si no existe
  /*if (status === 404) {
    return {
      notFound: true,
    };
  }*/

  // Retornar los datos como props
  return {
    props: {
      subcategoria: subcategoriaNombre,
      Skus: data,
      status: status
    },
  };
}
