"use strict";

const Intent = require('../watson/Intent');

class WatsonExtraModule {

    /**
     * @returns {Object<string, Function>}
     */
    getIntentMethods() {
        console.warn("Method getIntentMethods not overriden in " + this);
        return {};
    }
}

module.exports = WatsonExtraModule;