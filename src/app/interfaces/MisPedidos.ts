export interface MisPedidos{
    idPedido:number;
    idProducto:number;
    fechaPedido:Date;
    fechaEntrega?:Date;
    estado?:string;
    idCliente?:number;
    cantidad?:number;
    precio?:number;
}