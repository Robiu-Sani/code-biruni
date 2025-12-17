'use client'
import React, { useState } from 'react';
import { ITargetClient } from "interface/targetClient.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Phone, Mail, MapPin } from "lucide-react";

const AddTargetClientForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<ITargetClient, '_id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    numbers: [],
    address: '',
    email: '',
    isContacted: false,
    isResponsed: false,
    isConfirmed: false
  });

  const [newNumber, setNewNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: keyof ITargetClient, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const addNumber = () => {
    if (newNumber.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      numbers: [...prev.numbers, newNumber.trim()]
    }));
    
    setNewNumber('');
  };

  const removeNumber = (index: number) => {
    setFormData(prev => ({
      ...prev,
      numbers: prev.numbers.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/v2/target-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add target client');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        numbers: [],
        address: '',
        email: '',
        isContacted: false,
        isResponsed: false,
        isConfirmed: false
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full my-8 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add Target Client</CardTitle>
        <CardDescription>Add a new potential client to your database</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="p-3 bg-green-100 text-green-800 rounded-md">
              Target client added successfully!
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}

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

          <div className="space-y-4">
            <Label>Phone Numbers</Label>
            <div className="flex gap-2">
              <Input
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
                placeholder="Enter phone number"
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={addNumber}
                size="sm"
                variant="outline"
                disabled={!newNumber.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {formData.numbers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.numbers.map((number, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {number}
                    <button
                      type="button"
                      onClick={() => removeNumber(index)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Contact Status</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isContacted"
                  checked={formData.isContacted}
                  onCheckedChange={(checked) => handleCheckboxChange('isContacted', !!checked)}
                />
                <Label htmlFor="isContacted" className="text-sm">Contacted</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isResponsed"
                  checked={formData.isResponsed}
                  onCheckedChange={(checked) => handleCheckboxChange('isResponsed', !!checked)}
                />
                <Label htmlFor="isResponsed" className="text-sm">Responsed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isConfirmed"
                  checked={formData.isConfirmed}
                  onCheckedChange={(checked) => handleCheckboxChange('isConfirmed', !!checked)}
                />
                <Label htmlFor="isConfirmed" className="text-sm">Confirmed</Label>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
          >
            {isLoading ? 'Adding...' : 'Add Target Client'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTargetClientForm;