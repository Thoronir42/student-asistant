import test from "ava";

import Timetables from "./Timetables";

import TestHelper from "../../../tests/utils/TestHelper";
import Mock from "../../../tests/Mock";

const testScheduleEntries = require('../../../tests/TimetableExtraModule.testData.json');

test('\'nextCourse\' retrieves upcoming courses', async (t) => {
    const tt = new Timetables(Mock.schedulesService());

    let identity = TestHelper.mockStudent();
    const result = await tt.getNextCourses(identity.getStagAuthorization(), identity.getUserInfo().userName, new Date('2019-4-24 09:00'));

    t.deepEqual(result.length, 2);
});

test('splitCourseEntries divides into past, present and future', (t) => {

    const now = new Date('2019-4-24 09:00');

    const result = Timetables.splitCourseEntries(now, testScheduleEntries);

    t.is(result.past.length, 1);
    t.is(result.ongoing.length, 2);
    t.is(result.upcoming.length, 3);
});
