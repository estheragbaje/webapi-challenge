const express = require("express");
const dbAction = require("./actionModel");

const router = express.Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  dbAction
    .get(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error getting actions"
      });
    });
});

module.exports = router;
