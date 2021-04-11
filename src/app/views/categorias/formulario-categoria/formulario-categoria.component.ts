import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-formulario-categoria',
  templateUrl: './formulario-categoria.component.html',
  styleUrls: ['./formulario-categoria.component.scss']
})
export class FormularioCategoriaComponent implements OnInit, OnDestroy {

  categoria: Categoria = new Categoria();
  id = null;
  inscricoes: Subscription[] = [];
  loading = false;

  constructor(
    private toastr: ToastrService,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      if (parametros.id) {
        this.id = parametros.id;
        this.loading = true;
        this.inscricoes.push(
          this.categoriaService.buscarPorId(
            parametros.id
          ).subscribe(res => {
            this.loading = false;
            this.categoria = res;
          }, error => {
            this.loading = false;
            console.error(error);
            this.toastr.error(error);
          })
        );
      }
    });
  }

  salvar() {
    if (!this.categoria.nome) {
      this.toastr.error('Por favor informe o nome');
      return;
    }

    let observable;

    if (this.id) {
      observable = this.categoriaService.atualizar(
        this.categoria
      );
    } else {
      observable = this.categoriaService.criar(this.categoria);
    }

    this.loading = true;
    this.inscricoes.push(
      observable.subscribe(res => {
        this.loading = false;
        this.categoria = res; 
        this.toastr.success('Salvo com sucesso');
        this.router.navigate(['categorias']);
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
