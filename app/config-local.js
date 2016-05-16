angular.module('APEDevices')
    .constant('API_LOGIN_CONFIG', {
        loginState: "login.user",
        resetPassword: "password.reset",
        dashboardState: "frontend.home",
        errorServerState: "error-server.error",
        client_id:'testclient',
        client_secret : 'testpass',
        urlLoginFile:"http://project/PortalsWay/APEDevices/backend/web/index.php/oauth2/token"
    })

    .constant('SITE_CONFIG', {
        siteUrl: 'http://apedevices'
    })
    .constant('API_CONFIG', {
        baseUrl: 'http://project/PortalsWay/APEDevices/backend/web/index.php/backend/',
        accessToken: "140a939790d366e621e9972d87dfc8799a0e4a21",
        assetsBasePath: '/home/users/opt/api/web/'
    });