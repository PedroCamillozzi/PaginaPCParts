export interface Producto{
    idProducto:number;
    nombreProducto:string;
    descripcion:string;
    detallesGenerales:string;
    imagen?:ImageData;
    stock:number;
    idCategoria:number;
}