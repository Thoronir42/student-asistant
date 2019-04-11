"use strict";

class WatsonController {

    constructor(/**Assistant*/ assistant) {
        /** @type {Assistant} */
        this.assistantService = assistant;
    }

    async processMessage(request, response) {
        try {
            const data = await this.assistantService.processMessage(request);
            response.json(data);
        } catch (err) {
            console.error(err);
            response.status(err.code || 500).send(err);
        }
    }

    async createSession(request, response) {
        try {
            const data = await this.assistantService.createSession(request);
            response.send(data);
        } catch (err) {
            response.status(err.code || 500).send(err);
        }
    }
}

module.exports = WatsonController;
