import { Inject, Injectable, OnInit, OnDestroy } from '@angular/core';
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  InteractionStatus,
  RedirectRequest,
} from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AppAuthService implements OnInit, OnDestroy {
  private readonly _destroying$ = new Subject<void>();
  isLoggedIn: boolean = false;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private readonly authService: MsalService,
    private readonly msalBroadcastService: MsalBroadcastService
  ) {}
  ngOnInit(): void {
    this.authService.instance.enableAccountStorageEvents();

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          console.log(result);
          this.isAuthenticated();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.isAuthenticated();
        this.checkAndSetActiveAccount();
      });
  }
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  checkAndSetActiveAccount(): void {
    let activeAccount = this.authService.instance.getActiveAccount();
    if (!activeAccount && this.isLoggedIn) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    } else {
      this.authService.instance.setActiveAccount(activeAccount);
    }
  }

  isAuthenticated(): boolean {
    this.isLoggedIn = this.authService.instance.getAllAccounts().length > 0;
    return this.isLoggedIn;
  }

  login(): void {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  public logout() {
    const activeAccount =
      this.authService.instance.getActiveAccount() ||
      this.authService.instance.getAllAccounts()[0];
    this.isLoggedIn = false;
    this.authService.logout({
      account: activeAccount,
      postLogoutRedirectUri: environment.postLogoutRedirectUri,
    });
  }
}
