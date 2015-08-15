## APED-UI rewritten in AngularJS

### Configuration
To start please make sure that the Base Url is correct ,in the only configuration file app.js .
 RestangularProvider
                .setBaseUrl("http://server_host/web/index.php/backend/")
                .setDefaultRequestParams({accessToken: "token"})
                .setFullResponse(true);

### Description
the application is composed of two main router .
Backend : /#/backend
Frontend : /#/frontend






### Installation
1. Clone this project or Download that ZIP file
2. Make sure you have [bower](http://bower.io/), [grunt-cli](https://www.npmjs.com/package/grunt-cli) and  [npm](https://www.npmjs.org/) installed globally
3. On the command prompt run the following commands
- cd `project-directory`
- `npm install` - bower install is ran from the postinstall
- `npm start` - a shortcut for `grunt serve`
- `npm run dist` - a shortcut for `grunt serve:dist` to minify the files for deployment

