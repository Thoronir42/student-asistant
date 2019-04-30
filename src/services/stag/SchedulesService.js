const BaseService = require('./BaseService');

class SchedulesService extends BaseService{

    /**
     * @param {StagAdapter} stagAdapter
     */
    constructor(stagAdapter) {
        super(stagAdapter);
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
     * @param {string}  osCislo
     * @param {Object}  [optional]
     * @param {string}  [optional.zkratkaPredmetu]
     * @param {Date}    [optional.datumOd]
     * @param {Date}    [optional.datumDo]
     *
     * @return {Promise<ScheduledCourses>}
     */
    getScheduleByStudent(osCislo, optional = {}) {
        console.log("StudentService.getScheduleByStudent()");

        const params = {
            osCislo
        };

        this.mergeOptional(params, optional);

        return this.stagAdapter.fetch(this.serviceEndpoint + "/getRozvrhByStudent", params);
    }

}

module.exports = SchedulesService;
