import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit {

  produtos: Produto[] = [];
  modalExclusao: BsModalRef;
  indiceExclusao = -1;
  isAdmin = false;

  constructor(
    private toastr: ToastrService,
    private modalService: BsModalService,
    private produtoService: ProdutoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.produtos = this.produtoService.getProdutos();
    this.usuarioService.usuarioLogadoEmitter
    .subscribe(usuario => {
        this.isAdmin = usuario && usuario.isAdmin;
    });
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
