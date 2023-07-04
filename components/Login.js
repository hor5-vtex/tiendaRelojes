import { Avatar, Button, HStack, Heading, VStack,Text } from "@chakra-ui/react"
import { useSession,signIn,signOut } from "next-auth/react"
import { FiLock,FiChevronLeft } from "react-icons/fi"

export default function Login(){
    const {data:session}=useSession()
    if(session){
        return(
            <>
            <VStack m={200} rounded='xl' backgroundColor='gray.100' p={20}>
                <Heading>Acceso no autorizado</Heading>
                <Text>Lamentablemente no estás autorizado a ingresar con tu email</Text>
                <HStack>
                    <Avatar src={session.user.image}/>
                    <Heading>{session.user.email}</Heading>
                </HStack>
                <Text>Si no tienes acceso, debes solicitarlo al dueño de la tienda</Text>
                <Button colorScheme="blue" rounded='md' onClick={()=>signOut()}><FiChevronLeft/> Volver </Button>
            </VStack>
            </>
            )
    }else{
        return(
            <>
            <VStack m={200} rounded='xl' backgroundColor='gray.100' p={20}>
                <FiLock fontSize={50}/>
                <Heading> Iniciar sesión.</Heading>
                <Text>Necesitas loguearte para poder ingresar al Admin</Text>
                
                <Button colorScheme="blue" rounded='md' onClick={()=>signIn()}> Iniciar sesión </Button>
            </VStack>
            </>
            )
    }
}