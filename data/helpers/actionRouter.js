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

router.post("/", (req, res) => {
  const newAction = {
    project_id: req.body.project_id,
    description: req.body.description,
    notes: req.body.notes
  };
  dbAction
    .insert(newAction)
    .then(data => {
      res.status(201).json({
        data,
        message: "New Action successfully created"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error adding action"
      });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  dbAction
    .update(id, changes)
    .then(data => {
      res.status(200).json({
        message: "Action details successfully updated"
      });
    })
    .catch(error => {
      res.status(500).json({
        mesage: "There was an error updating action details"
      });
    });
});

module.exports = router;
