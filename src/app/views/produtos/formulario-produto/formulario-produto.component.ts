import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { Produto } from 'src/app/models/produto.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-formulario-produto',
  templateUrl: './formulario-produto.component.html',
  styleUrls: ['./formulario-produto.component.scss']
})
export class FormularioProdutoComponent implements OnInit, OnDestroy {

  produto: Produto = new Produto();
  id = null;
  inscricoes: Subscription[] = [];
  loading = false;
  categorias: Categoria[] = [];

  constructor(
    private toastr: ToastrService,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      if (parametros.id) {
        this.id = parametros.id;
        this.loading = true;
        this.inscricoes.push(
          this.produtoService.buscarPorId(
            parametros.id
          ).subscribe(res => {
            this.loading = false;
            this.produto = res;
          }, error => {
            this.loading = false;
            console.error(error);
            this.toastr.error(error);
          })
        );
      }
    });

    this.inscricoes.push(
      this.categoriaService.buscarTodos(0, 20, null).subscribe(res => {
        this.categorias = res.content;
      }, error => {
        console.error(error);
        this.toastr.error(error);
      })
    );
  }

  salvar() {
    if (!this.produto.nome) {
      this.toastr.error('Por favor informe o nome');
      return;
    }

    if (!this.produto.preco) {
      this.toastr.error('Por favor informe o preço');
      return;
    }

    this.produto.preco = Number(
      this.produto.preco.toString().replace(',', '.')
    );

    let observable;

    if (this.id) {
      observable = this.produtoService.atualizar(
        this.produto
      );
    } else {
      observable = this.produtoService.criar(this.produto);
    }

    this.loading = true;
    this.inscricoes.push(
      observable.subscribe(res => {
        this.loading = false;
        this.produto = res; 
        this.toastr.success('Salvo com sucesso');
        this.router.navigate(['produtos']);
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
