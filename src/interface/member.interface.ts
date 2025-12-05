export interface IMember {
  // Basic Identity
  id?: string;
  username?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  gender?: "male" | "female" | "other";
  birthDate?: string;
  profileImage?: string;
  coverPhoto?: string;

  // Contact
  email?: string;
  phone?: string;
  secondaryEmails?: string[];
  secondaryPhones?: string[];

  // Addresses
  addresses?: {
    present?: string;
    permanent?: string;
    office?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };

  // Account Details
  role?: "user" | "admin" | "moderator" | "vendor" | "editor" | "member";
  status?: "active" | "inactive" | "blocked" | "pending";
  verified?: boolean;

  // Social Media
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    youtube?: string;
    discord?: string;
    tiktok?: string;
  };

  // Work & Education
  profession?: string;
  jobTitle?: string;
  skills?: string[];
  company?: string;
  education?: {
    degree?: string;
    institute?: string;
    passingYear?: string | number;
  }[];

  notes?: string;
}
