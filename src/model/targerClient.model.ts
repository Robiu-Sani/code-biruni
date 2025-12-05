import { ITargetClient } from "interface/targetClient.interface";
import mongoose, { Schema,  Model } from "mongoose";



const TargetClientSchema: Schema<ITargetClient> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    numbers: {
      type: [String],
      required: true,
      default: [],
    },

    address: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      default: "",
    },

    isContacted: {
      type: Boolean,
      default: false,
    },

    isResponsed: {
      type: Boolean,
      default: false,
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TargetClientModel: Model<ITargetClient> =
  mongoose.models.TargetClient ||
  mongoose.model<ITargetClient>("TargetClient", TargetClientSchema);

export default TargetClientModel;
