"use strict";

const CodeInspection = require('./CodeInspection');

/**
 * Simple DI container with no lazy service instantiation.
 */
class Container {

    /**
     *
     * @param {Object<string, ServiceDefinition>} definitions
     */
    constructor(definitions = {}) {

        /**
         * @type {Object<string, ServiceDefinition>}
         * @private
         */
        this._services = {};

        /**
         * @type {string[]}
         * @private
         */
        this._resolveStack = [];

        Object.assign(this._services, definitions);
    }

    setDefinition(name, service, overwrite = false) {
        if (this._services.hasOwnProperty(name) && !overwrite) {
            return false;
        }

        this._services[name] = {
            definition: service,
        };

        return true;
    }

    setService(name, service, overwrite = false) {
        if (this._services.hasOwnProperty(name) && !overwrite) {
            return false;
        }

        this._services[name] = {
            instance: service,
        };

        return true;
    }

    /**
     *
     * @param {string[]} names
     *
     * @return {*[]}
     */
    getServices(names) {
        if (!Array.isArray(names) || !names.every((item) => typeof item === "string")) {
            throw new Error("Requests services must be a string array");
        }
        return names.map((name) => this.getService(name));
    }

    getService(name) {
        if (!this._services.hasOwnProperty(name)) {
            throw new Error(`Service of name '${name}' not found`)
        }

        const service = this._services[name];
        if (service.instance) {
            return service.instance;
        }

        if (this._resolveStack.includes(name)) {
            throw new Error("Found dependency loop")
        }

        this._resolveStack.push(name);

        service.instance = this.createInstance(service.definition);

        this._resolveStack.pop();

        return service.instance;
    }

    /**
     * @private
     * @param {function|Class} definition
     */
    createInstance(definition) {
        const dependencies = this.getDependencies(definition);

        return new definition(...dependencies);
    }

    /**
     * @private
     * @param subject
     */
    getDependencies(subject) {
        if (subject.hasOwnProperty("_dependencies")) {
            return this.getServices(subject._dependencies);
        }
        if (typeof subject === "function") {
            const argNames = CodeInspection.functionArgumentNames(subject);
            return this.getServices(argNames);
        }

        console.warn("Failed to get dependencies for ", subject);
        return [];
    }
}

module.exports = Container;

/**
 * @typedef {Object} ServiceDefinition
 *
 * @property {*} [instance]
 * @property {Function|Array} [definition]
 */
