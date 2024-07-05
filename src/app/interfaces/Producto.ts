export interface Producto{
    idProducto:number;
    nombreProducto:string;
    descripcion:string;
    detallesGenerales:string;
    imagen?:String;
    stock:number;
    idCategoria?:number;
}