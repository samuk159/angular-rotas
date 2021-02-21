import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit {

  produtos: Produto[] = [];
  modalExclusao: BsModalRef;
  indiceExclusao = -1;

  constructor(
    private toastr: ToastrService,
    private modalService: BsModalService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.produtos = this.produtoService.getProdutos();
  }

  excluir(index) {
    this.produtoService.excluirProduto(index);
    this.toastr.success('Excluído com sucesso');
  }

  abrirModalExclusao(template: TemplateRef<any>, index) {
    this.modalExclusao = this.modalService.show(template);
    this.indiceExclusao = index;
  }

  fecharModalExclusao(excluir) {
    this.modalExclusao.hide();

    if (excluir) {
      this.excluir(this.indiceExclusao);
    }

    this.indiceExclusao = -1;
  }

}
