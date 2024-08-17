import { productoI } from "./producto";

export interface ordenI{
    fecha: Date;
    total: number;
    listaProductos: productoI[];
    id: string;
}