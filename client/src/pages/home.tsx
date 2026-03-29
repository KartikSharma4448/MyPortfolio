import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowDown, Github, Linkedin, Mail, ExternalLink, FolderOpen, Award, Calendar, Star, Code2, Layers, BrainCircuit, Globe, Terminal, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/3d-background";
import type { Project, Certificate } from "@shared/schema";

const roles = ["Full Stack Developer", "Freelancer", "Cloud Enthusiast", "AI Explorer"];

function TypewriterRole() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = roles[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent font-bold">
        {displayed}
      </span>
      <span className="w-0.5 h-7 bg-primary animate-pulse inline-block align-middle" />
    </span>
  );
}

const skillItems = [
  { label: "Web Development", icon: Globe, color: "text-blue-400" },
  { label: "Python", icon: Terminal, color: "text-yellow-400" },
  { label: "Java", icon: Code2, color: "text-orange-400" },
  { label: "Cloud Computing", icon: Layers, color: "text-cyan-400" },
  { label: "AI & Prompting", icon: BrainCircuit, color: "text-purple-400" },
  { label: "Database", icon: Database, color: "text-green-400" },
  { label: "C Programming", icon: Terminal, color: "text-red-400" },
  { label: "Microsoft Office", icon: Star, color: "text-teal-400" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  const { data: projects = [] } = useQuery<Project[]>({ queryKey: ["/api/projects"] });
  const { data: certificates = [] } = useQuery<Certificate[]>({ queryKey: ["/api/certificates"] });

  const featuredProjects = projects.filter((p) => p.featured === "true").slice(0, 2);

  const stats = [
    { label: "Years of Study", value: "2+", icon: Calendar, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Certifications", value: `${certificates.length || 10}+`, icon: Award, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "Projects Built", value: `${projects.length || 5}+`, icon: FolderOpen, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "CGPA Score", value: "9.43", icon: Star, color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
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
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-chart-2 to-chart-3 opacity-75 blur-sm animate-pulse" />
                <img
                  src="/favicon.png"
                  alt="Kartik Sharma"
                  className="relative w-32 h-32 rounded-full object-cover shadow-xl border-2 border-background"
                />
              </div>
            </motion.div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mb-5"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for Opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent inline-block animate-gradient">
                Kartik Sharma
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-2xl md:text-3xl font-semibold mb-4 h-10 flex items-center justify-center"
            >
              <TypewriterRole />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              BCA student from Jaipur, turning complex problems into elegant digital solutions.
              Open to internships, freelance work, and collaborations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4 justify-center mb-10"
            >
              <Link href="/projects">
                <Button size="lg" className="group relative overflow-hidden shadow-lg shadow-primary/20" data-testid="button-view-projects">
                  <span className="relative z-10 flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    View My Work
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-2/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="group relative overflow-hidden border-white/30 text-white hover:text-white hover:bg-white/10" data-testid="button-contact-me">
                  <span className="relative z-10 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Me
                  </span>
                </Button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex gap-3 justify-center mb-10"
            >
              <a href="https://linkedin.com/in/kartik-sharma06" target="_blank" rel="noopener noreferrer" data-testid="link-linkedin">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-blue-400 hover:border-blue-400/30 border border-white/10 hover:bg-blue-500/10 transition-all duration-300">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://github.com/kartiksharma4448" target="_blank" rel="noopener noreferrer" data-testid="link-github">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-primary hover:border-primary/30 border border-white/10 hover:bg-primary/10 transition-all duration-300" data-testid="button-email-icon">
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="animate-bounce opacity-60"
            >
              <ArrowDown className="h-6 w-6 mx-auto text-white/50" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="hover-elevate transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group border-border/50">
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <Code2 className="h-3.5 w-3.5" />
              Tech Stack
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Core Skills</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full mx-auto mb-6" />
            <p className="text-muted-foreground mb-10">
              Technologies and tools I work with regularly
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 justify-center mb-10"
            >
              {skillItems.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <Badge
                      variant="secondary"
                      className="px-4 py-2 text-sm hover-elevate transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default flex items-center gap-2 border border-border/50"
                    >
                      <Icon className={`h-3.5 w-3.5 ${skill.color}`} />
                      {skill.label}
                    </Badge>
                  </motion.div>
                );
              })}
            </motion.div>

            <Link href="/achievements">
              <Button variant="outline" className="group relative overflow-hidden" data-testid="button-view-all-skills">
                <span className="relative z-10">View All Skills & Certifications</span>
                <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-20 bg-card/50 border-y border-border">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chart-2/10 border border-chart-2/20 text-chart-2 text-sm font-medium mb-4">
                <FolderOpen className="h-3.5 w-3.5" />
                Portfolio
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Projects</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-chart-2 to-primary rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Showcase of my best work and recent accomplishments</p>
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
                    className="hover-elevate transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden group h-full border-border/50"
                    data-testid={`featured-project-${project.id}`}
                  >
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 via-chart-2/10 to-chart-3/20 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-primary/40 blur-2xl" />
                        <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-chart-2/40 blur-2xl" />
                      </div>
                      <FolderOpen className="h-16 w-16 text-primary/40 group-hover:scale-110 transition-transform duration-300 relative" />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <Badge className="bg-chart-2/20 text-chart-2 hover:bg-chart-2/30 border-chart-2/30 shrink-0">
                          ✦ Featured
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs transition-transform hover:scale-105 border border-border/50">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3 pt-2">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-live-project-${project.id}`}>
                            <Button size="sm" className="group/btn relative overflow-hidden shadow-sm shadow-primary/20">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </Button>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-github-project-${project.id}`}>
                            <Button size="sm" variant="outline" className="group/btn">
                              <Github className="h-4 w-4 mr-2" />
                              GitHub
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-chart-2/10" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-chart-2/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full mx-auto mb-6" />
            <p className="text-lg text-muted-foreground mb-10">
              I'm open to internship opportunities, freelance projects, and collaboration.
              Let's build something amazing!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group relative overflow-hidden shadow-lg shadow-primary/20" data-testid="button-get-in-touch">
                  <Mail className="h-4 w-4 mr-2" />
                  Get In Touch
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-2/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="group relative overflow-hidden" data-testid="button-view-services">
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
