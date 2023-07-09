import { Button,Drawer,DrawerOverlay,DrawerHeader,DrawerBody,DrawerContent, useDisclosure,Input,
        Text,DrawerFooter, Textarea, Select, useToast,ModalCloseButton } from "@chakra-ui/react"
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from 'swr';

export default function DrawerProducto(){
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
          const response = await fetcherPost('https://hor5.bsite.net/api/productos/create', data);
          onClose()
          reset()

            toast({
              title: 'Se creó el producto',
              description: "Producto creado exitosamente.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            refreshPage();
          
          console.log('Respuesta del servidor:', response);
          // Actualizar los datos utilizando mutate si es necesario
          mutate('https://hor5.bsite.net/api/productos/all');
        } catch (error) {
          toast({
            title: 'Algo salió mal.',
            description: "No se pudo crear el producto, vuelve a intentar más tarde.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          console.error('Error al enviar los datos:', error);
        }
      };
      
  
      const { data: marcas} = useSWR(
        'https://hor5.bsite.net/api/marcas/all',
        fetcher
      );

      const { data: categorias} = useSWR(
        'https://hor5.bsite.net/api/categorias/all',
        fetcher
      );
      const [selectedCategoria, setSelectedCategoria] = useState('');
      const { data: subcategorias } = useSWR(
        selectedCategoria ? `https://hor5.bsite.net/api/${selectedCategoria}/subcategorias` : null
      ,fetcher);
    
      const handleCategoriaChange = (event) => {
        setSelectedCategoria(event.target.value);
      };
    
      useEffect(() => {
        setSelectedCategoria('');
      }, [categorias]);

      const refreshPage = ()=>{
        window.location.reload();
     }
    return(
        <>

            <Button colorScheme='blue' onClick={onOpen} rounded='full'>
                +
            </Button>

      <Drawer placement='right'onClose={onClose} isOpen={isOpen} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Crear Producto</DrawerHeader>
          <ModalCloseButton />
          <DrawerBody >
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <Input m={3}{...register("nombre", { required: true })} placeholder="Nombre del producto" required/>

            <Textarea m={3} {...register("descripcion", { required: true })} placeholder="Descripción" required/>

            <Select m={3} {...register("fk_idMarca", { required: true })} required>
            <option value="" >Selecciona la marca</option>
                {marcas&&marcas.map(marca=>
                    <option key={marca.idMarca}  value={marca.idMarca}>{marca.nombre}</option>
                    )}
            </Select>

            <Select m={3} {...register('fk_idCategoria', { required: true })} onChange={handleCategoriaChange} required>
        <option value="">Selecciona la categoría</option>
        {categorias &&
          categorias.map((categoria) => (
            <option key={categoria.idCategoria} value={categoria.idCategoria}>
              {categoria.nombre}
            </option>
          ))}
      </Select>

      <Select m={3} {...register('fk_idSubcategoria', { required: true })} required>
        <option value="">Selecciona la subcategoría</option>
        {subcategorias &&
          subcategorias.map((subcategoria) => (
            <option key={subcategoria.idCategoria} value={subcategoria.idCategoria}>
              {subcategoria.nombre}
            </option>
          ))}
      </Select>

            <Text>{data}</Text>
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