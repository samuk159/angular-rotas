import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria.model';
import { BaseService } from './base.service';

const url = environment.apiUrl + 'categorias/';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService<Categoria> {

  constructor(
    protected http: HttpClient
  ) { 
    super(http, url);
  }

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

}
