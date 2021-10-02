const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Contact = sequelize.define(
  "Contact",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your name",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter an email address",
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = Contact;
