import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Loader2, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import type { SocialLink } from "@shared/schema";
import * as Icons from "lucide-react";

export default function SocialLinks() {
  const { data: socialLinks, isLoading } = useQuery<SocialLink[]>({
    queryKey: ["/api/social-links"],
  });

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? IconComponent : Share2;
  };

  const sortedLinks = socialLinks?.sort(
    (a, b) => parseInt(a.order) - parseInt(b.order)
  );

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-primary/5 via-background to-chart-2/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
        {/* Profile Header */}
        <motion.div {...fadeInUp} className="text-center mb-12">
          <motion.div 
            className="mb-6 flex justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <img
                src="/favicon.png"
                alt="Kartik Sharma"
                className="w-24 h-24 rounded-full object-cover shadow-xl"
              />
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-primary to-chart-2 opacity-30 blur-xl animate-pulse -z-10" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold mb-3">Kartik Sharma</h1>
          <p className="text-lg text-muted-foreground mb-2">
            BCA Student | Aspiring Software Developer
          </p>
          <p className="text-muted-foreground">
            Passionate About Coding & Problem-Solving
          </p>
        </motion.div>

        {/* Social Links */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : sortedLinks && sortedLinks.length > 0 ? (
          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {sortedLinks.map((link) => {
              const Icon = getIcon(link.icon);
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  variants={staggerItem}
                  whileHover={{
                    rotateX: 8,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  style={{ perspective: '1000px' }}
                  data-testid={`link-${link.platform.toLowerCase()}`}
                >
                  <Card className="hover-elevate active-elevate-2 transition-all hover:-translate-y-1 cursor-pointer hover:shadow-xl">
                    <CardContent className="p-6 flex items-center gap-4">
                      <motion.div 
                        className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ type: "spring" }}
                      >
                        <Icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">
                          {link.platform}
                        </h3>
                        {link.handle && (
                          <p className="text-sm text-muted-foreground">
                            {link.handle}
                          </p>
                        )}
                      </div>
                      <ExternalLink className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </CardContent>
                  </Card>
                </motion.a>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <Share2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No social links added yet.</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Based in Jaipur, Rajasthan, India
          </p>
        </div>
      </div>
    </div>
  );
}
