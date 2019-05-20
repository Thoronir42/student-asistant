"use strict";

const WatsonExtraModule = require('../watson/WatsonExtraModule');

class TimetableExtraModule extends WatsonExtraModule {
    constructor(/**Timetables*/ timetables) {
        super();

        /** @type {Timetables} */
        this.timetables = timetables;

    }

    /**
     * @returns {Object<string, ExtraDataFunction>}
     */
    getMethods() {
        const methods = {};

        methods['schedule'] = this.getTimetable.bind(this);
        methods['nextCourse'] = this.getNextCourses.bind(this);

        return methods;
    }

    /**
     *
     * @param {UserIdentity} user
     * @param {WatsonResponse} response
     * @param {RequestContext} context
     *
     * @returns {{scheduleEntries: CourseEvent[]}}
     */
    async getTimetable(user, response, context) {
        const type = response.removeUserSkill('timetablePeriod');
        if (!type || type === TimetablePeriodType.none) {
            return undefined;
        }

        let date;
        const studentNumber = user.getUserInfo().userName;
        const authorization = user.getStagAuthorization();

        switch (type) {
            case TimetablePeriodType.date:
                date = new Date(response.removeUserSkill('date'));
                return this.timetables.getTimetableForDate(authorization, studentNumber, date);

            case TimetablePeriodType.today:
                date = context.now;
                return this.timetables.getTimetableForDate(authorization, studentNumber, date);

            case TimetablePeriodType.day:
                date = this.getDateOfNextNamedDay(response.removeUserSkill('day'), context.now);
                return this.timetables.getTimetableForDate(authorization, studentNumber, date);
        }

        throw new Error(`Unknown timetable type '${type}'`);
    }

    /**
     *
     * @param {UserIdentity} user
     * @param {WatsonResponse} response
     * @param {RequestContext} context
     *
     * @returns {Promise<{scheduleEntries: CourseEvent[]}>}
     */
    async getNextCourses(user, response, context) {
        let timetables = await this.timetables.getNextCourses(user.getStagAuthorization(), user.getUserInfo().userName, context.now);

        return {scheduleEntries: timetables};
    }

    /**
     *
     * @param {string} day
     * @param {Date} now
     *
     * @returns {Date}
     */
    getDateOfNextNamedDay(day, now) {
        const dayOffset = {
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 5,
            saturday: 6,
            sunday: 0,
        };

        const d = new Date(now.getTime());
        d.setDate(d.getDate() + (dayOffset[day] + 7 - d.getDay()) % 7);

        return d;
    }
}

const TimetablePeriodType = {
    date: "date",
    today: "today",
    day: "day",
    none: "none",
};

module.exports = TimetableExtraModule;
