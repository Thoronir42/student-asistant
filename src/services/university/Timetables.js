"use strict";

const DateHelper = require('../../utils/DateHelper');
const sprintf = require('sprintf-js').sprintf;

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
     * @param {string} studentNumber
     * @param {Date} date
     *
     * @return {Promise<{scheduleEntries: CourseResult[]}>}
     */
    async getTimetableForDate(authorization, studentNumber, date) {
        const scheduleByStudent = await this.schedulesService.getScheduleByStudent(authorization, studentNumber, {
            datumOd: date,
            datumDo: date
        });

        return {
            scheduleEntries: scheduleByStudent.rozvrhovaAkce,
        };
    }

    /**
     *
     * @param {StagAuthorization} authorization
     * @param {string} studentNumber
     * @param {Date} now
     * @param [options]
     * @param [options.targetCount=2]
     * @param [options.searchDuration=6]
     *
     * @return {Promise<CourseEvent[]>}
     */
    async getNextCourses(authorization, studentNumber, now, options = {}) {
        if (!options.targetCount) options.targetCount = 2;
        if (!options.searchDuration) options.searchDuration = 6;

        const from = now;
        const to = new Date(from.getTime());

        to.setDate(from.getDate() + options.searchDuration);

        let timetables = await this.schedulesService.getScheduleByStudent(authorization, studentNumber, {
            datumOd: from,
            datumDo: to,
        });

        const entries = Timetables.splitCourseEntries(now, timetables.rozvrhovaAkce);

        return Timetables.mergeCourseEntries(entries, options.targetCount);
    }
}

/**
 *
 * @param {Date} now
 * @param {CourseEvent[]} entries
 *
 * @returns {{past: CourseEvent[], ongoing: CourseEvent[], upcoming: CourseEvent[]}}
 */
Timetables.splitCourseEntries = function (now, entries) {
    const result = {
        past: [],
        ongoing: [],
        upcoming: [],
    };

    const currentDay = DateHelper.formatYMD(now);
    const currentHour = DateHelper.formatHI(now);

    // console.log(currentDay + " " + currentHour);

    entries.forEach((entry) => {
        const from = entry.hodinaSkutOd.value;
        const to = entry.hodinaSkutDo.value;
        const date = DateHelper.formatYMD(DateHelper.parseStag(entry.datum.value));

        // console.log(sprintf("%s %s-%s (%s)", date, from, to, entry.katedra + "/" + entry.predmet));

        if (date < currentDay || (date === currentDay && to < currentHour)) {
            result.past.push(entry);
            return;
        }

        // todo: check same day
        if (date > currentDay || (date === currentDay && from > currentHour)) {
            result.upcoming.push(entry);
            return;
        }

        result.ongoing.push(entry);
        return;

        console.warn("Unknown state: " + entry.hodinaSkutOd.value + ", " + entry.hodinaSkutDo.value + " ? " + currentHour);
    });

    return result;
};

/**
 *
 * @template T
 * @param {{past: T[], ongoing: T[], upcoming: T[]}} entries
 * @param {number} minCount
 *
 * @returns {T[]}
 */
Timetables.mergeCourseEntries = function (entries, minCount) {
    const result = [];

    entries.ongoing.forEach((e) => result.push(e));

    if (result.length < minCount) {
        let iUpcoming = 0;
        while (result.length < minCount && iUpcoming < entries.upcoming.length) {
            result.push(entries.upcoming[iUpcoming++]);
        }
    }

    return result;
};

module.exports = Timetables;
