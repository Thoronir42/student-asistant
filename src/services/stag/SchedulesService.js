const BaseService = require('./BaseService');

class SchedulesService extends BaseService {

    /**
     * @param {StagAdapter} stagAdapter
     */
    constructor(stagAdapter) {
        super(stagAdapter);
        this.serviceEndpoint = 'rozvrhy';
    }

    /**
     * Vrací všechny akce pro zvolený rosah data
     *
     * @param {string}  osCislo
     * @param {Object}  [optional]
     * @param {string}  [optional.zkratkaPredmetu]
     * @param {Date}    [optional.datumOd]
     * @param {Date}    [optional.datumDo]
     * @param {boolean} [optional.jenBudouciAkce]
     * @param {StagAuthorization} authorization
     *
     * @return {Promise<ScheduledCourses>}
     */
    getScheduleByStudent(authorization, osCislo, optional = {}) {
        const params = {
            osCislo
        };

        return this.stagAdapter.fetch(this.serviceEndpoint + "/getRozvrhByStudent"
            , this.mergeParams(params, optional)
            , {authorization});
    }

}

module.exports = SchedulesService;
