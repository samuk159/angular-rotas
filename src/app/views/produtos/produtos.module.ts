import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { PrecoPipe } from 'src/app/pipes/preco.pipe';
import { FormularioProdutoComponent } from './formulario-produto/formulario-produto.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from 'src/app/share/share/share.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ListaProdutosComponent,
    PrecoPipe,
    FormularioProdutoComponent
  ],
  imports: [
    ShareModule,
    ProdutosRoutingModule,
    NgSelectModule
  ]
})
export class ProdutosModule { }
