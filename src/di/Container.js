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

        this._services['container'] = {
            instance: this
        }
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

    callInjects(subject) {
        const props = this.getProps(subject);

        for (let i in props) {
            const name = props[i];
            if (typeof subject[name] !== "function") {
                continue;
            }

            const method = subject[name];

            if (!name.startsWith("inject")) {
                continue;
            }

            this.call(method, subject);
        }
    }

    getProps(subject) {
        const props = [];

        for (let prototype = subject; !!prototype; prototype = Object.getPrototypeOf(prototype)) {
            let op = Object.getOwnPropertyNames(prototype);
            for (let i = 0; i < op.length; i++)
                if (props.indexOf(op[i]) === -1)
                    props.push(op[i]);
        }

        return props;
    }

    call(method, instance, args = {}) {
        const argArray = [];
        const argNames = CodeInspection.functionArgumentNames(method);

        for (let i in argNames) {
            const argName = argNames[i];

            if (args.hasOwnProperty(argName)) {
                argArray.push(args[argNames]);
                continue;
            }

            const service = this.getService(argNames);
            argArray.push(service);
        }

        return method.apply(instance, argArray);
    }

    /**
     * @param {function|Class} definition
     */
    createInstance(definition) {
        const dependencies = this.getDependencies(definition);

        const instance = new definition(...dependencies);
        this.callInjects(instance);

        return instance;
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
