"use strict";

class AssistantExtra {

    /**
     *
     * @param {WatsonExtraModule[]} modules
     */
    constructor(modules) {
        /**
         *
         * @type {Object<string, {exec: ExtraDataFunction, definingModule: WatsonExtraModule}>}
         * @private
         */
        this._actions = {};

        modules.forEach((module) => {
            Object.entries(module.getMethods()).forEach(([extraDataClass, callback]) => {
                if (this._actions.hasOwnProperty(extraDataClass)) {
                    throw new Error(`Cannot redeclare ${extraDataClass} - Already defined in ${this._actions[extraDataClass].definingModule}`)
                }

                this._actions[extraDataClass] = {
                    exec: callback,
                    definingModule: module
                }
            });
        })
    }

    /**
     * @param {string} extraDataClass
     * @param {UserIdentity} user
     * @param {WatsonResponse} response
     * @param {RequestContext} context
     *
     * @return {Promise<*>}
     */
    async getExtraData(extraDataClass, user, response, context) {
        if (!this._actions.hasOwnProperty(extraDataClass)) {
            return {};
        }

        return this._actions[extraDataClass].exec(user, response, context);
    }


}

module.exports = AssistantExtra;
