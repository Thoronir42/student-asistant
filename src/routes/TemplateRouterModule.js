"use strict";

const RouterModule = require("./RouterModule");

class TemplateRouterModule extends RouterModule {

    constructor(/**Authenticator*/ authenticator) {
        super();
        this.authenticator = authenticator;
    }

    registerRoutes(router) {

        router.get('/', this.action((request, response) => {
            const url = new URL(response.locals.baseUrl + "/sign/submit-webauth");

            response.locals.loginLink = this.authenticator.getLoginLink(url);

            response.render('about');
        }));

        return router;
    }
}

module.exports = TemplateRouterModule;
