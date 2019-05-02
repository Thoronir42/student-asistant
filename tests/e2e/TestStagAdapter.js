const env = require('dotenv');
const StagAdapter = require('../../src/services/stag/StagAdapter');

env.config();

class TestStagAdapter {

}

TestStagAdapter.create = function () {
    return new StagAdapter(process.env.STAG_BASE_URL);
};

module.exports = TestStagAdapter;
