const Container = require("./Container");

const Authenticator = require("../auth/Authenticator");

class Configurator {
    /**
     * Requires services and registers them into container
     *
     * @return {Container}
     */
    getContainer() {
        let container = new Container();

        container.setService("authenticator", new Authenticator());

        return container;
    }

}

module.exports = Configurator;