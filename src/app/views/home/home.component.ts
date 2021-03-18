import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  inscricao: Subscription;

  constructor() { }

  ngOnInit() {
    this.inscricao = this.buscarProdutos().subscribe(
      produtos => {
        console.log(produtos);
      },
      error => {
        console.error(error);
      }
    );
  }

  buscarProdutos() {
    return new Observable(assinante => {
      setTimeout(() => {
        assinante.error('erro ao buscar produtos');
        //assinante.next(['Camiseta', 'Tênis']);
      }, 3000);
    });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

}
