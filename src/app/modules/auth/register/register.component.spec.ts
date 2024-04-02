import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../../services/api.service';
import { HelperService } from '../../../services/helper.service';
import { of, throwError } from 'rxjs';
import { MaterialModule } from '../../material/material.module';
import { ComponentsModule } from '../../../components/components.module';
import { AuthModule } from '../auth.module';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let helperServiceSpy: jasmine.SpyObj<HelperService>;

  // Configuración inicial antes de cada prueba
  beforeEach(waitForAsync(() => {
    // Creación de spies para ApiService y HelperService
    apiServiceSpy = jasmine.createSpyObj<ApiService>('ApiService', ['getObs', 'postObs']);
    helperServiceSpy = jasmine.createSpyObj<HelperService>('HelperService', ['spinnerShow', 'spinnerHidder', 'alert']);

    // Configuración del módulo de pruebas
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        MaterialModule,
        ComponentsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
        AuthModule
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: HelperService, useValue: helperServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Creación del componente 
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges(); // Detectar los cambios iniciales
  });

  // Prueba para asegurar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para verificar que getUsers y save sean llamados cuando el formulario es válido
  it('#getUsers() and #save() when form is valid', () => {
    spyOn(component, 'save'); // Espiar el método save
    apiServiceSpy.getObs.and.returnValue(of([])); // Configurar ApiService para devolver un observable vacío
    component.form.setValue({
      name: 'Test User',
      image: 'http://example.com/image.jpg',
      email: 'test@example.com',
      password: 'password'
    });

    component.getUsers(); // Llamar al método getUsers

    expect(component.save).toHaveBeenCalled(); // Verificar que el método save haya sido llamado
  });

  // Prueba para manejar errores cuando getUsers falla
  it('error when getUsers fails', () => {
    apiServiceSpy.getObs.and.returnValue(throwError('API Error')); // Configurar ApiService para devolver un error
    
    component.getUsers(); // Llamar al método getUsers
    
    expect(helperServiceSpy.alert).toHaveBeenCalledWith('error', 'error', 'error'); // Verificar que se llame al servicio alert con los parámetros correctos
  });

  // Prueba para cambiar la visibilidad de la contraseña
  it('visibility()', () => {
    const initialValue = component.hide; // Obtener el valor inicial de hide
    component.visibilidad(); // Llamar al método visibilidad
    expect(component.hide).not.toEqual(initialValue); // Verificar que hide haya cambiado su valor
  });

  // Prueba para llamar a save cuando el usuario no existe
  it('save() when user does not exist', () => {
    spyOn(component, 'save'); // Espiar el método save
    const mockUserData = [{ email: 'existing@example.com' }]; // Datos simulados de usuario existente
    apiServiceSpy.getObs.and.returnValue(of(mockUserData)); // Configurar ApiService para devolver mockUserData
    component.form.setValue({
      name: 'New User',
      image: 'http://example.com/new_image.jpg',
      email: 'new@example.com',
      password: 'password'
    });
  
    component.getUsers(); // Llamar al método getUsers
  
    expect(component.save).toHaveBeenCalled(); // Verificar que el método save haya sido llamado
  });
  
  // Prueba para mostrar una alerta de error cuando el usuario ya existe
  it('error alert when user already exists', () => {
    const mockUserData = [{ email: 'existing@example.com' }]; // Datos simulados de usuario existente
    apiServiceSpy.getObs.and.returnValue(of(mockUserData)); // Configurar ApiService para devolver mockUserData
    component.form.setValue({
      name: 'Existing User',
      image: 'http://example.com/existing_image.jpg',
      email: 'existing@example.com',
      password: 'password'
    });
  
    component.getUsers(); // Llamar al método getUsers
  
    expect(helperServiceSpy.alert).toHaveBeenCalledWith('ERROR', 'El correo ya existe', 'error'); // Verificar que se llame al servicio alert con los parámetros correctos
  });

  // Prueba para mostrar una alerta de éxito y navegar a la página de inicio de sesión cuando save es exitoso
  it('success alert and navigate to login page when save is successful', () => {
    spyOn(component.router, 'navigateByUrl'); // Espiar el método navigateByUrl del router
    apiServiceSpy.postObs.and.returnValue(of({})); // Configurar ApiService para devolver un observable vacío
  
    component.save(); // Llamar al método save
  
    expect(component.helperService.alert).toHaveBeenCalledWith('EXITOSO', 'exito', 'success'); // Verificar que se llame al servicio alert con los parámetros correctos
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/auth/log-in'); // Verificar que se llame al método navigateByUrl del router con la ruta correcta
  });
  
  // Prueba para mostrar una alerta de error cuando save falla
  it('error alert when save fails', () => {
    apiServiceSpy.postObs.and.returnValue(throwError('API Error')); // Configurar ApiService para devolver un error
  
    component.save(); // Llamar al método save
  
    expect(component.helperService.alert).toHaveBeenCalledWith('ERROR', 'error', 'error'); // Verificar que se llame al servicio alert con los parámetros correctos
  });

});
