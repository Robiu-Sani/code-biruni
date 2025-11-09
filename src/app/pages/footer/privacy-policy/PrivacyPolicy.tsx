import React from "react";
import {
  Shield,
  Lock,
  Server,
  Mail,
  User,
  Cookie,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-12 mt-5 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <Link
          href={`/`}
          className="mb-6 text-muted-foreground flex justify-center item-center hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-10 w-10 text-foreground mr-3" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Code Biruni Privacy Policy
            </h1>
          </div>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Your privacy is our priority. Learn how we protect your information.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Lock className="h-6 w-6 mr-2" />
              Information We Collect
            </CardTitle>
            <CardDescription>Effective Date: June 1, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                  <li>
                    Name, email address, and contact details when you register
                  </li>
                  <li>
                    Payment information for service purchases (processed
                    securely)
                  </li>
                  <li>Business information for service customization</li>
                  <li>Communication records when you contact our support</li>
                </ul>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  Automatic Data Collection
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                  <li>
                    IP address and browser type for security and analytics
                  </li>
                  <li>Usage data including pages visited and features used</li>
                  <li>Device information for compatibility optimization</li>
                  <li>
                    Cookies and similar tracking technologies (see Cookie Policy
                    below)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <EyeOff className="h-5 w-5 mr-2" />
                How We Use Your Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                <li>To provide and maintain our services</li>
                <li>To notify you about changes to our services</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer support</li>
                <li>To gather analysis for service improvement</li>
                <li>To monitor service usage and security</li>
                <li>To detect and prevent technical issues and fraud</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security audits and vulnerability testing</li>
                <li>Access controls and authentication protocols</li>
                <li>Employee training on data protection</li>
                <li>Compliance with GDPR and other privacy regulations</li>
                <li>Data minimization principles applied</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Cookie className="h-5 w-5 mr-2" />
              Cookie Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Cookie Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Purpose
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      Essential Cookies
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      Necessary for website functionality
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      Session
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      Analytics Cookies
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      Help us improve our services
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      1 year
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      Preference Cookies
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      Remember your settings
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      1 month
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Cookie Management</h4>
              <p className="text-muted-foreground text-sm">
                You can control or delete cookies through your browser settings.
                However, disabling essential cookies may affect website
                functionality.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Access and Control
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                  <li>Request access to your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing</li>
                  <li>Request data portability</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  How to Exercise Your Rights
                </h3>
                <p className="text-muted-foreground mb-4">
                  Contact our Data Protection Officer to exercise any of these
                  rights:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">
                        privacy@codebiruny.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Data Protection Officer</p>
                      <p className="text-muted-foreground">
                        Attn: Privacy Team, Code Biruni
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 rounded-b-lg">
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-3">Policy Updates</h3>
              <p className="text-muted-foreground">
                We may update this Privacy Policy periodically. We will notify
                you of any changes by posting the new Privacy Policy on this
                page and updating the ``Effective Date`` at the top.
              </p>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Code Biruni is committed to protecting your privacy and securing
            your data.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Code Biruni. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
