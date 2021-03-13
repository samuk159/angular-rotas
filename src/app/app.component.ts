import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Usuario } from './models/usuario.model';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  usuarioLogado: Usuario;

  constructor(
    private usuarioService: UsuarioService
  ) {
    this.usuarioService.usuarioLogadoEmitter
    .subscribe(usuario => {
        this.usuarioLogado = usuario;
    });
  }

}
