"use strict";

class SignController {
    constructor(/**Authenticator*/ authenticator) {
        this.authenticator = authenticator;
    }


    putCookie(request) {

        return {
            cookieStatus: 'not-set :(',
        };
    }
}

module.exports = SignController;