"use strict";

const UserIdentity = require('./UserIdentity');

class Authenticator {
    constructor(/**StagAuthService*/ stagAuthService) {
        this.stagAuthService = stagAuthService;
    }

    getLoginLink(originalURL) {
        return this.stagAuthService.getLoginUrl({
            originalURL,
        });
    }

    logout(session) {
        delete session.identity;
    }

    /**
     *
     * @param session
     * @return {UserIdentity|undefined}
     */
    loadIdentity(session) {
        return UserIdentity.fromObject(session.identity);
    }

    /**
     *
     * @param session
     * @param {string} token
     * @param {StagUserInfo[]} userInfo
     */
    useIdentity(session, token, userInfo) {
        let userIdentity = new UserIdentity(token, userInfo);
        userIdentity.validate();

        session.identity = userIdentity;

    }

    async useToken(session, stagUserTicket) {
        const identity = this.stagAuthService.getUserIdentity(stagUserTicket);
        session.identity = new UserIdentity(stagUserTicket, identity.stagUserInfo);

        return identity;
    }
}

Authenticator.storage = "./some/random/dir/lawl";

module.exports = Authenticator;

/**
 * @typedef {Object} StagUserInfoResponse
 *
 * @property {StagUserInfo[]} stagUserInfo
 */
