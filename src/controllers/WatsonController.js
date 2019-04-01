"use strict";

class WatsonController {

    constructor(/**Assistant*/ assistant) {
        /** @type {Assistant} */
        this.assistantService = assistant;
    }

    processMessage(request, response) {

        this.assistantService.processMessage(request)
            .then((data) => {
                response.json(data);
            })
            .catch((err) => {
                response.status(err.code || 500).json(err);
            });
    }

    async createSession(request, response) {
        try {
            const data = await this.assistantService.createSession(request);
            response.send(data);
        } catch(err) {
            response.status(err.code || 500).send(err);
        }
    }
}

module.exports = WatsonController;
