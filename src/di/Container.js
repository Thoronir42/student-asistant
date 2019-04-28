"use strict";

const CodeInspection = require('./CodeInspection');

const DIExpression = require('./DIExpression');

/**
 * Simple DI container with no lazy service instantiation.
 */
class Container {

    /**
     *
     * @param {{[string]: ServiceDefinition}} definitions
     * @param {Object<string, *>} parameters
     */
    constructor(definitions = {}, parameters = {}) {

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

        try {
            service.instance = this.createInstance(service.definition, service.args);
        } catch (/**Error*/ e) {
            const stack = this._resolveStack.join("->");

            let error = new Error(`Could not create service '${name}' (stack:${stack}). Original error: ${e.message}`);
            error.stack = error.stack + '\n' + e.stack;
            throw error
        } finally {
            this._resolveStack.pop();
        }


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
            const name = argNames[i];

            if (args.hasOwnProperty(name)) {
                argArray.push(args[name]);
                continue;
            }

            const service = this.getService(argNames);
            argArray.push(service);
        }

        return method.apply(instance, argArray);
    }

    /**
     * @param {function|Class} definition
     * @param {Object<string, *>} args
     */
    createInstance(definition, args = {}) {
        if (!definition) {
            throw new Error("Definition is not set");
        }
        const dependencies = this.getDependencies(definition, args);

        const instance = new definition(...dependencies);
        this.callInjects(instance);

        return instance;
    }

    /**
     * @private
     * @param subject
     * @param {Object<string, *>} args
     */
    getDependencies(subject, args) {
        /** @type {string[]} */
        let dependencyNames;

        if (subject.hasOwnProperty("_dependencies")) {
            dependencyNames = subject._dependencies;
        } else if (typeof subject === "function") {
            dependencyNames = CodeInspection.functionArgumentNames(subject);
        } else {
            console.warn("Failed to get dependencies for ", subject);
            dependencyNames = [];
        }

        if (!args) {
            args = {};
        }

        return dependencyNames.map((dep) => {
            if (args.hasOwnProperty(dep)) {
                if (args[dep] instanceof DIExpression) {
                    try {
                        return this.evaluateExpression(args[dep]);
                    } catch (/**Error*/ e) {
                        const name = CodeInspection.getSignatureName(subject);
                        throw new Error(`Failed to evaluate parameter '${dep}' of '${name}': ${e.message}`);
                    }
                }

                return args[dep];
            }

            return this.getService(dep);
        });
    }

    /**
     *
     * @param {DIExpression} DIE
     */
    evaluateExpression(DIE) {
        switch (DIE.type) {
            case DIExpression.Type.arrayOf:
                return DIE.expression.map((item) => this.createInstance(item));
        }

        throw new Error(`Unsupported expression type: ${DIE.type}`)
    }
}

module.exports = Container;

/**
 * @typedef {Object} ServiceDefinition
 *
 * @property {*} [instance]
 * @property {Function|Class} [definition]
 * @property {Object} [args]
 */
