export interface ProductoPrecio{
    idProducto:number;
    nombreProducto:string;
    descripcion:string;
    detallesGenerales:string;
    imagen?:ImageData;
    stock:number;
    idCategoria?:number;
    fechaDesde:Date;
    precio:number;
}