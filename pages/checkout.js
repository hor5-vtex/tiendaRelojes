import CheckoutForm from "@/components/CheckoutForm";
import { Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import ListaProductosCheckout from "@/components/ListaProductosCheckout";
import { useRouter } from "next/router";
import { actualizarStock } from "./api/lib/actualizarStock";

export default function Checkout({productosCarrito,total,vaciarCarrito}){
    
    const router = useRouter()
    
    //El total viene en la ultima posición del array, para evitar errores se borra al volver.
    const deleteTotal = ()=>{
        productosCarrito.pop()
    }
    const descontarDeStock = ()=>{
        productosCarrito.forEach(producto => {
            producto.stock -= producto.cantidad
            //delete producto.cantidad
            //endpoint put
            //actualizarStock(producto)
        });
    }
    const completarCompra = (router)=>{
        deleteTotal()
        vaciarCarrito()
        router.push('/')
    }

    return(
        <>
            <IconButton variant='outline'
            colorScheme='blackAlpha'
            aria-label='Volver'
            fontSize='30px'
            rounded='full'
            m={2}
            icon={<ChevronLeftIcon />}
            onClick={() => { 
                    completarCompra(router)
                  }
                }
            />

            <Flex>
                <CheckoutForm completarCompra={completarCompra} productosCarrito={productosCarrito}/>
                <ListaProductosCheckout productosCarrito={productosCarrito} />
            </Flex>


        </>
    )
}