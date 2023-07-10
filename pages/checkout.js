import CheckoutForm from "@/components/CheckoutForm";
import { SimpleGrid, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import ListaProductosCheckout from "@/components/ListaProductosCheckout";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Checkout({productosCarrito,total,vaciarCarrito}){
    
    const router = useRouter()
    
    //El total viene en la ultima posición del array, para evitar errores se borra al volver.
    const deleteTotal = ()=>{
        productosCarrito.pop()
    }
    const completarCompra = (router)=>{
        deleteTotal()
        vaciarCarrito()
        //descontarDeStock(productosCarrito)
        router.push('/')
    }

    return(
        <>

            <SimpleGrid columns={[1, null, 2]} spacing={10}>
                <CheckoutForm completarCompra={completarCompra} productosCarrito={productosCarrito}/>
                <ListaProductosCheckout productosCarrito={productosCarrito} />
            </SimpleGrid>


        </>
    )
}