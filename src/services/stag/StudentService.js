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
    getGraduatedCoursesByStudent(stagUser) {
        const params = {
            stagUser,
        };

        return this.adapter.fetch(this.serviceEndpoint + "/getStudentPredmetyAbsolvoval", params);
    }
}

module.exports = StudentService;
