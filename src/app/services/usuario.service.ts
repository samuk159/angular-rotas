import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Usuario[] = [];
  usuarioLogado: Usuario;
  usuarioLogadoEmitter = new EventEmitter<Usuario>();

  constructor() { 
    this.usuarios.push(new Usuario('admin', 'admin', true));
    this.usuarios.push(new Usuario('teste', 'teste', false));
  }

  public login(usuario: Usuario) {
    this.usuarioLogado = this.usuarios.find(u => {
      return u.login === usuario.login 
        && u.senha === usuario.senha;
    });

    this.usuarioLogadoEmitter.emit(this.usuarioLogado);
    return this.usuarioLogado;
  }
}
