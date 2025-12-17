/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react';
import { IContact } from "interface/contact.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, Phone,  MapPin, MessageCircle } from "lucide-react";

interface Numbers {
  mobile: string[];
  home: string[];
  work: string[];
  fax: string[];
  emergency: string[];
  whatsapp: string[];
}

interface Emails {
  name: string;
  email: string;
}

interface SocialMedia {
  facebook: string[];
  youtube: string[];
  instagram: string[];
  twitter: string[];
  linkedin: string[];
  snapchat: string[];
  tiktok: string[];
  github: string[];
  discord: string[];
  reddit: string[];
  telegram: string[];
  medium: string[];
  threads: string[];
  pinterest: string[];
}

interface Websites {
  name: string;
  domain: string;
}

const AddContactInfo: React.FC = () => {
  const [formData, setFormData] = useState<Omit<IContact, '_id' | 'createdAt' | 'updatedAt'>>({
    numbers: [{
      mobile: [],
      home: [],
      work: [],
      fax: [],
      emergency: [],
      whatsapp: []
    }],
    emails: {
      name: '',
      email: ''
    },
    socialMedia: {
      facebook: [],
      youtube: [],
      instagram: [],
      twitter: [],
      linkedin: [],
      snapchat: [],
      tiktok: [],
      github: [],
      discord: [],
      reddit: [],
      telegram: [],
      medium: [],
      threads: [],
      pinterest: []
    },
    addresses: [],
    websites: {
      name: '',
      domain: ''
    }
  });

  const [newMobile, setNewMobile] = useState('');
  const [newHome, setNewHome] = useState('');
  const [newWork, setNewWork] = useState('');
  const [newFax, setNewFax] = useState('');
  const [newEmergency, setNewEmergency] = useState('');
  const [newWhatsapp, setNewWhatsapp] = useState('');
  const [newAddress, setNewAddress] = useState('');
  
  const [socialMediaInputs, setSocialMediaInputs] = useState<Record<keyof SocialMedia, string>>({
    facebook: '',
    youtube: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    snapchat: '',
    tiktok: '',
    github: '',
    discord: '',
    reddit: '',
    telegram: '',
    medium: '',
    threads: '',
    pinterest: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleEmailChange = (field: keyof Emails, value: string) => {
    setFormData(prev => ({
      ...prev,
      emails: {
        ...prev.emails,
        [field]: value
      }
    }));
  };

const handleWebsiteChange = (field: keyof Websites, value: string) => {
  setFormData((prev:any) => ({
    ...prev,
    websites: {
      ...prev.websites,
      [field]: value as string
    }
  }));
};


const addNumber = (
  type: keyof Numbers,
  value: string,
  setValue: (val: string) => void
) => {
  if (value.trim() === '') return;

  setFormData(prev => {
    const newNumbers = [...prev.numbers];

    if (newNumbers.length === 0) {
      newNumbers.push({
        mobile: [],
        home: [],
        work: [],
        fax: [],
        emergency: [],
        whatsapp: [],
      });
    }

    // Ensure the type array exists
    const currentTypeArray = newNumbers[0][type] ?? [];
    newNumbers[0] = {
      ...newNumbers[0],
      [type]: [...currentTypeArray, value.trim()],
    };

    return { ...prev, numbers: newNumbers };
  });

  setValue('');
};

const removeNumber = (type: keyof Numbers, index: number) => {
  setFormData(prev => {
    const newNumbers = [...prev.numbers];
    if (newNumbers.length > 0) {
      const currentTypeArray = newNumbers[0][type] ?? [];
      newNumbers[0] = {
        ...newNumbers[0],
        [type]: currentTypeArray.filter((_, i) => i !== index),
      };
    }
    return { ...prev, numbers: newNumbers };
  });
};


  const addAddress = () => {
    if (newAddress.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      addresses: [...prev.addresses, newAddress.trim()]
    }));
    
    setNewAddress('');
  };

  const removeAddress = (index: number) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index)
    }));
  };

  const handleSocialMediaInputChange = (platform: keyof SocialMedia, value: string) => {
    setSocialMediaInputs(prev => ({
      ...prev,
      [platform]: value
    }));
  };

const addSocialMediaLink = (platform: keyof SocialMedia) => {
  const value = socialMediaInputs[platform];
  if (value.trim() === '') return;

  setFormData(prev => {
    const newSocialMedia = { ...prev.socialMedia };
    const currentLinks = newSocialMedia[platform] ?? [];
    newSocialMedia[platform] = [...currentLinks, value.trim()];
    return { ...prev, socialMedia: newSocialMedia };
  });

  setSocialMediaInputs(prev => ({
    ...prev,
    [platform]: ''
  }));
};

