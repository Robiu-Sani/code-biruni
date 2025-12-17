/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react';
import { IMember } from "interface/member.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus,  Mail, Phone } from "lucide-react";
import SingleImageUpload from 'default/SingleImageUpload';

interface Address {
  present: string;
  permanent: string;
  office: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Social {
  facebook: string;
  instagram: string;
  linkedin: string;
  github: string;
  twitter: string;
  youtube: string;
  discord: string;
  tiktok: string;
}

interface Education {
  degree: string;
  institute: string;
  passingYear: string | number;
}

const AddMemberForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<IMember, '_id' | 'createdAt' | 'updatedAt'>>({
    username: '',
    fullName: '',
    firstName: '',
    lastName: '',
    nickName: '',
    gender: '',
    birthDate: '',
    profileImage: '',
    coverPhoto: '',
    email: '',
    phone: '',
    secondaryEmails: [],
    secondaryPhones: [],
    addresses: {
      present: '',
      permanent: '',
      office: '',
      city: '',
      postalCode: '',
      country: ''
    },
    role: 'user',
    status: 'active',
    verified: false,
    social: {
      facebook: '',
      instagram: '',
      linkedin: '',
      github: '',
      twitter: '',
      youtube: '',
      discord: '',
      tiktok: ''
    },
    profession: '',
    jobTitle: '',
    skills: [],
    company: '',
    education: [],
    notes: ''
  });

  const [newSecondaryEmail, setNewSecondaryEmail] = useState('');
  const [newSecondaryPhone, setNewSecondaryPhone] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newEducation, setNewEducation] = useState<Education>({
    degree: '',
    institute: '',
    passingYear: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      addresses: {
        ...prev.addresses,
        [field]: value
      }
    }));
  };

  const handleSocialChange = (platform: keyof Social, value: string) => {
    setFormData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value
      }
    }));
  };

  const addSecondaryEmail = () => {
    if (newSecondaryEmail.trim() === '') return;
    
    setFormData(prev => ({
  ...prev,
  secondaryEmails: [...(prev.secondaryEmails || []), newSecondaryEmail.trim()]
}));
    
    setNewSecondaryEmail('');
  };

const removeSecondaryEmail = (index: number) => {
  setFormData(prev => ({
    ...prev,
    secondaryEmails: (prev.secondaryEmails || []).filter((_, i) => i !== index)
  }));
};

const addSecondaryPhone = () => {
  if (newSecondaryPhone.trim() === '') return;

  setFormData(prev => ({
    ...prev,
    secondaryPhones: [...(prev.secondaryPhones || []), newSecondaryPhone.trim()]
  }));

  setNewSecondaryPhone('');
};

const removeSecondaryPhone = (index: number) => {
  setFormData(prev => ({
    ...prev,
    secondaryPhones: (prev.secondaryPhones || []).filter((_, i) => i !== index)
  }));
};


 const addSkill = () => {
  if (newSkill.trim() === '') return;

  setFormData(prev => ({
    ...prev,
    skills: [...(prev.skills || []), newSkill.trim()]
  }));

  setNewSkill('');
};

const removeSkill = (index: number) => {
  setFormData(prev => ({
    ...prev,
    skills: (prev.skills || []).filter((_, i) => i !== index)
  }));
};

  const handleEducationChange = (field: keyof Education, value: string) => {
    setNewEducation(prev => ({
      ...prev,
      [field]: value
    }));
  };

 
const addEducation = () => {
  if (!newEducation.degree.trim() || !newEducation.institute.trim()) return;

  setFormData(prev => ({
    ...prev,
    education: [...(prev.education || []), newEducation]
  }));

  setNewEducation({
    degree: '',
    institute: '',
    passingYear: ''
  });
};

