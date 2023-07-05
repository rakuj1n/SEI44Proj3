const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json([
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"],
  ]);
});

router.get("/rowLabels", (req, res) => {
  res.status(200).json(["A", "B", "C", "D", "E"]);
});

module.exports = router;
