const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const Session = require("../../models/Session");
const User = require("../../models/User");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const upload = require("../../utils/upload");

router.get("/test", (req, res) => {
  res.send(`hello`);
});

router.post("/new-project", (req, res) => {
  const { title, owner } = req.body;
  if (!title || !owner) res.status(400).send({ error: "Missing Credentials." });
  // return new Project({ title, owner }).save().then(res.send(`new project!`));

  Project.findOne({ title })
    .then(existingProject => {
      if (existingProject)
        return res
          .status(400)
          .send({ error: "Project with this title exists already." });
      return Promise.resolve();
      // return req.files && req.files.picture ? upload(req.files.picture) : Promise.resolve()
    })
    .then(result => {
      return new Project({ title, owner }).save();
    })
    .then(data => {
      res.send(data);
    });
});

router.post("/populate", (req, res) => {
  Project.findOne({ title: "Playtime!22" })
    .populate("owner")
    .exec(function(err, project) {
      if (err) throw err;
      console.log(project.owner);
    });
});

router.post("/populate2", (req, res) => {
  User.findOne({ email: "admin2" })
    .then(user => user.projects.push("a test project"))
    .save(done);
  res.send(`update2`);
});

router.get("/fetch-projects/:owner", (req, res) => {
  const { owner } = req.params;
  console.log(`fetching for:`, owner);
  Project.find({ owner: mongoose.Types.ObjectId(owner) }, null, {
    sort: { updated: -1 }
  }).then(results => res.send(results));
});

router.post("/deletebyId", (req, res) => {
  const { key, id } = req.body;
  Project.findByIdAndRemove(id, (err, deletedItem) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Project Deleted",
      id: deletedItem._id
    };
    return res.status(200).send(response);
  });
});

// SESSION ROUTES

router.post("/new-session", (req, res) => {
  console.log(`new session?`);
  const { project, user } = req.body;
  console.log(req.body);
  if (!project || !user)
    res.status(400).send({ error: "Missing Credentials." });
  return new Session({ project, user }).save().then(data => {
    res.send(data);
    console.log(data._id, data.user);
    User.findByIdAndUpdate(data.user, {
      session: data._id,
      openSession: true
    })
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
  });
});

router.post("/end-session", (req, res) => {
  const { id, notes, start } = req.body;
  let endTime = Date.now();
  let duration = Math.floor((endTime - new Date(start).getTime()) / 1000);
  if (!id) res.status(400).send({ error: "Missing Credentials." });
  Session.findByIdAndUpdate(id, {
    active: false,
    endTime: endTime,
    notes,
    duration
  })
    .then(data => {
      res.send(data)
      User.findByIdAndUpdate(data.user, {
        openSession:false 
      })
        .then(data => {
          console.log(data);
        })
    })
    .catch(err => console.log(err));
});

router.get("/fetch-sessions/:project", (req, res) => {
  const { project } = req.params;
  console.log(`fetching for:`, project);
  Session.find({ project: mongoose.Types.ObjectId(project) }).then(results =>
    res.send(results)
  );
});

router.post("/debug", (req, res) => {
  const { user, session } = req.body;
  if (!session) res.status(400).send({ error: "Missing Credentials." });
  User.findByIdAndUpdate(user, {
    session
  })
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));
});

module.exports = router;
