import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../material/material.module';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommentModule } from '../comments/comment/comment.module';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ComponentsModule } from '../../components/components.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AlbumsModule } from '../albums/albums.module';



@NgModule({
  declarations: [ ListPostsComponent ],
  imports: [
    
    CommonModule,
    
    PostsRoutingModule,
    NgxSpinnerModule,
    MaterialModule,
    TranslateModule,
    CommentModule,
    ComponentsModule,
    MatProgressSpinnerModule
    
  ],
  exports:[
    CommonModule,
    NgxSpinnerModule,
    MaterialModule,
    
  ]

})
export class PostsModule {  }
