import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { Produto } from 'src/app/models/produto.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { FormularioBaseComponent } from 'src/app/share/formulario-base/formulario-base.component';

@Component({
  selector: 'app-formulario-produto',
  templateUrl: './formulario-produto.component.html',
  styleUrls: ['./formulario-produto.component.scss']
})
export class FormularioProdutoComponent 
  extends FormularioBaseComponent<Produto> {

    categorias: Categoria[] = [];

  constructor(
    public toastr: ToastrService,
    public produtoService: ProdutoService,
    public router: Router,
    public route: ActivatedRoute,
    private categoriaService: CategoriaService
  ) { 
    super(
      toastr,
      produtoService,
      router,
      route,
      'produtos'
    );
    
    this.model = new Produto();

    this.inscricoes.push(
      this.categoriaService.buscarTodos(0, 20, null).subscribe(res => {
        this.categorias = res.content;
      }, error => {
        console.error(error);
        this.toastr.error(error);
      })
    );
  }

  validar() {
    if (!this.model.nome) {
      this.toastr.error('Por favor informe o nome');
      return;
    }

    if (!this.model.preco) {
      this.toastr.error('Por favor informe o preço');
      return;
    }

    this.model.preco = Number(
      this.model.preco.toString().replace(',', '.')
    );
  }

}
