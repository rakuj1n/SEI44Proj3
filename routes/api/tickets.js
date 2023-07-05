const express = require("express");
const router = express.Router();
const ticketsController = require("../../controllers/api/tickets");

router.post("/", ticketsController.addTickets);
router.get("/:movieId", ticketsController.retrieveTickets);

module.exports = router;
