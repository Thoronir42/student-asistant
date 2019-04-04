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
     * @param {Map} params
     */
    fetch(operation, params) {
        params.set("outputFormat", "JSON");

        var url = new URL(this.baseUrl + "/" + operation);
        params.forEach((value, key) => url.searchParams.append(key, value));

        fetch(url)
            .then(
                function (response) {
                    //TODO better response handling (eg 204 ...)
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log(data);
                        //TODO teturn data instead of log
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }
}

module.exports = StagAdapter;