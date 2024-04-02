import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListAlbumsComponent } from './list-albums.component';
import { ApiService } from '../../../services/api.service';
import { HelperService } from '../../../services/helper.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { apiRouters } from '../../../core/config/apiRouters';
import { Album } from '../../../shared/interfaces/album';
import { HttpErrorResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

fdescribe('ListAlbumsComponent', () => {
  let component: ListAlbumsComponent;
  let fixture: ComponentFixture<ListAlbumsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let helperServiceSpy: jasmine.SpyObj<HelperService>;
  let router: Router;

  // Configuración inicial antes de cada prueba
  beforeEach(waitForAsync (() => {
    // Creación de spies para ApiService y HelperService
    apiServiceSpy = jasmine.createSpyObj<ApiService>('ApiService', ['getOb']);
    helperServiceSpy = jasmine.createSpyObj<HelperService>('HelperService', ['spinnerHidder', 'spinnerShow', 'alert']);

    // Configuración del módulo de pruebas
    TestBed.configureTestingModule({
      declarations: [ListAlbumsComponent],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(), 
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: HelperService, useValue: helperServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora los componentes desconocidos en el DOM
    }).compileComponents();

    // Obtención de instancias de los servicios con TestBed.inject
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    helperServiceSpy = TestBed.inject(HelperService) as jasmine.SpyObj<HelperService>;
  }));

  // Configuración adicional antes de cada prueba
  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlbumsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  // Prueba para asegurar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para el método ngOnInit
  it('#ngOnInit', () => {
    spyOn(component, 'getAlbums'); // Espía el método getAlbums
    component.ngOnInit(); // Llama al método ngOnInit del componente
    expect(component.getAlbums).toHaveBeenCalled(); // Verifica que el método getAlbums haya sido llamado
  });

  // Prueba para el método getAlbums
  it('#getAlbums() ', () => {
    const albumsMock: Album[] = [{ userId: 1, id: 1, title: 'Album 1' }, { userId: 1, id: 2, title: 'Album 2' }];

    apiServiceSpy.getOb.and.returnValue(of(albumsMock)); // Configura el ApiService para devolver un observable de albumsMock

    component.ngOnInit(); // Llama al método ngOnInit del componente

    // Verifica que los servicios spinnerShow y getOb hayan sido llamados con los parámetros correctos
    expect(helperServiceSpy.spinnerShow).toHaveBeenCalled();
    expect(apiServiceSpy.getOb).toHaveBeenCalledWith(apiRouters.POST_GET);

    // Utiliza whenStable para asegurarse de que todas las tareas asíncronas hayan finalizado antes de continuar con las expectativas
    fixture.whenStable().then(() => {
      expect(component.albums).toEqual(albumsMock); // Verifica que la propiedad albums se haya establecido correctamente
      expect(helperServiceSpy.spinnerHidder).toHaveBeenCalled(); // Verifica que el servicio spinnerHidder haya sido llamado
    });
  });

  // Prueba para manejar errores correctamente
  it('should handle error properly', () => {
    const errorResponse = new HttpErrorResponse({ error: 'test error', status: 404 });

    apiServiceSpy.getOb.and.returnValue(throwError(errorResponse)); // Configura el ApiService para devolver un error

    component.ngOnInit(); // Llama al método ngOnInit del componente

    // Verifica que los servicios spinnerShow y getOb hayan sido llamados con los parámetros correctos
    expect(helperServiceSpy.spinnerShow).toHaveBeenCalled();
    expect(apiServiceSpy.getOb).toHaveBeenCalledWith(apiRouters.POST_GET);

    // Utiliza whenStable para asegurarse de que todas las tareas asíncronas hayan finalizado antes de continuar con las expectativas
    fixture.whenStable().then(() => {
      expect(helperServiceSpy.spinnerHidder).toHaveBeenCalled(); // Verifica que el servicio spinnerHidder haya sido llamado
      expect(helperServiceSpy.alert).toHaveBeenCalledWith('error', 'error', 'error'); // Verifica que el servicio alert haya sido llamado con los parámetros correctos
    });
  });

  // Prueba para el método info
  it('#info()', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl'); // Espía el método navigateByUrl del router

    const id = 123;
    component.info(id); // Llama al método info con un id específico

    // Verifica que el método navigateByUrl del router haya sido llamado con la ruta correcta
    expect(navigateSpy).toHaveBeenCalledWith(`post/detail?id=${id}`);
  });

});
