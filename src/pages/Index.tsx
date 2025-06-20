
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Users, Building, CreditCard, BarChart3, Upload, Shield, Star, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    { icon: Building, text: "Add & manage properties with full details" },
    { icon: BarChart3, text: "Track occupancy, vacancies, and revenue in real-time" },
    { icon: CreditCard, text: "Record & monitor payments with multiple methods" },
    { icon: BarChart3, text: "Get instant financial reports (profit/loss, expenses, monthly stats)" },
    { icon: Upload, text: "Export/import data easily (CSV support)" },
    { icon: Users, text: "Customize with your logo and manage user profiles" },
    { icon: Shield, text: "Secure your system with password management & data control" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Manager",
      company: "Urban Properties Ltd",
      content: "Makazi Manager has revolutionized how we handle our properties. The real-time tracking is a game-changer!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Real Estate Investor",
      company: "Chen Holdings",
      content: "Finally, a property management tool that actually makes sense. The financial reports are incredibly detailed.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Landlord",
      company: "Rodriguez Rentals",
      content: "The payment tracking feature alone has saved me hours every week. Highly recommended!",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      description: "Perfect for small property owners",
      features: [
        "Up to 10 properties",
        "Basic reporting",
        "Payment tracking",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      description: "Ideal for growing property managers",
      features: [
        "Up to 100 properties",
        "Advanced reporting",
        "Multi-payment methods",
        "Priority support",
        "Custom branding"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large property management companies",
      features: [
        "Unlimited properties",
        "Advanced analytics",
        "API access",
        "24/7 phone support",
        "Custom integrations"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How easy is it to get started with Makazi Manager?",
      answer: "Getting started is incredibly simple! Just sign up for a free trial, and you can have your first property added within minutes. Our intuitive interface requires no technical expertise."
    },
    {
      question: "Can I import my existing property data?",
      answer: "Absolutely! Makazi Manager supports CSV imports, making it easy to transfer your existing property and tenant data from spreadsheets or other systems."
    },
    {
      question: "Is my data secure?",
      answer: "Security is our top priority. We use enterprise-grade encryption, regular backups, and secure cloud infrastructure to ensure your data is always protected."
    },
    {
      question: "What payment methods can I track?",
      answer: "You can track all types of payments including cash, checks, bank transfers, credit cards, and digital payments. Each transaction is automatically categorized and recorded."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes! We provide email support for all plans, priority support for Pro users, and 24/7 phone support for Enterprise customers."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Makazi Manager
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
                <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started Free
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Features</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Pricing</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Testimonials</a>
              <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Dashboard</Link>
              <div className="pt-4 pb-3 border-t">
                <Button variant="ghost" className="w-full mb-2">Sign In</Button>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Get Started Free</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Your Smart Property Management Tool
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Say goodbye to manual records and{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                confusion
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Makazi Manager gives you total control over property management — fast, easy, and reliable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your property management with our comprehensive suite of tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{feature.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by property managers worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about Makazi Manager
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>
                    {testimonial.role} at {testimonial.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose the perfect plan for your needs
            </h2>
            <p className="text-xl text-gray-600">
              Start free and scale as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : 'border-2 border-gray-200'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your property management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of property managers who trust Makazi Manager
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Makazi Manager
              </h3>
              <p className="text-gray-400">
                Your smart property management solution for the modern world.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Makazi Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
