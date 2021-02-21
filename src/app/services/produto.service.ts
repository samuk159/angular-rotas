import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtos: Produto[] = [];

  constructor() { 
    this.produtos.push(new Produto("Camiseta", 30.99));
    this.produtos.push(new Produto("Calça Jeans", 100.99));
  }

  public getProdutos() {
    return this.produtos;
  }

  public adicionarProduto(produto: Produto) {
    this.produtos.unshift(produto);
  }

  public excluirProduto(index) {
    this.produtos.splice(index, 1);
  }

}
