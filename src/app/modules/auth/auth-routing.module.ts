import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { guardsGuard } from '../../shared/auth-guard/guards.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '' , children: [
    {path: '**' , component: LoginComponent},
    {path: 'log-in' , component: LoginComponent},  
    {path: 'register-u' , component: RegisterComponent},  
    
  ]},
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
