import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Usuario[] = [];
  _usuarioLogado: Usuario;

  constructor(
    private router: Router
  ) { 
    this.usuarios.push(new Usuario('admin', 'admin', true));
    this.usuarios.push(new Usuario('teste', 'teste', false));
  }

  public login(usuario: Usuario) {
    this._usuarioLogado = this.usuarios.find(u => {
      return u.login === usuario.login 
        && u.senha === usuario.senha;
    });

    return this._usuarioLogado;
  }

  public logout() {
    this._usuarioLogado = null;
    this.router.navigate(['/auth/login']);
  }

  get usuarioLogado() {
    return this._usuarioLogado;
  }
}
