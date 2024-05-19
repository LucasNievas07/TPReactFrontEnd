export interface InstrumentoProps {
    item: {
        id: number;
        instrumento: string;
        marca: string;
        modelo: string;
        imagen: string;
        precio: string;
        costoEnvio: string;
        cantidadVendida: string;
        descripcion: string;
        categoria: Categoria | null;
    }
}

export interface Categoria {
    id: number | null;
    denominacion: string;
}

export interface InstrumentoNoItem {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: string;
    costoEnvio: string;
    cantidadVendida: string;
    descripcion: string;
    categoria: Categoria | null;
}

export interface Pedido {
    id?: number;
    fechaPedido: Date;
    totalPedido: number;
    detalles: PedidoDetalle[];
}

export interface PedidoDetalle {
    id?: number;
    cantidad: number;
    instrumento: InstrumentoNoItem;
    pedido: { id: number }; // Modificamos para incluir el objeto pedido con id
}
