
import React, { useState } from 'react';
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
} from '@chakra-ui/react';

import {FcUnlock,FcReadingEbook} from "react-icons/fc";

import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { sendFormData } from '@/pages/api/lib/api';

const initValues ={
  txtNombre:"",
  txtApellido: "",
  txtEmail: "",
  txtCiudad:"",
  txtDireccion:"",
  txtCod_postal:"",
  txtTitular:"",
  txtNumTarjeta:"",
  txtVencimiento:"",
  txtCod_Seguridad:""
}
const initState = {
  values: initValues
}

const Form1 = ({handleChange,values}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Datos personales
      </Heading>
      <Flex>
        <FormControl mr="5%" isRequired isInvalid={!values.txtNombre}>
          <FormLabel htmlFor="first-name" fontWeight={'normal'}>
            Nombre
          </FormLabel>
          <Input id="first-name" placeholder="Ingrese su nombre"
          errorBorderColor='red.100'
          borderColor='green.300'
          name='txtNombre' value={values.txtNombre} onChange={handleChange} required />
        </FormControl>

        <FormControl isRequired isInvalid={!values.txtApellido}>
          <FormLabel htmlFor="last-name" fontWeight={'normal'}>
            Apellido
          </FormLabel>
          <Input id="last-name" placeholder="Ingrese su apellido"
           errorBorderColor='red.100'
           borderColor='green.300'
          name='txtApellido' value={values.txtApellido} onChange={handleChange} required />
        </FormControl>
      </Flex>
      <FormControl mt="2%" isRequired isInvalid={!values.txtEmail}>
        <FormLabel htmlFor="email" fontWeight={'normal'}>
          Email
        </FormLabel>
        <Input id="email" type="email" 
        errorBorderColor='red.100'
        borderColor='green.300'
        placeholder="ejemplo@gmail.com"
        name="txtEmail"
        value={values.txtEmail} onChange={handleChange} required />
      </FormControl>

    </>
  );
};

const Form2 = ({handleChange,values}) => {
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

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]} isRequired isInvalid={!values.txtCiudad}>
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
          value={values.txtCiudad}
          name="txtCiudad"
          onChange={handleChange}
          required
          errorBorderColor='red.100'
          borderColor='green.300'
          >
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Ciudad Autonoma de Buenos Aires">Ciudad Autonoma de Buenos Aires</option>
        </Select>
      </FormControl>

      <FormControl as={GridItem} colSpan={6} isRequired isInvalid={!values.txtDireccion}>
        <FormLabel
          htmlFor="street_address"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Dirección completa
        </FormLabel>
        <Input
          type="text"
          name="txtDireccion"
          id="street_address"
          autoComplete="street-address"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          placeholder='ej: Alvarez Thomas 1675, 6to 3'
          value={values.txtDireccion}
          onChange={handleChange}
          errorBorderColor='red.100'
          borderColor='green.300'
        />
      </FormControl>


      <FormControl as={GridItem} colSpan={[6, 3, null, 2]} isRequired isInvalid={!values.txtCod_postal}>
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
          type= "number"
          name="txtCod_postal"
          id="postal_code"
          autoComplete="postal-code"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"     
          placeholder="1166"
          value={values.txtCod_postal}
          onChange={handleChange}
          required
          errorBorderColor='red.100'
          borderColor='green.300'
        />
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
              placeholder="Lorena Jerez"
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
              type="number"
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


  return (
    <>
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
        {step === 1 ? <Form1 handleChange={handleChange} values={values}/> : step === 2 ? 
          <Form2 handleChange={handleChange} values={values}/> : 
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
                  !values.txtEmail ||
                  !values.txtCiudad ||
                  !values.txtDireccion||
                  !values.txtCod_postal ||
                  !values.txtTitular ||
                  !values.txtNumTarjeta ||
                  !values.txtVencimiento ||
                  !values.txtCod_Seguridad
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