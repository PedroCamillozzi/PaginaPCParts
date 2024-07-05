export interface ProductoPrecio{
    idProducto:number;
    nombreProducto:string;
    descripcion:string;
    detallesGenerales:string;
    imagen?:String;
    stock:number;
    idCategoria?:number;
    fechaDesde:Date;
    precio:number;
}