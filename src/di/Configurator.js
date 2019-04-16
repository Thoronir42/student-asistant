const Container = require("./Container");

const Authenticator = require("../services/auth/Authenticator");

const Assistant = require("../watson/Assistant");

class Configurator {

    constructor() {
        this._definitions = {};
    }

    addDefinition(name, definition) {
        if (this._definitions.hasOwnProperty(name)) {
            throw new Error(`Definition '${name}' already exists`);
        }

        this._definitions[name] = definition
    }

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
        let container = new Container();

        container.setService("authenticator", new Authenticator());
        container.setService("assistant", new Assistant(process.env.ASSISTANT_ID));

        for (let name in this._definitions) {
            container.setDefinition(name, this._definitions[name]);
        }

        return container;
    }

}

module.exports = Configurator;
