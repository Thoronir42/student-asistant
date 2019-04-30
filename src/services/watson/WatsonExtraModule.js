"use strict";

const Intent = require('../watson/Intent');

const CodeInspection = require('../../utils/CodeInspection');

class WatsonExtraModule {

    /**
     * @returns {Object<string, Function>}
     */
    getMethods() {
        console.warn("Method getMethods not overriden in " + CodeInspection.instanceClassName(this));
        return {};
    }
}

module.exports = WatsonExtraModule;