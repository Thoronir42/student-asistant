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

    static functionName(func, instance) {
        const fnStr = func.toString();
        const nameLimiter = fnStr.indexOf('(');

        let name = fnStr.substr(0, nameLimiter);

        return instance ? this.instanceClassName(instance) + "." + name : name;
    }

    static instanceClassName(instance) {
        if (typeof instance !== "object") {
            return "";
        }

        const constructorStr = instance.constructor.toString();

        const name = constructorStr.match(CodeInspection.CLASS_NAME);

        // const name = CodeInspection.CLASS_NAME.exec(constructorStr);

        if (!name) {
            return "";
        }

        return name[1];
    }
}

CodeInspection.STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
CodeInspection.ARGUMENT_NAMES = /([^\s,]+)/g;
CodeInspection.CLASS_NAME = /class\s+(\w+)/m;

module.exports = CodeInspection;