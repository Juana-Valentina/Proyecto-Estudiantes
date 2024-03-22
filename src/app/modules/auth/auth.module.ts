import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from '../../app.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MObligatorioComponent } from '../../components/m-obligatorio/m-obligatorio.component';
import { RegisterComponent } from './register/register.component';
import { Expresionesr } from '../../core/config/expresiones-r';


@NgModule({
  declarations: [
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
