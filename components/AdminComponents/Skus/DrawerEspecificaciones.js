import { Button, Drawer, DrawerOverlay, DrawerHeader, DrawerBody, DrawerContent, useDisclosure, Input,
    Text, DrawerFooter, Select, useToast, ModalCloseButton } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import { useForm } from "react-hook-form";
  import useSWR, { mutate } from 'swr';
  
  export default function DrawerEspecificaciones({ idSku, skuCategory }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, reset } = useForm();
    const toast = useToast();
  
    const fetcher = async (url) => {
      try {
        const response = await fetch(url, {
          headers: {
            accept: 'application/json',
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
        const especificaciones = Object.entries(data.idValorEspecificacion).map(([idEspecificacion, idValorEspecificacion]) => ({
          idDefinicionEspecificacion: 0,
          idSku: idSku,
          idEspecificacion: parseInt(idEspecificacion),
          idValorEspecificacion: parseInt(idValorEspecificacion)
        }));
  
        await Promise.all(especificaciones.map(especificacion => fetcherPost('https://hor5.bsite.net/api/especificaciones/definicion/create', especificacion)));
  
        onClose();
        reset();
  
        toast({
          title: 'Especificaciones establecidas',
          description: "Se establecieron con éxito las especificaciones.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
  
        console.log('Se enviaron las solicitudes correctamente');
  
        // Actualizar los datos utilizando mutate si es necesario
        mutate('https://hor5.bsite.net/api/skus/all');
      } catch (error) {
        toast({
          title: 'Algo salió mal.',
          description: "No se pudo establecer las especificaciones, vuelve a intentar más tarde.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.error('Error al enviar los datos:', error);
      }
    };
  
    const { data: categorias } = useSWR('https://hor5.bsite.net/api/categorias/all', fetcher);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [especificaciones, setEspecificaciones] = useState([]);
  
    useEffect(() => {
      if (skuCategory && categorias) {
        const categoria = categorias.find(c => c.nombre === skuCategory);
        if (categoria) {
          setSelectedCategoryId(categoria.idCategoria);
        }
      }
    }, [skuCategory, categorias]);
  
    useEffect(() => {
      const fetchEspecificaciones = async () => {
        if (selectedCategoryId) {
          const data = await fetcher(`https://hor5.bsite.net/api/categorias/${selectedCategoryId}/especificaciones`);
          setEspecificaciones(data);
        } else {
          setEspecificaciones([]);
        }
      };
  
      fetchEspecificaciones();
    }, [selectedCategoryId]);
  
    const refreshPage = () => {
      window.location.reload();
    };
  
    return (
      <>
        <Button colorScheme="blue" onClick={onOpen}>Establecer especificaciones</Button>
  
        <Drawer placement='right' onClose={onClose} isOpen={isOpen} size='md'>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Establecer Especificaciones</DrawerHeader>
            <ModalCloseButton />
            <DrawerBody>
              <Select m={3} value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)} isDisabled={selectedCategoryId}>
                <option value="">Selecciona el producto</option>
                {categorias && categorias.map(categoria => (
                  <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nombre}</option>
                ))}
              </Select>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Recorrer las especificaciones */}
                {especificaciones && especificaciones.map((especificacion) => (
                  <div key={especificacion.idEspecificacion}>
                    <Text>{especificacion.nombreEspecificacion}</Text>
                    {/* Mostrar select con los valores de la especificacion */}
                    <Select name={`idValorEspecificacion.${especificacion.idEspecificacion}`} defaultValue="" {...register(`idValorEspecificacion.${especificacion.idEspecificacion}`, { required: true })}>
                      <option value="">Selecciona un valor</option>
                      {especificacion.valores && especificacion.valores.map((valor) => (
                        <option key={valor.idValorEspecificacion} value={valor.idValorEspecificacion}>{valor.valor}</option>
                      ))}
                    </Select>
                  </div>
                ))}
                {/* Finalizar iteración */}
                <DrawerFooter justifyContent='center'>
                  <Button colorScheme="blue" size="md" type="submit" rounded='xl' m={10}>Confirmar</Button>
                </DrawerFooter>
              </form>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  
  
  