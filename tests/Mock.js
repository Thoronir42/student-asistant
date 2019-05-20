const Timetables = require('../src/services/university/Timetables');

class Mock {
}

/**
 *
 * @return {SchedulesService}
 */
Mock.schedulesService = () => {
    const service = {
        _data: require('./TimetableExtraModule.testData.json'),
        getScheduleByStudent: () => ({rozvrhovaAkce: service._data}),
    };

    return service;
};

/** @return {Timetables} */
Mock.timetables = () => {
    return new Timetables(Mock.schedulesService());
};

module.exports = Mock;
