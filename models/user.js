const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    password: String,
    createdAt: Date,
    updatedAt: Date
  },
  {
    id: true,
    timestamps: true
  }
);

UserSchema.plugin(passportLocalMongoose);

User = mongoose.model("User", UserSchema);

module.exports = User;
