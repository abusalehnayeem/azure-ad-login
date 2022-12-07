import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppAuthService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public isLoggedIn = this.authService.isAuthenticated() && (localStorage.getItem('msal.token')?.trim() !== null || localStorage.getItem('msal.token')?.trim() !== undefined);

  constructor(private readonly authService: AppAuthService, private readonly router: Router) { }

  ngOnInit(): void {

  }

  public login(): void {
    if(!this.isLoggedIn){
      this.authService.login();
    } else {
      this.router.navigate(['/home']);
    }
  }
}
