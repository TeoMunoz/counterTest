const view = require("View");

describe("View.js", () => {

  let model;
  let dispatch;

  beforeEach(() => {
    model = { meals: [], name: "", cal: "" };
    dispatch = jest.fn();
  });

  test("rendered basic form and table", () => {
    const vdom = view(dispatch, model);
    expect(vdom.tagName || vdom.type).toBe("div");
    expect(vdom.children).toBeDefined();
    expect(vdom).toMatchSnapshot();
  });

  test("zeigt Mahlzeiten korrekt an", () => {
    model.meals = [
      { name: "Pizza", cal: "500" },
      { name: "Salad", cal: "200" }
    ];
    const vdom = view(dispatch, model);

    const mealRows = vdom.children[1].children.filter(c => c.type === "tr" && c.children[0].tagName !== undefined);
    expect(mealRows.length).toBe(3);
  });

  test("dispatch wird korrekt aufgerufen (Simulation)", () => {
    const inputName = model.name;
    const inputEvent = { target: { value: "Burger" } };

    const inputField = view(dispatch, model).children[0].children[0];
    inputField.properties.oninput(inputEvent);
    expect(dispatch).toHaveBeenCalledWith({ name: "Burger" });
  });

  test("Total-Kalorien korrekt summiert", () => {
    model.meals = [
      { name: "Pizza", cal: "500" },
      { name: "Salad", cal: "200" }
    ];
    const vdom = view(dispatch, model);
    const totalRow = vdom.children[1].children.find(row => row.children[0].children && row.children[0].children[0] === "Total");
    const totalCalories = model.meals.reduce((t, x) => t + +x.cal, 0);
    expect(totalCalories).toBe(700);
  });

});