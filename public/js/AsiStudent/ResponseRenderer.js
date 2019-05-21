(function () {
    window.ResponseRenderer = function ResponseRenderer() {

        /**
         *
         * @param {ConversationMessage[]} target
         * @param asistudentData
         * @param response
         */
        this.render = function (target, asistudentData, response) {
            if (asistudentData.hasOwnProperty(('scheduleEntries'))) {
                this.renderTimetable(target, asistudentData.scheduleEntries);
            }
            if (asistudentData.hasOwnProperty(('message'))) {
                target.push(getMessage(asistudentData.message));
            }
            if (asistudentData.hasOwnProperty(('examEvents'))) {
                var examEvents = asistudentData.examEvents;
                if (examEvents.length > 0) {
                    examEvents.forEach(function (entry) {
                        target.push(getExamEvents(entry));
                    });
                } else {
                    target.push(getMessage("No events found."))
                }
            }
        };

        /**
         *
         * @param {ConversationMessage[]} target
         * @param {CourseEvent[]} scheduleEntries
         */
        this.renderTimetable = function (target, scheduleEntries) {
            var day = null;
            var entries = null;

            scheduleEntries.forEach(function (entry) {
                if (entry.den !== day) {
                    if (entries != null) {
                        entries += '</div>';

                        target.push({
                            type: "schedule-entry",
                            innerhtml: entries
                        });
                    }
                    day = entry.den;

                    entries = '<div class="schedule-entries">';
                    entries += '<span>' + day + '</span>'
                }

                entries += getScheduleEntry(entry);
            });

            if (entries) {
                entries += "</div>";
                target.push({
                    type: "schedule-entry",
                    innerhtml: entries
                });
            }
        };

        /**
         * @param  {string} entry
         * @return {{innerhtml: string, type: string}}
         */
        function getMessage(entry) {
            return {
                type: "Message",
                innerhtml: '<div class="system-message">' +
                    '<span>' + entry + '</span> ' +
                    '</div>'
            };
        }


        /**
         *
         * @param {CourseEvent} entry
         * @return {string}
         */
        function getScheduleEntry(entry) {
            var subject = entry.katedra + '/' + entry.predmet;
            var place = entry.budova + "-" + entry.mistnost;
            var date = entry.hodinaSkutOd.value + " - " + entry.hodinaSkutDo.value;

            var typeClass = 'schedule-entry-' + entry.typAkceZkr;

            return '<div class="schedule-entry ' + typeClass + '">\n' +
                '<span title="' + entry.nazev + '">' + subject + '</span>' +
                ' - ' +
                '<span>' + entry.typAkce + '</span><br/>\n' +
                '<span>' + place + '</span><br/>\n' +
                '<span>' + date + '</span>\n' +
                '</div>';
        }

        /**
         *
         * @param  {ExamEvent} entry
         * @return {{innerhtml: string, type: string}}
         */
        function getExamEvents(entry) {
            var subject = entry.katedra + '/' + entry.predmet;
            var place = entry.budova + "-" + entry.mistnost;
            var date = entry.datum.value + " " + entry.casOd + " - " + entry.casDo;
            var typeClass;
            var actionEl;

            if (!entry.lzeZapsatOdepsat) {
                if (entry.textDuvoduProcNelzeZapsatOdepsat) {
                    actionEl = '<span>' + entry.textDuvoduProcNelzeZapsatOdepsat + '</span>';
                }

                typeClass = 'exam-entry-' + entry.kodDuvoduProcNelzeZapsatOdepsat;
            } else {
                var action = entry.zapsan ? "Withdraw" : "Register";
                var btnClass = entry.zapsan ? 'btn-primary' : 'btn-primary'; // todo: use light appearance
                var sentence = action + " exam event " + entry.termIdno;
                actionEl = '<button class="btn btn-in-exam ' + btnClass + '" onclick="ConversationPanel.sendMessage(\'' + sentence + '!\');">' + action + '</button>';
                typeClass = entry.zapsan ? 'exam-entry-registered' : 'exam-entry-OK';
            }

            var maxCount = entry.limit ? entry.limit : '-';

            return {
                type: "ExamEvent",
                innerhtml: '<div class="exam-entry ' + typeClass + '">' +
                    '<span title="' + entry.typTerminu + '">' + subject + '</span> ' +
                    // '<span>' + entry.termIdno + '</span><br/> ' +
                    //  '<span>' + entry.typTerminu + '</span><br/>' +
                    '<span>(' + entry.obsazeni + '/' + maxCount + ')</span><br/>' +
                    '<span>' + place + '</span><br/>' +
                    '<span>' + date + '</span><br/>' +
                    actionEl +
                    '</div>'
            };
        }
    }

})();
