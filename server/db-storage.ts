import { eq, and } from 'drizzle-orm';
import { db } from './db';
import {
  projects,
  certificates,
  skills,
  services,
  socialLinks,
  contactMessages,
  users,
  blogPosts,
  aboutContent,
  education,
  experience,
  professionalSummary,
  blogLikes,
  blogComments,
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
} from '@shared/schema';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import type { IStorage } from './storage';

const MemoryStore = createMemoryStore(session);

export class DbStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    const result = await db
      .select()
      .from(projects)
      .orderBy(projects.order);
    return result;
  }

  async getProject(id: string): Promise<Project | undefined> {
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);
    return result[0];
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const result = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return result[0];
  }

  async updateProject(id: string, insertProject: InsertProject): Promise<Project | undefined> {
    const result = await db
      .update(projects)
      .set(insertProject)
      .where(eq(projects.id, id))
      .returning();
    return result[0];
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();
    return result.length > 0;
  }

  // Certificates
  async getCertificates(): Promise<Certificate[]> {
    const result = await db
      .select()
      .from(certificates)
      .orderBy(certificates.createdAt);
    return result;
  }

  async getCertificate(id: string): Promise<Certificate | undefined> {
    const result = await db
      .select()
      .from(certificates)
      .where(eq(certificates.id, id))
      .limit(1);
    return result[0];
  }

  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    const result = await db
      .insert(certificates)
      .values(insertCertificate)
      .returning();
    return result[0];
  }

  async updateCertificate(id: string, insertCertificate: InsertCertificate): Promise<Certificate | undefined> {
    const result = await db
      .update(certificates)
      .set(insertCertificate)
      .where(eq(certificates.id, id))
      .returning();
    return result[0];
  }

  async deleteCertificate(id: string): Promise<boolean> {
    const result = await db
      .delete(certificates)
      .where(eq(certificates.id, id))
      .returning();
    return result.length > 0;
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    const result = await db
      .select()
      .from(skills);
    return result;
  }

  async getSkill(id: string): Promise<Skill | undefined> {
    const result = await db
      .select()
      .from(skills)
      .where(eq(skills.id, id))
      .limit(1);
    return result[0];
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const result = await db
      .insert(skills)
      .values(insertSkill)
      .returning();
    return result[0];
  }

  async updateSkill(id: string, insertSkill: InsertSkill): Promise<Skill | undefined> {
    const result = await db
      .update(skills)
      .set(insertSkill)
      .where(eq(skills.id, id))
      .returning();
    return result[0];
  }

  async deleteSkill(id: string): Promise<boolean> {
    const result = await db
      .delete(skills)
      .where(eq(skills.id, id))
      .returning();
    return result.length > 0;
  }

  // Services
  async getServices(): Promise<Service[]> {
    const result = await db
      .select()
      .from(services);
    return result;
  }

  async getService(id: string): Promise<Service | undefined> {
    const result = await db
      .select()
      .from(services)
      .where(eq(services.id, id))
      .limit(1);
    return result[0];
  }

  async createService(insertService: InsertService): Promise<Service> {
    const result = await db
      .insert(services)
      .values(insertService)
      .returning();
    return result[0];
  }

  async updateService(id: string, insertService: InsertService): Promise<Service | undefined> {
    const result = await db
      .update(services)
      .set(insertService)
      .where(eq(services.id, id))
      .returning();
    return result[0];
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db
      .delete(services)
      .where(eq(services.id, id))
      .returning();
    return result.length > 0;
  }

  // Social Links
  async getSocialLinks(): Promise<SocialLink[]> {
    const result = await db
      .select()
      .from(socialLinks)
      .orderBy(socialLinks.order);
    return result;
  }

  async getSocialLink(id: string): Promise<SocialLink | undefined> {
    const result = await db
      .select()
      .from(socialLinks)
      .where(eq(socialLinks.id, id))
      .limit(1);
    return result[0];
  }

  async createSocialLink(insertLink: InsertSocialLink): Promise<SocialLink> {
    const result = await db
      .insert(socialLinks)
      .values(insertLink)
      .returning();
    return result[0];
  }

  async updateSocialLink(id: string, insertLink: InsertSocialLink): Promise<SocialLink | undefined> {
    const result = await db
      .update(socialLinks)
      .set(insertLink)
      .where(eq(socialLinks.id, id))
      .returning();
    return result[0];
  }

  async deleteSocialLink(id: string): Promise<boolean> {
    const result = await db
      .delete(socialLinks)
      .where(eq(socialLinks.id, id))
      .returning();
    return result.length > 0;
  }

  // Contact Messages
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const result = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return result[0];
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    const result = await db
      .select()
      .from(contactMessages)
      .orderBy(contactMessages.createdAt);
    return result;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return result[0];
  }

  // Blog Posts
  async getBlogPosts(publishedOnly: boolean = false): Promise<BlogPost[]> {
    if (publishedOnly) {
      const result = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.published, 'true'))
        .orderBy(blogPosts.publishedAt);
      return result;
    }
    const result = await db
      .select()
      .from(blogPosts)
      .orderBy(blogPosts.updatedAt);
    return result;
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);
    return result[0];
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    return result[0];
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const result = await db
      .insert(blogPosts)
      .values(insertPost)
      .returning();
    return result[0];
  }

  async updateBlogPost(id: string, insertPost: InsertBlogPost): Promise<BlogPost | undefined> {
    const result = await db
      .update(blogPosts)
      .set({
        ...insertPost,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return result[0];
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id))
      .returning();
    return result.length > 0;
  }

  // About Content
  async getAboutContent(): Promise<AboutContent | undefined> {
    const result = await db
      .select()
      .from(aboutContent)
      .limit(1);
    return result[0];
  }

  async createOrUpdateAboutContent(insertContent: InsertAboutContent): Promise<AboutContent> {
    const existing = await this.getAboutContent();
    
    if (existing) {
      const result = await db
        .update(aboutContent)
        .set({
          ...insertContent,
          updatedAt: new Date(),
        })
        .where(eq(aboutContent.id, existing.id))
        .returning();
      return result[0];
    } else {
      const result = await db
        .insert(aboutContent)
        .values(insertContent)
        .returning();
      return result[0];
    }
  }

  // Education
  async getEducation(): Promise<Education[]> {
    const result = await db
      .select()
      .from(education)
      .orderBy(education.order);
    return result;
  }

  async getEducationItem(id: string): Promise<Education | undefined> {
    const result = await db
      .select()
      .from(education)
      .where(eq(education.id, id))
      .limit(1);
    return result[0];
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const result = await db
      .insert(education)
      .values(insertEducation)
      .returning();
    return result[0];
  }

  async updateEducation(id: string, insertEducation: InsertEducation): Promise<Education | undefined> {
    const result = await db
      .update(education)
      .set(insertEducation)
      .where(eq(education.id, id))
      .returning();
    return result[0];
  }

  async deleteEducation(id: string): Promise<boolean> {
    const result = await db
      .delete(education)
      .where(eq(education.id, id))
      .returning();
    return result.length > 0;
  }

  // Experience
  async getExperience(): Promise<Experience[]> {
    const result = await db
      .select()
      .from(experience)
      .orderBy(experience.order);
    return result;
  }

  async getExperienceItem(id: string): Promise<Experience | undefined> {
    const result = await db
      .select()
      .from(experience)
      .where(eq(experience.id, id))
      .limit(1);
    return result[0];
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const result = await db
      .insert(experience)
      .values(insertExperience)
      .returning();
    return result[0];
  }

  async updateExperience(id: string, insertExperience: InsertExperience): Promise<Experience | undefined> {
    const result = await db
      .update(experience)
      .set(insertExperience)
      .where(eq(experience.id, id))
      .returning();
    return result[0];
  }

  async deleteExperience(id: string): Promise<boolean> {
    const result = await db
      .delete(experience)
      .where(eq(experience.id, id))
      .returning();
    return result.length > 0;
  }

  // Professional Summary
  async getProfessionalSummary(): Promise<ProfessionalSummary[]> {
    const result = await db
      .select()
      .from(professionalSummary)
      .orderBy(professionalSummary.order);
    return result;
  }

  async getProfessionalSummaryItem(id: string): Promise<ProfessionalSummary | undefined> {
    const result = await db
      .select()
      .from(professionalSummary)
      .where(eq(professionalSummary.id, id))
      .limit(1);
    return result[0];
  }

  async createProfessionalSummary(insertSummary: InsertProfessionalSummary): Promise<ProfessionalSummary> {
    const result = await db
      .insert(professionalSummary)
      .values(insertSummary)
      .returning();
    return result[0];
  }

  async updateProfessionalSummary(id: string, insertSummary: InsertProfessionalSummary): Promise<ProfessionalSummary | undefined> {
    const result = await db
      .update(professionalSummary)
      .set(insertSummary)
      .where(eq(professionalSummary.id, id))
      .returning();
    return result[0];
  }

  async deleteProfessionalSummary(id: string): Promise<boolean> {
    const result = await db
      .delete(professionalSummary)
      .where(eq(professionalSummary.id, id))
      .returning();
    return result.length > 0;
  }

  // Blog Likes
  async getBlogLikes(postId: string): Promise<BlogLike[]> {
    const result = await db
      .select()
      .from(blogLikes)
      .where(eq(blogLikes.postId, postId));
    return result;
  }

  async getBlogLikeCount(postId: string): Promise<number> {
    const result = await db
      .select()
      .from(blogLikes)
      .where(eq(blogLikes.postId, postId));
    return result.length;
  }

  async hasUserLiked(postId: string, visitorId: string): Promise<boolean> {
    const result = await db
      .select()
      .from(blogLikes)
      .where(and(eq(blogLikes.postId, postId), eq(blogLikes.visitorId, visitorId)))
      .limit(1);
    return result.length > 0;
  }

  async addBlogLike(insertLike: InsertBlogLike): Promise<BlogLike> {
    const result = await db
      .insert(blogLikes)
      .values(insertLike)
      .returning();
    return result[0];
  }

  async removeBlogLike(postId: string, visitorId: string): Promise<boolean> {
    const result = await db
      .delete(blogLikes)
      .where(and(eq(blogLikes.postId, postId), eq(blogLikes.visitorId, visitorId)))
      .returning();
    return result.length > 0;
  }

  // Blog Comments
  async getBlogComments(postId: string, approvedOnly: boolean = false): Promise<BlogComment[]> {
    if (approvedOnly) {
      const result = await db
        .select()
        .from(blogComments)
        .where(and(eq(blogComments.postId, postId), eq(blogComments.approved, 'true')))
        .orderBy(blogComments.createdAt);
      return result;
    }
    const result = await db
      .select()
      .from(blogComments)
      .where(eq(blogComments.postId, postId))
      .orderBy(blogComments.createdAt);
    return result;
  }

  async createBlogComment(insertComment: InsertBlogComment): Promise<BlogComment> {
    const result = await db
      .insert(blogComments)
      .values(insertComment)
      .returning();
    return result[0];
  }

  async approveBlogComment(id: string): Promise<BlogComment | undefined> {
    const result = await db
      .update(blogComments)
      .set({ approved: 'true' })
      .where(eq(blogComments.id, id))
      .returning();
    return result[0];
  }

  async deleteBlogComment(id: string): Promise<boolean> {
    const result = await db
      .delete(blogComments)
      .where(eq(blogComments.id, id))
      .returning();
    return result.length > 0;
  }
}
