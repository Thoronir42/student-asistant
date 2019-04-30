"use strict";

class WatsonResponse {
    /**
     *
     * @param {Object} [output]
     * @param {WatsonResponseGeneric[]} [output.generic]
     * @param {WatsonResponseIntent[]} [output.intents]
     * @param {WatsonResponseEntity[]} [output.entities]
     * @param {MessageContext} [context]
     */
    constructor(output = undefined, context = undefined) {
        /**
         *
         * @type {Object}
         * @property {WatsonResponseGeneric[]} generic
         * @property {WatsonResponseIntent[]} intents
         * @property {WatsonResponseEntity[]} entities
         */
        this.output = output || {};
        if (!this.output.generic) {
            this.output.generic = [];
        }
        if (!this.output.intents) {
            this.output.intents = []
        }
        if (!this.output.entities) {
            this.output.entities = [];
        }

        if (!context) {
            context = {};
        }
        if (!context.skills) {
            context.skills = {};
        }
        if (!context.skills['main skill']) {
            context.skills['main skill'] = {};
        }
        if (!context.skills['main skill'].user_defined) {
            context.skills['main skill'].user_defined = {};
        }

        this.context = context;
    }

    hasIntent() {
        return this.output.intents && this.output.intents.length > 0
    }

    /**
     *
     * @return {WatsonResponseIntent|undefined}
     */
    getMaxConfidentIntent() {
        let dummy = {};
        let maxConfidenceIntent = this.output.intents.reduce((a, b) => a.confidence >= b.confidence ? a : b, dummy);

        return maxConfidenceIntent === dummy ? undefined : maxConfidenceIntent;
    }

    /**
     *
     * @param {string} name
     * @return {*}
     */
    getUserSkill(name) {
        // who the hay hay uses spaces?????
        const mainSkill = this.context.skills['main skill'];
        if (!mainSkill || !mainSkill.user_defined) {
            return undefined;
        }

        return mainSkill.user_defined[name];
    }

    setUserSkill(name, value) {
        const mainSkill = this.context.skills['main skill'];
        mainSkill.user_defined[name] = value;
    }
}

module.exports = WatsonResponse;

/**
 * @typedef {Object} WatsonResponseGeneric
 *
 * @property {string} response_type
 * @property {string} text
 */

/**
 * @typedef {Object} WatsonResponseIntent
 *
 * @property {string} intent
 * @property {number} confidence
 */

/**
 * @property {Object} WatsonResponseEntity
 *
 */
