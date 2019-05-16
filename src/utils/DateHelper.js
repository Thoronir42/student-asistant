class DateHelper {

}

/**
 *
 * @param {Date} date
 * @return {string}
 */
DateHelper.formatYMD = function (date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate();
};

module.exports = DateHelper;
