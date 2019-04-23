"use strict";

const Intents = require('../services/watson/Intent');

class WatsonController {

    constructor(/**Assistant*/ assistant, /**Timetables*/ timetables) {
        /** @type {Assistant} */
        this.assistantService = assistant;
        this.timetables = timetables;
    }

    async processMessage(request, response) {
        try {
            const {session_id, input, context} = request.body;
            const data = await this.assistantService.processMessage(session_id, input, context);

            if (data.hasIntent()) {
                data.asistudent = await this.getExtraByResponse(data);
                console.info(data.asistudent);
            }

            response.json(data);
        } catch (err) {
            console.error(err);
            response.status(err.code || 500).send(err);
        }
    }

    /**
     * @param {WatsonResponse} response
     * @return {Promise}
     */
    async getExtraByResponse(response) {
        const intent = response.getMaxConfidentIntent();
        console.log(intent);
        if (!intent) {
            return undefined;
        }

        switch (intent.intent) {
            case Intents.TIMETABLE:
                return await this.timetables.getTimetableForDay();
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
