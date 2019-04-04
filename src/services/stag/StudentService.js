/**
 * @typedef (object) StudentService
 */
class StudentService {

    /**
     * @param adapter (StagAdapter)
     */
    constructor(adapter) {
        this.adapter = adapter;
        this.serviceEndpoint = 'student';
        this.studentInfoMethod = 'getStudentInfo';
    }

    /**
     * @param {string} stagUser
     * @param {string} osCislo
     */
    getStudentInfo(stagUser, osCislo) {
        console.log("StudentService.getStudentInfo()");

        let params = new Map([
            ["stagUser", stagUser],
            ["osCislo", osCislo]
        ]);

        this.adapter.fetch(this.serviceEndpoint + "/" + this.studentInfoMethod, params);
    }
}

module.exports = StudentService;