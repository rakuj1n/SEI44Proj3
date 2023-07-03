const Promotion = require("../../models/api/promotion");

const index = async (req, res) => {
  const promotions = await Promotion.find();
  res.json({ promotions });
};

module.exports = {
  index,
};
