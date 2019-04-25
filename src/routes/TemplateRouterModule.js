"use strict";

const RouterModule = require("./RouterModule");

class TemplateRouterModule extends RouterModule {

    constructor() {
        super();
    }

    registerRoutes(router) {

        router.get('/', function (req, res, next) {
            if (req.appVars.isSignedIn) {
                res.redirect("/chat");
            } else {
                res.redirect("/sign/in");
            }
        });

        router.get('/about', function (req, res, next) {
            res.render('about');
        });

        router.get('/chat', function (req, res, next) {
            res.render('chat', {title: 'AsiStudent'});
        });

        return router;
    }
}

module.exports = TemplateRouterModule;