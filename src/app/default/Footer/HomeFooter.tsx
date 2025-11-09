import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, MessageSquare, Users } from "lucide-react";

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    product: [
      { name: "Full-Stack Development", href: "/pages/services/fullstack" },
      { name: "MERN Stack Solutions", href: "/pages/services/mern" },
      { name: "Mobile App Development", href: "/pages/services/mobile" },
      { name: "Cloud Solutions", href: "/up-coming" },
      { name: "UI/UX Design", href: "/pages/services/design" },
    ],
    company: [
      { name: "About Us", href: "/pages/company/about" },
      { name: "Our Team", href: "/pages/company/team" },
      { name: "Blog", href: "/pages/blog" },
      { name: "Contact", href: "/pages/company/contact" },
    ],
    resources: [
      { name: "Documentation", href: "/pages/footer/documentation" },
      { name: "Support", href: "/pages/footer/support" },
      { name: "Community", href: "/pages/footer/community" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/pages/footer/privacy-policy" },
      { name: "Terms of Service", href: "/pages/footer/terms-of-service" },
      { name: "Cookie Policy", href: "/pages/footer/refund-policy" },
    ],
  };

  const contactInfo = [
    {
      icon: <Mail className="h-4 w-4" />,
      text: "codebiruny@gmail.com",
      href: "mailto:codebiruny@gmail.com",
    },
    {
      icon: <Phone className="h-4 w-4" />,
      text: "+8801617688805",
      href: "tel:+8801617688805",
    },
    {
      icon: <Phone className="h-4 w-4" />,
      text: "+880176407140",
      href: "tel:+880176407140",
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      text: "Dhaka, Bangladesh",
      href: "https://maps.google.com",
    },
  ];

  return (
    <div className="bg-background border-t">
      {/* CTA Section */}
      <div className="container px-4 mx-auto">
        <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-purple-600/10 rounded-md p-8 md:p-12 mb-16 mt-8 border">
          <h3 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Ready to Transform Your Digital Presence?
          </h3>
          
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.jpg"
              alt="Code Biruni logo"
              width={100}
              height={100}
              className="rounded-xl shadow-lg"
            />
          </div>
          
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
            Code Biruni provides cutting-edge IT solutions, web development, and
            software services to help your business thrive in the digital world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pages/company/contact">
              <Button size="lg" className="px-8 py-3 text-lg font-semibold">
                Get Started
              </Button>
            </Link>
            
            <Link href="/pages/company/contact">
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg font-semibold">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.jpg"
                  alt="Code Biruni Logo"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Code Biruni
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Building Digital Excellence
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                We deliver innovative software solutions and digital experiences 
                that drive business growth and technological advancement.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      {contact.icon}
                    </div>
                    <Link 
                      href={contact.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contact.text}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">PRODUCT</h4>
              <ul className="space-y-3">
                {footerSections.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">COMPANY</h4>
              <ul className="space-y-3">
                {footerSections.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">RESOURCES</h4>
              <ul className="space-y-3">
                {footerSections.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">LEGAL</h4>
              <ul className="space-y-3">
                {footerSections.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Code Biruni. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Social Links */}
              <div className="flex gap-4">
                <Link
                  href="https://linkedin.com/company/code-biruny"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 p-2 rounded-lg hover:bg-primary/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
                
                <Link
                  href="#"
                  className="bg-primary/10 p-2 rounded-lg hover:bg-primary/20 transition-colors"
                  aria-label="Community"
                >
                  <Users className="h-5 w-5" />
                </Link>
                
                <Link
                  href="#"
                  className="bg-primary/10 p-2 rounded-lg hover:bg-primary/20 transition-colors"
                  aria-label="Support"
                >
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}