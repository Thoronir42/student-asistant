const sprintf = require('sprintf-js').sprintf;

class DateHelper {

}

/**
 *
 * @param {Date} date
 * @param {string} [separator]
 *
 * @return {string}
 */
DateHelper.formatYMD = function (date, separator = '-') {
    return date.getFullYear() + separator + (date.getMonth() + 1) + separator + date.getDate();
};

/**
 *
 * @param {string} date - date in format month.day.year
 *
 * @return {Date}
 */
DateHelper.parseStag = function (date) {
    const result = new Date(0);

    const parts = date.split('.');
    result.setFullYear(Number.parseInt(parts[2]), Number.parseInt(parts[1]) - 1, Number.parseInt(parts[0]));

    return result;
};

/**
 *
 * @param {Date} date
 * @return {string}
 */
DateHelper.formatHI = function (date) {
    return sprintf("%02f:%02f", date.getHours(), date.getMinutes());
};

module.exports = DateHelper;
