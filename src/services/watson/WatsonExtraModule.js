"use strict";

const Intent = require('../watson/Intent');

const CodeInspection = require('../../utils/CodeInspection');

class WatsonExtraModule {

    /**
     * @returns {Object<string, ExtraDataFunction>}
     */
    getMethods() {
        console.warn("Method getMethods not overriden in " + CodeInspection.instanceClassName(this));
        return {};
    }
}

module.exports = WatsonExtraModule;

/**
 * @typedef {Function} ExtraDataFunction
 *
 * @param {UserIdentity} user
 * @param {WatsonResponse} response
 * @param {RequestContext} context
 */
