import test from 'ava';

import TestStagAdapter from '../TestStagAdapter';
import TestUserIdentity from '../TestUserIdentity';
import SchedulesService from '../../../src/services/stag/SchedulesService';
import Timetables from '../../../src/services/university/Timetables';

function createInstance() {
    const schedulesService = new SchedulesService(TestStagAdapter.create());

    return new Timetables(schedulesService);
}

test('fetches timetable of a day', async (t) => {
    const identity = await TestUserIdentity.loginStudent();
    const timetables = createInstance();

    let date = new Date('2019-04-24');
    const value = await timetables.getTimetableForDate(identity.getStagAuthorization(), identity.getUserInfo().userName, date);

    t.true(Array.isArray(value.scheduleEntries), "result.scheduleEntries is array");
    t.is(value.scheduleEntries.length, 3, 'Demo value contains 3 items');

});
