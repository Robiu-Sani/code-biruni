import { IReview } from "interface/review.interface";
import mongoose, { Schema, Model} from "mongoose";



const ReviewSchema: Schema<IReview> = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    domain: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project", // relation to ProjectModel
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewModel: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default ReviewModel;
