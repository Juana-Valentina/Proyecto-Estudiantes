import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { ListAlbumsComponent } from '../albums/list-albums/list-albums.component';
import { guardsGuard } from '../../shared/auth-guard/guards.guard';

const routes: Routes = [
  {path: '' , children: [
    {path: 'list' , component: ListPostsComponent, canActivate: [guardsGuard]},
    {path: 'detail' , component: DetailPostComponent, canActivate: [guardsGuard]}, 
    {path: 'list-albums' , component: ListAlbumsComponent, canActivate: [guardsGuard]}, 
    
  ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { 
  
}
