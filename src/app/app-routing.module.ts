import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './views/home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuardService] 
  },
  { 
    path: 'produtos',
    loadChildren: './views/produtos/produtos.module#ProdutosModule',
    canActivate: [AuthGuardService]
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
