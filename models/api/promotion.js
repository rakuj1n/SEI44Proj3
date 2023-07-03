const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const promotionSchema = new Schema({
  title: { type: String },
  image: { type: String },
  detail: { type: String },
});

module.exports = model("Promotion", promotionSchema);
