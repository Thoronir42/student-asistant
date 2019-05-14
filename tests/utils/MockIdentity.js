const UserIdentity = require('../../src/services/auth/UserIdentity');

class MockIdentity {
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
        ])
    }
}

module.exports = MockIdentity;
