import { IContact } from "interface/contact.interface";
import  { Schema, model, models } from "mongoose";

const NumbersSchema = new Schema(
  {
    mobile: [String],
    home: [String],
    work: [String],
    fax: [String],
    emergency: [String],
    whatsapp: [String],
  },
  { _id: false }
);

const EmailsSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false }
);

const SocialMediaSchema = new Schema(
  {
    facebook: [String],
    youtube: [String],
    instagram: [String],
    twitter: [String],
    linkedin: [String],
    snapchat: [String],
    tiktok: [String],
    github: [String],
    discord: [String],
    reddit: [String],
    telegram: [String],
    medium: [String],
    threads: [String],
    pinterest: [String],
  },
  { _id: false }
);

const WebsitesSchema = new Schema(
  {
    name: { type: String, required: true },
    domain: { type: String },
  },
  { _id: false }
);

const ContactSchema = new Schema<IContact>(
  {
    numbers: {
      type: [NumbersSchema],
      required: true,
      default: [],
    },

    emails: {
      type: EmailsSchema,
      required: true,
    },

    socialMedia: {
      type: SocialMediaSchema,
      required: true,
    },

    addresses: {
      type: [String],
      required: true,
      default: [],
    },

    websites: {
      type: WebsitesSchema,
      required: false,
    },
  },
  { timestamps: true }
);

const ContactModel =
  models.Contact || model("Contact", ContactSchema);

export default ContactModel;
