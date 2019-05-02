const fetch = require('node-fetch');

/**
 * @typedef {string|object} queryParam
 */

class StagAdapter {

    /**
     * @param {string} baseUrl
     */
    constructor(baseUrl) {
        if (baseUrl.charAt(baseUrl.length - 1) === '/') {
            baseUrl = baseUrl.slice(0, -1);
        }

        /**
         * @type {string}
         * @description Base url for stag calls without trailing slash
         * */
        this.baseUrl = baseUrl;
    }

    /**
     * @param {string} operation
     * @param {Object<string, string|number>} [queryParams]
     *
     * @param {Object} [options]
     * @param {HTTPMethod} [options.method]
     * @param {StagOutputFormat} [options.outputFormat='JSON']
     * @param {StagAuthorization} [options.authorization]
     *
     * @return {Promise} API call result
     */
    async fetch(operation, queryParams, options) {
        if (!options) {
            options = {};
        }
        if (!queryParams) {
            queryParams = {};
        }
        queryParams.outputFormat = options.outputFormat || "JSON";

        const method = options.method || 'GET';

        const url = this.createUrl(operation, queryParams);


        const fetchOptions = {
            method,
            Headers: {}
        };
        if (queryParams.outputFormat === "JSON") {
            fetchOptions.Headers['Accept'] = 'application/json';
        }
        if(options.authorization) {
            fetchOptions.Headers.authorization = options.authorization;
        }

        try {
            return await this.execute(url, fetchOptions);
        } catch (e) {
            const error = new Error(`Failed fetching ${url.toString()}: ${e.message}`);
            error.stack += '\n' + e.stack;

            throw error;
        }

    }

    /**
     *
     * @private
     * @param {string} operation
     * @param {Object<string, string|number>} queryParams
     * @return {URL}
     */
    createUrl(operation, queryParams) {
        const url = new URL(this.baseUrl);

        url.pathname += operation.charAt(0) === "/" ? operation : "/" + operation;

        Object.entries(queryParams).forEach(([key, value]) => url.searchParams.append(key, value));

        return url;
    }

    async execute(url, options) {
        const response = await fetch(url, options);

        if (response.status >= 400) {
            const errorMessage = 'Bad status Code: ' + response.status + ".";
            // todo: parse xml
            const responseMessage = await response.text();
            throw new Error(errorMessage);
        }

        return await response.json();
    }
}

module.exports = StagAdapter;

/**
 * @typedef {'GET'|'POST'|'PUT'|'DELETE'} HTTPMethod
 */

/**
 * @typedef {'JSON'} StagOutputFormat
 */

/**
 * todo: describe stag authorization
 * @typedef {*} StagAuthorization
 */
