class BaseService {

    /**
     * @param {StagAdapter} stagAdapter
     */
    constructor(stagAdapter) {
        this.stagAdapter = stagAdapter;
    }

    /**
     * @param {Date} date
     * @return {string}
     * @protected
     */
    static formatDateForStag(date) {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    }

    /**
     *  Method prepares data for HTTP query
     *
     *  Date format as - dd.MM.YYYY
     *
     * @param {object} data
     * @return {object}
     * @protected
     */
    static queryRepresentation(data){
        if(data instanceof Date){
            return this.formatDateForStag(data);
        }
        return data;
    }

    /**
     * Method attach all fields from
     * @param {object} params
     * @param {object} optional
     */
    mergeOptional(params, optional){
        Object.entries(optional).forEach(
            ([key, value]) => params[key] = BaseService.queryRepresentation(value));
    }
}

module.exports = BaseService;
