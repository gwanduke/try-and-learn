const TravelService = ((rawWebService) => {
  const conferenceAirport = "BOS";
  const maxArrival = new Date();
  const minDeparture = new Date();

  // 간단한 캐싱
  const cache = [];

  return {
    getSuggestedTicket: (homeAirport) => {
      let ticket;
      if (cache[homeAirport]) {
        return cache[homeAirport];
      }

      ticket = rawWebService.getCheapestRoundTrip(
        homeAirport,
        conferenceAirport,
        maxArrival,
        minDeparture
      );

      cache[homeAirport] = ticket;
      return ticket;
      // => 캐시는 잘 동작하지만 원본 코드에 비해 2배로 늘어남... 어떻게 해결할까?

      // return rawWebService.getCheapestRoundTrip(
      //   homeAirport,
      //   conferenceAirport,
      //   maxArrival,
      //   minDeparture
      // );
    },
  };
})();

// 원본 코드를 건드리지 않고, 이렇게 사용할 수 있으면 좋을텐데!
Aop.around("getSuggestedTicket", cacheAspectFactory());

TravelService.getSuggestedTicket(attendee.homeAirport);
