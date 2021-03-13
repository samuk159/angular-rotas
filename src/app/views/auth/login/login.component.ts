import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    if (!this.usuario.login) {
      this.toastr.error('Por favor informe o login');
      return;
    }

    if (!this.usuario.senha) {
      this.toastr.error('Por favor informe a senha');
      return;
    }

    let usuario = this.usuarioService.login(this.usuario);

    if (usuario) {
      this.router.navigate(['/home']);
    } else {
      this.toastr.error('Usuário ou senha incorreto');
    }
  }

}
