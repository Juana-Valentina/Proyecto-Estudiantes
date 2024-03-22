import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-m-obligatorio',
  templateUrl: './m-obligatorio.component.html',
  styleUrl: './m-obligatorio.component.scss'
})
export class MObligatorioComponent {


  @Input() control!: FormControl;
  @Input() message!: string;

}

// use el ! lo cual se espera que esta propiedad sea asignada antes de que se utilice.
// 'FormControl' es un tipo de Angular Forms que representa un control individual de un formulario,
//se coloca que sea string
