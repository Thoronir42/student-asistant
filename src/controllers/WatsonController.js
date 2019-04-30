"use strict";

class WatsonController {

    constructor(/**Assistant*/ assistant, /**AssistantExtra*/ assistantExtra) {
        /** @type {Assistant} */
        this.assistantService = assistant;
        /** @type {AssistantExtra} */
        this.assistantExtra = assistantExtra;
    }

    async processMessage(request, response) {
        try {
            const {session_id, input, context} = request.body;
            const data = await this.assistantService.processMessage(session_id, input, context);

            const extraDataClass = data.getUserSkill('extraData');
            if (extraDataClass && extraDataClass !== "none") {
                data.asistudent = await this.assistantExtra.getExtraData(extraDataClass, data);

                data.setUserSkill('extraData', 'none');
                data.setUserSkill('timetablePeriod', 'none');
            }

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
