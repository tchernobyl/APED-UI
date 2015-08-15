## APED-UI rewritten in AngularJS

## Requirements

First, you need to have Node.js installed on your system. Please visit [http://nodejs.org](http://nodejs.org) for more information.

### Bower
```sh
npm install -g bower
```
You may have to supply `sudo` before the command.

It's also has Ruby and Compass dependency, please refer to [http://rvm.io](http://rvm.io) for further step.

## Installation

```sh
bower install
```
This will download necessary assets files.


```sh
npm install -g gulp
```


```sh
npm install
```
This will install necessary Node.js packages needed for perform Gulp tasks.

## Configuration
To start please make sure that the Base Url is correct ,in the only configuration file app.js .
 RestangularProvider
                .setBaseUrl("http://server_host/web/index.php/backend/")
                .setDefaultRequestParams({accessToken: "token"})
                .setFullResponse(true);

## Short Description
the application is composed of two main router .
Backend : /#/backend
Frontend : /#/frontend








