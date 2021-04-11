import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria.model';

const url = environment.apiUrl + 'categorias/';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  public buscarTodos(
    pagina, porPagina, nome
  ): Observable<any> {
    let parametros = new HttpParams();
    parametros = parametros.set('page', pagina);
    parametros = parametros.set('size', porPagina);

    if (nome && nome.length) {
      parametros = parametros.set('nome', nome);
    }
    
    return this.http.get<any>(
      url, { params: parametros }
    );
  }

  public buscarPorId(id): Observable<Categoria> {
    return this.http.get<Categoria>(url + id);
  }

  public criar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(url, categoria);
  }

  public atualizar(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(url + categoria.id, categoria);
  }

  public excluir(id): Observable<any> {
    return this.http.delete(url + id);
  }
}
