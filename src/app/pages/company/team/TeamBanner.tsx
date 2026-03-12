'use client'
import React from "react";
import {
  Users,
  Award,
  Globe,
  Mail,
  Github,
  Linkedin,
  ArrowRight,
  BookOpen,
  Zap,
  CheckCircle,
  Phone,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function TeamBanner() {
  const teamMembers = [
    {
      name: "Rifat Rahman",
      role: "CEO ", //& Co-founder
      expertise: ["Product Strategy", "Leadership", "Vision"],
      avatar: "https://i.postimg.cc/CLvCPJVm/649096364-4281095825473912-1713237592401792416-n.jpg",
      social: {
        facebook: "rifat00rahman",
        github: "rifat0rahman",
        linkedin: "rifat-rahman-67137b3b2",
        email: "rifatrahmanee@gmail.com",
        phone: "+8801764047140",
        whatsapp: "+8801764047140",
      },
    },
    {
      name: "Robius Sani",
      role: "CTO ", //& Co-founder
      expertise: ["Architecture", "Scalability", "Full Stack"],
      avatar: "https://avatars.githubusercontent.com/u/148758251?v=4",
      social: {
        facebook: "robiussani.mubarok",
        github: "Robiu-Sani",
        linkedin: "robius-sani-mobarok",
        email: "hafazrobiussani@gmail.com",
        phone: "+8801617688805",
        whatsapp: "+8801617688805",
      },
    },
    {
      name: "Shimul Hossain",
      role: "CMO",
      expertise: ["Operations", "Management", "Strategy"],
      avatar: "https://i.postimg.cc/HW67dxPr/647548613-1298177328831729-4955942451501221677-n.jpg",
      social: {
        facebook: "sabbir.simul.7",
        email: "simuls664@gmail.com",
        phone: "+8801888573826",
        whatsapp: "+8801888573826",
      },
    },
    {
      name: "Dibbayan Datta",
      role: "COO",
      expertise: ["Marketing", "Brand Strategy", "Growth"],
      avatar: "https://i.postimg.cc/nLqDJG6z/646348559-2152999638849812-4891187165175593480-n.jpg",
      social: {
        facebook: "dibbayan.dutt",
        linkedin: "dibbayan-datta-381783334",
        email: "dibbayandatta@gmail.com",
        phone: "+8801331441612",
        whatsapp: "+8801331441612",
      },
    },
  ];

  const teamStats = [
    {
      value: "15+",
      label: "Nationalities",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      value: "50+",
      label: "Years Combined Experience",
      icon: <Award className="h-5 w-5" />,
    },
    {
      value: "100+",
      label: "Projects Completed",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      value: "24/7",
      label: "Collaboration",
      icon: <Zap className="h-5 w-5" />,
    },
  ];

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Users className="h-3 w-3 mr-2" />
            Meet the Team
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            The People Behind Code Biruni
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-zinc-600 dark:text-zinc-300">
            A diverse team of passionate engineers, designers, and
            problem-solvers dedicated to building exceptional developer tools.
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {teamStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm text-center"
            >
              <div className="flex items-center justify-center mb-2 text-primary">
                {stat.icon}
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-md flex justify-center items-center bg-zinc-100 dark:bg-zinc-800 mb-4 overflow-hidden">
                  <Image
                    src={member.avatar} 
                    alt={member.name}
                    
                    className=" mx-auto max-h-full  min-h-full object-cover"
                    width={100}
                    height={100}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://via.placeholder.com/96";
                    }}
                  />
                </div>
                <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                  {member.role}
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {member.expertise.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3 flex-wrap justify-center">
                  {member.social.facebook && (
                    <a
                      href={`https://web.facebook.com/${member.social.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={`${member.name} Facebook`}
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={`https://github.com/${member.social.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={`https://www.linkedin.com/in/${member.social.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      aria-label={`${member.name} Email`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.phone && (
                    <a
                      href={`tel:${member.social.phone}`}
                      className="text-zinc-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      aria-label={`${member.name} Phone`}
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.whatsapp && (
                    <a
                      href={`https://wa.me/${member.social.whatsapp.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                      aria-label={`${member.name} WhatsApp`}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Culture */}
          <div className="md:w-2/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Our Culture</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Values</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Transparency in everything we do</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Continuous learning and growth</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Work-life harmony</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-3">Practices</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Async-first communication</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Quarterly hackathons</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Open-source Fridays</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Join Team */}
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Join Our Team</h2>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                We`re always looking for talented people who share our passion
                for building great developer tools.
              </p>
              <Button className="w-full mb-4">
                View Open Positions
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              
              {/* Company Contact */}
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                  Company Contact:
                </p>
                <a
                  href="tel:+8801602957691"
                  className="flex items-center justify-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  <span>+8801602957691</span>
                </a>
                <a
                  href="https://wa.me/8801602957691"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-green-600 hover:underline mt-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Business</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}