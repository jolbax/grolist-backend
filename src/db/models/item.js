"use strict";
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      listId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      purchased: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {}
  );
  Item.associate = function(models) {
    Item.belongsTo(models.List, {
      foreignKey: "listId",
      onDelete: "CASCADE"
    });
  };
  return Item;
};
