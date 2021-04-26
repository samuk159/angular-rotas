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
  imagem;

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
      route
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

  salvo() {
    if (this.imagem) {
      this.toastr.warning('Salvando imagem');
      this.loading = true;
      this.inscricoes.push(
        this.produtoService.salvarImagem(
          this.imagem, this.model.id
        ).subscribe(res => {
          this.loading = false;
          this.toastr.success('Imagem salva com sucesso');
          this.router.navigate(['produtos']);
        }, erro => {
          this.loading = false;
          console.error(erro);
          this.toastr.error('Houve um erro ao salvar a imagem');
        })
      );
    } else {
      this.router.navigate(['produtos']);
    }
  }

  imagemSelecionada(event) {
    this.imagem = event.target.files[0];
  }

  removerImagem() {
    this.loading = true;
    this.inscricoes.push(
      this.produtoService.removerImagem(this.model.id).subscribe(res => {
        this.loading = false;
        this.toastr.success('Imagem removida com sucesso');
        this.model = res;
      }, erro => {
        this.loading = false;
        console.error(erro);
        this.toastr.error('Houve um erro ao remover a imagem');
      })
    );
  }

}
