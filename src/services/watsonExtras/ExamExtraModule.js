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
        methods['myExams'] = this.getMyCourseExams.bind(this);
        methods['leaveExam'] = this.leaveExam.bind(this);
        methods['enrollExam'] = this.enrollExam.bind(this);

        return methods;
    }

    /**
     * @param {UserIdentity} user
     * @param {WatsonResponse} response
     */
    async getExamsByDepartment(user, response) {
        const department = response.getUserSkill('dep_abbr'); //todo use removeSkill
        return this.exams.getExamsByDepartment(user.getStagAuthorization(), department);
    }


    /**
     * @param {UserIdentity} user
     * @param {WatsonResponse} response
     */
    async getMyCourseExams(user, response) {
        const studentNumber = user.getUserInfo().userName;
        return this.exams.getMyCourseExams(user.getStagAuthorization(), studentNumber);
    }

    /**
     * @param {UserIdentity} user
     * @param {WatsonResponse} response
     */
    async getRegisteredExams(user, response) {
        const studentNumber = user.getUserInfo().userName;
        return this.exams.getRegisteredExams(user.getStagAuthorization(), studentNumber);
    }


    /**
     * @param {UserIdentity} user
     * @param {WatsonResponse} response
     */
    async enrollExam(user, response) {
        const studentNumber = user.getUserInfo().userName;
        const termIdno = response.getUserSkill('termIdno'); //todo use removeSkill
        return this.exams.enrollExam(user.getStagAuthorization(), studentNumber, termIdno);
    }

    /**
     * @param {UserIdentity} user
     * @param {WatsonResponse} response
     */
    async leaveExam(user, response) {
        const studentNumber = user.getUserInfo().userName;
        const termIdno = response.getUserSkill('termIdno'); //todo use removeSkill
        return this.exams.leaveExam(user.getStagAuthorization(), studentNumber, termIdno);
    }
}

module.exports = ExamExtraModule;
