const router = require("express").Router();
const {
  getAllContact,
  createContact,
} = require("../controllers/contactController");

router.get("/contacts", getAllContact);
router.post("/contacts", createContact);

module.exports = router;
