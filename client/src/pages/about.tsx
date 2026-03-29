import { GraduationCap, Briefcase, MapPin, Sparkles, ExternalLink, Calendar, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import type { AboutContent } from "@shared/schema";

export default function About() {
  const { data: aboutContent, isLoading } = useQuery<AboutContent | null>({
    queryKey: ["/api/about-content"],
    queryFn: async () => {
      const response = await fetch("/api/about-content");
      if (!response.ok) return null;
      return response.json();
    },
  });

  const defaultEducation = [
    {
      institution: "Vivekananda Global University",
      degree: "Bachelor in Computer Applications (BCA)",
      specialization: "Full Stack and Cloud Computing",
      duration: "Sep 2024 - Jul 2027",
      grade: "9.43 CGPA",
    },
    {
      institution: "A.S. Public Senior Secondary School",
      degree: "12th Grade",
      specialization: "Science (Mathematics)",
      duration: "Completed",
      grade: "96%",
    },
  ];

  const defaultExperience = [
    {
      role: "Computer Teacher",
      company: "Anukriti Prakashan",
      type: "Part-time",
      duration: "Mar 2025 - Present",
      location: "Jaipur, Rajasthan, India",
      description:
        "Teaching computer fundamentals and modern technologies to students, developing curriculum materials, and fostering digital literacy.",
    },
    {
      role: "Computer Teacher",
      company: "InfoSphere",
      type: "Part-time",
      duration: "Sep 2024 - Aug 2025",
      location: "Jaipur, Rajasthan, India",
      description:
        "Taught the RS-CIT course, focusing on computer fundamentals and digital literacy. Designed engaging lessons and provided hands-on training.",
    },
    {
      role: "Back End Developer",
      company: "Zenz Aawara",
      type: "Internship",
      duration: "May 2025 - Jul 2025",
      location: "Jaipur, Rajasthan, India (Hybrid)",
      description:
        "Contributed to backend development by designing and optimizing server-side code while building RESTful APIs for effective data management.",
    },
  ];

  const getEducation = () => {
    try {
      return (aboutContent as any)?.educationJson
        ? JSON.parse((aboutContent as any).educationJson)
        : defaultEducation;
    } catch {
      return defaultEducation;
    }
  };

  const getExperience = () => {
    try {
      return (aboutContent as any)?.experienceJson
        ? JSON.parse((aboutContent as any).experienceJson)
        : defaultExperience;
    } catch {
      return defaultExperience;
    }
  };

  const education = getEducation();
  const experience = getExperience();

  const quickStats = [
    { label: "CGPA", value: "9.43" },
    { label: "Projects", value: "5+" },
    { label: "Experience", value: "2 Roles" },
  ];

  const typeColors: Record<string, string> = {
    "Part-time": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Internship": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Full-time": "bg-green-500/10 text-green-400 border-green-500/20",
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

        {/* Hero Section — Photo + Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className="overflow-hidden border-border/50">
            <div className="bg-gradient-to-br from-primary/10 via-background to-chart-2/10 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Photo */}
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-chart-2 to-chart-3 opacity-60 blur-sm" />
                  <img
                    src="/favicon.png"
                    alt="Kartik Sharma"
                    className="relative w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-background shadow-2xl"
                  />
                  <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-background" title="Available" />
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  {isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-10 w-64 rounded-md" />
                      <Skeleton className="h-5 w-48 rounded-md" />
                      <Skeleton className="h-16 w-full rounded-md" />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        {aboutContent?.title || "About Me"}
                      </h1>
                      {aboutContent?.subtitle && (
                        <p className="text-primary font-semibold text-lg mb-3">{aboutContent.subtitle}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mb-4">
                        <Badge variant="secondary" className="flex items-center gap-1 border border-border/50">
                          <MapPin className="h-3 w-3" /> Jaipur, Rajasthan
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1 border border-border/50">
                          <GraduationCap className="h-3 w-3" /> BCA Student
                        </Badge>
                        <Badge className="bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                          Open to Opportunities
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">
                        {aboutContent?.description ||
                          "BCA student building a strong foundation in programming, web development, cloud computing, and modern technologies — passionate about creating elegant digital solutions."}
                      </p>
                    </>
                  )}

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-6 mt-6 justify-center md:justify-start">
                    {quickStats.map((stat, i) => (
                      <div key={i} className="text-center md:text-left">
                        <div className="text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                    <Link href="/contact">
                      <Button size="sm" className="shadow-sm shadow-primary/20">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Hire Me
                      </Button>
                    </Link>
                    <Link href="/projects">
                      <Button size="sm" variant="outline">
                        View Projects
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Professional Summary */}
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="mb-12">
          <Card className="border-border/50 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary to-chart-2" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                Professional Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              {(aboutContent as any)?.professionalSummary ? (
                <p>{(aboutContent as any).professionalSummary}</p>
              ) : (
                <>
                  <p>
                    My academic curriculum has provided me with exposure to
                    programming languages such as C, Python, and Java, as well as
                    practical knowledge in web development, database management, and
                    cloud computing.
                  </p>
                  <p>
                    I am passionate about applying my theoretical knowledge to
                    real-world projects. I have gained hands-on experience through
                    internships and teaching roles, where I've developed both
                    technical expertise and communication skills.
                  </p>
                  <p>
                    I'm actively seeking opportunities to contribute to innovative
                    projects, expand my skill set, and grow as a professional in the
                    tech industry.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Education */}
        <section className="mb-12">
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Education</h2>
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent mt-1" />
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {education.map((edu: any, index: number) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="hover-elevate transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden group">
                  <div className="flex">
                    <div className="w-1 bg-gradient-to-b from-blue-400 to-blue-600 flex-shrink-0 group-hover:w-1.5 transition-all duration-300" />
                    <CardContent className="p-6 flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                            <Building2 className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{edu.institution}</h3>
                            <p className="text-muted-foreground font-medium">{edu.degree}</p>
                            {edu.specialization && (
                              <p className="text-sm text-muted-foreground mt-0.5">{edu.specialization}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                          <Badge variant="secondary" className="flex items-center gap-1 border border-border/50">
                            <Calendar className="h-3 w-3" />
                            {edu.duration}
                          </Badge>
                          <Badge className="bg-chart-2/10 text-chart-2 border border-chart-2/20">
                            🎓 {edu.grade}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Experience</h2>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent mt-1" />
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {experience.map((exp: any, index: number) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="hover-elevate transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden group">
                  <div className="flex">
                    <div className="w-1 bg-gradient-to-b from-purple-400 to-purple-600 flex-shrink-0 group-hover:w-1.5 transition-all duration-300" />
                    <CardContent className="p-6 flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                            <Briefcase className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-0.5">{exp.role}</h3>
                            <p className="text-primary font-medium">{exp.company}</p>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {exp.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                          <Badge variant="secondary" className="flex items-center gap-1 border border-border/50">
                            <Calendar className="h-3 w-3" />
                            {exp.duration}
                          </Badge>
                          <Badge
                            className={`border ${typeColors[exp.type] || "bg-muted text-muted-foreground border-border/50"}`}
                          >
                            {exp.type}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm ml-14">{exp.description}</p>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Location Card */}
        <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
          <Card className="bg-gradient-to-br from-primary/5 to-chart-2/5 hover-elevate transition-all border-border/50 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary to-chart-2" />
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Based in Jaipur</h3>
              <p className="text-muted-foreground mb-5">
                Rajasthan, India • Open to remote and on-site opportunities
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Get In Touch
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
