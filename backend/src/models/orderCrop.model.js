import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

const orderedProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderCropSchema = new mongoose.Schema({
  products: {
    type: [orderedProductSchema],
    required: true,
  },
  estimatedTime: {
    type: Date,
    required: false,
    default: Date.now() + 7 * 24 * 60 * 60 * 1000, // assumed that it will take 7 days to deliver the product
    //we will not take this from user and for now set it to 7 days 
  },
  shippingAddress: {
    type: shippingAddressSchema,
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
}, {
  timestamps: true,
});

export const orderCrop = mongoose.model("orderCrop", orderCropSchema);
