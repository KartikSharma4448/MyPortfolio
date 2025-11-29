import { useState } from "react";
import { GraduationCap, Briefcase, MapPin, Mail, Loader2, Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Education, Experience, ProfessionalSummary, AboutContent, Skill, Project, Certificate } from "@shared/schema";

interface CVData {
  about: AboutContent | null;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  socialLinks: { platform: string; url: string }[];
  professionalSummary: ProfessionalSummary[];
}

function generateCVText(data: CVData): string {
  const lines: string[] = [];
  
  lines.push("=".repeat(60));
  lines.push("CURRICULUM VITAE");
  lines.push("=".repeat(60));
  lines.push("");
  
  if (data.about) {
    lines.push(data.about.title.toUpperCase());
    if (data.about.subtitle) {
      lines.push(data.about.subtitle);
    }
    lines.push("-".repeat(40));
    if (data.about.description) {
      lines.push("");
      lines.push(data.about.description);
    }
    lines.push("");
  }

  if (data.professionalSummary && data.professionalSummary.length > 0) {
    lines.push("PROFESSIONAL SUMMARY");
    lines.push("-".repeat(40));
    data.professionalSummary.forEach(item => {
      lines.push(item.paragraph);
      lines.push("");
    });
  }

  if (data.socialLinks && data.socialLinks.length > 0) {
    lines.push("CONTACT & SOCIAL LINKS");
    lines.push("-".repeat(40));
    data.socialLinks.forEach(link => {
      lines.push(`${link.platform}: ${link.url}`);
    });
    lines.push("");
  }

  if (data.education && data.education.length > 0) {
    lines.push("EDUCATION");
    lines.push("-".repeat(40));
    data.education.forEach(edu => {
      lines.push(`${edu.institution}`);
      lines.push(`  ${edu.degree}${edu.specialization ? ` - ${edu.specialization}` : ""}`);
      lines.push(`  Duration: ${edu.duration}${edu.grade ? ` | Grade: ${edu.grade}` : ""}`);
      lines.push("");
    });
  }

  if (data.experience && data.experience.length > 0) {
    lines.push("EXPERIENCE");
    lines.push("-".repeat(40));
    data.experience.forEach(exp => {
      lines.push(`${exp.role} at ${exp.company} (${exp.type})`);
      lines.push(`  ${exp.duration} | ${exp.location}`);
      if (exp.description) {
        lines.push(`  ${exp.description}`);
      }
      lines.push("");
    });
  }

  if (data.skills && data.skills.length > 0) {
    lines.push("SKILLS");
    lines.push("-".repeat(40));
    const skillsByCategory: { [key: string]: string[] } = {};
    data.skills.forEach(skill => {
      const category = skill.category || "General";
      if (!skillsByCategory[category]) {
        skillsByCategory[category] = [];
      }
      skillsByCategory[category].push(`${skill.name}${skill.level ? ` (${skill.level}%)` : ""}`);
    });
    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      lines.push(`${category}: ${skills.join(", ")}`);
    });
    lines.push("");
  }

  if (data.projects && data.projects.length > 0) {
    lines.push("PROJECTS");
    lines.push("-".repeat(40));
    data.projects.forEach(project => {
      lines.push(`${project.title}`);
      if (project.description) {
        lines.push(`  ${project.description}`);
      }
      if (project.technologies && project.technologies.length > 0) {
        lines.push(`  Technologies: ${project.technologies.join(", ")}`);
      }
      if (project.liveUrl) {
        lines.push(`  Live: ${project.liveUrl}`);
      }
      if (project.githubUrl) {
        lines.push(`  GitHub: ${project.githubUrl}`);
      }
      lines.push("");
    });
  }

  if (data.certificates && data.certificates.length > 0) {
    lines.push("CERTIFICATES");
    lines.push("-".repeat(40));
    data.certificates.forEach(cert => {
      lines.push(`${cert.title} - ${cert.issuer}`);
      if (cert.issueDate) {
        lines.push(`  Issued: ${cert.issueDate}`);
      }
      if (cert.credentialId) {
        lines.push(`  Credential ID: ${cert.credentialId}`);
      }
      if (cert.credentialUrl) {
        lines.push(`  Verify: ${cert.credentialUrl}`);
      }
      lines.push("");
    });
  }

  lines.push("=".repeat(60));
  lines.push(`Generated on ${new Date().toLocaleDateString()}`);
  lines.push("=".repeat(60));

  return lines.join("\n");
}

