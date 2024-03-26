import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { ListCommentsComponent } from './list-comments/list-comments.component';
import { MaterialModule } from '../../material/material.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxSpinner, NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from "../../../components/components.module";
import { AppComponent } from '../../../app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';


@NgModule({
    declarations: [
        ListCommentsComponent
    ],
    exports: [
        ListCommentsComponent,
        SpinnerComponent
    ],
    imports: [
      CommonModule,
      CommentRoutingModule,
      MaterialModule,
      TranslateModule,
      NgxSpinnerModule,
      ComponentsModule,
      AppComponent,
      MatProgressSpinnerModule,
  ]
})
export class CommentModule { }
