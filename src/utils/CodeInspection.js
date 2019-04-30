"use strict";

const SIGNATURE_PATTERN = /((class\s+\w+)|(function\s+\w*)|(\(((, ?)?(\/\*\*\w+\*\/\s+)?\w+)*\)\s=>))/g;

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

    /**
     *
     * @param funcOrClass
     * @return {string}
     */
    static getSignatureName(funcOrClass) {
        if (!funcOrClass) {
            return '';
        }

        const str = funcOrClass.toString();
        const match = SIGNATURE_PATTERN.exec(str);

        if (!match) {
            console.error("Could not match: " + str);
            return "Signature matching error";
        }

        let name = match[1];
        if (name.includes("=>")) {
            return name + " {...}";
        }

        return name;
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