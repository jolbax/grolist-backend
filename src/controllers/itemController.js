const itemQueries = require("../db/queries.item.js");
// const Authorizer = require("../policies/");

module.exports = {
  create(req, res) {
    itemQueries
      .createItem(req)
      .then(item => {
        res.json({ status: "ok", item });
      })
      .catch(err => {
        res.json({ status: "fail", error: err });
      });
  },
  delete(req, res) {
    itemQueries
      .getItem(req.params.id)
      .then(item => {
        itemQueries
          .destroyItem(item)
          .then(count => {
            res.json({ status: "ok", item });
          })
          .catch(err => {
            res.status(400).json({ status: "fail", error: err });
          });
      })
      .catch(err => {
        res.status(400).json({ status: "failure", error: err });
      });
  },
  update(req, res) {
    let updatedItem = {
      name: req.body.name,
      quantity: req.body.quantity,
      purchased: req.body.purchased || false
    };

    itemQueries
      .getItem(req.params.id)
      .then(item => {
        if (item === null) {
          res.status(400).json({ status: "fail", error: "Item not found" });
        } else {
          itemQueries
            .updateItem(item, updatedItem)
            .then(item => {
              res.json({ status: "ok", item });
            })
            .catch(err => {
              res.status(400).json({ status: "fail", error: err });
            });
        }
      })
      .catch(err => {
        res.status(400).json({ status: "fail", error: err });
      });
  },
  get(req, res) {
    itemQueries
      .getItem(req.params.id)
      .then(item => {
        res.json({ status: "ok", item });
      })
      .catch(err => {
        res.status(400).json({ status: "fail", error: err });
      });
  },
  getAll(req, res) {
    itemQueries
      .getItems()
      .then(items => {
        res.json({ status: "ok", items });
      })
      .catch(err => {
        res.status(400).json({ status: "fail", error: err });
      });
  }
};
