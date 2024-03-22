import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MaterialModule} from "./modules/material/material.module";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgxSpinnerModule} from "ngx-spinner";
import Swal from 'sweetalert2';

//otro proyecto

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MaterialModule, TranslateModule, NgxSpinnerModule,
  ],
  providers :[TranslateService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'P-Estudiante';
  
  constructor(private translateService: TranslateService,
    // public helperService: HelperService,
              ) {
      this.initApp()
    }

initApp():void{
      const lang: any = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'es';
      this.translateService.setDefaultLang(lang);
      this.translateService.use(lang);
      // this.helperService.alert(this.translateService.instant('CLOSE'), "CLOSE", "success")    
}

// changeLanguage(lang: string): void {
//   this.translateService.use(lang);
//   localStorage.setItem('lang', lang);
// }

} //FINAL



 // public helperService: HelperService

 // this.helperService.spinnerShow();

//   this.spinner.show();
  //   setTimeout(() => {
  //     this.spinner.hide();
  //   }, 5000);