import Sidebar from "@/components/AdminComponents/AdminSidebar";
import SkuCard from "@/components/AdminComponents/Skus/SkuCard";
import { Center,Heading,Text,SimpleGrid,Box } from "@chakra-ui/react";
import { useSession, getSession } from "next-auth/react";

export default function SkusPage({skus}){
    const{data:session} = useSession()
    
    
    return(
        <>
        <Sidebar>

            <Center>
                <Heading>Stock Keeping Units (SKUs) </Heading>
            </Center>
            {skus?
            <SimpleGrid columns={[1, null, 3]} spacing='40px' mb={100}>
                {skus.map((sku, index) => (
                  <Box key={index}>
                    <SkuCard Sku={sku}/>
                  </Box>
                ))}
          </SimpleGrid>
            :
            <Text>No hay SKUs registrados todavia</Text>
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

  var url = `https://hor5.bsite.net/api/skus/all`
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
        skus: data
      }
    }
  }