const app = require("App");
const model = require("Model");
const update = require("Update");
const view = require("View");

app(model, update, view, document.getElementById("app"));