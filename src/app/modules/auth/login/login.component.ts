import { Component, Input, OnInit, input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../../../services/helper.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { apiRouters } from '../../../core/config/apiRouters';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  @Input() icon1 = 'email';


  name = new FormControl('');
  hide: boolean = true ;
  
  constructor( 
    public helperService: HelperService,
    public router: Router,
    public api: ApiService,
  ){}

  form = new FormGroup({
    email: new FormControl('', Validators["required"]),
    password: new FormControl('', Validators["required"]),
  })

  save(): void {
    if (this.form.invalid) {
      this.helperService.alert('Error', 'Datos inválidos', 'error');
      return;
    }

    this.helperService.spinnerShow();

    this.api.getObs(apiRouters.USERS, true).subscribe({
      next: (resp) => {
        const data: Array <any> = resp;
        let usuario = data.find(item => 
          item.email === this.form.value.email && 
          item.password === this.form.value.password);


        if (usuario) {
          this.helperService.alert('Éxito', 'Inicio de sesión correcto', 'success');
          this.helperService.setLocalStorage('user', JSON.stringify(usuario));
          this.helperService.setLocalStorage('session', 'true');
          this.router.navigateByUrl('/home-page');
        } else {
          this.helperService.alert('Error', 'Correo electrónico o contraseña incorrecta', 'error');
        }
        this.helperService.spinnerHidder();
      },
      error: () => {
        this.helperService.alert('Error', 'Error al intentar iniciar sesión', 'error');
        this.helperService.spinnerHidder();
      }
    });
  }

  visibilidad(): void {
    this.hide = !this.hide; 
}

signUp(): void {
  this.router.navigate(['sign-up']);
} 
 
} //cierre final 


//condición1 ? expresión_si_condición1_verdadero : condición2 ? expresión_si_condición2_verdadero : expresión_si_condición2_falso

