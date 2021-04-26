import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss']
})
export class ListaCategoriasComponent implements OnInit, OnDestroy {

  categorias: Categoria[] = [];
  modalExclusao: BsModalRef;
  indiceExclusao = -1;
  isAdmin = false;
  inscricoes: Subscription[] = [];
  loading = false;

  pagina = 0;
  porPagina = 3;
  totalDeElementos;

  textoDeBusca;

  constructor(
    private toastr: ToastrService,
    private modalService: BsModalService,
    private categoriaService: CategoriaService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.isAdmin = this.usuarioService.isAdmin();
    this.buscar();
  }

  buscar() {
    this.loading = true;
    this.inscricoes.push(
      this.categoriaService.buscarTodos(
        this.pagina - 1, 
        this.porPagina, 
        this.textoDeBusca
      ).subscribe(res => {
        this.loading = false;
        this.categorias = res.content;
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
      this.categoriaService.excluir(this.categorias[index].id)
      .subscribe(res => {
        this.loading = false;
        this.categorias.splice(index, 1);
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
