import { TestBed, async } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HelperService } from './helper.service';
import { environment } from '../../environments/environment';

fdescribe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController; // Controlador para mockear peticiones HTTP 
    
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    }).compileComponents();
  }));

  // Configuración antes de cada prueba
  beforeEach(() => {
    service = TestBed.inject(ApiService); // Se obtiene la instancia del servicio ApiService
    httpMock = TestBed.inject(HttpTestingController); // Se obtiene el controlador HttpTestingController para simular peticiones HTTP
  });

  // Prueba para asegurar que el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Métodos de prueba para GET
  it('#getPr()', async(() => {
    // Datos de prueba
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRoutePr';

    // Llamada al método getPr del servicio 
    service.getPr(route).then(data => { 
      expect(data).toEqual(testData); // Verifica que los datos recibidos sean iguales a los datos de prueba
    }).catch(err => {
      fail(err) // Si hay un error, marca la prueba como fallida
    });

    // Espera una petición HTTP y verifica que sea GET
    const req = httpMock.expectOne(environment.DOMAIN + route);
    expect(req.request.method).toBe('GET');
    req.flush(testData)
  }));

  // Método para realizar una petición GET con opción de usar una API de prueba
  it('#getPro()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRoutePro';
    const useMockApi = false;

      service.getPro(route, useMockApi).then(data => {
        expect(data).toEqual(testData);
      }).catch(err => {
        fail(err)
      });

      const req = httpMock.expectOne(useMockApi ? environment.DOMAIN_MOCKAPI + route : environment.DOMAIN + route);
      expect(req.request.method).toBe('GET');
      req.flush(testData)
}));

  // Método para realizar una petición GET y obtener un Observable
  it('#getOb()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRouteOb';

    service.getOb(route).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(environment.DOMAIN + route);
    expect(req.request.method).toBe('GET');
    req.flush(testData)
  }));

  // Método para realizar una petición GET y obtener un Observable con opción de usar una API de prueba
  it('#getObs()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRouteObs';
    const useMockApi = true;

    service.getObs(route, useMockApi).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(useMockApi ? environment.DOMAIN_MOCKAPI + route : environment.DOMAIN + route);
    expect(req.request.method).toBe('GET');
    req.flush(testData)
  }));

 // Método para realizar una petición POST estándar
  it('#postPr()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRoutePr';
    const postData = {key: 'value'};

    service.postPr(route, postData).then(data => {
      expect(data).toEqual(testData);
    }).catch(err => {
      fail(err)
    });

    const req = httpMock.expectOne(environment.DOMAIN + route);
    expect(req.request.method).toBe('POST');
    req.flush(testData)
  }));

  // Método para realizar una petición POST con opción de usar una API de prueba
  it('#postPro()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRoutePro';
    const useMockApi = false;
    const postData = {key: 'value'}

    service.postPro(route, postData, useMockApi).then(data => {
      expect(data).toEqual(testData);
    }).catch(err => {
      fail(err)
    });

    const req = httpMock.expectOne(useMockApi ? environment.DOMAIN_MOCKAPI + route : environment.DOMAIN + route);
    expect(req.request.method).toBe('POST');
    req.flush(testData)
  }));

// Método para realizar una petición POST y obtener un Observable
  it('#postOb()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRouteOb';
    const postData = {key: 'value'};

    service.postOb(route, postData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(environment.DOMAIN + route);
    expect(req.request.method).toBe('POST');
    req.flush(testData)
  }));

  // Método para realizar una petición POST y obtener un Observable con opción de usar una API de prueba
  it('#postObs()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRouteObs';
    const useMockApi = true;
    const postData = {key: 'value'};

    service.postObs(route, postData, useMockApi).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(useMockApi ? environment.DOMAIN_MOCKAPI + route : environment.DOMAIN + route);
    expect(req.request.method).toBe('POST');
    req.flush(testData)
  }));

  // Método para realizar una petición PUT estándar
  it('#putPr()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRoutePr';
    const putData = {key: 'value'};

    service.putPr(route, putData).then(data => {
      expect(data).toEqual(testData);
    }).catch(err => {
      fail(err)
    });

    const req = httpMock.expectOne(environment.DOMAIN + route);
    expect(req.request.method).toBe('PUT');
    req.flush(testData)
  }));

