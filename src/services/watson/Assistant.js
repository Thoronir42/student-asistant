const AssistantV2 = require('watson-developer-cloud/assistant/v2'); // watson sdk

const AsyncUtils = require('../../utils/AsyncUtils');

const WatsonRequestContext = require('./model/ContextHelper');
const WatsonResponse = require('./model/WatsonResponse');

class Assistant {

    constructor(assistantId) {
        this.assistantId = assistantId;

        if (!assistantId) {
            throw new Error("Missing assistant ID!");
        }

        this.client = new AssistantV2({
            version: '2019-02-28',
        });
    }

    /**
     *
     * @param {string} session_id
     * @param {MessageInput} input
     * @param {Object|WatsonRequestContext} [context]
     *
     * @return {Promise<WatsonResponse>}
     */
    async processMessage(session_id, input, context) {
        const payload = this.preparePayloadForWatson(session_id, input, context);

        const promise = AsyncUtils.PromiseCallback();

        // Send the input to the assistant service
        this.client.message(payload, promise.callback);

        return promise
            .then((response) => new WatsonResponse(response.output, response.context));
    }

    async createSession(req) {

        const promise = AsyncUtils.PromiseCallback();

        this.client.createSession({
            assistant_id: this.assistantId,
        }, promise.callback);

        return promise;
    }

    preparePayloadForWatson(session_id, input, context) {

        const contextWithAcc = WatsonRequestContext.validate(context);

        contextWithAcc.global.system.turn_count += 1;

        return {
            assistant_id: this.assistantId,
            session_id: session_id,
            context: contextWithAcc,
            input: {
                message_type: 'text',
                text: input.text || '',
                options: {
                    return_context: true
                }
            }
        };
    }

}

module.exports = Assistant;
