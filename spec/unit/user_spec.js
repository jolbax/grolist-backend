const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models").sequelize;

describe("User", () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(res => {
        done();
      })
      .catch(err => {
        console.log("Users cleaned up");
        done();
      });
  });

  describe("#create()", () => {
    it("should create a new user", done => {
      User.create({
        username: "neo",
        email: "neo@matrix.com",
        password: "password"
      })
        .then(user => {
          expect(user).not.toBeNull();
          expect(user.username).toBe("neo");
          expect(user.email).toBe("neo@matrix.com");
          expect(user.password).not.toBeNull();
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
});
