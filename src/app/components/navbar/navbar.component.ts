import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  selectedLanguage: string = 'en'; // Valor predeterminado (como prueba)

  constructor(public translateService: TranslateService,
    public helperService: HelperService,
    public router: Router ) { }

    go(): void{
      this.router.navigateByUrl('/post/list')
    }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
    this.helperService.setLocalStorage('lang', lang);
    this.selectedLanguage = lang; 

  
}


};