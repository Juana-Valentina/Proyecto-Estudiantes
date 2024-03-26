import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';

fdescribe('HelperService', () => {
  let service: HelperService;
  let spinnerServiceSpy: jasmine.SpyObj<NgxSpinnerService>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    spinnerServiceSpy = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant']);

    TestBed.configureTestingModule({
      providers: [
        HelperService,
        { provide: NgxSpinnerService, useValue: spinnerServiceSpy },
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    });
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Prueba para verificar si el spinner se muestra correctamente
  it('should show spinner', () => {
    service.spinnerShow();
    expect(spinnerServiceSpy.show).toHaveBeenCalled(); // Se verifica que el método show del NgxSpinnerService haya sido llamado
  });

  // Prueba para verificar si el spinner se oculta correctamente
  it('should hide spinner', () => {
    service.spinnerHidder();
    expect(spinnerServiceSpy.hide).toHaveBeenCalled();
  });

  // Prueba para verificar si la alerta se muestra correctamente con el texto traducido
  it('should display alert with translated text', () => {
    // Se simulan las traducciones para el título, el texto y el botón de cierre
    translateServiceSpy.instant.and.returnValues('Translated Title', 'Translated Text', 'CLOSE');
    // Se llama al método alert del servicio con los parámetros específicos
    service.alert('Title', 'Text', 'success', 30000);
    // Se verifica que los métodos de traducción se hayan llamado con los parámetros correctos
    expect(translateServiceSpy.instant).toHaveBeenCalledWith('Title');
    expect(translateServiceSpy.instant).toHaveBeenCalledWith('Text');
    expect(translateServiceSpy.instant).toHaveBeenCalledWith('CLOSE');
  });

  // Prueba para verificar si se marcan todos los controles de formulario como "touched"
  it('should mark all form controls as touched', () => {
    // Se crea un objeto simulado de FormGroup con controles simulados
    const mockFormGroup = {
      controls: {
        control1: { markAsTouched: jasmine.createSpy() }, // Espía para marcar como "touched" el control1
        control2: { markAsTouched: jasmine.createSpy() }
      }
    };
    service.field(mockFormGroup as any); // Se llama al método field del servicio con el formulario simulado
    // Se verifica que los métodos markAsTouched de los controles se hayan llamado
    expect(mockFormGroup.controls.control1.markAsTouched).toHaveBeenCalled();
    expect(mockFormGroup.controls.control2.markAsTouched).toHaveBeenCalled();
  });

  // Prueba para verificar si se obtiene el valor del almacenamiento local correctamente
  it('should return value from local storage', () => {
    // Se simula el método getItem del localStorage para devolver un valor específico
    spyOn(localStorage, 'getItem').and.returnValue('value');
    // Se llama al método getLocalStorage del servicio para obtener el valor del almacenamiento local
    const result = service.getLocalStorage('item');
    // Se verifica que el valor devuelto sea igual al valor simulado
    expect(result).toEqual('value');
    // Se verifica que el método getItem del localStorage haya sido llamado con el parámetro correcto
    expect(localStorage.getItem).toHaveBeenCalledWith('item');
  });

  // Prueba para verificar si se establece el valor en el almacenamiento local correctamente
  it('should set value in local storage', () => {
    spyOn(localStorage, 'setItem'); // Se simula el método setItem del localStorage 
    service.setLocalStorage('key', 'value'); // Se llama al método setLocalStorage del servicio
    // Se verifica que el método setItem del localStorage haya sido llamado con los parámetros correctos
    expect(localStorage.setItem).toHaveBeenCalledWith('key', 'value');
  });

  // Prueba para verificar si se elimina un elemento del almacenamiento local correctamente
  it('should remove item from local storage', () => {
    spyOn(localStorage, 'removeItem'); // Se simula el método removeItem del localStorage
    service.deleteLocalStorage('item'); // Se llama al método deleteLocalStorage del servicio
    // Se verifica que el método removeItem del localStorage haya sido llamado con el parámetro correcto
    expect(localStorage.removeItem).toHaveBeenCalledWith('item');
  });
});