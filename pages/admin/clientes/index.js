import Sidebar from "@/components/AdminComponents/AdminSidebar";
import { Center,Heading } from "@chakra-ui/react";
import { useSession,getSession } from "next-auth/react";

export default function ClientesPage(){
    const{data:session} = useSession();
    return(
        <>
        <Sidebar>

            <Center>
                <Heading>Clientes</Heading>
            </Center>
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

  /*var url = `https://hor5.bsite.net/api/clientes/all`
  const res = await fetch(url, options)
  const data = await res.json()*/


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
        session
            }
    }
  }