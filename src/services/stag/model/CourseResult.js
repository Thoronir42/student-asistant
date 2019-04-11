const CourseBase = require('./CourseBase');

class CourseResult extends CourseBase {

    /**
     * @type {Object|null}
     * @property {string} value
     */
   datum;

    /**
     * @type {string}
     */
    osCislo;

    /**
     * @type {string}
     */
    semestr;

    /**
     * @type {string}
     */
    rok;

    /**
     * @type {string}
     */
    absolvoval;

    /**
     * @type {string}
     */
    znamka;


}

module.exports = CourseResult;