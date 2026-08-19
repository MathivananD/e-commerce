const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productVariantSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    colorId: {
      type: Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },

    sizeId: {
      type: Schema.Types.ObjectId,
      ref: "Size",
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    discountPercentage: {
      type: Number,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    lowStockThreshold: {
      type: Number,
      min: 0,
      default: 5,
    },

    images: [
      {
        type: String,
      },
    ],
    actualPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
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

module.exports = mongoose.model("ProductVariant", productVariantSchema);
