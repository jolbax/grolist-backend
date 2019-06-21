require("dotenv").config();
const base = `http://localhost:${process.env.PORT}/api/users`;
const axios = require("axios");
const server = require("../../src/server");
const { User } = require("../../src/db/models");
const sequelize = require("../../src/db/models").sequelize;

describe("routes: users", () => {
  beforeEach(done => {
    sequelize.sync({ force: true }).then(res => {
      done();
    });
  });

  describe("POST /users/create", () => {
    it("should create a new user", done => {
      axios
        .post(`${base}/create`, {
          username: "neo",
          email: "neo@matrix.com",
          password: "password",
          passwordConfirmation: "password"
        })
        .then(resp => {
          let newUser = resp.data.user;
          User.findOne({ where: { id: newUser.id } })
            .then(user => {
              expect(user.id).toBe(newUser.id);
              expect(user.username).toBe(newUser.username);
              expect(user.email).toBe(newUser.email);
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it("should not create a new user if information is missing", done => {
      axios
        .post(`${base}/create`, {
          username: "neo",
          email: "neo@matrix.com",
          password: "password"
        })
        .then(resp => {
          done();
        })
        .catch(err => {
          expect(err.response.status).toBe(400);
          expect(err.response.data.error).toBe("Missing information");
          done();
        });
    });
  });
  describe("POST /users/log_in", () => {
    it("should log in and retrieve a token", done => {
      (async () => {
        try {
          let userResp = await axios.post(`${base}/create`, {
            username: "neo",
            email: "neo@matrix.com",
            password: "password",
            passwordConfirmation: "password"
          });
          this.user = await userResp.data.user;
          let authentication = await axios.post(`${base}/log_in`, {
            email: this.user.email,
            password: "password"
          });

          expect(authentication.data.auth).toBe(true);
          expect(authentication.data.token).not.toBeNull();
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      })();
    });
  });
});
