import { Button,Drawer,DrawerOverlay,DrawerHeader,DrawerBody,DrawerContent, 
    useDisclosure,Input,Text,DrawerFooter,ModalCloseButton,useToast, InputGroup,InputLeftAddon
     } from "@chakra-ui/react"
import { useState } from "react";
import { useForm } from "react-hook-form";



export default function DrawerSubcategoria({idCategoria}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit,reset } = useForm();
    const [data, setData] = useState("");
    const toast = useToast();

    const refreshPage = ()=>{
        window.location.reload();
     }

    const fetcherPost = async (url, data) => {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-app-token': 'prueba123',
            },
            body: JSON.stringify(data),
          });
          const responseData = await response.json();
          return responseData;
        } catch (error) {
          console.error('Error al enviar los datos:', error);
          throw new Error('Error al enviar los datos');
        }
      };

      const onSubmit = async (data) => {
        try {
          const response = await fetcherPost(`https://hor5.bsite.net/api/${idCategoria}/subcategoria/create`, data);
          onClose()
          reset()

            toast({
              title: 'Se creó la categoria',
              description: "Subcategoria creada exitosamente.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            refreshPage();
          
          console.log('Respuesta del servidor:', response);
          // Actualizar los datos utilizando mutate si es necesario
          //mutate('https://hor5.bsite.net/api/categorias/all');
        } catch (error) {
          toast({
            title: 'Algo salió mal.',
            description: "No se pudo crear la subcategoria, vuelve a intentar más tarde.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          console.error('Error al enviar los datos:', error);
        }
      };

    return(
        <>

            <Button colorScheme='blue' onClick={onOpen} rounded='full'>
                +
            </Button>

      <Drawer placement='right' size="md" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Crear Categoria</DrawerHeader>
          <ModalCloseButton />
          <DrawerBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup>
                <InputLeftAddon children='#' />
                <Input {...register("idCategoriaPadre")} value={idCategoria} disabled/>
            </InputGroup>
            <Input {...register("nombre")} placeholder="nombre de la subcategoria" required />

            <DrawerFooter justifyContent='center'>
                <Button colorScheme="blue" type="submit" rounded='xl' m={10}> Confirmar</Button>
            </DrawerFooter>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>        
        </>
    )
}
