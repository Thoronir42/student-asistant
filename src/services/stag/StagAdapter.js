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
     */
    fetch(operation, queryParams) {
        queryParams.outputFormat = "JSON";

        const url = new URL(this.baseUrl + "/" + operation);

        Object.entries(queryParams).forEach((entry) => url.searchParams.append(entry[0], entry[1]));

        fetch(url)
            .then(
                function (response) {
                    if (response.status >= 400) {
                        const errorMessage = 'Problem with API call. Status Code: ' + response.status;
                        console.error(errorMessage);
                        throw new Error(errorMessage);
                    }
                    return response.json();
                }
            )
        ;
    }
}

module.exports = StagAdapter;