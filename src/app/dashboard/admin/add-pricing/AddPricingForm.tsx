'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus } from "lucide-react";

interface ServiceItem {
  name: string;
  isProvied: boolean;
}

export interface IPricing {
  _id: string;
  name: string;
  title: string;
  amount: {
    prev: number;
    current: number;
    yearly: number;
  };
  amountType: 'monthly' | 'yearly';
  services: {
    name: string;
    isProvied: boolean;
  }[];
  baseText: string;
  createdAt: string;
  updatedAt: string;
}


const AddPricingForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<IPricing, '_id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    title: '',
    amount: {
      prev: 0,
      current: 0,
      yearly: 0
    },
    amountType: 'monthly',
    services: [],
    baseText: ''
  });

  const [newService, setNewService] = useState<ServiceItem>({
    name: '',
    isProvied: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('amount.')) {
      const field = name.split('.')[1] as 'prev' | 'current';
      setFormData(prev => ({
        ...prev,
        amount: {
          ...prev.amount,
          [field]: Number(value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewService(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addService = () => {
    if (newService.name.trim() === '') return;
    
    setFormData(prev => ({
  ...prev,
  services: [...prev.services, newService]
}));

    
    setNewService({
      name: '',
      isProvied: false
    });
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/v2/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create pricing plan');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        title: '',
        amount: {
          prev: 0,
          current: 0,
          yearly: 0
        },
        amountType: 'monthly',
        services: [],
        baseText: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full my-7 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Pricing Plan</CardTitle>
        <CardDescription>Create a new pricing plan for your services</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="p-3 bg-green-100 text-green-800 rounded-md">
              Pricing plan created successfully!
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Plan Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter plan name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Plan Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter plan title"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prevAmount">Previous Amount</Label>
              <Input
                id="prevAmount"
                name="amount.prev"
                type="number"
                value={formData.amount.prev}
                onChange={handleInputChange}
                placeholder="Previous price"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentAmount">Current Amount</Label>
              <Input
                id="currentAmount"
                name="amount.current"
                type="number"
                value={formData.amount.current}
                onChange={handleInputChange}
                placeholder="Current price"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearlyAmount">Yearly Amount</Label>
              <Input
                id="yearlyAmount"
                name="amount.yearly"
                type="number"
                value={formData.amount.yearly}
                onChange={handleInputChange}
                placeholder="Current price"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amountType">Amount Type</Label>
            <Select 
              value={formData.amountType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, amountType: value as 'monthly' | 'yearly' }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select billing cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Services</Label>
            <div className="flex gap-2">
              <Input
                name="name"
                value={newService.name}
                onChange={handleServiceChange}
                placeholder="Service name"
                className="flex-1"
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isProvied"
                  name="isProvied"
                  checked={newService.isProvied}
                  onCheckedChange={(checked) => 
                    setNewService(prev => ({ ...prev, isProvied: !!checked }))
                  }
                />
                <Label htmlFor="isProvied" className="text-sm">Provided</Label>
              </div>
              <Button 
                type="button" 
                onClick={addService}
                size="sm"
                variant="outline"
                disabled={!newService.name.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {formData.services.length > 0 && (
              <div className="border rounded-md divide-y">
                {formData.services.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-3">
                    <div className="flex items-center gap-2">
                      <span>{service.name}</span>
                      <Badge variant={service.isProvied ? "default" : "secondary"}>
                        {service.isProvied ? 'Provided' : 'Not Provided'}
                      </Badge>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeService(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseText">Base Text</Label>
            <Textarea
              id="baseText"
              name="baseText"
              value={formData.baseText}
              onChange={handleInputChange}
              placeholder="Enter description or base text"
              rows={3}
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Creating...' : 'Create Pricing Plan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPricingForm;