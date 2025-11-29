import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  insertAboutContentSchema, 
  insertEducationSchema,
  insertExperienceSchema,
  insertProfessionalSummarySchema,
  type AboutContent, 
  type InsertAboutContent,
  type Education,
  type InsertEducation,
  type Experience,
  type InsertExperience,
  type ProfessionalSummary,
  type InsertProfessionalSummary,
} from "@shared/schema";
import { Loader2, Plus, Trash2, GraduationCap, Briefcase, FileText, Edit2 } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function EducationForm({ education, onClose }: { education?: Education; onClose: () => void }) {
  const { toast } = useToast();
  const form = useForm<InsertEducation>({
    resolver: zodResolver(insertEducationSchema),
    defaultValues: {
      institution: education?.institution || "",
      degree: education?.degree || "",
      specialization: education?.specialization || "",
      duration: education?.duration || "",
      grade: education?.grade || "",
      order: education?.order || 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertEducation) => {
      if (education) {
        return await apiRequest("PATCH", `/api/education/${education.id}`, data);
      }
      return await apiRequest("POST", "/api/education", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/education"] });
      toast({ title: education ? "Education updated" : "Education added" });
      onClose();
    },
    onError: () => {
      toast({ title: "Failed to save education", variant: "destructive" });
    },
  });

  return (
    <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <Label>Institution</Label>
        <Input {...form.register("institution")} placeholder="University/School name" data-testid="input-education-institution" />
      </div>
      <div>
        <Label>Degree</Label>
        <Input {...form.register("degree")} placeholder="Bachelor's, Master's, etc." data-testid="input-education-degree" />
      </div>
      <div>
        <Label>Specialization (Optional)</Label>
        <Input {...form.register("specialization")} placeholder="Major/Specialization" data-testid="input-education-specialization" />
      </div>
      <div>
        <Label>Duration</Label>
        <Input {...form.register("duration")} placeholder="Sep 2024 - Jul 2027" data-testid="input-education-duration" />
      </div>
      <div>
        <Label>Grade (Optional)</Label>
        <Input {...form.register("grade")} placeholder="9.0 CGPA / 90%" data-testid="input-education-grade" />
      </div>
      <div>
        <Label>Order</Label>
        <Input type="number" {...form.register("order", { valueAsNumber: true })} placeholder="0" data-testid="input-education-order" />
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={mutation.isPending} data-testid="button-save-education">
          {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
}

function ExperienceForm({ experience, onClose }: { experience?: Experience; onClose: () => void }) {
  const { toast } = useToast();
  const form = useForm<InsertExperience>({
    resolver: zodResolver(insertExperienceSchema),
    defaultValues: {
      role: experience?.role || "",
      company: experience?.company || "",
      type: experience?.type || "",
      duration: experience?.duration || "",
      location: experience?.location || "",
      description: experience?.description || "",
      order: experience?.order || 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertExperience) => {
      if (experience) {
        return await apiRequest("PATCH", `/api/experience/${experience.id}`, data);
      }
      return await apiRequest("POST", "/api/experience", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experience"] });
      toast({ title: experience ? "Experience updated" : "Experience added" });
      onClose();
    },
    onError: () => {
      toast({ title: "Failed to save experience", variant: "destructive" });
    },
  });

  return (
    <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <Label>Role/Position</Label>
        <Input {...form.register("role")} placeholder="Software Developer" data-testid="input-experience-role" />
      </div>
      <div>
        <Label>Company</Label>
        <Input {...form.register("company")} placeholder="Company name" data-testid="input-experience-company" />
      </div>
      <div>
        <Label>Type</Label>
        <Input {...form.register("type")} placeholder="Full-time, Part-time, Internship" data-testid="input-experience-type" />
      </div>
      <div>
        <Label>Duration</Label>
        <Input {...form.register("duration")} placeholder="Jan 2024 - Present" data-testid="input-experience-duration" />
      </div>
      <div>
        <Label>Location</Label>
        <Input {...form.register("location")} placeholder="City, Country" data-testid="input-experience-location" />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea {...form.register("description")} placeholder="Describe your responsibilities..." rows={4} data-testid="input-experience-description" />
      </div>
      <div>
        <Label>Order</Label>
        <Input type="number" {...form.register("order", { valueAsNumber: true })} placeholder="0" data-testid="input-experience-order" />
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={mutation.isPending} data-testid="button-save-experience">
          {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
}

function SummaryForm({ summary, onClose }: { summary?: ProfessionalSummary; onClose: () => void }) {
  const { toast } = useToast();
  const form = useForm<InsertProfessionalSummary>({
    resolver: zodResolver(insertProfessionalSummarySchema),
    defaultValues: {
      paragraph: summary?.paragraph || "",
      order: summary?.order || 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertProfessionalSummary) => {
      if (summary) {
        return await apiRequest("PATCH", `/api/professional-summary/${summary.id}`, data);
      }
      return await apiRequest("POST", "/api/professional-summary", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/professional-summary"] });
      toast({ title: summary ? "Summary updated" : "Summary added" });
      onClose();
    },
    onError: () => {
      toast({ title: "Failed to save summary", variant: "destructive" });
    },
  });

  return (
    <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <Label>Paragraph</Label>
        <Textarea {...form.register("paragraph")} placeholder="Write a summary paragraph..." rows={6} data-testid="input-summary-paragraph" />
      </div>
      <div>
        <Label>Order</Label>
        <Input type="number" {...form.register("order", { valueAsNumber: true })} placeholder="0" data-testid="input-summary-order" />
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={mutation.isPending} data-testid="button-save-summary">
          {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
}

export default function AdminAbout() {
  const { toast } = useToast();
  const [statsInput, setStatsInput] = useState("");
  const [educationDialogOpen, setEducationDialogOpen] = useState(false);
  const [experienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | undefined>();
  const [editingExperience, setEditingExperience] = useState<Experience | undefined>();
  const [editingSummary, setEditingSummary] = useState<ProfessionalSummary | undefined>();

  const { data: aboutContent, isLoading: aboutLoading } = useQuery<AboutContent | null>({
    queryKey: ["/api/about-content"],
  });

  const { data: education = [], isLoading: educationLoading } = useQuery<Education[]>({
    queryKey: ["/api/education"],
  });

  const { data: experience = [], isLoading: experienceLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experience"],
  });

  const { data: professionalSummary = [], isLoading: summaryLoading } = useQuery<ProfessionalSummary[]>({
    queryKey: ["/api/professional-summary"],
  });

  const form = useForm<InsertAboutContent>({
    resolver: zodResolver(insertAboutContentSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      profileImage: "",
      stats: [],
    },
  });

  useEffect(() => {
    if (aboutContent) {
      form.reset({
        title: aboutContent.title,
        subtitle: aboutContent.subtitle,
        description: aboutContent.description,
        profileImage: aboutContent.profileImage || "",
        stats: aboutContent.stats || [],
      });
      setStatsInput(aboutContent.stats?.join("\n") || "");
    }
  }, [aboutContent, form]);

  const saveMutation = useMutation({
    mutationFn: async (data: InsertAboutContent) => {
      return await apiRequest("POST", "/api/about-content", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/about-content"] });
      toast({ title: "About content updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update about content", variant: "destructive" });
    },
  });

  const deleteEducationMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/education/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/education"] });
      toast({ title: "Education deleted" });
    },
  });

  const deleteExperienceMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/experience/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experience"] });
      toast({ title: "Experience deleted" });
    },
  });

  const deleteSummaryMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/professional-summary/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/professional-summary"] });
      toast({ title: "Summary paragraph deleted" });
    },
  });

  const onSubmit = (data: InsertAboutContent) => {
    const stats = statsInput.split("\n").map(s => s.trim()).filter(Boolean);
    saveMutation.mutate({ ...data, profileImage: data.profileImage || null, stats });
  };

  const isLoading = aboutLoading || educationLoading || experienceLoading || summaryLoading;

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold" data-testid="text-admin-about-title">Manage About Page</h1>
          <p className="text-muted-foreground">Update your about page content, education, experience, and professional summary</p>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic" data-testid="tab-basic">Basic Info</TabsTrigger>
            <TabsTrigger value="education" data-testid="tab-education">Education</TabsTrigger>
            <TabsTrigger value="experience" data-testid="tab-experience">Experience</TabsTrigger>
            <TabsTrigger value="summary" data-testid="tab-summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic About Content</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" data-testid="input-about-title" {...form.register("title")} placeholder="About Me" />
                  </div>
                  <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input id="subtitle" data-testid="input-about-subtitle" {...form.register("subtitle")} placeholder="Software Developer" />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" data-testid="input-about-description" {...form.register("description")} placeholder="Write your about description" rows={6} />
                  </div>
                  <div>
                    <Label htmlFor="profileImage">Profile Image URL</Label>
                    <Input id="profileImage" data-testid="input-about-profile-image" {...form.register("profileImage")} placeholder="https://example.com/profile.jpg" />
                  </div>
                  <div>
                    <Label htmlFor="stats">Stats (one per line)</Label>
                    <Textarea id="stats" data-testid="input-about-stats" value={statsInput} onChange={(e) => setStatsInput(e.target.value)} placeholder="10+ Projects&#10;5+ Years Experience" rows={4} />
                  </div>
                  <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-about">
                    {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
                <Dialog open={educationDialogOpen} onOpenChange={(open) => {
                  setEducationDialogOpen(open);
                  if (!open) setEditingEducation(undefined);
                }}>
                  <DialogTrigger asChild>
                    <Button size="sm" data-testid="button-add-education">
                      <Plus className="h-4 w-4 mr-1" /> Add Education
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingEducation ? "Edit Education" : "Add Education"}</DialogTitle>
                    </DialogHeader>
                    <EducationForm 
                      education={editingEducation} 
                      onClose={() => {
                        setEducationDialogOpen(false);
                        setEditingEducation(undefined);
                      }} 
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {education.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No education entries yet. Add your first one!</p>
                ) : (
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex items-start justify-between p-4 border rounded-md" data-testid={`education-item-${edu.id}`}>
                        <div>
                          <h4 className="font-semibold">{edu.institution}</h4>
                          <p className="text-sm text-muted-foreground">{edu.degree}</p>
                          {edu.specialization && <p className="text-sm text-muted-foreground">{edu.specialization}</p>}
                          <p className="text-xs text-muted-foreground mt-1">{edu.duration} {edu.grade && `| Grade: ${edu.grade}`}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => {
                            setEditingEducation(edu);
                            setEducationDialogOpen(true);
                          }} data-testid={`button-edit-education-${edu.id}`}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => deleteEducationMutation.mutate(edu.id)} data-testid={`button-delete-education-${edu.id}`}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Experience
                </CardTitle>
                <Dialog open={experienceDialogOpen} onOpenChange={(open) => {
                  setExperienceDialogOpen(open);
                  if (!open) setEditingExperience(undefined);
                }}>
                  <DialogTrigger asChild>
                    <Button size="sm" data-testid="button-add-experience">
                      <Plus className="h-4 w-4 mr-1" /> Add Experience
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingExperience ? "Edit Experience" : "Add Experience"}</DialogTitle>
                    </DialogHeader>
                    <ExperienceForm 
                      experience={editingExperience} 
                      onClose={() => {
                        setExperienceDialogOpen(false);
                        setEditingExperience(undefined);
                      }} 
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {experience.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No experience entries yet. Add your first one!</p>
                ) : (
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="flex items-start justify-between p-4 border rounded-md" data-testid={`experience-item-${exp.id}`}>
                        <div>
                          <h4 className="font-semibold">{exp.role}</h4>
                          <p className="text-sm text-muted-foreground">{exp.company} - {exp.type}</p>
                          <p className="text-xs text-muted-foreground">{exp.location}</p>
                          <p className="text-xs text-muted-foreground">{exp.duration}</p>
                          <p className="text-sm mt-2 line-clamp-2">{exp.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => {
                            setEditingExperience(exp);
                            setExperienceDialogOpen(true);
                          }} data-testid={`button-edit-experience-${exp.id}`}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => deleteExperienceMutation.mutate(exp.id)} data-testid={`button-delete-experience-${exp.id}`}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Professional Summary
                </CardTitle>
                <Dialog open={summaryDialogOpen} onOpenChange={(open) => {
                  setSummaryDialogOpen(open);
                  if (!open) setEditingSummary(undefined);
                }}>
                  <DialogTrigger asChild>
                    <Button size="sm" data-testid="button-add-summary">
                      <Plus className="h-4 w-4 mr-1" /> Add Paragraph
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingSummary ? "Edit Paragraph" : "Add Paragraph"}</DialogTitle>
                    </DialogHeader>
                    <SummaryForm 
                      summary={editingSummary} 
                      onClose={() => {
                        setSummaryDialogOpen(false);
                        setEditingSummary(undefined);
                      }} 
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {professionalSummary.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No summary paragraphs yet. Add your first one!</p>
                ) : (
                  <div className="space-y-4">
                    {professionalSummary.map((item) => (
                      <div key={item.id} className="flex items-start justify-between p-4 border rounded-md" data-testid={`summary-item-${item.id}`}>
                        <p className="text-sm flex-1 pr-4">{item.paragraph}</p>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => {
                            setEditingSummary(item);
                            setSummaryDialogOpen(true);
                          }} data-testid={`button-edit-summary-${item.id}`}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => deleteSummaryMutation.mutate(item.id)} data-testid={`button-delete-summary-${item.id}`}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
