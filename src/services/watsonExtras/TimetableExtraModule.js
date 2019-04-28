"use strict";

const WatsonExtraModule = require('../watson/WatsonExtraModule');

const Intent = require('../watson/Intent');

class TimetableExtraModule extends WatsonExtraModule {
    constructor(/**Timetables*/ timetables) {
        super();

        /** @type {Timetables} */
        this.timetables = timetables;

    }

    getIntentMethods() {
        const methods = {};

        methods[Intent.TIMETABLE] = this.getTimetable.bind(this);

        return methods;
    }

    /**
     *
     * @param {WatsonResponse} response
     */
    async getTimetable(response) {
        const type = response.getUserSkill('timetablePeriod');
        if (!type || type === TimetablePeriodType.none) {
            return undefined;
        }

        switch (type) {
            case TimetablePeriodType.date:
                const date = new Date(response.getUserSkill('date'));
                return this.timetables.getTimetableForDate(date);

            case TimetablePeriodType.day:
                const day = this.getDateOfNextNamedDay(response.getUserSkill('day'));
                return this.timetables.getTimetableForDate(day);
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
    day: "day",
    none: "none",
};

module.exports = TimetableExtraModule;
