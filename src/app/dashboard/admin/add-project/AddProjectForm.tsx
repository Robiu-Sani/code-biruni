'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import {  PlusCircle, Trash2 } from 'lucide-react';
import { IProject } from "interface/project.interface";
import MultipleImageUpload from 'default/MultipleImageUpload';
import axios from 'axios';

interface Contact {
  name: string;
  method: string;
  way: string;
  numbers: string[];
}

interface ServiceCredential {
  name: string;
  email: string;
  password: string;
}

interface RenualAmount {
  service: string;
  amount: number;
}

export default function AddProjectForm() {
  // Basic project information
  const [name, setName] = useState('');
  const [mainDomain, setMainDomain] = useState('');
  const [domains, setDomains] = useState<string[]>(['']);
  const [defaultDomains, setDefaultDomains] = useState<string[]>(['']);
  const [githubLinks, setGithubLinks] = useState<string[]>(['']);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [providedServices, setProvidedServices] = useState('');
  const [description, setDescription] = useState('');
  const [positionPoient, setPositionPoient] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("basic");


  
  // Arrays of objects
  const [contacts, setContacts] = useState<Contact[]>([{ name: '', method: '', way: '', numbers: [''] }]);
  const [hostService, setHostService] = useState<ServiceCredential[]>([{ name: '', email: '', password: '' }]);
  const [domainService, setDomainService] = useState<ServiceCredential[]>([{ name: '', email: '', password: '' }]);
  const [renualAmount, setRenualAmount] = useState<RenualAmount[]>([{ service: '', amount: 0 }]);
  
  // Simple arrays
  const [address, setAddress] = useState<string[]>(['']);
  
  // Images
  const [images, setImages] = useState<string[]>([]);
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle array field changes
  const handleArrayChange = (
  index: number,
  value: string,
  setter: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setter(prev => {
    const newArray = [...prev];
    newArray[index] = value;
    return newArray;
  });
};

const tabs = ["basic", "services", "credentials", "media"];

const goToNextTab = () => {
  const currentIndex = tabs.indexOf(activeTab);
  if (currentIndex < tabs.length - 1) {
    setActiveTab(tabs[currentIndex + 1]);
  }
};



  const addArrayField = (
  setter: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setter(prev => [...prev, '']);
};


  const removeArrayField = (
  index: number,
  setter: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setter(prev => {
    if (prev.length <= 1) return prev;
    const newArray = [...prev];
    newArray.splice(index, 1);
    return newArray;
  });
};


  // Handle contact changes
  const handleContactChange = (index: number, field: keyof Contact, value: string | string[]) => {
    const newContacts = [...contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setContacts(newContacts);
  };

  const handleContactNumberChange = (contactIndex: number, numberIndex: number, value: string) => {
    const newContacts = [...contacts];
    const newNumbers = [...newContacts[contactIndex].numbers];
    newNumbers[numberIndex] = value;
    newContacts[contactIndex].numbers = newNumbers;
    setContacts(newContacts);
  };

  const addContact = () => {
    setContacts([...contacts, { name: '', method: '', way: '', numbers: [''] }]);
  };

  const removeContact = (index: number) => {
    if (contacts.length > 1) {
      const newContacts = [...contacts];
      newContacts.splice(index, 1);
      setContacts(newContacts);
    }
  };

  const addContactNumber = (contactIndex: number) => {
    const newContacts = [...contacts];
    newContacts[contactIndex].numbers = [...newContacts[contactIndex].numbers, ''];
    setContacts(newContacts);
  };

  const removeContactNumber = (contactIndex: number, numberIndex: number) => {
    const newContacts = [...contacts];
    if (newContacts[contactIndex].numbers.length > 1) {
      const newNumbers = [...newContacts[contactIndex].numbers];
      newNumbers.splice(numberIndex, 1);
      newContacts[contactIndex].numbers = newNumbers;
      setContacts(newContacts);
    }
  };

  // Handle service credential changes
  const handleServiceCredentialChange = (
  index: number,
  field: keyof ServiceCredential,
  value: string,
  setter: React.Dispatch<React.SetStateAction<ServiceCredential[]>>
) => {
  setter(prev => {
    const newArray = [...prev];
    newArray[index] = { ...newArray[index], [field]: value };
    return newArray;
  });
};


  const addServiceCredential = (
  setter: React.Dispatch<React.SetStateAction<ServiceCredential[]>>
) => {
  setter(prev => [...prev, { name: '', email: '', password: '' }]);
};


  const removeServiceCredential = (
  index: number,
  setter: React.Dispatch<React.SetStateAction<ServiceCredential[]>>
) => {
  setter(prev => {
    if (prev.length <= 1) return prev;
    const newArray = [...prev];
    newArray.splice(index, 1);
    return newArray;
  });
};


  // Handle renewal amount changes
  const handleRenualAmountChange = (index: number, field: keyof RenualAmount, value: string | number) => {
    const newArray = [...renualAmount];
    newArray[index] = { ...newArray[index], [field]: value };
    setRenualAmount(newArray);
  };

  const addRenualAmount = () => {
    setRenualAmount([...renualAmount, { service: '', amount: 0 }]);
  };

  const removeRenualAmount = (index: number) => {
    if (renualAmount.length > 1) {
      const newArray = [...renualAmount];
      newArray.splice(index, 1);
      setRenualAmount(newArray);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const projectData: Partial<IProject> = {
        name,
        mainDomain,
        domains: domains.filter(domain => domain.trim() !== ''),
        defaultDomains: defaultDomains.filter(domain => domain.trim() !== ''),
        githubLinks: githubLinks.filter(link => link.trim() !== ''),
        contacts: contacts.filter(contact => contact.name.trim() !== ''),
        hostService: hostService.filter(service => service.name.trim() !== ''),
        domainService: domainService.filter(service => service.name.trim() !== ''),
        address: address.filter(addr => addr.trim() !== ''),
        date: date || new Date(),
        providedServices,
        positionPoient,
        renualAmount: renualAmount.filter(item => item.service.trim() !== ''),
        images,
        description,
        isDeleted: false,
      };

      const response = await axios.post('/api/v2/project', projectData);
      
      if (response.status === 201) {
        setSubmitSuccess(true);
        // Reset form
        setName('');
        setMainDomain('');
        setDomains(['']);
        setDefaultDomains(['']);
        setGithubLinks(['']);
        setDate(new Date());
        setProvidedServices('');
        setDescription('');
        setContacts([{ name: '', method: '', way: '', numbers: [''] }]);
        setHostService([{ name: '', email: '', password: '' }]);
        setDomainService([{ name: '', email: '', password: '' }]);
        setAddress(['']);
        setRenualAmount([{ service: '', amount: 0 }]);
        setImages([]);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setSubmitError('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
          <CardDescription>
            Fill in the details to create a new project
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitSuccess ? (
            <div className="bg-green-50 text-green-800 p-4 rounded-md mb-6">
              Project created successfully!
            </div>
          ) : null}
          
          {submitError ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
              {submitError}
            </div>
          ) : null}
          
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="credentials">Credentials</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
              </TabsList>
              
              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mainDomain">Main Domain *</Label>
                    <Input
                      id="mainDomain"
                      value={mainDomain}
                      onChange={(e) => setMainDomain(e.target.value)}
                      required
                    />
                  </div>
                  
                 <div className="space-y-2">
  <Label htmlFor="date">Project Date *</Label>
  <Input
    id="date"
    type="date"
    value={date ? format(date, "yyyy-MM-dd") : ""}
    onChange={(e) => {
      const value = e.target.value;
      setDate(value ? new Date(value) : undefined);
    }}
    required
  />
</div>

<div className="space-y-2">
  <Label htmlFor="positionPoient">Position Point</Label>
  <Input
    id="positionPoient"
    type="number"
    value={positionPoient}
    onChange={(e) => setPositionPoient(Number(e.target.value))}
    placeholder="Enter position point"
  />
</div>


                  
                  <div className="space-y-2">
                    <Label htmlFor="providedServices">Provided Services *</Label>
                    <Textarea
                      id="providedServices"
                      value={providedServices}
                      onChange={(e) => setProvidedServices(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Domains</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField(setDomains)}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  {domains.map((domain, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={domain}
                        onChange={(e) => handleArrayChange(index, e.target.value, setDomains)}
                        placeholder="Domain name"
                      />
                      {domains.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayField(index, setDomains)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Default Domains</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField(setDefaultDomains)}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  {defaultDomains.map((domain, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={domain}
                        onChange={(e) => handleArrayChange(index, e.target.value, setDefaultDomains)}
                        placeholder="Default domain"
                      />
                      {defaultDomains.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayField(index, setDefaultDomains)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>GitHub Links</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField(setGithubLinks)}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  {githubLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={link}
                        onChange={(e) => handleArrayChange(index, e.target.value, setGithubLinks)}
                        placeholder="GitHub repository URL"
                      />
                      {githubLinks.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayField(index, setGithubLinks)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Address</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField(setAddress)}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  {address.map((addr, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={addr}
                        onChange={(e) => handleArrayChange(index, e.target.value, setAddress)}
                        placeholder="Address"
                      />
                      {address.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayField(index, setAddress)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
  <Button type="button" onClick={goToNextTab}>
    Next
  </Button>
</div>

              </TabsContent>
              
              {/* Services Tab */}
              <TabsContent value="services" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Contacts</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addContact}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Contact
                    </Button>
                  </div>
                  
                  {contacts.map((contact, contactIndex) => (
                    <Card key={contactIndex}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Contact {contactIndex + 1}</CardTitle>
                          {contacts.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeContact(contactIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`contact-name-${contactIndex}`}>Name</Label>
                            <Input
                              id={`contact-name-${contactIndex}`}
                              value={contact.name}
                              onChange={(e) => handleContactChange(contactIndex, 'name', e.target.value)}
                              placeholder="Contact name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`contact-method-${contactIndex}`}>Method</Label>
                            <Input
                              id={`contact-method-${contactIndex}`}
                              value={contact.method}
                              onChange={(e) => handleContactChange(contactIndex, 'method', e.target.value)}
                              placeholder="Contact method"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`contact-way-${contactIndex}`}>Way</Label>
                            <Input
                              id={`contact-way-${contactIndex}`}
                              value={contact.way}
                              onChange={(e) => handleContactChange(contactIndex, 'way', e.target.value)}
                              placeholder="Contact way"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label>Numbers</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addContactNumber(contactIndex)}
                            >
                              <PlusCircle className="h-4 w-4 mr-1" /> Add Number
                            </Button>
                          </div>
                          
                          {contact.numbers.map((number, numberIndex) => (
                            <div key={numberIndex} className="flex items-center gap-2">
                              <Input
                                value={number}
                                onChange={(e) => handleContactNumberChange(contactIndex, numberIndex, e.target.value)}
                                placeholder="Phone number"
                              />
                              {contact.numbers.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeContactNumber(contactIndex, numberIndex)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Renewal Amounts</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addRenualAmount}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Renewal
                    </Button>
                  </div>
                  
                  {renualAmount.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`service-${index}`}>Service</Label>
                        <Input
                          id={`service-${index}`}
                          value={item.service}
                          onChange={(e) => handleRenualAmountChange(index, 'service', e.target.value)}
                          placeholder="Service name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`amount-${index}`}>Amount</Label>
                        <Input
                          id={`amount-${index}`}
                          type="number"
                          value={item.amount}
                          onChange={(e) => handleRenualAmountChange(index, 'amount', Number(e.target.value))}
                          placeholder="Amount"
                        />
                      </div>
                      
                      {renualAmount.length > 1 && (
                        <div className="md:col-span-2 flex justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRenualAmount(index)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
  <Button type="button" onClick={goToNextTab}>
    Next
  </Button>
</div>

              </TabsContent>
              
              {/* Credentials Tab */}
              <TabsContent value="credentials" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Host Service Credentials</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addServiceCredential(setHostService)}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Credential
                    </Button>
                  </div>
                  
                  {hostService.map((service, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Host Service {index + 1}</CardTitle>
                          {hostService.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeServiceCredential(index, setHostService)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`host-name-${index}`}>Name</Label>
                            <Input
                              id={`host-name-${index}`}
                              value={service.name}
                              onChange={(e) => handleServiceCredentialChange(index, 'name', e.target.value, setHostService)}
                              placeholder="Service name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`host-email-${index}`}>Email</Label>
                            <Input
                              id={`host-email-${index}`}
                              type="email"
                              value={service.email}
                              onChange={(e) => handleServiceCredentialChange(index, 'email', e.target.value, setHostService)}
                              placeholder="Email"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`host-password-${index}`}>Password</Label>
                            <Input
                              id={`host-password-${index}`}
                              type="password"
                              value={service.password}
                              onChange={(e) => handleServiceCredentialChange(index, 'password', e.target.value, setHostService)}
                              placeholder="Password"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Domain Service Credentials</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addServiceCredential(setDomainService)}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Credential
                    </Button>
                  </div>
                  
                  {domainService.map((service, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Domain Service {index + 1}</CardTitle>
                          {domainService.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeServiceCredential(index, setDomainService)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`domain-name-${index}`}>Name</Label>
                            <Input
                              id={`domain-name-${index}`}
                              value={service.name}
                              onChange={(e) => handleServiceCredentialChange(index, 'name', e.target.value, setDomainService)}
                              placeholder="Service name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`domain-email-${index}`}>Email</Label>
                            <Input
                              id={`domain-email-${index}`}
                              type="email"
                              value={service.email}
                              onChange={(e) => handleServiceCredentialChange(index, 'email', e.target.value, setDomainService)}
                              placeholder="Email"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`domain-password-${index}`}>Password</Label>
                            <Input
                              id={`domain-password-${index}`}
                              type="password"
                              value={service.password}
                              onChange={(e) => handleServiceCredentialChange(index, 'password', e.target.value, setDomainService)}
                              placeholder="Password"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
  <Button type="button" onClick={goToNextTab}>
    Next
  </Button>
</div>

              </TabsContent>
              
              {/* Media Tab */}
              <TabsContent value="media" className="space-y-6">
                <div className="space-y-4">
                  <Label>Project Images</Label>
                  <MultipleImageUpload 
                    onUpload={(urls: string[]) => setImages(urls)} 
                    initialImages={images}
                  />
                  <div className="flex flex-wrap gap-2">
                    {images.map((image, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        Image {index + 1}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0"
                          onClick={() => {
                            const newImages = [...images];
                            newImages.splice(index, 1);
                            setImages(newImages);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                  {activeTab === "media" && (
  <div className="mt-8 flex justify-end">
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Creating Project...' : 'Create Project'}
    </Button>
  </div>
)}

              </TabsContent>
            </Tabs>
            
         

          </form>
        </CardContent>
      </Card>
    </div>
  );
}