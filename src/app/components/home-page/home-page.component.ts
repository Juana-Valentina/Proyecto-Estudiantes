import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  userName: string | null = null;

  constructor(public helperService: HelperService) {}

  ngOnInit(): void {
  const user = this.helperService.getLocalStorage('user');
  this.userName = user ? JSON.parse(user).name ?? null : null;
}
}