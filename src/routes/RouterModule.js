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

        const argumentNames = CodeInspection.functionArgumentNames(func);
        const handlesResponse = argumentNames.includes('response');

        return async (req, resp, next) => {
            const args = {
                request: req,
            };
            if (handlesResponse) {
                args.response = resp;
            }

            try {
                const result = await this.container.call(func, instance, args);

                if (handlesResponse) {
                    if (!resp.finished) {
                        const methodName = CodeInspection.functionName(func, instance);
                        console.warn("Handler response of " + methodName + " not finished");
                        resp.end();
                    }
                    return;
                }

                if (!result) {
                    const methodName = CodeInspection.functionName(func, instance);
                    next(new Error(`Method ${methodName} did not return any result`));
                    return;
                }

                resp.json(result);
            } catch (err) {
                next(err);
            }

        }
    }

}

module.exports = RouterModule;
