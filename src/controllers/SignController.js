"use strict";

class SignController {
    constructor(/**Authenticator*/ authenticator) {
        this.authenticator = authenticator;
    }

    async signIn(request, response) {
        const result = await this.authenticator.signIn(request.body.orion, request.body.password);

        response.cookie(SignController.COOKIE, authValue, {expires: new Date(Date.now() + 900000), httpOnly: true});
        response.redirect("/chat");
    }

    signOut(request, response) {
        this.authenticator.logout(request.session);
        response.redirect("/");
    }

    async submitWebAuth(request, response) {
        const {stagUserInfo, stagUserTicket} = request.query;

        try {
            let text = Buffer.from(stagUserInfo, 'base64').toString();
            /** @type {StagUserInfoResponse} */
            const userInfo = JSON.parse(text);
            this.authenticator.useIdentity(request.session, stagUserTicket, userInfo.stagUserInfo);

            response.redirect('/');
        } catch (e) {
            response.status(400).json({
                result: 'noo',
                message: e.message,
            });
        }
    }
}

SignController.COOKIE = "auth";

module.exports = SignController;
