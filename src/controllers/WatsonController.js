"use strict";

class WatsonController {

    constructor(/**Assistant*/ assistant, /**AssistantExtra*/ assistantExtra) {
        /** @type {Assistant} */
        this.assistantService = assistant;
        /** @type {AssistantExtra} */
        this.assistantExtra = assistantExtra;
    }

    async processMessage(request, response) {
        let watsonResponse, extraData;

        try {
            const {session_id, input, context} = request.body;
            watsonResponse = await this.assistantService.processMessage(session_id, input, context);
        } catch (e) {
            console.error(e);
            response.status(500).json({
                status: 'error',
                cause: 'watsonCall',
                message: e.message,
            });

            return;
        }

        try {
            const extraDataClass = watsonResponse.getUserSkill('extraData');
            if (extraDataClass && extraDataClass !== "none") {
                extraData = await this.assistantExtra.getExtraData(extraDataClass, request.userIdentity, watsonResponse);

                watsonResponse.setUserSkill('extraData', 'none');
                watsonResponse.setUserSkill('timetablePeriod', 'none');
            }
        } catch (e) {
            console.error(e);
            response.status(500).json({
                status: 'error',
                cause: 'stagCall',
                message: e.message,
            });
            return;
        }

        if (extraData) {
            watsonResponse.asistudent = extraData;
        }

        response.json(watsonResponse);
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
