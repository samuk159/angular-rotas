import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtos: Produto[] = [];

  constructor() { 
    this.produtos.push(new Produto("Camiseta", 30.99));
    this.produtos.push(new Produto("Calça Jeans", 100.99));
  }

  public getProdutos() {
    return this.produtos;
  }

  public getProdutoByIndex(index) {
    return this.produtos[index];
  }

  public adicionarProduto(produto: Produto) {
    this.produtos.unshift(produto);
  }

  public editarProduto(index, produto: Produto) {
    this.produtos[index] = produto;
  }

  public excluirProduto(index) {
    this.produtos.splice(index, 1);
  }

}
