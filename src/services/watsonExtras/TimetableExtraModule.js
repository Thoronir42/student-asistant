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

        return methods;
    }

    /**
     *
     * @param {UserIdentity} user
     * @param {WatsonResponse} response
     */
    async getTimetable(user, response) {
        const type = response.removeUserSkill('timetablePeriod');
        if (!type || type === TimetablePeriodType.none) {
            return undefined;
        }

        let date;
        const studentNumber = user.getUserInfo().userName;
        switch (type) {
            case TimetablePeriodType.date:
                date = new Date(response.removeUserSkill('date'));
                return this.timetables.getTimetableForDate(user.getStagAuthorization(), studentNumber, date);

            case TimetablePeriodType.today:
                date = new Date();
                return this.timetables.getTimetableForDate(user.getStagAuthorization(), studentNumber, date);

            case TimetablePeriodType.day:
                date = this.getDateOfNextNamedDay(response.removeUserSkill('day'));
                return this.timetables.getTimetableForDate(user.getStagAuthorization(), studentNumber, date);
        }

        throw new Error(`Unknown timetable type '${type}'`);
    }

    getDateOfNextNamedDay(day) {
        const dayOffset = {
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 5,
            saturday: 6,
            sunday: 0,
        };

        const d = new Date();
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
