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
    }

})();
