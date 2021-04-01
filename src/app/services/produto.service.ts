import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = environment.apiUrl + 'produtos/';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtos: Produto[] = [];

  constructor(
    private http: HttpClient
  ) {}

  public buscarTodos(pagina, porPagina): Observable<any> {
    return this.http.get<any>(
      url + '?page=' + pagina + '&size=' + porPagina
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
