const hh = require("hyperscript-helpers");
const { h } = require("virtual-dom");

const { div, button, input, table, tr, td, th } = hh(h);

function view(dispatch, m) {
  return div({ className: "flex flex-col gap-4" }, [

    div({ className: "flex gap-2" }, [
      input({
        className: "border p-2 flex-1",
        placeholder: "Meal",
        value: m.name,
        oninput: e => dispatch({ name: e.target.value })
      }),

      input({
        className: "border p-2 w-32",
        type: "number",
        placeholder: "Calories",
        value: m.cal,
        oninput: e => dispatch({ cal: e.target.value })
      }),

      button({
        className: "bg-green-500 text-white px-4 rounded",
        onclick: () => dispatch({ add: true })
      }, "Save")
    ]),

    table({ className: "border w-full text-center" }, [

      tr({ className: "font-bold border-b" }, [
        th("Meal"), th("Calories"), th("")
      ]),

      ...m.meals.map((meal, i) =>
        tr({ className: "border-b" }, [
          td(meal.name),
          td(meal.cal),
          td(
            button({
              className: "bg-red-500 text-white px-2 rounded",
              onclick: () => dispatch({ del: i })
            }, "X")
          )
        ])
      ),

      tr({ className: "font-bold" }, [
        td("Total"),
        td(m.meals.reduce((t, x) => t + +x.cal, 0)),
        td("")
      ])
    ])
  ]);
}

module.exports = view;