
import React, { useEffect, useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Text,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Center,
  VStack,
} from '@chakra-ui/react';

import {FcUnlock,FcReadingEbook} from "react-icons/fc";

import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { sendFormData } from '@/pages/api/lib/api';
import { useForm } from 'react-hook-form';
import { CiUndo } from 'react-icons/ci';
import useSWR from 'swr';


const initValues ={
  txtNombre:"",
  txtApellido: "",
  txtEmail: "",
  txtTelefono: "",
  txtDni: "",
  txtCiudad:"",
  txtCalle:"",
  txtAltura:"",
  txtPiso:"",
  txtDepartamento:"",
  txtAclaraciones:"",
  txtCod_postal:"",
  txtTitular:"",
  txtNumTarjeta:"",
  txtVencimiento:"",
  txtCod_Seguridad:""
}
const initState = {
  values: initValues
}




const Form1 = ({handleChange,values,ClienteEncontrado,emailModal}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);


  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Datos personales
      </Heading>
      <Flex>
        <FormControl mr="5%" isRequired >
          <FormLabel htmlFor="first-name" fontWeight={'normal'} >
            Nombre
          </FormLabel>
          <Input id="first-name" placeholder="Ingrese su nombre" 
          name='txtNombre' value={ClienteEncontrado.nombre? ClienteEncontrado.nombre.split(" ")[0]:values.txtNombre} onChange={handleChange} required isDisabled={ClienteEncontrado.nombre}/>
        </FormControl>

        <FormControl isRequired >
          <FormLabel htmlFor="last-name" fontWeight={'normal'}>
            Apellido
          </FormLabel>
          <Input id="last-name" placeholder="Ingrese su apellido"
          name='txtApellido' value={ClienteEncontrado.nombre? ClienteEncontrado.nombre.split(" ")[1]:values.txtApellido} 
          onChange={handleChange} required isDisabled={ClienteEncontrado.nombre} />
        </FormControl>
      </Flex>
      <Flex mt={2}>
        <FormControl mr="5%" isRequired >
          <FormLabel htmlFor="dni" fontWeight={'normal'}>
            DNI
          </FormLabel>
          <Input id="dni" placeholder="Ingrese su DNI"
          type='tel'
          maxLength='8'
          name='txtDni' value={ClienteEncontrado? ClienteEncontrado.dni:values.txtDni} 
          onChange={handleChange} required isDisabled={ClienteEncontrado.dni} />
        </FormControl>

        <FormControl isRequired >
          <FormLabel htmlFor="telefono" fontWeight={'normal'}>
            Telefono
          </FormLabel>
          <Input id="telefono" placeholder="1155662244"
           type='tel'
           maxLength='11'
          name='txtTelefono' value={ClienteEncontrado? ClienteEncontrado.telefono:values.txtTelefono} 
          onChange={handleChange} required isDisabled={ClienteEncontrado.telefono}/>
        </FormControl>
      </Flex>
      <FormControl mt="2%" isRequired >
        <FormLabel htmlFor="email" fontWeight={'normal'}>
          Email
        </FormLabel>
        <InputGroup>

          <Input id="email" type="email" 
          placeholder="ejemplo@gmail.com"
          name="txtEmail"
          value={ClienteEncontrado? ClienteEncontrado.email:emailModal.toString()} onChange={handleChange} required isDisabled={true} />
          <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={()=>{window.location.reload();}}>
            <CiUndo/>
          </Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>

      {ClienteEncontrado&&!ClienteEncontrado.status&&
      <VStack justifyContent='center' mt={2}>
        
        <Text>¿Necesitas utilizar otros datos?</Text>
        <Button onClick={()=>{window.location.reload();}}>Utilizar otro email</Button>
      </VStack>
      }

    </>
  );
};