export default function About() {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const { data: education = [], isLoading: educationLoading } = useQuery<Education[]>({
    queryKey: ["/api/education"],
  });

  const { data: experienceData = [], isLoading: experienceLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experience"],
  });

  const { data: professionalSummary = [], isLoading: summaryLoading } = useQuery<ProfessionalSummary[]>({
    queryKey: ["/api/professional-summary"],
  });

  const { data: aboutContent } = useQuery<AboutContent | null>({
    queryKey: ["/api/about-content"],
  });

  const isLoading = educationLoading || experienceLoading || summaryLoading;

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/generate-cv");
      if (!response.ok) throw new Error("Failed to generate CV");
      const data: CVData = await response.json();
      
      const cvText = generateCVText(data);
      const blob = new Blob([cvText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "CV.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({ title: "CV downloaded successfully!" });
    } catch {
      toast({ title: "Failed to download CV", variant: "destructive" });
    } finally {
      setIsDownloading(false);
    }
  };

  const defaultEducation = [
    {
      id: "default-1",
      institution: "Vivekananda Global University",
      degree: "Bachelor in Computer Applications (BCA)",
      specialization: "Full Stack and Cloud Computing",
      duration: "Sep 2024 - Jul 2027",
      grade: "9.43 CGPA",
      order: 0,
      createdAt: new Date(),
    },
    {
      id: "default-2",
      institution: "A.S. Public Senior Secondary School",
      degree: "12th Grade",
      specialization: "Science (Mathematics)",
      duration: "Completed",
      grade: "96%",
      order: 1,
      createdAt: new Date(),
    },
  ];

  const defaultExperience = [
    {
      id: "default-1",
      role: "Computer Teacher",
      company: "Anukriti Prakashan",
      type: "Part-time",
      duration: "Mar 2025 - Present",
      location: "Jaipur, Rajasthan, India",
      description: "Teaching computer fundamentals and modern technologies to students, developing curriculum materials, and fostering digital literacy.",
      order: 0,
      createdAt: new Date(),
    },
    {
      id: "default-2",
      role: "Computer Teacher",
      company: "InfoSphere",
      type: "Part-time",
      duration: "Sep 2024 - Aug 2025",
      location: "Jaipur, Rajasthan, India",
      description: "Taught the RS-CIT course, focusing on computer fundamentals and digital literacy. Designed engaging lessons and provided hands-on training.",
      order: 1,
      createdAt: new Date(),
    },
    {
      id: "default-3",
      role: "Back End Developer",
      company: "Zenz Aawara",
      type: "Internship",
      duration: "May 2025 - Jul 2025",
      location: "Jaipur, Rajasthan, India (Hybrid)",
      description: "Contributed to backend development by designing and optimizing server-side code while building RESTful APIs for effective data management.",
      order: 2,
      createdAt: new Date(),
    },
  ];

  const defaultSummary = [
    {
      id: "default-1",
      paragraph: "My academic curriculum has provided me with exposure to programming languages such as C, Python, and Java, as well as practical knowledge in web development, database management, and cloud computing.",
      order: 0,
      createdAt: new Date(),
    },
    {
      id: "default-2",
      paragraph: "I am passionate about applying my theoretical knowledge to real-world projects. I have gained hands-on experience through internships and teaching roles, where I've developed both technical expertise and communication skills.",
      order: 1,
      createdAt: new Date(),
    },
    {
      id: "default-3",
      paragraph: "I'm actively seeking opportunities to contribute to innovative projects, expand my skill set, and grow as a professional in the tech industry.",
      order: 2,
      createdAt: new Date(),
    },
  ];

  const displayEducation = education.length > 0 ? education : defaultEducation;
  const displayExperience = experienceData.length > 0 ? experienceData : defaultExperience;
  const displaySummary = professionalSummary.length > 0 ? professionalSummary : defaultSummary;

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-about-title">
            {aboutContent?.title || "About Me"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6" data-testid="text-about-description">
            {aboutContent?.description || "I am currently pursuing my Bachelor of Computer Applications (BCA), where I am building a strong foundation in programming, computer science concepts, and modern technologies."}
          </p>
          <Button
            onClick={handleDownloadCV}
            disabled={isDownloading}
            size="lg"
            data-testid="button-download-cv"
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Download CV
          </Button>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            {displaySummary.map((item) => (
              <p key={item.id} data-testid={`text-summary-${item.id}`}>{item.paragraph}</p>
            ))}
          </CardContent>
        </Card>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>

          <div className="space-y-6">
            {displayEducation.map((edu) => (
              <Card
                key={edu.id}
                className="hover-elevate transition-transform hover:-translate-y-1"
                data-testid={`card-education-${edu.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        {edu.institution}
                      </h3>
                      <p className="text-muted-foreground">{edu.degree}</p>
                      {edu.specialization && (
                        <p className="text-sm text-muted-foreground">
                          {edu.specialization}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <Badge variant="secondary">{edu.duration}</Badge>
                      {edu.grade && (
                        <Badge className="bg-chart-2 hover:bg-chart-2">
                          Grade: {edu.grade}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>

          <div className="space-y-6">
            {displayExperience.map((exp) => (
              <Card
                key={exp.id}
                className="hover-elevate transition-transform hover:-translate-y-1"
                data-testid={`card-experience-${exp.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                      <p className="text-lg text-muted-foreground mb-1">
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <Badge variant="secondary">{exp.duration}</Badge>
                      <Badge variant="outline">{exp.type}</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card className="mt-12 bg-gradient-to-br from-primary/5 to-chart-2/5">
          <CardContent className="p-8 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Based in Jaipur</h3>
            <p className="text-muted-foreground">
              Rajasthan, India - Open to remote and on-site opportunities
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
