"use strict";

const CodeInspection = require('../di/CodeInspection');


class RouterModule {

    constructor() {
        /** @type {Container} */
        this.container = undefined;
    }

    injectContainer(container) {
        this.container = container;
    }

    /**
     *
     * @param {express.Router} router
     */
    registerRoutes(router) {
        return router;
    }

    action(func, instance) {
        if (typeof func !== "function") {
            throw new Error("Non funtion type provided")
        }

        return (req, resp, next) => {
            const result = this.container.call(func, instance, {
                request: req,
                response: resp
            });

            if (!result) {
                const methodName = CodeInspection.functionName(func, instance);
                next(new Error(`Method ${methodName} did not return any result`));
                return;
            }

            resp.json(result);
        }
    }

}

module.exports = RouterModule;
