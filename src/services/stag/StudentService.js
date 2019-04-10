/**
 * @typedef (object) StudentService
 */
class StudentService {

    /**
     * @param {StagAdapter} adapter 
     */
    constructor(adapter) {
        this.adapter = adapter;
        this.serviceEndpoint = 'student';
    }

    /**
     * @param {string} stagUser
     * @param {string} osCislo
     */
    getStudentInfo(stagUser, osCislo) {
        console.log("StudentService.getStudentInfo()");

        const params = {
            stagUser,
            osCislo,
        };

        this.adapter.fetch(this.serviceEndpoint + "/getStudentInfo" , params);
    }
}

module.exports = StudentService;
