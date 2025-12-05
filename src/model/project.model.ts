import { IProject } from "interface/project.interface";
import mongoose, { Schema,  Model } from "mongoose";



const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    method: { type: String, required: true },
    way: { type: String, required: true },
    numbers: { type: [String], default: [] },
  },
  { _id: false }
);

const ServiceCredentialSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { _id: false }
);

const RenualAmountSchema = new Schema(
  {
    service: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const ProjectSchema: Schema<IProject> = new Schema(
  {
    name: { type: String, required: true, trim: true },

    mainDomain: { type: String, required: true },

    domains: { type: [String], default: [] },

    defaultDomains: { type: [String], default: [] },

    githubLinks: { type: [String], default: [] },

    contacts: {
      type: [ContactSchema],
      default: [],
    },

    hostDervice: {
      type: [ServiceCredentialSchema],
      default: [],
    },

    domainService: {
      type: [ServiceCredentialSchema],
      default: [],
    },

    address: {
      type: [String],
      default: [],
    },

    date: {
      type: Date,
      required: true,
    },

    providedServices: {
      type: String,
      required: true,
    },

    renualAmount: {
      type: [RenualAmountSchema],
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default ProjectModel;
