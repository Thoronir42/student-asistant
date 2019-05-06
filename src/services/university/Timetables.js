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
     * @return {Promise<{scheduleEntries: CourseResult[]}>}
     */
    async getTimetableForDate(osCislo, date) {
        const scheduleByStudent = await this.schedulesService.getScheduleByStudent(osCislo, {
            datumOd: date,
            datumDo: date
        });

        return {
            scheduleEntries: scheduleByStudent.rozvrhovaAkce,
        };
    }
}

module.exports = Timetables;
