const User = require("../models/User")

module.exports.list = (req, res) => {
  User.find()
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.json(err)
    })
}

module.exports.create = (req, res) => {
  const body = req.body
  const user = new User(body)
  user
    .save()
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.json(err)
    })
}

module.exports.update = (req, res) => {
  const id = req.params.id
  const body = req.body
  User.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.json(err)
    })
}

module.exports.destroy = (req, res) => {
  const id = req.params.id
  User.findByIdAndDelete(id)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.json(err)
    })
}

module.exports.login = (req, res) => {
  const body = req.body
  User.findByCredentials(body.email, body.password)
    .then(function(user) {
      console.log(user, "user in login")
      return user.generateToken()
    })
    .then((token) => {
      res.setHeader("x-auth", token).send({});
    })
    .catch((err) => {
      res.send(err);
    });
};