import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-formulario-produto',
  templateUrl: './formulario-produto.component.html',
  styleUrls: ['./formulario-produto.component.scss']
})
export class FormularioProdutoComponent implements OnInit {

  produto: Produto = new Produto(null, null);
  indice = -1;

  constructor(
    private toastr: ToastrService,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      if (parametros.index) {
        this.indice = parametros.index;
        this.produto = this.produtoService.getProdutoByIndex(
          parametros.index
        );
      }
    });
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

    if (this.indice) {
      this.produtoService.editarProduto(
        this.indice, this.produto
      );
    } else {
      this.produtoService.adicionarProduto(this.produto);
    }
    
    this.toastr.success('Salvo com sucesso');
    this.router.navigate(['produtos']);
  }

}
