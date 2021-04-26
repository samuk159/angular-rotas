import { Base } from './base.model';
import { Categoria } from './categoria.model';

export class Produto extends Base {
    nome: string;
    preco: number;
    categoria: Categoria;
    imagem: string;
    imagemSrc: any;
}