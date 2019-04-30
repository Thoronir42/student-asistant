const fetch = require('node-fetch');

class StagAdapter {

    /**
     * @param {string} baseUrl
     */
    constructor(baseUrl) {
        /** @type {string} */
        this.baseUrl = baseUrl;
    }

    /**
     * @param {string} operation
     * @param {Object<string, string|number>} queryParams
     * @return {Promise} API call result
     */
    async fetch(operation, queryParams) {
        queryParams.outputFormat = "JSON";

        const url = new URL(this.baseUrl + "/" + operation);

        Object.entries(queryParams).forEach((entry) => url.searchParams.append(entry[0], entry[1]));

        try {
            const response = await fetch(url);

            if (response.status >= 400) {
                const errorMessage = 'Bad status Code: ' + response.status + ".";
                throw new Error(errorMessage);
            }
            return response.json();
        } catch (e) {
            throw new Error(`Failed fetching ${url.toString()}: ` + e.message);
        }
    }
}

module.exports = StagAdapter;
