const { List, User } = require("../../src/db/models");
const sequelize = require("../../src/db/models").sequelize;

describe("List", () => {
  this.user;
  beforeEach(done => {
    sequelize.sync({ force: true }).then(res => {
      User.create({
        username: "neo",
        email: "neo@matrix.net",
        password: "password"
      })
        .then(user => {
          this.user = user;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("#create()", () => {
    it("should create a new list", done => {
      List.create({
        title: "Weekend BBQ",
        userId: this.user.id
      })
      .then(list => {
        expect(list).not.toBeNull()
        expect(list.userId).toBe(this.user.id)
        done()
      })
    })
  })
});
