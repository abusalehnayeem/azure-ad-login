import {
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  LogLevel,
  IPublicClientApplication,
  PublicClientApplication,
  BrowserCacheLocation,
  InteractionType,
} from '@azure/msal-browser';
import { environment } from '../environments/environment';

// const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
const msie11 = ua.indexOf('Trident/');
const msedge = ua.indexOf('Edge/');
const firefox = ua.indexOf('Firefox');
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0;

const requestScopes = {
  scopes: ['user.read', 'openid', 'profile'],
};

export function loggerCallback(
  logLevel: LogLevel,
  message: string,
  containsPii: any
) {
  if (containsPii) {
    return;
  }
  switch (logLevel) {
    case LogLevel.Error:
      console.error(message);
      return;
    case LogLevel.Info:
      console.info(message);
      return;
    case LogLevel.Verbose:
      console.debug(message);
      return;
    case LogLevel.Warning:
      console.warn(message);
      return;
    default:
      return;
  }
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.CLINT_ID,
      authority: environment.AUTHORITY,
      redirectUri: environment.redirectUri,
      postLogoutRedirectUri: environment.redirectUri,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE || isEdge || isFirefox,
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(
    environment.GRAPH_API_ENDPOINT,
    requestScopes.scopes
  );
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: requestScopes,
    loginFailedRoute: environment.redirectUri,
  };
}
