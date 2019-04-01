"use strict";

const RouterModule = require('./RouterModule');

class SignRouterModule extends RouterModule {

    constructor(/**SignController*/ signController) {
        super();

        /** @type {SignController} */
        this.signController = signController;
    }

    registerRoutes(router) {
        router.get('/put-cookie', this.action(this.signController.putCookie, this.signController));

        return router;
    }
}

module.exports = SignRouterModule;