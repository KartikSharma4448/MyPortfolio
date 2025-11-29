import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Projects table
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").array().notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  imageUrl: text("image_url"),
  featured: text("featured").notNull().default('false'),
  order: text("order").notNull().default('0'),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Certificates table
export const certificates = pgTable("certificates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  issueDate: text("issue_date").notNull(),
  credentialId: text("credential_id"),
  credentialUrl: text("credential_url"),
  skills: text("skills").array().notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  createdAt: true,
});

export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificates.$inferSelect;

// Skills table
export const skills = pgTable("skills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  level: text("level").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  createdAt: true,
});

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

// Services table
export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Social Links table
export const socialLinks = pgTable("social_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
  handle: text("handle"),
  order: text("order").notNull().default('0'),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertSocialLinkSchema = createInsertSchema(socialLinks).omit({
  id: true,
  createdAt: true,
});

export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type SocialLink = typeof socialLinks.$inferSelect;

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact Messages table
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Blog Posts table
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  tags: text("tags").array().notNull(),
  published: text("published").notNull().default('false'),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts, {
  publishedAt: z.coerce.date().nullable(), // यह लाइन जोड़ें: यह स्ट्रिंग डेट को डेट ऑब्जेक्ट में बदल देगी
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// About Page Content table
export const aboutContent = pgTable("about_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  profileImage: text("profile_image"),
  stats: text("stats").array(),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const insertAboutContentSchema = createInsertSchema(aboutContent).omit({
  id: true,
  updatedAt: true,
}).extend({
  profileImage: z.string().nullable().optional(),
  stats: z.array(z.string()).default([]),
});

export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;
export type AboutContent = typeof aboutContent.$inferSelect;

// Education table
export const education = pgTable("education", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  specialization: text("specialization"),
  duration: text("duration").notNull(),
  grade: text("grade"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertEducationSchema = createInsertSchema(education).omit({
  id: true,
  createdAt: true,
});

export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type Education = typeof education.$inferSelect;

// Experience table
export const experience = pgTable("experience", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  role: text("role").notNull(),
  company: text("company").notNull(),
  type: text("type").notNull(),
  duration: text("duration").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertExperienceSchema = createInsertSchema(experience).omit({
  id: true,
  createdAt: true,
});

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experience.$inferSelect;

// Professional Summary table
export const professionalSummary = pgTable("professional_summary", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  paragraph: text("paragraph").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertProfessionalSummarySchema = createInsertSchema(professionalSummary).omit({
  id: true,
  createdAt: true,
});

export type InsertProfessionalSummary = z.infer<typeof insertProfessionalSummarySchema>;
export type ProfessionalSummary = typeof professionalSummary.$inferSelect;

// Blog Likes table
export const blogLikes = pgTable("blog_likes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").notNull(),
  visitorId: text("visitor_id").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertBlogLikeSchema = createInsertSchema(blogLikes).omit({
  id: true,
  createdAt: true,
});

export type InsertBlogLike = z.infer<typeof insertBlogLikeSchema>;
export type BlogLike = typeof blogLikes.$inferSelect;

// Blog Comments table
export const blogComments = pgTable("blog_comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  content: text("content").notNull(),
  approved: text("approved").notNull().default('false'),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertBlogCommentSchema = createInsertSchema(blogComments).omit({
  id: true,
  createdAt: true,
});

export type InsertBlogComment = z.infer<typeof insertBlogCommentSchema>;
export type BlogComment = typeof blogComments.$inferSelect;