// Método para realizar una petición PUT con opción de usar una API de prueba
  it('#putPro()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRoutePro';
    const useMockApi = false;
    const putData = {key: 'value'}

    service.putPro(route, putData, useMockApi).then(data => {
      expect(data).toEqual(testData);
    }).catch(err => {
      fail(err)
    });

    const req = httpMock.expectOne(useMockApi ? environment.DOMAIN_MOCKAPI + route : environment.DOMAIN + route);
    expect(req.request.method).toBe('PUT');
    req.flush(testData)
  }));

// Método para realizar una petición PUT y obtener un Observable
  it('#putOb()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRouteOb';
    const putData = {key: 'value'};

    service.putOb(route, putData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(environment.DOMAIN + route);
    expect(req.request.method).toBe('PUT');
    req.flush(testData)
  }));

// Método para realizar una petición PUT y obtener un Observable con opción de usar una API de prueba
  it('#putObs()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRouteObs';
    const useMockApi = true;
    const putData = {key: 'value'};

    service.putObs(route, putData, useMockApi).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(useMockApi ? environment.DOMAIN_MOCKAPI + route : environment.DOMAIN + route);
    expect(req.request.method).toBe('PUT');
    req.flush(testData)
  }));

  // Método para realizar una petición DELETE estándar
  it('#deletePr()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRoutePr';

    service.deletePr(route).then(data => {
      expect(data).toEqual(testData);
    }).catch(err => {
      fail(err)
    });

    const req = httpMock.expectOne(environment.DOMAIN + route);
    expect(req.request.method).toBe('DELETE');
    req.flush(testData)
  }));

// Método para realizar una petición DELETE con opción de usar una API de prueba
  it('#deletePro()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRoutePro';
    const useMockApi = false;

    service.deletePro(route, useMockApi).then(data => {
      expect(data).toEqual(testData);
    }).catch(err => {
      fail(err)
    });

    const req = httpMock.expectOne(useMockApi ? environment.DOMAIN_MOCKAPI + route : environment.DOMAIN + route);
    expect(req.request.method).toBe('DELETE');
    req.flush(testData)
  }));

// Método para realizar una petición DELETE y obtener un Observable
  it('#deleteOb()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRouteOb';

    service.deleteOb(route).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(environment.DOMAIN + route);
    expect(req.request.method).toBe('DELETE');
    req.flush(testData)
  }));

// Método para realizar una petición DELETE y obtener un Observable con opción de usar una API de prueba
  it('#deleteObs()', async(() => {
    const testData = {id: 1, name: 'John'};
    const route = 'exampleRouteObs';
    const useMockApi = true;

    service.deleteObs(route, useMockApi).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(useMockApi ? environment.DOMAIN_MOCKAPI + route : environment.DOMAIN + route);
    expect(req.request.method).toBe('DELETE');
    req.flush(testData)
  }));

  // Prueba para manejar errores en el método getPr
  it('handle error getpr', async(() => {
    const route = 'exampleRoute';
    service.getPr(route).then(data => {
      fail('Request should have failed'); // La petición debería haber fallado, si no, marca la prueba como fallida
    }).catch(err => {
      expect(err).toBeTruthy(); // Verifica que se haya recibido un error
    });

    // Espera una petición HTTP y simula un error
    const req = httpMock.expectOne(environment.DOMAIN + route);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error')); // Simula un error de red
  }));

