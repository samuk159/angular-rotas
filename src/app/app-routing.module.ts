import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './containers/navbar/navbar.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './views/home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'home', component: HomeComponent },
      { 
        path: 'produtos',
        loadChildren: './views/produtos/produtos.module#ProdutosModule'
      }
    ]
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
