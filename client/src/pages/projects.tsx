import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Loader2, FolderOpen, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import type { Project } from "@shared/schema";

const projectColors = [
  "from-blue-500/20 via-blue-600/10 to-transparent",
  "from-purple-500/20 via-purple-600/10 to-transparent",
  "from-cyan-500/20 via-cyan-600/10 to-transparent",
  "from-green-500/20 via-green-600/10 to-transparent",
  "from-orange-500/20 via-orange-600/10 to-transparent",
  "from-pink-500/20 via-pink-600/10 to-transparent",
];

const iconColors = ["text-blue-400", "text-purple-400", "text-cyan-400", "text-green-400", "text-orange-400", "text-pink-400"];
const topBars = [
  "from-blue-500 to-blue-700",
  "from-purple-500 to-purple-700",
  "from-cyan-500 to-cyan-700",
  "from-green-500 to-green-700",
  "from-orange-500 to-orange-700",
  "from-pink-500 to-pink-700",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const featuredProjects = projects?.filter((p) => p.featured === "true");
  const otherProjects = projects?.filter((p) => p.featured !== "true");

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-chart-2/10 border border-chart-2/20 text-chart-2 text-sm font-medium mb-5">
            <FolderOpen className="h-3.5 w-3.5" />
            Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-chart-2 to-primary rounded-full mx-auto mb-5" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building innovative solutions and learning through hands-on development
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : projects && projects.length > 0 ? (
          <>
            {/* Featured Projects */}
            {featuredProjects && featuredProjects.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-chart-2/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-chart-2" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Featured Projects</h2>
                    <div className="w-10 h-0.5 bg-gradient-to-r from-chart-2 to-transparent mt-1" />
                  </div>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {featuredProjects.map((project, idx) => (
                    <motion.div
                      key={project.id}
                      variants={staggerItem}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    >
                      <Card
                        className="hover-elevate transition-all duration-300 hover:shadow-2xl overflow-hidden group h-full border-border/50"
                        data-testid={`project-featured-${project.id}`}
                      >
                        {/* Project preview banner */}
                        <div className={`w-full h-44 bg-gradient-to-br ${projectColors[idx % projectColors.length]} flex items-center justify-center relative overflow-hidden`}>
                          <div className="absolute inset-0">
                            <div className="absolute top-3 left-3 w-14 h-14 rounded-full bg-white/5 blur-xl" />
                            <div className="absolute bottom-3 right-3 w-20 h-20 rounded-full bg-white/5 blur-xl" />
                          </div>
                          <FolderOpen className={`h-14 w-14 ${iconColors[idx % iconColors.length]} opacity-50 group-hover:scale-110 group-hover:opacity-70 transition-all duration-300 relative`} />
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-4">
                            <CardTitle className="text-xl leading-snug">{project.title}</CardTitle>
                            <Badge className="bg-chart-2/10 text-chart-2 border border-chart-2/20 shrink-0">
                              ✦ Featured
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((tech, techIdx) => (
                              <Badge key={techIdx} variant="secondary" className="text-xs border border-border/50 transition-transform hover:scale-105">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-3 pt-1">
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-live-${project.id}`}>
                                <Button size="sm" className="shadow-sm shadow-primary/20">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Live Demo
                                </Button>
                              </a>
                            )}
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-github-${project.id}`}>
                                <Button size="sm" variant="outline">
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
              </motion.section>
            )}

            {/* Other Projects */}
            {otherProjects && otherProjects.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FolderOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">More Projects</h2>
                    <div className="w-10 h-0.5 bg-gradient-to-r from-primary to-transparent mt-1" />
                  </div>
                </div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {otherProjects.map((project, idx) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <Card
                        className="hover-elevate transition-all duration-300 hover:shadow-lg group h-full border-border/50 overflow-hidden"
                        data-testid={`project-${project.id}`}
                      >
                        <div className={`h-1 bg-gradient-to-r ${topBars[idx % topBars.length]}`} />
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-start gap-3 text-lg">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${projectColors[idx % projectColors.length]} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300`}>
                              <FolderOpen className={`h-4 w-4 ${iconColors[idx % iconColors.length]}`} />
                            </div>
                            <span className="leading-tight">{project.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.slice(0, 4).map((tech, techIdx) => (
                              <Badge key={techIdx} variant="outline" className="text-xs transition-transform hover:scale-105">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 4 && (
                              <Badge variant="outline" className="text-xs text-muted-foreground">
                                +{project.technologies.length - 4}
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-2 pt-1">
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-live-${project.id}`}>
                                <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-primary transition-colors">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                            )}
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-github-${project.id}`}>
                                <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-foreground transition-colors">
                                  <Github className="h-4 w-4" />
                                </Button>
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground">No projects added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
