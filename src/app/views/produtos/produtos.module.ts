import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { PrecoPipe } from 'src/app/pipes/preco.pipe';
import { FormularioProdutoComponent } from './formulario-produto/formulario-produto.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListaProdutosComponent,
    PrecoPipe,
    FormularioProdutoComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    ModalModule.forRoot(),
    FormsModule
  ]
})
export class ProdutosModule { }
