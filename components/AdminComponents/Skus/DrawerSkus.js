import { Button,Drawer,DrawerOverlay,DrawerHeader,DrawerBody,DrawerContent, useDisclosure,Input,
    Text,DrawerFooter, Textarea, Select, useToast,ModalCloseButton } from "@chakra-ui/react"
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from 'swr';

export default function DrawerSku(){
const { isOpen, onOpen, onClose } = useDisclosure()
const { register, handleSubmit,reset } = useForm();
const [data, setData] = useState("");
const toast = useToast();


const fetcher = async (url) => {
    try {
      const response = await fetch(url, {
        headers: {
          accept: 'text/plain',
          'x-app-token': 'prueba123',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw new Error('Error al obtener los datos');
    }
  };

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
      const response = await fetcherPost('https://hor5.bsite.net/api/skus/create', data);
      onClose()
      reset()

        toast({
          title: 'Se creó el Sku',
          description: "Sku creado exitosamente.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        refreshPage();
      
      console.log('Respuesta del servidor:', response);
      // Actualizar los datos utilizando mutate si es necesario
      mutate('https://hor5.bsite.net/api/skus/all');
    } catch (error) {
      toast({
        title: 'Algo salió mal.',
        description: "No se pudo crear el sku, vuelve a intentar más tarde.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error al enviar los datos:', error);
    }
  };
  

  const { data: productos} = useSWR(
    'https://hor5.bsite.net/api/productos/all',
    fetcher
  );

  const refreshPage = ()=>{
    window.location.reload();
 }
return(
    <>

        <Button colorScheme='blue' onClick={onOpen} rounded='full'>
            +
        </Button>

  <Drawer placement='right' onClose={onClose} isOpen={isOpen} size='md'>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader borderBottomWidth='1px'>Crear SKU</DrawerHeader>
      <ModalCloseButton />
      <DrawerBody >
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <Input m={3}{...register("nombre", { required: true })} placeholder="Nombre del SKU" required/>

        <Textarea m={3} {...register("descripcion", { required: true })} placeholder="Descripción" required/>

        <Select m={3} {...register("idProducto", { required: true })} required>
        <option value="" >Selecciona el producto</option>
            {productos&&productos.map(producto=>
                <option key={producto.idProducto}  value={producto.idProducto}>{producto.nombreProducto}</option>
                )}
        </Select>

        <Input m={3}{...register("cod_referencia", { required: true })} placeholder="Ingrese el código de referencia" required/>

        <Input type="number" min={0} m={3}{...register("precio", { required: true })} placeholder="Ingrese el precio" required/>
        <Input type="number" min={0} max="100000" m={3}{...register("stock", { required: true })} placeholder="Ingrese el stock del SKU" required/>            


        <DrawerFooter justifyContent='center'>
            <Button colorScheme="blue" size="md" type="submit" rounded='xl' m={10}> Confirmar</Button>

        </DrawerFooter>
        </form>
      </DrawerBody>
    </DrawerContent>
  </Drawer>        
    </>
)
}