const BaseService = require('./BaseService');

class ExamService extends BaseService {

    /**
     * @param {StagAdapter} stagAdapter
     */
    constructor(stagAdapter) {
        super(stagAdapter);
        this.serviceEndpoint = 'terminy';
    }

    /**
     * Vrací zkouškové termíny pro přihlášeného studenta
     * Z filterBy bloku je třeba vybrat alespoň jeden prvek pro filtrovani
     *
     * @param {StagAuthorization} authorization
     * @param {Object}  filterBy - musí obsahovat alespoň jednu nastavenou vlastnost
     * @param {string}     [filterBy.zkratka]
     * @param {string}     [filterBy.katedra]
     * @param {string}     [filterBy.rok]
     * @param {string}     [filterBy.osCislo]
     * @param {Object}  [optional]
     * @param {boolean}    [optional.zobrazitProsle]
     * @param {boolean}    [optional.zobrazitZrusene]
     * @param {boolean}    [optional.zobrazitBlokovane]
     *
     * @return {Promise<ExamEvents>}
     */
    getExamEvents(authorization, filterBy = {}, optional = {}) {
        return this.stagAdapter.fetch(this.serviceEndpoint + "/getTerminyZkousek", this.mergeParams(filterBy, optional));
    }

    /**
     * Metoda vrací seznam zkouškových termínů pro studenta s informací o možnosti přihlášení.
     * @param {StagAuthorization} authorization
     * @param {string} osCislo
     * @return {Promise<ExamEvents>}
     */
    getExamEventsByStudent(authorization, osCislo) {
        const params = {
            osCislo
        };

        return this.stagAdapter.fetch(this.serviceEndpoint + "/getTerminyProStudenta", params, {
            authorization
        });
    }

    /**
     * Metoda provede přihlášení studenta na zvolený termín zkoušky
     *
     * @param {StagAuthorization} authorization
     * @param {string} osCislo
     * @param {number} termIdno
     * @return {Promise<string>}
     */
    enrollExamEvent(authorization, osCislo, termIdno) {
        const params = {
            osCislo,
            termIdno
        };

        return this.stagAdapter.fetch(this.serviceEndpoint + "/zapisStudentaNaTermin", params, {
            authorization,
            outputFormat: "TEXT"
        });
    }

    /**
     * Metoda provede odhlášení studenta z daného termínu.
     * (Jde o idempotentní operaci... i když nejsem přihlášený odhlášení skončí OK 200)
     *
     * @param {StagAuthorization} authorization
     * @param {string} osCislo
     * @param {number} termIdno
     * @return {Promise<string>}
     */
    leaveExamEvent(authorization, osCislo, termIdno) {
        const params = {
            osCislo,
            termIdno
        };

        return this.stagAdapter.fetch(this.serviceEndpoint + "/odhlasStudentaZTerminu", params, {
            authorization,
            outputFormat: "TEXT"
        });
    }

}

module.exports = ExamService;
