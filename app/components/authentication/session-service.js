angular.module('authentication')
    .service('Session', ["$cookieStore", function ($cookieStore) {

        var localUser = $cookieStore.get('_session');
        if (!localUser) {

            this.id = null;
            this.userId = null;
            this.userRole = null;
            this.accessToken = null;
            this.expiresIn = null;
            this.tokenType = null;
            this.scope = null;
            this.refreshToken = null;
            this.tenantId = null;
            this.domainName = null;
        } else {

            this.id = localUser.id;
            this.userId = localUser.userId;
            this.userRole = localUser.userRole;
            this.accessToken = localUser.accessToken;
            this.expiresIn = localUser.expiresIn;
            this.tokenType = localUser.tokenType;
            this.scope = localUser.scope;
            this.refreshToken = localUser.refreshToken;
            this.tenantId = localUser.tenantId;
            this.domainName = localUser.domainName;
        }

        this.validateUser = function () {
            var validateUser = null;
            if ($cookieStore.get('_session')) {
                validateUser = $cookieStore.get('_session');
                return !!(validateUser.id && validateUser.userId && validateUser.userRole && validateUser.accessToken && validateUser.expiresIn);
            } else {

                return false;
            }

        };
        this.expiredAt = function () {

        };

        this.validateSession = function () {
            var expiredAt = moment(this.expiresIn);
            var now = moment();
            return now.isAfter(expiredAt);
        };
        this.getToken = function () {

            return $cookieStore.get('_session').accessToken;
        };
        this.getTenantId = function () {

            return $cookieStore.get('_session').tenantId;
        };
        this.create = function (sessionId, userId, userRole, accessToken, expiresIn, tokenType, scope, refreshToken, tenantId, domainName) {

            var userSessionCookies =
            {
                id: sessionId,
                userId: userId,
                userRole: userRole,
                accessToken: accessToken,
                expiresIn: moment().millisecond(expiresIn * 1000),
                tokenType: tokenType,
                scope: scope,
                refreshToken: refreshToken,
                tenantId: tenantId,
                domainName: domainName
            };
            $cookieStore.put('_session', userSessionCookies);
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
            this.accessToken = accessToken;
            this.expiresIn = moment().millisecond(expiresIn * 1000);
            this.tokenType = tokenType;
            this.scope = scope;
            this.refreshToken = refreshToken;
            this.tenantId = tenantId;
            this.domainName = domainName;

        };
        this.destroy = function () {

            $cookieStore.remove('_session');
            $cookieStore.remove('globalSettingsFromApi');
            $cookieStore.remove('userProfile');


        };
        return this;
    }]);
