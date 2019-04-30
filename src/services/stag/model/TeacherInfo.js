const PersonInfo = require("PersonInfo");

class TeacherInfo extends PersonInfo{

    /** @type {number} */
    ucitIdno;

    /** @type {string} */
    platnost;

    /** @type {string} */
    zamestnanec;

    /** @type {string} */
    katedra;

    /** @type {string} */
    pracovisteDalsi;

    /** @type {string} */
    telefon;

    /** @type {string} */
    telefon2;

    /** @type {string} */
    url;
}

module.exports = TeacherInfo;