const Form2 = ({handleChange,values,ClienteEncontrado}) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Dirección de entrega
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]} isRequired >
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          Pais
        </FormLabel>
        <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Argentina"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          disabled>
          <option>Argentina</option>
        </Select>
      </FormControl>

      <FormControl  mb={3} as={GridItem} colSpan={[6, 6, null, 2]} isRequired >
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Ciudad
        </FormLabel>
        <Select
          id="city"
          autoComplete="city"
          placeholder="Seleccione la localidad"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          value={ClienteEncontrado.direccion? ClienteEncontrado.direccion.provincia:values.txtCiudad}
          name="txtCiudad"
          onChange={handleChange}
          required
          isDisabled={ClienteEncontrado}
          >
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Ciudad Autonoma de Buenos Aires">Ciudad Autonoma de Buenos Aires</option>
        </Select>
      </FormControl>

      <Text size='md' as='b'>Dirección</Text>
      <Flex mt={1}>
        <FormControl mr="5%" isRequired >
          <FormLabel htmlFor="calle" fontWeight={'normal'}>
            Calle
          </FormLabel>
          <Input id="calle" placeholder="Ingrese la calle"
          type='text'
          maxLength='35'
          name='txtCalle' value={ClienteEncontrado.direccion? ClienteEncontrado.direccion.calle:values.txtCalle} 
          onChange={handleChange} required 
          isDisabled={ClienteEncontrado}/>
        </FormControl>

        <FormControl isRequired >
          <FormLabel htmlFor="altura" fontWeight={'normal'}>
            Altura
          </FormLabel>
          <Input id="altura" placeholder="ingrese la altura"
           type='number'
           max='20000'
           min='0'
          name='txtAltura' value={ClienteEncontrado.direccion? ClienteEncontrado.direccion.altura:values.txtAltura} 
          onChange={handleChange} required 
          isDisabled={ClienteEncontrado}/>
        </FormControl>
      </Flex>
      <Flex mt={1}>
        <FormControl mr="5%" isRequired >
          <FormLabel htmlFor="piso" fontWeight={'normal'}>
            Piso
          </FormLabel>
          <Input id="piso" placeholder="Ingrese el piso"
          type='number'
          max='56'
          min='0'
          name='txtPiso' value={ClienteEncontrado.direccion? ClienteEncontrado.direccion.piso:values.txtPiso} 
          onChange={handleChange} required 
          isDisabled={ClienteEncontrado}/>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="departamento" fontWeight={'normal'}>
            Departamento
          </FormLabel>
          <Input id="departamento" placeholder="Ingrese el Departamento / timbre"
           type='text'
           maxLength='3'
          name='txtDepartamento' value={ClienteEncontrado.direccion? ClienteEncontrado.direccion.departamento:values.txtDepartamento} 
          onChange={handleChange} required 
          isDisabled={ClienteEncontrado}/>
        </FormControl>
      </Flex>


      <FormControl as={GridItem} colSpan={[6, 3, null, 2]} isRequired >
        <FormLabel
          htmlFor="postal_code"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Codigo Postal
        </FormLabel>
        <Input
          maxLength="5"
          type= "number"
          name="txtCod_postal"
          id="postal_code"
          autoComplete="postal-code"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"     
          placeholder="Ingrese su código postal"
          value={ClienteEncontrado.direccion? ClienteEncontrado.direccion.codigo_postal:values.txtCod_postal}
          onChange={handleChange}
          required
          isDisabled={ClienteEncontrado}
        />
      </FormControl>
      <FormControl mt={2} isRequired>
          <FormLabel htmlFor="aclaraciones" fontWeight={'normal'}>
            Aclaraciones
          </FormLabel>
          <Textarea id="aclaraciones" placeholder="Ingrese las aclaraciones"
           type='text'
           maxLength='150'
          name='txtAclaraciones' value={ClienteEncontrado.direccion? ClienteEncontrado.direccion.aclaraciones:values.txtAclaraciones} 
          onChange={handleChange} required 
          isDisabled={ClienteEncontrado}/>
        </FormControl>
    </>
  );
};

const Form3 = ({handleChange,values}) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Datos de pago
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
      <FormControl as={GridItem} colSpan={[3, 2]} isRequired>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            Nombre del titular
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md">
              <FcReadingEbook/>
            </InputLeftAddon>
            <Input
              type="text"
              placeholder="Ingrese el nombre del titular"
              focusBorderColor="brand.400"
              rounded="md"
              required
              name="txtTitular"
              value={values.txtTitular}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>

        <FormControl as={GridItem} colSpan={[3, 2]} isRequired>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            Numero de tarjeta
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md">
              <FcUnlock/>
            </InputLeftAddon>
            <Input
              type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="16"
              placeholder="XXXX XXXX XXXX XXXX"
              focusBorderColor="brand.400"
              rounded="md"
              required
              name="txtNumTarjeta"
              value={values.txtNumTarjeta}
              onChange={handleChange}
            />
          </InputGroup>
          <FormHelperText>
            Los datos serán manipulados encriptados unicamente por el software procesador del pago.
          </FormHelperText>
        </FormControl>

        <Flex>
            <FormControl mr="5%" isRequired>
            <FormLabel htmlFor="vencimiento" fontWeight={'normal'}>
                MM/YY
            </FormLabel>
            <Input id="vencimiento" placeholder="XX/XX"
              maxLength="5"
              name="txtVencimiento"
              value={values.txtVencimiento}
              onChange={handleChange}
            required />
            </FormControl>

            <FormControl isRequired>
            <FormLabel htmlFor="codigoSeguridad" fontWeight={'normal'}>
                CVV
            </FormLabel>
            <Input id="codigoSeguridad" placeholder="XXX"
              maxLength="4" 
              name="txtCod_Seguridad"
              value={values.txtCod_Seguridad}
              onChange={handleChange}
            required />
            </FormControl>
        </Flex>

      </SimpleGrid>
    </>
  );
};

