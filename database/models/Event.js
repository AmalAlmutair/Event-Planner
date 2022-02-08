const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");
const validator = require("validator");
require("mongoose-type-email");

const EventSchema = new Schema(
  {
    organizer: { type: String, required: true, maxLength: 20, unique: true },
    name: {
      type: String,
      validate: {
        validator: function (name) {
          return !name.includes("event");
        },
        message: "name shall not includes event",
      },
    },
    email: {
      type: mongoose.SchemaTypes.Email,
    },
    image: { type: String, required: true },
    numOfSeats: { type: Number, min: 5 },
    bookedSeats: {
      type: Number,
      default: 0,
      validate: [
        function (value) {
          return this.numOfSeats >= value;
        },
      ],
    },
    startDate: { type: Date, min: Date.now() },
    endDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return this.startDate <= value;
        },
        message: "EndDate should be after start date",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", EventSchema);
