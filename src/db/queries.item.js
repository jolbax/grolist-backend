const { Item, List, User } = require("../../src/db/models");

module.exports = {
  createItem(req) {
    return Item.create({
      name: req.body.name,
      listId: req.body.listId,
      quantity: req.body.quantity || 1,
      purchased: req.body.purchased || false
    });
  },
  destroyItem(item) {
    return item.destroy();
  },
  getItems() {
    return Item.findAll({
      include: [{ model: "User" }]
    });
  },
  getItem(id) {
    return Item.findByPk(id);
  },
  updateItem(item, updatedItem) {
    return item.update(updatedItem, { fields: Object.keys(updatedItem) });
  }
};
