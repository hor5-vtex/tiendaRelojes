import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    HStack,
    Spacer,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useToast
  } from '@chakra-ui/react';
  import { CheckIcon } from '@chakra-ui/icons';
  import Link from 'next/link';
  import { CiTrash } from 'react-icons/ci';
  import { useRef } from 'react';
  
  export default function CardProductoAdmin({producto}) {

    
    return (
      <Center py={6}>
        <Box
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'xl'}
          overflow={'hidden'}>
          <Stack
            textAlign={'center'}
            p={6}
            color={useColorModeValue('gray.800', 'white')}
            align={'center'}>
            <Text
              fontSize={'sm'}
              fontWeight={500}
              bg={useColorModeValue('green.50', 'green.900')}
              p={2}
              px={3}
              color={'green.500'}
              rounded={'full'}>
              #{producto.idProducto}
            </Text>
            <Stack direction={'row'} align={'center'} justify={'center'}>

              <Text fontSize={'2xl'} fontWeight={800}>
                {producto.nombreProducto}
              </Text>
              
            </Stack>
          </Stack>
  
          <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={'https://thumbs.dreamstime.com/b/vector-de-icono-categor%C3%ADas-del-concepto-interfaz-usuario-ecommerce-ilustraci%C3%B3n-l%C3%ADnea-delgada-trazo-editable-se%C3%B1al-lineal-para-193469458.jpg'}
            alt={'Author'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Categoria</Text>
            <Text color={'gray.700'}>{producto.categoria}</Text>
          </Stack>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>

          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Subcategoria</Text>
            <Text color={'gray.700'}>{producto.subcategoria}</Text>
          </Stack>
          <Avatar
            src={'https://www.shutterstock.com/image-vector/vector-icon-category-260nw-1147681889.jpg'}
            alt={'Author'}
          />
        </Stack>
        <HStack>
        <Popover>
        <PopoverTrigger>
            <Button mt={5} colorScheme='blue' rounded='2xl'>Ver listado SKUs</Button>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Listado SKUs</PopoverHeader>
            <PopoverBody>
            <List spacing={3}>
            {producto.skusNombres.map(nombre=>              
            <ListItem key={nombre}>
                <ListIcon as={CheckIcon} color="green.400" />
                {nombre}
              </ListItem>)}
              {producto.skusNombres.length==0&&<Text>Este producto todavia no tiene SKUs creados.<Link href="/admin/skus"><Button size='sm' colorScheme='gray'>Crear SKUs</Button> </Link></Text>}
            </List>
            </PopoverBody>
        </PopoverContent>
        </Popover>

        <Spacer/>

        <EliminarProducto idProducto={producto.idProducto}/>

        </HStack>

            
            {/*<Button
              mt={10}
              w={'full'}
              bg={'green.400'}
              color={'white'}
              rounded={'xl'}
              boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
              _hover={{
                bg: 'green.500',
              }}
              _focus={{
                bg: 'green.500',
              }}>
              Editar
            </Button>*/}
          </Box>
        </Box>
      </Center>
    );
  }

  function EliminarProducto({idProducto}) {
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

    async function FnEliminarProducto(id){

        try {
            const response = await fetcherDelete(`https://hor5.bsite.net/api/productos/${id}`);
            onClose()
              toast({
                title: 'Producto Eliminado',
                description: "Producto eliminado con exito.",
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            refreshPage();
            console.log('Respuesta del servidor:', response);
          } catch (error) {
            toast({
                title: 'Algo salió mal.',
                description: "No se pudo eliminar el producto, vuelve a intentar más tarde.",
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            console.error('Error al enviar los datos:', error);
          }
    }
    return (
      <>
      <Button onClick={()=>{onOpen()}} size='sm' rounded='full' colorScheme='red' > <CiTrash/> </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Eliminar Producto
              </AlertDialogHeader>
  
              <AlertDialogBody>
                ¿Está seguro de eliminar el producto #{idProducto}?.<br/> 
                Los productos eliminados no se pueden recuperar, esta acción tendrá efectos permanentes.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme='red' onClick={()=>FnEliminarProducto(idProducto)} ml={3}>
                  Eliminar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }