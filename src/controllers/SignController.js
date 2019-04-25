"use strict";

class SignController {
    constructor(/**Authenticator*/ authenticator) {
        this.authenticator = authenticator;
    }

    signIn(request, response) {
        let authValue = {
            orion: request.body.orion,
            password: request.body.password
        };

        response.cookie(SignController.COOKIE, authValue, { expires: new Date(Date.now() + 900000), httpOnly: true });
        response.redirect("/chat");
    }

    signOut(request, response) {
        response.clearCookie(SignController.COOKIE);
        response.redirect("/");
    }
}

SignController.COOKIE = "auth";

module.exports = SignController;