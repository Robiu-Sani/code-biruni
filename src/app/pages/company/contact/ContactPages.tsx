/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronRight,
  Users,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().optional(),
  contactMethod: z.enum(["email", "phone", "whatsapp"]),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  urgency: z.enum(["low", "medium", "high"]),
});

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactMethod: "email",
      urgency: "medium",
    },
  });

  const contactMethod = watch("contactMethod");

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    alert("Thank you for your message! We'll contact you soon.");
  };

  // Real contact info
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-500" />,
      title: "Email Support",
      description: "General inquiries and support",
      details: "codebiruny@gmail.com",
      action: "Send Email",
      href: "mailto:codebiruny@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-green-500" />,
      title: "Phone Support",
      description: "Call us during office hours",
      details: "+8801617688805, +880176407140",
      action: "Call Now",
      href: "tel:+8801617688805",
    },
    {
      icon: <MapPin className="h-6 w-6 text-red-500" />,
      title: "Visit Us",
      description: "Headquarters location",
      details: "Cumilla, Bangladesh",
      action: "Get Directions",
      href: "https://www.google.com/maps",
    },
  ];

  const supportHours = [
    { day: "Saturday - Thursday", hours: "9:00 AM – 6:00 PM" },
    { day: "Friday", hours: "Closed" },
  ];

  return (
    <div className="container pb-12 pt-4 mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
          Get in Touch
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Have questions or want to discuss a project? Reach out to our team —
          we’d love to hear from you.
        </p>
      </section>

      <div className="grid  gap-12">
        {/* Contact Form */}
        <Card className="hidden border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            <CardDescription>
              Fill out the form and we`ll get back to you promptly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Your company" {...register("company")} />
              </div>

              <div className="space-y-2">
                <Label>Preferred Contact Method *</Label>
                <RadioGroup defaultValue="email" className="grid grid-cols-3 gap-4" {...register("contactMethod")}>
                  <div>
                    <RadioGroupItem value="email" id="email-method" className="peer sr-only" />
                    <Label
                      htmlFor="email-method"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary"
                    >
                      <Mail className="mb-2 h-6 w-6" />
                      Email
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="phone" id="phone-method" className="peer sr-only" />
                    <Label
                      htmlFor="phone-method"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary"
                    >
                      <Phone className="mb-2 h-6 w-6" />
                      Phone
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="whatsapp" id="whatsapp-method" className="peer sr-only" />
                    <Label
                      htmlFor="whatsapp-method"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary"
                    >
                      <MessageSquare className="mb-2 h-6 w-6" />
                      WhatsApp
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {contactMethod === "phone" && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+8801617688805"
                    {...register("phone")}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>
              )}

              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <RadioGroup defaultValue="medium" className="flex gap-4" {...register("urgency")}>
                  {["low", "medium", "high"].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={`${level}-urgency`} />
                      <Label htmlFor={`${level}-urgency`}>{level.charAt(0).toUpperCase() + level.slice(1)}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project or inquiry..."
                  className="min-h-[120px]"
                  {...register("message")}
                />
                {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info & Support */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach us via your preferred method</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {contactInfo.map((method, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">{method.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{method.title}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                    <p className="mt-1 font-medium">{method.details}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={method.href}>{method.action}</a>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support Hours</CardTitle>
              <CardDescription>When our team is available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportHours.map((day, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{day.day}</span>
                    </div>
                    <span className="font-medium">{day.hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle>Join Our Community</CardTitle>
              <CardDescription>Connect with developers and enthusiasts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Community Forum
              </Button>
              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Developer Discord
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <Card className="mt-12 py-0 overflow-hidden">
        <div className="h-64 md:h-96 w-full bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold">Our Location</h3>
            <p className="text-muted-foreground">Cumilla, Bangladesh</p>
            <Button variant="link" className="mt-4" asChild>
              <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
                View on Map <ChevronRight className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
