import test from 'ava';
import testConfig from '../../testConfig';

import StagAdapter from '../../../src/services/stag/StagAdapter';
import SchedulesService from '../../../src/services/stag/SchedulesService';
import Timetables from '../../../src/services/university/Timetables';

function createInstance() {
    const stagAdapter = new StagAdapter(testConfig.stagBaseUrl);
    const schedulesService = new SchedulesService(stagAdapter);

    return new Timetables(schedulesService);
}

test('fethces timetable of a day', async (t) => {
    const timetables = createInstance();

    const value = await timetables.getTimetableForDate('A12N3456P', new Date('2012-12-21'));

    t.true(Array.isArray(value.scheduleEntries), "result.scheduleEntries is array");
    t.is(value.scheduleEntries.length, 8, 'Mocked value contains 8 items');
});
