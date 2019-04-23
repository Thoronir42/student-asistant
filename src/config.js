"use strict";

const Configurator = require('./di/Configurator');

// system
const Authenticator = require("./services/auth/Authenticator");

// watson
const Assistant = require("./services/watson/Assistant");

// stag
const StagAdapter = require("./services/stag/StagAdapter");

// business
const Timetables = require("./services/university/Timetables");

/** @return {Configurator} */
exports.getConfigurator = (parameters) => {
    return createConfigurator(parameters);
};


const createConfigurator = (parameters) => {
    const config = new Configurator(parameters);
    console.log(parameters);

    config.addDefinition("authenticator", Authenticator);

    config.addDefinition("assistant", {
        definition: Assistant,
        args: {assistantId: process.env.ASSISTANT_ID}
    });

    config.addDefinition('stagAdapter', {
        definition: StagAdapter,
        args: {baseUrl: parameters.stagBaseUrl}
    });

    config.addDefinition('timetables', Timetables);

    const controllers = require('./controllers');
    config.addDefinitions(controllers.list);

    return config;
};