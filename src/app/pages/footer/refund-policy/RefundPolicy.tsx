import React from "react";
import {
  BadgeDollarSign,
  Clock,
  ShieldCheck,
  Mail,
  Phone,
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen mt-5 py-12 px-4 sm:px-6 lg:px-8">
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
            <BadgeDollarSign className="h-10 w-10 text-foreground mr-3" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Code Biruni Refund Policy
            </h1>
          </div>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our commitment to transparency and customer satisfaction
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <ShieldCheck className="h-6 w-6 mr-2" />
              Refund Policy Overview
            </CardTitle>
            <CardDescription>Last updated: June 1, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              At Code Biruni, we strive to deliver exceptional digital solutions
              that meet your business needs. However, we understand that
              sometimes circumstances may require refunds. Please review our
              policy carefully.
            </p>

            <div className="grid gap-6 mt-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Digital Products Refund Timeline
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Service Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Refund Period
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Conditions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          Custom Software Development
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          14 days
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          Before project development begins
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          Website Development
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          7 days
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          Before design approval
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          Digital Products
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          30 days
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          Unused license keys
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Eligibility Conditions
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                  <li>
                    Refund requests must be made within the specified period
                    from the date of purchase
                  </li>
                  <li>
                    Services not yet rendered or products not yet delivered
                    qualify for full refunds
                  </li>
                  <li>
                    Partially completed work may be eligible for partial refunds
                    at our discretion
                  </li>
                  <li>
                    Custom work that has already been completed is generally
                    non-refundable
                  </li>
                  <li>
                    Subscription services can be canceled anytime but are
                    non-refundable for the current billing period
                  </li>
                </ul>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Non-Refundable Items
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                  <li>Consultation fees after the consultation has occurred</li>
                  <li>Custom development work that has been completed</li>
                  <li>
                    Digital products that have been downloaded or accessed
                  </li>
                  <li>Services where resources have already been allocated</li>
                  <li>Third-party costs (domains, hosting, licenses, etc.)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Refund Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted text-foreground mr-3">
                    1
                  </div>
                  <h4 className="font-medium">Request Submission</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Submit your refund request via email to support@codebiruny.com
                  with your order details.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted text-foreground mr-3">
                    2
                  </div>
                  <h4 className="font-medium">Review Process</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Our team will review your request within 3-5 business days and
                  may contact you for additional information.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted text-foreground mr-3">
                    3
                  </div>
                  <h4 className="font-medium">Refund Issuance</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Approved refunds will be processed within 10 business days to
                  your original payment method.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 rounded-b-lg">
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Need Help?
              </h3>
              <p className="text-muted-foreground mb-4">
                Contact our support team for any questions about our refund
                policy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Code Biruni reserves the right to modify this refund policy at any
            time. Changes will be posted on this page.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Code Biruni. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
