import { MsalInterceptorConfiguration, MsalGuardConfiguration } from "@azure/msal-angular";
import { LogLevel, IPublicClientApplication, PublicClientApplication, BrowserCacheLocation, InteractionType } from "@azure/msal-browser";
import { environment } from '../environments/environment';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

const requestScopes = {
  scopes: ['user.read', 'openid', 'profile']
}

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(logLevel, message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.CLINT_ID,
      authority: environment.AUTHORITY,
      redirectUri: environment.redirectUri,
      postLogoutRedirectUri: environment.redirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.GRAPH_API_ENDPOINT, requestScopes.scopes);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: requestScopes,
    loginFailedRoute: environment.redirectUri
  };
}
