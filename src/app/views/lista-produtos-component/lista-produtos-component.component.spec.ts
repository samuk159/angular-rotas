import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProdutosComponentComponent } from './lista-produtos-component.component';

describe('ListaProdutosComponentComponent', () => {
  let component: ListaProdutosComponentComponent;
  let fixture: ComponentFixture<ListaProdutosComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaProdutosComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProdutosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
