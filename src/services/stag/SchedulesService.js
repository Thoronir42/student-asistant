class SchedulesService {

    /**
     * @param {StagAdapter} stagAdapter
     */
    constructor(stagAdapter) {
        /**
         * @private
         * @type {StagAdapter}
         */
        this.stagAdapter = stagAdapter;
        this.serviceEndpoint = 'rozvrhy';
    }

    /**
     * @param {Date} date
     * @return {string}
     * @private
     */
    static _formatDateForStag(date) {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    }

    // /**
    //  * Vrací všechny akce v rozvrhu studenta v budoucnu.
    //  *
    //  * @param {string} stagUser
    //  * @param {string} osCislo
    //  * @return {Promise<StudentInfo>}
    //  */
    // getScheduleByStudent(stagUser, osCislo) {
    //     console.log("StudentService.getScheduleByStudent()");
    //
    //     const params = {
    //         stagUser,
    //         osCislo,
    //         jenBudouciAkce : true,
    //     };
    //
    //     return this.stagAdapter.fetch(this.serviceEndpoint + "/getRozvrhByStudent", params);
    // }

    /**
     * Vrací všechny akce pro zvolený rosah data
     *
     * @param {string} stagUser
     * @param {string} osCislo
     * @param {Date} startDate
     * @param {Date} endDate
     * @param {Object} [optional]
     * @param {string} [optional.zkratkaPredmetu]
     * // todo: add optional fields
     *
     * @return {Promise<ScheduledCourses>}
     */
    getScheduleByStudent(stagUser, osCislo, startDate, endDate, optional = {}) {
        console.log("StudentService.getScheduleByStudent()");

        const params = {
            stagUser,
            osCislo,
            datumOd: SchedulesService._formatDateForStag(startDate),
            datumDo: SchedulesService._formatDateForStag(endDate),
        };

        // todo: check key functionality
        Object.entries(optional).forEach(([key, value]) => params[key] = value);

        return this.adapter.fetch(this.serviceEndpoint + "/getRozvrhByStudent", params);
    }

}

module.exports = SchedulesService;
