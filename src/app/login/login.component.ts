import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppAuthService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly _destroying$ = new Subject<void>();
  isLoggedIn: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AppAuthService
  ) {}
  login() {
    if (!this.authenticated) {
      this.authService.login();
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  get authenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
