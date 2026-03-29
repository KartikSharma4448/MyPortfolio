import { useQuery } from "@tanstack/react-query";
import { Loader2, Briefcase, ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Service } from "@shared/schema";
import * as Icons from "lucide-react";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

const cardAccents = [
  { bg: "bg-blue-500/10", icon: "text-blue-400", border: "from-blue-500/40 to-blue-700/40", glow: "bg-blue-500/5" },
  { bg: "bg-purple-500/10", icon: "text-purple-400", border: "from-purple-500/40 to-purple-700/40", glow: "bg-purple-500/5" },
  { bg: "bg-cyan-500/10", icon: "text-cyan-400", border: "from-cyan-500/40 to-cyan-700/40", glow: "bg-cyan-500/5" },
  { bg: "bg-green-500/10", icon: "text-green-400", border: "from-green-500/40 to-green-700/40", glow: "bg-green-500/5" },
  { bg: "bg-orange-500/10", icon: "text-orange-400", border: "from-orange-500/40 to-orange-700/40", glow: "bg-orange-500/5" },
  { bg: "bg-pink-500/10", icon: "text-pink-400", border: "from-pink-500/40 to-pink-700/40", glow: "bg-pink-500/5" },
];

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? IconComponent : Briefcase;
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-5">
            <Briefcase className="h-3.5 w-3.5" />
            What I Offer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Services & Expertise</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full mx-auto mb-5" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional services I offer to help bring your ideas to life
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : services && services.length > 0 ? (
          <>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service, idx) => {
                const Icon = getIcon(service.icon);
                const accent = cardAccents[idx % cardAccents.length];
                return (
                  <motion.div
                    key={service.id}
                    variants={staggerItem}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  >
                    <Card
                      className="hover-elevate transition-all duration-300 hover:shadow-xl group h-full border-border/50 overflow-hidden relative"
                      data-testid={`service-${service.id}`}
                    >
                      {/* Top accent bar */}
                      <div className={`h-1 bg-gradient-to-r ${accent.border}`} />

                      {/* Subtle glow background */}
                      <div className={`absolute inset-0 ${accent.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                      <CardHeader className="relative">
                        <div className={`w-14 h-14 rounded-2xl ${accent.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-7 w-7 ${accent.icon}`} />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="relative">
                        <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                          {service.description}
                        </p>
                        <div className={`inline-flex items-center gap-1 text-xs font-medium ${accent.icon} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                          Learn more <ArrowRight className="h-3 w-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mt-20"
            >
              <Card className="border-border/50 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary to-chart-2" />
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Interested in Working Together?</h2>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-chart-2 rounded-full mx-auto mb-5" />
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    I'm available for freelance projects, internships, and collaboration
                    opportunities. Let's discuss how I can help with your next project.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/contact">
                      <Button size="lg" className="shadow-lg shadow-primary/20" data-testid="button-get-started">
                        <Mail className="h-4 w-4 mr-2" />
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/projects">
                      <Button size="lg" variant="outline">
                        View My Work
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground">No services added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
