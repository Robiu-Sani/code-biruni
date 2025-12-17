import { IPricing } from "interface/pricing.interface";
import mongoose, { Schema,  Model } from "mongoose";



const ServiceItemSchema = new Schema(
  {
    name: { type: String, required: true },
    isProvied: { type: Boolean, default: false },
  },
  { _id: false }
);

const PricingSchema: Schema<IPricing> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      prev: { type: Number, required: true },
      current: { type: Number, required: true },
      yearly: { type: Number, required: true },
    },

    amountType: {
      type: String,
      enum: ["yearly", "monthly"],
      required: true,
    },

    services: {
      type: [ServiceItemSchema],
      default: [],
    },

    baseText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PricingModel: Model<IPricing> =
  mongoose.models.Pricing || mongoose.model<IPricing>("Pricing", PricingSchema);

export default PricingModel;
