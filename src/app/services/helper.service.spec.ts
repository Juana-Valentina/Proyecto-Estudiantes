import { TestBed, async, waitForAsync } from '@angular/core/testing';
import { HelperService } from './helper.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from './api.service';
import Swal from 'sweetalert2';
import { MaterialModule } from '../modules/material/material.module';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

fdescribe('HelperService', () => {
  let service: HelperService;
  let spinnerService: NgxSpinnerService;
  let translateService: TranslateService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), MaterialModule, FormsModule],
      providers: [
        HelperService,
        NgxSpinnerService,
        TranslateService,
        ApiService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(HelperService);
    spinnerService = TestBed.inject(NgxSpinnerService);
    translateService = TestBed.inject(TranslateService);
  });

  // Prueba para asegurar que el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Prueba para el método spinnerShow()
  it('spinnerShow()', () => {
    spyOn(spinnerService, 'show');
    service.spinnerShow();
    expect(spinnerService.show).toHaveBeenCalled();
  });

  // Prueba para el método spinnerHidder()
  it('spinnerHidder()', () => {
    spyOn(spinnerService, 'hide');
    service.spinnerHidder();
    expect(spinnerService.hide).toHaveBeenCalled();
  });

  // Prueba para el método alert()
  it('alert()', () => {
    spyOn(Swal, 'fire');
    spyOn(translateService, 'instant').and.returnValue('Translated Text');

    service.alert('Title', 'Text', 'success', 30000);

    expect(translateService.instant).toHaveBeenCalledTimes(3);
    expect(translateService.instant).toHaveBeenCalledWith('Title');
    expect(translateService.instant).toHaveBeenCalledWith('Text');
    expect(translateService.instant).toHaveBeenCalledWith('CLOSE');

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Translated Text',
      text: 'Translated Text',
      icon: 'success',
      confirmButtonText: 'Translated Text',
      customClass: {
        confirmButton: 'btn btn-outline-primary'
      }
    } as any);
  });

  // Prueba para el método field() marcando todos los controles
  it('field() should mark all controls ', () => {
    const formGroup = new FormGroup({
      name: new FormControl('John'),
      email: new FormControl('john@example.com')
    });

    service.field(formGroup);

    expect(formGroup.controls['name'].touched).toBeTruthy();
    expect(formGroup.controls['email'].touched).toBeTruthy();
  });

  // Otra prueba para el método field() marcando los controles del FormGroup
  it('field() FormGroup controls', () =>  {
    const nestedGroup = new FormGroup({
      nestedControl: new FormControl('Nested John')
    });
    const formGroup = new FormGroup({
      name: new FormControl('John'),
      nestedGroup: nestedGroup
    });
  
    service.field(formGroup);
  
    expect(formGroup.controls.name.touched).toBeTrue();
    expect(formGroup.controls.nestedGroup.touched).toBeFalse();
    expect(nestedGroup.controls.nestedControl.touched).toBeTrue();
  });

  // Prueba para el método getLocalStorage()
  it('getLocalStorage()', () => {
    localStorage.setItem('testItem', 'testValue');

    const result = service.getLocalStorage('testItem');

    expect(result).toEqual('testValue');
  });

  // Prueba para el método getLocalStorage() cuando no se encuentra el elemento
  it('getLocalStorage() return', () => {
    localStorage.removeItem('nonexistentItem');

    const result = service.getLocalStorage('nonexistentItem');

    expect(result).toBeUndefined;
  });

  // Prueba para el método deleteLocalStorage()
  it('deleteLocalStorage()', () => {
    localStorage.setItem('itemToDelete', 'value');

    service.deleteLocalStorage('itemToDelete');

    expect(localStorage.getItem('itemToDelete')).toBeNull();
  });
  
});
