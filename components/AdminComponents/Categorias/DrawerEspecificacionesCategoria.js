import { useState } from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  ModalCloseButton,
  useToast,
  Input,
  VStack,
  IconButton,
  useDisclosure
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiTrash } from "react-icons/fi";

export default function DrawerEspecificacion({ idCategoria }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const [valores, setValores] = useState([]);
  const toast = useToast();

  const refreshPage = ()=>{
    window.location.reload();
 }

  const onSubmit = (data) => {
    const dataToSend = {
      especificacion: {
        idCategoria: idCategoria,
        nombreEspecificacion: data.nombre,
      },
      valores: valores.map((valor) => ({
        idValorEspecificacion: 0,
        valor: valor,
      })),
    };

    // Envía los datos al endpoint
    fetch("https://hor5.bsite.net/api/especificaciones/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-app-token': 'prueba123'
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Respuesta del servidor:", result);
        toast({
          title: "Éxito",
          description: "La especificación se creó correctamente.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        reset();
        refreshPage()
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
        toast({
          title: "Error",
          description:
            "No se pudo crear la especificación. Por favor, inténtalo de nuevo.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleAgregarValor = () => {
    setValores((prevValores) => [...prevValores, ""]);
  };

  const handleEliminarValor = (index) => {
    setValores((prevValores) => {
      const newValues = [...prevValores];
      newValues.splice(index, 1);
      return newValues;
    });
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} rounded="full">
        +
      </Button>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Crear Especificación
          </DrawerHeader>
          <ModalCloseButton />
          <DrawerBody>
            <VStack spacing={3} align="stretch">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  {...register("nombre")}
                  placeholder="Nombre de la Especificación"
                  required
                />

                {valores.map((valor, index) => (
                  <div key={index} style={{ display: "flex" }}>
                    <Input
                      value={valor}
                      onChange={(event) =>
                        setValores((prevValores) => {
                          const newValues = [...prevValores];
                          newValues[index] = event.target.value;
                          return newValues;
                        })
                      }
                      placeholder="Valor"
                    />
                    <IconButton
                      icon={<FiTrash />}
                      onClick={() => handleEliminarValor(index)}
                      colorScheme="red"
                      aria-label="Eliminar Valor"
                    />
                  </div>
                ))}
                <Button onClick={handleAgregarValor} mt={2}>
                  Agregar Valor
                </Button>

                <DrawerFooter justifyContent="center">
                  <Button
                    colorScheme="blue"
                    type="submit"
                    rounded="xl"
                    mt={4}
                  >
                    Confirmar
                  </Button>
                </DrawerFooter>
              </form>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
