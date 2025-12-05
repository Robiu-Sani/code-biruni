import { ITemplate } from "interface/template.interface";
import mongoose, { Schema,  Model } from "mongoose";



const TemplateSchema: Schema<ITemplate> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    demoLinks: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: true,
    },

    services: {
      type: [String],
      default: [],
    },

    facilities: {
      type: [String],
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Avoid model overwrite in Next.js (important!)
const TemplateModel: Model<ITemplate> =
  mongoose.models.Template || mongoose.model<ITemplate>("Template", TemplateSchema);

export default TemplateModel;
