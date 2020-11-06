// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 // apiBaseUrl: 'https://tma4nljbmd.execute-api.us-west-1.amazonaws.com/dev/'

 apiBaseUrl: 'http://192.168.0.114:3000/',
 //merf
 //apiBaseUrl: 'http://192.168.1.113:3000/',

 apiBaseUrlOnline: 'https://yoa6yqfdfg.execute-api.us-east-1.amazonaws.com/merf_dhis/'
 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
