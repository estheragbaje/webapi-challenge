const express = require("express");
const dbAction = require("./actionModel");

const router = express.Router();

router.get("/:id", validateProjectId, (req, res) => {
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

router.post("/", [validateProjectIdExists, validateActions], (req, res) => {
  const newAction = {
    project_id: Number(req.body.project_id),
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

router.put("/:id", validateProjectId, (req, res) => {
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

router.delete("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;

  dbAction
    .remove(id)
    .then(data => {
      res.status(200).json({
        message: "This action has been deleted"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error in deleting this action"
      });
    });
});

//middleware Functions
function validateProjectId(req, res, next) {
  const id = Number(req.params.id);
  dbAction
    .get(id)
    .then(data => {
      if (data) {
        next();
      } else {
        res.status(400).json({
          message: "invalid project id"
        });
      }
    })
    .catch(error => {
      res.status(404).json({
        message: "Id does not exist"
      });
    });
}

function validateProjectIdExists(req, res, next) {
  const project_id = Number(req.body.project_id);
  dbAction
    .get(project_id)
    .then(data => {
      if (data) {
        next();
      } else {
        res.status(400).json({
          message: "Project ID does not exist"
        });
      }
    })
    .catch(error => {
      res.status(404).json({
        message: "Error getting project Id"
      });
    });
}

function validateActions(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing action data"
    });
  } else if (!req.body.description || !req.body.notes || !req.body.project_id) {
    res.status(400).json({
      message: "missing field. Please supply all required fields"
    });
  } else {
    next();
  }
}

module.exports = router;
