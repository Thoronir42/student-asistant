const Container = require("./Container");

class Configurator {

    /**
     *
     * @param {Object<string, string|number>} parameters
     */
    constructor(parameters) {
        this._definitions = {};

        this.parameters = parameters;
    }

    /**
     *
     * @param {string} name
     * @param {ServiceDefinition|Function} definition
     */
    addDefinition(name, definition) {
        if (!name) {
            throw new Error("Annonymous definitions are not allowed");
        }
        if (typeof definition === "function") {
            // wrap service constructor into a definition
            definition = {definition}
        }
        if (this._definitions.hasOwnProperty(name)) {
            throw new Error(`Definition '${name}' already exists`);
        }

        this._definitions[name] = definition
    }

    /**
     *
     * @param {Object<string, ServiceDefinition>} definitions
     */
    addDefinitions(definitions) {
        for (let name in definitions) {
            this.addDefinition(name, definitions[name]);
        }
    }

    /**
     * Requires services and registers them into container
     *
     * @return {Container}
     */
    getContainer() {
        let container = new Container(this._definitions, this.parameters);

        return container;
    }

}

module.exports = Configurator;
