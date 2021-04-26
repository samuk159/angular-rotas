import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public login(usuario: Usuario): Observable<any> {
    return this.http.post(
      environment.apiUrl + 'auth/login', 
      usuario, 
      { responseType: 'text' }
    );
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
