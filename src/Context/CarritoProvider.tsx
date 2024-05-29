// CarritoProvider.tsx
import React, { useState, useEffect, ReactNode } from 'react';
import { InstrumentoProps } from '../Types/InstrumentoProps';
import { CarritoItemType, CarritoContext } from './CarritoContext';
import { useAuth } from './AuthContext';

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const { username } = useAuth();
  const [carrito, setCarrito] = useState<CarritoItemType[]>([]);

  useEffect(() => {
    const storedCarrito = localStorage.getItem(`carrito_${username}`);
    if (storedCarrito) {
      setCarrito(JSON.parse(storedCarrito));
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      localStorage.setItem(`carrito_${username}`, JSON.stringify(carrito));
    }
  }, [carrito, username]);

  const agregarAlCarrito = (item: InstrumentoProps["item"]) => {
    setCarrito(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      } else {
        return [...prev, { ...item, cantidad: 1 }];
      }
    });
  };

  const reducirCantidadCarrito = (id: number) => {
    setCarrito(prev => {
      const existingItem = prev.find(i => i.id === id);
      if (existingItem && existingItem.cantidad > 1) {
        return prev.map(i => i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i);
      } else {
        return prev.filter(i => i.id !== id);
      }
    });
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito(prev => prev.filter(i => i.id !== id));
  };

  const obtenerCantidadEnCarrito = (id: number) => {
    const item = carrito.find(i => i.id === id);
    return item ? item.cantidad : 0;
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
