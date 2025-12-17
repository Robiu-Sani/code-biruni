/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format, parseISO } from 'date-fns';
import { PlusCircle, Trash2, Loader2, ArrowLeft } from 'lucide-react';
import { IProject } from "interface/project.interface";
import MultipleImageUpload from 'default/MultipleImageUpload';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import { toast } from 'sonner';

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

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  
  // Project states
  const [name, setName] = useState('');
  const [mainDomain, setMainDomain] = useState('');
  const [domains, setDomains] = useState<string[]>(['']);
  const [defaultDomains, setDefaultDomains] = useState<string[]>(['']);
  const [githubLinks, setGithubLinks] = useState<string[]>(['']);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [providedServices, setProvidedServices] = useState('');
  const [description, setDescription] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  
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
  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState('');

  // Fetch project data on component mount
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/v2/project/action/${id}`);
        
        if (response.data.success && response.data.data) {
          const project = response.data.data;
          
          // Set basic information
          setName(project.name || '');
          setMainDomain(project.mainDomain || '');
          setDomains(project.domains?.length > 0 ? project.domains : ['']);
          setDefaultDomains(project.defaultDomains?.length > 0 ? project.defaultDomains : ['']);
          setGithubLinks(project.githubLinks?.length > 0 ? project.githubLinks : ['']);
          setDate(project.date ? parseISO(project.date) : new Date());
          setProvidedServices(project.providedServices || '');
          setDescription(project.description || '');
          setIsDeleted(project.isDeleted || false);
          
          // Set arrays of objects
          setContacts(project.contacts?.length > 0 ? project.contacts : [{ name: '', method: '', way: '', numbers: [''] }]);
          setHostService(project.hostDervice?.length > 0 ? project.hostDervice : [{ name: '', email: '', password: '' }]);
          setDomainService(project.domainService?.length > 0 ? project.domainService : [{ name: '', email: '', password: '' }]);
          setRenualAmount(project.renualAmount?.length > 0 ? project.renualAmount : [{ service: '', amount: 0 }]);
          
          // Set simple arrays
          setAddress(project.address?.length > 0 ? project.address : ['']);
          
          // Set images
          setImages(project.images || []);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project data');
        router.push('/dashboard/admin/projects');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjectData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router, toast]);

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
      if (prev.length <= 1) return ['']; // Keep at least one empty field
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
    } else {
      // Reset to empty if only one contact
      setContacts([{ name: '', method: '', way: '', numbers: [''] }]);
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
      if (prev.length <= 1) return [{ name: '', email: '', password: '' }];
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
    } else {
      setRenualAmount([{ service: '', amount: 0 }]);
    }
  };

  // Handle form submission - UPDATE instead of CREATE
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
        contacts: contacts.filter(contact => contact.name.trim() !== '' || contact.method.trim() !== '' || contact.way.trim() !== ''),
        hostDervice: hostService.filter(service => service.name.trim() !== '' || service.email.trim() !== '' || service.password.trim() !== ''),
        domainService: domainService.filter(service => service.name.trim() !== '' || service.email.trim() !== '' || service.password.trim() !== ''),
        address: address.filter(addr => addr.trim() !== ''),
        date: date || new Date(),
        providedServices,
        renualAmount: renualAmount.filter(item => item.service.trim() !== ''),
        images,
        description,
        isDeleted,
      };

      // Use PUT for update
      const response = await axios.patch(`/api/v2/project/action/${id}`, projectData);
      
      if (response.data.success) {
        toast.success('Project updated successfully');
        
        // Redirect back to projects list after a short delay
        setTimeout(() => {
          router.push('/dashboard/admin/project');
        }, 1500);
      } else {
        throw new Error(response.data.message || 'Failed to update project');
      }
    } catch (error: any) {
      console.error('Error updating project:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update project. Please try again.';
      setSubmitError(errorMessage);
      toast.error('Failed to update project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Loading Project...</CardTitle>
            <CardDescription>Please wait while we fetch project data</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard/admin/projects')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Edit Project</h1>
            <p className="text-muted-foreground">
              Update project details and configurations
            </p>
          </div>
          <Badge variant={isDeleted ? "destructive" : "default"}>
            {isDeleted ? "Deleted" : "Active"}
          </Badge>
        </div>
      </div>
      
      {submitError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>{name || 'Edit Project'}</CardTitle>
          <CardDescription>
            Update the project details below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="w-full">
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
                        setDate(value ? parseISO(value) : new Date());
                      }}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 flex items-center justify-between">
                    <Label htmlFor="isDeleted">Project Status</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isDeleted"
                        checked={isDeleted}
                        onCheckedChange={setIsDeleted}
                      />
                      <Label htmlFor="isDeleted" className="cursor-pointer">
                        {isDeleted ? 'Mark as Active' : 'Mark as Deleted'}
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="providedServices">Provided Services *</Label>
                  <Textarea
                    id="providedServices"
                    value={providedServices}
                    onChange={(e) => setProvidedServices(e.target.value)}
                    required
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={6}
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
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Domain
                    </Button>
                  </div>
                  
                  {domains.map((domain, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={domain}
                        onChange={(e) => handleArrayChange(index, e.target.value, setDomains)}
                        placeholder="Domain name (e.g., example.com)"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayField(index, setDomains)}
                        disabled={domains.length <= 1 && domain === ''}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Domain
                    </Button>
                  </div>
                  
                  {defaultDomains.map((domain, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={domain}
                        onChange={(e) => handleArrayChange(index, e.target.value, setDefaultDomains)}
                        placeholder="Default domain URL"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayField(index, setDefaultDomains)}
                        disabled={defaultDomains.length <= 1 && domain === ''}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Link
                    </Button>
                  </div>
                  
                  {githubLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={link}
                        onChange={(e) => handleArrayChange(index, e.target.value, setGithubLinks)}
                        placeholder="GitHub repository URL"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayField(index, setGithubLinks)}
                        disabled={githubLinks.length <= 1 && link === ''}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Address
                    </Button>
                  </div>
                  
                  {address.map((addr, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={addr}
                        onChange={(e) => handleArrayChange(index, e.target.value, setAddress)}
                        placeholder="Physical address"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayField(index, setAddress)}
                        disabled={address.length <= 1 && addr === ''}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
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
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeContact(contactIndex)}
                            disabled={contacts.length <= 1 && contact.name === '' && contact.method === '' && contact.way === ''}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
                            <Label>Phone Numbers</Label>
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
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeContactNumber(contactIndex, numberIndex)}
                                disabled={contact.numbers.length <= 1 && number === ''}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
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
                      
                      <div className="md:col-span-2 flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRenualAmount(index)}
                          disabled={renualAmount.length <= 1 && item.service === '' && item.amount === 0}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
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
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeServiceCredential(index, setHostService)}
                            disabled={hostService.length <= 1 && service.name === '' && service.email === '' && service.password === ''}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`host-name-${index}`}>Service Name/URL</Label>
                            <Input
                              id={`host-name-${index}`}
                              value={service.name}
                              onChange={(e) => handleServiceCredentialChange(index, 'name', e.target.value, setHostService)}
                              placeholder="Service name or URL"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`host-email-${index}`}>Email</Label>
                            <Input
                              id={`host-email-${index}`}
                              type="email"
                              value={service.email}
                              onChange={(e) => handleServiceCredentialChange(index, 'email', e.target.value, setHostService)}
                              placeholder="Email address"
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
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeServiceCredential(index, setDomainService)}
                            disabled={domainService.length <= 1 && service.name === '' && service.email === '' && service.password === ''}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`domain-name-${index}`}>Service Name/URL</Label>
                            <Input
                              id={`domain-name-${index}`}
                              value={service.name}
                              onChange={(e) => handleServiceCredentialChange(index, 'name', e.target.value, setDomainService)}
                              placeholder="Service name or URL"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`domain-email-${index}`}>Email</Label>
                            <Input
                              id={`domain-email-${index}`}
                              type="email"
                              value={service.email}
                              onChange={(e) => handleServiceCredentialChange(index, 'email', e.target.value, setDomainService)}
                              placeholder="Email address"
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
              </TabsContent>
              
              {/* Media Tab */}
              <TabsContent value="media" className="space-y-6">
                <div className="space-y-4">
                  <Label>Project Images</Label>
                  <MultipleImageUpload 
                    onUpload={(urls: string[]) => setImages(urls)} 
                    initialImages={images}
                  />
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-md overflow-hidden border">
                            <Image width={150} height={150}
                              src={image} 
                              alt={`Project image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const newImages = [...images];
                              newImages.splice(index, 1);
                              setImages(newImages);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          <Badge 
                            variant="secondary" 
                            className="absolute bottom-2 left-2 text-xs"
                          >
                            {index + 1}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.push('/dashboard/admin/projects')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="min-w-[150px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Project'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}