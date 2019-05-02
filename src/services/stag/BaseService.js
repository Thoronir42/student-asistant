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
     * @return {queryParam}
     * @protected
     */
    static queryRepresentation(data) {
        if (data instanceof Date) {
            return this.formatDateForStag(data);
        }
        return data;
    }

    /**
     * Method attach all fields from
     * @param {...Object} objects
     */
    mergeParams(...objects) {
        const result = {};

        objects.forEach((params) => {
            if (!params) {
                return;
            }

            Object.entries(params).forEach(
                ([key, value]) => result[key] = BaseService.queryRepresentation(value));
        });

        return result;
    }
}

module.exports = BaseService;
