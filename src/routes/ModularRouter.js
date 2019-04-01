"use strict";

const express = require('express');

const RouterModule = require('./RouterModule');

class ModularRouter {
    /**
     *
     * @param {Container} container
     */
    constructor(container) {

        /**
         * @type {RouterModuleSpecification[]}
         * @private
         */
        this._moduleSpecifications = [];

        /** @type {Container} */
        this._container = container;
    }

    /**
     *
     * @param {Function} moduleClass - class descending the {@link RouterModule}
     * @param {RouterModuleOptions} [options]
     */
    addModule(moduleClass, options = undefined) {
        if (!moduleClass.prototype instanceof RouterModule) {
            throw new Error("ModuleClass is not descendant of RouterModule");
        }

        this._moduleSpecifications.push({
            type: moduleClass,
            options: options || {}
        });
    }

    /**
     *
     * @return {express.Router}
     */
    compileRouter() {
        const router = express.Router();

        this._moduleSpecifications.forEach((spec) => {
            /** @type {RouterModule} */
            const module = this._container.createInstance(spec.type);

            const subRouter = module.registerRoutes(express.Router());

            if (spec.options.urlPrefix) {
                router.use(spec.options.urlPrefix, subRouter);
            } else {
                router.use(subRouter);
            }
        });

        return router;
    }
}

module.exports = ModularRouter;

/**
 * @typedef {Object} RouterModuleSpecification
 *
 * @property {Function} type
 * @property {RouterModuleOptions} options
 */

/**
 * @typedef {Object} RouterModuleOptions
 *
 * @property {string} urlPrefix?
 */
