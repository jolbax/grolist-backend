module.exports = {
  init(app) {
    const userRoutes = require("../routes/userRoutes");
    const listRoutes = require("../routes/listRoutes");
    const itemRoutes = require("../routes/itemRoutes");
    app.use("/api/users", userRoutes);
    app.use("/api/lists", listRoutes);
    app.use("/api/lists", itemRoutes);
  }
};
