"use strict";

class WatsonController {

    constructor(assistantService) {
      this.assistantService = assistantService;
    }

    processMessage(request, response) {

         this.assistantService.processMessage(request)
         .then( (data) => {
           response.json(data);
         })
         .catch( (err) => {
            response.status(err.code || 500).json(err);
         });
    }

    createSession(request, response) {
      this.assistantService.createSession(request)
      .then((data) => {
          response.send(data);
      })
      .catch((err) => {
          response.status(err.code || 500).send(err);
      });
    }
}

module.exports = WatsonController;