const removeSocialMediaLink = (platform: keyof SocialMedia, index: number) => {
  setFormData(prev => {
    const newSocialMedia = { ...prev.socialMedia };
    const currentLinks = newSocialMedia[platform] ?? [];
    newSocialMedia[platform] = currentLinks.filter((_, i) => i !== index);
    return { ...prev, socialMedia: newSocialMedia };
  });
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/v2/contact-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create contact info');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        numbers: [{
          mobile: [],
          home: [],
          work: [],
          fax: [],
          emergency: [],
          whatsapp: []
        }],
        emails: {
          name: '',
          email: ''
        },
        socialMedia: {
          facebook: [],
          youtube: [],
          instagram: [],
          twitter: [],
          linkedin: [],
          snapchat: [],
          tiktok: [],
          github: [],
          discord: [],
          reddit: [],
          telegram: [],
          medium: [],
          threads: [],
          pinterest: []
        },
        addresses: [],
        websites: {
          name: '',
          domain: ''
        }
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
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Add Contact Information
        </CardTitle>
        <CardDescription>Create a new contact information entry</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="p-3 bg-green-100 text-green-800 rounded-md">
              Contact information added successfully!
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}

          <Tabs defaultValue="numbers" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="numbers">Numbers</TabsTrigger>
              <TabsTrigger value="emails">Emails</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="websites">Websites</TabsTrigger>
            </TabsList>

            <TabsContent value="numbers" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mobile Numbers</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newMobile}
                      onChange={(e) => setNewMobile(e.target.value)}
                      placeholder="Enter mobile number"
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={() => addNumber('mobile', newMobile, setNewMobile)}
                      size="sm"
                      variant="outline"
                      disabled={!newMobile.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {(formData.numbers[0]?.mobile ?? []).map((mobile, index) => (
  <Badge key={index} variant="secondary" className="flex items-center gap-1">
    <Phone className="h-3 w-3" />
    {mobile}
    <button
      type="button"
      onClick={() => removeNumber('mobile', index)}
      className="ml-1 text-gray-500 hover:text-gray-700"
    >
      <Trash2 className="h-3 w-3" />
    </button>
  </Badge>
))}

                </div>
                
                <div className="space-y-2">
                  <Label>Home Numbers</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newHome}
                      onChange={(e) => setNewHome(e.target.value)}
                      placeholder="Enter home number"
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={() => addNumber('home', newHome, setNewHome)}
                      size="sm"
                      variant="outline"
                      disabled={!newHome.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {(formData.numbers[0]?.home ?? []).map((home, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {home}
                      <button
                        type="button"
                        onClick={() => removeNumber('home', index)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label>Work Numbers</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newWork}
                      onChange={(e) => setNewWork(e.target.value)}
                      placeholder="Enter work number"
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={() => addNumber('work', newWork, setNewWork)}
                      size="sm"
                      variant="outline"
                      disabled={!newWork.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {(formData.numbers[0]?.work ?? []).map((work, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {work}
                      <button
                        type="button"
                        onClick={() => removeNumber('work', index)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label>Fax Numbers</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newFax}
                      onChange={(e) => setNewFax(e.target.value)}
                      placeholder="Enter fax number"
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={() => addNumber('fax', newFax, setNewFax)}
                      size="sm"
                      variant="outline"
                      disabled={!newFax.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {(formData.numbers[0]?.fax ?? []).map((fax, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {fax}
                      <button
                        type="button"
                        onClick={() => removeNumber('fax', index)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label>Emergency Numbers</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newEmergency}
                      onChange={(e) => setNewEmergency(e.target.value)}
                      placeholder="Enter emergency number"
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={() => addNumber('emergency', newEmergency, setNewEmergency)}
                      size="sm"
                      variant="outline"
                      disabled={!newEmergency.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {(formData.numbers[0]?.emergency ?? []).map((emergency, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {emergency}
                      <button
                        type="button"
                        onClick={() => removeNumber('emergency', index)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label>WhatsApp Numbers</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newWhatsapp}
                      onChange={(e) => setNewWhatsapp(e.target.value)}
                      placeholder="Enter WhatsApp number"
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={() => addNumber('whatsapp', newWhatsapp, setNewWhatsapp)}
                      size="sm"
                      variant="outline"
                      disabled={!newWhatsapp.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {(formData.numbers[0]?.whatsapp ?? []).map((whatsapp, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {whatsapp}
                      <button
                        type="button"
                        onClick={() => removeNumber('whatsapp', index)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="emails" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emailName">Name</Label>
                  <Input
                    id="emailName"
                    value={formData.emails.name}
                    onChange={(e) => handleEmailChange('name', e.target.value)}
                    placeholder="Enter name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailAddress">Email Address</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    value={formData.emails.email}
                    onChange={(e) => handleEmailChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(formData.socialMedia).map((platform) => (
                  <div key={platform} className="space-y-2">
                    <Label className="capitalize">{platform}</Label>
                    <div className="flex gap-2">
                      <Input
                        value={socialMediaInputs[platform as keyof SocialMedia]}
                        onChange={(e) => handleSocialMediaInputChange(platform as keyof SocialMedia, e.target.value)}
                        placeholder={`Enter ${platform} URL`}
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        onClick={() => addSocialMediaLink(platform as keyof SocialMedia)}
                        size="sm"
                        variant="outline"
                        disabled={!socialMediaInputs[platform as keyof SocialMedia].trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(formData.socialMedia[platform as keyof SocialMedia] ?? []).map((link, index) => (
  <Badge key={index} variant="secondary" className="flex items-center gap-1">
    {link}
    <button
      type="button"
      onClick={() => removeSocialMediaLink(platform as keyof SocialMedia, index)}
      className="ml-1 text-gray-500 hover:text-gray-700"
    >
      <Trash2 className="h-3 w-3" />
    </button>
  </Badge>
))}

                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="addresses" className="space-y-4">
              <div className="space-y-2">
                <Label>Addresses</Label>
                <div className="flex gap-2">
                  <Textarea
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="Enter address"
                    className="flex-1"
                    rows={2}
                  />
                  <Button 
                    type="button" 
                    onClick={addAddress}
                    size="sm"
                    variant="outline"
                    disabled={!newAddress.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.addresses.map((address, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{address}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAddress(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="websites" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="websiteName">Website Name</Label>
                  <Input
                    id="websiteName"
                    value={formData.websites?.name || ''}
                    onChange={(e) => handleWebsiteChange('name', e.target.value)}
                    placeholder="Enter website name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="websiteDomain">Domain</Label>
                  <Input
                    id="websiteDomain"
                    value={formData?.websites?.domain}
                    onChange={(e) => handleWebsiteChange('domain', e.target.value)}
                    placeholder="Enter domain (e.g., example.com)"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Creating...' : 'Add Contact Information'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddContactInfo;