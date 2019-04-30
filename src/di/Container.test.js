import test from 'ava';

import Container from './Container';
import DIExpression from './DIExpression';

test('resolves pre-instantiated service', (t) => {
    const c = new Container({
        ringBearer: {
            instance: new Hobbit('Frodo'),
        },
    });

    const result = c.getService('ringBearer');

    t.deepEqual(result, new Hobbit('Frodo'));
});

test('resolves defined service with dependency', (t) => {
    const c = new Container({
        ring: {
            definition: Ring,
            args: {
                name: 'The One',
                servants: 19
            }
        },
        ringBearer: {
            definition: RingBearer,
            args: {
                character: new Hobbit('Frodo'),
            }
        }
    });

    /** @type {RingBearer} */
    const bearer = c.getService('ringBearer');

    t.deepEqual(bearer, new RingBearer(new Ring('The One', 19), new Hobbit('Frodo')));
});

test('throws error on undefined dependency', (t) => {
    const c = new Container({
        ringBearer: {
            definition: RingBearer,
            args: {
                character: 'Aragorn',
            },
        },
        ring: {
            definition: Ring,
        }
    });

    t.throws(() => c.getService('ringBearer'), /stack:ringBearer->ring/);
});

test('evaulates DIExpression', (t) => {
    const c = new Container({
        env: {
            definition: Environment,
            args: {
                props: DIExpression.arrayOf([Rock, Rock, Tree, Rock, Tower, Tower]),
            },
        },
    });

    let expected = new Environment([
        new Rock(), new Rock(), new Tree(), new Rock(), new Tower(), new Tower(),
    ]);
    t.deepEqual(c.getService('env'), expected);
});

class Hobbit {
    constructor(name) {
        this.name = name;
        this.race = 'hobbit';
    }
}

class Ring {
    constructor(name, servants) {
        this.name = name;
        this.servants = servants;
    }
}

class RingBearer {
    constructor(/**Ring*/ring, character) {
        this.ring = ring;
        this.character = character;
    }
}

class Environment {
    constructor(props) {
        this.props = props;
    }
}

class Rock {
    constructor() {}
}

class Tree {
    constructor() {}
}

class Tower {
    constructor() {}
}
