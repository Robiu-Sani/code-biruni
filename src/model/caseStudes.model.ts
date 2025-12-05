import { ICaseStudies } from "interface/caseStudies.interface";
import  { Schema, model, models } from "mongoose";

const CaseStudiesSchema = new Schema<ICaseStudies>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      required: true,
      default: [],
    },

    descrition: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CaseStudiesModel =
  models.CaseStudies || model<ICaseStudies>("CaseStudies", CaseStudiesSchema);

export default CaseStudiesModel;
