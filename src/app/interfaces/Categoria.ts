export interface Categoria{
    idCategoria?:number,
    nombreCategoria:string,
    subCategoria:Categoria[],
}