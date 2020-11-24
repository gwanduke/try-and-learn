const { default: Attendee } = require("./attendee");
const { default: DiContainer } = require("./DiContainer");

MyApp = {};

MyApp.diContainer = new DiContainer();

MyApp.diContainer.register("Service", [], () => {
  return new ConferenceWebSvc();
});

MyApp.diContainer.register("Messenger", [], () => new Messenger());

MyApp.diContainer.register(
  "AttendeeFactory",
  ["Service", "Messenger"],
  (service, messenger) => {
    return (attendeeId) => new Attendee(service, messenger, attendeeId);
  }
);

// 사용 방법
const attendeeId = "SOME_ID";
const attendee = MyApp.diContainer.get("AttendeeFactory")(attendeeId);
attendee.someWork();

// TODO: 정확히 이해하지 못함. 상관없지 않나?
//
// 만약 Factory로 정의하지 않는다면 다음과 같이 사용하게 될텐데
// 그러면, 다른 객체의 재귀적 의존성으로 Attendee를 제공할 방법이 없다.
// (일반적으로 객체들이 attendeeId를 자신이 시작된 체인의
// 최상위 지점에서 쭉 전달받아 내려왔다고 단정하기는 어렵다.)
const attendee = MyApp.diContainer.get("Attendee", attendeeId);
