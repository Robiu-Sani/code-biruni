'use client'
import React, { useState } from 'react';
import { ICaseStudies } from "interface/caseStudies.interface";
import MultipleImageUpload from 'default/MultipleImageUpload';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileImage, CheckCircle2, XCircle } from "lucide-react";

const AddCaseStudies: React.FC = () => {
  const [formData, setFormData] = useState<Omit<ICaseStudies, '_id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    images: [],
    descrition: ''
  });

  const [isLoading, setIsLoading] = useState(false);
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
      const response = await fetch('/api/v2/case-studies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create case study');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        images: [],
        descrition: ''
      });
      setImageUploadStatus(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full my-8 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileImage className="h-5 w-5" />
          Add New Case Study
        </CardTitle>
        <CardDescription>Create a new case study for your portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="p-3 bg-green-100 text-green-800 rounded-md flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Case study added successfully!
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-md flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Case Study Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter case study name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descrition">Description</Label>
            <Textarea
              id="descrition"
              name="descrition"
              value={formData.descrition}
              onChange={handleInputChange}
              placeholder="Enter case study description"
              rows={4}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Images</Label>
            <MultipleImageUpload
  onUpload={handleImagesChange}  // matches `onUpload` prop
  initialImages={formData.images} // optional initial images
/>
            
            {imageUploadStatus === "success" && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Images uploaded successfully!</span>
              </div>
            )}
            
            {imageUploadStatus === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <XCircle className="w-4 h-4" />
                <span>Error uploading images</span>
              </div>
            )}
            
            {formData.images.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Uploaded Images ({formData.images.length})</p>
                <div className="flex flex-wrap gap-2">
                  {formData.images.map((image, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      Image {index + 1}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || formData.images.length === 0}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Case Study...
              </>
            ) : (
              'Add Case Study'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCaseStudies;