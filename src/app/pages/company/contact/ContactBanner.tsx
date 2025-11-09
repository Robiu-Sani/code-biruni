import React from "react";
import {
  Mail,
  Phone,
  Clock,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ContactBanner() {
  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "codebiruny@gmail.com",
      action: "Send Email",
      responseTime: "Typically within 2 hours",
      link: "mailto:codebiruny@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "+8801617688805, +880176407140",
      action: "Call Now",
      responseTime: "Available during office hours",
      link: "tel:+8801617688805",
    },
  ];

  const supportHours = [
    { day: "Saturday - Thursday", hours: "9:00 AM – 6:00 PM" },
    { day: "Friday", hours: "Closed" },
  ];

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-700 shadow-sm">
          
          {/* CTA Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="text-center md:text-left">
              <Badge variant="outline" className="mb-4">
                <Zap className="h-3 w-3 mr-2" />
                Get in Touch
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Need help or want to collaborate?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 max-w-lg">
                Our CodeBiruni support team is ready to assist you with your
                technical or business inquiries. Reach out today!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:codebiruny@gmail.com">
                <Button size="lg" className="gap-2">
                  <Mail className="h-5 w-5" />
                  Email Us
                </Button>
              </a>
              <a href="tel:+8801617688805">
                <Button variant="outline" size="lg" className="gap-2">
                  <Phone className="h-5 w-5" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {method.icon}
                  </div>
                  <h3 className="font-semibold">{method.title}</h3>
                </div>
                <p className="text-lg font-medium mb-2">{method.description}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 flex items-center">
                  <Clock className="h-3 w-3 mr-2" />
                  {method.responseTime}
                </p>
                <a href={method.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">
                    {method.action}
                  </Button>
                </a>
              </div>
            ))}
          </div>

          {/* Support Hours */}
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Support Hours
            </h3>
            <div className="space-y-3">
              {supportHours.map((day, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-300">
                    {day.day}
                  </span>
                  <span className="font-medium">{day.hours}</span>
                </div>
              ))}
            </div>
            {/* <a href="/pages/company/contact">
              <Button variant="link" className="mt-4 px-0 text-primary">
                Visit our contact page
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}
