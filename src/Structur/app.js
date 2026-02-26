const { diff, patch } = require("virtual-dom");
const createElement = require("virtual-dom/create-element");

function app(model, update, view, node) {
  let vdom = view(dispatch, model);
  let root = createElement(vdom);
  node.appendChild(root);

  function dispatch(msg) {
    model = update(msg, model);
    const newVdom = view(dispatch, model);
    root = patch(root, diff(vdom, newVdom));
    vdom = newVdom;
  }
}

module.exports = app;