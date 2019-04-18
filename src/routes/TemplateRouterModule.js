"use strict";

const RouterModule = require("./RouterModule");

class TemplateRouterModule extends RouterModule {

    constructor() {
        super();
    }

    registerRoutes(router) {
        /* GET home page. */
        router.get('/', function (req, res, next) {
            res.render('index', {title: 'AsiStudent'});
        });

        /* GET about page. */
        router.get('/about', function (req, res, next) {
            res.render('about');
        });

        return router;
    }
}

module.exports = TemplateRouterModule;