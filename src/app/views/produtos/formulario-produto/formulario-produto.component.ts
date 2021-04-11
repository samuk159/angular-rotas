import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { FormularioBaseComponent } from 'src/app/share/formulario-base/formulario-base.component';

@Component({
  selector: 'app-formulario-produto',
  templateUrl: './formulario-produto.component.html',
  styleUrls: ['./formulario-produto.component.scss']
})
export class FormularioProdutoComponent 
  extends FormularioBaseComponent<Produto> {

  constructor(
    public toastr: ToastrService,
    public produtoService: ProdutoService,
    public router: Router,
    public route: ActivatedRoute
  ) { 
    super(
      toastr,
      produtoService,
      router,
      route
    );
    this.model = new Produto();
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
