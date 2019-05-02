"use strict";

const RouterModule = require('./RouterModule');

class SignRouterModule extends RouterModule {

    constructor(/**SignController*/ signController) {
        super();

        /** @type {SignController} */
        this.signController = signController;
    }

    registerRoutes(router) {
        router.get('/out', this.action(this.signController.signOut, this.signController));
        router.get('/submit-webauth', this.action(this.signController.submitWebAuth, this.signController));

        return router;
    }
}

module.exports = SignRouterModule;
