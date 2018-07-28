// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  authenticationServer: 'http://localhost:10080',
  clientId: 'finance',
  clientSecret: 'Urub42q9bCyFBP7B',

  financeServer: 'http://localhost:10081'
};
