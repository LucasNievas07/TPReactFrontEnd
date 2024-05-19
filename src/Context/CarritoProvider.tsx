// CarritoProvider.tsx
import React, { useState, useEffect, ReactNode } from 'react';
import { InstrumentoProps } from '../Types/InstrumentoProps';
import { CarritoItemType, Categoria, CarritoContext } from './CarritoContext';

export const CarritoProvider: React.FC<CarritoProviderProps> = ({ children }) => {
  const [carrito, setCarrito] = useState<CarritoItemType[]>(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (item: InstrumentoProps["item"]) => {
    const itemEnCarrito = carrito.find((i) => i.id === item.id);
    if (itemEnCarrito) {
      setCarrito(carrito.map((i) => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i));
    } else {
      setCarrito([...carrito, { ...item, cantidad: 1 }]);
    }
  };

  const reducirCantidadCarrito = (id: number) => {
    const itemEnCarrito = carrito.find((i) => i.id === id);
    if (itemEnCarrito) {
      if (itemEnCarrito.cantidad > 1) {
        setCarrito(carrito.map((i) => i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i));
      } else {
        setCarrito(carrito.filter((i) => i.id !== id));
      }
    }
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito(carrito.filter((i) => i.id !== id));
  };

  const obtenerCantidadEnCarrito = (id: number) => {
    const itemEnCarrito = carrito.find((i) => i.id === id);
    return itemEnCarrito ? itemEnCarrito.cantidad : 0;
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, reducirCantidadCarrito, eliminarDelCarrito, obtenerCantidadEnCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

type CarritoProviderProps = {
  children: ReactNode;
};
export type { CarritoProviderProps };
