const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ticketSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
  bookingUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  seats: [{ type: String }],
});

module.exports = model("Tickets", ticketSchema);
