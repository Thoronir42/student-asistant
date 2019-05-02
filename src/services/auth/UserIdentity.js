class UserIdentity {

    constructor(authToken, userInfo) {
        /**
         * @type {string}
         */
        this.authToken = authToken;
        /**
         * @type {StagUserInfo[]}
         */
        this.userInfo = userInfo;

        /**
         *
         * @type {number}
         */
        this.activeUserInfo = 0;
    }

    validate() {
        if (typeof this.authToken !== "string") {
            throw new Error(`authToken must be a string, '${typeof this.authToken}' given`);
        }
        if (!Array.isArray(this.userInfo)) {
            throw new Error(`userInfo must be an array, '${typeof this.userInfo}' given`);
        }
    }

    /**
     * @param {number} activeUserInfo
     * @return {StagUserInfo}
     */
    getUserInfo(activeUserInfo = undefined) {
        return this.userInfo[activeUserInfo || this.activeUserInfo];
    }
}

/**
 *
 * @param {UserIdentity|Object} o
 * @returns UserIdentity
 */
UserIdentity.fromObject = (o) => {
    if (!o) return o;

    const ui = new UserIdentity();
    ui.userInfo = o.userInfo;
    ui.authToken = o.authToken;
    ui.activeUserInfo = o.activeUserInfo || 0;

    return ui;
};

module.exports = UserIdentity;

/**
 * @typedef {Object} StagUserInfo
 *
 * @property {string} userName
 * @property {string} role
 * @property {string} roleNazev
 * @property {string} fakulta
 * @property {?string} katedra
 * @property {?number} ucitIdno
 * @property {string} aktivni
 * @property {boolean} hasAnyRozvrharRole
 */
