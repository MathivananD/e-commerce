const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    hexCode: {
      type: String,
      unique: true,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
module.exports = mongoose.model("Color", colorSchema);
