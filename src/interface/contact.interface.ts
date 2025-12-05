export interface IContact {
  numbers: {
    mobile?: string[];
    home?: string[];
    work?: string[];
    fax?: string[];
    emergency?: string[];
    whatsapp?: string[];
  }[];

  emails:{
    name:string;
    email:string;
  }

  socialMedia: {
    facebook?: string[];
    youtube?: string[];
    instagram?: string[];
    twitter?: string[];
    linkedin?: string[];
    snapchat?: string[];
    tiktok?: string[];
    github?: string[];
    discord?: string[];
    reddit?: string[];
    telegram?: string[];
    medium?: string[];
    threads?: string[];
    pinterest?: string[];
  };

  addresses:string[];

  websites?: {
    name: string;
    domain?: string;
  };

}
