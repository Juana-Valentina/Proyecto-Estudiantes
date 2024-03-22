import { Component, Input, OnInit, input } from '@angular/core';
import { Size } from 'ngx-spinner';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  @Input() Loading : string = 'LOADING'
  @Input() type: string = 'line-scale-party'
  @Input() color: string = '#ffc5d8'
  @Input() bdColor: string = 'rgba(0, 0, 0, 0.8)'
  @Input() size: Size = 'medium'


  // constructor(public spinner: NgxSpinnerService) { }

  // ngOnInit() {
  //   // Muestra el spinner
  //   this.spinner.show();

  //   // Oculta el spinner después de un minuto
  //   setTimeout(() => {
  //     this.spinner.hide();
  //   }, 60000); // 60000 milisegundos = 1 minuto
  // }
}