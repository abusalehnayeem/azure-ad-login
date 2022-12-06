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
    private readonly authService: AppAuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log('status: ', this.isLoggedIn);
    if (!this.authenticated) {
      this.authService.login();
    }
  }

  get authenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  login() {
    if (!this.authenticated) {
      this.authService.login();
    } else {
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.authService.logout();
  }
}
