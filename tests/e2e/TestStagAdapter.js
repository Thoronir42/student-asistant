const env = require('dotenv');
const StagAdapter = require('../../src/services/stag/StagAdapter');

env.config();

class TestStagAdapter {

}

TestStagAdapter.create = function () {
    return new StagAdapter('https://stag-demo.zcu.cz/ws/services/rest2/');
};

module.exports = TestStagAdapter;
