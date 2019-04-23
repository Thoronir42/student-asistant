"use strict";

class Timetables {
    constructor() {
        // todo: grab stag adapter here
    }

    /**
     * todo: Fetch timetable entries properly
     * @return {Promise<{timeFrom: string, code: string, timeTo: string}[]>}
     */
    async getTimetableForDay() {
        return [
            {
                timeFrom: "8:25",
                timeTo: "9:10",
                code: "ABC/PRO",
            },
            {
                timeFrom: "8:25",
                timeTo: "9:10",
                code: "ABC/PRO",
            },
            {
                timeFrom: "8:25",
                timeTo: "9:10",
                code: "ABC/PRO",
            },
        ];
    }
}

module.exports = Timetables;