import { Component } from '@angular/core';
import { AppAuthService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private readonly authService: AppAuthService) {}
  logout() {
    this.authService.logout();
  }
}
