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
    this.userName = this.helperService.getLocalSorage('user') ? 
    JSON.parse(this.helperService.getLocalSorage('user') || '{}').name : null;
  }
}