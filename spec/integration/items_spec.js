require("dotenv").config();
const base = `http://localhost:${process.env.PORT}/api/lists`;
const axios = require("axios");
const server = require("../../src/server");
const { Item, List, User } = require("../../src/db/models");
const sequelize = require("../../src/db/models").sequelize;

describe("routes: items", () => {
  beforeEach(done => {
    this.user;
    this.list;
    this.item1;
    this.item2;
    sequelize.sync({ force: true }).then(res => {
      (async () => {
        try {
          this.user = await User.create({
            username: "neo",
            email: "neo@matrix.net",
            password: "123123"
          });
          this.list = await List.create({
            title: "Party list",
            userId: this.user.id
          });
          this.item1 = await Item.create({
            name: "Beer",
            quantity: 12,
            listId: this.list.id,
            purchased: false
          });
          this.item2 = await Item.create({
            name: "Sausages",
            quantity: 2,
            listId: this.list.id,
            purchased: false
          });
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      })();
    });
  });

  describe("GET /:listId/items/:id", () => {
    it("should return the item associated with the ID", done => {
      axios
        .get(`${base}/${this.list.id}/items/${this.item1.id}`)
        .then(resp => {
          expect(resp.data.status).toBe("ok");
          expect(resp.data.item.name).toBe("Beer");
          expect(resp.data.item.quantity).toBe(12);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("DELETE /:listId/items/:id/delete", () => {
    it("should delete the item associated with the ID", (done) => {
      (async () => {
        try {
          let itemBefore = await Item.findOne({
            where: { name: "Beer", quantity: 12 }
          });
          let resp = await axios.delete(
            `${base}/${this.list.id}/items/${this.item1.id}/delete`
          );
          let itemAfter = await Item.findOne({
            where: { name: "Beer", quantity: 12 }
          });
          expect(resp.data.status).toBe("ok");
          expect(resp.data.item.name).toBe("Beer");
          expect(resp.data.item.quantity).toBe(12);
          expect(itemBefore.name).toBe(resp.data.item.name);
          expect(itemAfter).toBeNull();
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      })();
    });
  });

  describe("POST /:listId/items/:id/update", () => {
    it("should update the item associated with the ID", (done) => {
      (async () => {
        try {
          let updatedItem = {name: "Bier", purchased: true}
          let itemBefore = await Item.findOne({
            where: { name: "Beer", purchased: false }
          });
          let resp = await axios.post(
            `${base}/${this.list.id}/items/${this.item1.id}/update`,
            updatedItem
          );
          let itemAfter = await Item.findOne({
            where: { name: "Bier", purchased: true }
          });
          expect(resp.data.status).toBe("ok");
          expect(resp.data.item.name).toBe("Bier");
          expect(resp.data.item.quantity).toBe(12);
          expect(itemBefore.purchased).toBe(false);
          expect(itemAfter.purchased).toBe(true);
          expect(itemAfter.name).toBe("Bier");
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      })();
    });
  });

  describe("POST /:listId/items/create", () => {
    it("should create a new item ", done => {
      let newItem = {
        name: "paper cups",
        quantity: 100,
        listId: this.list.id,
        purchased: false
      };
      (async () => {
        try {
          let resp = await axios.post(
            `${base}/${this.list.id}/items/create`,
            newItem
          );
          let item = await Item.findOne({
            where: { name: "paper cups", listId: this.list.id }
          });
          expect(resp.data.status).toBe("ok");
          expect(item.id).toBe(resp.data.item.id);
          expect(item.name).toBe(resp.data.item.name);
          expect(item.listId).toBe(resp.data.item.listId);
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      })();
    });
  });
});
