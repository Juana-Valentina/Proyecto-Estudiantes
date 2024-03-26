import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlbumsComponent } from './list-albums.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { HelperService } from '../../../services/helper.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

fdescribe('ListAlbumsComponent', () => {
  let component: ListAlbumsComponent;
  let fixture: ComponentFixture<ListAlbumsComponent>;
  let apiService: ApiService;
  let helperService: HelperService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAlbumsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot() // Asegúrate de importar TranslateModule aquí
      ],
      providers: [
        ApiService,
        HelperService,
        TranslateService // Aunque no es necesario explicitamente debido a TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListAlbumsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    helperService = TestBed.inject(HelperService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.ruta).toEqual('home-page'); // Verifica los valores predeterminados o asignados del componente.
    expect(component.albums).toEqual([]); // Confirma el estado inicial de las propiedades del componente.
  });

  // Verificar la carga inicial de álbumes cuando el componente se inicializa.
  it('should load albums on init', () => {
    const mockAlbums = [{ userId: 1, id: 1, title: 'Test Album' }]; // Datos ficticios para simular la respuesta del API.
    spyOn(apiService, 'getOb').and.returnValue(of(mockAlbums)); // Intercepta llamadas a `getOb` y devuelve un Observable de los datos ficticios.

    component.ngOnInit(); // Ejecuta la lógica de inicialización del componente.

    expect(component.albums.length).toBeGreaterThan; // Espera que la propiedad albums ahora tenga datos.
    expect(component.albums).toEqual(mockAlbums); // Confirma que los datos cargados coinciden con los datos ficticios.
    // Verifica que los métodos del servicio helper han sido llamados.
    expect(helperService.spinnerShow).toHaveBeenCalled(); 
    expect(helperService.spinnerHidder).toHaveBeenCalled();
  });

  // Prueba la funcionalidad de navegación del componente.
  it('should navigate to post detail', () => {
    const id = 123; // Define un id de prueba.
    component.info(id); // Ejecuta la función que debería desencadenar la navegación.

     // Verifica que se llamó al método navigate con los argumentos.
    expect(router.navigate).toHaveBeenCalledWith(['post/detail'], { queryParams: { id } });
  });
});