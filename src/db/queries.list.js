const { List, Item, User } = require("../../src/db/models");

module.exports = {
  createList(req) {
    return List.create({
      title: req.body.title,
      userId: 1
    });
  },
  destroyList(list) {
    return List.destroy({
      where: {
        id: list.id
      }
    });
  },
  getLists() {
    return List.findAll({
      include: [{ model: User }, { model: Item, as: "items" }]
    });
  },
  getList(id) {
    return List.findByPk(id, { include: [{ model: Item, as: "items" }] });
  },
  updateList(list, updatedList) {
    return list.update(updatedList, { fields: Object.keys(updatedList) });
  }
};
