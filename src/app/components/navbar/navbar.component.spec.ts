import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  // Creación de objetos espía (spy) para servicios que serán inyectados.
  let helperServiceSpy: jasmine.SpyObj<HelperService>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>
  let router: Router;

  beforeEach(async () => {
    // Configuración de los objetos espía con métodos
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['use']);
    helperServiceSpy = jasmine.createSpyObj('HelperService', ['setLocalStorage']);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, 
        RouterTestingModule, MaterialModule,
        TranslateModule.forRoot() ],
      providers: [{ provide: TranslateService, useValue: translateServiceSpy },
        { provide: HelperService, useValue: helperServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    // Inyección de los servicios espiados y el Router.
    translateServiceSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
    helperServiceSpy = TestBed.inject(HelperService) as jasmine.SpyObj<HelperService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba la funcionalidad de cambio de idioma verificando las llamadas a los servicios implicados.
  it('should change language', () =>{
    const lang = 'es'; // Define un idioma de prueba.
    component.changeLanguage(lang); // Ejecuta la función de cambio de idioma.
    // Verifica que los métodos esperados de los servicios espiados sean llamados con los argumentos correctos.
    expect(translateServiceSpy.use).toHaveBeenCalledWith(lang);
    expect(helperServiceSpy.setLocalStorage).toHaveBeenCalledWith('lang', lang);
    expect(component.selectedLanguage).toBe(lang); // Verifica que el idioma seleccionado en el componente sea el esperado.
  });

  // Prueba la funcionalidad de navegación verificando que el método navigateByUrl del Router sea llamado.
  it('should navigate to /post/list', () => {
    const router = TestBed.inject(Router); 
    const navigateSpy = spyOn(router, 'navigateByUrl'); // Espía el método navigateByUrl del router.

    component.go(); // Ejecuta la función de navegación del componente.
    expect(navigateSpy).toHaveBeenCalledWith('/post/list');  // Verifica que se haya llamado al método con la ruta.
  })

}); 