"use strict";

const Configurator = require('./di/Configurator');
const DIExpression = require('./di/DIExpression');

// system
const Authenticator = require("./services/auth/Authenticator");

// watson
const Assistant = require("./services/watson/Assistant");

// stag
const StagAdapter = require("./services/stag/StagAdapter");
const SchedulesService = require('./services/stag/SchedulesService');
const ExamService = require("./services/stag/ExamService");

// business
const Timetables = require("./services/university/Timetables");
const AssistantExtra = require("./services/watson/AssistantExtra");
const TimetableExtraModule = require("./services/watsonExtras/TimetableExtraModule");

/** @return {Configurator} */
exports.getConfigurator = (parameters) => {
    return createConfigurator(parameters);
};


const createConfigurator = (parameters) => {
    const config = new Configurator(parameters);

    config.addDefinition("authenticator", Authenticator);

    config.addDefinition("assistant", {
        definition: Assistant,
        args: {assistantId: process.env.ASSISTANT_ID}
    });

    config.addDefinition('stagAdapter', {
        definition: StagAdapter,
        args: {baseUrl: parameters.stagBaseUrl}
    });
    config.addDefinition('schedulesService', SchedulesService);
    config.addDefinition("examService", ExamService);

    config.addDefinition('timetables', Timetables);

    config.addDefinition('assistantExtra', {
        definition: AssistantExtra,
        args: {
            modules: DIExpression.arrayOf([
                TimetableExtraModule,
            ])
        }
    });

    const controllers = require('./controllers');
    config.addDefinitions(controllers.list);

    return config;
};
