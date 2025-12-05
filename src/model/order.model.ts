import { IOrder } from "interface/order.interface";
import mongoose, { Schema,  Model } from "mongoose";



const OrderSchema: Schema<IOrder> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    number: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      default: "",
    },

    projectType: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;
