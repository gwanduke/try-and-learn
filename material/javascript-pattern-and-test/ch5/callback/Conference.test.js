const { default: Conference } = require("./Conference");

describe("Conference.attendeeCollection", () => {
  describe("contains(attendee)", () => {
    // contains
  });
  describe("add(attendee)", () => {
    // add
  });
  describe("remove(attendee)", () => {
    // remove
  });

  describe("iterate(callback)", () => {
    let collection, callbackSpy;

    function addAttendeesToCollection(attendeeArray) {
      attendeeArray.forEach((attendee) => {
        collection.add(attendee);
      });
    }

    function verifyCallbackWasExecutedForEachAttendee(attendeeArray) {
      //  각 원소마다 한번 씩 스파이가 호출되었는지 확인
      expect(callbackSpy.mock.calls.length).toBe(attendeeArray.length);

      var allCalls = callbackSpy.mock.calls;
      for (var i = 0; i < allCalls.length; i++) {
        expect(allCalls[i][0]).toBe(attendeeArray[i]);
      }
    }

    beforeEach(() => {
      collection = Conference.attendeeCollection();
      callbackSpy = jest.fn();
    });

    it("빈 컬렉션에서는 콜백을 실행하지 않는다", () => {
      collection.iterate(callbackSpy);
      expect(callbackSpy).not.toHaveBeenCalled();
    });

    it("원소가 하나뿐인 컬렉션은 콜백을 한 번만 실행한다", () => {
      const attendees = [Conference.attendee("윤지", "김")];
      addAttendeesToCollection(attendees);

      collection.iterate(callbackSpy);
      verifyCallbackWasExecutedForEachAttendee(attendees);
    });

    it("컬렉션 원소마다 한번 씩 콜백을 실행한다", () => {
      const attendees = [
        Conference.attendee("Tom", "Kazansky"),
        Conference.attendee("Charlotte", "Blackwoord"),
        Conference.attendee("태영", "김"),
      ];
      addAttendeesToCollection(attendees);

      collection.iterate(callbackSpy);

      verifyCallbackWasExecutedForEachAttendee(attendees);
    });
  });
});
