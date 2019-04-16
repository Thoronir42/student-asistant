const CourseBase = require('./CourseBase');

class CourseEvent extends CourseBase {

    /**
     * @type {string}
     */
    rok;

    /**
     * @type {string}
     */
    budova;

    /**
     * @type {string}
     */
    mistnost;

    /**
     * @type {string}
     */
    typAkce;

    /**
     * @type {string}
     */
    semestr;


    /**
     * @type {number}
     */
    hodinaOd;

    /**
     * @type {number}
     */
    hodinaDo;

}

module.exports = CourseEvent;