// Prueba para manejar errores en el método getPro
  it('handle error getpro', async(() => {
    const route = 'exampleRoutePro';
    const useMockApi = false;

    service.getPro(route, useMockApi).then(data => {
      fail('Request should have failed'); // La petición debería haber fallado, si no, marca la prueba como fallida
    }).catch(err => {
      expect(err).toBeTruthy(); // Verifica que se haya recibido un error
    });

    const req = httpMock.expectOne(useMockApi ? environment.DOMAIN_MOCKAPI + route : environment.DOMAIN + route);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));
  }));

  // Prueba para manejar errores en el método postPr
  it('handle error postPr', async(() => {
    const route = 'exampleRoute';
    const postData = { key: 'value' };

    service.postPr(route, postData).then(data => {
      fail('Request should have failed'); // La petición debería haber fallado, si no, marca la prueba como fallida
    }).catch(err => {
      expect(err).toBeTruthy(); // Verifica que se haya recibido un error
    });

    const req = httpMock.expectOne(environment.DOMAIN + route);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Network error'));
  }));

// Prueba para manejar errores en el método postPro
  it('handle error postPro', async(() => {
    const route = 'exampleRoutePro';
    const useMockApi = false;
    const postData = { key: 'value' };

    service.postPro(route, postData, useMockApi).then(data => {
      fail('Request should have failed'); // La petición debería haber fallado, si no, marca la prueba como fallida
    }).catch(err => {
      expect(err).toBeTruthy(); // Verifica que se haya recibido un error
    });

    const req = httpMock.expectOne(useMockApi ? environment.DOMAIN_MOCKAPI + route : environment.DOMAIN + route);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Network error'));
  }));

  // Prueba para manejar errores en el método putPr
  it('handle error putPr', async(() => {
    const route = 'exampleRoute';
    const putData = { key: 'value' };

    service.putPr(route, putData).then(data => {
      fail('Request should have failed'); // La petición debería haber fallado, si no, marca la prueba como fallida
    }).catch(err => {
      expect(err).toBeTruthy(); // Verifica que se haya recibido un error
    });

    const req = httpMock.expectOne(environment.DOMAIN + route);
    expect(req.request.method).toBe('PUT');
    req.error(new ErrorEvent('Network error'));
  }));

// Prueba para manejar errores en el método putPro
  it('handle error putPro', async(() => {
    const route = 'exampleRoutePro';
    const useMockApi = false;
    const putData = { key: 'value' };

    service.putPro(route, putData, useMockApi).then(data => {
      fail('Request should have failed'); // La petición debería haber fallado, si no, marca la prueba como fallida
    }).catch(err => {
      expect(err).toBeTruthy(); // Verifica que se haya recibido un error
    });

    const req = httpMock.expectOne(useMockApi ? environment.DOMAIN_MOCKAPI + route : environment.DOMAIN + route);
    expect(req.request.method).toBe('PUT');
    req.error(new ErrorEvent('Network error'));
  }));

  // Prueba para manejar errores en el método deletePr
  it('handle error deletePr', async(() => {
    const route = 'exampleRoute';
    service.deletePr(route).then(data => {
      fail('Request should have failed'); // La petición debería haber fallado, si no, marca la prueba como fallida
    }).catch(err => {
      expect(err).toBeTruthy(); // Verifica que se haya recibido un error
    });

    const req = httpMock.expectOne(environment.DOMAIN + route);
    expect(req.request.method).toBe('DELETE');
    req.error(new ErrorEvent('Network error'));
  }));

// Prueba para manejar errores en el método deletePro
  it('handle error deletePro', async(() => {
    const route = 'exampleRoutePro';
    const useMockApi = false;

    service.deletePro(route, useMockApi).then(data => {
      fail('Request should have failed'); // La petición debería haber fallado, si no, marca la prueba como fallida
    }).catch(err => {
      expect(err).toBeTruthy(); // Verifica que se haya recibido un error
    });

    const req = httpMock.expectOne(useMockApi ? environment.DOMAIN_MOCKAPI + route : environment.DOMAIN + route);
    expect(req.request.method).toBe('DELETE');
    req.error(new ErrorEvent('Network error'));
  }));

}); //final
