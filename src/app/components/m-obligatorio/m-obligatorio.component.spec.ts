import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MObligatorioComponent } from './m-obligatorio.component';

describe('MObligatorioComponent', () => {
  let component: MObligatorioComponent;
  let fixture: ComponentFixture<MObligatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MObligatorioComponent] 
    }).compileComponents(); 

    fixture = TestBed.createComponent(MObligatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta los cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
