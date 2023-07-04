import AdminSidebar from "@/components/AdminComponents/AdminSidebar"
import Login from "@/components/Login"
import { Center } from "@chakra-ui/react"
import { getSession,useSession,setStatus } from "next-auth/react"


export default function Admin(){
    const {data: session, status }= useSession();
    return(
        <>
            <Center>
                <Login/>
            </Center>

        </>
        )
}

export const getServerSideProps = async (context)=>{


    const session = await getSession(context);
    if(session){
        if(session.user.email ==='hc.horaciocapdevila@gmail.com' || session.user.email ==='hcapdevila@iiconcepcion.edu.ar'){
            return{
              redirect:{
                destination: '/admin/productos'
              }
            }
        }
    }
    return{
      props: {
        session
        }
    }
  }