// The Api module is designed to handle all interactions with the server

var Api = (function () {
    var requestPayload;
    var responsePayload;
    var messageEndpoint = '/api/message';

    var sessionEndpoint = '/api/session';

    var sessionId = null;

    // Publicly accessible methods defined
    return {
        sendRequest: sendRequest,
        getSessionId: getSessionId,

        // The request/response getters/setters are defined here to prevent internal methods
        // from calling the methods without any of the callbacks that are added elsewhere.
        getRequestPayload: function () {
            return requestPayload;
        },
        setRequestPayload: function (newPayloadStr) {
            requestPayload = JSON.parse(newPayloadStr);
        },
        getResponsePayload: function () {
            return responsePayload;
        },
        setResponsePayload: function (newPayloadStr) {
            responsePayload = JSON.parse(newPayloadStr);
        },
        setErrorPayload: function () {
        }
    };

    /** @return {Promise} */
    function getSessionId() {
        return fetch(sessionEndpoint, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(function (result) {
                return result.json();
            })
            .then(function (data) {
                sessionId = data.session_id;
            });
    }

    // Send a message request to the server
    function sendRequest(text, context) {
        // Build request payload
        var payloadToWatson = {
            session_id: sessionId
        };

        payloadToWatson.input = {
            text: text,
        };

        if (context) {
            payloadToWatson.context = context;
        }

        var params = JSON.stringify(payloadToWatson);

        Api.setRequestPayload(params);

        fetch(messageEndpoint, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: params,
        })
            .then(function (response) {
                if(response.status === 500) {
                    throw new Error('Fail happened');
                }

                return response.text();
            })
            .then(function (text) {
                Api.setResponsePayload(text);
            })
            .catch(function (err) {
                console.error(err);
                Api.setErrorPayload({
                    'output': {
                        'generic': [
                            {
                                'response_type': 'text',
                                'text': 'An unexpected error happened during your inquiry, please try again later.'
                            }
                        ]
                    }
                });
            });
    }
}());
