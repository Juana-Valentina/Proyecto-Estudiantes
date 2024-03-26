import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { guardsGuard } from './guards.guard';
import { HelperService } from '../../services/helper.service';

fdescribe('guardsGuard', () => {
  let helperServiceSpy: jasmine.SpyObj<HelperService>;
  let routerSpy: jasmine.SpyObj<Router>;
  
  const executeGuard: CanActivateFn = (...guardParameters) => 
  TestBed.runInInjectionContext(() => guardsGuard(...guardParameters));

  beforeEach(() => {
    helperServiceSpy = jasmine.createSpyObj('HelperService', ['getLocalStorage']);
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [ {provide: HelperService, useValue: helperServiceSpy},
      {provide: Router, useValue: routerSpy} ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  // Prueba para verificar si el guardia permite la activación cuando hay una sesión activa.
  it('should allow activation when there is a session', () => {
    // Simula que hay una sesión activa devolviendo un valor 'true' del método getLocalStorage.
    helperServiceSpy.getLocalStorage.and.returnValue('true');

    // Define mocks para ActivatedRouteSnapshot y RouterStateSnapshot.
    const routeMock: Partial<ActivatedRouteSnapshot> = {};
    const stateMock: Partial<RouterStateSnapshot> = {};
     // Ejecuta el guardia con los mocks definidos.
    const result = executeGuard(routeMock as ActivatedRouteSnapshot, stateMock as RouterStateSnapshot);

    // Verifica que el guardia permita la activación.
    expect(result).toBe(true);
  });

  // Prueba para verificar si el guardia redirige al inicio de sesión cuando no hay una sesión activa.
  it('should redirect to login when there is no session', () => {
    // Simula que no hay una sesión activa devolviendo 'undefined' del método getLocalStorage.
    helperServiceSpy.getLocalStorage.and.returnValue(undefined);

    // Crea una UrlTree esperada para la redirección.
    const expectedUrlTree = new UrlTree ();
    routerSpy.createUrlTree.and.returnValue(expectedUrlTree);

    // Define mocks para ActivatedRouteSnapshot y RouterStateSnapshot
    const routeMock: Partial<ActivatedRouteSnapshot> = {};
    const stateMock: Partial<RouterStateSnapshot> = {};
    // Ejecuta el guardia con los mocks definidos.
    const result = executeGuard(routeMock as ActivatedRouteSnapshot, stateMock as RouterStateSnapshot);

    // Verifica que el guardia redirija al inicio de sesión.
    expect(result instanceof UrlTree).toBe(true, 'Expected to return an instance of UrlTree')
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/auth/log-in']);
  })

}); 
