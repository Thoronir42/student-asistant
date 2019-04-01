"use strict";

const RouterModule = require('./RouterModule');

class WatsonRouterModule extends RouterModule {


    constructor(/**WatsonController*/ watsonController) {
        super();

        /** @type {WatsonController} */
        this.watsonController = watsonController;
    }

    registerRoutes(router) {
        router.get('/api/session', this.action(this.watsonController.createSession, this.watsonController));
        router.get('/api/message', this.action(this.watsonController.processMessage, this.watsonController));

        return router;
    }
}

module.exports = WatsonRouterModule;
