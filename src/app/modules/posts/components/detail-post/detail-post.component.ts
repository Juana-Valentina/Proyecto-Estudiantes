import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../../../components/components.module";
import { apiRouters } from "../../../../core/config/apiRouters";
import { ApiService } from "../../../../services/api.service";
import { HelperService } from "../../../../services/helper.service";
import { CommentModule } from "../../../comments/comment/comment.module";
import { MaterialModule } from "../../../material/material.module";

@Component({
    selector: 'app-detail-post',
    standalone: true,
    templateUrl: './detail-post.component.html',
    styleUrl: './detail-post.component.scss',
    imports: [CommonModule, MaterialModule, CommentModule, TranslateModule, ComponentsModule]
})
export class DetailPostComponent {

  // public posts: Post[] = [];
    idPost: any;
  post = {} as any;
  showComments = false;
  ruta = 'post/list';

  constructor(public activatedRoute: ActivatedRoute,
    public api: ApiService,
    public helperService: HelperService,
    public router: Router,
    ) 
    
    { 
    activatedRoute.queryParams.subscribe({
      next:(resp)=> {
        this.getDetail(resp['id']);
        this.idPost = resp['id'];
        
      },
      error:(err)=>{
        this.router.navigateByUrl('post/list');
        console.log(err);
        
      }
    })
    
  }

getDetail(id: number): void {
  this.helperService.spinnerShow();
  this.api.getPr(apiRouters.POST_GET + `/${id}`)
    .then((resp: any) => {
      this.post = resp;
      this.helperService.spinnerHidder();
    })
    .catch(err => {
      this.helperService.spinnerHidder();
      this.helperService.alert('error', 'Error', 'error');
    });
}

  verComments(): void {
    this.showComments = !this.showComments;
  }

}