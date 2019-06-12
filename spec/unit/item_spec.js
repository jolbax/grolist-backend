const { List, Item, User } = require("../../src/db/models");
const sequelize = require("../../src/db/models").sequelize;

describe("Item", () => {
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
            title: "Weekend BBQ",
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

  describe("#create()", () => {
    it("should create a new item which references to a list", done => {
      (async () => {
        try {
          let item = await Item.create({
            name: "Sausages",
            quantity: 2,
            listId: this.list.id,
            purchased: false
          });
          expect(item).not.toBeNull();
          expect(item.name).toBe("Sausages");
          expect(item.listId).toBe(this.list.id);
          expect(item.purchased).toBe(false);
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      })();
    });
  });
});
