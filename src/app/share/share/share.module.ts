import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    NgbPaginationModule
  ],
  exports: [
    CommonModule,
    ModalModule,
    FormsModule,
    NgbPaginationModule
  ]
})
export class ShareModule { }
