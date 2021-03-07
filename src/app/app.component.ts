import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  isAuth = true;

  constructor() {
    this.isAuth = window.location.pathname.startsWith('/auth');
  }

}
