import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { apiRouters } from '../../../core/config/apiRouters';
import { ApiService } from '../../../services/api.service';
import { HelperService } from '../../../services/helper.service';
import { Album } from '../../../shared/interfaces/album';

@Component({
  selector: 'app-list-albums',
  templateUrl: './list-albums.component.html',
  styleUrl: './list-albums.component.scss'
})
export class ListAlbumsComponent implements OnInit {

  ruta = 'home-page';
 
  public albums: Album[] = []; 

  constructor(public api: ApiService, 
    public router: Router, 
    public helperService: HelperService,
    public activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getAlbums(); 
  }

  getAlbums(): void { 
    this.helperService.spinnerShow();
    this.api.getOb(apiRouters.POST_GET).subscribe({ 
      next: (resp) => {
        console.table(resp);
        this.albums = resp; 
        this.helperService.spinnerHidder();
      }, error: (err) => {
        this.helperService.spinnerHidder();
        this.helperService.alert('error', 'error', 'error');
        console.error(err);  
      }
    });
  }
  
  info(id: number): void {
    this.router.navigateByUrl(`post/detail?id=${id}`);
  }

}
