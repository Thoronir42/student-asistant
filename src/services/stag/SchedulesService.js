class SchedulesService {

    /**
     * @param {StagAdapter} adapter
     */
    constructor(adapter) {
        this.adapter = adapter;
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
    //     return this.adapter.fetch(this.serviceEndpoint + "/getRozvrhByStudent", params);
    // }

    /**
     * Vrací všechny akce pro zvolený rosah data
     *
     * @param {string} stagUser
     * @param {string} osCislo
     * @param {Date} startDate
     * @param {Date} endDate
     * @return {Promise<ScheduledCourses>}
     */
    getScheduleByStudent(stagUser, osCislo, startDate, endDate) {
        console.log("StudentService.getScheduleByStudent()");

        const params = {
            stagUser,
            osCislo,
            datumOd: SchedulesService._formatDateForStag(startDate),
            datumDo: SchedulesService._formatDateForStag(endDate),
        };

        return this.adapter.fetch(this.serviceEndpoint + "/getRozvrhByStudent", params);
    }

}

module.exports = SchedulesService;
