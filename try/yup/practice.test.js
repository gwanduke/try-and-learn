import { schema, schema2 } from "./practice";

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

  test.only("", () => {
    schema2.validateSync({
      name: "Hi",
      items: [
        {
          product: "",
          count: 1,
        },
        {
          product: "1",
          count: 0,
        },
      ],
    });
  });

  test.only("", () => {
    schema2.validateSync({
      name: "alias",
      items: [
        {
          product: "",
          count: 1,
        },
      ],
    });
  });
});
