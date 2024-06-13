import { createContext } from 'react';
import { InstrumentoProps } from '../Types/InstrumentoProps';

export type CarritoItemType = {
  id: number;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: number; 
  costoEnvio: string;
  cantidadVendida: number;
  descripcion: string;
  categoria: Categoria | null;
  cantidad: number;
};

export type Categoria = {
  id: number | null;
  denominacion: string;
};

type CarritoContextType = {
  carrito: CarritoItemType[];
  agregarAlCarrito: (item: InstrumentoProps["item"]) => void;
  reducirCantidadCarrito: (id: number) => void;
  eliminarDelCarrito: (id: number) => void;
  obtenerCantidadEnCarrito: (id: number) => number;
  vaciarCarrito: () => void;
};

export const CarritoContext = createContext<CarritoContextType>({
  carrito: [],
  agregarAlCarrito: () => {},
  reducirCantidadCarrito: () => {},
  eliminarDelCarrito: () => {},
  obtenerCantidadEnCarrito: (id: number) => 0,
  vaciarCarrito: () => {},
});
