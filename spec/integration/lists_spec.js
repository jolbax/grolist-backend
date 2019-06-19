require("dotenv").config();
const base = `http://localhost:${process.env.PORT}/api/lists`;
const axios = require("axios");
const server = require("../../src/server");
const { List, User } = require("../../src/db/models");
const sequelize = require("../../src/db/models").sequelize;

describe("routes: links", () => {
  beforeEach(done => {
    this.user;
    this.list;
    sequelize.sync({ force: true }).then(res => {
      (async () => {
        try {
          this.user = await User.create({
            username: "neo",
            email: "neo@matrix.com",
            password: "password"
          });
          this.list = await List.create({
            title: "Party list",
            userId: this.user.id
          });
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      })();
    });
  });

  describe("POST /create", () => {
    it("should create a new list", done => {
      let newList = {
        title: "BBQ list",
        userId: this.user.id
      };
      (async () => {
        try {
          let resp = await axios.post(`${base}/create`, newList);
          let list = await List.findOne({
            where: {
              title: "BBQ list",
              userId: this.user.id
            }
          });
          expect(list.id).not.toBeNull();
          expect(list.title).toBe("BBQ list");
          expect(list.userId).toBe(this.user.id);
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      })();
    });
    it("should not create a new list with missing title/userId", done => {
      let newList = {
        userId: this.user.id
      };
      (async () => {
        try {
          let resp = await axios.post(`${base}/create`, newList);
          // let list = await List.findOne({
          //   where: {
          //     userId: this.user.id
          //   }
          // });
          expect(resp.data.status).toContain("fail");
          expect(resp.data.error.name).toContain("SequelizeValidationError");
          // expect(list).toBeNull();
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      })();
    });
  });

  describe("POST /:id/update", () => {
    it("should update the list associated with the ID", done => {
      (async () => {
        try {
          let updateList = { title: "Super list" };
          let listBefore = await List.findOne({
            where: { title: this.list.title }
          });
          let resp = await axios.post(
            `${base}/${this.list.id}/update`,
            updateList
          );
          let listAfter = await List.findOne({
            where: { title: updateList.title }
          });
          expect(resp.data.status).toBe("ok");
          expect(listBefore.title).toBe(this.list.title);
          expect(listAfter.title).toBe(updateList.title);
          expect(resp.data.list.title).toBe(updateList.title);
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      })();
    });
  });

  describe("GET /:id", () => {
    it("should return the list associated with the ID", done => {
      axios
        .get(`${base}/${this.list.id}`)
        .then(resp => {
          expect(resp.data.status).toBe("ok");
          expect(resp.data.list.title).toBe("Party list");
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("DELETE /:id/delete", () => {
    it("should destroy the associated list and linked items", done => {
      (async () => {
        try {
          let resp = await axios.delete(`${base}/${this.list.id}/delete`);
          let list = await List.findOne({
            where: { title: "Party list", userId: this.user.id }
          });
          expect(resp.data.status).toBe("ok");
          expect(resp.data.list.title).toBe("Party list");
          expect(list).toBeNull();
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      })();
    });
  });
});
