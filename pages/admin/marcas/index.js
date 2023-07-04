

import Sidebar from "@/components/AdminComponents/AdminSidebar";
import DrawerMarca from "@/components/AdminComponents/Marcas/DrawerMarca";
import { Text, Heading, Center, VStack, SimpleGrid,Box, Flex } from "@chakra-ui/react";
import { useSession,getSession } from "next-auth/react";


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
                    <VStack>
                      <Text ontSize='xl'as='b' >#{marca.idMarca}</Text>
                      <Text ontSize='xl'as='b' >{marca.nombre}</Text>
                    </VStack>
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