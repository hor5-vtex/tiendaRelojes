import { Avatar, Button, HStack, Heading } from "@chakra-ui/react"
import { useSession,signIn,signOut } from "next-auth/react"

export default function Login(){
    const {data:session}=useSession()
    if(session){
        return(
            <>
                <HStack>
                    <Avatar src={session.user.image}/>
                    <Heading>Bienvenido {session.user.email}</Heading>
                </HStack>
                <Button colorScheme="blue" rounded='md' onClick={()=>signOut()}> Cerrar sesión </Button>
            </>
            )
    }else{
        return(
            <>
                <Heading>Debe ingresar primero</Heading>
                <Button colorScheme="blue" rounded='md' onClick={()=>signIn()}> Loguearse </Button>
            </>
            )
    }
}