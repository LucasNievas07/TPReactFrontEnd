import { CategoriaProps } from "./CategoriaProps";

export interface InstrumentoProps {
    item: {
        id: number;
        instrumento: string;
        marca: string;
        modelo: string;
        imagen: string;
        precio: number;
        costoEnvio: string;
        cantidadVendida: number;
        descripcion: string;
        categoria: CategoriaProps | null;
    }
}

export interface InstrumentoNoItemProps {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
    categoria: CategoriaProps | null;
}