import { Component, OnInit } from '@angular/core';
import { AppAuthService } from './services/login.service';
import { MsalBroadcastService } from '@azure/msal-angular';
import { filter } from 'rxjs';
import { EventMessage, EventType } from '@azure/msal-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'azure-ad-login';

  public appIsInit = false;

  constructor(
    private readonly authService: AppAuthService,
    private readonly msalBroadcastService: MsalBroadcastService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) => msg.eventType === EventType.HANDLE_REDIRECT_END
        )
      )
      .subscribe({
        next: () => {
          const isLoggedIn = this.authService.isAuthenticated();
          if (!isLoggedIn && !this.appIsInit) {
            this.authService.login();
          } else {
            this.appIsInit = true;
          }
        },
        error: (e) => console.error(e),
        complete: () => console.log('Log In complete!'),
      });
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACQUIRE_TOKEN_FAILURE
        )
      )
      .subscribe({
        next: () => {
          this.authService.refreshToken();
        },
        error: (e) => console.error(e),
        complete: () => console.log('!'),
      });
  }
}
