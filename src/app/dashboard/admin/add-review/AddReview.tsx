'use client'
import React, { useState } from 'react';
import { IReview } from "interface/review.interface";
import SingleImageUpload from 'default/SingleImageUpload';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";



const AddReview: React.FC = () => {
  const [formData, setFormData] = useState<Omit<IReview, '_id' | 'createdAt' | 'updatedAt'>>({
    projectName: '',
    name: '',
    position: '',
    description: '',
    domain: '',
    image: '',
    project: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [imageUploadStatus, setImageUploadStatus] = useState<"success" | "error" | null>(null);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const handleImageUpload = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  const handleImageStatusChange = (status: "success" | "error" | null) => {
    setImageUploadStatus(status);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/v2/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create review');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        projectName: '',
        name: '',
        position: '',
        description: '',
        domain: '',
        image: '',
        project: null
      });
      setImageUploadStatus(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl my-8 mx-auto">
      <CardHeader>
        <CardTitle>Add New Review</CardTitle>
        <CardDescription>Create a new client review for your projects</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="p-3 bg-green-100 text-green-800 rounded-md flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Review added successfully!
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-md flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Enter project name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Client Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter client name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Enter position"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Input
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                placeholder="Enter domain"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Review</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter review description"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Client Image</Label>
            <SingleImageUpload 
              onUpload={handleImageUpload} 
              onStatusChange={handleImageStatusChange}
            />
            {imageUploadStatus === "success" && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Image uploaded successfully!</span>
              </div>
            )}
            {imageUploadStatus === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <XCircle className="w-4 h-4" />
                <span>Error uploading image</span>
              </div>
            )}
          </div>


          <Button 
            type="submit" 
            disabled={isSubmitting || !formData.image}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Review...
              </>
            ) : (
              'Add Review'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddReview;