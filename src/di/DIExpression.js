"use strict";

class DIExpression {
    /**
     *
     * @param {DIExpressionType} type
     * @param {*} expression
     */
    constructor(type, expression) {
        this.type = type;
        this.expression = expression;
    }
}

/**
 *
 * @type {Object<DIExpressionType, DIExpressionType>}
 */
DIExpression.Type = {
    'arrayOf': 'arrayOf',
};

/**
 *
 * @param {ServiceDefinition} definitions
 */
DIExpression.arrayOf = function(definitions) {
    return new DIExpression(DIExpression.Type.arrayOf, definitions);
};



module.exports = DIExpression;

/**
 * @typedef {string} DIExpressionType
 */
