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
     * @return {Promise<{scheduleEntries: CourseResult[]}>}
     */
    async getRegistredExams(authorization, osCislo) {
        const examsForStudent = await this.examService.getExamEventsByStudent(authorization, osCislo);

        return {
            examEvents: examsForStudent.termin,
        };
    }

    /**
     * @param {StagAuthorization} authorization
     * @param {string} [department]
     *
     * @return {Promise<{scheduleEntries: CourseResult[]}>}
     */
    async getExamsByDepartment(authorization, department) {
        const examsByDepartment = await this.examService.getExamEvents(authorization, {katedra: department});

        return {
            examEvents: examsByDepartment.terminy,
        };
    }
}

module.exports = Exams;