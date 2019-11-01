const express = require("express");
const db = require("./projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: "The projects information could not be retreived"
      });
    });
});

router.post("/", (req, res) => {
  const newProject = {
    name: "Introduction to Nodejs and Express",
    description: "Building APIs with Express"
  };

  db.insert(newProject)
    .then(data => {
      res.status(201).json({ data, message: "Project successfully created" });
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error creating a new project"
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({
          message: `There is no project with an id of ${id}`
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "The projects information could not be retreived"
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  db.update(id, changes)
    .then(data => {
      res.status(200).json({
        message: "Project details successfully updated"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error updating project details"
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(data => {
      res.status(200).json({
        message: "This project has been deleted"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error in deleting this project"
      });
    });
});

module.exports = router;
