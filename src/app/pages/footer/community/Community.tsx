"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Code,
  Globe,
  Trophy,
  BookOpen,
  Shield,
  Mail,
  Linkedin,
  Facebook,
  Github,
} from "lucide-react";
import Link from "next/link";

export default function Community() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Code Biruni Community
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Join our growing community of developers and innovators. Learn,
            collaborate, and grow together through technology and creativity.
          </p>
        </div>

        {/* 3 Cards Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 mb-4 text-blue-600" />
              <CardTitle>Connect</CardTitle>
              <CardDescription>
                Build valuable relationships and connect with professionals from
                various tech backgrounds.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Code className="h-12 w-12 mb-4 text-purple-600" />
              <CardTitle>Collaborate</CardTitle>
              <CardDescription>
                Contribute to real-world projects and collaborate with others to
                bring ideas to life.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Trophy className="h-12 w-12 mb-4 text-amber-600" />
              <CardTitle>Grow</CardTitle>
              <CardDescription>
                Enhance your skills through events, workshops, and mentorship
                programs.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Why Join Code Biruni?</h2>
            <ul className="space-y-4">
              {[
                {
                  title: "Exclusive Resources",
                  icon: <BookOpen className="h-5 w-5" />,
                  desc: "Access tutorials, project templates, and research content to boost your learning.",
                },
                {
                  title: "Networking Opportunities",
                  icon: <Users className="h-5 w-5" />,
                  desc: "Meet developers, educators, and entrepreneurs working on innovative ideas.",
                },
                {
                  title: "Global Connections",
                  icon: <Globe className="h-5 w-5" />,
                  desc: "Collaborate with tech enthusiasts from around the world.",
                },
                {
                  title: "Safe Environment",
                  icon: <Shield className="h-5 w-5" />,
                  desc: "Join a respectful, supportive, and inclusive tech community.",
                },
              ].map((b, i) => (
                <li key={i} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{b.title}</h3>
                    <p className="text-muted-foreground">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="flex flex-col justify-center text-center">
            <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
            <p className="text-muted-foreground mb-6">
              Be part of our mission to make learning and innovation accessible
              for everyone.
            </p>
            <Link href="/pages/company/contact">
              <Button size="lg" className="hover:scale-105 transition-all">
                Contact With Us
              </Button>
            </Link>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Newsletter */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Join Our Newsletter</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground mb-8">
            Stay updated with new projects, events, and learning resources from
            Code Biruni.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-1"
            />
            <Button type="submit">
              <Mail className="mr-2 h-4 w-4" />
              Subscribe
            </Button>
          </div>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/codebiruni/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/company/code-biruni/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a href="mailto:codebiruny@gmail.com">
              <Button variant="outline" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://github.com/codebiruni" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Code Biruni. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
