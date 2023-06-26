import { Avatar, Box, Divider, HStack, Text } from "@chakra-ui/react"

export default function ListaProductosCheckout({productosCarrito}){
    return(
        <>
        <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={300}
        p={6}
        m="10px auto"
        as="form">
            
            {productosCarrito.length!=0? productosCarrito.map(producto=> producto!=productosCarrito[productosCarrito.length-1]&&<>
                <HStack>
                    <Text fontSize='2xs'>{producto.nombre}</Text>
                    <Text fontSize='2xs'>${producto.precio}</Text>
                    <Text fontSize='2xs'>{producto.cantidad} unidades</Text>
                    <Text fontSize='2xs'>Subtotal ${producto.precio *  producto.cantidad}</Text>
                </HStack>
                <Divider/>
            </>): <Text fontSize='1xs'>No hay productos en el carrito</Text> }
            <Text fontSize='1xs'>TOTAL ${productosCarrito.length!=0&&productosCarrito[productosCarrito.length-1].toLocaleString('en-US', { style: 'currency', currency: 'ARG', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        </Box>
        </>
    )
}