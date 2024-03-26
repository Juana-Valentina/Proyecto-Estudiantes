import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { ListAlbumsComponent } from '../albums/list-albums/list-albums.component';
import { guardsGuard } from '../../shared/auth-guard/guards.guard';

const routes: Routes = [
  { path: '', children: [
    { path: 'list', component: ListPostsComponent },
    // Añadir un parámetro ':id' para acceder a detalles específicos del post
    { path: 'detail/:id', component: DetailPostComponent},
    { path: 'list-albums', component: ListAlbumsComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { 
  
}
