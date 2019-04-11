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
     * @return {Promise<StudentInfo>}
     */
    getStudentInfo(stagUser, osCislo) {
        console.log("StudentService.getStudentInfo()");

        const params = {
            stagUser,
            osCislo,
        };

        return this.adapter.fetch(this.serviceEndpoint + "/getStudentInfo", params);
    }
}

module.exports = StudentService;