const removeEducation = (index: number) => {
  setFormData(prev => ({
    ...prev,
    education: (prev.education || []).filter((_, i) => i !== index)
  }));
};



  const handleProfileImageUpload = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      profileImage: imageUrl
    }));
  };

  const handleCoverPhotoUpload = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      coverPhoto: imageUrl
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/v2/member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create member');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        username: '',
        fullName: '',
        firstName: '',
        lastName: '',
        nickName: '',
        gender: '',
        birthDate: '',
        profileImage: '',
        coverPhoto: '',
        email: '',
        phone: '',
        secondaryEmails: [],
        secondaryPhones: [],
        addresses: {
          present: '',
          permanent: '',
          office: '',
          city: '',
          postalCode: '',
          country: ''
        },
        role: 'user',
        status: 'active',
        verified: false,
        social: {
          facebook: '',
          instagram: '',
          linkedin: '',
          github: '',
          twitter: '',
          youtube: '',
          discord: '',
          tiktok: ''
        },
        profession: '',
        jobTitle: '',
        skills: [],
        company: '',
        education: [],
        notes: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl my-8 mx-auto">
      <CardHeader>
        <CardTitle>Add New Member</CardTitle>
        <CardDescription>Create a new member profile</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="p-3 bg-green-100 text-green-800 rounded-md">
              Member added successfully!
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="work">Work & Edu</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickName">Nickname</Label>
                <Input
                  id="nickName"
                  name="nickName"
                  value={formData.nickName}
                  onChange={handleInputChange}
                  placeholder="Enter nickname"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
  <Label htmlFor="gender">Gender</Label>
  <Select
    value={formData.gender}
    onValueChange={(value) =>
      setFormData(prev => ({
        ...prev,
        gender: value as "" | "male" | "female" | "other"
      }))
    }
  >
    <SelectTrigger>
      <SelectValue placeholder="Select gender" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="male">Male</SelectItem>
      <SelectItem value="female">Female</SelectItem>
      <SelectItem value="other">Other</SelectItem>
    </SelectContent>
  </Select>
</div>

                
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Profile Image</Label>
                  <SingleImageUpload onUpload={handleProfileImageUpload} />
                </div>
                
                <div className="space-y-2">
                  <Label>Cover Photo</Label>
                  <SingleImageUpload onUpload={handleCoverPhotoUpload} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Secondary Emails</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSecondaryEmail}
                    onChange={(e) => setNewSecondaryEmail(e.target.value)}
                    placeholder="Enter secondary email"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={addSecondaryEmail}
                    size="sm"
                    variant="outline"
                    disabled={!newSecondaryEmail.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {(formData.secondaryEmails ?? []).length > 0 && (
  <div className="flex flex-wrap gap-2">
    {(formData.secondaryEmails ?? []).map((email, index) => (
      <Badge key={index} variant="secondary" className="flex items-center gap-1">
        <Mail className="h-3 w-3" />
        {email}
        <button
          type="button"
          onClick={() => removeSecondaryEmail(index)}
          className="ml-1 text-gray-500 hover:text-gray-700"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </Badge>
    ))}
  </div>
)}

              </div>

              <div className="space-y-4">
                <Label>Secondary Phones</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSecondaryPhone}
                    onChange={(e) => setNewSecondaryPhone(e.target.value)}
                    placeholder="Enter secondary phone"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={addSecondaryPhone}
                    size="sm"
                    variant="outline"
                    disabled={!newSecondaryPhone.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {(formData.secondaryPhones ?? []).length > 0 && (
  <div className="flex flex-wrap gap-2">
    {(formData.secondaryPhones ?? []).map((phone, index) => (
      <Badge key={index} variant="secondary" className="flex items-center gap-1">
        <Phone className="h-3 w-3" />
        {phone}
        <button
          type="button"
          onClick={() => removeSecondaryPhone(index)}
          className="ml-1 text-gray-500 hover:text-gray-700"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </Badge>
    ))}
  </div>
)}

              </div>

             <div className="space-y-4">
  <Label>Addresses</Label>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="present">Present Address</Label>
      <Textarea
        id="present"
        value={formData.addresses?.present ?? ''}
        onChange={(e) => handleAddressChange('present', e.target.value)}
        placeholder="Enter present address"
        rows={2}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="permanent">Permanent Address</Label>
      <Textarea
        id="permanent"
        value={formData.addresses?.permanent ?? ''}
        onChange={(e) => handleAddressChange('permanent', e.target.value)}
        placeholder="Enter permanent address"
        rows={2}
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="space-y-2">
      <Label htmlFor="office">Office Address</Label>
      <Textarea
        id="office"
        value={formData.addresses?.office ?? ''}
        onChange={(e) => handleAddressChange('office', e.target.value)}
        placeholder="Enter office address"
        rows={2}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="city">City</Label>
      <Input
        id="city"
        value={formData.addresses?.city ?? ''}
        onChange={(e) => handleAddressChange('city', e.target.value)}
        placeholder="Enter city"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="postalCode">Postal Code</Label>
      <Input
        id="postalCode"
        value={formData.addresses?.postalCode ?? ''}
        onChange={(e) => handleAddressChange('postalCode', e.target.value)}
        placeholder="Enter postal code"
      />
    </div>
  </div>

  <div className="space-y-2">
    <Label htmlFor="country">Country</Label>
    <Input
      id="country"
      value={formData.addresses?.country ?? ''}
      onChange={(e) => handleAddressChange('country', e.target.value)}
      placeholder="Enter country"
    />
  </div>
</div>

            </TabsContent>

            <TabsContent value="account" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={formData.verified}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, verified: !!checked }))}
                />
                <Label htmlFor="verified">Verified</Label>
              </div>

              <div className="space-y-4">
  <Label>Social Media</Label>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="facebook">Facebook</Label>
      <Input
        id="facebook"
        value={formData.social?.facebook ?? ''}
        onChange={(e) => handleSocialChange('facebook', e.target.value)}
        placeholder="Enter Facebook URL"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="instagram">Instagram</Label>
      <Input
        id="instagram"
        value={formData.social?.instagram ?? ''}
        onChange={(e) => handleSocialChange('instagram', e.target.value)}
        placeholder="Enter Instagram URL"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="linkedin">LinkedIn</Label>
      <Input
        id="linkedin"
        value={formData.social?.linkedin ?? ''}
        onChange={(e) => handleSocialChange('linkedin', e.target.value)}
        placeholder="Enter LinkedIn URL"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="github">GitHub</Label>
      <Input
        id="github"
        value={formData.social?.github ?? ''}
        onChange={(e) => handleSocialChange('github', e.target.value)}
        placeholder="Enter GitHub URL"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="twitter">Twitter</Label>
      <Input
        id="twitter"
        value={formData.social?.twitter ?? ''}
        onChange={(e) => handleSocialChange('twitter', e.target.value)}
        placeholder="Enter Twitter URL"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="youtube">YouTube</Label>
      <Input
        id="youtube"
        value={formData.social?.youtube ?? ''}
        onChange={(e) => handleSocialChange('youtube', e.target.value)}
        placeholder="Enter YouTube URL"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="discord">Discord</Label>
      <Input
        id="discord"
        value={formData.social?.discord ?? ''}
        onChange={(e) => handleSocialChange('discord', e.target.value)}
        placeholder="Enter Discord URL"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="tiktok">TikTok</Label>
      <Input
        id="tiktok"
        value={formData.social?.tiktok ?? ''}
        onChange={(e) => handleSocialChange('tiktok', e.target.value)}
        placeholder="Enter TikTok URL"
      />
    </div>
  </div>
