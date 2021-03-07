import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioProdutoComponent } from './views/formulario-produto/formulario-produto.component';
import { HomeComponent } from './views/home/home.component';
import { ListaProdutosComponent } from './views/lista-produtos/lista-produtos.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'produtos', component: ListaProdutosComponent },
  { path: 'produtos/novo', component: FormularioProdutoComponent },
  { path: 'produtos/:index', component: FormularioProdutoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
