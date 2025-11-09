"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Phone,  MessageCircle, Linkedin, Facebook } from "lucide-react";

export default function ContactSection() {
  return (
    <div className="py-20 bg-gradient-to-b from-background to-muted/20">
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Contact <span className="text-primary">Code Biruni</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or need a project consultation? Get in touch with us through any of the options below.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <h3 className="text-2xl font-semibold text-center">Get in Touch</h3>
          </CardHeader>

          <CardContent className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:codebiruny@gmail.com" className="hover:underline">
                codebiruny@gmail.com
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p>+8801617688805</p>
                <p>+880176407140</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Facebook className="h-5 w-5 text-primary" />
              <a
                href="https://www.facebook.com/codebiruni/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                facebook.com/codebiruni
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Linkedin className="h-5 w-5 text-primary" />
              <a
                href="https://www.linkedin.com/company/code-biruni/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                linkedin.com/company/code-biruni
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MessageCircle className="h-5 w-5 text-primary" />
              <p>WhatsApp / Telegram Available</p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Link href="/pages/company/contact">
              <Button
                size="lg"
                className="transition-all hover:scale-105 hover:shadow-md"
              >
                Go to Contact Page
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
