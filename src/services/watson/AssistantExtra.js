"use strict";

class AssistantExtra {

    /**
     *
     * @param {WatsonExtraModule[]} modules
     */
    constructor(modules) {
        this._actionByIntent = {};

        modules.forEach((module) => {
            Object.entries(module.getIntentMethods()).forEach(([intent, callback]) => {
                this._actionByIntent[intent] = {
                    exec: callback,
                    definingModule: module
                }
            });
        })
    }

    /**
     * @param {string} intent
     * @param {WatsonResponse} response
     *
     * @return {Promise<*>}
     */
    async getExtraData(intent, response) {
        if (!this._actionByIntent.hasOwnProperty(intent)) {
            return {};
        }

        return this._actionByIntent[intent].exec(response);
    }


}

module.exports = AssistantExtra;