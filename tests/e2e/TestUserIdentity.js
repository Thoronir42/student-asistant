const fetch = require('node-fetch');
const FormHelper = require('../utils/FormHelper');

const UserIdentity = require('../../src/services/auth/UserIdentity');


class TestUserIdentity {

}

TestUserIdentity._identityCache = {};

/**
 *
 * @param {string} username
 * @param {string} password
 * @return {Promise<UserIdentity>}
 */
TestUserIdentity.login = async (username, password = "demo") => {
    if (!TestUserIdentity._identityCache[username]) {
        const formData = FormHelper.encodeForUrl({
            username,
            password,
            originalURL: 'test://back.url',
        });

        const resultPromise = fetch('https://stag-demo.zcu.cz/ws/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        })
            .then((result) => result.text())
            .then((html) => findLoginDataIn(html))
            .then((loginData) => {
                let text = Buffer.from(loginData.stagUserInfo, 'base64').toString();
                /** @type {StagUserInfoResponse} */
                const userInfo = JSON.parse(text);
                return new UserIdentity(loginData.stagUserTicket, userInfo.stagUserInfo);
            });

        TestUserIdentity._identityCache[username] = resultPromise;
    }

    return await TestUserIdentity._identityCache[username];
};

/**
 * @return {Promise<UserIdentity>}
 */
TestUserIdentity.loginStudent = async () => {
    return TestUserIdentity.login("K16B5802P");
};

/**
 *
 * @param {string} html
 * @return {{stagUserTicket: string, stagUserInfo: string}}
 */
function findLoginDataIn(html) {
    // todo: polish parsing
    const returnUrlParams = html.match(/test:\/\/back.url\?([^"]+)/);
    if(!returnUrlParams) {
        console.warn(html);
        throw new Error("Failed to parse login response");
    }
    const linkParams = returnUrlParams[1];

    const data = {};

    const parts = linkParams.split('&amp;');
    parts.forEach((part) => {
        const keyVal = part.split('=');
        data[decodeURIComponent(keyVal[0])] = decodeURIComponent(keyVal[1]);
    });

    return data;
}

module.exports = TestUserIdentity;
