import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioCategoriaComponent } from './formulario-categoria/formulario-categoria.component';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';


const routes: Routes = [
  { 
    path: '', 
    component: ListaCategoriasComponent 
  },
  { 
    path: 'novo', 
    component: FormularioCategoriaComponent
  },
  { 
    path: ':id', component: FormularioCategoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
