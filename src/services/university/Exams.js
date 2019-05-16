"use strict";

class Exams {
    constructor(/**ExamService*/ examService) {
        /**
         * @private
         * @type {ExamService}
         */
        this.examService = examService;
    }

    /**
     * @param {StagAuthorization} authorization
     * @param {string} osCislo
     *
     * @return {Promise<{examEvents: ExamEvent[]}>}
     */
    async getRegisteredExams(authorization, osCislo) {
        const examsForStudent = await this.examService.getExamEventsByStudent(authorization, osCislo);

        return {
            examEvents: examsForStudent.termin.filter((item)=>{return item.zapsan;}),
        };
    }

    /**
     * @param {StagAuthorization} authorization
     * @param {string} osCislo
     *
     * @return {Promise<{examEvents: ExamEvent[]}>}
     */
    async getMyCourseExams(authorization, osCislo) {
        const examsForStudent = await this.examService.getExamEventsByStudent(authorization, osCislo);

        return {
            examEvents: examsForStudent.termin,
        };
    }

    /**
     * @param {StagAuthorization} authorization
     * @param {string} [department]
     *
     * @return {Promise<{examEvents: ExamEvent[]}>}
     */
    async getExamsByDepartment(authorization, department) {
        const examsByDepartment = await this.examService.getExamEvents(authorization, {katedra: department});

        return {
            examEvents: examsByDepartment.termin,
        };
    }
}

module.exports = Exams;
