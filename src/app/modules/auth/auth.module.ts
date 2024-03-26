import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from '../../app.component';
import { ComponentsModule } from '../../components/components.module';
import { MaterialModule } from '../material/material.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],

  exports:[
    LoginComponent,
    RegisterComponent
  ],

  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxSpinnerModule,
    MaterialModule,
    TranslateModule,
    ComponentsModule,
    MatProgressSpinnerModule,
    AppComponent,
    ReactiveFormsModule,
  ],
  
})
export class AuthModule { }
