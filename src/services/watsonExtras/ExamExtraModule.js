"use strict";

const WatsonExtraModule = require('../watson/WatsonExtraModule');

class ExamExtraModule extends WatsonExtraModule {
    constructor(/**Exams*/ exams) {
        super();

        /** @type {Exams} */
        this.exams = exams;

    }

    /**
     * @returns {Object<string, ExtraDataFunction>}
     */
    getMethods() {
        const methods = {};

        methods['departmentExams'] = this.getExamsByDepartment.bind(this);
        methods['registeredExams'] = this.getRegisteredExams.bind(this);

        return methods;
    }

    /**
     * @param {UserIdentity} user
     * @param {WatsonResponse} response
     */
    async getExamsByDepartment(user, response) {
        const department = response.getUserSkill('dep_abbr');
        return this.exams.getExamsByDepartment(user.getStagAuthorization(), department);
    }


    /**
     * @param {UserIdentity} user
     * @param {WatsonResponse} response
     */
    async getRegisteredExams(user, response) {
        const studentNumber = user.getUserInfo().userName;
        return this.exams.getRegisteredExams(user.getStagAuthorization(), studentNumber);
    }
}

module.exports = ExamExtraModule;
