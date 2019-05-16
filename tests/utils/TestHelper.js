const UserIdentity = require('../../src/services/auth/UserIdentity');
const RequestContext = require('../../src/controllers/RequestContext');

class TestHelper {
    /** @return {UserIdentity} */
    static mockStudent() {
        return new UserIdentity('invalid-mock-token-lol', [
            {
                userName: 'AS01B2345C',
                role: 'ST',
                roleNazev: 'Student',
                fakulta: 'FST',
                katedra: null,
                ucitIdno: null,
                aktivni: 'A',
                hasAnyRozvrharRole: false,

            }
        ]);
    }

    /**
     *
     * @param {Date} now
     *
     * @returns {RequestContext}
     */
    static getContext(now) {
        const context = new RequestContext();
        context.now = now;

        return context;
    }
}

module.exports = TestHelper;
