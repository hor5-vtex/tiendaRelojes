import Sidebar from "@/components/AdminComponents/AdminSidebar";
import ShowPedido from "@/components/AdminComponents/Pedidos/ShowPedido";
import { Center,
       Heading,
       Text
    } from "@chakra-ui/react";
import { useSession,getSession } from "next-auth/react";


export default function PedidosPage({pedidos}){
    const{data:session} = useSession();
    
    return(
        <>
        <Sidebar>

            <Center>
                <Heading>Pedidos</Heading>
            </Center>
            {pedidos.length!=0?
            pedidos.map(pedido=>
              <ShowPedido pedido={pedido}/>
            )
          :
          <Text>
            Todavia no hay ningun pedido.  
          </Text>}
            

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

  var url = `https://hor5.bsite.net/api/pedidos/all`
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
        pedidos:data
            }
    }
  }