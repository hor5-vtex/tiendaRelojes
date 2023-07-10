import { chakra,Box,SimpleGrid,Stat,StatLabel,Flex,StatNumber,useColorModeValue,Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Text,
    Badge,
    Avatar,
    AlertDialog,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    useToast
      } from "@chakra-ui/react";
  import { BsPerson } from "react-icons/bs";
  import { GoLocation } from 'react-icons/go';
  import { FiTrendingUp,FiCheck } from "react-icons/fi";
  import { useRef } from "react";

export default function ShowPedido({pedido}){


    return(
    <>
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
              <chakra.h1
                textAlign={'center'}
                fontSize={'4xl'}
                py={10}
                fontWeight={'bold'}>
                Pedido # {pedido.idPedido}
              </chakra.h1>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard
                  type='cliente'
                  data={pedido.cliente}
                  title={pedido.cliente.email}
                  stat={pedido.cliente.nombre}
                  icon={<BsPerson size={'3em'} />}
                />
                  <StatsCard
                    type='direccion'
                    data={pedido.cliente.direccion}
                    title={pedido.cliente.direccion.provincia}
                    stat={ `${pedido.cliente.direccion.calle} ${pedido.cliente.direccion.altura},${pedido.cliente.direccion.piso} ${pedido.cliente.direccion.departamento}` }
                    icon={<GoLocation size={'3em'} />}
                  />
                <StatsCard
                  type='detallesPedido'
                  data={pedido}
                  title={'Total'}
                  stat={`$ ${pedido.total}`}
                  icon={<FiTrendingUp size={'3em'} />}
                />
                <MarcarCompletado idPedido={pedido.idPedido}/>
              </SimpleGrid>
            </Box>
    </>
    )
}

function StatsCard(props) {
    const { data,type, title, stat, icon } = props;

    function parsearFecha(fecha){
      const aFecha = fecha.split("-")
      aFecha[2] = aFecha[2].split("T")
      const fechaNueva=`${aFecha[2][0]}/${aFecha[1]}/${aFecha[0]}`
      return fechaNueva
    }

    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
        
        {type=='cliente'?
        
        <Popover>
        <PopoverTrigger>
          <Button m={2} colorScheme="gray" size='sm' roounded='2xl'>Ver más</Button>
        </PopoverTrigger>
        <PopoverContent rounded='2xl'>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Datos del cliente</PopoverHeader>
          <PopoverBody>
                <Text>{data.nombre}</Text>
                <Text>{data.email}</Text>
                <Text>{data.dni}</Text>
                <Text>{data.telefono}</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
        
        :type=='direccion'? 
        <Popover>
        <PopoverTrigger>
          <Button m={2} colorScheme="gray" size='sm' roounded='2xl'>Ver más</Button>
        </PopoverTrigger>
        <PopoverContent rounded='2xl'>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Datos de entrega</PopoverHeader>
          <PopoverBody>
            <Text>{data.provincia}</Text>
            <Text>{data.calle} {data.altura}, {data.piso} {data.departamento}</Text>
            <Text>{data.codigo_postal}</Text>
            <Text as='b'>Observaciones</Text>
            <Text>{data.aclaraciones}</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
        : 
        <Popover>
        <PopoverTrigger>
          <Button m={2} colorScheme="gray" size='sm' roounded='2xl'>Ver más</Button>
        </PopoverTrigger>
        <PopoverContent rounded='2xl'>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Detalles del pedido</PopoverHeader>
          <PopoverBody>
            <Text as='b'>Fecha del pedido</Text>
            <Text>{parsearFecha(data.fecha_de_creacion)}</Text>
            <Badge variant='solid' colorScheme={data.completado?'green':'yellow'}>
                {data.completado?'Completado':'En proceso'}
            </Badge><br/>
            <Text as='b'>Items</Text>
            {data.detalleDelPedido.map(producto=>
            <>
                <Flex>
                    <Avatar src={producto.imagen_producto} />
                    <Box ml='3'>
                        <Text fontWeight='bold'>
                        {producto.producto}
                        <Badge ml='1' colorScheme='green'>
                            #{producto.idProducto}
                        </Badge>
                        </Text>
                        <Text fontSize='sm'>{producto.unidades_compradas} unidades x {producto.precio_unitario}</Text>
                        <Text fontSize='sm' as='b'>Subtotal ${producto.subtotal}</Text>
                    </Box>
                </Flex>
            </>
            )}
            <Text as='b'>Total</Text>
            <Text>${data.total}</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>

        }

        
  
       
  
      </Stat>
    );
  }


  function MarcarCompletado({idPedido}) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const fetcherPut = async (url) => {
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'x-app-token': 'prueba123',
            }
          });
          const responseData = await response.json();
          return responseData;
        } catch (error) {
          console.error('Error al enviar los datos:', error);
          throw new Error('Error al enviar los datos');
        }
      };

      const refreshPage = ()=>{
        window.location.reload();
     }

    async function FnCambiarEstado(id){

        try {
            const response = await fetcherPut(`https://hor5.bsite.net/api/pedidos/${id}/marcarCompletado`);
            onClose()
              toast({
                title: 'Operación exitosa',
                description: "El estado del pedido cambió a completado.",
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            refreshPage();
            console.log('Respuesta del servidor:', response);
          } catch (error) {
            toast({
                title: 'Algo salió mal.',
                description: "No se pudo cambiar el estado del pedido, vuelve a intentar más tarde.",
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            console.error('Error al enviar los datos:', error);
          }
    }
    return (
      <>
      <Button colorScheme="teal" onClick={()=>{onOpen()}} rounded='full'>Marcar como completado  <FiCheck/></Button>
      
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Cambiar estado del pedido
              </AlertDialogHeader>
  
              <AlertDialogBody>
                ¿Está seguro de que quiere marcar el pedido #{idPedido} como completado? .<br/> 
                Una vez actualizado el estado no se va a poder volver al estado anterior, esta acción tendrá efectos permanentes.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme='teal' onClick={()=>FnCambiarEstado(idPedido)} ml={3}>
                  Confirmar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }