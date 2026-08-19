const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sizeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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

module.exports = mongoose.model("Size", sizeSchema);
