import Sidebar from "@/components/AdminComponents/AdminSidebar";
import { Center,Heading,Flex,Avatar,Box,Badge,Text,SimpleGrid,VStack,
  Tabs, TabList, TabPanels, Tab, TabPanel  } from "@chakra-ui/react";
import { useSession,getSession } from "next-auth/react";

export default function CategoriasPage({categorias,subcategorias}){
    const{data:session}=useSession()

    return(
        <>
        <Sidebar>
            <Center>
                <Heading>Categorias</Heading>
            </Center>
            <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList>
              <Tab>Categorias</Tab>
              <Tab>Subcategorias</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
              {
                categorias? 
                <SimpleGrid columns={[1, null, 3]} spacing='40px' mb={100} mt={20}>
                {categorias.map((categoria, index) => (
                  <Box key={index} backgroundColor='whiteAlpha.800' rounded='full'p={5}>
                    <VStack>
                      <Text ontSize='xl'as='b' >#{categoria.idCategoria}</Text>
                      <Text ontSize='xl'as='b' >{categoria.nombre}</Text>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
                :
                <Text> No hay marcas creadas todavia</Text>
              }
              </TabPanel>
              <TabPanel>
              {
                subcategorias? 
                <SimpleGrid columns={[1, null, 3]} spacing='40px' mb={100} mt={20}>
                {subcategorias.map((subcategoria, index) => (
                  <Box key={index} backgroundColor='whiteAlpha.800' rounded='full'p={5}>
                    <VStack>
                      <Text ontSize='xl'as='b' >#{subcategoria.idCategoria}</Text>
                      <Text ontSize='xl'as='b' >{subcategoria.nombre}</Text>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
                :
                <Text> No hay marcas creadas todavia</Text>
              }
              </TabPanel>
            </TabPanels>
          </Tabs>

        </Sidebar>
        </>
    );
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