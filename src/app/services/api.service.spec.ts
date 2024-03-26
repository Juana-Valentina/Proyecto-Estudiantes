import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service'; 
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HelperService } from './helper.service';
import { environment } from '../../environments/environment';

fdescribe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj<ApiService>('ApiService', ['getPr', 'getPro', 'getOb', 'getObs', 'postPr', 'postPro', 'postOb', 'postObs', 'putPr', 'putPro', 'putOb', 'putObs', 'deletePr', 'deletePro' , 'deleteOb', 'deleteObs']);
    const helperServiceSpy = jasmine.createSpyObj<HelperService>('HelperService', ['alert', 'translateService', 'spinnerHidder', 'spinnerShow']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: HelperService, useValue: helperServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Prueba para el método getPr   
  it('#getPr', () => { // Respuesta simulada
    const mockResponse = {}; 
    service.getPr('testRoute').then(response => {
      expect(response).toEqual(mockResponse); // Verifica que la respuesta sea igual a la respuesta simulada
    });

    const req = httpMock.expectOne(`${environment.DOMAIN}testRoute`); // hace una petición HTTP a la URL específica
    expect(req.request.method).toBe('GET'); // Verifica que el método de la petición sea GET
    req.flush(mockResponse); // Simula la respuesta de la petición
  });

  it('#getPro', (done: DoneFn) => {
    const mockData = {};  // Define la respuesta simulada
    
    service.getPro('testEndpoint').then(data => {
      expect(data).toEqual(mockData); // Verifica que los datos recibidos sean igual a los datos simulados 
      done();
    });
  
    const req = httpMock.expectOne(`${environment.DOMAIN}testEndpoint`); // Verifica que la petición sea al endpoint correcto
    expect(req.request.method).toBe('GET'); // Verifica que el método de la petición sea GET
    req.flush(mockData); // Simula la respuesta
  });

  it('#getOb', () => {
    const mockData = {}; 
  
    service.getOb('testEndpoint').subscribe(data => {
      expect(data).toEqual(mockData);
    });
  
    const req = httpMock.expectOne(`${environment.DOMAIN}testEndpoint`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('#getObs', () => {
    const mockData = [{}]; 
  
    service.getObs('testEndpoint').subscribe({
      next: data => {
        expect(data).toEqual(mockData);
      },
    });
  
    const req = httpMock.expectOne(`${environment.DOMAIN}testEndpoint`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('#postPr', async () => {
    const mockResponse = {}; 
    const testData = { key: 'value' }; 
  
    const result = await service.postPr('testEndpoint', testData);
    expect(result).toEqual(mockResponse);
  
    const req = httpMock.expectOne(`${environment.DOMAIN}testEndpoint`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('#postPro', (done: DoneFn) => {
    const mockResponse = {}; 
    const testData = { key: 'value' }; 
  
    service.postPro('testEndpoint', testData).then(data => {
      expect(data).toEqual(mockResponse);
      done();
    });
  
    const req = httpMock.expectOne(`${environment.DOMAIN}testEndpoint`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('#postOb', () => {
    const mockResponse = {}; 
    const testData = { key: 'value' };
  
    service.postOb('testEndpoint', testData).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`${environment.DOMAIN}testEndpoint`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('#postObs', () => {
    const mockResponse = [{}]; 
    const testData = { key: 'value' };
  
    service.postObs('testEndpoint', testData).subscribe({
      next: data => {
        expect(data).toEqual(mockResponse);
      },
    });
  
    const req = httpMock.expectOne(`${environment.DOMAIN}testEndpoint`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('#putOb', () => {
    const mockResponse = {}; 
    const testData = { key: 'value' };
  
    service.putOb('testEndpoint', testData).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`${environment.DOMAIN}testEndpoint`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockResponse);
  });

  it('#putObs', () => {
    const mockResponse = {}; 
    const testData = { key: 'value' };
  
    service.putObs('testEndpoint', testData).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`${environment.DOMAIN}testEndpoint`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('#putPr', async () => {
    const mockResponse = {}; 
    const testData = { key: 'value' };
  
    const result = await service.putPr('testEndpoint', testData);
    expect(result).toEqual(mockResponse);
  
    const req = httpMock.expectOne(`${environment.DOMAIN}testEndpoint`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('#putPro', (done: DoneFn) => {
    const mockResponse = {}; 
    const testData = { key: 'value' };
  
    service.putPro('testEndpoint', testData).then(data => {
      expect(data).toEqual(mockResponse);
      done();
    });
  
    const req = httpMock.expectOne(`${environment.DOMAIN}testEndpoint`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('#deleteOb', () => {
    const endpoint = 'testEndpoint/1'; 
    const mockResponse = {}; 
  
    service.deleteOb(endpoint).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`${environment.DOMAIN}${endpoint}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('#deleteObs', () => {
    const endpoint = 'testEndpoint/1';
    const mockResponse = {};
  
    service.deleteObs(endpoint).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`${environment.DOMAIN}${endpoint}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('#deletePr', async () => {
    const endpoint = 'testEndpoint/1';
    const mockResponse = {}; 
  
    const result = await service.deletePr(endpoint);
    expect(result).toEqual(mockResponse);
  
    const req = httpMock.expectOne(`${environment.DOMAIN}${endpoint}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('#deletePro', (done: DoneFn) => {
    const endpoint = 'testEndpoint/1';
    const mockResponse = {}; 
  
    service.deletePro(endpoint).then(data => {
      expect(data).toEqual(mockResponse);
      done();
    });
  
    const req = httpMock.expectOne(`${environment.DOMAIN}${endpoint}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
 
}); //final