</div>

            </TabsContent>

            <TabsContent value="work" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    placeholder="Enter profession"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="Enter job title"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                />
              </div>

              <div className="space-y-4">
                <Label>Skills</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter skill"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={addSkill}
                    size="sm"
                    variant="outline"
                    disabled={!newSkill.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {(formData.skills ?? []).length > 0 && (
  <div className="flex flex-wrap gap-2">
    {(formData.skills ?? []).map((skill, index) => (
      <Badge key={index} variant="secondary" className="flex items-center gap-1">
        {skill}
        <button
          type="button"
          onClick={() => removeSkill(index)}
          className="ml-1 text-gray-500 hover:text-gray-700"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </Badge>
    ))}
  </div>
)}

              </div>

              <div className="space-y-4">
                <Label>Education</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      value={newEducation.degree}
                      onChange={(e) => handleEducationChange('degree', e.target.value)}
                      placeholder="Enter degree"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="institute">Institute</Label>
                    <Input
                      id="institute"
                      value={newEducation.institute}
                      onChange={(e) => handleEducationChange('institute', e.target.value)}
                      placeholder="Enter institute"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="passingYear">Passing Year</Label>
                    <Input
                      id="passingYear"
                      value={newEducation.passingYear}
                      onChange={(e) => handleEducationChange('passingYear', e.target.value)}
                      placeholder="Enter passing year"
                    />
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  onClick={addEducation}
                  size="sm"
                  variant="outline"
                  disabled={!newEducation.degree.trim() || !newEducation.institute.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
                
                {(formData.education ?? []).length > 0 && (
  <div className="border rounded-md divide-y">
    {(formData.education ?? []).map((edu, index) => (
      <div key={index} className="flex justify-between items-center p-3">
        <div>
          <div className="font-medium">{edu.degree}</div>
          <div className="text-sm text-gray-600">{edu.institute} - {edu.passingYear}</div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => removeEducation(index)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ))}
  </div>
)}

              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Enter notes about the member"
                  rows={4}
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Creating...' : 'Create Member'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMemberForm;