const mongoose = require("mongoose");

const { model, Schema } = require("mongoose");

const EventSchema = new Schema(
  {
    organizer: { type: String, required: true, maxLength: 20, unique: true },
    name: {
      type: String,

      validate: {
        validator: function (name) {
          return !name.includes(`event`);
        },
        message: `name shall not includes event`,
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    image: { type: String, required: true },
    numOfSeats: { type: Number, minimum: 5 },
    bookedOfSeats: { type: Number, default: 0, maximum: numOfSeats },
    startDate: { type: Date, minimum: Date.now },
    endDate: { type: Date, minimum: startDate },
  },

  {
    timestamps: true,
  }
);
module.exports = model("event", EventSchema);
