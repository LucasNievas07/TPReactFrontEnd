// CarritoContext.tsx
import React from 'react';
import { InstrumentoProps } from '../Types/InstrumentoProps';

export type CarritoItemType = {
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
  cantidad: number;
  pedidoId?: number; // Agregamos la propiedad pedidoId para almacenar el ID del pedido
};


export type Categoria = {
  id: number | null;
  denominacion: string;
};

type CarritoContextType = {
  carrito: CarritoItemType[];
  agregarAlCarrito: (item: InstrumentoProps["item"]) => void;
  obtenerCantidadEnCarrito: (id: number) => number;
  vaciarCarrito: () => void; // Nueva función para vaciar el carrito
};

export const CarritoContext = React.createContext<CarritoContextType>({
  carrito: [],
  agregarAlCarrito: () => {},
  obtenerCantidadEnCarrito: (id: number) => 0,
  vaciarCarrito: () => {}, // Inicialización de la nueva función
});
