import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { Produto } from 'src/app/models/produto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit, OnDestroy {

  produtos: Produto[] = [];
  modalExclusao: BsModalRef;
  indiceExclusao = -1;
  isAdmin = false;
  inscricoes: Subscription[] = [];
  loading = false;

  pagina = 0;
  porPagina = 3;
  totalDeElementos;

  textoDeBusca;
  precoMin;
  precoMax;
  categoria;

  categorias: Categoria[] = [];

  constructor(
    private toastr: ToastrService,
    private modalService: BsModalService,
    private produtoService: ProdutoService,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.inscricoes.push(
      this.categoriaService.buscarTodos(0, 20, null).subscribe(res => {
        this.categorias = res.content;
      }, error => {
        console.error(error);
        this.toastr.error(error);
      })
    );
    
    /*this.isAdmin = this.usuarioService.usuarioLogado 
      && this.usuarioService.usuarioLogado.isAdmin;*/
    this.isAdmin = true;
    this.buscar();
  }

  buscar() {
    this.loading = true;
    this.inscricoes.push(
      this.produtoService.buscarTodos(
        this.pagina - 1, 
        this.porPagina, 
        this.textoDeBusca,
        this.precoMin,
        this.precoMax,
        this.categoria
      ).subscribe(res => {
        this.loading = false;
        this.produtos = res.content;
        this.totalDeElementos = res.totalElements;
      }, error => {
        this.loading = false;
        console.error(error);
        this.toastr.error(error);
      })
    );
  }

  excluir(index) {
    this.loading = true;
    this.inscricoes.push(
      this.produtoService.excluir(this.produtos[index].id)
      .subscribe(res => {
        this.loading = false;
        this.produtos.splice(index, 1);
        this.toastr.success('Excluído com sucesso');
      }, error => {
        this.loading = false;
        console.error(error);
        this.toastr.error(error);
      })
    );
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

  trocarDePagina(novaPagina) {
    this.pagina = novaPagina;
    this.buscar();
  }

  ngOnDestroy() {
    this.inscricoes.forEach(inscricao => {
      inscricao.unsubscribe();
    });
  }

}
