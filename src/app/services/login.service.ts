import { Inject, Injectable } from '@angular/core';
import {
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import { InteractionType, RedirectRequest } from '@azure/msal-browser';
import { environment } from '../../environments/environment';
import { redirectAuthenticationParameters } from '../msal-config';

@Injectable({ providedIn: 'root' })
export class AppAuthService {
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private readonly authService: MsalService
  ) {}

  isAuthenticated(): boolean {
    let accountList = this.authService.instance.getAllAccounts();
    if (accountList && accountList.length > 0) {
      this.authService.instance.setActiveAccount(accountList[0]);
      return true;
    } else {
      return false;
    }
  }

  login() {
    if (this.msalGuardConfig.interactionType == InteractionType.Redirect) {
      if (this.msalGuardConfig) {
        this.authService.loginRedirect({
          ...this.msalGuardConfig.authRequest,
        } as RedirectRequest);
      } else {
        throw new Error('msal guard config is not set!');
      }
    } else {
      throw new Error('application only support redirection!');
    }
  }

  // checkAndSetActiveAccount(): void {
  //   let activeAccount = this.authService.instance.getActiveAccount();
  //   console.log(activeAccount);
  //   if (!activeAccount && this.isLoggedIn) {
  //     let accounts = this.authService.instance.getAllAccounts();
  //     this.authService.instance.setActiveAccount(accounts[0]);

  //     activeAccount = this.authService.instance.getActiveAccount();
  //     console.log('hello: ',activeAccount?.idTokenClaims);

  //   } else {
  //     this.authService.instance.setActiveAccount(activeAccount);
  //   }
  // }

  refreshToken() {
    let activeAccount =
      this.authService.instance.getActiveAccount() ||
      this.authService.instance.getAllAccounts()[0];
    if (!activeAccount) {
      throw new Error(
        'No active account! Verify a user has been signed in and setActiveAccount has been called.'
      );
    }
    this.authService.acquireTokenSilent({
      ...redirectAuthenticationParameters,
      account: activeAccount,
    });
  }

  public logout() {
    let activeAccount = this.authService.instance.getActiveAccount();
    let isLoggedIn = this.isAuthenticated();
    if (activeAccount && isLoggedIn) {
      this.authService.logout({
        account: activeAccount,
        postLogoutRedirectUri: environment.postLogoutRedirectUri,
      });
    }
  }
}
