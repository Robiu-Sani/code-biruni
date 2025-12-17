'use client'
import React, { useState } from 'react';
import { ITemplate } from "interface/template.interface";
import MultipleImageUpload from 'default/MultipleImageUpload';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Link } from "lucide-react";

const AddTemplateForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<ITemplate, '_id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    demoLinks: [],
    description: '',
    services: [],
    facilities: [],
    images: []
  });

 


  const [newDemoLink, setNewDemoLink] = useState('');
  const [newService, setNewService] = useState('');
  const [newFacility, setNewFacility] = useState('');
  
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

  const addDemoLink = () => {
    if (newDemoLink.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      demoLinks: [...prev.demoLinks, newDemoLink.trim()]
    }));
    
    setNewDemoLink('');
  };

  const removeDemoLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      demoLinks: prev.demoLinks.filter((_, i) => i !== index)
    }));
  };

  const addService = () => {
    if (newService.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService.trim()]
    }));
    
    setNewService('');
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const addFacility = () => {
    if (newFacility.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      facilities: [...prev.facilities, newFacility.trim()]
    }));
    
    setNewFacility('');
  };

  const removeFacility = (index: number) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index)
    }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({
      ...prev,
      images
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/v2/template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create template');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        demoLinks: [],
        description: '',
        services: [],
        facilities: [],
        images: []
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Template</CardTitle>
        <CardDescription>Create a new template for your services</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="p-3 bg-green-100 text-green-800 rounded-md">
              Template created successfully!
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter template name"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Images</Label>
            <MultipleImageUpload
  onUpload={handleImagesChange}   // this is the function
  initialImages={[]}              // or some existing array of URLs
/>
          </div>

          <div className="space-y-4">
            <Label>Demo Links</Label>
            <div className="flex gap-2">
              <Input
                value={newDemoLink}
                onChange={(e) => setNewDemoLink(e.target.value)}
                placeholder="Enter demo link URL"
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={addDemoLink}
                size="sm"
                variant="outline"
                disabled={!newDemoLink.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {formData.demoLinks.length > 0 && (
              <div className="border rounded-md divide-y">
                {formData.demoLinks.map((link, index) => (
                  <div key={index} className="flex justify-between items-center p-3">
                    <div className="flex items-center gap-2">
                      <Link className="h-4 w-4 text-blue-500" />
                      <span className="truncate max-w-xs">{link}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDemoLink(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter template description"
              rows={4}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Services</Label>
            <div className="flex gap-2">
              <Input
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Enter service name"
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={addService}
                size="sm"
                variant="outline"
                disabled={!newService.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {formData.services.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.services.map((service, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {service}
                    <button
                      type="button"
                      onClick={() => removeService(index)}
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
            <Label>Facilities</Label>
            <div className="flex gap-2">
              <Input
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                placeholder="Enter facility name"
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={addFacility}
                size="sm"
                variant="outline"
                disabled={!newFacility.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {formData.facilities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.facilities.map((facility, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {facility}
                    <button
                      type="button"
                      onClick={() => removeFacility(index)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Creating...' : 'Create Template'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTemplateForm;