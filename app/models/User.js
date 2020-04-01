const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Schema = mongoose.Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(values) {
        return validator.isEmail(values)
      },
      message: function() {
        return "invalid email format"
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

userSchema.statics.findByToken = function(token) {
  const User = this
  let tokenData
  try {
    tokenData = jwt.verify(token, "contactapp123")
    console.log(tokenData, "tokenData")
  } catch {
    return Promise.reject(err)
  }
  return User.findOne({ _id: tokenData._id, "tokens.token": token })
};

userSchema.methods.generateToken = function() {
  console.log("token generated")
  const user = this
  const tokenData = {
    _id: user._id,
    email: user.email,
    createdAt: Number(new Date())
  };
  const token = jwt.sign(tokenData, "contact123")
  user.tokens.push({ token })

  return user
    .save()
    .then(() => {
      return Promise.resolve(token)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

userSchema.statics.findByCredentials = function(email, password) {
  console.log("find by credentials called")
  const User = this
  return User.findOne({ email }).then((user) => {
    console.log("searching for email")
    if (!user) {
      return Promise.reject("invalid email/password")
    }
    return bcryptjs
      .compare(password, user.password)
      .then(() => {
        console.log("found user")
        return Promise.resolve(user)
      })
      .catch((err) => {
        console.log("not found id")
        return Promise.reject(err)
      })
  })
}

//generating a salt value and hashing the password using bcryptjs and saving it inside the schema
userSchema.pre("save", function(next) {
  const user = this
  if (user.isNew) {
    bcryptjs.genSalt(10).then((salt) => {
      bcryptjs.hash(user.password, salt).then((encryptedPassword) => {
        user.password = encryptedPassword
        next()
      })
    })
  } else {
    next()
  }
})

const User = mongoose.model("User", userSchema)
module.exports = User