import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormularioBaseComponent } from 'src/app/share/formulario-base/formulario-base.component';

@Component({
  selector: 'app-formulario-categoria',
  templateUrl: './formulario-categoria.component.html',
  styleUrls: ['./formulario-categoria.component.scss']
})
export class FormularioCategoriaComponent 
  extends FormularioBaseComponent<Categoria> {

  constructor(
    public toastr: ToastrService,
    public categoriaService: CategoriaService,
    public router: Router,
    public route: ActivatedRoute
  ) { 
    super(
      toastr,
      categoriaService,
      router,
      route
    );

    this.model = new Categoria();
  }

  validar() {
    if (!this.model.nome) {
      this.toastr.error('Por favor informe o nome');
      return;
    }
  }

  salvo() {
    this.router.navigate(['categorias']);
  }

}
