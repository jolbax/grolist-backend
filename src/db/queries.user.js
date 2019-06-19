const { User, List } = require("../db/models");

module.exports = {
  createUser(user) {
    return User.create({
      username: user.username,
      email: user.email,
      password: user.password
    });
  },
  getUser(id) {
    return User.findByPk(id, { include: [{ model: List, as: "lists" }] });
  },
  getUsers() {
    return User.findAll();
  },
  updateUser(updatedUser, user) {
    return user.update(updatedUser, { fields: Object.keys(updatedUser) });
  },
  updateUserLists(req, callback) {
    return this.getUser(req.user.id)
      .then(user => {
        let userPrivateLists = user.getPrivateLists();
        if (!userPrivateLists.length > 0) {
          callback(null, null);
        }
        userPrivateLists.forEach(privateWiki => {
          privateWiki
            .update({ private: false }, { fields: ["private"] })
            .catch(err => {
              callback({ type: "error", message: err });
            });
        });
        callback(null, userPrivateLists.length);
      })
      .catch(err => {
        callback(err);
      });
  }
};
