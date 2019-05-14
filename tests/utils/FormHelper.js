class FormHelper {

}

/**
 *
 * @param {Object} data
 * @return {string}
 */
FormHelper.encodeForUrl = (data) => {
    const formBody = [];
    for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);

        formBody.push(encodedKey + "=" + encodedValue);
    }

    return formBody.join("&");
};

module.exports = FormHelper;
