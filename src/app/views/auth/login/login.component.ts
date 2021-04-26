import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  usuario: Usuario = new Usuario();
  inscricoes: Subscription[] = [];

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

    let inscricao = this.usuarioService.login(this.usuario)
    .subscribe(res => {
      if (res) {
        localStorage.setItem('token', res);
        this.router.navigate(['/home']);
      } else {
        this.toastr.error('Usuário ou senha incorreto');
      }
    }, erro => {
      console.error(erro);
      this.toastr.error(erro.error);
    });

    this.inscricoes.push(inscricao);
  }

  ngOnDestroy(): void {
    this.inscricoes.forEach(inscricao => {
      inscricao.unsubscribe();
    });
  }

}
