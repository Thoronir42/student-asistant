import test from 'ava';

import TestStagAdapter from '../TestStagAdapter';
import SchedulesService from '../../../src/services/stag/SchedulesService';
import Timetables from '../../../src/services/university/Timetables';

function createInstance() {
    const schedulesService = new SchedulesService(TestStagAdapter.create());

    return new Timetables(schedulesService);
}

test('fethces timetable of a day', async (t) => {
    const timetables = createInstance();

    const value = await timetables.getTimetableForDate('A12N3456P', new Date('2012-12-21'));

    t.true(Array.isArray(value.scheduleEntries), "result.scheduleEntries is array");
    t.is(value.scheduleEntries.length, 8, 'Mocked value contains 8 items');
});
