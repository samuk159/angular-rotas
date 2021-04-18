import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = environment.apiUrl + 'produtos/';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) {}

  public buscarTodos(
    pagina, porPagina, nome, precoMin, precoMax, categoria
  ): Observable<any> {
    let parametros = new HttpParams();
    parametros = parametros.set('page', pagina);
    parametros = parametros.set('size', porPagina);

    if (nome && nome.length) {
      parametros = parametros.set('nome', nome);
    }

    if (categoria && categoria.length) {
      parametros = parametros.set('categoria', categoria);
    }

    if (precoMin && precoMin.length) {
      parametros = parametros.set('precoMin', precoMin);
    }

    if (precoMax && precoMax.length) {
      parametros = parametros.set('precoMax', precoMax);
    }
    
    return this.http.get<any>(
      url, { params: parametros }
    );
  }

  public buscarPorId(id): Observable<Produto> {
    return this.http.get<Produto>(url + id);
  }

  public criar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(url, produto);
  }

  public atualizar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(url + produto.id, produto);
  }

  public excluir(id): Observable<any> {
    return this.http.delete(url + id);
  }

}
