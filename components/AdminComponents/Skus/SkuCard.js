import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Button,
    Flex,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Badge
  } from "@chakra-ui/react";

  
  export default function SkuCard({ Sku }) {

    function convertirCamelCaseAStringConEspacios(texto) {
    
        const regex = /([A-Z])/g;
        const resultado = texto.replace(regex, ' $1');
        
        // Convertimos el primer carácter a minúscula
        const resultadoFinal = resultado.charAt(0).toLowerCase() + resultado.slice(1);
        
        return resultadoFinal;
      }

    return (
      <>
        
          <Center py={12} mx={4}>
            
            <Box
              role={'group'}
              p={6}
              maxW={'330px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}>
              <Box
                rounded={'lg'}
                mt={-12}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  //backgroundImage: `url(${Sku.imagenes[0]})`,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}>

                  
                <Image
                  rounded={'xl'}
                  height={230}
                  width={282}
                  objectFit={'contain'}
                  src={Sku.imagenes[0]}
                  alt={Sku.nombre}
                />

              </Box>
     
              <Stack pt={10} align={'center'}>
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                  {Sku.nombreMarca}
                </Text>
                <Heading fontSize={'md'} fontFamily={'body'} fontWeight={500}>
                  {Sku.nombre}
                </Heading>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} fontSize={'xl'}>
                    $ {Sku.precio.toLocaleString('en-US', { style: 'currency', currency: 'ARG', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Text>
  
                </Stack>
              </Stack>
            <Center m={2}>
                <Popover>
                    <PopoverTrigger>
                    <Button colorScheme="teal">Ver Especificaciones</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Especificaciones</PopoverHeader>
                        <PopoverBody>
                            {
                            Sku.especificaciones.map(especificacion=>
                            <Box key={especificacion.nombreEspecificacion}>
                                <Badge p='2' borderRadius='full' colorScheme='teal' >
                                {convertirCamelCaseAStringConEspacios(especificacion.nombreEspecificacion)}
                                </Badge>
                                <Badge fontWeight='semibold' borderRadius='full' p='2' colorScheme='gray'>{especificacion.valor}</Badge>
                            </Box>
                                )
                            }
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
              
            </Center>

            </Box>
          </Center>
  
        
      </>
    );
  }