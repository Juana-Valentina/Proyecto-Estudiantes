import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { guardsGuard } from '../../shared/auth-guard/guards.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', children: [
    // Ruta comodín para manejar cualquier ruta no definida dentro del módulo de autenticación
    { path: '**', component: LoginComponent, canActivate: [guardsGuard] },
    // Ruta para el login
    { path: 'log-in', component: LoginComponent, canActivate: [guardsGuard] },
    // Ruta para el registro
    { path: 'sign-up', component: RegisterComponent, canActivate: [guardsGuard] }
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
