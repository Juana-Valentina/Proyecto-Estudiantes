import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { HelperService } from '../../services/helper.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('HomePageComponent', () => { 
  let component: HomePageComponent; // Variable para contener la instancia del componente.
  let fixture: ComponentFixture<HomePageComponent>; // Variable para contener el fixture del componente.
  let helperServiceSpy: jasmine.SpyObj<HelperService>; // Variable para el espía del servicio HelperService.

  beforeEach(waitForAsync(() => {
    // Creación de un espía para el servicio HelperService con el método getLocalStorage.
    helperServiceSpy = jasmine.createSpyObj('HelperService', ['getLocalStorage']);

    TestBed.configureTestingModule({
      declarations: [HomePageComponent], 
      imports: [HttpClientTestingModule, TranslateModule.forRoot()], 
      providers : [ {provide: HelperService, useValue: helperServiceSpy}, 
      TranslateService ],
      schemas: [NO_ERRORS_SCHEMA] // Uso del esquema NO_ERRORS_SCHEMA para evitar la validación de los componentes.
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
    
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para verificar que el componente carga correctamente el nombre de usuario desde el almacenamiento local.
  it('should correctly load username from localStorage', () => {
    const mockUser = { name: 'Test User' }; // Definición de un usuario de prueba.
    helperServiceSpy.getLocalStorage.and.returnValue(JSON.stringify(mockUser)); // Configuración del espía para el método getLocalStorage.
    component.ngOnInit(); // Llamada al método ngOnInit del componente.

    expect(component.userName).toEqual('Test User'); // Verificación de que el nombre de usuario se cargó correctamente.
  });

}); 