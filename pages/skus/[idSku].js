import {
  Image, Text, HStack, Circle, Button, Heading, Stat,
  VStack, StatNumber, StatHelpText, IconButton, Box, SimpleGrid, Badge,
  Center
} from '@chakra-ui/react'
import { motion } from 'framer-motion';
import Link from "next/link";
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function PaginaProducto({ producto, variaciones, precioDolar, agregarCarrito, productosCarrito, eliminarDeCarrito }) {
  const router = useRouter();
  const [images, setImages] = useState(producto.imagenes);
  const [selectedImage, setSelectedImage] = useState(producto.imagenes[0]);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const [selectedColor, setSelectedColor] = useState(producto.color_cuadrante);

  useEffect(() => {
    setImages(producto.imagenes);
    setSelectedImage(producto.imagenes[0]);
    setSelectedColor(producto.color_cuadrante);
  }, [producto, selectedColor]);

  function convertirCamelCaseAStringConEspacios(texto) {
    const regex = /([A-Z])/g;
    const resultado = texto.replace(regex, ' $1');

    // Convertimos el primer carácter a minúscula
    const resultadoFinal = resultado.charAt(0).toLowerCase() + resultado.slice(1);

    return resultadoFinal;
  }

  if (!producto) {
    return (
      <>
        <Layout productosCarrito={productosCarrito} eliminarDeCarrito={eliminarDeCarrito}>
          <Center m='50'>
            <Heading>
              Producto no encontrado.
            </Heading>
          </Center>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout productosCarrito={productosCarrito} eliminarDeCarrito={eliminarDeCarrito}>
        <Box>
          <IconButton variant='outline'
            colorScheme='blackAlpha'
            aria-label='Volver'
            fontSize='30px'
            rounded='full'
            m={2}
            icon={<ChevronLeftIcon />}
            onClick={() => router.back()}
          />

          <HStack spacing={8} mb={10} mx={3}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
            </motion.div>
            <VStack>
              <SimpleGrid columns={[1, null, 2]} spacing='40px'>
                <HStack>
                  <VStack>
                    {images.map((image) => (
                      <motion.div
                        key={image}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <Image
                          key={images.indexOf(image)}
                          src={image}
                          boxSize="100px"
                          objectFit="cover"
                          cursor="pointer"
                          onClick={() => handleImageClick(image)}
                        />
                      </motion.div>
                    ))}
                  </VStack>
                  <Image src={selectedImage} boxSize={["200px", null, "450px"]} objectFit="cover" />
                </HStack>

                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Heading fontSize="2xl">{producto.nombre}</Heading>
                  <Stat>
                    <StatNumber>${producto.precio.toLocaleString('en-US', { style: 'currency', currency: 'ARG', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</StatNumber>
                    <StatHelpText>u$s{(producto.precio / precioDolar).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</StatHelpText>
                  </Stat>
                  <Text fontSize="lg">{`Marca: ${producto.nombreMarca}`}</Text>
                  <Text fontSize="lg">{`Tipo: ${producto.nombreSubcategoria}`}</Text>
                  <Text fontSize="lg">{`Cod Referencia: ${producto.cod_referencia}`}</Text>
                  <Text fontSize="lg">Disponibilidad: {producto.stock >= 1 ? producto.stock : <Badge rounded='full'>Sin stock</Badge>}</Text>
                  <Text fontSize='xl' fontWeight='bold'>
                    Especificaciones
                  </Text>
                  {producto.especificaciones.map(especificacion => (
                    <Box key={especificacion.nombreEspecificacion}>
                      <Badge p='2' borderRadius='full' colorScheme='teal' >
                        {convertirCamelCaseAStringConEspacios(especificacion.nombreEspecificacion)}
                      </Badge>
                      <Badge fontWeight='semibold' borderRadius='full' p='2' colorScheme='gray'>{especificacion.valor}</Badge>
                    </Box>
                  ))}
                  <Text>Variantes</Text>
                  <HStack>
                    {variaciones.map(v => (
                      <Link key={v.idSku} href={`/skus/${v.idSku}`}>
                        <Image src={v.imagenes[0]} width="100px" height="100px" />
                      </Link>
                    ))}
                  </HStack>
                  <Button my={10} isDisabled={producto.stock <= 0} colorScheme="blue" mb={20} onClick={() => { agregarCarrito(producto) }}>Agregar al carrito</Button>
                </motion.div>
              </SimpleGrid>
            </VStack>
          </HStack>
        </Box>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  // Obtener los datos de la API
  const idSku = context.params.idSku;
  const options = {
    method: 'GET',
    headers: {
      'x-app-token': process.env.API_KEY
    }
  };

  const url = `https://hor5.bsite.net/api/skus/${idSku}`;
  const res = await fetch(url, options);
  const data = await res.json();
  const status = await res.status

  const res2 = await fetch('https://api.bluelytics.com.ar/v2/latest');
  const dolarBlue = await res2.json();

  const skusUrl = `https://hor5.bsite.net/api/productos/${data.idProducto}/skus`;
  const response = await fetch(skusUrl, options);
  const selectorData = await response.json();

  // Verificar si el producto existe y retornar un objeto notFound si no existe
  if (status === 404) {
    return {
      notFound: true,
    };
  }

  // Retornar los datos como props
  return {
    props: {
      producto: data,
      variaciones: selectorData,
      precioDolar: dolarBlue.blue.value_sell
    },
  };
}
