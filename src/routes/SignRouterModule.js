"use strict";

const RouterModule = require('./RouterModule');

class SignRouterModule extends RouterModule {

    constructor(/**SignController*/ signController) {
        super();

        /** @type {SignController} */
        this.signController = signController;
    }

    registerRoutes(router) {
        router.get('/in', function (req, res, next) {
            res.render('signInForm');
        });

        router.post('/in', this.action(this.signController.signIn, this.signController));
        router.get('/out', this.action(this.signController.signOut, this.signController));
        return router;
    }
}

module.exports = SignRouterModule;