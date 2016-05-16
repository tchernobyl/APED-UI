angular.module('APEDevices')
    .constant('API_LOGIN_CONFIG', {
        loginState: "login.user",
        resetPassword: "password.reset",
        dashboardState: "dashboard.index",
        errorServerState: "error-server.error",
        client_id:'testclient',
        client_secret : 'testpass'
    })


    .constant('API_CONFIG', {
        baseUrl: '',
        accessToken: "6ab527091b4dde4c7e37a0cd26ba24f2afdd5309",
        assetsBasePath: '/home/users/opt/api/web/'
    });
