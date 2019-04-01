"use strict";

class AsyncUtils {
    static PromiseCallback() {
        let _resolve, _reject;

        const promise = new Promise((resolve, reject) => {
            _resolve = resolve;
            _reject = reject;
        });

        promise.callback = (err, data) => {
            err ? _reject(err) : _resolve(data);
        };

        return promise;
    }
}

module.exports = AsyncUtils;