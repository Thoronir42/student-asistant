"use strict";

class StagAuthService {
    constructor(/**StagAdapter*/ stagAdapter, loginUrl) {
        this._adapter = stagAdapter;
        this.loginUrl = loginUrl;
    }

    getLoginUrl(params) {
        const url = new URL(this.loginUrl);
        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

        return url.toString();
    }

    /**
     *
     * @param {string} stagUserTicket
     * @return {Promise<{asdf}>}
     */
    async getUserIdentity(stagUserTicket) {
        const result = await this._adapter.fetch('/help/getStagUserListForLoginTicket', {
            ticket: stagUserTicket,
        });

        return {...result};
    }
}

module.exports = StagAuthService;
