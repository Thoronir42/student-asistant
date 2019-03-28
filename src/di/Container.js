"use strict";

/**
 * Simple DI container with no lazy service instantiation.
 */
class Container {
    constructor() {
        this._services = {};
    }

    setService(name, service, overwrite = false) {
        if (this._services.hasOwnProperty(name) && !overwrite) {
            return false;
        }

        this._services[name] = service;
        return true;
    }

    /**
     *
     * @param {string[]} names
     *
     * @return {*[]}
     */
    getServices(names) {
        return names.map((name) => this.getService(name));
    }

    getService(name) {
        if (!this._services.hasOwnProperty(name)) {
            throw new Error(`Service of name ${name} not found`)
        }

        return this._services[name];
    }
}

module.exports = Container;