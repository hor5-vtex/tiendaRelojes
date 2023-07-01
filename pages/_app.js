// pages/_app.js
import Layout from '@/components/Layout';
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'
import {SessionProvider} from 'next-auth/react'

function MyApp({ Component, pageProps ,session}) {
  
  const [carrito, setCarrito]= useState([])


  useEffect(()=>{
    const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) ?? [];
    setCarrito(carritoLocalStorage);
  },[])

  useEffect( ()=>{
      localStorage.setItem('carrito', JSON.stringify(carrito))
    },
    [carrito] 
  )



  const toast = useToast()
  const showToastStock = ()=>{
    toast({
      title: 'Stock Excedido',
      description: 'La cantidad que intenta comprar excede el stock del producto!',
      status: 'warning',
      duration: 1500,
      isClosable: true,
    })
  }


  const showToastEliminadoCarrito = ()=>{
    toast({
      title: 'Producto eliminado',
      description: 'Se eliminó el producto del carrito correctamente',
      status: 'error',
      duration: 1500,
      isClosable: true,
    })
  }

  const showToastCarrito = ()=>{
    toast({
      title: 'Producto agregado',
      description: 'Se agregó correctamente el producto al carrito',
      status: 'success',
      duration: 1500,
      isClosable: true,
    })
  }
  const agregarCarrito= (producto)=>{
    
    if(carrito.some(productoExistente => productoExistente.idSku === producto.idSku)){
      if(producto.cantidad < producto.stock) {
        producto.cantidad++
        showToastCarrito()
      }
      else{
        showToastStock()
      }
    }else{
      producto.cantidad = 1
      setCarrito([...carrito,producto])
      showToastCarrito()
    }
    
  }

  const eliminarDeCarrito= (idSku)=>{
    carrito.map(producto=>{
        if(producto.idSku===idSku){
           const index = carrito.indexOf(producto);
                if (index > -1) { 
                  carrito.splice(index, 1);
                  showToastEliminadoCarrito()
                }
        }
    })
}

  const vaciarCarrito = ()=>{
    setCarrito([])
  }




  return (
    <SessionProvider session={session}>

      <ChakraProvider>
          <Component {...pageProps} productosCarrito={carrito} 
            agregarCarrito={agregarCarrito} 
            eliminarDeCarrito={eliminarDeCarrito}
            vaciarCarrito={vaciarCarrito}/>
      </ChakraProvider>
    </SessionProvider>
  )
}


export default MyApp;