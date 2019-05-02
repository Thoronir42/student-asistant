"use strict";

const UnauthorizedError = require('../errors/UnauthorizedError');

const RouterModule = require('./RouterModule');

class WatsonRouterModule extends RouterModule {


    constructor(/**WatsonController*/ watsonController) {
        super();

        /** @type {WatsonController} */
        this.watsonController = watsonController;
    }

    registerRoutes(router) {
        router.get('/chat', function (req, res, next) {
            if (!res.locals.identity) {
                throw new UnauthorizedError('Not logged in');
            }

            res.render('chat');
        });

        router.get('/api/session', this.action(this.watsonController.createSession, this.watsonController));
        router.post('/api/message', this.action(this.watsonController.processMessage, this.watsonController));

        return router;
    }
}

module.exports = WatsonRouterModule;
