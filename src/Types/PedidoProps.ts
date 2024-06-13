import { InstrumentoNoItemProps } from "./InstrumentoProps";

export interface PedidoProps {
    id?: number;
    fechaPedido: Date;
    totalPedido: number;
    detalles: PedidoDetalleProps[];
}

export interface PedidoDetalleProps {
    id?: number;
    cantidad: number;
    instrumento: InstrumentoNoItemProps;
    pedido: { id: number } | {}; 
}