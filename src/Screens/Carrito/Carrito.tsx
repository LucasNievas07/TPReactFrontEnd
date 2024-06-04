//Carrito.tsx
import React, { useContext, useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { CarritoContext } from '../../Context/CarritoContext';
import { PedidoProps, PedidoDetalleProps } from '../../Types/PedidoProps';
import FadeInContent from '../FadeInContent/FadeInContent';

const Carrito: React.FC = () => {
  const { carrito, vaciarCarrito, eliminarDelCarrito } = useContext(CarritoContext);
  const [pedidoGuardadoId, setPedidoGuardadoId] = useState<string | null>(null);

  const precioTotal = carrito.reduce((total, { precio, cantidad, costoEnvio }) => {
    const costoEnvioNumerico = costoEnvio === 'G' ? 0 : Number(costoEnvio);
    return total + (precio + costoEnvioNumerico) * cantidad;
  }, 0);

  const costoEnvioTotal = carrito.reduce((total, { cantidad, costoEnvio }) => {
    const costoEnvioNumerico = costoEnvio === 'G' ? 0 : Number(costoEnvio);
    return total + costoEnvioNumerico*cantidad;
  }, 0);

  const realizarPedido = async () => {
    const detallesPedido: PedidoDetalleProps[] = carrito.map(({ id, cantidad, ...item }) => ({
      cantidad: cantidad,
      instrumento: { id, ...item },
      pedido: {} 
    }));

    const pedido: PedidoProps = {
      fechaPedido: new Date(),
      totalPedido: precioTotal,
      detalles: detallesPedido
    };

    const optionsPedido = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ detalles: detallesPedido })
    };

    try {
      const apiResponsePedido = await fetch("http://localhost:8080/pedido/crear", optionsPedido);
      const dataPedido = await apiResponsePedido.json();

      console.log("Pedido creado con éxito:", dataPedido);
      const pedidoId = dataPedido.id;
      setPedidoGuardadoId(pedidoId);

      const apiResponsePago = await fetch("http://localhost:8080/mercadopago/create-preference", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        //body: JSON.stringify(carrito.map(({ instrumento, cantidad, precio }) => ({ instrumento, cantidad, precio })))
        body: JSON.stringify({
          items: carrito.map((detalle) => ({
              instrumento: detalle.instrumento,
              cantidad: detalle.cantidad,
              precio: detalle.precio,              
          })),
          envio: costoEnvioTotal
          
      }),
      });
      const dataPago = await apiResponsePago.json();
      console.log(carrito.map(({ instrumento, cantidad, precio }) => ({ instrumento, cantidad, precio })));

      console.log("Preferencia de pago creada con éxito:", dataPago);
      window.open(`https://sandbox.mercadopago.com.ar/checkout/v1/redirect?preference-id=${dataPago.preferenceId}`, '_blank');

      alert(`El pedido con id ${pedidoId} se guardó correctamente`);
      vaciarCarrito();

    } catch (error) {
      console.error("Hubo un error en la solicitud:", error);
    }
  };

  return (
    <FadeInContent>
      <Box>
        <Typography variant="h4">Carrito</Typography>
        {carrito.length === 0 ? (
          <Typography variant="body1">No se han agregado items al carrito</Typography>
        ) : (
          carrito.map(({ id, instrumento, marca, modelo, precio, cantidad, costoEnvio }) => {
            const costoEnvioNumerico = costoEnvio === 'G' ? '0' : costoEnvio;
            const precioTotalItem = (precio + Number(costoEnvioNumerico)) * cantidad;

            return (
              <Card key={id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">{instrumento}</Typography>
                  <Typography variant="body1">Marca: {marca}</Typography>
                  <Typography variant="body1">Modelo: {modelo}</Typography>
                  <Typography variant="body1">Precio: ${precio}</Typography>
                  <Typography variant="body1">Costo de envío: {costoEnvioNumerico === '0' ? 'Gratis' : `$${costoEnvioNumerico}`}</Typography>
                  <Typography variant="body1">Cantidad: {cantidad}</Typography>
                  <Typography variant="body1">Precio total: ${precioTotalItem}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => eliminarDelCarrito(id)}
                    sx={{ marginTop: 2 }}
                  >
                    Eliminar
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
        <Typography variant="h5">Precio total: ${precioTotal}</Typography>
        <Button
          variant="contained"
          color="primary"
          disabled={carrito.length === 0}
          sx={{
            '&:hover': {
              backgroundColor: 'white',
              color: '#1976d2'
            },
            mt: 2
          }}
          onClick={realizarPedido}
        >
          Realizar pedido
        </Button>
      </Box>
    </FadeInContent>
  );
};

export default Carrito;
