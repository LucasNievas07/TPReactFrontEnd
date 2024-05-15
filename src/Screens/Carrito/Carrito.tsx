import React, { useContext } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { CarritoContext } from '../../Context/CarritoContext';
import { postData } from '../../Api/genericCalls';
import { Pedido, PedidoDetalle } from '../../Types/InstrumentoProps';
import FadeInContent from '../FadeInContent/FadeInContent ';

export const Carrito: React.FC = () => {
    const { carrito, vaciarCarrito } = useContext(CarritoContext);

    const precioTotal = carrito.reduce((total, { precio, cantidad, costoEnvio }) => {
        const costoEnvioNumerico = costoEnvio === 'G' ? 0 : Number(costoEnvio);
        return total + (Number(precio) + costoEnvioNumerico) * cantidad;
    }, 0);

    const realizarPedido = async () => {
        // Aquí puedes preparar los datos del pedido para enviar al backend
        const pedido: Pedido = {
            fechaPedido: new Date(),
            totalPedido: precioTotal,
            detalles: carrito.map(({ id, cantidad, precio, instrumento, marca, modelo, imagen, costoEnvio, cantidadVendida, descripcion, categoria }): PedidoDetalle => ({
                cantidad: cantidad,
                instrumento: { id, instrumento, marca, modelo, imagen, precio, costoEnvio, cantidadVendida, descripcion, categoria },
            })),
        };
        await postData<Pedido>("http://localhost:8080/pedido/create", pedido);
        console.log(pedido);
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
                        const precioTotalItem = (Number(precio) + Number(costoEnvioNumerico)) * cantidad;

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
                                </CardContent>
                            </Card>
                        );
                    })
                )}
                <Typography variant="h5">Precio total: ${precioTotal}</Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{
                        '&:hover': {
                            backgroundColor: 'white',
                            color: '#1976D2',
                        },
                    }}
                    onClick={() => {
                        realizarPedido();
                        vaciarCarrito();
                    }}
                >
                    Realizar pedido
                </Button>
            </Box>
        </FadeInContent>
    );
};
