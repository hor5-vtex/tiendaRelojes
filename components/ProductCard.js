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
    Badge
  } from "@chakra-ui/react";
  import Link from "next/link"

  import { BsCartPlus } from "react-icons/bs";
  
  export default function ProductCard({ Sku, agregarCarrito }) {
    const redirect = `/skus/${Sku.idSku}`;
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
                <Link href={redirect}>
                  
                <Image
                  rounded={'xl'}
                  height={230}
                  width={282}
                  objectFit={'contain'}
                  src={Sku.imagenes[0]}
                  alt={Sku.nombre}
                />
                </Link> 
              </Box>
              <Link href={redirect}>
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
              </Link>

              <Flex justifyContent='end'>
                {Sku.stock>=1?
                  <Button colorScheme='teal' onClick={()=>{agregarCarrito(Sku)}} rounded='full'>
                      <BsCartPlus/>
                  </Button>
                  :
                  <Badge p={3} rounded='full'>
                    NO DISPONIBLE
                  </Badge>
                }

              </Flex>
            </Box>
          </Center>
  
        
      </>
    );
  }