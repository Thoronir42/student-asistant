class ExamEvent {

    /** @type {number} */
    termIdno;

    /** @type {number} */
    ucitIdno;

    /** @type {TeacherInfo} */
    ucitel;

    /** @type {string} */
    predmet;

    /** @type {string} */
    katedra;

    /** @type {string} */
    rok;

    /** @type {string} */
    semestr;

    /** @type {StagDatum} */
    datum;

    /** @type {string} */
    obsazeni;

    /** @type {string} */
    limit;

    /** @type {string} */
    casOd;

    /** @type {string} */
    casDo;

    /** @type {string} */
    budova;

    /** @type {string} */
    mistnost;

    /** @type {string} */
    poznamka;

    /** @type {string} */
    opravny;

    /** @type {StagDatum} */
    deadlineDatumOdhlaseni;

    /** @type {StagDatum} */
    deadlineDatumPrihlaseni;

    /** @type {StagDatum} */
    zacatekPrihlasovani;

    /** @type {string} */
    platnost;

    /** @type {string} */
    typTerminu;

    /** @type {string} */
    osCislo;

    /** @type {boolean} */
    zapsan;

    /** @type {boolean} */
    lzeZapsatOdepsat;

    /** @type {string} */
    kodDuvoduProcNelzeZapsatOdepsat;

    /** @type {string} */
    textDuvoduProcNelzeZapsatOdepsat;

    /** @type {string} */
    popisDuvoduProcNelzeZapsatOdepsat;
}

module.exports = ExamEvent;
