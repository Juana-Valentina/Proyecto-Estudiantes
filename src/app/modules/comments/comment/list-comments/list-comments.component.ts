import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from '../../../../services/helper.service';
import { ApiService } from '../../../../services/api.service';
import { apiRouters } from '../../../../core/config/apiRouters';
import { Comments } from '../../../../shared/interfaces/comments'; 

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrl: './list-comments.component.scss'
})
export class ListCommentsComponent implements OnInit {

  @Input() postId: any;
  public comments: Comments[] = [];
  
  constructor(public api: ApiService, public helperService: HelperService) { }

 
  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.helperService.spinnerShow();
    //llama HTTP GET usando el servicio ApiService para obtener los comentarios del post específico.
    this.api.getOb(`${apiRouters.POST_GET}/${this.postId}${apiRouters.COMMENTS}`).subscribe({
      next: (resp: any) => {
        if (this.postId) {
          this.comments = resp;
          this.helperService.spinnerHidder()
        }
      },
      error: (err) => {
        this.helperService.spinnerHidder();
        console.error(err);
      },
        
      
    });
  }

}