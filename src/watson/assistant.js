var AssistantV2 = require('watson-developer-cloud/assistant/v2'); // watson sdk

class Asistant {

  constructor(assistantId) {
    this.assistantId = asisstantId;

    if (!assistantId) {
      throw new Error("Missing assistant ID!");
    }

    this.assistant = new AssistantV2({
      version: '2019-02-28'
    });

    this.newContext = {
      global : {
        system : {
          turn_count : 1
        }
      }
    };
  }

 async processMessage(req) {

     var contextWithAcc = (req.body.context) ? req.body.context : newContext;

     if (req.body.context) {
       contextWithAcc.global.system.turn_count += 1;
     }

     var textIn = '';

     if(req.body.input) {
       textIn = req.body.input.text;
     }

     var payload = {
       assistant_id: this.assistantId,
       session_id: req.body.session_id,
       context: contextWithAcc,
       input: {
         message_type : 'text',
         text : textIn,
         options : {
           return_context : true
         }
       }
     };

     var resolve, reject;

     var promise = new Promise( (_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
     });

     // Send the input to the assistant service
     this.assistant.message(payload, function (err, data) {
       if (err) {
         reject(err);
       }
         resolve(data);
     });

     return promise;
 }

 async createSession(req) {

   var resolve, reject;

   var promise = new Promise( (_resolve, _reject) => {
     resolve = _resolve;
     reject = _reject;
   });

   this.assistant.createSession({
     assistant_id: this.assistantId,
   }, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
   });

   return promise;

 }



}

module.exports = Assistant;
