import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ListaProdutosComponent } from './views/lista-produtos/lista-produtos.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'produtos', component: ListaProdutosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
