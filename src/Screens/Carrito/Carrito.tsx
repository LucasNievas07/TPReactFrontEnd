import React, { useContext, useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { CarritoContext } from '../../Context/CarritoContext';
import { Pedido, PedidoDetalle } from '../../Types/InstrumentoProps';
import FadeInContent from '../FadeInContent/FadeInContent ';

export const Carrito: React.FC = () => {
    const { carrito, vaciarCarrito, eliminarDelCarrito } = useContext(CarritoContext);
    const [pedidoGuardadoId, setPedidoGuardadoId] = useState<string | null>(null);

    const precioTotal = carrito.reduce((total, { precio, cantidad, costoEnvio }) => {
        const costoEnvioNumerico = costoEnvio === 'G' ? 0 : Number(costoEnvio);
        return total + (Number(precio) + costoEnvioNumerico) * cantidad;
    }, 0);

    const realizarPedido = async () => {
        // Crear el pedido sin detalles primero
        const pedido: Pedido = {
            fechaPedido: new Date(),
            totalPedido: precioTotal,
            detalles: []
        };

        const optionsPedido = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        };

        try {
            // Crear el pedido y obtener el ID del pedido creado
            const apiResponsePedido = await fetch("http://localhost:8080/pedido/create", optionsPedido);
            const dataPedido = await apiResponsePedido.json();

            console.log("Pedido creado con éxito:", dataPedido);
            const pedidoId = dataPedido.id;
            setPedidoGuardadoId(pedidoId);

            // Crear los detalles del pedido con el pedidoId
            const detallesPedido: PedidoDetalle[] = carrito.map(({ id, cantidad, instrumento, marca, modelo, imagen, precio, costoEnvio, cantidadVendida, descripcion, categoria }) => ({
                cantidad: cantidad,
                instrumento: { id, instrumento, marca, modelo, imagen, precio, costoEnvio, cantidadVendida, descripcion, categoria },
                pedido: { id: pedidoId }  // Aquí estamos asignando el pedidoId
            }));

            // Guardar los detalles del pedido en lote
            const optionsDetalle = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(detallesPedido)
            };

            const apiResponseDetalle = await fetch("http://localhost:8080/pedido-detalle/create-batch", optionsDetalle);
            const dataDetalle = await apiResponseDetalle.json();

            console.log("Detalles del pedido creados con éxito:", dataDetalle);

            // Mostrar alerta con el id del pedido guardado
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
                            color: '#1976D2',
                        },
                    }}
                    onClick={realizarPedido}
                >
                    Realizar pedido
                </Button>
            </Box>
        </FadeInContent>
    );
};
