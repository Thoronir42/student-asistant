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
     * @param {StagFetchOptions} [options]
     *
     * @return {Promise} API call result
     */
    async fetch(operation, queryParams, options) {
        if (!options) {
            options = {};
        }
        if (!options.outputFormat) options.outputFormat = "JSON";

        if (!queryParams) {
            queryParams = {};
        }
        queryParams.outputFormat = options.outputFormat;
        if (queryParams.outputFormat === 'TEXT') {
            queryParams.outputFormat = 'JSON';
        }


        const method = options.method || 'GET';

        const url = this.createUrl(operation, queryParams);


        const fetchOptions = {
            method,
            headers: {}
        };
        if (options.outputFormat === "JSON") {
            fetchOptions.headers['Accept'] = 'application/json';
        }
        if (!options.timeout) {
            options.timeout = 5000;
        }
        if (options.authorization) {
            if (typeof options.authorization !== "object") {
                throw new Error("Authorization must be an object");
            }

            fetchOptions.headers.Authorization = this.formatAuthorization(options.authorization);
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

    /**
     * @private
     * @param {string|URL} url
     * @param {fetch.options} options
     * @return {Promise<*>}
     */
    async execute(url, options) {
        const response = await fetch(url, options);

        if (response.status >= 400) {
            const errorMessage = 'Bad status Code: ' + response.status + ".";
            // todo: parse xml
            const responseMessage = await response.text();
            throw new Error(errorMessage);
        }


        let acceptType = options.headers['Accept'];
        let responseType = response.headers.get('Content-Type');

        if (acceptType === 'application/json') {
            if (responseType !== acceptType) {
                console.warn("Response body: " + await response.text());
                throw new Error(`Invalid response type, expected ${acceptType}, got ${responseType}`);
            }

            return await response.json();
        }

        return await response.text();
    }

    /**
     *
     * @param {StagAuthorization} authorization
     * @return {string}
     */
    formatAuthorization(authorization) {
        const buffer = Buffer.from(authorization.name + ":" + authorization.password);

        return "Basic " + buffer.toString('base64');
    }
}

module.exports = StagAdapter;

/**
 * @typedef {'GET'|'POST'|'PUT'|'DELETE'} HTTPMethod
 */

/**
 * @typedef {'JSON'|'XML'|'TEXT'} StagOutputFormat
 */

/**
 * @typedef {Object} StagFetchOptions
 * @property {HTTPMethod} [method]
 * @property {StagOutputFormat} [outputFormat]
 * @property {StagAuthorization} [authorization]
 */

/**
 * @typedef {Object} StagAuthorization
 * @property {string} name
 * @property {string} password
 *
 * @description A HTTP Basic authorization in format of `Basic B64-code`
 * where B64-code is a base64 encoded string of either:
 *   - 'login:password'
 *   - 'userTicker:'
 *
 */
