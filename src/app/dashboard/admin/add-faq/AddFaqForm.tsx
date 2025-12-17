'use client'
import React, { useState } from 'react';
import { IFaq } from "interface/faq.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, HelpCircle } from "lucide-react";



const AddFaqForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<IFaq, '_id' | 'createdAt' | 'updatedAt'>>({
    question: '',
    answer: {
      text: '',
      types: []
    }
  });

  const [newType, setNewType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      question: e.target.value
    }));
  };

  const handleAnswerTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      answer: {
        ...prev.answer,
        text: e.target.value
      }
    }));
  };

  const addType = () => {
  if (newType.trim() === '') return;

  setFormData(prev => ({
    ...prev,
    answer: {
      ...prev.answer,
      types: [...(prev.answer.types ?? []), newType.trim()]
    }
  }));

  setNewType('');
};

const removeType = (index: number) => {
  setFormData(prev => ({
    ...prev,
    answer: {
      ...prev.answer,
      types: (prev.answer.types ?? []).filter((_, i) => i !== index)
    }
  }));
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/v2/faq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create FAQ');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        question: '',
        answer: {
          text: '',
          types: []
        }
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
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Add New FAQ
        </CardTitle>
        <CardDescription>Create a new frequently asked question</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="p-3 bg-green-100 text-green-800 rounded-md">
              FAQ added successfully!
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              value={formData.question}
              onChange={handleQuestionChange}
              placeholder="Enter the question"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="answerText">Answer</Label>
            <Textarea
              id="answerText"
              value={formData.answer.text}
              onChange={handleAnswerTextChange}
              placeholder="Enter the answer"
              rows={4}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Answer Types</Label>
            <div className="flex gap-2">
              <Input
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                placeholder="Enter answer type"
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={addType}
                size="sm"
                variant="outline"
                disabled={!newType.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {(formData.answer.types ?? []).length > 0 && (
  <div className="flex flex-wrap gap-2">
    {(formData.answer.types ?? []).map((type, index) => (
      <Badge key={index} variant="secondary" className="flex items-center gap-1">
        {type}
        <button
          type="button"
          onClick={() => removeType(index)}
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
            disabled={isLoading || !formData.question || !formData.answer.text}
            className="w-full"
          >
            {isLoading ? 'Creating...' : 'Add FAQ'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddFaqForm;