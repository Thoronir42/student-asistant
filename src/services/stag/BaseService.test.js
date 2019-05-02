import test from 'ava';

import BaseService from './BaseService';

test('merges parameters', (t) => {
    const bs = new BaseService(undefined);

    const result = bs.mergeParams({
        courage: 'Force of Courage',
        wisdom: 'Force of Wisdom'
    }, {power: 'Force of Power'});

    t.deepEqual(result, {
        courage: 'Force of Courage',
        wisdom: 'Force of Wisdom',
        power: 'Force of Power',
    });
});

test('handles undefined', (t) => {
    const bs = new BaseService(undefined);

    const a = {a: 1};

    t.deepEqual(bs.mergeParams(a, undefined), a);
    t.deepEqual(bs.mergeParams(undefined, a), a);
});

