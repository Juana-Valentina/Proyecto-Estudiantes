import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DetailPostComponent } from './detail-post.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsModule } from '../../posts.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../../../services/api.service';
import { HelperService } from '../../../../services/helper.service';

fdescribe('DetailPostComponent', () => {
  let component: DetailPostComponent;
  let fixture: ComponentFixture<DetailPostComponent>;
  let activatedRouteMock: any;
  let routerMock: any;
  let apiService: ApiService;
  let helperService: HelperService;

  beforeEach(waitForAsync(() => {
    // Simulación de ActivatedRoute con un id
    activatedRouteMock = {
      queryParams: of({ id: 1 })
    };
    // Espía en el método navigateByUrl del Router
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
    
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        PostsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        ApiService, 
        HelperService 
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPostComponent);
    component = fixture.componentInstance;
    // Inyección de dependencias
    apiService = TestBed.inject(ApiService); 
    helperService = TestBed.inject(HelperService); 
    fixture.detectChanges(); // Detectar los cambios iniciales
  });

  // Prueba para asegurar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para inicializar con datos del post cuando se proporciona el parámetro de ruta
  it('inicialza with post data when route param is provided', () => {
    expect(component.idPost).toEqual(1);
  });

  // Prueba para navegar a la lista de posts cuando ocurre un error en los parámetros de la ruta
  it(' navigate to post list when error occurs in route params', () => {
    activatedRouteMock.queryParams = throwError('Test error'); // Simular un error en ActivatedRoute
    fixture = TestBed.createComponent(DetailPostComponent);
    component = fixture.componentInstance;
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('post/list'); // Esperar navegación a la lista de posts
  });

  // Prueba para obtener detalles del post correctamente
  it(' fetch post details successfully', (done) => {
    const mockPost = {}; //simulacion de datos 
    spyOn(component.helperService, 'spinnerShow');
    spyOn(component.helperService, 'spinnerHidder');
    spyOn(component.api, 'getPr').and.returnValue(Promise.resolve(mockPost));
  
    component.getDetail(1); // Llamar al método getDetail
  
    setTimeout(() => {
      expect(component.helperService.spinnerShow).toHaveBeenCalled();
      expect(component.post).toEqual(mockPost);
      expect(component.helperService.spinnerHidder).toHaveBeenCalled();
      done();
    });
  });
  
  // Prueba para manejar errores al obtener detalles del post
  it('error when fetching post details', (done) => {
    spyOn(component.helperService, 'spinnerShow');
    spyOn(component.helperService, 'spinnerHidder');
    spyOn(component.helperService, 'alert');
    spyOn(component.api, 'getPr').and.returnValue(Promise.reject('error'));
  
    component.getDetail(1); // Llamar al método getDetail
  
    setTimeout(() => {
      expect(component.helperService.spinnerShow).toHaveBeenCalled();
      expect(component.helperService.spinnerHidder).toHaveBeenCalled();
      expect(component.helperService.alert).toHaveBeenCalledWith('error', 'Error', 'error');
      done();
    });

});

  // Prueba para alternar la variable showComments
  it('showComments()', () => {
    const initialShowComments = component.showComments;
    component.verComments(); // Llamar al método verComments
    expect(component.showComments).toBe(!initialShowComments); // Verificar que showComments haya cambiado su valor
    component.verComments(); // Llamar al método verComments nuevamente
    expect(component.showComments).toBe(initialShowComments); // Verificar que showComments haya vuelto a su valor original
});

});
