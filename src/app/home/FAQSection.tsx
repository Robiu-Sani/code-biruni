import React from "react";
import {
  HelpCircle,
  Code,
  Rocket,
  Shield,
  CreditCard,
  Users,
  Globe,
  Server,
  Zap,
  ArrowRight,
  //   ChevronDown,
  FileText,
  Cpu,
  Lock,
  Calendar,
  MessageSquare,
  Network,
  GitBranch,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function FAQSection() {
  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer:
        "We specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and Tailwind CSS. Our team has extensive experience with serverless architectures, GraphQL, and modern CSS frameworks.",
      details: [
        {
          icon: <Code className="h-4 w-4" />,
          text: "Frontend: React, Next.js, TypeScript, Tailwind CSS",
        },
        {
          icon: <Server className="h-4 w-4" />,
          text: "Backend: Node.js, Express, NestJS",
        },
        {
          icon: <GitBranch className="h-4 w-4" />,
          text: "Databases: PostgreSQL, MongoDB, Firebase",
        },
        {
          icon: <Cpu className="h-4 w-4" />,
          text: "DevOps: Docker, AWS, Vercel, CI/CD pipelines",
        },
      ],
      icon: <Code className="h-5 w-5 text-primary" />,
    },
    {
      question: "How quickly can you start working on my project?",
      answer:
        "Our onboarding process is streamlined to get your project started as quickly as possible while ensuring we have all the necessary requirements.",
      details: [
        {
          icon: <Calendar className="h-4 w-4" />,
          text: "Standard projects: 1-2 weeks from initial contact",
        },
        {
          icon: <Zap className="h-4 w-4" />,
          text: "Expedited projects: 3-day startup option available",
        },
        {
          icon: <FileText className="h-4 w-4" />,
          text: "Discovery phase typically takes 2-3 days",
        },
        {
          icon: <MessageSquare className="h-4 w-4" />,
          text: "We provide a detailed timeline during our initial consultation",
        },
      ],
      icon: <Rocket className="h-5 w-5 text-primary" />,
    },
    {
      question: "What security measures do you implement?",
      answer:
        "Security is integrated into every phase of our development process, from initial design to deployment and maintenance.",
      details: [
        {
          icon: <Lock className="h-4 w-4" />,
          text: "End-to-end encryption for all data transmissions",
        },
        {
          icon: <Shield className="h-4 w-4" />,
          text: "Regular security audits and penetration testing",
        },
        {
          icon: <Network className="h-4 w-4" />,
          text: "OWASP Top 10 compliance for all web applications",
        },
        {
          icon: <Users className="h-4 w-4" />,
          text: "Developer security training and secure coding practices",
        },
      ],
      icon: <Shield className="h-5 w-5 text-primary" />,
    },
    {
      question: "What are your payment terms?",
      answer:
        "We offer flexible payment solutions tailored to your project size and duration.",
      details: [
        {
          icon: <CreditCard className="h-4 w-4" />,
          text: "Small projects: 50% upfront, 50% on completion",
        },
        {
          icon: <FileText className="h-4 w-4" />,
          text: "Monthly billing for ongoing engagements",
        },
        {
          icon: <Globe className="h-4 w-4" />,
          text: "Multiple payment methods accepted (cards, transfer, crypto)",
        },
        {
          icon: <Calendar className="h-4 w-4" />,
          text: "Net 15 terms standard, with options for extended terms",
        },
      ],
      icon: <CreditCard className="h-5 w-5 text-primary" />,
    },
    {
      question: "Can you work with our existing development team?",
      answer:
        "We have extensive experience collaborating with in-house teams to augment capabilities and accelerate delivery.",
      details: [
        {
          icon: <Users className="h-4 w-4" />,
          text: "Seamless integration with your existing workflows",
        },
        {
          icon: <Code className="h-4 w-4" />,
          text: "Pair programming and code review services",
        },
        {
          icon: <MessageSquare className="h-4 w-4" />,
          text: "Adaptation to your preferred communication tools",
        },
        {
          icon: <GitBranch className="h-4 w-4" />,
          text: "Knowledge transfer and documentation services",
        },
      ],
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      question: "Do you provide hosting and maintenance services?",
      answer:
        "Our comprehensive hosting and maintenance solutions ensure your application remains secure, performant, and up-to-date.",
      details: [
        {
          icon: <Server className="h-4 w-4" />,
          text: "Global CDN with DDoS protection",
        },
        {
          icon: <Shield className="h-4 w-4" />,
          text: "Automated daily backups with 30-day retention",
        },
        {
          icon: <Zap className="h-4 w-4" />,
          text: "24/7 monitoring with immediate alerting",
        },
        {
          icon: <Calendar className="h-4 w-4" />,
          text: "Flexible maintenance plans with SLA guarantees",
        },
      ],
      icon: <Server className="h-5 w-5 text-primary" />,
    },
    {
      question: "What regions do you primarily serve?",
      answer:
        "Our distributed team allows us to serve clients globally while understanding regional requirements.",
      details: [
        {
          icon: <Globe className="h-4 w-4" />,
          text: "Headquartered in North America with global clients",
        },
        {
          icon: <FileText className="h-4 w-4" />,
          text: "GDPR compliance for European clients",
        },
        {
          icon: <Network className="h-4 w-4" />,
          text: "APAC region coverage with local compliance expertise",
        },
        {
          icon: <MessageSquare className="h-4 w-4" />,
          text: "Multilingual support available",
        },
      ],
      icon: <Globe className="h-5 w-5 text-primary" />,
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services and processes
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="max-w-5xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b"
            >
              <AccordionTrigger className="hover:no-underline px-6 py-3">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg">{faq.icon}</div>
                  <h3 className="text-lg font-medium text-left">
                    {faq.question}
                  </h3>
                </div>
                {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="space-y-4">
                  <p className="text-muted-foreground">{faq.answer}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {faq.details.map((detail, i) => (
                      <div
                        key={i}
                        className="flex items-start space-x-3 bg-muted/50 p-3 rounded-lg"
                      >
                        <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                          {detail.icon}
                        </div>
                        <p className="text-sm">{detail.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Still have questions? We`re here to help.
          </p>
          <Link href='/pages/company/contact'>
                   <Button>
            Contact Support
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button></Link>
          
        </div>
      </div>
    </section>
  );
}
