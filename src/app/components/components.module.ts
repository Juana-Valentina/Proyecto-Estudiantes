import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../modules/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BackComponent } from './back/back.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MObligatorioComponent } from './m-obligatorio/m-obligatorio.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SpinnerComponent,
    BackComponent,
    HomePageComponent,
    MObligatorioComponent,
    
  ],

  imports: [
    CommonModule,
    NgxSpinnerModule,
    MaterialModule,
    TranslateModule,
    MatProgressSpinnerModule,
    TranslateModule,
    RouterLink,
    FormsModule
    
  ],

  exports: [
    SpinnerComponent, NavbarComponent, 
    BackComponent, HomePageComponent, 
    MObligatorioComponent
    
  ]

})
export class ComponentsModule { }
