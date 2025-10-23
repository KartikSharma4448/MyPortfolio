import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { label: "Years of Study", value: "2+" },
    { label: "Certifications", value: "16+" },
    { label: "Projects", value: "5+" },
    { label: "CGPA", value: "9.43" },
  ];

  const skills = [
    "Software Development",
    "Web Development",
    "Python",
    "Java",
    "C",
    "Cloud Computing",
    "AI Prompting",
    "Microsoft Office",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-chart-2/5 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))] -z-10" />

        <div
          className={`container mx-auto px-4 lg:px-8 py-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Profile Image Placeholder */}
<div className="mb-8 flex justify-center">
  <div className="relative">
    {/* KS वाले div को इस img टैग से बदलें */}
    <img
      src="/favicon.png" // <-- अपनी इमेज का सही पाथ या URL यहाँ डालें
      alt="Kartik Sharma"
      className="w-32 h-32 rounded-full object-cover shadow-xl" // स्टाइलिंग के लिए क्लासेज
    />
    <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-br from-primary to-chart-2 opacity-30 blur-xl animate-pulse -z-10" /> {/* z-index जोड़ा ताकि इमेज के पीछे रहे */}
  </div>
</div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Kartik Sharma
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Kartik Sharma Jaipur | Software Developer | Freelancer
            </p>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Software Developer & Freelancer in Jaipur, turning complex problems into elegant digital solutions. Explore my work and let's build something amazing together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href="/projects">
                <Button size="lg" data-testid="button-view-projects">
                  View My Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  data-testid="button-contact-me"
                >
                  Contact Me
                </Button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center mb-8">
              <a
                href="https://linkedin.com/in/kartik-sharma06"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover-elevate active-elevate-2"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a
                href="https://github.com/kartiksharma4448"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-github"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover-elevate active-elevate-2"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover-elevate active-elevate-2"
                  data-testid="button-email-icon"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="hover-elevate transition-transform hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Skills
            </h2>
            <p className="text-muted-foreground mb-8">
              Technologies and tools I work with
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-4 py-2 text-sm hover-elevate transition-transform hover:-translate-y-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <Link href="/achievements">
              <Button variant="outline" data-testid="button-view-all-skills">
                View All Skills & Certifications
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-chart-2/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I'm open to internship opportunities, freelance projects, and
              collaboration. Let's build something amazing!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" data-testid="button-get-in-touch">
                  Get In Touch
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  data-testid="button-view-services"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
