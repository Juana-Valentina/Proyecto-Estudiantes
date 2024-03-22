import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAlbumsComponent } from './list-albums/list-albums.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from '../../components/components.module';
import { AppComponent } from '../../app.component';



@NgModule({
  declarations: [
    ListAlbumsComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    NgxSpinnerModule,
    ComponentsModule,
    AppComponent
  ],

  exports:[
    ListAlbumsComponent
  ]
})
export class AlbumsModule { }
