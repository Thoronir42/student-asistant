const CourseBase = require('./CourseBase');

class CourseResult extends CourseBase {

    /**
     * @type {StagDatum|null}
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
