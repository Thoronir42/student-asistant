import test from 'ava';

import TimetableExtraModule from './TimetableExtraModule';
import WatsonResponse from '../watson/model/WatsonResponse';


function createInstance() {
    const timetables = {
        getTimetableForDate: (date) => ({
            parsedDate: date,
            schedule: ['a', 'b']
        }),
    };

    return new TimetableExtraModule(timetables);
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

    const result = await tem.getTimetable(mockResponse({
        timetablePeriod: 'none'
    }));

    t.deepEqual(result, undefined);
});

test('\'day\' parses correct date in future', async (t) => {
    const tem = createInstance();

    const now = new Date();

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
        const result = await tem.getTimetable(mockResponse({
            timetablePeriod: 'day',
            day: days[i].name,
        }));

        t.deepEqual(result.schedule, ['a', 'b']);
        t.true(result.parsedDate >= now, `Date for '${days[i].name}' is in the future`);
        t.is(i, result.parsedDate.getDay());
    }
});

test('\'date\' parses the given date string', async (t) => {
    const tem = createInstance();

    const result = await tem.getTimetable(mockResponse({
        timetablePeriod: 'date',
        date: '2012-12-21',
    }));

    const expectedDate = new Date();
    expectedDate.setFullYear(2012, 11, 21);
    expectedDate.setHours(1, 0, 0, 0);

    t.deepEqual(result, {
        parsedDate: expectedDate,
        schedule: ['a', 'b']
    });
});