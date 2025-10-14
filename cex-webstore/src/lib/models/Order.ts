import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `num-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "PROCESSING",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
        "RETURNED",
      ],
      default: "PENDING",
      required: true,
    },

    shippingInfo: {
      fullName: {
        type: String,
        required: true,
      },
      organization: String,
      contactNumber: {
        type: String,
        required: true,
      },
      address1: {
        type: String,
        required: true,
      },
      address2: String,
      country: {
        type: String,
        required: true,
      },
      townCity: {
        type: String,
        required: true,
      },
      postcode: {
        type: String,
        required: true,
      },
    },

    items: [
      {
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],

    pricing: {
      subtotal: {
        type: Number,
        required: true,
      },
      deliveryFee: {
        type: Number,
        default: 29.5,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
