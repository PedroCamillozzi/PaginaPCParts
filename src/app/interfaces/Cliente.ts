export interface Cliente {
    idCliente?: number,
    nombre?: string,
    apellido?: string,
    dni?:string,
    email: string,
    telefono?: string,
    contraseña: string,
    idTipoUsuario?:number
    nombreTipoUsuario?:string
}