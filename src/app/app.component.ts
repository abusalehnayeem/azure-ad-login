import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppAuthService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'azure-ad-login';

  public isLoggedIn = false;

  constructor(
  ) {}

  ngOnInit(): void {

  }
}
