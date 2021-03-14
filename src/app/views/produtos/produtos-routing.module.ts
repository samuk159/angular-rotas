import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardService } from 'src/app/guards/admin-guard.service';
import { FormularioProdutoComponent } from './formulario-produto/formulario-produto.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';


const routes: Routes = [
  { 
    path: '', 
    component: ListaProdutosComponent 
  },
  { 
    path: 'novo', 
    component: FormularioProdutoComponent,
    canActivate: [AdminGuardService] 
  },
  { 
    path: ':id', component: FormularioProdutoComponent,
    canActivate: [AdminGuardService] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
