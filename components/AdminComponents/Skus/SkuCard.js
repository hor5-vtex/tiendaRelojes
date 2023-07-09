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
    Badge,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogBody,
    AlertDialogFooter,
    useToast,
    useDisclosure
  } from "@chakra-ui/react";
import DrawerImagenes from "./DrawerImagenes";
import DrawerEspecificaciones from "./DrawerEspecificaciones";
import { CiTrash } from "react-icons/ci";
import { useRef } from 'react';
  
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
          <EliminarSku idSku={Sku.idSku}/>
            
            <Box
              role={'group'}
              p={6}
              maxW={'330px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'xl'}
              pos={'relative'}
              zIndex={1}>
              <Box
                rounded={'xl'}
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

                  
                {Sku.imagenes.length!=0?
                 <Image
                  height={230}
                  width={282}
                  objectFit={'contain'}
                  src={Sku.imagenes[0]&&Sku.imagenes[0]}
                  alt={Sku.nombre}          
                />:
                <Center p={15}>

                  <DrawerImagenes idSku={Sku.idSku}/>
                </Center>
                }

              </Box>
     
              <Stack pt={10} align={'center'}>
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                  {Sku.nombreMarca}
                </Text>
                <Heading fontSize={'md'} fontFamily={'body'} fontWeight={500}>
                  {Sku.nombre}
                </Heading>
                <Badge fontSize='full' colorScheme="green" p='2'>
                    #{Sku.idSku} 
                </Badge>
                <Badge fontSize={'sm'} p='2'>
                    ID producto padre #{Sku.idProducto} 
                </Badge>
                <Text>Ref {Sku.cod_referencia}</Text>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} fontSize={'xl'}>
                    $ {Sku.precio.toLocaleString('en-US', { style: 'currency', currency: 'ARG', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Text>
  
                </Stack>
                <Text as='b' fontSize={'sm'}>
                    Categoria 
                </Text>
                  <Badge rounded='full' colorScheme="teal" p='2'>
                    {Sku.nombreCategoria} / {Sku.nombreSubcategoria}
                  </Badge>
                  <Text fontWeight={800} fontSize={'md'}>
                    Disponibilidad {Sku.stock} unidades
                  </Text>
              </Stack>
            <Center m={2}>
              {
                Sku.especificaciones.length==0?
                <DrawerEspecificaciones idSku={Sku.idSku} skuCategory={Sku.categoria}/>
                :
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
              }

              
            </Center>

            </Box>
          </Center>
  
        
      </>
    );
  }

  function EliminarSku({idSku}) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const fetcherDelete = async (url) => {
        try {
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-app-token': 'prueba123',
            }
          });
          const responseData = await response.json();
          return responseData;
        } catch (error) {
          console.error('Error al enviar los datos:', error);
          throw new Error('Error al enviar los datos');
        }
      };

      const refreshPage = ()=>{
        window.location.reload();
     }

    async function FnEliminarSku(id){

        try {
            const response = await fetcherDelete(`https://hor5.bsite.net/api/sku/${id}`);
            onClose()
              toast({
                title: 'SKU Eliminado',
                description: "SKU eliminado con exito.",
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            refreshPage();
            console.log('Respuesta del servidor:', response);
          } catch (error) {
            toast({
                title: 'Algo salió mal.',
                description: "No se pudo eliminar el SKU, vuelve a intentar más tarde.",
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            console.error('Error al enviar los datos:', error);
          }
    }
    return (
      <>
      <Button onClick={()=>{onOpen()}} colorScheme='red' > <CiTrash/> </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Eliminar SKU
              </AlertDialogHeader>
  
              <AlertDialogBody>
                ¿Está seguro de eliminar el SKU #{idSku}?.<br/> 
                Los SKU eliminados no se pueden recuperar, esta acción tendrá efectos permanentes.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme='red' onClick={()=>FnEliminarSku(idSku)} ml={3}>
                  Eliminar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }