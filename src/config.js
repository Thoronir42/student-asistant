"use strict";

const Configurator = require('./di/Configurator');
const DIExpression = require('./di/DIExpression');

// system
const Authenticator = require("./services/auth/Authenticator");

// watson
const Assistant = require("./services/watson/Assistant");

// stag
const StagAdapter = require("./services/stag/StagAdapter");
const StagAuthService = require('./services/stag/StagAuthService');
const SchedulesService = require('./services/stag/SchedulesService');
const ExamService = require("./services/stag/ExamService");

// business
const Timetables = require("./services/university/Timetables");
const Exams = require("./services/university/Exams");
const AssistantExtra = require("./services/watson/AssistantExtra");
const TimetableExtraModule = require("./services/watsonExtras/TimetableExtraModule");
const ExamExtraModule = require("./services/watsonExtras/ExamExtraModule");

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
    config.addDefinition('stagAuthService', {
        definition: StagAuthService,
        args: {
            loginUrl: parameters.stagLoginUrl,
        },
    });
    config.addDefinition('schedulesService', SchedulesService);
    config.addDefinition("examService", ExamService);

    config.addDefinition('timetables', Timetables);
    config.addDefinition('exams', Exams);

    config.addDefinition('assistantExtra', {
        definition: AssistantExtra,
        args: {
            modules: DIExpression.arrayOf([
                TimetableExtraModule,
                ExamExtraModule,
            ])
        }
    });

    const controllers = require('./controllers');
    config.addDefinitions(controllers.list);

    return config;
};
