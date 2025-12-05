import { IFaq } from "interface/faq.interface";
import mongoose, { Schema,  Model } from "mongoose";


const AnswerSchema = new Schema(
  {
    text: { type: String, required: true },
    types: { type: [String], default: [] },
  },
  { _id: false }
);

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: AnswerSchema, required: true },
  },
  { timestamps: true }
);

const FaqModel: Model<IFaq> =
  mongoose.models.Faq || mongoose.model<IFaq>("Faq", FaqSchema);

export default FaqModel;
