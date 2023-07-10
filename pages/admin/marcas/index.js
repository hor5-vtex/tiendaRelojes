

import Sidebar from "@/components/AdminComponents/AdminSidebar";
import DrawerMarca from "@/components/AdminComponents/Marcas/DrawerMarca";
import { Text, Heading, Center, VStack, SimpleGrid,Box, Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  useDisclosure,Button, Spacer } from "@chakra-ui/react";
import { useSession,getSession } from "next-auth/react";
import useSWR from 'swr';
import { useRef } from "react";
import { CiTrash } from "react-icons/ci";


export default function MarcasPage({marcas}) {
  const {data:session} = useSession();
  
  return (
    <>
        <Sidebar>
          <Center>
            <Heading>Marcas</Heading>
          </Center>
          <Flex justifyContent='end'>
            <DrawerMarca/>
          </Flex>

              {
                marcas? 
                <SimpleGrid columns={[1, null, 3]} spacing='40px' mb={100} mt={20}>
                {marcas.map((marca, index) => (
                  
                  <Box key={index} backgroundColor='whiteAlpha.800' rounded='full'p={5}>
                    <Flex>
                      <Box ml={20}>
                      <VStack>
                        <Text ontSize='xl'as='b' >#{marca.idMarca}</Text>
                        <Text ontSize='xl'as='b' >{marca.nombre}</Text>
                      </VStack>
                      </Box>
                    <Spacer/>
                    <EliminarMarca idMarca={marca.idMarca}/>
                  </Flex>
                  </Box>
                ))}
              </SimpleGrid>
                :
                <Text> No hay marcas creadas todavia</Text>
              }
               
        </Sidebar>
    </>
  );
}

function EliminarMarca({idMarca}) {
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

  async function FnEliminarMarca(id){

      try {
          const response = await fetcherDelete(`https://hor5.bsite.net/api/marcas/${id}`);
          onClose()
            toast({
              title: 'Marca Eliminada',
              description: "Marca eliminada con exito.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          refreshPage();
          console.log('Respuesta del servidor:', response);
        } catch (error) {
          toast({
              title: 'Algo salió mal.',
              description: "No se pudo eliminar la marca, vuelve a intentar más tarde.",
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
              Eliminar Marca
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Está seguro de eliminar la marca #{idMarca}?.<br/> 
              Las marcas eliminadas no se pueden recuperar, esta acción tendrá efectos permanentes.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={()=>FnEliminarMarca(idMarca)} ml={3}>
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

var url = `https://hor5.bsite.net/api/marcas/all`
const res = await fetch(url, options)
const data = await res.json()


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
      marcas: data,}
  }
}