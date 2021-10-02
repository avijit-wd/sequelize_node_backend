const Contact = require("../models/contact");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { log } = require("../modules/logger");

User.hasMany(Contact);
Contact.belongsTo(User);

const getAllContact = asyncHandler(async (req, res) => {
  log.info(`Incoming request for getting all contacts`.cyan);

  const contacts = await Contact.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "name", "email", "createdAt"],
      },
    ],
    limit: 3,
    offset: 0,
  });
  if (contacts) {
    return res.status(200).json({
      count: contacts.length,
      contacts,
    });
  }
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  log.info(
    `Incoming request for creating a contact with name: ${name} and email: ${email}`
      .cyan
  );

  const newContact = await Contact.create({ name, email, UserId: 2 });
  res.status(201).json(newContact);
});

module.exports = {
  getAllContact,
  createContact,
};
