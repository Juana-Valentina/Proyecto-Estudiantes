import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrl: './back.component.scss'
})
export class BackComponent {

  @Input() rute = '';
  @Input() icon = 'arrow_back';

  constructor(public router: Router,
    ) {}


  goBack(): void {
    this.router.navigateByUrl(this.rute);
  }

}
