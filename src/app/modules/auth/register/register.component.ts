import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators, PatternValidator } from "@angular/forms";
import { Router } from "@angular/router";
import { apiRouters } from "../../../core/config/apiRouters";
import { ApiService } from "../../../services/api.service";
import { HelperService } from "../../../services/helper.service";
import { User } from "../../../shared/interfaces/user";
import { Expresionesr } from "../../../core/config/expresiones-r";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  visibilidad(): void {
    this.hide = !this.hide; 
}

  @Input() icon1 = 'email';
  hide: boolean = true ;
  name = new FormControl('');

  public user: User[] = [];  //interfaz
  public Expresionesr: typeof Expresionesr = Expresionesr;

  constructor( 
    public api: ApiService,
    public helperService: HelperService,
    public router: Router
  ){}

  form = new FormGroup({
    name: new FormControl('', [Validators["required"], Validators["pattern"](/^[a-zA-Z\s]*$/)]), // TODO pasarlas al codigo para reutilizarlos
    image: new FormControl('', Validators["required"]), // Validators["pattern"](/^https:\/\/[\w-]+\.com\/\d+\/\d+$/)]), //https://example.com/640/480
    email: new FormControl('', [Validators["required"], Validators["pattern"](Expresionesr.email)]),
    password: new FormControl('', Validators["required"])
  });

  ngOnInit(): void {
    // this.getUsers();
  }


  getUsers(): void {
    this.helperService.spinnerShow();
    this.api.getObs(apiRouters.USERS, true).subscribe({ 
      next: (resp) => {
        const data: Array <any> = resp;
        let usuario = data.find(item => {
          item.email === this.form.value.email  
        })

        console.log(usuario);
        
        if (usuario) {
          this.helperService.alert('ERROR', 'El correo ya existe', 'error');
        
        } else {
          this.save()  // TODO guardar postobs
        }
        
        this.helperService.spinnerHidder(); 
      },
      error: (err) => {
        this.helperService.spinnerHidder();
        this.helperService.alert('error', 'error', 'error');
        console.error(err);  
      }
    });


  }

  save() {
    console.log(this.form.value);
    this.api.postObs(apiRouters.USERS, this.form.value, true).subscribe({

      next: (resp) => {
        console.log(resp);
        this.helperService.alert('EXITOSO', 'exito', 'success');
        this.router.navigateByUrl('/auth/log-in'); 
        this.helperService.spinnerHidder();
      }, error: (err) => {
        this.helperService.spinnerHidder();
        this.helperService.alert('ERROR', 'error', 'error')
        console.log(err);
      }
    });

  } //cierre del save
 
} //cierre final 