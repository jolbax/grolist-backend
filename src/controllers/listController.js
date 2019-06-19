const listQueries = require("../db/queries.list.js");
// const Authorizer = require("../policies/");

module.exports = {
  create(req, res) {
    listQueries
      .createList(req)
      .then(list => {
        res.json({ status: "ok", list });
      })
      .catch(err => {
        res.json({ status: "fail", error: err });
      });
  },
  delete(req, res) {
    listQueries
      .getList(req.params.id)
      .then(list => {
        listQueries
          .destroyList(list)
          .then(count => {
            res.json({ status: "ok", list });
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
    let updatedList = {
      title: req.body.title
    };
    listQueries
      .getList(req.params.id)
      .then(list => {
        if (list === null) {
          res.status(400).json({ status: "fail", error: "List not found" });
        } else {
          listQueries
            .updateList(list, updatedList)
            .then(list => {
              res.json({ status: "ok", list });
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
    listQueries
      .getList(req.params.id)
      .then(list => {
        res.json({ status: "ok", list });
      })
      .catch(err => {
        res.status(400).json({ status: "fail", error: err });
      });
  },
  getAll(req, res) {
    listQueries
      .getLists()
      .then(lists => {
        res.json({ status: "ok", lists });
      })
      .catch(err => {
        res.status(400).json({ status: "fail", error: err });
      });
  }
};
