import {
  type Project,
  type InsertProject,
  type Certificate,
  type InsertCertificate,
  type Skill,
  type InsertSkill,
  type Service,
  type InsertService,
  type SocialLink,
  type InsertSocialLink,
  type ContactMessage,
  type InsertContactMessage,
  type User,
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type AboutContent,
  type InsertAboutContent,
  type Education,
  type InsertEducation,
  type Experience,
  type InsertExperience,
  type ProfessionalSummary,
  type InsertProfessionalSummary,
  type BlogLike,
  type InsertBlogLike,
  type BlogComment,
  type InsertBlogComment,
} from "@shared/schema";
import { randomUUID } from "crypto";
import session from "express-session";
import createMemoryStore from "memorystore";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: InsertProject): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  getCertificates(): Promise<Certificate[]>;
  getCertificate(id: string): Promise<Certificate | undefined>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  updateCertificate(id: string, certificate: InsertCertificate): Promise<Certificate | undefined>;
  deleteCertificate(id: string): Promise<boolean>;

  getSkills(): Promise<Skill[]>;
  getSkill(id: string): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: string, skill: InsertSkill): Promise<Skill | undefined>;
  deleteSkill(id: string): Promise<boolean>;

  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: InsertService): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  getSocialLinks(): Promise<SocialLink[]>;
  getSocialLink(id: string): Promise<SocialLink | undefined>;
  createSocialLink(link: InsertSocialLink): Promise<SocialLink>;
  updateSocialLink(id: string, link: InsertSocialLink): Promise<SocialLink | undefined>;
  deleteSocialLink(id: string): Promise<boolean>;

  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;

  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: InsertBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;

  getAboutContent(): Promise<AboutContent | undefined>;
  createOrUpdateAboutContent(content: InsertAboutContent): Promise<AboutContent>;

  // Education
  getEducation(): Promise<Education[]>;
  getEducationItem(id: string): Promise<Education | undefined>;
  createEducation(education: InsertEducation): Promise<Education>;
  updateEducation(id: string, education: InsertEducation): Promise<Education | undefined>;
  deleteEducation(id: string): Promise<boolean>;

  // Experience
  getExperience(): Promise<Experience[]>;
  getExperienceItem(id: string): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: string, experience: InsertExperience): Promise<Experience | undefined>;
  deleteExperience(id: string): Promise<boolean>;

  // Professional Summary
  getProfessionalSummary(): Promise<ProfessionalSummary[]>;
  getProfessionalSummaryItem(id: string): Promise<ProfessionalSummary | undefined>;
  createProfessionalSummary(summary: InsertProfessionalSummary): Promise<ProfessionalSummary>;
  updateProfessionalSummary(id: string, summary: InsertProfessionalSummary): Promise<ProfessionalSummary | undefined>;
  deleteProfessionalSummary(id: string): Promise<boolean>;

  // Blog Likes
  getBlogLikes(postId: string): Promise<BlogLike[]>;
  getBlogLikeCount(postId: string): Promise<number>;
  hasUserLiked(postId: string, visitorId: string): Promise<boolean>;
  addBlogLike(like: InsertBlogLike): Promise<BlogLike>;
  removeBlogLike(postId: string, visitorId: string): Promise<boolean>;

  // Blog Comments
  getBlogComments(postId: string, approvedOnly?: boolean): Promise<BlogComment[]>;
  createBlogComment(comment: InsertBlogComment): Promise<BlogComment>;
  approveBlogComment(id: string): Promise<BlogComment | undefined>;
  deleteBlogComment(id: string): Promise<boolean>;

  sessionStore: session.Store;
}

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private certificates: Map<string, Certificate>;
  private skills: Map<string, Skill>;
  private services: Map<string, Service>;
  private socialLinks: Map<string, SocialLink>;
  private contactMessages: Map<string, ContactMessage>;
  private blogPosts: Map<string, BlogPost>;
  private users: Map<number, User>;
  private userIdCounter: number;
  private aboutContentData: AboutContent | undefined;
  public sessionStore: session.Store;

  constructor() {
    this.projects = new Map();
    this.certificates = new Map();
    this.skills = new Map();
    this.services = new Map();
    this.socialLinks = new Map();
    this.contactMessages = new Map();
    this.blogPosts = new Map();
    this.users = new Map();
    this.userIdCounter = 1;
    this.aboutContentData = undefined;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    this.seedData();
  }

  private seedData() {
    const hopePawsProject = this.createProjectSync({
      title: "HOPE-PAWS",
      description: "Developed an AI-powered platform focused on the safety of stray animals and road safety in Jaipur. Features include real-time emergency reporting, shelter locator, and community engagement tools to protect animals and improve urban safety.",
      technologies: ["AI", "Web Design", "Emergency Response", "Community Platform"],
      liveUrl: "",
      githubUrl: "",
      imageUrl: "",
      featured: "true",
      order: "0",
    });

    const certs = [
      { title: "Practice Exam 1 for Azure AI Fundamentals (AI-900)", issuer: "Microsoft Azure", issueDate: "Oct 2025", skills: ["Microsoft Azure", "Azure AI Studio", "Artificial Intelligence (AI)"] },
      { title: "Practice Exam 1 for Microsoft Azure Administrator Associate (AZ-104)", issuer: "LinkedIn", issueDate: "Oct 2025", skills: ["Cloud Administration"] },
      { title: "Practice Exam 1 for Microsoft Power Platform Fundamentals (PL-900)", issuer: "LinkedIn", issueDate: "Oct 2025", skills: ["Microsoft Power Platform"] },
      { title: "Practice Exam 1 for Power BI Data Analyst Associate (PL-300)", issuer: "LinkedIn", issueDate: "Oct 2025", skills: ["Microsoft Power BI", "Data Analysis"] },
      { title: "Quality Management Foundations", issuer: "LinkedIn", issueDate: "Oct 2025", skills: ["Quality Management"] },
      { title: "Systems Thinking", issuer: "LinkedIn", issueDate: "Oct 2025", skills: ["Systems Thinking"] },
      { title: "Cloud Systems Software", issuer: "Georgia Institute of Technology", issueDate: "Sep 2025", credentialId: "S1OWSCV00V0P", skills: ["Cloud Computing"] },
      { title: "Network Function Virtualization", issuer: "Georgia Institute of Technology", issueDate: "Sep 2025", credentialId: "QJODR3CNF2U1", skills: ["Networking"] },
      { title: "Foundations: Data, Data, Everywhere", issuer: "Google", issueDate: "Apr 2025", credentialId: "945B8TUNN4KN", skills: ["Data Analysis"] },
      { title: "Innovating with the Business Model Canvas", issuer: "University of Virginia", issueDate: "Feb 2025", credentialId: "6R2BRKVM442B", skills: ["Business Innovation"] },
    ];

    certs.forEach(cert => this.createCertificateSync(cert));

    const skills = [
      { name: "Software Development", category: "technical", level: "advanced" },
      { name: "Web Development", category: "technical", level: "advanced" },
      { name: "Python", category: "technical", level: "intermediate" },
      { name: "Java", category: "technical", level: "intermediate" },
      { name: "C Programming", category: "technical", level: "intermediate" },
      { name: "Cloud Computing", category: "technical", level: "intermediate" },
      { name: "AI Prompting", category: "technical", level: "intermediate" },
      { name: "Microsoft Office", category: "tools", level: "advanced" },
      { name: "Project Management", category: "soft", level: "intermediate" },
      { name: "Computer Science", category: "technical", level: "advanced" },
    ];

    skills.forEach(skill => this.createSkillSync(skill));

    const services = [
      { title: "Web Design", description: "Create beautiful, responsive websites with modern design principles and user-friendly interfaces.", icon: "Globe" },
      { title: "Logo Design", description: "Design unique and memorable logos that capture your brand identity and make a lasting impression.", icon: "Palette" },
      { title: "Web Development", description: "Build robust, scalable web applications using modern technologies and best practices.", icon: "Code" },
      { title: "Software Testing", description: "Ensure software quality through comprehensive testing and quality assurance processes.", icon: "CheckCircle" },
      { title: "Blogging & Writing", description: "Create engaging content and technical articles for blogs and publications.", icon: "PenTool" },
      { title: "Network Support", description: "Provide technical support for network configuration, troubleshooting, and maintenance.", icon: "Network" },
    ];

    services.forEach(service => this.createServiceSync(service));

    const socialLinks = [
      { platform: "LinkedIn", url: "https://linkedin.com/in/kartik-sharma06", icon: "Linkedin", handle: "@kartik-sharma06", order: "0" },
      { platform: "GitHub", url: "https://github.com/kartiksharma4448", icon: "Github", handle: "@kartiksharma4448", order: "1" },
      { platform: "Instagram", url: "https://instagram.com/kartik.verse6", icon: "Instagram", handle: "@kartik.verse6", order: "2" },
      { platform: "Email", url: "mailto:contact@example.com", icon: "Mail", handle: "Get in touch", order: "3" },
    ];

    socialLinks.forEach(link => this.createSocialLinkSync(link));
  }

  private createProjectSync(insertProject: InsertProject): Project {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      liveUrl: insertProject.liveUrl || null,
      githubUrl: insertProject.githubUrl || null,
      imageUrl: insertProject.imageUrl || null,
      featured: insertProject.featured || 'false',
      order: insertProject.order || '0',
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  private createCertificateSync(insertCert: InsertCertificate): Certificate {
    const id = randomUUID();
    const cert: Certificate = {
      ...insertCert,
      id,
      credentialId: insertCert.credentialId || null,
      credentialUrl: insertCert.credentialUrl || null,
      createdAt: new Date(),
    };
    this.certificates.set(id, cert);
    return cert;
  }

  private createSkillSync(insertSkill: InsertSkill): Skill {
    const id = randomUUID();
    const skill: Skill = {
      ...insertSkill,
      id,
      createdAt: new Date(),
    };
    this.skills.set(id, skill);
    return skill;
  }

  private createServiceSync(insertService: InsertService): Service {
    const id = randomUUID();
    const service: Service = {
      ...insertService,
      id,
      createdAt: new Date(),
    };
    this.services.set(id, service);
    return service;
  }

  private createSocialLinkSync(insertLink: InsertSocialLink): SocialLink {
    const id = randomUUID();
    const link: SocialLink = {
      ...insertLink,
      id,
      handle: insertLink.handle || null,
      order: insertLink.order || '0',
      createdAt: new Date(),
    };
    this.socialLinks.set(id, link);
    return link;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => parseInt(a.order) - parseInt(b.order));
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    return this.createProjectSync(insertProject);
  }

  async updateProject(id: string, insertProject: InsertProject): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    const updated: Project = {
      ...insertProject,
      id,
      liveUrl: insertProject.liveUrl || null,
      githubUrl: insertProject.githubUrl || null,
      imageUrl: insertProject.imageUrl || null,
      featured: insertProject.featured || 'false',
      order: insertProject.order || '0',
      createdAt: existing.createdAt,
    };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getCertificates(): Promise<Certificate[]> {
    return Array.from(this.certificates.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getCertificate(id: string): Promise<Certificate | undefined> {
    return this.certificates.get(id);
  }

  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    return this.createCertificateSync(insertCertificate);
  }

  async updateCertificate(id: string, insertCertificate: InsertCertificate): Promise<Certificate | undefined> {
    const existing = this.certificates.get(id);
    if (!existing) return undefined;
    const updated: Certificate = {
      ...insertCertificate,
      id,
      credentialId: insertCertificate.credentialId || null,
      credentialUrl: insertCertificate.credentialUrl || null,
      createdAt: existing.createdAt,
    };
    this.certificates.set(id, updated);
    return updated;
  }

  async deleteCertificate(id: string): Promise<boolean> {
    return this.certificates.delete(id);
  }

  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async getSkill(id: string): Promise<Skill | undefined> {
    return this.skills.get(id);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    return this.createSkillSync(insertSkill);
  }

  async updateSkill(id: string, insertSkill: InsertSkill): Promise<Skill | undefined> {
    const existing = this.skills.get(id);
    if (!existing) return undefined;
    const updated: Skill = {
      ...insertSkill,
      id,
      createdAt: existing.createdAt,
    };
    this.skills.set(id, updated);
    return updated;
  }

  async deleteSkill(id: string): Promise<boolean> {
    return this.skills.delete(id);
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    return this.createServiceSync(insertService);
  }

  async updateService(id: string, insertService: InsertService): Promise<Service | undefined> {
    const existing = this.services.get(id);
    if (!existing) return undefined;
    const updated: Service = {
      ...insertService,
      id,
      createdAt: existing.createdAt,
    };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: string): Promise<boolean> {
    return this.services.delete(id);
  }

  async getSocialLinks(): Promise<SocialLink[]> {
    return Array.from(this.socialLinks.values()).sort((a, b) => parseInt(a.order) - parseInt(b.order));
  }

  async getSocialLink(id: string): Promise<SocialLink | undefined> {
    return this.socialLinks.get(id);
  }

  async createSocialLink(insertLink: InsertSocialLink): Promise<SocialLink> {
    return this.createSocialLinkSync(insertLink);
  }

  async updateSocialLink(id: string, insertLink: InsertSocialLink): Promise<SocialLink | undefined> {
    const existing = this.socialLinks.get(id);
    if (!existing) return undefined;
    const updated: SocialLink = {
      ...insertLink,
      id,
      handle: insertLink.handle || null,
      order: insertLink.order || '0',
      createdAt: existing.createdAt,
    };
    this.socialLinks.set(id, updated);
    return updated;
  }

  async deleteSocialLink(id: string): Promise<boolean> {
    return this.socialLinks.delete(id);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getBlogPosts(publishedOnly: boolean = false): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values());
    if (publishedOnly) {
      return posts.filter(post => post.published === 'true').sort((a, b) => 
        (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0)
      );
    }
    return posts.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();
    const post: BlogPost = {
      ...insertPost,
      id,
      coverImage: insertPost.coverImage || null,
      published: insertPost.published || 'false',
      publishedAt: insertPost.publishedAt || null,
      createdAt: now,
      updatedAt: now,
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, insertPost: InsertBlogPost): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    const updated: BlogPost = {
      ...insertPost,
      id,
      coverImage: insertPost.coverImage || null,
      published: insertPost.published || 'false',
      publishedAt: insertPost.publishedAt || null,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  async getAboutContent(): Promise<AboutContent | undefined> {
    return this.aboutContentData;
  }

  async createOrUpdateAboutContent(insertContent: InsertAboutContent): Promise<AboutContent> {
    const id = this.aboutContentData?.id || randomUUID();
    const content: AboutContent = {
      ...insertContent,
      id,
      profileImage: insertContent.profileImage || null,
      updatedAt: new Date(),
    };
    this.aboutContentData = content;
    return content;
  }

  // Education - MemStorage implementations
  private educationData: Map<string, Education> = new Map();
  
  async getEducation(): Promise<Education[]> {
    return Array.from(this.educationData.values()).sort((a, b) => a.order - b.order);
  }

  async getEducationItem(id: string): Promise<Education | undefined> {
    return this.educationData.get(id);
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const id = randomUUID();
    const education: Education = {
      ...insertEducation,
      id,
      specialization: insertEducation.specialization || null,
      grade: insertEducation.grade || null,
      order: insertEducation.order || 0,
      createdAt: new Date(),
    };
    this.educationData.set(id, education);
    return education;
  }

  async updateEducation(id: string, insertEducation: InsertEducation): Promise<Education | undefined> {
    const existing = this.educationData.get(id);
    if (!existing) return undefined;
    const updated: Education = {
      ...insertEducation,
      id,
      specialization: insertEducation.specialization || null,
      grade: insertEducation.grade || null,
      order: insertEducation.order || 0,
      createdAt: existing.createdAt,
    };
    this.educationData.set(id, updated);
    return updated;
  }

  async deleteEducation(id: string): Promise<boolean> {
    return this.educationData.delete(id);
  }

  // Experience - MemStorage implementations
  private experienceData: Map<string, Experience> = new Map();

  async getExperience(): Promise<Experience[]> {
    return Array.from(this.experienceData.values()).sort((a, b) => a.order - b.order);
  }

  async getExperienceItem(id: string): Promise<Experience | undefined> {
    return this.experienceData.get(id);
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const id = randomUUID();
    const experience: Experience = {
      ...insertExperience,
      id,
      order: insertExperience.order || 0,
      createdAt: new Date(),
    };
    this.experienceData.set(id, experience);
    return experience;
  }

  async updateExperience(id: string, insertExperience: InsertExperience): Promise<Experience | undefined> {
    const existing = this.experienceData.get(id);
    if (!existing) return undefined;
    const updated: Experience = {
      ...insertExperience,
      id,
      order: insertExperience.order || 0,
      createdAt: existing.createdAt,
    };
    this.experienceData.set(id, updated);
    return updated;
  }

  async deleteExperience(id: string): Promise<boolean> {
    return this.experienceData.delete(id);
  }

  // Professional Summary - MemStorage implementations
  private professionalSummaryData: Map<string, ProfessionalSummary> = new Map();

  async getProfessionalSummary(): Promise<ProfessionalSummary[]> {
    return Array.from(this.professionalSummaryData.values()).sort((a, b) => a.order - b.order);
  }

  async getProfessionalSummaryItem(id: string): Promise<ProfessionalSummary | undefined> {
    return this.professionalSummaryData.get(id);
  }

  async createProfessionalSummary(insertSummary: InsertProfessionalSummary): Promise<ProfessionalSummary> {
    const id = randomUUID();
    const summary: ProfessionalSummary = {
      ...insertSummary,
      id,
      order: insertSummary.order || 0,
      createdAt: new Date(),
    };
    this.professionalSummaryData.set(id, summary);
    return summary;
  }

  async updateProfessionalSummary(id: string, insertSummary: InsertProfessionalSummary): Promise<ProfessionalSummary | undefined> {
    const existing = this.professionalSummaryData.get(id);
    if (!existing) return undefined;
    const updated: ProfessionalSummary = {
      ...insertSummary,
      id,
      order: insertSummary.order || 0,
      createdAt: existing.createdAt,
    };
    this.professionalSummaryData.set(id, updated);
    return updated;
  }

  async deleteProfessionalSummary(id: string): Promise<boolean> {
    return this.professionalSummaryData.delete(id);
  }

  // Blog Likes - MemStorage implementations
  private blogLikesData: Map<string, BlogLike> = new Map();

  async getBlogLikes(postId: string): Promise<BlogLike[]> {
    return Array.from(this.blogLikesData.values()).filter(like => like.postId === postId);
  }

  async getBlogLikeCount(postId: string): Promise<number> {
    return (await this.getBlogLikes(postId)).length;
  }

  async hasUserLiked(postId: string, visitorId: string): Promise<boolean> {
    return Array.from(this.blogLikesData.values()).some(
      like => like.postId === postId && like.visitorId === visitorId
    );
  }

  async addBlogLike(insertLike: InsertBlogLike): Promise<BlogLike> {
    const id = randomUUID();
    const like: BlogLike = {
      ...insertLike,
      id,
      createdAt: new Date(),
    };
    this.blogLikesData.set(id, like);
    return like;
  }

  async removeBlogLike(postId: string, visitorId: string): Promise<boolean> {
    const like = Array.from(this.blogLikesData.entries()).find(
      ([_, l]) => l.postId === postId && l.visitorId === visitorId
    );
    if (like) {
      return this.blogLikesData.delete(like[0]);
    }
    return false;
  }

  // Blog Comments - MemStorage implementations
  private blogCommentsData: Map<string, BlogComment> = new Map();

  async getBlogComments(postId: string, approvedOnly: boolean = false): Promise<BlogComment[]> {
    let comments = Array.from(this.blogCommentsData.values()).filter(c => c.postId === postId);
    if (approvedOnly) {
      comments = comments.filter(c => c.approved === 'true');
    }
    return comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createBlogComment(insertComment: InsertBlogComment): Promise<BlogComment> {
    const id = randomUUID();
    const comment: BlogComment = {
      ...insertComment,
      id,
      approved: insertComment.approved || 'false',
      createdAt: new Date(),
    };
    this.blogCommentsData.set(id, comment);
    return comment;
  }

  async approveBlogComment(id: string): Promise<BlogComment | undefined> {
    const existing = this.blogCommentsData.get(id);
    if (!existing) return undefined;
    const updated: BlogComment = {
      ...existing,
      approved: 'true',
    };
    this.blogCommentsData.set(id, updated);
    return updated;
  }

  async deleteBlogComment(id: string): Promise<boolean> {
    return this.blogCommentsData.delete(id);
  }
}

import { DbStorage } from './db-storage';

// Use database storage instead of memory storage for persistence
export const storage: IStorage = process.env.DATABASE_URL 
  ? new DbStorage()
  : new MemStorage();
