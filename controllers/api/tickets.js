const Ticket = require("../../models/api/ticket");

async function retrieveTickets(req, res) {
  const movieId = req.params.movieId;
  try {
    const retrievedTickets = await Ticket.find(
      { movie: movieId },
      { seats: 1, _id: 0 }
    );
    if (!retrievedTickets) throw new Error("Movie tickets not available.");
    res.status(200).json({ retrievedTickets });
  } catch (err) {
    res.status(400).json("Tickets Retrieval Failed.");
  }
}

async function addTickets(req, res) {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json("Tickets Purchase Successful.");
  } catch (err) {
    res.status(400).json("Tickets Purchase Failed.");
  }
}

module.exports = {
  addTickets,
  retrieveTickets,
};
