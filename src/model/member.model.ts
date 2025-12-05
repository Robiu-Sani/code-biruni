import { IMember } from "interface/member.interface";
import mongoose, { Schema,  Model } from "mongoose";



const AddressSchema = new Schema(
  {
    present: String,
    permanent: String,
    office: String,
    city: String,
    postalCode: String,
    country: String,
  },
  { _id: false }
);

const SocialSchema = new Schema(
  {
    facebook: String,
    instagram: String,
    linkedin: String,
    github: String,
    twitter: String,
    youtube: String,
    discord: String,
    tiktok: String,
  },
  { _id: false }
);

const EducationSchema = new Schema(
  {
    degree: String,
    institute: String,
    passingYear: {
      type: Schema.Types.Mixed, // allows number or string
    },
  },
  { _id: false }
);

const MemberSchema: Schema<IMember> = new Schema(
  {
    username: { type: String, trim: true },
    fullName: { type: String, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    nickName: { type: String, trim: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    birthDate: String,
    profileImage: String,
    coverPhoto: String,

    // Contact
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    secondaryEmails: { type: [String], default: [] },
    secondaryPhones: { type: [String], default: [] },

    // Addresses
    addresses: { type: AddressSchema, default: {} },

    // Account Details
    role: {
      type: String,
      enum: ["user", "admin", "moderator", "vendor", "editor", "member"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked", "pending"],
      default: "active",
    },
    verified: { type: Boolean, default: false },

    // Social Media
    social: { type: SocialSchema, default: {} },

    // Work & Education
    profession: String,
    jobTitle: String,
    skills: { type: [String], default: [] },
    company: String,
    education: { type: [EducationSchema], default: [] },

    notes: String,
  },
  { timestamps: true }
);

const MemberModel: Model<IMember> =
  mongoose.models.Member || mongoose.model<IMember>("Member", MemberSchema);

export default MemberModel;
