"use strict";

class Timetables {
    constructor(/**SchedulesService*/ schedulesService) {
        /**
         * @private
         * @type {SchedulesService}
         */
        this.schedulesService = schedulesService;
    }

    /**
     * @param {StagAuthorization} authorization
     * @param {string} osCislo
     * @param {Date} date
     *
     * @return {Promise<{scheduleEntries: CourseResult[]}>}
     */
    async getTimetableForDate(authorization, osCislo, date) {
        const scheduleByStudent = await this.schedulesService.getScheduleByStudent(authorization, osCislo, {
            datumOd: date,
            datumDo: date
        });

        return {
            scheduleEntries: scheduleByStudent.rozvrhovaAkce,
        };
    }
}

module.exports = Timetables;
