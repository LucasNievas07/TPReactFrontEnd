import React, { useContext, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, CardMedia, Grid, CardActions } from '@mui/material';
import { CarritoContext } from '../../Context/CarritoContext';
import { PedidoProps, PedidoDetalleProps } from '../../Types/PedidoProps';
import FadeInContent from '../FadeInContent/FadeInContent';
import { Link } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { useResize } from '../../Hooks/useResize';

const truncate = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  }
  return text;
};

const Carrito: React.FC = () => {
  const { carrito, vaciarCarrito, eliminarDelCarrito } = useContext(CarritoContext);
  const [pedidoGuardadoId, setPedidoGuardadoId] = useState<string | null>(null);
  const { ref, dimensions } = useResize();

  const precioTotal = carrito.reduce((total, { precio, cantidad, costoEnvio }) => {
    const costoEnvioNumerico = costoEnvio === 'G' ? 0 : Number(costoEnvio);
    return total + (precio + costoEnvioNumerico) * cantidad;
  }, 0);

  const costoEnvioTotal = carrito.reduce((total, { cantidad, costoEnvio }) => {
    const costoEnvioNumerico = costoEnvio === 'G' ? 0 : Number(costoEnvio);
    return total + costoEnvioNumerico * cantidad;
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
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Box sx={{ flex: 1, marginRight: 5, marginLeft:5, marginTop:2 }}>
          {carrito.length === 0 ? (
            <Typography variant="h5" sx={{marginTop:10, marginLeft:20}}>No se han agregado items al carrito</Typography>
          ) : (
            carrito.map((item) => {
              const { id, instrumento, marca, modelo, precio, cantidad, costoEnvio, imagen } = item;
              const costoEnvioNumerico = costoEnvio === 'G' ? '0' : costoEnvio;
              const precioTotalItem = (precio + Number(costoEnvioNumerico)) * cantidad;

              return (
                <Card key={id} ref={ref} sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', boxShadow:4 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: dimensions.width, height: dimensions.height, objectFit: 'contain', minWidth:200, marginRight:4 }}
                    image={`${imagen}`}
                    alt={instrumento}
                  />
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="h5" component="h5" color="text.primary" fontFamily={"Segoe UI"}>
                          {truncate(instrumento, 50)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h5" component="h5" color="text.primary" fontFamily={"Segoe UI"}>
                          ${precio}
                        </Typography>
                      </Grid>
                      {costoEnvio !== 'G' && (
                        <Grid item xs={12}>
                          <Typography variant="body1" color="#D6913A" style={{ marginRight: '8px' }} fontFamily={"sans-serif"}>
                            Costo de Envio: ${item.costoEnvio}
                          </Typography>
                        </Grid>                     
                      )}
                      {costoEnvio === 'G' && (
                        <Grid item xs={12}>
                          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color:'#39B54A'}}>
                            Costo de Envio: Gratis
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                    <Grid item xs={12} sx={{marginTop:1}}>
                      <Typography variant="body1" color="text.primary" fontFamily={"Segoe UI"}>
                        Cantidad: {cantidad}
                      </Typography>
                    </Grid>
                    <CardActions sx={{ display: 'flex', marginTop: 2 }}>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        sx={{
                          '&:hover': {
                            backgroundColor: 'white',
                            color: 'red',
                            '& .detalle_button': {
                              color: 'red',
                            },
                          },
                          marginLeft: 2,
                        }}
                        onClick={() => eliminarDelCarrito(id)}
                      >
                        <FaRegTrashCan />
                        <Typography
                            className="detalle_button"
                            variant='button'
                            color="white"
                            fontFamily={"sans-serif"}
                            sx={{ marginLeft: '0.5vw' }}
                          >
                            Eliminar
                          </Typography>                        
                      </Button>
                      <Link to={`/instrumento/${id}`} style={{ textDecoration: 'none' }}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          sx={{
                            '&:hover': {
                              backgroundColor: 'white',
                              color: '#1976D2',
                              '& .detalle_button': {
                                color: '#1976D2',
                              },
                            },
                            marginLeft: 2,
                          }}
                        >
                          <FaMagnifyingGlass />
                          <Typography
                            className="detalle_button"
                            variant='button'
                            color="white"
                            fontFamily={"sans-serif"}
                            sx={{ marginLeft: '0.5vw' }}
                          >
                            Ver Detalle
                          </Typography>
                        </Button>
                      </Link>
                    </CardActions>
                  </CardContent>
                </Card>
              );
            })
          )}
        </Box>
        <Box sx={{ width: '30%', padding: 2, boxShadow: 3, marginTop: 2, marginRight: 5, marginBottom:2 }}>
          <Typography variant="h4" sx={{ marginBottom: 3 }}>Resumen del Pedido</Typography>
          <Typography variant="h6">Total de instrumentos: {carrito.length}</Typography>
          <Typography variant="h6">Precio total: ${precioTotal.toFixed(2)}</Typography>
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
      </Box>
    </FadeInContent>
  );
};

export default Carrito;