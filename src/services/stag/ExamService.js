const BaseService = require('./BaseService');

class ExamService extends BaseService{

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
    getExamEvents(filterBy = {}, optional = {}){
        console.log("ExamService.getExamEvents()");

        const params = {};
        this.mergeOptional(params, filterBy);
        this.mergeOptional(params, optional);

        return this.stagAdapter.fetch(this.serviceEndpoint + "/getTerminyZkousek", params);
    }

    /**
     * Metoda vrací seznam zkouškových termínů pro studenta s informací o možnosti přihlášení.
     * @param {StagAuthorization} authorization  TODO definice objektu, který nese auth
     * @param {string} osCislo
     * @return {Promise<ExamEvents>}
     */
    getExamEventsByStudent(authorization, osCislo) {
        console.log("ExamService.getExamEventsByStudent()");

        const params = {
            osCislo
        };

        return this.stagAdapter.fetch(this.serviceEndpoint + "/getTerminyProStudenta", params, {authorization});
    }

    /**
     * Metoda provede přihlášení studenta na zvolený termín zkoušky
     *
     * @param {Object} authorization TODO definice objektu, který nese auth
     * @param {string} osCislo
     * @param {number} termIdno
     * @return {Promise<ExamEvents>}
     */
    enrollExamEvent(authorization, osCislo, termIdno){
        console.log("ExamService.enrollExam()");

        const params = {
            osCislo,
            termIdno
        };

        // TODO vyřešit že nevrací JSON je to problém?
        return this.stagAdapter.fetch(this.serviceEndpoint + "/zapisStudentaNaTermin", params, {authorization});
    }

    /**
     * Metoda provede odhlášení studenta z daného termínu.
     * (Jde o idempotentní operaci... i když nejsem přihlášený odhlášení skončí OK 200)
     *
     * @param {Object} authorization TODO definice objektu, který nese auth
     * @param {string} osCislo
     * @param {number} termIdno
     * @return {Promise<ExamEvents>}
     */
    leaveExamEvent(authorization, osCislo, termIdno){
        console.log("ExamService.enrollExam()");

        const params = {
            osCislo,
            termIdno
        };

        // TODO vyřešit že nevrací JSON je to problém?
        return this.stagAdapter.fetch(this.serviceEndpoint + "/odhlasStudentaZTerminu", params, authorization);
    }

}

module.exports = ExamService;
