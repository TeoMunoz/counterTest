const update = require("Update");

describe("Update.js", () => {

  let model;

  beforeEach(() => {
    model = { meals: [], name: "", cal: "" };
  });

  test("setzt Name im Modell", () => {
    const msg = { name: "Salad" };
    const newModel = update(msg, model);
    expect(newModel.name).toBe("Salad");
    expect(newModel.cal).toBe("");
  });

  test("setzt Kalorien im Modell", () => {
    const msg = { cal: "200" };
    const newModel = update(msg, model);
    expect(newModel.cal).toBe("200");
    expect(newModel.name).toBe("");
  });

  test("fügt neue Mahlzeit hinzu", () => {
    model.name = "Pizza";
    model.cal = "500";
    const msg = { add: true };
    const newModel = update(msg, model);
    expect(newModel.meals.length).toBe(1);
    expect(newModel.meals[0]).toEqual({ name: "Pizza", cal: "500" });
    expect(newModel.name).toBe("");
    expect(newModel.cal).toBe("");
  });

  test("löscht eine Mahlzeit nach Index", () => {
    model.meals = [
      { name: "Pizza", cal: "500" },
      { name: "Salad", cal: "200" }
    ];
    const msg = { del: 0 };
    const newModel = update(msg, model);
    expect(newModel.meals.length).toBe(1);
    expect(newModel.meals[0].name).toBe("Salad");
  });

  test("ignoriert ungültige Nachrichten", () => {
    const msg = { foo: "bar" };
    const newModel = update(msg, model);
    expect(newModel).toEqual(model);
  });

  test("fügt keine Mahlzeit hinzu, wenn Name oder Kalorien fehlen", () => {
    model.name = "";
    model.cal = "100";
    const msg = { add: true };
    const newModel = update(msg, model);
    expect(newModel.meals.length).toBe(0);

    model.name = "Apple";
    model.cal = "";
    const newModel2 = update(msg, model);
    expect(newModel2.meals.length).toBe(0);
  });

});