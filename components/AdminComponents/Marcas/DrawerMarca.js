import { Button,Drawer,DrawerOverlay,DrawerHeader,DrawerBody,DrawerContent, useDisclosure,Input,Text,DrawerFooter } from "@chakra-ui/react"
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function DrawerMarca(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
    return(
        <>

            <Button colorScheme='blue' onClick={onOpen} rounded='full'>
                +
            </Button>

      <Drawer placement='bottom'onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Crear Marca</DrawerHeader>
          <DrawerBody>
          <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
            
            <Input {...register("nombre")} placeholder="nombre de la marca" />

            <Text>{data}</Text>
            <DrawerFooter>

                <Button colorScheme="blue" type="submit" rounded='xl' m={10}> Crear</Button>
            </DrawerFooter>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>        
        </>
    )
}