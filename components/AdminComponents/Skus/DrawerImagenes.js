import { Button,Drawer,DrawerOverlay,DrawerHeader,DrawerBody,DrawerContent, useDisclosure,Input,
    Text,DrawerFooter, Textarea, Select, useToast,ModalCloseButton, Image,Center,InputLeftAddon,InputGroup } from "@chakra-ui/react"
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from 'swr';

export default function DrawerImagenes({idSku}){
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
        const imagenes = img.map((imageUrl, index) => ({
            idImagen: index,
            idSku: idSku,
            url_imagen: imageUrl
          }));
      const response = await fetcherPost(`https://hor5.bsite.net/api/skus/${idSku}/imagenes/insertar`, imagenes);
      setImg('')
      onClose()
      reset()

        toast({
          title: 'Se creó la imagen',
          description: "Imagen asociada al SKU exitosamente.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        refreshPage();
      
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      toast({
        title: 'Algo salió mal.',
        description: "No se pudo crear la imagen",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error al enviar los datos:', error);
    }
  };
  
  const[img, setImg]= useState('')



  const refreshPage = ()=>{
    window.location.reload();
 }
 const handleImgChange = (event, index) => {
    setImg((prevState) => {
      const newImg = [...prevState];
      newImg[index] = event.target.value;
      return newImg;
    });
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>Insertar imágenes</Button>

      <Drawer placement='right' onClose={onClose} isOpen={isOpen} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Insertar imágenes SKU #{idSku}</DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <InputGroup>
                    <InputLeftAddon children='#' />
                    <Input type='number' value={idSku} {...register(`imagenes.${index}.idSku`, { required: true })} htmlSize={4} width='auto' />
                  </InputGroup>

                  <Input
                    type="text"
                    m={3}
                    {...register(`imagenes.${index}.url_imagen`, { required: true })}
                    placeholder={`URL de la imagen ${index + 1}`}
                    required
                    onChange={(event) => handleImgChange(event, index)}
                  />

                  {img[index] && (
                    <>
                      <Text as='b'>Preview</Text>
                      <Center>
                        <Image rounded='full' src={img[index]} width='300px' height='200px' />
                      </Center>
                    </>
                  )}
                </div>
              ))}
              <DrawerFooter justifyContent='center'>
                <Button colorScheme="blue" size="md" type="submit" rounded='xl' m={10}>Confirmar</Button>
              </DrawerFooter>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}