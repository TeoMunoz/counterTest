const { add, subtract, multiply, divide } = require("./math");

test("suma 2 + 3 = 5", () => {
  expect(add(2, 3)).toBe(5);
});

test("multiplica 2 * 3 = 6", () => {
  expect(multiply(2, 3)).toBe(6);
});