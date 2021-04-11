import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService<Model extends Base> {

  constructor(
    protected http: HttpClient,
    private url
  ) { }

  public buscarPorId(id): Observable<Model> {
    return this.http.get<Model>(this.url + id);
  }

  public criar(model: Model): Observable<Model> {
    return this.http.post<Model>(this.url, model);
  }

  public atualizar(model: Model): Observable<Model> {
    return this.http.put<Model>(this.url + model.id, model);
  }

  public excluir(id): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
