
import { Flex,Avatar,Box,Badge,Text, HStack } from "@chakra-ui/react";
import { CiPhone,CiMail,CiLocationOn } from "react-icons/ci";

export default function ClienteCard({cliente}){

    return(
        <>
        <Box m={5} background='whiteAlpha.700' p={5} rounded='xl' width={500}>
                <Flex>
                  <Avatar name={cliente.nombre}/>
                  <Box ml='3'>
                    <Text fontWeight='bold'>
                      {cliente.nombre}
                      <Badge ml='1' colorScheme='green'>
                        # {cliente.idCliente}
                      </Badge>
                    </Text>
                    <Text fontSize='sm'>DNI {cliente.dni}</Text>
                  </Box>
                  </Flex>
                  <HStack m={2}>
                    <CiLocationOn/>
                    <Text>{cliente.direccion.calle} {cliente.direccion.altura}, {cliente.direccion.piso} {cliente.direccion.departamento}, {cliente.direccion.provincia}</Text>
                  </HStack>
                  <HStack m={2}>
                    <CiMail/>
                    <Text as='b'>{cliente.email}</Text>
                  </HStack>
                  <HStack m={2}>
                    <CiPhone/>
                    <Text>{cliente.telefono} </Text>
                  </HStack>

              </Box>
        </>
    )
}