// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  CLINT_ID: 'fe3e909a-bb5c-457f-8754-fa61a558b38f',
  redirectUri: "http://localhost:4200/",
  AUTHORITY: 'https://login.microsoftonline.com/51660e8a-d6b9-4527-84c7-c9d9dbd47526/',
  postLogoutRedirectUri: 'http://localhost:4200/',
  GRAPH_API_ENDPOINT: 'https://graph.microsoft.com/v1.0/me'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
