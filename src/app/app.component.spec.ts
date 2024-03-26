// TestBed es una utilidad para facilitar la escritura de pruebas unitarias y de integración.
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// 'fdescribe' es una función de Jasmine que se utiliza para definir un "focused suite".
// Esto significa que solo este suite de pruebas se ejecutará, ignorando los demás.
// Cambia 'fdescribe' por 'describe' para evitar que solo este conjunto de pruebas se ejecute.
fdescribe('AppComponent', () => {
  // 'beforeEach' es un hook que se ejecuta antes de cada prueba (it) dentro de este suite.
  // Se utiliza para configurar el entorno de prueba.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Aquí se declaran los módulos que el componente bajo prueba podría necesitar.
      imports: [TranslateModule.forRoot(), HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
    }).compileComponents(); // Compila los componentes que podrían ser declarados o usados (asincrónicamente).
  });

  // 'it' define una prueba individual. Este es el caso de prueba para verificar la creación del AppComponent.
  it('should create the app', () => {
    // TestBed.createComponent crea una instancia del componente (AppComponent) para probar.
    const fixture = TestBed.createComponent(AppComponent);
    // Acceso a la instancia del componente para realizar aserciones.
    const app = fixture.componentInstance;
    // 'expect' es una aserción que verifica si la aplicación se ha creado correctamente.
    expect(app).toBeTruthy();
  });

   
  // it(`should have the 'P-Estudiante' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.initApp).toEqual('P-Estudiante');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, P-Estudiante');
  // });
});
