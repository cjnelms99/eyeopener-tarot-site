import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  Moon, 
  Sun, 
  Eye, 
  Hand, 
  Sparkles, 
  Zap,
  Phone,
  Mail,
  MapPin,
  Calendar
} from "lucide-react";
import heroImage from "@/assets/hero-cosmic-bg.jpg";
import businessCardBack from "@/assets/business-card-back.jpeg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-divine">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-8 w-8 text-primary mystical-glow" />
            <span className="text-2xl font-bold bg-gradient-ethereal bg-clip-text text-transparent">
              EYEOPENER
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-mystical">Services</a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-mystical">About</a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-mystical">Pricing</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-mystical">Contact</a>
          </div>
          <Button variant="cosmic" size="sm">Book Reading</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-aura" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8 ethereal-float">
            <img 
              src={businessCardBack} 
              alt="Travis Perry - Eyeopener" 
              className="w-32 h-32 rounded-full mx-auto mb-6 shadow-mystical border-4 border-primary/30"
            />
          </div>
          
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-ethereal bg-clip-text text-transparent">
              Eyeopener
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-muted-foreground">
              Travis Perry - Divination, Empathic Medium, & Spiritual Advisor
            </p>
          
          <p className="text-lg mb-8 text-foreground/80 max-w-2xl mx-auto">
            Unlock the mysteries of your path through ancient wisdom and spiritual guidance. 
            Discover clarity through tarot, astrology, numerology, and divine connection.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2 text-base">
              <Star className="w-4 h-4 mr-2" />
              Tarot Readings
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-base">
              <Moon className="w-4 h-4 mr-2" />
              Astrology
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-base">
              <Sparkles className="w-4 h-4 mr-2" />
              Numerology
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-base">
              <Hand className="w-4 h-4 mr-2" />
              Palmistry
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cosmic" size="lg" className="text-lg px-8 py-4">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Reading
            </Button>
            <Button variant="ethereal" size="lg" className="text-lg px-8 py-4">
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-ethereal bg-clip-text text-transparent">
              Sacred Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each service offers unique insights into your spiritual journey, connecting you with ancient wisdom and divine guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tarot Readings */}
            <Card className="mystical-glow hover:scale-105 transition-mystical">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-cosmic rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-center text-2xl">Tarot Readings</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Ancient divination using sacred symbolic cards to reveal hidden truths, guide decision-making, and illuminate your spiritual path forward.
                </CardDescription>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• 3-Card Past/Present/Future</p>
                  <p>• Celtic Cross Spread</p>
                  <p>• Love & Relationship Insights</p>
                  <p>• Career & Life Purpose</p>
                </div>
              </CardContent>
            </Card>

            {/* Astrology */}
            <Card className="mystical-glow hover:scale-105 transition-mystical">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-cosmic rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Sun className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-center text-2xl">Astrology</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Celestial wisdom through planetary positions and cosmic alignments, revealing personality traits, life cycles, and divine timing.
                </CardDescription>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Birth Chart Analysis</p>
                  <p>• Compatibility Readings</p>
                  <p>• Transit Interpretations</p>
                  <p>• Solar Return Forecasts</p>
                </div>
              </CardContent>
            </Card>

            {/* Numerology */}
            <Card className="mystical-glow hover:scale-105 transition-mystical">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-cosmic rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-center text-2xl">Numerology</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Life path insights through the mystical power of numbers, revealing your soul's purpose and karmic lessons through mathematical divination.
                </CardDescription>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Life Path Number</p>
                  <p>• Expression & Soul Urge</p>
                  <p>• Personal Year Cycles</p>
                  <p>• Name Numerology</p>
                </div>
              </CardContent>
            </Card>

            {/* Palmistry */}
            <Card className="mystical-glow hover:scale-105 transition-mystical">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-cosmic rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Hand className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-center text-2xl">Palmistry</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Hand reading to unveil personality traits, life events, and destiny through the sacred lines, mounts, and shapes of your palms.
                </CardDescription>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Major Line Analysis</p>
                  <p>• Mount Interpretations</p>
                  <p>• Finger & Thumb Reading</p>
                  <p>• Hand Shape Meanings</p>
                </div>
              </CardContent>
            </Card>

            {/* Bone Readings */}
            <Card className="mystical-glow hover:scale-105 transition-mystical">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-cosmic rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-center text-2xl">Bone Readings</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Ancient divination practice using sacred bones to channel ancestral wisdom and receive guidance from the spiritual realm.
                </CardDescription>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Ancestral Guidance</p>
                  <p>• Spirit Communication</p>
                  <p>• Protection Insights</p>
                  <p>• Ritual Recommendations</p>
                </div>
              </CardContent>
            </Card>

            {/* Energetic Cleansings */}
            <Card className="mystical-glow hover:scale-105 transition-mystical">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-cosmic rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Moon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-center text-2xl">Energetic Cleansings</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Spiritual purification and healing to remove negative energies, clear blockages, and restore balance to your auric field.
                </CardDescription>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Aura Cleansing</p>
                  <p>• Chakra Balancing</p>
                  <p>• Space Clearing</p>
                  <p>• Protection Rituals</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-ethereal bg-clip-text text-transparent">
              Meet Travis Perry
            </h2>
            <p className="text-xl text-muted-foreground">
              Your Guide Through the Mystical Realms
            </p>
          </div>

          <Card className="shadow-mystical">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Divination Expert & Spiritual Advisor</h3>
                  <p className="text-muted-foreground mb-4">
                    With years of experience in the mystical arts, Travis Perry channels divine wisdom through 
                    multiple divination practices. As an empathic medium and spiritual advisor, he creates 
                    a sacred space for transformation and enlightenment.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    His intuitive gifts combined with deep knowledge of ancient practices provide clients 
                    with profound insights and clarity on their spiritual journey.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="ethereal">
                      <Mail className="w-4 h-4 mr-2" />
                      Travisperry18@gmail.com
                    </Button>
                    <Button variant="mystical">
                      <Phone className="w-4 h-4 mr-2" />
                      865-431-6270
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <img 
                    src={businessCardBack}
                    alt="Travis Perry"
                    className="rounded-lg shadow-ethereal max-w-full h-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-ethereal bg-clip-text text-transparent">
              Sacred Exchange
            </h2>
            <p className="text-xl text-muted-foreground">
              Investment in your spiritual journey and divine guidance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="mystical-glow hover:scale-105 transition-mystical">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Tarot Reading</CardTitle>
                <CardDescription>Ancient card divination</CardDescription>
                <div className="text-3xl font-bold text-primary mt-4">$75</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 60-minute session</li>
                  <li>• Multiple spread options</li>
                  <li>• Recorded session</li>
                  <li>• Follow-up questions</li>
                </ul>
                <Button variant="cosmic" className="w-full mt-6">Book Reading</Button>
              </CardContent>
            </Card>

            <Card className="mystical-glow hover:scale-105 transition-mystical">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Astrology Chart</CardTitle>
                <CardDescription>Complete birth chart analysis</CardDescription>
                <div className="text-3xl font-bold text-primary mt-4">$125</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 90-minute consultation</li>
                  <li>• Written report included</li>
                  <li>• Transit forecasting</li>
                  <li>• Compatibility analysis</li>
                </ul>
                <Button variant="cosmic" className="w-full mt-6">Book Reading</Button>
              </CardContent>
            </Card>

            <Card className="mystical-glow hover:scale-105 transition-mystical">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Full Spiritual Reading</CardTitle>
                <CardDescription>Complete divination package</CardDescription>
                <div className="text-3xl font-bold text-primary mt-4">$200</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 2-hour deep dive session</li>
                  <li>• Multiple divination methods</li>
                  <li>• Energetic cleansing included</li>
                  <li>• Spiritual guidance plan</li>
                </ul>
                <Button variant="cosmic" className="w-full mt-6">Book Reading</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-ethereal bg-clip-text text-transparent">
              Begin Your Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              Connect with Travis to schedule your spiritual consultation
            </p>
          </div>

          <Card className="shadow-mystical">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input type="tel" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Interest</label>
                    <select className="w-full px-3 py-2 bg-input border border-border rounded-md">
                      <option>Select a service</option>
                      <option>Tarot Reading</option>
                      <option>Astrology Chart</option>
                      <option>Numerology</option>
                      <option>Palmistry</option>
                      <option>Bone Reading</option>
                      <option>Energetic Cleansing</option>
                      <option>Full Spiritual Reading</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Birth Information (for Astrology)</label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input type="date" placeholder="Birth Date" />
                    <Input type="time" placeholder="Birth Time" />
                    <Input placeholder="Birth Location" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell me about your spiritual questions or what you'd like guidance on..."
                    rows={4}
                  />
                </div>

                <Button variant="cosmic" size="lg" className="w-full">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Message & Schedule Reading
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <Mail className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground">Travisperry18@gmail.com</p>
            </div>
            <div className="space-y-2">
              <Phone className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-semibold">Phone</h3>
              <p className="text-muted-foreground">865-431-6270</p>
            </div>
            <div className="space-y-2">
              <Calendar className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-semibold">Availability</h3>
              <p className="text-muted-foreground">By Appointment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Eye className="h-8 w-8 text-primary mystical-glow" />
              <span className="text-2xl font-bold bg-gradient-ethereal bg-clip-text text-transparent">
                EYEOPENER
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Divination, Empathic Medium, & Spiritual Advisor
            </p>
            <Separator className="my-6" />
            <p className="text-sm text-muted-foreground">
              © 2024 Eyeopener - Travis Perry. All rights reserved. | Spiritual guidance for enlightened souls.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;