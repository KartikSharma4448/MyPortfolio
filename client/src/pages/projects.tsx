import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Loader2, FolderOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building innovative solutions and learning through hands-on
            development
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : projects && projects.length > 0 ? (
          <>
            {/* Featured Projects */}
            {featuredProjects && featuredProjects.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="hover-elevate transition-transform hover:-translate-y-1 overflow-hidden"
                      data-testid={`project-featured-${project.id}`}
                    >
                      {project.imageUrl && (
                        <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                          <FolderOpen className="h-16 w-16 text-muted-foreground/30" />
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
                            <Badge key={idx} variant="secondary">
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
                              data-testid={`link-live-${project.id}`}
                            >
                              <Button size="sm">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Live Demo
                              </Button>
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid={`link-github-${project.id}`}
                            >
                              <Button size="sm" variant="outline">
                                <Github className="h-4 w-4 mr-2" />
                                GitHub
                              </Button>
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Other Projects */}
            {otherProjects && otherProjects.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-8">More Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="hover-elevate transition-transform hover:-translate-y-1"
                      data-testid={`project-${project.id}`}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-start gap-3">
                          <FolderOpen className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <span className="leading-tight">{project.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid={`link-live-${project.id}`}
                            >
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 hover-elevate active-elevate-2"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid={`link-github-${project.id}`}
                            >
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 hover-elevate active-elevate-2"
                              >
                                <Github className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No projects added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
