import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { FormularioCategoriaComponent } from './formulario-categoria/formulario-categoria.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ListaCategoriasComponent, FormularioCategoriaComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    NgbPaginationModule
  ]
})
export class CategoriasModule { }
