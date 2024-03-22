import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from '../app.component';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  

  constructor(public spinner: NgxSpinnerService,
    public translateService: TranslateService) { }

  spinnerShow(): void  {
    this.spinner.show();
  }

  spinnerHidder(): void  {
    this.spinner.hide();
  }

  alert(title: string, text: string, icon?: 'success' | 'error' | 'warning' | 'question', timer = 30000): void {
    Swal.fire({
      title: this.translateService.instant(title),
      text: this.translateService.instant(text),
      icon: icon,
      confirmButtonText: this.translateService.instant("CLOSE"), 
      customClass: {
        confirmButton: 'btn btn-outline-primary'
      }
    });
  }

field(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.field(control);
    }
  });
}

getLocalSorage(item: any): string | undefined{
  if(localStorage.getItem(item)) {
    item = localStorage.getItem(item);
    return item;
  } else{
    return undefined;
  }
}

setLocalStorage(key: string, value: string): void{
  localStorage.setItem(key, value);
}

deleteLocalStorage(item: string): void{
  localStorage.removeItem(item);
}

}
