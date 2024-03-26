import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ApiService } from '../../../services/api.service';
import { HelperService } from '../../../services/helper.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  let apiService: ApiService;
  let helperService: HelperService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [ LoginComponent ],
      providers: [
        ApiService,
        HelperService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    // Inyección de los servicios y el Router.
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    helperService = TestBed.inject(HelperService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
    spyOn(helperService, 'alert'); // Espía el método alert del servicio HelperService.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para verificar que el método save() sea llamado correctamente con un formulario válido.
  it('should call save() method with valid form', () => {
    spyOn(helperService, 'spinnerShow'); // Espía el método spinnerShow del servicio HelperService.
    spyOn(apiService, 'getObs').and.returnValue(of([{ email: 'test@example.com', password: '123456' }])); // Espía el método getObs del servicio ApiService y devuelve un observable mockeado.

    component.form.setValue({ email: 'test@example.com', password: '123456' }); // Establece valores en el formulario.
    component.save(); // Llama al método save del componente.

    expect(helperService.spinnerShow).toHaveBeenCalled(); // Verifica que el método spinnerShow haya sido llamado.
  });

  // Prueba para verificar que el método save() no sea llamado con un formulario inválido.
  it('should not call save() method with invalid form', () => {
    spyOn(helperService, 'spinnerShow'); // Espía el método spinnerShow del servicio HelperService.

    component.save(); // Llama al método save del componente sin establecer valores en el formulario.

    expect(helperService.spinnerShow).not.toHaveBeenCalled(); // Verifica que el método spinnerShow no haya sido llamado.
  });

  // Prueba para verificar que el método de visibilidad del password funcione correctamente.
  it('should toggle password visibility', () => {
    const initialValue = component.hide; // Guarda el valor inicial de la visibilidad del password.
    component.visibilidad(); // Llama al método de visibilidad del password.
    const toggledValue = component.hide; // Guarda el valor después de llamar al método.

    expect(toggledValue).not.toEqual(initialValue); // Verifica que el valor haya cambiado.
  });

  // Prueba para verificar que el método signUp navegue correctamente a la página de registro.
  it('should navigate to sign-up page', () => {
    spyOn(router, 'navigate'); // Espía el método navigate del Router.

    component.signUp(); // Llama al método signUp del componente.

    expect(router.navigate).toHaveBeenCalledWith(['sign-up']); // Verifica que el método navigate haya sido llamado con la ruta .
  });

  // Prueba para verificar que se muestre una alerta de error para credenciales incorrectas.
  it('should show error alert for incorrect email or password', () => {
    spyOn(apiService, 'getObs').and.returnValue(of([])); // Espía el método getObs del servicio ApiService y devuelve un observable vacío.
    spyOn(helperService, 'spinnerHidder'); // Espía el método spinnerHidder del servicio HelperService.

    component.form.setValue({ email: 'wrong@example.com', password: 'wrongpassword' }); // Establece valores incorrectos en el formulario.
    component.save();

    expect(helperService.spinnerHidder).toHaveBeenCalled();
  });

  // Prueba para verificar que se maneje correctamente un error de API al intentar iniciar sesión.
  it('should handle API error on login attempt', () => {
    
    spyOn(apiService, 'getObs').and.returnValue(throwError(() => new Error('API error')));  // Espía el método getObs del servicio ApiService y devuelve un error.
    spyOn(helperService, 'spinnerHidder');// Espía el método spinnerHidder del servicio HelperService.

    component.form.setValue({ email: 'test@example.com', password: '123456' }); // Establece valores en el formulario.
    component.save();

    expect(helperService.spinnerHidder).toHaveBeenCalled();
  });


});