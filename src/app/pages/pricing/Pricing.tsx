/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect } from "react";
import {
  Rocket,
  Zap,
  Sparkles,
  Check,
  X,
  ArrowRight,
  BadgeCheck,
  Users,
  Globe,
  Lock,
  Cpu,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Pricing() {
  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [billingCycle, setBillingCycle] = useState("yearly"); // 'monthly' or 'yearly'

  useEffect(() => {
    fetchPricingData();
  }, []);

  const fetchPricingData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/v2/pricing");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setPricingData(data.data);
      } else {
        throw new Error("Failed to fetch pricing data");
      }
    } catch (err:any) {
      setError(err.message || 'There Have A Issue');
      console.error("Error fetching pricing data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Format currency in BDT (Bangladeshi Taka)
const formatCurrency = (amount:any) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: 'symbol',
  }).format(amount).replace('BDT', '৳');
};

  // Map API data to your pricing plans structure
  const pricingPlans = pricingData.map((plan:any, index:number) => {
    // Choose icon based on plan name or index
    const getIcon = () => {
      if (plan.name.toLowerCase().includes("complete")) return <Sparkles className="h-6 w-6 text-primary" />;
      if (plan.name.toLowerCase().includes("institution")) return <Rocket className="h-6 w-6 text-primary" />;
      return <Zap className="h-6 w-6 text-primary" />;
    };

    const getPrice = () => {
      if (billingCycle === "yearly") {
        return formatCurrency(plan.amount.yearly);
      }
      // Assuming monthly is current/12, but you might want to adjust this logic
      return formatCurrency(Math.round(plan.amount.current / 12));
    };

    const getPeriod = () => {
      return billingCycle === "yearly" ? "/year" : "/month";
    };

    const getAnnualPrice = () => {
      return formatCurrency(plan.amount.yearly);
    };

    const getCurrentPrice = () => {
      return formatCurrency(plan.amount.current);
    };

    return {
      name: plan.name,
      price: getPrice(),
      period: getPeriod(),
      annualPrice: getAnnualPrice(),
      currentPrice: getCurrentPrice(),
      originalPrice: formatCurrency(plan.amount.prev),
      description: plan.title,
      baseText: plan.baseText,
      icon: getIcon(),
      features: plan.services.map((service:any) => ({
        text: service.name,
        included: service.isProvied,
      })),
      popular: index === 0, // Make first plan popular, or adjust based on your logic
      hasDiscount: plan.amount.prev > plan.amount.current,
      discountPercentage: plan.amount.prev > 0 
        ? Math.round(((plan?.amount?.prev - plan.amount.current) / plan.amount.prev) * 100)
        : 0,
    };
  });

  // Features that apply to all plans (from your API or static)
  const allPlanFeatures = [
    {
      title: "Automated Data Backup",
      description: "Secure automated backups for 4 years",
      icon: <Lock className="h-5 w-5" />,
    },
    {
      title: "Technical Support",
      description: "Dedicated technical assistance",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Performance Support",
      description: "System monitoring and optimization",
      icon: <Cpu className="h-5 w-5" />,
    },
    {
      title: "Mobile Responsive",
      description: "Optimized for all devices",
      icon: <Globe className="h-5 w-5" />,
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto py-12 md:py-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto py-12 md:py-24">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading pricing data: {error}. Please try again later.
          </AlertDescription>
        </Alert>
        <div className="text-center mt-8">
          <Button onClick={fetchPricingData} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // No data state
  if (pricingData.length === 0) {
    return (
      <div className="container mx-auto py-12 md:py-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No Pricing Plans Available</h1>
          <p className="text-muted-foreground mb-6">
            Please check back later for our pricing information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 md:py-24">
      {/* Banner Section */}
      <section className="px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <BadgeCheck className="h-3 w-3 mr-2" />
            Transparent pricing with lifetime support
          </Badge>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Professional Digital Solutions
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Choose the perfect digital solution for your business needs. Comprehensive packages with ongoing support.
          </p>

          <div className="flex justify-center gap-4">
            <Button 
              variant={billingCycle === "monthly" ? "default" : "outline"}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </Button>
            <Button 
              variant={billingCycle === "yearly" ? "default" : "outline"}
              onClick={() => setBillingCycle("yearly")}
            >
              Annually <span className="ml-2 text-gray-400">(Save up to 70%)</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col h-full ${
                plan.popular ? "border-primary ring-1 ring-primary scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-3 py-1 text-xs font-medium bg-primary">
                    Most Popular
                  </Badge>
                </div>
              )}

              {plan.hasDiscount && (
                <div className="absolute -top-2 -right-2">
                  <Badge variant="secondary" className="px-2 py-1 text-xs">
                    Save {plan.discountPercentage}%
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  {plan.icon}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <p className="text-sm text-muted-foreground mt-2">{plan.baseText}</p>
              </CardHeader>

              <CardContent className="grow">
                <div className="mb-6">
  {plan.hasDiscount && (
    <p className="text-sm text-muted-foreground line-through mb-1">
      {plan.originalPrice}
    </p>
  )}
  <div className="flex items-baseline">
    <span className="text-4xl font-bold">{plan.price}</span>
    <span className="text-muted-foreground ml-2">{plan.period}</span>
  </div>
  <p className="text-sm text-muted-foreground mt-1">
    {billingCycle === "yearly" 
      ? `${plan.currentPrice} one-time setup`
      : `Annual: ${plan.annualPrice}/year`
    }
  </p>
</div>

                <ul className="space-y-3 grow">
                  {plan.features.map((feature:any, i:number) => (
                    <li key={i} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                      )}
                      <span
                        className={`text-sm ${feature.included ? "" : "text-muted-foreground"}`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6">
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Detailed Feature Comparison
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare all features across our plans to make the right choice
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Features & Services
                </th>
                {pricingPlans.map((plan, index) => (
                  <th key={index} className="px-6 py-4 text-center text-sm font-semibold">
                    {plan.name}
                    {plan.popular && (
                      <Badge className="ml-2 text-xs" variant="secondary">
                        Popular
                      </Badge>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {/* Get all unique features across all plans */}
              {(() => {
                const allFeatures = Array.from(
                  new Set(pricingPlans.flatMap(plan => 
                    plan.features.map((f:any) => f.text)
                  ))
                );

                return allFeatures.map((feature, index) => (
                  <tr key={index} className="hover:bg-muted/30">
                    <td className="px-6 py-4 text-sm font-medium">
                      {feature}
                    </td>
                    {pricingPlans.map((plan, planIndex) => {
                      const planFeature = plan.features.find((f:any) => f.text === feature);
                      return (
                        <td key={planIndex} className="px-6 py-4 text-center">
                          {planFeature ? (
                            planFeature.included ? (
                              <div className="flex items-center justify-center">
                                <Check className="h-4 w-4 text-green-500" />
                                <span className="sr-only">Included</span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center">
                                <X className="h-4 w-4 text-red-500" />
                                <span className="sr-only">Not included</span>
                              </div>
                            )
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </section>

      {/* Features Included in All Plans */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Comprehensive Support & Maintenance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every plan includes these essential services for worry-free operation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allPlanFeatures.map((feature, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 hover:shadow-md transition-all hover:border-primary/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 mt-16">
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Have Questions About Our Plans?
            </h2>
            <p className="text-muted-foreground mb-6">
              We`re here to help you choose the perfect solution for your needs.
              All plans include setup assistance and comprehensive documentation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="default" size="lg">
                Schedule a Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Need a custom solution? <a href="#" className="text-primary hover:underline">Contact us for enterprise pricing</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}