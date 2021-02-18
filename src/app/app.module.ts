import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './views/home-component/home-component.component';
import { ProdutosComponentComponent } from './views/produtos-component/produtos-component.component';
import { ListaProdutosComponentComponent } from './views/lista-produtos-component/lista-produtos-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    ProdutosComponentComponent,
    ListaProdutosComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
