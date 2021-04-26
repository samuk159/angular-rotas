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

  public login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      environment.apiUrl + 'auth/login',
      usuario
    );
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  public isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
  }
}
