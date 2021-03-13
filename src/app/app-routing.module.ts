import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardService } from './guards/admin-guard.service';
import { LoginComponent } from './views/auth/login/login.component';
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
  { 
    path: 'produtos', 
    component: ListaProdutosComponent
  },
  { 
    path: 'produtos/novo', 
    component: FormularioProdutoComponent,
    canActivate: [AdminGuardService] 
  },
  { 
    path: 'produtos/:index', 
    component: FormularioProdutoComponent,
    canActivate: [AdminGuardService]  
  },
  {
    path: 'auth',
    loadChildren: './views/auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
