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

    /**
     * @param {string} stagUser
     * @return {Promise<GraduatedCourses>}
     */
    getStudentPredmetyAbsolvoval(stagUser) {
        console.log("StudentService.getStudentPredmetyAbsolvoval()");

        const params = {
            stagUser,
        };

        return this.adapter.fetch(this.serviceEndpoint + "/getStudentPredmetyAbsolvoval", params);
    }
}

module.exports = StudentService;
