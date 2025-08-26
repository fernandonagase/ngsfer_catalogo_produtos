const { parseQueryArray } = require("./routing");

describe("parseQueryArray", () => {
  it("Retorna array vazio se não houver params", () => {
    expect(parseQueryArray()).toHaveLength(0);
    expect(parseQueryArray("")).toHaveLength(0);
  });

  it("Retorna o próprio valor se já for array", () => {
    const arr = [1, 2, 3];
    expect(parseQueryArray(arr)).toEqual(arr);
  });

  it("Retorna um array com um valor se string não tiver mais valores", () => {
    const str = "teste";
    const result = parseQueryArray(str);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(str);
  });

  it("Retorna array com vários valores se string tiver vários valores", () => {
    const values = ["one", "two", "three"];
    const str = values.join(",");
    const result = parseQueryArray(str);
    expect(result).toHaveLength(values.length);
    expect(result).toEqual(values);
  });

  it("Funciona com delimiter diferente de ,", () => {
    const values = ["one", "two", "three"];
    const str = values.join("&");
    const result = parseQueryArray(str, { delimiter: "&" });
    expect(result).toHaveLength(values.length);
    expect(result).toEqual(values);
  });
});
