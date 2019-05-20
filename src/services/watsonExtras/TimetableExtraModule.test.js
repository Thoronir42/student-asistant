import test from 'ava';

import TimetableExtraModule from './TimetableExtraModule';
import WatsonResponse from '../watson/model/WatsonResponse';

import TestHelper from '../../../tests/utils/TestHelper';
import DateHelper from '../../utils/DateHelper';

function createInstance() {
    return new TimetableExtraModule({
        getTimetableForDate: (_auth, _studentNumber, date) => ({parsedDate: date})
    });
}

function mockResponse(userSkills) {
    const response = new WatsonResponse({
        intents: {intent: 'Timetable', confidence: 1}
    });

    response.context.skills['main skill'].user_defined = userSkills;

    return response;
}


test('timetable with no value returns empty', async (t) => {
    const tem = createInstance();
    const context = TestHelper.getContext(new Date('11-12-2019'));

    const result = await tem.getTimetable(TestHelper.mockStudent(), mockResponse({
        timetablePeriod: 'none'
    }), context);

    t.deepEqual(result, undefined);
});

test('\'day\' parses correct date in future', async (t) => {
    const tem = createInstance();
    const context = TestHelper.getContext(new Date('11-12-2019'));

    const days = [
        {name: 'sunday'},
        {name: 'monday'},
        {name: 'tuesday'},
        {name: 'wednesday'},
        {name: 'thursday'},
        {name: 'friday'},
        {name: 'saturday'},
    ];

    for (let i = 0; i < days.length; i++) {
        const result = await tem.getTimetable(TestHelper.mockStudent(), mockResponse({
            timetablePeriod: 'day',
            day: days[i].name,
        }), context);

        t.true(result.parsedDate >= context.now, `Date for '${days[i].name}'(${DateHelper.formatYMD(result.parsedDate)}) is after the ${DateHelper.formatYMD(context.now)}`);
        t.is(i, result.parsedDate.getDay());
    }
});

test('\'date\' parses the given date string', async (t) => {
    const tem = createInstance();
    const context = TestHelper.getContext(new Date('2019-12-11'));

    const result = await tem.getTimetable(TestHelper.mockStudent(), mockResponse({
        timetablePeriod: 'date',
        date: '2012-12-21',
    }), context);

    const expectedDate = new Date();
    expectedDate.setFullYear(2012, 11, 21);
    expectedDate.setHours(1, 0, 0, 0);

    t.deepEqual(result.parsedDate, expectedDate);
});

