import { schema } from "./practice";

describe("", () => {
  test("should ", (done) => {
    schema
      .validate(
        {
          name: "김관덕",
          hasCar: true,
          hasHouse: true,
          isRich: true,
          city: "기타",
          isLiveDifferentPlace: true,
          cityEtc: "",
        },
        {
          abortEarly: false,
        }
      )
      .then(() => {
        done();
      })
      .catch((err) => {
        expect(err).toBe(1);
        done();
      });
  });
});
