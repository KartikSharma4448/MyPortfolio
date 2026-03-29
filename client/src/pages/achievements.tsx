import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Award,
  ExternalLink,
  BookOpen,
  Code,
  Brain,
  Loader2,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Certificate, Skill } from "@shared/schema";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const levelColors: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  intermediate: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  advanced: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  expert: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const levelBar: Record<string, string> = {
  beginner: "w-1/4 bg-green-400",
  intermediate: "w-2/4 bg-blue-400",
  advanced: "w-3/4 bg-purple-400",
  expert: "w-full bg-orange-400",
};

const categoryAccents = [
  { top: "from-blue-500 to-blue-700", icon: "text-blue-400", bg: "bg-blue-500/10" },
  { top: "from-purple-500 to-purple-700", icon: "text-purple-400", bg: "bg-purple-500/10" },
  { top: "from-cyan-500 to-cyan-700", icon: "text-cyan-400", bg: "bg-cyan-500/10" },
  { top: "from-green-500 to-green-700", icon: "text-green-400", bg: "bg-green-500/10" },
  { top: "from-orange-500 to-orange-700", icon: "text-orange-400", bg: "bg-orange-500/10" },
];

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: certificates, isLoading: certificatesLoading } = useQuery<Certificate[]>({
    queryKey: ["/api/certificates"],
  });

  const { data: skills, isLoading: skillsLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const categories = ["all", "Microsoft", "Google", "Cloud", "Data Analytics", "Other"];

  const filteredCertificates =
    selectedCategory === "all"
      ? certificates
      : certificates?.filter((cert) =>
          cert.issuer.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-5">
            <Trophy className="h-3.5 w-3.5" />
            Achievements
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Achievements & Skills</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-primary rounded-full mx-auto mb-5" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing my certifications, skills, and continuous learning journey
          </p>
        </motion.div>

        <Tabs defaultValue="certificates" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="certificates" data-testid="tab-certificates">
              <Award className="h-4 w-4 mr-2" />
              Certifications
            </TabsTrigger>
            <TabsTrigger value="skills" data-testid="tab-skills">
              <Code className="h-4 w-4 mr-2" />
              Skills
            </TabsTrigger>
          </TabsList>

          <TabsContent value="certificates">
            {/* Certificate Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={staggerItem}>
                <Card className="hover-elevate transition-all duration-300 hover:-translate-y-1 h-full border-border/50 overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-primary to-blue-700" />
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Award className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">
                      {certificates?.length || 0}+
                    </div>
                    <div className="text-sm text-muted-foreground">Total Certifications</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Card className="hover-elevate transition-all duration-300 hover:-translate-y-1 h-full border-border/50 overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-chart-2 to-green-700" />
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-chart-2/10 flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="h-7 w-7 text-chart-2" />
                    </div>
                    <div className="text-3xl font-bold text-chart-2 mb-1">
                      {new Set(certificates?.map((c) => c.issuer)).size || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Platforms</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Card className="hover-elevate transition-all duration-300 hover:-translate-y-1 h-full border-border/50 overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-chart-3 to-cyan-700" />
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-chart-3/10 flex items-center justify-center mx-auto mb-3">
                      <Brain className="h-7 w-7 text-chart-3" />
                    </div>
                    <div className="text-3xl font-bold text-chart-3 mb-1">
                      {skills?.length || 0}+
                    </div>
                    <div className="text-sm text-muted-foreground">Skills</div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`filter-${category.toLowerCase()}`}
                  className={`capitalize transition-all duration-200 ${selectedCategory === category ? "shadow-sm shadow-primary/20" : ""}`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Certificates Grid */}
            {certificatesLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredCertificates && filteredCertificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((cert, idx) => {
                  const accent = categoryAccents[idx % categoryAccents.length];
                  return (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <Card
                        className="hover-elevate transition-all duration-300 hover:shadow-lg h-full border-border/50 overflow-hidden group"
                        data-testid={`certificate-${cert.id}`}
                      >
                        <div className={`h-1 bg-gradient-to-r ${accent.top}`} />
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                              <Award className={`h-5 w-5 ${accent.icon}`} />
                            </div>
                            {cert.credentialUrl && (
                              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-credential-${cert.id}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary transition-colors">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                            )}
                          </div>
                          <CardTitle className="text-base leading-snug">{cert.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className={`text-sm font-medium ${accent.icon}`}>{cert.issuer}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs border border-border/50">
                              {cert.issueDate}
                            </Badge>
                            {cert.credentialId && (
                              <span className="text-xs text-muted-foreground font-mono">
                                #{cert.credentialId.substring(0, 8)}
                              </span>
                            )}
                          </div>
                          {cert.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {cert.skills.slice(0, 3).map((skill, skillIdx) => (
                                <Badge key={skillIdx} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {cert.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs text-muted-foreground">
                                  +{cert.skills.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <Award className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground">No certifications found in this category.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="skills">
            {skillsLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : groupedSkills && Object.keys(groupedSkills).length > 0 ? (
              <div className="space-y-12">
                {Object.entries(groupedSkills).map(([category, categorySkills], catIdx) => {
                  const accent = categoryAccents[catIdx % categoryAccents.length];
                  return (
                    <div key={category}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                          <TrendingUp className={`h-5 w-5 ${accent.icon}`} />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold capitalize">{category}</h2>
                          <div className={`w-10 h-0.5 bg-gradient-to-r ${accent.top} mt-1 rounded-full`} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categorySkills.map((skill) => (
                          <motion.div
                            key={skill.id}
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                          >
                            <Card
                              className="hover-elevate transition-all duration-300 hover:shadow-md border-border/50 overflow-hidden group"
                              data-testid={`skill-${skill.id}`}
                            >
                              <div className={`h-0.5 bg-gradient-to-r ${accent.top}`} />
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="font-semibold">{skill.name}</h3>
                                  <Badge
                                    className={`text-xs border capitalize ${levelColors[skill.level] || "bg-muted text-muted-foreground border-border/50"}`}
                                  >
                                    {skill.level}
                                  </Badge>
                                </div>
                                {/* Skill level bar */}
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full transition-all duration-500 ${levelBar[skill.level] || "w-1/4 bg-muted-foreground"}`} />
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <Code className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground">No skills added yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
