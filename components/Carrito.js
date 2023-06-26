
import { IconButton,
         Badge,
         Drawer,
         DrawerOverlay,
         DrawerContent,
         DrawerCloseButton,
         DrawerHeader,
         DrawerBody,
         Text,
         DrawerFooter,
         Button,
         useDisclosure,
         VStack,
         Center,
         Stack,
         Avatar,
         Flex,
         HStack
          } from "@chakra-ui/react"
import { BsCart2 } from 'react-icons/bs'
import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import { BsFillCartDashFill } from "react-icons/bs"

export default function Carrito({productosCarrito, eliminarDeCarrito}){
    //const[productosCarrito, setProductosCarrito] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnCart = useRef()
    const [total, setTotal] = useState(0)
    var totalParcial = 0

    /*useEffect(()=>{
        const cartLocalStorage = JSON.parse(localStorage.getItem("carrito")) ?? [];
        setProductosCarrito(cartLocalStorage);
      },[])*/
      
    useEffect(()=>{
        calcularTotal(productosCarrito)
    },[productosCarrito])

    useEffect(()=>{},[total])



    const calcularTotal = (productosCarrito)=>{
        productosCarrito.map(           
            producto => {totalParcial+=(producto.precio*producto.cantidad)}
        )
        setTotal(totalParcial)
        totalParcial=0
    }

    const sendTotal = (total)=>{
        productosCarrito.push(total)
    }





    

    return(

        <>
            <IconButton
                variant='outline'
                colorScheme='dark'
                rounded={'full'}
                icon={<BsCart2 />}
                ref={btnCart}
                onClick={onOpen}
            />
            {productosCarrito.length!=0&&<Badge colorScheme='purple' rounded='full' mt={6}>{productosCarrito.length}</Badge>}
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnCart}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Tu Carrito</DrawerHeader>

                    <DrawerBody>
                        {productosCarrito&&
                            productosCarrito.map(
                                producto=>
                                <HStack>

                                    <Stack mt={6} direction={'row'} spacing={4} align={'center'} key={producto.idSku}>
                                        <Avatar
                                            src={producto.imagenes[0]}
                                            alt={producto.nombre}
                                        />
                                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                            <Text fontWeight={600}>{producto.nombre}</Text>
                                            <Text color={'gray.800'}>${producto.precio.toLocaleString('en-US', { style: 'currency', currency: 'ARG', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                            <Text>{producto.cantidad} unidades</Text>
                                        </Stack>
                                    </Stack>
                                    <Flex justifyItems='center' mt='7'>

                                        <Button onClick={()=>{
                                            eliminarDeCarrito(producto.idSku)
                                            calcularTotal(productosCarrito)
                                            onClose()
                                        }} colorScheme="red" rounded='full' size='sm'>
                                            <BsFillCartDashFill/>
                                        </Button>
                                    </Flex>

                                </HStack>
                                
                            )
                        }
                        {productosCarrito.length<1&&
                            <Text>No hay productos en el carrito</Text>
                        }

                    </DrawerBody>

                    <DrawerFooter>

                        <VStack>
                            <Center>
                                <Text fontSize='4xl'>Total: ${total.toLocaleString('en-US', { style: 'currency', currency: 'ARG', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                            </Center>
                            <Link href="/checkout">
                                <Button colorScheme='blue' onClick={()=>{sendTotal(total)}}>Ir a pagar</Button>
                            </Link>
                        </VStack>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}