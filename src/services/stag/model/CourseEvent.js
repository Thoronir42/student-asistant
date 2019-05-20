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

    /** @type {StagDatum} */
    datum;

    /** @type {SkutHodina}*/
    hodinaSkutOd;

    /** @type {SkutHodina}*/
    hodinaSkutDo;

}

module.exports = CourseEvent;
