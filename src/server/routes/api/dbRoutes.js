const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const upload = require("../../utils/upload");
const User = require("../../models/User");

router.get("/test", (req, res) => {
  res.send(`hello`);
});

router.post("/new-project", (req, res) => {
  console.log(`new project?`);
  const { title, owner } = req.body;
  console.log(req.body);
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
      res.send(`new Project`);
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

// const { title , customer, image } = req.body

// if (!email || !password) res.status(400).send({ error: 'Missing Credentials.' })

// User.findOne({ title })
//     .then(existingProject => {
//         if (existingProject) return res.status(400).send({ error: 'Project of this title exists already.' })

//         return req.files && req.files.picture ? upload(req.files.picture) : Promise.resolve()
//     })
//     .then(imageURL => {
//         return new Project({ _id: new mongoose.Types.ObjectId(), title, owner: user._id, customer, image }).save()
//     })
//     .then(user => {
//         const cleanUser = user.toObject()

//         delete cleanUser.password

//         const token = jwt.sign(cleanUser, config.SECRET_JWT_PASSPHRASE)
//         res.send({ token })
//     })
// })

module.exports = router;
