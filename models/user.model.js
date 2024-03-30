const { Schema, model } = require('mongoose');
const scheduleSchema = require('./schema.model')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'A username is needed!'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'An email is needed'],
      unique: true,
      minLength: 1,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        'Choose a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, "A phone number is needed!"],
      trim: true
    },
    schedule: {
      type: scheduleSchema,
      required: [true, "The schedule is needed!"]
    },
    password: {
      salt: { type: String, required: true },
      hash: { type: String, required: true },
    },
    avatar: {
      type: String,
      default:
        'https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png',
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

const User = model('User', userSchema);

module.exports = User;
