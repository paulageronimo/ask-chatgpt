const Alexa = require('ask-sdk-core');
const axios = require('axios');

const SearchIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'SearchIntent';
    },
    async handle(handlerInput) {
        const query = handlerInput.requestEnvelope.request.intent.slots.query.value;
        const apiEndpoint = 'https://api.chatgpt.com/v1/search?q=' + encodeURIComponent(query);

        try {
            const response = await axios.get(apiEndpoint);
            const result = response.data.result;

            return handlerInput.responseBuilder
                .speak(result)
                .getResponse();
        } catch (error) {
            console.error(error);
            return handlerInput.responseBuilder
                .speak('Sorry, I was unable to complete your request.')
                .getResponse();
        }
    },
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(SearchIntentHandler)
    .lambda();
