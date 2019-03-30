"use strict";

class CodeInspection {
    /**
     *
     * @param {function} func
     * @return {string[]}
     */
    static functionArgumentNames(func) {
        const fnStr = func.toString().replace(CodeInspection.STRIP_COMMENTS, '');
        const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(CodeInspection.ARGUMENT_NAMES);

        return result || [];
    }

}

CodeInspection.STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
CodeInspection.ARGUMENT_NAMES = /([^\s,]+)/g;

module.exports = CodeInspection;