export default function CheckoutForm({completarCompra,productosCarrito}) {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const [formData, setFormData] = useState(initState);
  const {values, isLoading} = formData

  const handleChange= ({target})=>{
    setFormData(prev=>({
      ...prev,
      values: {
        ...prev.values,
        [target.name]:target.value
      }
    })
    )
  }

  const onSubmit = async ()=>{
    setFormData((prev)=>({
      ...prev,
      isLoading:true
    })
    )
    values.productos= productosCarrito
    await sendFormData(values)
  }

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

  const [emailModal, setEmailModal]= useState("")

  //const encodedEmailModal = encodeURIComponent(emailModal);
  
  const { data: resultado, error } = useSWR(
    emailModal ? `https://hor5.bsite.net/api/clientes/validar/${emailModal}` : null,
    fetcher
  );
  
  //console.log("resultado: ", resultado);
  
  let ClienteEncontrado = false;
  if (error) {
    // Manejar el error de solicitud, por ejemplo, código de respuesta 404
    if (error.response && error.response.status === 404) {
      ClienteEncontrado = false;
    } else {
      // Manejar otros errores de red o del servidor
      // Puedes mostrar un mensaje de error, registrar el error, etc.
      console.error('Error al obtener los datos:', error);
    }
  } else {
    // Si no hay error, asignar el resultado como ClienteEncontrado
    ClienteEncontrado = resultado ? resultado : false;
  }
  //console.log("ClienteEncontrado: ",ClienteEncontrado)
useEffect(()=>{
  if(ClienteEncontrado&&!ClienteEncontrado.status&&!resultado.status){
    toast({
      title: 'Datos recuperados.',
      description: `Se recuperaron exitosamente los datos asociados al email ${emailModal}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }
},[ClienteEncontrado])
  

  




//console.log(emailModal)

  return (
    <>
      <ModalEmail setEmailModal={setEmailModal} />
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        width={800}
        p={6}
        m="10px auto"
        as="form">
        <Progress
          
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated></Progress>
        {step === 1 ? <Form1 ClienteEncontrado={ClienteEncontrado} handleChange={handleChange} values={values} emailModal={emailModal}/> : step === 2 ? 
          <Form2 ClienteEncontrado={ClienteEncontrado} handleChange={handleChange} values={values}/> : 
          <Form3 handleChange={handleChange} values={values}/>}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="blue"
                variant="solid"
                w="7rem"
                mr="5%">
                Volver
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="blue"
                variant="outline">
                Continuar
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                
                colorScheme="teal"
                variant="solid"
                isLoading={isLoading}
                isDisabled={
                  !values.txtNombre ||
                  !values.txtApellido ||
                  !values.txtDni||
                  !values.txtTelefono||
                  !values.txtEmail ||
                  !values.txtCiudad ||
                  !values.txtCalle||
                  !values.txtAltura ||
                  !values.txtPiso ||
                  !values.txtDepartamento ||
                  !values.txtCod_postal ||
                  !values.txtTitular ||
                  !values.txtNumTarjeta ||
                  !values.txtVencimiento ||
                  !values.txtCod_Seguridad ||
                  productosCarrito.length==0
                }
                onClick={() => {
                  toast({
                    title: 'Compra finalizada con exito.',
                    description: "Gracias por su compra! en breve recibirá un email con el detalle.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                  completarCompra(router)
                  onSubmit()
                }}>
                Confirmar compra
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}

function ModalEmail({setEmailModal}) {
  const { register, handleSubmit } = useForm();
  const [isOpen, setIsOpen] = useState(true);

  const onSubmit = (data) => {
    // Aquí puedes manejar los datos del formulario, por ejemplo, enviarlos a través de una solicitud API
    
    setEmailModal(data.email)
    setIsOpen(false); // Cerrar el modal al enviar el formulario
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
        <ModalContent>
          <ModalHeader>Ingresá tu email</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Input id="emailModal" placeholder='Ingresá tu email' type="email" required {...register('email')} />
            </ModalBody>
            <ModalFooter>
              <Button type="submit">Confirmar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
