const mongoose = require("mongoose")

const setupDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/contactManagement")
    .then(() => {
      console.log("connected")
    })
    .catch(() => {
      console.log("failed")
    })
}

module.exports = setupDB