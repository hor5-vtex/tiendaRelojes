import Sidebar from "@/components/AdminComponents/AdminSidebar";
import DrawerCategoria from "@/components/AdminComponents/Categorias/DrawerCategoria";
import { Center,Heading,Flex,Avatar,Box,Badge,Text,SimpleGrid,VStack,
  Tabs, TabList, TabPanels, Tab, TabPanel, Button, 
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Spinner,
  Divider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  useDisclosure
  } from "@chakra-ui/react";
import { useSession,getSession } from "next-auth/react";
import { useState } from "react";
import useSWR from 'swr';
import { useRef } from "react";
import { CiTrash } from "react-icons/ci";
import DrawerEspecificacionesCategoria from "@/components/AdminComponents/Categorias/DrawerEspecificacionesCategoria";
import DrawerSubcategoria from "@/components/AdminComponents/Categorias/DraweSubcategoria";

export default function CategoriasPage({categorias,subcategorias}){
    const{data:session}=useSession()

    const fetcher = async (url) => {
      try {
        const response = await fetch(url, {
          headers: {
            accept: 'text/plain',
            'x-app-token': 'prueba123',
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw new Error('Error al obtener los datos');
      }
    };

    const [selectedCategoria, setSelectedCategoria] = useState('');

    const { data: subcategoriasSeleccionadas } = useSWR(
      selectedCategoria ? `https://hor5.bsite.net/api/${selectedCategoria}/subcategorias` : null
    ,fetcher);

    const { data: especificaciones } = useSWR(
      selectedCategoria ? `https://hor5.bsite.net/api/categorias/${selectedCategoria}/especificaciones` : null
    ,fetcher);

    return(
        <>
        <Sidebar>
            <Center>
                <Heading>Categorias</Heading>
            </Center>
            <Flex justifyContent='end'>

              <DrawerCategoria/>
            </Flex>

            <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList>
              <Tab>Categorias</Tab>
              <Tab>Todas las Subcategorias</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
              {
                categorias? 
                <SimpleGrid columns={[1, null, 3]} spacing='40px' mb={100} mt={20}>
                {categorias.map((categoria, index) => (
                  <Box key={index} backgroundColor='whiteAlpha.800' rounded='full'p={5}>
                    <VStack>
                      <Text size='xl'as='b' >#{categoria.idCategoria}</Text>
                      <Text size='xl'as='b' >{categoria.nombre}</Text>
                      {subcategorias&&subcategorias.length!=0&&
                      <>
                        <Popover>
                        <PopoverTrigger>
                          <Button colorScheme="blue" size='sm' rounded='full' onClick={()=>{setSelectedCategoria(categoria.idCategoria)}}>
                            Ver Subcategorias
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Listado de subcategorias de {categoria.nombre}</PopoverHeader>
                          <PopoverBody>
                            {
                              Array.isArray(subcategoriasSeleccionadas)?
                              subcategoriasSeleccionadas.map(subcat=>
                                  <Text key={subcat.idCategoria}>#{subcat.idCategoria} {subcat.nombre}</Text>
                                ):
                                
                                <Center>

                                    <Spinner color='teal.500' />
                                </Center>
                                
                            }
                            <Flex justifyContent='end'>

                              <DrawerSubcategoria idCategoria={categoria.idCategoria} m={5}/>
                            </Flex>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                      </>
                      }

                      
                      <>
                        <Popover>
                        <PopoverTrigger>
                          <Button colorScheme="green" size='sm' rounded='full' onClick={()=>{setSelectedCategoria(categoria.idCategoria)}}>
                            Ver Especificaciones
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Listado de especificaciones {categoria.nombre}</PopoverHeader>
                          <PopoverBody>
                            {
                              especificaciones?
                              especificaciones.length!=0?
                              especificaciones.map(especificacion=>
                                <>
                                  <Text>nombre : 
                                    <Badge>
                                    {especificacion.nombreEspecificacion}
                                    </Badge>
                                    </Text>
                                  <Text as='b'>Valores Posibles</Text>
                                  {especificacion.valores.map(valor=>
                                    <>
                                      <Text>{valor.valor}</Text>
                                    </>
                                    )}
                                    <Divider/>
                                    <Flex justifyContent='end'>

                                      <DrawerEspecificacionesCategoria idCategoria={categoria.idCategoria} m={5}/>
                                    </Flex>
                                </>
                                ):
                                <>
                                  <Text as='b'> La categoria todavia no tiene especificaciones creadas</Text>
                                  <Flex justifyContent='end'>

                                    <DrawerEspecificacionesCategoria idCategoria={categoria.idCategoria} m={5}/>
                                  </Flex>
                                </>
                                :
                                <Center>

                                    <Spinner color='teal.500' />
                                </Center>
                            }
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                      </>

                      <EliminarCategoria idCategoria={categoria.idCategoria}/>
                      

                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
                :
                <Text> No hay categorias creadas todavia</Text>
              }
              </TabPanel>
              <TabPanel>
              {
                subcategorias&&subcategorias.length!=0? 
                <SimpleGrid columns={[1, null, 3]} spacing='40px' mb={100} mt={20}>
                {subcategorias.map((subcategoria, index) => (
                  <Box key={index} backgroundColor='whiteAlpha.800' rounded='full'p={5}>
                    <VStack key={index}>
                      <Text size='xl'as='b' >#{subcategoria.idCategoria}</Text>
                      <Text size='xl'as='b' >{subcategoria.nombre}</Text>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
                :
                <Text> No hay subcategorias creadas todavia</Text>
              }
              </TabPanel>
            </TabPanels>
          </Tabs>

        </Sidebar>
        </>
    );
}

function EliminarCategoria({idCategoria}) {
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

  async function FnEliminarCategoria(id){

      try {
          const response = await fetcherDelete(`https://hor5.bsite.net/api/categorias/${id}`);
          onClose()
            toast({
              title: 'Categoria Eliminada',
              description: "Categoria eliminada con exito.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          refreshPage();
          console.log('Respuesta del servidor:', response);
        } catch (error) {
          toast({
              title: 'Algo salió mal.',
              description: "No se pudo eliminar la categoria, vuelve a intentar más tarde.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          console.error('Error al enviar los datos:', error);
        }
  }
  return (
    <>
    <Button onClick={()=>{onOpen()}} size='sm' rounded='full' colorScheme='red' > Eliminar <CiTrash/> </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Eliminar Categoria
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Está seguro de eliminar la categoria #{idCategoria}?.<br/> 
              Las categorias eliminadas no se pueden recuperar, esta acción tendrá efectos permanentes.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={()=>FnEliminarCategoria(idCategoria)} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}


export const getServerSideProps = async (context)=>{
    const options = {
      method: 'GET',
      headers: {
      'x-app-token': process.env.API_KEY
      }
  };

  var url = `https://hor5.bsite.net/api/categorias/all`
  const res = await fetch(url, options)
  const data = await res.json()

  var url = `https://hor5.bsite.net/api/subcategorias/all`
  const respuesta = await fetch(url, options)
  const dataDos = await respuesta.json()


    const session = await getSession(context);
    if(!session){
      return{
        redirect:{
          destination: '/admin'
        }
      }
    }
    
    return{
      props: {
        session,
        categorias: data,
        subcategorias: dataDos,
      }
    }
  }