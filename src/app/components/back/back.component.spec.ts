import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BackComponent } from './back.component';
import { Router } from '@angular/router';
import { MaterialModule } from '../../modules/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';

// 'fdescribe' significa que sólo esta suite de pruebas se ejecutará. Cambia a 'describe' para evitar esto.
fdescribe('BackComponent', () => {
  // Variables para nuestro componente y su envoltorio de pruebas.
  let component: BackComponent; 
  let fixture: ComponentFixture<BackComponent>;

  // 'beforeEach' es ejecutado antes de cada prueba.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackComponent], // Declara el componente que estamos probando.
      imports: [ MaterialModule, RouterTestingModule ] 
    })
    .compileComponents(); 

    // Crea una instancia de `BackComponent` para probar, junto con su entorno de prueba.
    fixture = TestBed.createComponent(BackComponent);
    component = fixture.componentInstance;
    // Detecta los cambios iniciales para que la prueba pueda correr con el estado más reciente.
    fixture.detectChanges(); 
  });

  // Una prueba para asegurarse de que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente existe.
  });

  // Una prueba para verificar que la propiedad 'icon' del componente es 'arrow_back'.
  it('arrow_back', () =>{
    expect(component.icon).toEqual('arrow_back'); // Verifica el valor de 'icon'.
  });

  // Una prueba para el método `goBack()`.
  it('#goBack()', waitForAsync(() =>  {
    const router = TestBed.inject(Router); // Inyecta el servicio de Router para espiar y controlar la navegación.
    spyOn(router, 'navigateByUrl'); // Espía el método 'navigateByUrl' del router.

    component.rute = 'test-route'; // Establece una ruta de prueba para navegar.
    fixture.detectChanges(); // Detecta los cambios después de establecer la ruta.
    
    component.goBack(); // Ejecuta el método goBack.
    expect(router.navigateByUrl).toHaveBeenCalledWith('test-route'); // Verifica que la navegación fue llamada con la ruta de prueba.
  }));


});
