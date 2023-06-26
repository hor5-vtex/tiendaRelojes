import {
    Box,
    VStack,
    Button,
    Flex,
    Divider,
    Heading,
    Text,
    Grid,
    GridItem,
    Container,
  } from '@chakra-ui/react';
  import Link from 'next/link'

  
  const Feature = ({ heading, text }) => {
    return (
      <GridItem>
        <Heading size="sm" fontWeight="600">
          {heading}
        </Heading>
        <Text>{text}</Text>
      </GridItem>
    );
  };
  
  export default function InfoComponent() {
    return (
      <Box as={Container} maxW="7xl" mt={14} p={4}>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
          gap={4}>
          <GridItem colSpan={1}>
            <VStack alignItems="flex-start" spacing="20px">
              <Heading size="md" fontWeight="700">
                Relojes Tiempo
              </Heading>
              <Link href='/c/Relojes'>
              <Button colorScheme="teal" size="md">
                Ver todos los relojes
              </Button>
              </Link>
            </VStack>
          </GridItem>
          <GridItem>
            <Flex>
              <Text>
                Animate a experimentar un reloj de alto nivel en tu muñeca, a un excelente precio.
              </Text>
            </Flex>
          </GridItem>
        </Grid>
        <Divider mt={12} mb={12} />
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          gap={{ base: '8', sm: '12', md: '16' }}>
          <Feature
            heading={'Calidad'}
            text={'Ofrecemos desde piezas de alta relojeria hasta las marcas más convencionales, siempre priorizando la calidad ofrecida para que sea una pieza que perpetue el uso y herede a siguientes generaciones.'}
          />
          <Feature
            heading={'Elegancia'}
            text={'Podés disfrutar de los diseños más exclusivos al mejor precio, vas a encontrar en nuestra web relojes elegantes, deportivos y extravagantes.'}
          />
          <Feature
            heading={'Funcionalidad'}
            text={'Los relojes cuentan con maquinaria automatica mecanica, cronografo automatico electronico o cronografo quartz según el modelo.'}
          />
          <Feature
            heading={'Sumergibilidad'}
            text={'Ofrecemos relojes sumergibles, por lo que vas a poder lucirlos en la pileta o playa, nuestro relojes cuentan con pruebas de hermeticidad que los certifican'}
          />
        </Grid>
      </Box>
    );
  }