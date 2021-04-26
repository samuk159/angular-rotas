import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { DomSanitizer } from '@angular/platform-browser';

const url = environment.apiUrl + 'produtos/';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService<Produto> {

  constructor(
    protected http: HttpClient,
    private domSanitizer: DomSanitizer
  ) {
    super(http, url);
  }

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

  public salvarImagem(arquivo: File, id): Observable<Produto> {
    let formData: FormData = new FormData();
    formData.append('arquivo', arquivo);
    
    return this.http.post<Produto>(url + 'imagem/' + id, formData)
  }

  public abrirImagem(id) {
    return this.http.get(url + 'imagem/' + id, { responseType: 'blob' })
      .pipe(map(e => {
        if (e)
          return this.domSanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(e)
          );
        else 
          return e;
      }));
  }

  public removerImagem(id): Observable<Produto> {
    return this.http.delete<Produto>(url + 'imagem/' + id);
  }

}
