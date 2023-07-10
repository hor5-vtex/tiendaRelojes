
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'

  import { useState } from 'react'

export default function BarraInfo({pedidos}){

    const[cantidadPedidos, setCantidadPedidos] = useState(pedidos.length)
    const sumaMontosTotales = pedidos.reduce((suma, pedido) => suma + pedido.total, 0);
    const pedidosCompletados = pedidos.filter(pedido => pedido.completado === true);
    const cantidadPedidosCompletados = pedidosCompletados.length;

    const ticketPromedio = sumaMontosTotales / cantidadPedidos;
    return(
        <>
            <StatGroup bgColor='white' p={5} rounded='full' mt={3}>
                <Stat ml={5}>
                    <StatLabel>Cantidad de pedidos</StatLabel>
                    <StatNumber>{cantidadPedidos}</StatNumber>

                </Stat>

                <Stat>
                    <StatLabel>Ticket promedio</StatLabel>
                    <StatNumber>$ {ticketPromedio.toLocaleString('en-US', { style: 'currency', currency: 'ARG', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</StatNumber>

                </Stat>
                <Stat>
                    <StatLabel>Pedidos entregados</StatLabel>
                    <StatNumber>{cantidadPedidosCompletados}</StatNumber>

                </Stat>
            </StatGroup>
        </>
    )
}