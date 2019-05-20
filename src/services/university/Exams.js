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
            examEvents: examsForStudent.termin.filter((item) => {
                return item.zapsan;
            }),
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
     * @param {string} department
     *
     * @return {Promise<{examEvents: ExamEvent[]}>}
     */
    async getExamsByDepartment(authorization, department) {
        const examsByDepartment = await this.examService.getExamEvents(authorization, {katedra: department});

        return {
            examEvents: examsByDepartment.termin,
        };
    }

    /**
     * @param {StagAuthorization} authorization
     * @param {string} subjectAbbr
     * @param {string} department
     *
     * @return {Promise<{examEvents: ExamEvent[]}>}
     */
    async getExamsByFullSubject(authorization, subjectAbbr, department) {
        const examsByDepartment = await this.examService.getExamEvents(authorization,
            {
                katedra: department,
                zkratka: subjectAbbr
            }, {
                zobrazitProsle: false
            });

        return {
            examEvents: examsByDepartment.termin,
        };
    }

    /**
     * @param {StagAuthorization} authorization
     * @param {string} subjectAbbr
     *
     * @return {Promise<{examEvents: ExamEvent[]}>}
     */
    async getExamsBySubject(authorization, subjectAbbr) {
        const examsByDepartment = await this.examService.getExamEvents(authorization,
            {
                zkratka: subjectAbbr,
            }, {
                zobrazitProsle: false
            });

        return {
            examEvents: examsByDepartment.termin,
        };
    }

    /**
     * @param {StagAuthorization} authorization
     * @param {string} osCislo
     * @param {number} termIdno
     *
     * @return {Promise<{message: string}>}
     */
    async enrollExam(authorization, osCislo, termIdno) {
        const response = await this.examService.enrollExamEvent(authorization, osCislo, termIdno);

        return {
            message: response,
        };
    }

    /**
     * @param {StagAuthorization} authorization
     * @param {string} osCislo
     * @param {number} termIdno
     *
     * @return {Promise<{message:string}>}>}
     */
    async leaveExam(authorization, osCislo, termIdno) {
        const response = await this.examService.leaveExamEvent(authorization, osCislo, termIdno);
        return {
            message: response,
        }
    }
}

module.exports = Exams;
