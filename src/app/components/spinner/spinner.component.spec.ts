import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';

// Describe el conjunto de pruebas unitarias para el componente SpinnerComponent
describe('SpinnerComponent', () => {
  let component: SpinnerComponent; // Variable para almacenar la instancia del componente
  let fixture: ComponentFixture<SpinnerComponent>; // Variable para almacenar el entorno de prueba del componente

  // Configuración inicial antes de cada prueba
  beforeEach(async () => {
    // Configuración del módulo de pruebas
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent] // Declara el componente que estamos probando
    }).compileComponents(); // Compila los componentes

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta los cambios
  });

  // Prueba para asegurar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente existe
  });
});
