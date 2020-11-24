var Conference = Conference || {};

Conference.attendee = function (firstName, lastName) {
  "use strict";

  var checkedIn = false,
    first = firstName || "None",
    last = lastName || "None";

  return {
    getFullName: function () {
      return first + " " + last;
    },

    isCheckedIn: function () {
      return checkedIn;
    },

    checkIn: function () {
      checkedIn = true;
    },
  };
};

Conference.attendeeCollection = function () {
  const attendees = [];

  return {
    containers: function (attendee) {
      return attendees.indexOf(attendee) > -1;
    },
    add: function (attendee) {
      if (!this.containers(attendee)) {
        attendees.push(attendee);
      }
    },
    remove: function (attendee) {
      var index = attendees.indexOf(attendee);
      if (index > -1) {
        attendees.splice(index, 1);
      }
    },
    iterate: function (callback) {
      // attendees의 각 attenes에 대한 콜백 수행
      attendees.forEach(callback);
    },
  };
};

export default Conference;
