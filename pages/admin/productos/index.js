import Sidebar from "@/components/AdminComponents/AdminSidebar";
import CardProductoAdmin from "@/components/AdminComponents/Productos/CardProductoAdmin";
import DrawerProducto from "@/components/AdminComponents/Productos/DrawerProducto";
import { Text, Heading, Center, VStack, SimpleGrid,Box, Flex } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProductoPage({productos}){
  useEffect(()=>{},productos)
  const {data: session, status }= useSession();
  
    return(
        <>
        <Sidebar>
          <Center>
            <Heading>Productos</Heading>
          </Center>
          <Flex justifyContent='end'>
            <DrawerProducto/>
          </Flex>
          

              {
                productos? 
                <SimpleGrid columns={[1, null, 3]} spacing='40px' mb={100} mt={20}>
                {productos.map((producto, index) => (
                  <CardProductoAdmin key={index} producto={producto}/>
                ))}
              </SimpleGrid>
                :
                <Text> No hay productos creados todavia</Text>
              }
               
        </Sidebar>
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

  var url = `https://hor5.bsite.net/api/productos/all`
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
        productos: data,}
    }
  }