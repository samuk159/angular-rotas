import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';

@Component({
  selector: 'app-formulario-produto',
  templateUrl: './formulario-produto.component.html',
  styleUrls: ['./formulario-produto.component.scss']
})
export class FormularioProdutoComponent implements OnInit {

  produto: Produto = new Produto(null, null);

  constructor() { }

  ngOnInit() {
  }

}
