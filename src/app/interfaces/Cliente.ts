export interface Cliente {
    idCliente?: number,
    nombre?: string,
    apellido?: string,
    dni?:string,
    email: string,
    telefono?: string,
    contraseña: string,
    tipoUsuario?:number
}