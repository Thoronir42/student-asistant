const AssistantV2 = require('watson-developer-cloud/assistant/v2'); // watson sdk

const AsyncUtils = require('../utils/AsyncUtils');

class Assistant {

    constructor(assistantId) {
        this.assistantId = assistantId;

        if (!assistantId) {
            throw new Error("Missing assistant ID!");
        }

        this.assistant = new AssistantV2({
            version: '2019-02-28'
        });

        this.newContext = {
            global: {
                system: {
                    turn_count: 1
                }
            }
        };
    }

    async processMessage(req) {

        const contextWithAcc = (req.body.context) ? req.body.context : this.newContext;

        if (req.body.context) {
            contextWithAcc.global.system.turn_count += 1;
        }

        let textIn = '';

        if (req.body.input) {
            textIn = req.body.input.text;
        }

        let payload = {
            assistant_id: this.assistantId,
            session_id: req.body.session_id,
            context: contextWithAcc,
            input: {
                message_type: 'text',
                text: textIn,
                options: {
                    return_context: true
                }
            }
        };

        const promise = AsyncUtils.PromiseCallback();

        // Send the input to the assistant service
        this.assistant.message(payload, promise.callback);

        return promise;
    }

    async createSession(req) {

        const promise = AsyncUtils.PromiseCallback();

        this.assistant.createSession({
            assistant_id: this.assistantId,
        }, promise.callback);

        return promise;
    }

}

module.exports = Assistant;
