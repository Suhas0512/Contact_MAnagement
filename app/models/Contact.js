const mongoose = require("mongoose")
const validator = require("validator")
const Schema = mongoose.Schema
const contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: {
      validator: function(values) {
        return validator.isEmail(values)
      },
      message: function() {
        return "invalid email format"
      }
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:'User'
  }
});

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact