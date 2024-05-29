// CarritoContext.tsx
import React, { createContext, useContext } from 'react';
import { InstrumentoProps } from '../Types/InstrumentoProps';
import { useAuth } from './AuthContext';

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
  reducirCantidadCarrito: (id: number) => void;
  eliminarDelCarrito: (id: number) => void; // Nueva función para eliminar un artículo del carrito
  obtenerCantidadEnCarrito: (id: number) => number;
  vaciarCarrito: () => void;
};

export const CarritoContext = createContext<CarritoContextType>({
  carrito: [],
  agregarAlCarrito: () => {},
  reducirCantidadCarrito: () => {},
  eliminarDelCarrito: () => {}, // Inicialización de la nueva función
  obtenerCantidadEnCarrito: (id: number) => 0,
  vaciarCarrito: () => {},
});
