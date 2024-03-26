import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListCommentsComponent } from './list-comments.component';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { ApiService } from '../../../../services/api.service';
import { HelperService } from '../../../../services/helper.service';
import { apiRouters } from '../../../../core/config/apiRouters';
import { ComponentsModule } from '../../../../components/components.module';


fdescribe('ListCommentsComponent', () => {
  let component: ListCommentsComponent;
  let fixture: ComponentFixture<ListCommentsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let helperServiceSpy: jasmine.SpyObj<HelperService>;

  beforeEach(async() => {
    apiServiceSpy = jasmine.createSpyObj<ApiService>('ApiService', ['getOb']);
    helperServiceSpy = jasmine.createSpyObj<HelperService>('HelperService', ['spinnerShow', 'spinnerHidder']);

    await TestBed.configureTestingModule({
      declarations: [ListCommentsComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot(), ComponentsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: HelperService, useValue: helperServiceSpy }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ListCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para verificar que el método ngOnInit() funcione correctamente.
  it('#ngOnInit()', () => {
    const comments = [{ postId: 1, id: 1, name: 'Test', email: 'test@example.com', body: 'Test body' }];
    component.postId = 1;
    apiServiceSpy.getOb.and.returnValue(of(comments)); // Configura el espía del método getOb del ApiService para devolver un observable mockeado.

    component.ngOnInit();

    // Verifica que el método getOb haya sido llamado con la URL correcta y que se hayan realizado las operaciones esperadas.
    expect(apiServiceSpy.getOb).toHaveBeenCalledWith(`${apiRouters.POST_GET}/${component.postId}${apiRouters.COMMENTS}`);
    expect(component.comments).toEqual(comments);
    expect(helperServiceSpy.spinnerShow).toHaveBeenCalledWith();
    expect(helperServiceSpy.spinnerHidder).toHaveBeenCalledWith();
  });

  // Prueba para verificar que el método getComments() maneje correctamente los errores de la API.
  it('#getComments()', () => {
    const errorResponse = new HttpErrorResponse ({status: 504, statusText: 'Gateway Timeout'});
    component.postId = 1;

    apiServiceSpy.getOb.and.returnValue(throwError(errorResponse)); // Configura el espía del método getOb del ApiService para devolver un error.
    const consoleErrorSpy = spyOn(console, 'error'); // Espía el método error de la consola.
    component.getComments();

    // Verifica que el método getOb haya sido llamado con la URL correcta y que se hayan realizado las operaciones .
    expect(apiServiceSpy.getOb).toHaveBeenCalledWith(`${apiRouters.POST_GET}/${component.postId}${apiRouters.COMMENTS}`);
    expect(helperServiceSpy.spinnerShow).toHaveBeenCalledWith();
    expect(helperServiceSpy.spinnerHidder).toHaveBeenCalledWith();
    expect(consoleErrorSpy).toHaveBeenCalledWith(errorResponse); // Verifica que se haya mostrado el error en la consola.
  });

  // Prueba para verificar que el método ngOnInit() no intente obtener comentarios si no se establece un postId.
  it('should not attempt to fetch comments if postId is not set', () => {
    component.postId = undefined; // Establece postId como indefinido.
    component.ngOnInit(); // Llama al método ngOnInit del componente.

    expect(apiServiceSpy.getOb).not.toHaveBeenCalled(); // Verifica que el método getOb no haya sido llamado.
  });

}); //Final