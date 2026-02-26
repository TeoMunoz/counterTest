function update(msg, m) {

  if ("name" in msg) return { ...m, name: msg.name };

  if ("cal" in msg) return { ...m, cal: msg.cal };

  if (msg.add && m.name && m.cal)
    return {
      meals: [...m.meals, { name: m.name, cal: m.cal }],
      name: "",
      cal: ""
    };

  if ("del" in msg)
    return { ...m, meals: m.meals.filter((_, i) => i !== msg.del) };

  return m;
}

module.exports = update;