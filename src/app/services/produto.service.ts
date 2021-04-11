import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

const url = environment.apiUrl + 'produtos/';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService<Produto> {

  constructor(
    protected http: HttpClient
  ) {
    super(http, url);
  }

  public buscarTodos(
    pagina, porPagina, nome, precoMin, precoMax
  ): Observable<any> {
    let parametros = new HttpParams();
    parametros = parametros.set('page', pagina);
    parametros = parametros.set('size', porPagina);

    if (nome && nome.length) {
      parametros = parametros.set('nome', nome);
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

}
