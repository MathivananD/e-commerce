const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const idempotencySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    status: {
      type: String,
      enum: ['PROCESSING', 'COMPLETED', 'FAILED'],
      default: 'PROCESSING'
    },

    responseStatusCode: {
      type: Number
    },

    responseBody: {
      type: Schema.Types.Mixed
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400
    }
  }
);

module.exports = mongoose.model("idempotency", idempotencySchema);