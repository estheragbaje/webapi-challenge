const express = require("express");
const db = require("./projectModel");
const dbAction = require("./actionModel");

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

router.post("/", validateProject, (req, res) => {
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

router.get("/:id", validateProjectId, (req, res) => {
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

router.put("/:id", validateProjectId, (req, res) => {
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

router.delete("/:id", validateProjectId, (req, res) => {
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

router.get("/:id/actions", validateProjectId, (req, res) => {
  const id = req.params.id;
  db.getProjectActions(id)
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(400).json({
          message: `There is no project with an id of ${id}`
        });
      }
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: `An error occured while getting action with a project id of ${id}`
      });
    });
});

//creating Middleware Functions
function validateProjectId(req, res, next) {
  const id = Number(req.params.id);
  db.get(id)
    .then(data => {
      console.log(data);
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

function validateProject(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing project data"
    });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({
      message: "missing required name or description field"
    });
  } else {
    next();
  }
}

module.exports = router;
