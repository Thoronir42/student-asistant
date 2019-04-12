"use strict";

class ContextHelper {
    constructor() {
        throw new Error("ContextHelper can not be instantiated");
    }

    /**
     *
     * @return {MessageContext}
     */
    static newContext() {
        return {
            global: {
                system: {
                    turn_count: 0,
                },
            },
        };
    }

    /**
     *
     * @param {MessageContext|Object|undefined} context
     * @return {MessageContext}
     */
    static validate(context) {
        if (!context) {
            return ContextHelper.newContext();
        }

        const result = {};
        result.global = context.global = context.global || {};
        result.global.system = context.global.system = context.global.system || {};
        result.global.system.turn_count = context.global.turn_count || 0;

        return context;
    }
}

module.exports = ContextHelper;

/**
 * @typedef {Object} ContextHelper.global
 *
 * @property {Object} system
 * @property {number} system.turnCount
 */
