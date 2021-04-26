import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Base } from 'src/app/models/base.model';
import { BaseService } from 'src/app/services/base.service';

export abstract class FormularioBaseComponent<Model extends Base>
  implements OnInit, OnDestroy {

  model: Model;
  id = null;
  inscricoes: Subscription[] = [];
  loading = false;

  constructor(
    public toastr: ToastrService,
    public service: BaseService<Model>,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      if (parametros.id) {
        this.id = parametros.id;
        this.loading = true;
        this.inscricoes.push(
          this.service.buscarPorId(
            parametros.id
          ).subscribe(res => {
            this.loading = false;
            this.model = res;
          }, error => {
            this.loading = false;
            console.error(error);
            this.toastr.error(error);
          })
        );
      }
    });
  }

  abstract validar();
  abstract salvo();

  salvar() {
    this.validar();

    let observable;

    if (this.id) {
      observable = this.service.atualizar(this.model);
    } else {
      observable = this.service.criar(this.model);
    }

    this.loading = true;
    this.inscricoes.push(
      observable.subscribe(res => {
        this.loading = false;
        this.model = res; 
        this.toastr.success('Salvo com sucesso');
        this.salvo();
      }, error => {
        this.loading = false;
        console.error(error);
        
        if (error.error) {
          for (let campo in error.error) {
            this.toastr.error(campo + ' ' + error.error[campo]);
          }
        } else {
          this.toastr.error('Erro desconhecido');
        }
      })
    );
  }

  ngOnDestroy() {
    this.inscricoes.forEach(inscricao => {
      inscricao.unsubscribe();
    });
  }

}
