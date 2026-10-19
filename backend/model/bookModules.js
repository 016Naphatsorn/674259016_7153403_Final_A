import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Book = sequelize.define("book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  publishedDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

export default Book;
