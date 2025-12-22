import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowDown, Github, Linkedin, Mail, ExternalLink, FolderOpen, Award, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/3d-background";
import type { Project, Certificate } from "@shared/schema";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: certificates = [] } = useQuery<Certificate[]>({
    queryKey: ["/api/certificates"],
  });

  const featuredProjects = projects.filter((p) => p.featured === "true").slice(0, 2);

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

  const stats = [
    { label: "Years of Study", value: "2+" },
    { label: "Certifications", value: `${certificates.length}+` },
    { label: "Projects", value: `${projects.length}+` },
    { label: "CGPA", value: "9.43" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* 3D Animated Background */}
        <AnimatedBackground />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 lg:px-8 py-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <img
                  src="/favicon.png"
                  alt="Kartik Sharma"
                  className="w-32 h-32 rounded-full object-cover shadow-xl"
                />
                <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-br from-primary to-chart-2 opacity-30 blur-xl animate-pulse -z-10" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent inline-block animate-gradient">
                Kartik Sharma
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-4"
            >
              Kartik Sharma Jaipur | Software Developer | Freelancer
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Software Developer & Freelancer in Jaipur, turning complex problems into elegant digital solutions. Explore my work and let's build something amazing together.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
              <Link href="/projects">
                <Button size="lg" className="group relative overflow-hidden" data-testid="button-view-projects">
                  <span className="relative z-10">View My Work</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-2/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden"
                  data-testid="button-contact-me"
                >
                  <span className="relative z-10">Contact Me</span>
                  <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex gap-4 justify-center mb-8"
            >
              <a
                href="https://linkedin.com/in/kartik-sharma06"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover-elevate active-elevate-2 transition-all duration-300 hover:scale-110"
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
                  className="hover-elevate active-elevate-2 transition-all duration-300 hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover-elevate active-elevate-2 transition-all duration-300 hover:scale-110"
                  data-testid="button-email-icon"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="animate-bounce"
            >
              <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover-elevate transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Skills
            </h2>
            <p className="text-muted-foreground mb-8">
              Technologies and tools I work with
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 justify-center mb-8"
            >
              {skills.map((skill, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm hover-elevate transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/achievements">
                <Button variant="outline" className="group relative overflow-hidden" data-testid="button-view-all-skills">
                  <span className="relative z-10">View All Skills & Certifications</span>
                  <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Projects
              </h2>
              <p className="text-muted-foreground">
                Showcase of my best work and recent accomplishments
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {featuredProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <Card
                    className="hover-elevate transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden group h-full"
                    data-testid={`featured-project-${project.id}`}
                  >
                    {project.imageUrl && (
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center relative overflow-hidden">
                        <FolderOpen className="h-16 w-16 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-2xl">
                          {project.title}
                        </CardTitle>
                        <Badge className="bg-chart-2 hover:bg-chart-2">
                          Featured
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="transition-transform hover:scale-105">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`link-live-project-${project.id}`}
                          >
                            <Button size="sm" className="group/btn relative overflow-hidden">
                              <span className="relative z-10 flex items-center">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Live Demo
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-2/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            </Button>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`link-github-project-${project.id}`}
                          >
                            <Button size="sm" variant="outline" className="group/btn relative overflow-hidden">
                              <span className="relative z-10 flex items-center">
                                <Github className="h-4 w-4 mr-2" />
                                GitHub
                              </span>
                              <div className="absolute inset-0 bg-primary/5 scale-0 group-hover/btn:scale-100 transition-transform duration-300" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Link href="/projects">
                <Button variant="outline" className="group relative overflow-hidden" data-testid="button-view-all-projects">
                  <span className="relative z-10">View All Projects</span>
                  <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-chart-2/10">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I'm open to internship opportunities, freelance projects, and
              collaboration. Let's build something amazing!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group relative overflow-hidden" data-testid="button-get-in-touch">
                  <span className="relative z-10">Get In Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-2/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden"
                  data-testid="button-view-services"
                >
                  <span className="relative z-10">View Services</span>
                  <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
